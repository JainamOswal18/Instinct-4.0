import { Router } from 'express';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess, sendError } from '../utils/api-response';

const router = Router();

const profileUpdateSchema = z.object({
  companyName: z.string().optional(),
  brandingName: z.string().optional(),
  supportEmail: z.string().email().optional(),
  supportPhone: z.string().optional(),
  logoUrl: z.string().url().optional(),
  notificationPreferences: z.record(z.any()).optional(),
});

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/profile',
  asyncHandler(async (req, res) => {
    const authUser = (req as any).user;
    const db = getEaasClient();

    const [{ data: user, error: userError }, { data: profile, error: profileError }] = await Promise.all([
      db.from('users').select('id,name,email,phone,address').eq('id', authUser.userId).maybeSingle(),
      db.from('provider_profiles').select('*').eq('user_id', authUser.userId).maybeSingle(),
    ]);
    assertNoDbError(userError);
    assertNoDbError(profileError);

    if (!user) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    sendSuccess(res, {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      profile: {
        companyName: profile?.company_name || null,
        brandingName: profile?.branding_name || null,
        supportEmail: profile?.support_email || user.email || null,
        supportPhone: profile?.support_phone || user.phone || null,
        logoUrl: profile?.logo_url || null,
        notificationPreferences: profile?.notification_preferences || {},
        createdAt: profile?.created_at || null,
        updatedAt: profile?.updated_at || null,
      },
    });
  }),
);

router.patch(
  '/profile',
  asyncHandler(async (req, res) => {
    const parsed = profileUpdateSchema.safeParse(req.body);
    if (!parsed.success) {
      sendError(res, 400, 'VALIDATION_ERROR', 'Invalid request parameters', parsed.error.flatten().fieldErrors);
      return;
    }

    const authUser = (req as any).user;
    const db = getEaasClient();
    const now = new Date().toISOString();

    const upsertPayload: Record<string, unknown> = {
      user_id: authUser.userId,
      updated_at: now,
    };
    if (parsed.data.companyName !== undefined) upsertPayload.company_name = parsed.data.companyName;
    if (parsed.data.brandingName !== undefined) upsertPayload.branding_name = parsed.data.brandingName;
    if (parsed.data.supportEmail !== undefined) upsertPayload.support_email = parsed.data.supportEmail;
    if (parsed.data.supportPhone !== undefined) upsertPayload.support_phone = parsed.data.supportPhone;
    if (parsed.data.logoUrl !== undefined) upsertPayload.logo_url = parsed.data.logoUrl;
    if (parsed.data.notificationPreferences !== undefined) upsertPayload.notification_preferences = parsed.data.notificationPreferences;

    const { data: updated, error } = await db
      .from('provider_profiles')
      .upsert(
        {
          created_at: now,
          ...upsertPayload,
        },
        { onConflict: 'user_id' },
      )
      .select('*')
      .single();
    assertNoDbError(error);

    sendSuccess(res, {
      companyName: updated.company_name,
      brandingName: updated.branding_name,
      supportEmail: updated.support_email,
      supportPhone: updated.support_phone,
      logoUrl: updated.logo_url,
      notificationPreferences: updated.notification_preferences,
      updatedAt: updated.updated_at,
    });
  }),
);

export default router;
