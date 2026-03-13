import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/api-response';

const router = Router();

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

export default router;
