import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const equipmentStatusSchema = z.object({
  status: z.enum(['ONLINE', 'OFFLINE', 'NEEDS_ATTENTION']),
  healthScore: z.number().int().min(0).max(100).optional(),
});

const maintenanceSchema = z.object({
  nextMaintenanceDate: z.string().min(1),
  notes: z.string().optional(),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/equipment',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    let query = db.from('equipment').select('*').order('created_at', { ascending: false }).range(from, to);
    if (status) query = query.eq('status', status);

    const { data: equipment, error } = await query;
    assertNoDbError(error);

    const rows = equipment || [];
    const summary = {
      online: rows.filter((item: any) => item.status === 'ONLINE').length,
      offline: rows.filter((item: any) => item.status === 'OFFLINE').length,
      needsAttention: rows.filter((item: any) => item.status === 'NEEDS_ATTENTION').length,
      averageHealth: rows.length
        ? Math.round(rows.reduce((acc: number, item: any) => acc + Number(item.health_score || 0), 0) / rows.length)
        : 0,
    };

    sendSuccess(res, {
      equipment: rows.map((item: any) => ({
        id: item.id,
        installationId: item.installation_id,
        name: item.name,
        model: item.model,
        serialNumber: item.serial_number,
        status: item.status,
        healthScore: item.health_score,
        installedDate: item.installed_date,
        warrantyExpiry: item.warranty_expiry,
        lastMaintenanceDate: item.last_maintenance_date,
        nextMaintenanceDate: item.next_maintenance_date,
        customerName: item.customer_name,
      })),
      summary,
      total: rows.length,
    });
  }),
);

router.get(
  '/equipment/:equipmentId',
  asyncHandler(async (req, res) => {
    const equipmentId = String(req.params.equipmentId);
    const db = getEaasClient();
    const { data: item, error } = await db.from('equipment').select('*').eq('id', equipmentId).maybeSingle();
    assertNoDbError(error);

    if (!item) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { data: installation, error: installationError } = await db
      .from('installations')
      .select('id,property_id,service_title,status,assigned_technician')
      .eq('id', item.installation_id)
      .maybeSingle();
    assertNoDbError(installationError);

    sendSuccess(res, {
      equipment: {
        id: item.id,
        installationId: item.installation_id,
        name: item.name,
        model: item.model,
        serialNumber: item.serial_number,
        status: item.status,
        healthScore: item.health_score,
        installedDate: item.installed_date,
        warrantyExpiry: item.warranty_expiry,
        lastMaintenanceDate: item.last_maintenance_date,
        nextMaintenanceDate: item.next_maintenance_date,
        customerName: item.customer_name,
      },
      installation,
    });
  }),
);

router.patch(
  '/equipment/:equipmentId/status',
  asyncHandler(async (req, res) => {
    const parsed = equipmentStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const payload: Record<string, unknown> = {
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
    };
    if (parsed.data.healthScore !== undefined) payload.health_score = parsed.data.healthScore;

    const db = getEaasClient();
    const { data: equipment, error } = await db.from('equipment').update(payload).eq('id', String(req.params.equipmentId)).select('*').maybeSingle();
    assertNoDbError(error);

    if (!equipment) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    if (equipment.status === 'OFFLINE' || equipment.status === 'NEEDS_ATTENTION') {
      const { error: alertError } = await db.from('provider_alerts').insert({
        id: randomUUID(),
        type: 'equipment_failure',
        severity: equipment.status === 'OFFLINE' ? 'critical' : 'warning',
        title: `${equipment.name} requires attention`,
        message: `${equipment.name} (${equipment.serial_number}) status changed to ${equipment.status}.`,
        related_id: equipment.id,
        dismissed: false,
        created_at: new Date().toISOString(),
      });
      assertNoDbError(alertError);
    }

    sendSuccess(res, {
      id: equipment.id,
      status: equipment.status,
      healthScore: equipment.health_score,
      updatedAt: equipment.updated_at,
    });
  }),
);

router.post(
  '/equipment/:equipmentId/maintenance',
  asyncHandler(async (req, res) => {
    const parsed = maintenanceSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const equipmentId = String(req.params.equipmentId);
    const db = getEaasClient();
    const nextMaintenanceDate = new Date(parsed.data.nextMaintenanceDate).toISOString();

    const { data: equipment, error } = await db
      .from('equipment')
      .update({
        next_maintenance_date: nextMaintenanceDate,
        updated_at: new Date().toISOString(),
      })
      .eq('id', equipmentId)
      .select('*')
      .maybeSingle();
    assertNoDbError(error);

    if (!equipment) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const { error: alertError } = await db.from('provider_alerts').insert({
      id: randomUUID(),
      type: 'ticket',
      severity: 'info',
      title: `Maintenance scheduled — ${equipment.name}`,
      message: parsed.data.notes || 'Scheduled maintenance updated.',
      related_id: equipment.id,
      dismissed: false,
      created_at: new Date().toISOString(),
    });
    assertNoDbError(alertError);

    sendSuccess(res, {
      equipmentId,
      nextMaintenanceDate,
      alertCreated: true,
    });
  }),
);

export default router;
