import 'dotenv/config';
import { randomUUID } from 'crypto';
import { createClient } from '@supabase/supabase-js';

const baseUrl = process.env.SMOKE_BASE_URL || `http://localhost:${process.env.PORT || '3001'}`;

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY/SUPABASE_ANON_KEY are required');
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
const db = supabase.schema('eaas');

const results = [];

function record(name, ok, detail = '') {
  results.push({ name, ok, detail });
}

function assertCondition(condition, message) {
  if (!condition) throw new Error(message);
}

async function callApi(name, path, options = {}, expectedStatus = [200]) {
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

  await callApi('health', '/health');

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
  );

  const token = register.body?.data?.accessToken;
  const userId = register.body?.data?.user?.id;
  assertCondition(Boolean(token), 'register token missing');
  assertCondition(Boolean(userId), 'register userId missing');

  await callApi(
    'auth.login',
    '/api/auth/login',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: 'password123' }),
    },
    [200],
  );

  await callApi('auth.me', '/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('user.profile.get', '/api/user/profile', { headers: { Authorization: `Bearer ${token}` } }, [200]);

  await callApi(
    'user.profile.patch',
    '/api/user/profile',
    {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Smoke User Updated', phone: '+911234567890', address: 'Smoke Street 1' }),
    },
    [200],
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
  );

  const propertyId = property.body?.data?.propertyId;
  assertCondition(Boolean(propertyId), 'propertyId missing');

  await callApi('user.properties.get', '/api/user/properties', { headers: { Authorization: `Bearer ${token}` } }, [200]);

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
  );
  const proposalId = proposal.body?.data?.proposalId;
  assertCondition(Boolean(proposalId), 'proposalId missing');

  await callApi(
    'subscription.proposal.get',
    `/api/subscription/proposal/${proposalId}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
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
  );

  await callApi(
    'payment.history',
    `/api/payment/history?propertyId=${encodeURIComponent(propertyId)}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
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
  );
  await callApi(
    'installation.progress',
    `/api/installation/progress/${propertyId}`,
    { headers: { Authorization: `Bearer ${token}` } },
    [200],
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

  await callApi('energy.realtime', `/api/energy/realtime/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('energy.stats', `/api/energy/stats/${propertyId}?period=month`, { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('energy.stream', `/api/energy/stream/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);

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

  await callApi('notifications.list', '/api/notifications?limit=20&offset=0', { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('notifications.mark-read', `/api/notifications/${notificationId}/read`, { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('notifications.read-all', '/api/notifications/read-all', { method: 'PATCH', headers: { Authorization: `Bearer ${token}` } }, [200]);

  await seedRow('seed.alerts', 'alerts', {
    id: randomUUID(),
    property_id: propertyId,
    category: 'consumption',
    severity: 'warning',
    title: 'Smoke Alert',
    message: 'High usage detected',
    read: false,
  });
  await callApi('alerts.list', `/api/alerts/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);

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

  await callApi('billing.current', `/api/billing/current/${propertyId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('billing.history', `/api/billing/history/${propertyId}?limit=10&offset=0`, { headers: { Authorization: `Bearer ${token}` } }, [200]);
  await callApi('billing.download', `/api/billing/download/${billId}`, { headers: { Authorization: `Bearer ${token}` } }, [200]);

  await callApi(
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
  );
  await callApi('support.tickets', '/api/support/tickets', { headers: { Authorization: `Bearer ${token}` } }, [200]);

  await callApi(
    'ai.chat',
    '/api/ai/chat',
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ propertyId, message: 'How can I reduce my bill?' }),
    },
    [200],
  );
  await callApi('ai.history', `/api/ai/chat/${propertyId}/history`, { headers: { Authorization: `Bearer ${token}` } }, [200]);

  await callApi('auth.logout', '/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${token}` } }, [200]);

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
