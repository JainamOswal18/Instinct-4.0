import { Router } from 'express';
import { randomUUID } from 'crypto';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { asyncHandler } from '../utils/async-handler';
import { sendSuccess } from '../utils/api-response';

const router = Router();

function getSeverityFromDemand(demandMw: number): 'Low' | 'Medium' | 'High' {
  if (demandMw >= 1100) return 'High';
  if (demandMw >= 950) return 'Medium';
  return 'Low';
}

router.get(
  '/grid/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();

    const { data: latestSnapshot, error: latestSnapshotError } = await db
      .from('grid_snapshots')
      .select('id,property_id,grid_frequency_hz,voltage_kv,current_load_gw,discom_status,demand_mw,captured_at')
      .eq('property_id', propertyId)
      .order('captured_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    assertNoDbError(latestSnapshotError);

    if (!latestSnapshot) {
      const seededRows = Array.from({ length: 7 }).map((_, index) => {
        const hour = 8 + index;
        const demand = [850, 950, 1050, 1100, 1150, 1200, 1180][index];
        return {
          id: randomUUID(),
          property_id: propertyId,
          grid_frequency_hz: 49.9 + index * 0.01,
          voltage_kv: 230 + (index % 3) * 0.2,
          current_load_gw: Number((demand / 1000).toFixed(2)),
          discom_status: 'Connected',
          demand_mw: demand,
          captured_at: new Date(Date.now() - (6 - index) * 60 * 60 * 1000).toISOString(),
        };
      });
      const { error: seedError } = await db.from('grid_snapshots').insert(seededRows);
      assertNoDbError(seedError);
    }

    const { data: snapshots, error: snapshotsError } = await db
      .from('grid_snapshots')
      .select('grid_frequency_hz,voltage_kv,current_load_gw,discom_status,demand_mw,captured_at')
      .eq('property_id', propertyId)
      .order('captured_at', { ascending: false })
      .limit(7);
    assertNoDbError(snapshotsError);

    const { data: events, error: eventsError } = await db
      .from('grid_events')
      .select('id,property_id,description,severity,occurred_at')
      .eq('property_id', propertyId)
      .order('occurred_at', { ascending: false })
      .limit(10);
    assertNoDbError(eventsError);

    const newest = (snapshots || [])[0];
    const demandSeries = [...(snapshots || [])]
      .reverse()
      .map((item: any) => ({
        time: new Date(item.captured_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
        demand: Number(item.demand_mw),
      }));

    const eventList = (events || []).map((event: any) => ({
      id: event.id,
      timestamp: event.occurred_at,
      description: event.description,
      severity: String(event.severity || 'Info'),
    }));

    if (eventList.length === 0 && demandSeries.length > 0) {
      const generated = demandSeries.slice(-4).reverse().map((item) => ({
        id: randomUUID(),
        timestamp: new Date().toISOString(),
        description: `Demand observed at ${item.demand} MW`,
        severity: getSeverityFromDemand(item.demand),
      }));
      sendSuccess(res, {
        stats: {
          gridFrequency: Number(newest?.grid_frequency_hz || 49.98),
          voltageLevel: Number(newest?.voltage_kv || 230.5),
          currentLoad: Number(newest?.current_load_gw || 1.2),
          discomStatus: String(newest?.discom_status || 'Connected'),
        },
        demandSeries,
        events: generated,
      });
      return;
    }

    sendSuccess(res, {
      stats: {
        gridFrequency: Number(newest?.grid_frequency_hz || 49.98),
        voltageLevel: Number(newest?.voltage_kv || 230.5),
        currentLoad: Number(newest?.current_load_gw || 1.2),
        discomStatus: String(newest?.discom_status || 'Connected'),
      },
      demandSeries,
      events: eventList,
    });
  }),
);

router.get(
  '/carbon/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();

    const { data: existingRows, error: existingError } = await db
      .from('carbon_metrics_monthly')
      .select('id,property_id,month_label,co2_saved_kg,co2_offset_kg,renewable_kwh,created_at')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: false })
      .limit(6);
    assertNoDbError(existingError);

    if (!existingRows || existingRows.length === 0) {
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      const saved = [186, 305, 237, 173, 209, 214];
      const offset = [80, 200, 120, 190, 130, 140];
      const renewable = [210, 320, 280, 240, 290, 310];

      const seedPayload = labels.map((label, index) => ({
        id: randomUUID(),
        property_id: propertyId,
        month_label: label,
        co2_saved_kg: saved[index],
        co2_offset_kg: offset[index],
        renewable_kwh: renewable[index],
      }));
      const { error: seedError } = await db.from('carbon_metrics_monthly').insert(seedPayload);
      assertNoDbError(seedError);
    }

    const { data: rows, error } = await db
      .from('carbon_metrics_monthly')
      .select('month_label,co2_saved_kg,co2_offset_kg,renewable_kwh')
      .eq('property_id', propertyId)
      .order('created_at', { ascending: true })
      .limit(12);
    assertNoDbError(error);

    const list = rows || [];
    const totalSaved = list.reduce((sum: number, row: any) => sum + Number(row.co2_saved_kg || 0), 0);
    const totalOffset = list.reduce((sum: number, row: any) => sum + Number(row.co2_offset_kg || 0), 0);
    const renewableTotal = list.reduce((sum: number, row: any) => sum + Number(row.renewable_kwh || 0), 0);

    sendSuccess(res, {
      monthly: list.map((row: any) => ({
        month: row.month_label,
        saved: Number(row.co2_saved_kg),
        offset: Number(row.co2_offset_kg),
      })),
      stats: {
        totalSavedKg: Number(totalSaved.toFixed(2)),
        totalOffsetKg: Number(totalOffset.toFixed(2)),
        renewableKwh: Number(renewableTotal.toFixed(2)),
        equivalentTrees: Math.round(totalSaved / 14.7),
      },
    });
  }),
);

export default router;