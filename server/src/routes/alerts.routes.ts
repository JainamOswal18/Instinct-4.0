import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/api-response';

const router = Router();

router.get(
  '/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: alerts, error } = await db
      .from('alerts')
      .select('*')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
      .limit(100);
    assertNoDbError(error);

    sendSuccess(res, {
      alerts: (alerts || []).map((item: any) => ({
        id: item.id,
        category: item.category,
        severity: item.severity,
        title: item.title,
        message: item.message,
        timestamp: item.created_at,
        read: item.read,
      })),
    });
  }),
);

export default router;
