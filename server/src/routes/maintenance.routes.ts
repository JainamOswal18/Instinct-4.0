import { randomUUID } from 'crypto';
import { Router } from 'express';
import { assertNoDbError, getEaasClient } from '../lib/eaas-db';
import { authenticate } from '../middleware/auth.middleware';
import { AuthRequest } from '../types';
import { asyncHandler } from '../utils/async-handler';
import { sendError, sendSuccess } from '../utils/api-response';

const router = Router();

const formatter = new Intl.DateTimeFormat('en-IN', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});

type ComponentDef = {
  id: string;
  component: string;
  icon: string;
  intervalMonths: number;
  notes: string;
};

const componentDefs: ComponentDef[] = [
  {
    id: 'solar_panels',
    component: 'Solar Panels',
    icon: '☀️',
    intervalMonths: 6,
    notes: 'Clean panels surface, check mounting brackets, inspect wiring and connections',
  },
  {
    id: 'battery',
    component: 'Battery Storage',
    icon: '🔋',
    intervalMonths: 6,
    notes: 'Check charge/discharge cycles, test BMS, inspect terminal connections',
  },
  {
    id: 'inverter',
    component: 'Inverter',
    icon: '⚡',
    intervalMonths: 6,
    notes: 'Firmware update check, efficiency test, cooling fan and heat sink inspection',
  },
  {
    id: 'wiring',
    component: 'Wiring & Connections',
    icon: '🔌',
    intervalMonths: 12,
    notes: 'Inspect all DC/AC cables, check for corrosion, verify earthing',
  },
  {
    id: 'monitoring',
    component: 'Smart Meter & Monitoring',
    icon: '📊',
    intervalMonths: 12,
    notes: 'Verify data accuracy, check connectivity, sync firmware',
  },
];

function addMonths(date: Date, months: number): Date {
  const output = new Date(date);
  output.setMonth(output.getMonth() + months);
  return output;
}

function getStatus(nextServiceAt: Date): 'good' | 'due_soon' | 'overdue' {
  const now = new Date();
  if (nextServiceAt.getTime() < now.getTime()) {
    return 'overdue';
  }

  const dueSoonCutoff = new Date(now);
  dueSoonCutoff.setDate(dueSoonCutoff.getDate() + 30);
  if (nextServiceAt.getTime() <= dueSoonCutoff.getTime()) {
    return 'due_soon';
  }

  return 'good';
}

function buildScheduleDates(activationDate: Date, intervalMonths: number): { lastServicedAt: Date; nextServiceAt: Date } {
  const now = new Date();
  let lastServicedAt = new Date(activationDate);
  let nextServiceAt = addMonths(activationDate, intervalMonths);

  while (nextServiceAt.getTime() < now.getTime()) {
    lastServicedAt = new Date(nextServiceAt);
    nextServiceAt = addMonths(nextServiceAt, intervalMonths);
  }

  return { lastServicedAt, nextServiceAt };
}

async function getOwnedProperty(userId: string, propertyId: string) {
  const db = getEaasClient();
  const { data: property, error } = await db
    .from('properties')
    .select('id,user_id,installation_date')
    .eq('id', propertyId)
    .eq('user_id', userId)
    .maybeSingle();

  assertNoDbError(error);
  return property;
}

router.get(
  '/schedule/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();

    const property = await getOwnedProperty(authReq.user!.userId, propertyId);
    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Property not found');
      return;
    }

    const { data: installation, error: installationError } = await db
      .from('installation_progress')
      .select('system_activated,activation_date')
      .eq('property_id', propertyId)
      .maybeSingle();
    assertNoDbError(installationError);

    const activationRaw = installation?.activation_date || property.installation_date;
    if (!activationRaw) {
      sendError(res, 404, 'NOT_FOUND', 'Active system not found for this property');
      return;
    }

    const activationDate = new Date(activationRaw);
    if (Number.isNaN(activationDate.getTime())) {
      sendError(res, 500, 'INTERNAL_ERROR', 'Invalid activation date');
      return;
    }

    const rows = componentDefs.map((component) => {
      const dates = buildScheduleDates(activationDate, component.intervalMonths);
      return {
        id: randomUUID(),
        property_id: propertyId,
        component_id: component.id,
        component_name: component.component,
        icon: component.icon,
        last_serviced_at: dates.lastServicedAt.toISOString(),
        next_service_at: dates.nextServiceAt.toISOString(),
        notes: component.notes,
        updated_at: new Date().toISOString(),
      };
    });

    const { error: upsertError } = await db.from('maintenance_schedule').upsert(rows, {
      onConflict: 'property_id,component_id',
    });
    assertNoDbError(upsertError);

    const { data: scheduleRows, error: scheduleError } = await db
      .from('maintenance_schedule')
      .select('component_id,component_name,icon,last_serviced_at,next_service_at,notes')
      .eq('property_id', propertyId);
    assertNoDbError(scheduleError);

    const orderMap = new Map(componentDefs.map((component, index) => [component.id, index]));
    const ordered = (scheduleRows || []).sort(
      (left, right) => (orderMap.get(left.component_id) ?? 999) - (orderMap.get(right.component_id) ?? 999),
    );

    sendSuccess(res, {
      schedule: ordered.map((row) => {
        const lastServicedAt = row.last_serviced_at ? new Date(row.last_serviced_at) : null;
        const nextServiceAt = new Date(row.next_service_at);

        return {
          id: row.component_id,
          component: row.component_name,
          icon: row.icon,
          lastServiced: lastServicedAt ? formatter.format(lastServicedAt) : '-',
          nextService: formatter.format(nextServiceAt),
          status: getStatus(nextServiceAt),
          notes: row.notes,
        };
      }),
    });
  }),
);

router.get(
  '/history/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();

    const property = await getOwnedProperty(authReq.user!.userId, propertyId);
    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Property not found');
      return;
    }

    const { data: historyRows, error } = await db
      .from('service_history')
      .select('id,serviced_at,component_name,service_type,engineer_name,service_notes')
      .eq('property_id', propertyId)
      .order('serviced_at', { ascending: false });
    assertNoDbError(error);

    sendSuccess(res, {
      history: (historyRows || []).map((row) => ({
        id: row.id,
        date: formatter.format(new Date(row.serviced_at)),
        component: row.component_name,
        type: row.service_type,
        engineer: row.engineer_name,
        notes: row.service_notes,
      })),
    });
  }),
);

router.get(
  '/upcoming/:propertyId',
  authenticate,
  asyncHandler(async (req, res) => {
    const authReq = req as AuthRequest;
    const propertyId = String(req.params.propertyId);
    const db = getEaasClient();

    const property = await getOwnedProperty(authReq.user!.userId, propertyId);
    if (!property) {
      sendError(res, 404, 'NOT_FOUND', 'Property not found');
      return;
    }

    const { data: visitRows, error } = await db
      .from('upcoming_visits')
      .select('id,visit_date,visit_type,engineer_name,components,confirmed')
      .eq('property_id', propertyId)
      .gte('visit_date', new Date().toISOString())
      .order('visit_date', { ascending: true });
    assertNoDbError(error);

    sendSuccess(res, {
      visits: (visitRows || []).map((row) => ({
        id: row.id,
        date: formatter.format(new Date(row.visit_date)),
        type: row.visit_type,
        engineer: row.engineer_name,
        components: Array.isArray(row.components) ? row.components : [],
        confirmed: Boolean(row.confirmed),
      })),
    });
  }),
);

export default router;
