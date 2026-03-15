import fs from 'fs';
import path from 'path';

const root = process.cwd();
const routesDir = path.join(root, 'src', 'routes');
const openapiPath = path.join(root, 'openapi', 'openapi.json');

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
};

function normalizePath(base, subPath) {
  const joined = `${base}${subPath.startsWith('/') ? subPath : `/${subPath}`}`;
  const normalized = joined.replace(/:([A-Za-z0-9_]+)/g, '{$1}');
  return normalized.length > 1 ? normalized.replace(/\/+$/, '') : normalized;
}

function collectRouteOperations() {
  const operations = new Set(['GET /health']);

  for (const [fileName, base] of Object.entries(routeBaseMap)) {
    const filePath = path.join(routesDir, fileName);
    const content = fs.readFileSync(filePath, 'utf8');

    const regex = /router\.(get|post|patch|put|delete)\s*\(\s*['"`]([^'"`]+)['"`]/gms;
    let match;
    while ((match = regex.exec(content)) !== null) {
      const method = match[1].toUpperCase();
      const subPath = match[2];
      const fullPath = normalizePath(base, subPath);
      operations.add(`${method} ${fullPath}`);
    }
  }

  return operations;
}

function collectOpenApiOperations() {
  const spec = JSON.parse(fs.readFileSync(openapiPath, 'utf8'));
  const operations = new Set();

  for (const [apiPath, methods] of Object.entries(spec.paths || {})) {
    for (const [method, operation] of Object.entries(methods || {})) {
      if (!operation || typeof operation !== 'object') continue;
      const normalizedMethod = method.toUpperCase();
      if (!['GET', 'POST', 'PATCH', 'PUT', 'DELETE'].includes(normalizedMethod)) continue;
      operations.add(`${normalizedMethod} ${apiPath}`);
    }
  }

  return operations;
}

const routeOps = collectRouteOperations();
const docOps = collectOpenApiOperations();

const missingInDocs = [...routeOps].filter((op) => !docOps.has(op)).sort();
const extraInDocs = [...docOps].filter((op) => !routeOps.has(op)).sort();

console.log('Route operations:', routeOps.size);
console.log('OpenAPI operations:', docOps.size);

if (missingInDocs.length) {
  console.log('\nMissing in OpenAPI:');
  for (const op of missingInDocs) console.log(`- ${op}`);
}

if (extraInDocs.length) {
  console.log('\nDocumented but not found in routes:');
  for (const op of extraInDocs) console.log(`- ${op}`);
}

if (missingInDocs.length || extraInDocs.length) {
  process.exit(1);
}

console.log('\nOpenAPI route tally is in sync.');
