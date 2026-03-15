import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { AuthRequest, Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';
import { logAdminAction } from '../utils/audit';

const router = Router();

const submitRequestSchema = z.object({
  serviceId: z.string().min(1),
  propertyId: z.string().optional(),
  consumption: z.number().positive().optional(),
  areaDescription: z.string().min(5),
  files: z.array(z.object({
    fileName: z.string().min(1),
    fileUrl: z.string().url().optional(),
    mimeType: z.string().optional(),
    sizeBytes: z.number().int().nonnegative().optional(),
  })).default([]),
});

const updateRequestStatusSchema = z.object({
  status: z.enum(['pending', 'in-progress', 'completed', 'cancelled']),
});

const paymentMethodSchema = z.object({
  type: z.string().min(1),
  last4: z.string().regex(/^\d{4}$/),
  expiry: z.string().min(4),
  isPrimary: z.boolean().optional().default(false),
});

router.get(
  '/',
  authenticate,
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const { data, error } = await db
      .from('energy_services')
      .select('id,title,description,image_id,category,active')
      .eq('active', true)
      .order('title', { ascending: true });
    assertNoDbError(error);

    sendSuccess(res, {
      services: (data || []).map((service: any) => ({
        id: service.id,
        title: service.title,
        description: service.description,
        imageId: service.image_id,
        category: service.category,
      })),
    });
  }),
);

router.post(
  '/requests',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = submitRequestSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data: service, error: serviceError } = await db
      .from('energy_services')
      .select('id,title')
      .eq('id', parsed.data.serviceId)
      .eq('active', true)
      .maybeSingle();
    assertNoDbError(serviceError);

    if (!service) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const requestId = randomUUID();
    const { error: requestError } = await db.from('service_requests').insert({
      id: requestId,
      user_id: authReq.user!.userId,
      property_id: parsed.data.propertyId || null,
      service_id: parsed.data.serviceId,
      service_title: service.title,
      consumption_kwh: parsed.data.consumption || null,
      area_description: parsed.data.areaDescription,
      status: 'pending',
      updated_at: new Date().toISOString(),
    });
    assertNoDbError(requestError);

    if (parsed.data.files.length > 0) {
      const payload = parsed.data.files.map((file) => ({
        id: randomUUID(),
        request_id: requestId,
        file_name: file.fileName,
        file_url: file.fileUrl || null,
        mime_type: file.mimeType || null,
        size_bytes: file.sizeBytes || null,
      }));
      const { error: filesError } = await db.from('service_request_files').insert(payload);
      assertNoDbError(filesError);
    }

    sendSuccess(
      res,
      {
        requestId,
        serviceId: parsed.data.serviceId,
        serviceTitle: service.title,
        status: 'pending',
      },
      'Service request submitted successfully',
      201,
    );
  }),
);

router.get(
  '/requests/me',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data, error } = await db
      .from('service_requests')
      .select('id,service_id,service_title,property_id,consumption_kwh,area_description,status,submitted_at,updated_at')
      .eq('user_id', authReq.user!.userId)
      .order('submitted_at', { ascending: false })
      .limit(100);
    assertNoDbError(error);

    sendSuccess(res, {
      requests: (data || []).map((item: any) => ({
        id: item.id,
        serviceId: item.service_id,
        serviceTitle: item.service_title,
        propertyId: item.property_id,
        consumption: item.consumption_kwh,
        areaDescription: item.area_description,
        status: item.status,
        submittedAt: item.submitted_at,
        updatedAt: item.updated_at,
      })),
    });
  }),
);

router.get(
  '/requests/admin',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (req, res) => {
    const limit = Number(req.query.limit || 100);
    const offset = Number(req.query.offset || 0);
    const status = String(req.query.status || '').trim();
    const db = getEaasClient();

    let query = db
      .from('service_requests')
      .select('id,user_id,service_id,service_title,property_id,consumption_kwh,area_description,status,submitted_at,updated_at')
      .order('submitted_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    assertNoDbError(error);

    sendSuccess(res, {
      requests: (data || []).map((item: any) => ({
        id: item.id,
        userId: item.user_id,
        serviceId: item.service_id,
        serviceTitle: item.service_title,
        propertyId: item.property_id,
        consumption: item.consumption_kwh,
        areaDescription: item.area_description,
        status: item.status,
        submittedAt: item.submitted_at,
        updatedAt: item.updated_at,
      })),
    });
  }),
);

router.patch(
  '/requests/admin/:requestId',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = updateRequestStatusSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const requestId = String(req.params.requestId);
    const db = getEaasClient();
    const { data, error } = await db
      .from('service_requests')
      .update({
        status: parsed.data.status,
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .select('id,status,updated_at')
      .maybeSingle();
    assertNoDbError(error);

    if (!data) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    await logAdminAction(authReq, {
      action: 'service_request.status.updated',
      entityType: 'service_request',
      entityId: requestId,
      metadata: { status: parsed.data.status },
    });

    sendSuccess(res, {
      requestId: data.id,
      status: data.status,
      updatedAt: data.updated_at,
    }, 'Service request updated successfully');
  }),
);

router.get(
  '/payment-methods',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { data, error } = await db
      .from('payment_methods')
      .select('id,type,last4,expiry,is_primary,created_at')
      .eq('user_id', authReq.user!.userId)
      .order('is_primary', { ascending: false })
      .order('created_at', { ascending: false });
    assertNoDbError(error);

    sendSuccess(res, {
      methods: (data || []).map((item: any) => ({
        id: item.id,
        type: item.type,
        last4: item.last4,
        expiry: item.expiry,
        isPrimary: item.is_primary,
        createdAt: item.created_at,
      })),
    });
  }),
);

router.post(
  '/payment-methods',
  authenticate,
  asyncHandler(async (req, res) => {
    const parsed = paymentMethodSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();

    if (parsed.data.isPrimary) {
      const { error: unsetPrimaryError } = await db
        .from('payment_methods')
        .update({ is_primary: false })
        .eq('user_id', authReq.user!.userId);
      assertNoDbError(unsetPrimaryError);
    }

    const { data, error } = await db
      .from('payment_methods')
      .insert({
        id: randomUUID(),
        user_id: authReq.user!.userId,
        type: parsed.data.type,
        last4: parsed.data.last4,
        expiry: parsed.data.expiry,
        is_primary: parsed.data.isPrimary,
      })
      .select('id,type,last4,expiry,is_primary,created_at')
      .single();
    assertNoDbError(error);

    if (!data) {
      sendError(res, 500, 'INTERNAL_ERROR', 'Failed to save payment method');
      return;
    }

    sendSuccess(res, {
      id: data.id,
      type: data.type,
      last4: data.last4,
      expiry: data.expiry,
      isPrimary: data.is_primary,
      createdAt: data.created_at,
    }, 'Payment method saved successfully', 201);
  }),
);

export default router;