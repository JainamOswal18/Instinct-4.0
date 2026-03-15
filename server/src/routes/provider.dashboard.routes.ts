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
  '/dashboard',
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const now = new Date();
    const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();

    const [installationsResult, ticketsResult, alertsResult, billsResult, surveysResult] = await Promise.all([
      db.from('installations').select('id,status'),
      db.from('support_tickets').select('id,status'),
      db.from('provider_alerts').select('id,type,severity,title,created_at').eq('dismissed', false).order('created_at', { ascending: false }).limit(5),
      db.from('bills').select('status,total_amount,due_date').gte('generated_at', monthStart),
      db.from('surveys').select('id,property_id,submitted_at').order('submitted_at', { ascending: false }).limit(5),
    ]);

    assertNoDbError(installationsResult.error);
    assertNoDbError(ticketsResult.error);
    assertNoDbError(alertsResult.error);
    assertNoDbError(billsResult.error);
    assertNoDbError(surveysResult.error);

    const installations = installationsResult.data || [];
    const tickets = ticketsResult.data || [];
    const providerAlerts = alertsResult.data || [];
    const bills = billsResult.data || [];
    const surveys = surveysResult.data || [];

    const pipeline: Record<string, number> = {
      SURVEY: 0,
      APPROVAL: 0,
      PROCUREMENT: 0,
      INSTALLATION: 0,
      TESTING: 0,
      LIVE: 0,
    };
    for (const row of installations) {
      if (pipeline[row.status] !== undefined) {
        pipeline[row.status] += 1;
      }
    }

    const totalMRR = bills.reduce((acc: number, bill: any) => acc + Number(bill.total_amount || 0), 0);
    const overduePayments = bills.filter((bill: any) => bill.status === 'pending' && new Date(bill.due_date).getTime() < Date.now()).length;

    const propertyIds = surveys.map((item: any) => item.property_id);
    const { data: properties, error: propertiesError } = propertyIds.length
      ? await db.from('properties').select('id,user_id,plan_type').in('id', propertyIds)
      : { data: [], error: null };
    assertNoDbError(propertiesError as any);

    const userIds = [...new Set((properties || []).map((item: any) => item.user_id))];
    const { data: users, error: usersError } = userIds.length
      ? await db.from('users').select('id,name').in('id', userIds)
      : { data: [], error: null };
    assertNoDbError(usersError as any);

    const propertyById = new Map<string, any>();
    for (const property of properties || []) propertyById.set(property.id, property);
    const userById = new Map<string, any>();
    for (const user of users || []) userById.set(user.id, user);

    sendSuccess(res, {
      stats: {
        activeInstallations: installations.filter((item: any) => item.status !== 'LIVE').length,
        pendingSurveys: pipeline.SURVEY,
        openTickets: tickets.filter((item: any) => ['open', 'awaiting_approval', 'in_progress'].includes(item.status)).length,
        equipmentAlerts: providerAlerts.filter((item: any) => item.type === 'equipment_failure' || item.severity === 'critical').length,
        totalMRR: Number(totalMRR.toFixed(2)),
        overduePayments,
      },
      pipeline,
      recentAlerts: providerAlerts.map((item: any) => ({
        id: item.id,
        type: item.type,
        severity: item.severity,
        title: item.title,
        createdAt: item.created_at,
      })),
      recentRequests: surveys.map((survey: any) => {
        const property = propertyById.get(survey.property_id);
        const user = property ? userById.get(property.user_id) : null;
        return {
          id: survey.id,
          customerName: user?.name || 'Unknown',
          serviceTitle: property?.plan_type || 'Energy Service',
          status: 'pending',
          date: String(survey.submitted_at).slice(0, 10),
        };
      }),
    });
  }),
);

export default router;
