import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { roleMiddleware } from '../middleware/role.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

router.use(authenticate, roleMiddleware(Role.EXECUTIVE));

router.get(
  '/customers',
  asyncHandler(async (req, res) => {
    const search = String(req.query.search || '').trim().toLowerCase();
    const page = Math.max(Number(req.query.page || 1), 1);
    const limit = Math.min(Math.max(Number(req.query.limit || 20), 1), 100);
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const db = getEaasClient();
    const { data: properties, error: propertiesError } = await db
      .from('properties')
      .select('id,user_id,plan_type,subscription_status')
      .order('created_at', { ascending: false })
      .range(from, to);
    assertNoDbError(propertiesError);

    const propertyRows = properties || [];
    const userIds = [...new Set(propertyRows.map((item: any) => item.user_id))];
    const propertyIds = propertyRows.map((item: any) => item.id);

    const [usersResult, latestBillsResult, energyResult] = await Promise.all([
      userIds.length ? db.from('users').select('id,name,email').in('id', userIds) : Promise.resolve({ data: [], error: null }),
      propertyIds.length
        ? db
            .from('bills')
            .select('id,property_id,status,due_date,paid_date,generated_at')
            .in('property_id', propertyIds)
            .order('generated_at', { ascending: false })
        : Promise.resolve({ data: [], error: null }),
      propertyIds.length
        ? db
            .from('energy_stats')
            .select('property_id,consumption,date')
            .in('property_id', propertyIds)
            .gte('date', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())
        : Promise.resolve({ data: [], error: null }),
    ]);

    assertNoDbError(usersResult.error as any);
    assertNoDbError(latestBillsResult.error as any);
    assertNoDbError(energyResult.error as any);

    const usersById = new Map<string, any>();
    for (const user of usersResult.data || []) {
      usersById.set(user.id, user);
    }

    const billByProperty = new Map<string, any>();
    for (const bill of latestBillsResult.data || []) {
      if (!billByProperty.has(bill.property_id)) {
        billByProperty.set(bill.property_id, bill);
      }
    }

    const consumptionByProperty = new Map<string, number>();
    for (const stat of energyResult.data || []) {
      consumptionByProperty.set(stat.property_id, (consumptionByProperty.get(stat.property_id) || 0) + Number(stat.consumption || 0));
    }

    const customers = propertyRows
      .map((property: any) => {
        const user = usersById.get(property.user_id);
        const bill = billByProperty.get(property.id);
        const now = Date.now();
        const overdue = bill?.status === 'pending' && bill?.due_date && new Date(bill.due_date).getTime() < now;

        return {
          id: property.user_id,
          name: user?.name || 'Unknown',
          email: user?.email || '',
          propertyId: property.id,
          serviceTitle: property.plan_type || 'Energy Service',
          planName: property.plan_type || 'Standard Plan',
          subscriptionStatus: property.subscription_status,
          monthlyConsumption: Number((consumptionByProperty.get(property.id) || 0).toFixed(2)),
          planThreshold: 500,
          paymentStatus: overdue ? 'overdue' : bill?.status === 'paid' ? 'paid' : 'pending',
          lastPaymentDate: bill?.paid_date ? String(bill.paid_date).slice(0, 10) : null,
        };
      })
      .filter((item) => {
        if (!search) return true;
        return item.name.toLowerCase().includes(search) || item.email.toLowerCase().includes(search);
      });

    sendSuccess(res, {
      customers,
      total: customers.length,
      page,
    });
  }),
);

router.get(
  '/customers/:propertyId/consumption',
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const period = String(req.query.period || 'day');
    const days = period === 'week' ? 7 : period === 'month' ? 30 : 1;
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const db = getEaasClient();
    const { data: property, error: propertyError } = await db.from('properties').select('id,user_id').eq('id', propertyId).maybeSingle();
    assertNoDbError(propertyError);
    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const [{ data: user, error: userError }, { data: stats, error: statsError }] = await Promise.all([
      db.from('users').select('name').eq('id', property.user_id).maybeSingle(),
      db.from('energy_stats').select('date,consumption,production').eq('property_id', propertyId).gte('date', since).order('date', { ascending: true }),
    ]);
    assertNoDbError(userError);
    assertNoDbError(statsError);

    const rows = stats || [];
    const totalKwh = rows.reduce((acc: number, item: any) => acc + Number(item.consumption || 0), 0);
    const history = rows.map((item: any) => ({
      time: period === 'day' ? new Date(item.date).toISOString().slice(11, 16) : new Date(item.date).toISOString().slice(0, 10),
      consumption: Number(item.consumption || 0),
      production: Number(item.production || 0),
    }));

    sendSuccess(res, {
      propertyId,
      customerName: user?.name || 'Unknown',
      period,
      totalKwh: Number(totalKwh.toFixed(2)),
      planThreshold: 500,
      exceedsThreshold: totalKwh > 500,
      history,
    });
  }),
);

router.get(
  '/consumption/aggregate',
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const [propertiesResult, statsResult] = await Promise.all([
      db.from('properties').select('id', { count: 'exact' }),
      db.from('energy_stats').select('property_id,consumption,date').gte('date', since),
    ]);

    assertNoDbError(propertiesResult.error);
    assertNoDbError(statsResult.error);

    const totalCustomers = propertiesResult.count || 0;
    const stats = statsResult.data || [];
    const totalKwhServed = stats.reduce((acc: number, item: any) => acc + Number(item.consumption || 0), 0);
    const averagePerCustomer = totalCustomers > 0 ? totalKwhServed / totalCustomers : 0;

    const perProperty = new Map<string, number>();
    const hourBuckets = new Map<string, number>();
    for (const row of stats) {
      const propertyTotal = (perProperty.get(row.property_id) || 0) + Number(row.consumption || 0);
      perProperty.set(row.property_id, propertyTotal);

      const hour = new Date(row.date).getUTCHours();
      const window = `${String(hour).padStart(2, '0')}:00-${String((hour + 1) % 24).padStart(2, '0')}:00`;
      hourBuckets.set(window, (hourBuckets.get(window) || 0) + Number(row.consumption || 0));
    }

    const customersExceedingThreshold = [...perProperty.values()].filter((value) => value > 500).length;

    let peakDemandTime = 'N/A';
    let peakValue = -1;
    for (const [window, value] of hourBuckets.entries()) {
      if (value > peakValue) {
        peakValue = value;
        peakDemandTime = window;
      }
    }

    sendSuccess(res, {
      totalCustomers,
      totalKwhServed: Number(totalKwhServed.toFixed(2)),
      averagePerCustomer: Number(averagePerCustomer.toFixed(2)),
      customersExceedingThreshold,
      peakDemandTime,
    });
  }),
);

export default router;
