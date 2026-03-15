import { Router } from 'express';
import { randomUUID } from 'crypto';
import { z } from 'zod';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { AuthRequest, Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { logAdminAction } from '../utils/audit';
import { sendSuccess } from '../utils/api-response';

const router = Router();

const adminBroadcastSchema = z.object({
  title: z.string().min(3),
  message: z.string().min(3),
  route: z.string().optional(),
  type: z.string().optional().default('announcement'),
  userIds: z.array(z.string().min(1)).optional(),
});

router.get(
  '/',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const limit = Number(req.query.limit || 50);
    const offset = Number(req.query.offset || 0);
    const unreadOnly = String(req.query.unreadOnly || 'false') === 'true';
    const db = getEaasClient();

    let notificationsQuery = db
      .from('notifications')
      .select('*')
      .eq('user_id', authReq.user!.userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + Math.max(limit - 1, 0));

    if (unreadOnly) {
      notificationsQuery = notificationsQuery.eq('read', false);
    }

    const unreadCountQuery = db
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', authReq.user!.userId)
      .eq('read', false);

    const totalCountQuery = db
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', authReq.user!.userId);

    const [notificationsResult, unreadCountResult, totalCountResult] = await Promise.all([
      notificationsQuery,
      unreadCountQuery,
      totalCountQuery,
    ]);

    assertNoDbError(notificationsResult.error);
    assertNoDbError(unreadCountResult.error);
    assertNoDbError(totalCountResult.error);

    const notifications = notificationsResult.data || [];
    const unreadCount = unreadCountResult.count || 0;
    const total = totalCountResult.count || 0;

    sendSuccess(res, {
      notifications: notifications.map((item: any) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        message: item.message,
        timestamp: item.created_at,
        read: item.read,
        dismissible: item.dismissible,
        persistent: item.persistent,
        action: item.route ? { label: 'Open', route: item.route } : undefined,
      })),
      unreadCount,
      total,
    });
  }),
);

router.patch(
  '/:notificationId/read',
  authenticate,
  asyncHandler(async (req, res) => {
    const db = getEaasClient();
    const { error } = await db.from('notifications').update({ read: true }).eq('id', String(req.params.notificationId));
    assertNoDbError(error);
    sendSuccess(res, undefined, 'Notification marked as read');
  }),
);

router.patch(
  '/read-all',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const db = getEaasClient();
    const { error } = await db.from('notifications').update({ read: true }).eq('user_id', authReq.user!.userId);
    assertNoDbError(error);
    sendSuccess(res, undefined, 'All notifications marked as read');
  }),
);

router.post(
  '/admin/broadcast',
  authenticate,
  requireRole(Role.ADMIN),
  asyncHandler(async (req, res) => {
    const parsed = adminBroadcastSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request parameters',
          details: parsed.error.flatten().fieldErrors,
        },
      });
      return;
    }

    const authReq = req as AuthRequest;
    const db = getEaasClient();

    const recipients = parsed.data.userIds && parsed.data.userIds.length > 0
      ? parsed.data.userIds
      : (await db.from('users').select('id')).data?.map((user: any) => user.id) || [];

    const payload = recipients.map((userId) => ({
      id: randomUUID(),
      user_id: userId,
      type: parsed.data.type,
      title: parsed.data.title,
      message: parsed.data.message,
      route: parsed.data.route || null,
      read: false,
      dismissible: true,
      persistent: false,
    }));

    if (payload.length > 0) {
      const { error } = await db.from('notifications').insert(payload);
      assertNoDbError(error);
    }

    await logAdminAction(authReq, {
      action: 'notification.broadcast',
      entityType: 'notification',
      metadata: {
        title: parsed.data.title,
        recipientCount: payload.length,
      },
    });

    sendSuccess(res, { recipientCount: payload.length }, 'Broadcast sent successfully');
  }),
);

export default router;
