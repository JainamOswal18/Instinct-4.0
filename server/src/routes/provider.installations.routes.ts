import { Router } from 'express';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const installationStatusSchema = z.enum(['SURVEY', 'APPROVAL', 'PROCUREMENT', 'INSTALLATION', 'TESTING', 'LIVE']);

const updateInstallationSchema = z.object({
  status: installationStatusSchema,
  notes: z.string().optional(),
  assignedTechnician: z.string().optional(),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/installations',
  asyncHandler(async (req, res) => {
    const status = req.query.status ? String(req.query.status) : undefined;
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    let query = db.from('installations').select('*').order('created_at', { ascending: false }).range(from, to);
    if (status) {
      query = query.eq('status', status);
    }

    let countQuery = db.from('installations').select('*', { count: 'exact', head: true });
    if (status) {
      countQuery = countQuery.eq('status', status);
    }

    const [{ data: installations, error }, { count, error: countError }] = await Promise.all([query, countQuery]);
    assertNoDbError(error);
    assertNoDbError(countError);

    sendSuccess(res, {
      installations: (installations || []).map((item: any) => ({
        id: item.id,
        propertyId: item.property_id,
        serviceTitle: item.service_title,
        customerName: item.customer_name,
        machineName: item.machine_name,
        machineCost: item.machine_cost,
        estimatedSetupDays: item.estimated_setup_days,
        actualStartDate: item.actual_start_date,
        completedDate: item.completed_date,
        status: item.status,
        assignedTechnician: item.assigned_technician,
        subscriptionPlanSummary: item.subscription_plan_summary,
        createdAt: item.created_at,
      })),
      total: count || 0,
      page,
      totalPages: Math.max(Math.ceil((count || 0) / limit), 1),
    });
  }),
);

router.get(
  '/installations/pipeline',
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const { data: rows, error } = await db.from('installations').select('status');
    assertNoDbError(error);

    const pipeline: Record<string, number> = {
      SURVEY: 0,
      APPROVAL: 0,
      PROCUREMENT: 0,
      INSTALLATION: 0,
      TESTING: 0,
      LIVE: 0,
    };

    for (const row of rows || []) {
      if (pipeline[row.status] !== undefined) {
        pipeline[row.status] += 1;
      }
    }

    const total = Object.values(pipeline).reduce((acc, value) => acc + value, 0);
    sendSuccess(res, { pipeline, total });
  }),
);

router.get(
  '/installations/:installationId',
  asyncHandler(async (req, res) => {
    const installationId = String(req.params.installationId);
    const db = getEaasClient();

    const { data: installation, error } = await db.from('installations').select('*').eq('id', installationId).maybeSingle();
    assertNoDbError(error);

    if (!installation) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const [{ data: equipment, error: equipmentError }, { data: property, error: propertyError }] = await Promise.all([
      db.from('equipment').select('*').eq('installation_id', installationId).order('created_at', { ascending: false }),
      db.from('properties').select('*').eq('id', installation.property_id).maybeSingle(),
    ]);
    assertNoDbError(equipmentError);
    assertNoDbError(propertyError);

    sendSuccess(res, {
      installation: {
        id: installation.id,
        propertyId: installation.property_id,
        serviceTitle: installation.service_title,
        customerName: installation.customer_name,
        machineName: installation.machine_name,
        machineCost: installation.machine_cost,
        estimatedSetupDays: installation.estimated_setup_days,
        actualStartDate: installation.actual_start_date,
        completedDate: installation.completed_date,
        status: installation.status,
        assignedTechnician: installation.assigned_technician,
        notes: installation.notes,
        subscriptionPlanSummary: installation.subscription_plan_summary,
        createdAt: installation.created_at,
        updatedAt: installation.updated_at,
      },
      equipment: (equipment || []).map((item: any) => ({
        id: item.id,
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
      property: property
        ? {
            id: property.id,
            name: property.name,
            address: property.address,
            type: property.type,
            subscriptionStatus: property.subscription_status,
            planType: property.plan_type,
          }
        : null,
    });
  }),
);

router.patch(
  '/installations/:installationId/status',
  asyncHandler(async (req, res) => {
    const parsed = updateInstallationSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const installationId = String(req.params.installationId);
    const payload: Record<string, unknown> = {
      status: parsed.data.status,
      updated_at: new Date().toISOString(),
    };
    if (parsed.data.notes !== undefined) payload.notes = parsed.data.notes;
    if (parsed.data.assignedTechnician !== undefined) payload.assigned_technician = parsed.data.assignedTechnician;
    if (parsed.data.status === 'INSTALLATION') payload.actual_start_date = new Date().toISOString();
    if (parsed.data.status === 'LIVE') payload.completed_date = new Date().toISOString();

    const db = getEaasClient();
    const { data: updated, error } = await db.from('installations').update(payload).eq('id', installationId).select('*').maybeSingle();
    assertNoDbError(error);

    if (!updated) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      id: updated.id,
      status: updated.status,
      updatedAt: updated.updated_at,
    });
  }),
);

export default router;
