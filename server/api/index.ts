import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.routes';
import userRoutes from '../src/routes/user.routes';
import surveyRoutes from '../src/routes/survey.routes';
import subscriptionRoutes from '../src/routes/subscription.routes';
import paymentRoutes from '../src/routes/payment.routes';
import installationRoutes from '../src/routes/installation.routes';
import energyRoutes from '../src/routes/energy.routes';
import notificationsRoutes from '../src/routes/notifications.routes';
import alertsRoutes from '../src/routes/alerts.routes';
import billingRoutes from '../src/routes/billing.routes';
import supportRoutes from '../src/routes/support.routes';
import aiRoutes from '../src/routes/ai.routes';
import maintenanceRoutes from '../src/routes/maintenance.routes';
import swaggerSpec from '../src/config/swagger';

const CDN = 'https://unpkg.com/swagger-ui-dist@5.32.0';

function swaggerHtml(specUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Instinct 4.0 API Docs</title>
  <link rel="stylesheet" href="${CDN}/swagger-ui.css" />
  <style>body{margin:0;background:#fafafa}html{box-sizing:border-box}*,*:before,*:after{box-sizing:inherit}</style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${CDN}/swagger-ui-bundle.js"></script>
  <script src="${CDN}/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = function() {
      SwaggerUIBundle({
        url: '${specUrl}',
        dom_id: '#swagger-ui',
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: 'StandaloneLayout',
        persistAuthorization: true,
      });
    };
  </script>
</body>
</html>`;
}

const app = express();

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use(['/auth', '/api/auth'], authRoutes);
app.use(['/survey', '/api/survey'], surveyRoutes);
app.use(['/subscription', '/api/subscription'], subscriptionRoutes);
app.use(['/payment', '/api/payment'], paymentRoutes);
app.use(['/installation', '/api/installation'], installationRoutes);
app.use(['/energy', '/api/energy'], energyRoutes);
app.use(['/notifications', '/api/notifications'], notificationsRoutes);
app.use(['/alerts', '/api/alerts'], alertsRoutes);
app.use(['/billing', '/api/billing'], billingRoutes);
app.use(['/support', '/api/support'], supportRoutes);
app.use(['/user', '/api/user'], userRoutes);
app.use(['/ai', '/api/ai'], aiRoutes);
app.use(['/maintenance', '/api/maintenance'], maintenanceRoutes);

// ── Swagger UI (CDN-backed, works in serverless) ──────────────
app.get('/api/docs', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerHtml('/api/docs.json'));
});
app.get('/api/docs/', (_req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(swaggerHtml('/api/docs.json'));
});
app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// ── 404 ───────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: 'Resource not found' } });
});

// ── Global error handler ──────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: { code: 'INTERNAL_ERROR', message: 'Something went wrong. Please try again later.' },
  });
});

export default app;
