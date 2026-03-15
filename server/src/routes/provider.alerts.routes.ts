import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/api-response';

const router = Router();

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/alerts',
  asyncHandler(async (req, res) => {
    const severity = req.query.severity ? String(req.query.severity) : undefined;
    const type = req.query.type ? String(req.query.type) : undefined;
    const dismissed = req.query.dismissed === undefined ? false : String(req.query.dismissed) === 'true';
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    let query = db.from('provider_alerts').select('*').eq('dismissed', dismissed).order('created_at', { ascending: false }).range(from, to);
    if (severity) query = query.eq('severity', severity);
    if (type) query = query.eq('type', type);

    const [{ data: alerts, error }, { data: allAlerts, error: allAlertsError }] = await Promise.all([
      query,
      db.from('provider_alerts').select('severity'),
    ]);
    assertNoDbError(error);
    assertNoDbError(allAlertsError);

    const stats = { critical: 0, warning: 0, info: 0 };
    for (const alert of allAlerts || []) {
      if (alert.severity === 'critical') stats.critical += 1;
      if (alert.severity === 'warning') stats.warning += 1;
      if (alert.severity === 'info') stats.info += 1;
    }

    sendSuccess(res, {
      alerts: (alerts || []).map((item: any) => ({
        id: item.id,
        type: item.type,
        severity: item.severity,
        title: item.title,
        message: item.message,
        relatedId: item.related_id,
        dismissed: item.dismissed,
        createdAt: item.created_at,
      })),
      stats,
      total: alerts?.length || 0,
    });
  }),
);

router.patch(
  '/alerts/dismiss-all',
  asyncHandler(async (req, res) => {
    const severity = req.query.severity ? String(req.query.severity) : undefined;
    const db = getEaasClient();

    let query = db.from('provider_alerts').update({ dismissed: true }).eq('dismissed', false);
    if (severity) query = query.eq('severity', severity);
    const { error } = await query;
    assertNoDbError(error);

    sendSuccess(res, { dismissed: true });
  }),
);

router.patch(
  '/alerts/:alertId/dismiss',
  asyncHandler(async (req, res) => {
    const db = getEaasClient();
    const { error } = await db.from('provider_alerts').update({ dismissed: true }).eq('id', String(req.params.alertId));
    assertNoDbError(error);

    sendSuccess(res, { id: String(req.params.alertId), dismissed: true });
  }),
);

export default router;
