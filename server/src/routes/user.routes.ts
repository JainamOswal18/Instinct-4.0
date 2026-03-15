import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { AuthRequest, Role } from '../types';
import { assertNoDbError, getEaasClient, mapProperty, mapUserProfile, PropertyRow, UserRow } from '../lib/eaas-db';
import { sendError, sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';
import { logAdminAction } from '../utils/audit';

const router = Router();

const profileSchema = z.object({
  name: z.string().min(2).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const propertySchema = z.object({
  name: z.string().min(1),
  address: z.string().min(3),
  type: z.enum(['residential', 'commercial']),
});

const userStatusSchema = z.object({
  isActive: z.boolean(),
});

const userRoleSchema = z.object({
  role: z.nativeEnum(Role),
});

router.get(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: user, error } = await db
      .from('users')
      .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
      .eq('id', authReq.user!.userId)
      .maybeSingle();
    assertNoDbError(error);

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, mapUserProfile(user as UserRow));
  }),
);

router.patch(
  '/profile',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = profileSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const updatePayload: { name?: string; phone?: string; address?: string } = {};
    if (parsed.data.name !== undefined) updatePayload.name = parsed.data.name;
    if (parsed.data.phone !== undefined) updatePayload.phone = parsed.data.phone;
    if (parsed.data.address !== undefined) updatePayload.address = parsed.data.address;

    const { data: user, error } = await db
      .from('users')
      .update(updatePayload)
      .eq('id', authReq.user!.userId)
      .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
      .maybeSingle();
    assertNoDbError(error);

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, mapUserProfile(user as UserRow), 'Profile updated successfully');
  }),
);

router.get(
  '/properties',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: properties, error } = await db
      .from('properties')
      .select('id,user_id,name,address,type,subscription_status,plan_type,solar_capacity,battery_storage,installation_date,created_at')
      .eq('user_id', authReq.user!.userId)
      .order('created_at', { ascending: false });
    assertNoDbError(error);

    sendSuccess(res, { properties: (properties || []).map((property) => mapProperty(property as PropertyRow)) });
  }),
);

router.post(
  '/properties',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = propertySchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: property, error: propertyError } = await db
      .from('properties')
      .insert({
        id: randomUUID(),
        user_id: authReq.user!.userId,
        name: parsed.data.name,
        address: parsed.data.address,
        type: parsed.data.type,
      })
      .select('id,user_id,name,address,type,subscription_status,plan_type,solar_capacity,battery_storage,installation_date,created_at')
      .single();
    assertNoDbError(propertyError);

    const { error: userUpdateError } = await db
      .from('users')
      .update({ current_property_id: (property as PropertyRow).id })
      .eq('id', authReq.user!.userId);
    assertNoDbError(userUpdateError);

    const mappedProperty = mapProperty(property as PropertyRow);

    sendSuccess(
      res,
      {
        propertyId: mappedProperty.id,
        name: mappedProperty.name,
        address: mappedProperty.address,
        type: mappedProperty.type,
        subscriptionStatus: mappedProperty.subscriptionStatus,
        createdAt: mappedProperty.createdAt,
      },
      undefined,
      201,
    );
  }),
);

router.get(
  '/admin/users',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const q = String(req.query.q || '').trim().toLowerCase();
    const role = String(req.query.role || '').trim().toUpperCase();
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);

    const db = getEaasClient();
    let query = db
      .from('users')
      .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
      .order('created_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));

    if (role) {
      query = query.eq('role', role);
    }

    const { data: users, error } = await query;
    assertNoDbError(error);

    const filtered = (users || []).filter((user: any) => {
      if (!q) return true;
      return (
        String(user.name || '').toLowerCase().includes(q) ||
        String(user.email || '').toLowerCase().includes(q) ||
        String(user.phone || '').toLowerCase().includes(q)
      );
    });

    sendSuccess(res, {
      users: filtered.map((user: any) => ({
        ...mapUserProfile(user as UserRow),
        role: user.role,
        isActive: user.is_active,
      })),
    });
  }),
);

router.patch(
  '/admin/users/:id/status',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = userStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const userId = String(req.params.id);
    const db = getEaasClient();
    const { data: updated, error } = await db
      .from('users')
      .update({ is_active: parsed.data.isActive })
      .eq('id', userId)
      .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
      .maybeSingle();
    assertNoDbError(error);

    if (!updated) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'user.status.updated',
      entityType: 'user',
      entityId: userId,
      metadata: { isActive: parsed.data.isActive },
    });

    sendSuccess(
      res,
      {
        ...mapUserProfile(updated as UserRow),
        role: (updated as UserRow).role,
        isActive: (updated as UserRow).is_active,
      },
      'User status updated successfully',
    );
  }),
);

router.patch(
  '/admin/users/:id/role',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = userRoleSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const userId = String(req.params.id);
    const db = getEaasClient();
    const { data: updated, error } = await db
      .from('users')
      .update({ role: parsed.data.role })
      .eq('id', userId)
      .select('id,email,name,phone,address,current_property_id,created_at,password,role,is_active')
      .maybeSingle();
    assertNoDbError(error);

    if (!updated) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'user.role.updated',
      entityType: 'user',
      entityId: userId,
      metadata: { role: parsed.data.role },
    });

    sendSuccess(
      res,
      {
        ...mapUserProfile(updated as UserRow),
        role: (updated as UserRow).role,
        isActive: (updated as UserRow).is_active,
      },
      'User role updated successfully',
    );
  }),
);

router.get(
  '/admin/audit-logs',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit || 100);
    const offset = Number(req.query.offset || 0);
    const db = getEaasClient();

    const { data: logs, error } = await db
      .from('admin_audit_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));
    if (error) {
      const isMissingAuditTable = error.code === '42P01' || String(error.message || '').includes('admin_audit_logs');
      if (isMissingAuditTable) {
        sendSuccess(res, { logs: [] });
        return;
      }
      assertNoDbError(error);
    }

    sendSuccess(res, {
      logs: (logs || []).map((log: any) => ({
        id: log.id,
        actorUserId: log.actor_user_id,
        action: log.action,
        entityType: log.entity_type,
        entityId: log.entity_id,
        metadata: log.metadata,
        createdAt: log.created_at,
      })),
    });
  }),
);

export default router;
