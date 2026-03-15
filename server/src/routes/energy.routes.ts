import { Router } from 'express';
import { APP_DB_SCHEMA, assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { Role } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';
import { publishEnergyEvent } from '../utils/realtime';

const router = Router();

function randomBetween(min: number, max: number): number {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

router.get(
  '/realtime/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();
    const { data: property, error: propertyError } = await db
      .from('properties')
      .select('id')
      .eq('id', propertyId)
      .maybeSingle();
    assertNoDbError(propertyError);

    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Resource not found');
      return;
    }

    const solarKw = randomBetween(2.5, 6.5);
    const gridKw = randomBetween(0.1, 1.5);
    const consumption = Number((solarKw + gridKw).toFixed(2));
    const batteryPercent = Math.round(randomBetween(30, 95));
    const timestamp = new Date().toISOString();

    publishEnergyEvent({
      propertyId,
      timestamp,
      solarKw,
      batteryPercent,
      gridKw,
      consumption,
    }).catch(() => {
      // no-op
    });

    sendSuccess(res, {
      propertyId,
      timestamp,
      solarKw,
      batteryPercent,
      gridKw,
      consumption,
      production: solarKw,
      exporting: solarKw > consumption,
    });
  }),
);

router.get(
  '/stats/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const period = String(req.query.period || 'month');
    const startDate = req.query.startDate ? new Date(String(req.query.startDate)) : undefined;
    const endDate = req.query.endDate ? new Date(String(req.query.endDate)) : undefined;
    const db = getEaasClient();

    let query = db
      .from('energy_stats')
      .select('id,property_id,date,period,production,consumption,grid_usage,battery_percent,solar_kw,grid_kw,exporting')
      .eq('property_id', propertyId)
      .order('date', { ascending: true })
      .limit(60);

    if (startDate) {
      query = query.gte('date', startDate.toISOString());
    }
    if (endDate) {
      query = query.lte('date', endDate.toISOString());
    }

    const { data: history, error } = await query;
    assertNoDbError(error);

    const safeHistory = history || [];

    const currentKwh = safeHistory.reduce((acc: number, item: any) => acc + item.consumption, 0);
    const solarProduction = safeHistory.reduce((acc: number, item: any) => acc + item.production, 0);
    const gridConsumption = safeHistory.reduce((acc: number, item: any) => acc + item.grid_usage, 0);
    const batteryUsage = Math.round(
      (safeHistory.reduce((acc: number, item: any) => acc + (item.battery_percent || 0), 0) / Math.max(safeHistory.length, 1)) *
        0.1,
    );
    const monthlyBill = Math.round(currentKwh * 8.3);

    sendSuccess(res, {
      propertyId,
      period,
      currentKwh: Math.round(currentKwh),
      trendPercent: -12,
      carbonSavedKg: Math.round(solarProduction * 0.1),
      monthlyBill,
      solarProduction: Math.round(solarProduction),
      gridConsumption: Math.round(gridConsumption),
      batteryUsage,
      history: safeHistory.map((item: any) => ({
        date: String(item.date).slice(0, 10),
        production: item.production,
        consumption: item.consumption,
        gridUsage: item.grid_usage,
      })),
    });
  }),
);

router.get(
  '/stream/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      sendError(res, 503, 'REALTIME_NOT_CONFIGURED', 'Supabase realtime is not configured on this server');
      return;
    }

    sendSuccess(res, {
      mode: 'supabase_realtime',
      table: 'energy_events',
      schema: APP_DB_SCHEMA,
      filter: `property_id=eq.${propertyId}`,
      event: 'INSERT',
      supabaseUrl,
      supabaseAnonKey,
      channel: `energy:${propertyId}`,
    });
  }),
);

router.get(
  '/admin/analytics/overview',
  authenticate,
  requireRole(Role.ADMIN, Role.EXECUTIVE),
  asyncHandler(async (_req, res) => {
    const db = getEaasClient();
    const [usersResult, propertiesResult, billsResult, energyResult, ticketsResult] = await Promise.all([
      db.from('users').select('*', { count: 'exact', head: true }),
      db.from('properties').select('*', { count: 'exact', head: true }),
      db.from('bills').select('total_amount,status,generated_at').order('generated_at', { ascending: false }).limit(200),
      db.from('energy_stats').select('production,consumption,date').order('date', { ascending: false }).limit(500),
      db.from('support_tickets').select('*', { count: 'exact', head: true }).in('status', ['open', 'in_progress']),
    ]);

    assertNoDbError(usersResult.error);
    assertNoDbError(propertiesResult.error);
    assertNoDbError(billsResult.error);
    assertNoDbError(energyResult.error);
    assertNoDbError(ticketsResult.error);

    const totalUsers = usersResult.count || 0;
    const totalProperties = propertiesResult.count || 0;
    const openTickets = ticketsResult.count || 0;
    const bills = billsResult.data || [];
    const totalRevenue = bills
      .filter((bill: any) => bill.status === 'paid')
      .reduce((sum: number, bill: any) => sum + Number(bill.total_amount || 0), 0);

    const energyRows = energyResult.data || [];
    const totalProduction = energyRows.reduce((sum: number, row: any) => sum + Number(row.production || 0), 0);
    const totalConsumption = energyRows.reduce((sum: number, row: any) => sum + Number(row.consumption || 0), 0);
    const netOffsetPercent = totalConsumption > 0 ? Number(((totalProduction / totalConsumption) * 100).toFixed(2)) : 0;

    sendSuccess(res, {
      totalUsers,
      totalProperties,
      openTickets,
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalProduction: Number(totalProduction.toFixed(2)),
      totalConsumption: Number(totalConsumption.toFixed(2)),
      netOffsetPercent,
    });
  }),
);

export default router;
