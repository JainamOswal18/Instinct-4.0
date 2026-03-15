import 'dotenv/config';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const baseUrl = process.env.SMOKE_BASE_URL || `http://localhost:${process.env.PORT || '3001'}`;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY are required');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const appSchema = process.env.APP_DB_SCHEMA || 'eaas';
const db = supabase.schema(appSchema);

const results = [];
const coveredOperations = new Set();

function collectRouteOperations() {
  const root = process.cwd();
  const routesDir = path.join(root, 'src', 'routes');
  const routeBaseMap = {
    'auth.routes.ts': '/auth',
    'survey.routes.ts': '/survey',
    'subscription.routes.ts': '/subscription',
    'payment.routes.ts': '/payment',
    'installation.routes.ts': '/installation',
    'energy.routes.ts': '/energy',
    'notifications.routes.ts': '/notifications',
    'alerts.routes.ts': '/alerts',
    'billing.routes.ts': '/billing',
    'support.routes.ts': '/support',
    'maintenance.routes.ts': '/maintenance',
    'user.routes.ts': '/user',
    'ai.routes.ts': '/ai',
    'provider.dashboard.routes.ts': '/provider',
    'provider.installations.routes.ts': '/provider',
    'provider.customers.routes.ts': '/provider',
    'provider.revenue.routes.ts': '/provider',
    'provider.tickets.routes.ts': '/provider',
    'provider.equipment.routes.ts': '/provider',
    'provider.alerts.routes.ts': '/provider',
    'provider.billing.routes.ts': '/provider',
    'provider.profile.routes.ts': '/provider',
  };

  const operations = new Set(['GET /health']);
  for (const [fileName, base] of Object.entries(routeBaseMap)) {
    const content = fs.readFileSync(path.join(routesDir, fileName), 'utf8');
    const regex = /router\.(get|post|patch|put|delete)\s*\(\s*['"`]([^'"`]+)['"`]/gms;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const method = match[1].toUpperCase();
      const subPath = match[2];
      const joined = `${base}${subPath.startsWith('/') ? subPath : `/${subPath}`}`;
      const normalized = joined.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
      const finalPath = normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized;
      operations.add(`${method} ${finalPath}`);
    }
  }

  return operations;
}

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
}

function assertCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function callApi(name, path, options = {}, expectedStatus = [200], operationKey) {
  const expected = Array.isArray(expectedStatus) ? expectedStatus : [expectedStatus];
  const response = await fetch(`${baseUrl}${path}`, options);
  const text = await response.text();
  let body;
  try {
    body = text ? JSON.parse(text) : {};
  } catch {
    body = { raw: text };
  }

  const ok = expected.includes(response.status);
  record(name, ok, `status=${response.status}`);
  if (operationKey) {
    coveredOperations.add(operationKey);
  }
  if (!ok) {
    throw new Error(`${name} failed with status ${response.status}: ${JSON.stringify(body)}`);
  }
  return { status: response.status, body };
}

async function seedRow(name, table, payload) {
  const { error } = await db.from(table).insert(payload);
  if (error) {
    record(name, false, error.message);
    throw new Error(`${name} seed failed: ${error.message}`);
  }
  record(name, true, 'seeded');
}

async function main() {
  const email = `smoke_${Date.now()}@example.com`;

  await callApi('health', '/health', {}, [200], 'GET /health');

  const register = await callApi(
    'auth.register',
    '/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password: 'password123',
        name: 'Smoke User',
        role: 'CITIZEN',
      }),
    },
    [201],
    'POST /auth/register',
  );

  const token = register.body?.data?.accessToken;
  const userId = register.body?.data?.user?.id;
  assertCondition(Boolean(token), 'register token missing');
  assertCondition(Boolean(userId), 'register userId missing');

  const adminEmail = `smoke_admin_${Date.now()}@example.com`;
  const adminRegister = await callApi(
    'auth.register.admin',
    '/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: adminEmail,
        password: 'password123',
        name: 'Smoke Admin',
        role: 'ADMIN',
      }),
    },
    [201],
    'POST /auth/register',
  );

  const adminToken = adminRegister.body?.data?.accessToken;
  const adminUserId = adminRegister.body?.data?.user?.id;

  const executiveEmail = `smoke_exec_${Date.now()}@example.com`;
  const executiveRegister = await callApi(
    'auth.register.executive',
    '/api/auth/register',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: executiveEmail,
        password: 'password123',
        name: 'Smoke Executive',
        role: 'EXECUTIVE',
      }),
    },
    [201],
    'POST /auth/register',
  );
  const executiveToken = executiveRegister.body?.data?.accessToken;

  await callApi(
    'auth.login',
    '/api/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'password123' }),
    },
    [200],
    'POST /auth/login',
  );

  await callApi('auth.me', '/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /auth/me');
  await callApi('user.profile.get', '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /user/profile');

  await callApi(
    'user.profile.patch',
    '/api/user/profile',
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke User Updated', phone: '+911234567890', address: 'Smoke Street 1' }),
    },
    [200],
    'PATCH /user/profile',
  );

  const property = await callApi(
    'user.properties.post',
    '/api/user/properties',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke Property', address: 'Lane 42', type: 'residential' }),
    },
    [201],
    'POST /user/properties',
  );

  const propertyId = property.body?.data?.propertyId;
  assertCondition(Boolean(propertyId), 'propertyId missing');

  await callApi('user.properties.get', '/api/user/properties', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /user/properties');

  await callApi(
    'user.properties.patch',
    `/api/user/properties/${propertyId}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke Property Updated', type: 'residential' }),
    },
    [200],
    'PATCH /user/properties/{id}',
  );

  const survey = await callApi(
    'survey.submit',
    '/api/survey/submit',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        propertyType: 'residential',
        monthlyBill: 5200,
        monthlyConsumption: 610,
        peakHours: '18:00-22:00',
        occupants: 4,
        appliances: ['AC', 'Fridge', 'Washing Machine'],
      }),
    },
    [200],
    'POST /survey/submit',
  );
  const surveyId = survey.body?.data?.surveyId;
  assertCondition(Boolean(surveyId), 'surveyId missing');

  const proposal = await callApi(
    'subscription.generate-proposal',
    '/api/subscription/generate-proposal',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, surveyId }),
    },
    [200],
    'POST /subscription/generate-proposal',
  );
  const proposalId = proposal.body?.data?.proposalId;
  assertCondition(Boolean(proposalId), 'proposalId missing');

  await callApi(
    'subscription.proposal.get',
    `/api/subscription/proposal/${proposalId}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
    'GET /subscription/proposal/{proposalId}',
  );

  const initiate = await callApi(
    'payment.initiate',
    '/api/payment/initiate',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        proposalId,
        paymentMethod: 'UPI',
        amount: 5000,
        currency: 'INR',
      }),
    },
    [200],
    'POST /payment/initiate',
  );

  const paymentId = initiate.body?.data?.paymentId;
  const orderId = initiate.body?.data?.orderId;
  assertCondition(Boolean(paymentId && orderId), 'payment identifiers missing');

  await callApi(
    'payment.verify',
    '/api/payment/verify',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentId, orderId, signature: 'sig_smoke_test' }),
    },
    [200],
    'POST /payment/verify',
  );

  await callApi(
    'payment.history',
    `/api/payment/history?propertyId=${encodeURIComponent(propertyId)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
    'GET /payment/history',
  );

  await callApi(
    'installation.update',
    '/api/installation/update',
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, step: 'engineerAssigned', data: { engineer_name: 'Smoke Engineer' } }),
    },
    [200],
    'PATCH /installation/update',
  );
  await callApi(
    'installation.activate',
    '/api/installation/update',
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, step: 'systemActivated' }),
    },
    [200],
    'PATCH /installation/update',
  );
  await callApi(
    'installation.progress',
    `/api/installation/progress/${propertyId}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
    'GET /installation/progress/{propertyId}',
  );

  await seedRow('seed.energy_stats', 'energy_stats', {
    id: randomUUID(),
    property_id: propertyId,
    date: new Date().toISOString(),
    period: 'day',
    production: 14.2,
    consumption: 12.5,
    grid_usage: 3.1,
    battery_percent: 68,
    solar_kw: 4.2,
    grid_kw: 1.1,
    exporting: true,
  });

  await callApi('energy.realtime', `/api/energy/realtime/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /energy/realtime/{propertyId}');
  await callApi('energy.stats', `/api/energy/stats/${propertyId}?period=month`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /energy/stats/{propertyId}');
  await callApi('energy.stream', `/api/energy/stream/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /energy/stream/{propertyId}');

  const gridInsights = await callApi('insights.grid', `/api/insights/grid/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);
  const gridDemandSeries = gridInsights.body?.data?.demandSeries;
  const gridEvents = gridInsights.body?.data?.events;
  record('insights.grid.has-demand', Array.isArray(gridDemandSeries) && gridDemandSeries.length > 0, Array.isArray(gridDemandSeries) ? `points=${gridDemandSeries.length}` : 'missing series');
  assertCondition(Array.isArray(gridDemandSeries) && gridDemandSeries.length > 0, 'Grid insights demand series missing');
  record('insights.grid.has-events', Array.isArray(gridEvents) && gridEvents.length > 0, Array.isArray(gridEvents) ? `events=${gridEvents.length}` : 'missing events');
  assertCondition(Array.isArray(gridEvents) && gridEvents.length > 0, 'Grid insights events missing');

  const notificationId = randomUUID();
  await seedRow('seed.notifications', 'notifications', {
    id: notificationId,
    user_id: userId,
    type: 'info',
    title: 'Smoke Notification',
    message: 'Testing notification endpoint',
    route: '/dashboard',
    read: false,
    dismissible: true,
    persistent: false,
  });

  await callApi('notifications.list', '/api/notifications?limit=20&offset=0', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /notifications');
  await callApi('notifications.mark-read', `/api/notifications/${notificationId}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }, [200], 'PATCH /notifications/{notificationId}/read');
  await callApi('notifications.read-all', '/api/notifications/read-all', { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }, [200], 'PATCH /notifications/read-all');

  await seedRow('seed.alerts', 'alerts', {
    id: randomUUID(),
    property_id: propertyId,
    category: 'consumption',
    severity: 'warning',
    title: 'Smoke Alert',
    message: 'High usage detected',
    read: false,
  });
  await callApi('alerts.list', `/api/alerts/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /alerts/{propertyId}');

  const billId = randomUUID();
  await seedRow('seed.bills', 'bills', {
    id: billId,
    property_id: propertyId,
    month: '2026-03',
    total_amount: 4200,
    subscription_fee: 2500,
    usage_charge: 1400,
    taxes: 300,
    status: 'pending',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    pdf_url: null,
  });

  await callApi('billing.current', `/api/billing/current/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /billing/current/{propertyId}');
  await callApi('billing.history', `/api/billing/history/${propertyId}?limit=10&offset=0`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /billing/history/{propertyId}');
  await callApi('billing.download', `/api/billing/download/${billId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /billing/download/{billId}');

  const supportTicket = await callApi(
    'support.ticket.create',
    '/api/support/ticket',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        category: 'technical',
        priority: 'medium',
        title: 'Smoke support ticket',
        description: 'Smoke suite verifying support ticket flow end to end.',
      }),
    },
    [201],
    'POST /support/ticket',
  );
  const createdTicketId = supportTicket.body?.data?.ticketId;
  await callApi('support.tickets', '/api/support/tickets', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /support/tickets');
  await callApi('support.faqs', '/api/support/faqs', { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /support/faqs');

  const installationId = randomUUID();
  await seedRow('seed.installations', 'installations', {
    id: installationId,
    property_id: propertyId,
    service_title: 'Solar Energy',
    customer_name: 'Smoke User Updated',
    machine_name: 'Smoke Inverter 5kW',
    machine_cost: 275000,
    estimated_setup_days: 14,
    status: 'SURVEY',
    assigned_technician: null,
    notes: 'Initial installation request',
    subscription_plan_summary: { planName: 'Solar Rooftop Starter', totalMonthly: 3500 },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const equipmentId = randomUUID();
  await seedRow('seed.equipment', 'equipment', {
    id: equipmentId,
    installation_id: installationId,
    name: 'Main Solar Inverter',
    model: 'Growatt 5kW',
    serial_number: `GW-${Date.now()}`,
    status: 'ONLINE',
    health_score: 95,
    installed_date: new Date().toISOString(),
    warranty_expiry: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    last_maintenance_date: null,
    next_maintenance_date: null,
    customer_name: 'Smoke User Updated',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  });

  const providerAlertId = randomUUID();
  await seedRow('seed.provider_alerts', 'provider_alerts', {
    id: providerAlertId,
    type: 'ticket',
    severity: 'warning',
    title: 'Smoke Provider Alert',
    message: 'Provider alert seeded by smoke test',
    related_id: createdTicketId,
    dismissed: false,
    created_at: new Date().toISOString(),
  });

  await callApi('provider.dashboard', '/api/provider/dashboard', { headers: { Authorization: `Bearer ${executiveToken}` } }, [200], 'GET /provider/dashboard');

  await callApi(
    'provider.installations.list',
    '/api/provider/installations?page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/installations',
  );
  await callApi(
    'provider.installations.pipeline',
    '/api/provider/installations/pipeline',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/installations/pipeline',
  );
  await callApi(
    'provider.installations.detail',
    `/api/provider/installations/${installationId}`,
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/installations/{installationId}',
  );
  await callApi(
    'provider.installations.update',
    `/api/provider/installations/${installationId}/status`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'PROCUREMENT', notes: 'Smoke ordered equipment', assignedTechnician: 'Smoke Tech' }),
    },
    [200],
    'PATCH /provider/installations/{installationId}/status',
  );

  await callApi(
    'provider.customers.list',
    '/api/provider/customers?search=smoke&page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/customers',
  );
  await callApi(
    'provider.customers.consumption',
    `/api/provider/customers/${propertyId}/consumption?period=day`,
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/customers/{propertyId}/consumption',
  );
  await callApi(
    'provider.consumption.aggregate',
    '/api/provider/consumption/aggregate',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/consumption/aggregate',
  );

  await callApi('provider.revenue.overview', '/api/provider/revenue/overview', { headers: { Authorization: `Bearer ${executiveToken}` } }, [200], 'GET /provider/revenue/overview');
  await callApi(
    'provider.revenue.payments',
    '/api/provider/revenue/payments?page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/revenue/payments',
  );
  await callApi(
    'provider.revenue.remind',
    '/api/provider/revenue/remind',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ customerId: userId, billId, message: 'Smoke reminder for pending payment' }),
    },
    [200],
    'POST /provider/revenue/remind',
  );

  await callApi(
    'provider.tickets.list',
    '/api/provider/tickets?page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/tickets',
  );
  await callApi(
    'provider.tickets.detail',
    `/api/provider/tickets/${createdTicketId}`,
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/tickets/{ticketId}',
  );
  await callApi(
    'provider.tickets.update',
    `/api/provider/tickets/${createdTicketId}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'awaiting_approval', providerNotes: 'Smoke provider review in progress' }),
    },
    [200],
    'PATCH /provider/tickets/{ticketId}',
  );
  await callApi(
    'provider.tickets.approve',
    `/api/provider/tickets/${createdTicketId}/approve`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ approvalAction: 'dispatch_tech', providerNotes: 'Smoke dispatch approved' }),
    },
    [200],
    'POST /provider/tickets/{ticketId}/approve',
  );
  await callApi(
    'provider.tickets.resolve',
    `/api/provider/tickets/${createdTicketId}/resolve`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ providerNotes: 'Smoke issue resolved', approvalAction: 'none' }),
    },
    [200],
    'POST /provider/tickets/{ticketId}/resolve',
  );

  await callApi(
    'provider.equipment.list',
    '/api/provider/equipment?page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/equipment',
  );
  await callApi(
    'provider.equipment.detail',
    `/api/provider/equipment/${equipmentId}`,
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/equipment/{equipmentId}',
  );
  await callApi(
    'provider.equipment.status',
    `/api/provider/equipment/${equipmentId}/status`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'NEEDS_ATTENTION', healthScore: 60 }),
    },
    [200],
    'PATCH /provider/equipment/{equipmentId}/status',
  );
  await callApi(
    'provider.equipment.maintenance',
    `/api/provider/equipment/${equipmentId}/maintenance`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ nextMaintenanceDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), notes: 'Smoke maintenance schedule' }),
    },
    [200],
    'POST /provider/equipment/{equipmentId}/maintenance',
  );

  await callApi(
    'provider.alerts.list',
    '/api/provider/alerts?dismissed=false&page=1&limit=20',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/alerts',
  );
  await callApi(
    'provider.alerts.dismiss',
    `/api/provider/alerts/${providerAlertId}/dismiss`,
    { method: 'PATCH', headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'PATCH /provider/alerts/{alertId}/dismiss',
  );
  await callApi(
    'provider.alerts.dismiss-all',
    '/api/provider/alerts/dismiss-all?severity=warning',
    { method: 'PATCH', headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'PATCH /provider/alerts/dismiss-all',
  );

  const sentDraft = await callApi(
    'provider.billing.draft.create.sent',
    '/api/provider/billing/drafts',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        surveyId,
        title: 'Smoke Custom Plan Sent',
        description: 'Sent from smoke test',
        lineItems: [{ label: 'Inverter', amount: 45000 }],
        charges: { subscriptionFee: 2400, usageCharge: 1300, taxes: 300 },
        status: 'sent',
      }),
    },
    [200],
    'POST /provider/billing/drafts',
  );
  const sentDraftBillId = sentDraft.body?.data?.billId;
  assertCondition(Boolean(sentDraftBillId), 'sent draft billId missing');

  await callApi(
    'provider.billing.draft.create.draft',
    '/api/provider/billing/drafts',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        surveyId,
        title: 'Smoke Custom Plan Draft',
        description: 'Draft from smoke test',
        lineItems: [{ label: 'Battery', amount: 52000 }],
        charges: { subscriptionFee: 2200, usageCharge: 1200, taxes: 250 },
        status: 'draft',
      }),
    },
    [200],
    'POST /provider/billing/drafts',
  );

  const disputeDraft = await callApi(
    'provider.billing.draft.create.dispute-target',
    '/api/provider/billing/drafts',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        propertyId,
        surveyId,
        title: 'Smoke Dispute Target Plan',
        description: 'Dispute target',
        lineItems: [{ label: 'Panels', amount: 78000 }],
        charges: { subscriptionFee: 2600, usageCharge: 1400, taxes: 320 },
        status: 'sent',
      }),
    },
    [200],
    'POST /provider/billing/drafts',
  );
  const disputeBillId = disputeDraft.body?.data?.billId;
  assertCondition(Boolean(disputeBillId), 'dispute draft billId missing');

  await callApi(
    'provider.billing.draft.list',
    '/api/provider/billing/drafts',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/billing/drafts',
  );

  await callApi(
    'provider.requests.queue',
    '/api/provider/requests',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/requests',
  );

  await callApi(
    'provider.profile.get',
    '/api/provider/profile',
    { headers: { Authorization: `Bearer ${executiveToken}` } },
    [200],
    'GET /provider/profile',
  );

  await callApi(
    'provider.profile.patch',
    '/api/provider/profile',
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${executiveToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        companyName: 'Smoke Energy Pvt Ltd',
        brandingName: 'Smoke Energy',
        supportEmail: 'smoke-support@example.com',
        supportPhone: '+919000000001',
        notificationPreferences: { email: true, sms: false },
      }),
    },
    [200],
    'PATCH /provider/profile',
  );

  await callApi(
    'billing.accept',
    `/api/billing/${sentDraftBillId}/accept`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    },
    [200],
    'POST /billing/{billId}/accept',
  );

  await callApi(
    'billing.dispute',
    `/api/billing/${disputeBillId}/dispute`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        subject: 'Smoke billing dispute',
        description: 'The billed usage appears incorrect for this cycle.',
        priority: 'medium',
      }),
    },
    [200],
    'POST /billing/{billId}/dispute',
  );

  await seedRow('seed.service_history', 'service_history', {
    id: randomUUID(),
    property_id: propertyId,
    component_name: 'Solar Panels',
    service_type: 'Routine Cleaning',
    engineer_name: 'Smoke Engineer',
    service_notes: 'Smoke service history entry.',
    serviced_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  });

  await seedRow('seed.upcoming_visits', 'upcoming_visits', {
    id: randomUUID(),
    property_id: propertyId,
    visit_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    visit_type: 'Bi-annual Service',
    engineer_name: 'Smoke Engineer',
    components: ['Solar Panels', 'Inverter', 'Battery Storage'],
    confirmed: false,
  });

  await callApi('maintenance.schedule', `/api/maintenance/schedule/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /maintenance/schedule/{propertyId}');
  await callApi('maintenance.history', `/api/maintenance/history/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /maintenance/history/{propertyId}');
  await callApi('maintenance.upcoming', `/api/maintenance/upcoming/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /maintenance/upcoming/{propertyId}');

  await callApi('user.admin.users', '/api/user/admin/users?limit=20&offset=0', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /user/admin/users');
  await callApi(
    'user.admin.status',
    `/api/user/admin/users/${adminUserId}/status`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ isActive: true }),
    },
    [200],
    'PATCH /user/admin/users/{id}/status',
  );
  await callApi(
    'user.admin.role',
    `/api/user/admin/users/${adminUserId}/role`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'ADMIN' }),
    },
    [200],
    'PATCH /user/admin/users/{id}/role',
  );
  await callApi('user.admin.audit', '/api/user/admin/audit-logs?limit=20&offset=0', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /user/admin/audit-logs');

  await callApi('subscription.admin.properties', '/api/subscription/admin/properties?limit=20&offset=0', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /subscription/admin/properties');
  await callApi(
    'subscription.admin.update-status',
    `/api/subscription/admin/properties/${propertyId}/subscription-status`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ subscriptionStatus: 'ACTIVE' }),
    },
    [200],
    'PATCH /subscription/admin/properties/{propertyId}/subscription-status',
  );

  await callApi('billing.admin.all', '/api/billing/admin/all?limit=20&offset=0', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /billing/admin/all');
  await callApi(
    'billing.admin.adjust',
    `/api/billing/admin/${billId}/adjust`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ usageCharge: 1300, subscriptionFee: 2500, taxes: 300, note: 'smoke adjust' }),
    },
    [200],
    'PATCH /billing/admin/{billId}/adjust',
  );

  await callApi('support.admin.tickets', '/api/support/admin/tickets?limit=20&offset=0', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /support/admin/tickets');
  await callApi(
    'support.admin.ticket.detail',
    `/api/support/admin/tickets/${createdTicketId}`,
    { headers: { Authorization: `Bearer ${adminToken}` } },
    [200],
    'GET /support/admin/tickets/{ticketId}',
  );
  await callApi(
    'support.admin.ticket.reply',
    `/api/support/admin/tickets/${createdTicketId}/messages`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: 'Smoke admin reply for support thread validation.' }),
    },
    [201],
    'POST /support/admin/tickets/{ticketId}/messages',
  );
  await callApi(
    'support.admin.update-ticket',
    `/api/support/admin/tickets/${createdTicketId}`,
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'in_progress', priority: 'high' }),
    },
    [200],
    'PATCH /support/admin/tickets/{ticketId}',
  );

  await callApi('energy.admin.overview', '/api/energy/admin/analytics/overview', { headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'GET /energy/admin/analytics/overview');

  await callApi(
    'notifications.admin.broadcast',
    '/api/notifications/admin/broadcast',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Smoke Broadcast', message: 'Smoke broadcast message', type: 'announcement', route: '/dashboard' }),
    },
    [200],
    'POST /notifications/admin/broadcast',
  );

  await callApi(
    'ai.chat',
    '/api/ai/chat',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, message: 'How can I reduce my bill?' }),
    },
    [200],
    'POST /ai/chat',
  );
  await callApi('ai.history', `/api/ai/chat/${propertyId}/history`, { headers: { Authorization: `Bearer ${token}` } }, [200], 'GET /ai/chat/{propertyId}/history');

  await callApi('auth.logout', '/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }, [200], 'POST /auth/logout');
  await callApi('auth.logout.admin', '/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${adminToken}` } }, [200], 'POST /auth/logout');
  await callApi('auth.logout.executive', '/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${executiveToken}` } }, [200], 'POST /auth/logout');

  const { data: dbUser, error: dbUserError } = await db.from('users').select('id,email').eq('id', userId).maybeSingle();
  if (dbUserError) {
    record('db.verify.user', false, dbUserError.message);
    throw new Error(`db verify user failed: ${dbUserError.message}`);
  }
  assertCondition(Boolean(dbUser), 'db verify user missing');
  record('db.verify.user', true, 'user row exists');

  const { data: dbProperty, error: dbPropertyError } = await db
    .from('properties')
    .select('id,user_id')
    .eq('id', propertyId)
    .maybeSingle();
  if (dbPropertyError) {
    record('db.verify.property', false, dbPropertyError.message);
    throw new Error(`db verify property failed: ${dbPropertyError.message}`);
  }
  assertCondition(Boolean(dbProperty), 'db verify property missing');
  record('db.verify.property', true, 'property row exists');

  const routeOps = collectRouteOperations();
  const untested = [...routeOps].filter((op) => !coveredOperations.has(op)).sort();
  record('api.coverage.total', untested.length === 0, `${coveredOperations.size}/${routeOps.size}`);
  if (untested.length > 0) {
    throw new Error(`Untested API operations: ${untested.join(', ')}`);
  }
}

main()
  .then(() => {
    const failed = results.filter((item) => !item.ok);
    console.table(results);
    if (failed.length > 0) {
      console.error(`Smoke test completed with ${failed.length} failures.`);
      process.exit(1);
    }
    console.log(`Smoke test passed (${results.length} checks).`);
    process.exit(0);
  })
  .catch((error) => {
    console.table(results);
    console.error('Smoke test failed:', error.message);
    process.exit(1);
  });
