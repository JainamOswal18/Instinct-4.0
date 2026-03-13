import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { assertNoDbError, getEaasClient, mapProperty, mapUserProfile, PropertyRow, UserRow } from '../lib/eaas-db';
import { sendError, sendSuccess } from '../utils/api-response';
import { asyncHandler } from '../utils/async-handler';

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

export default router;
