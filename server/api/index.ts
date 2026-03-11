import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from '../src/routes/auth.routes';
import userRoutes from '../src/routes/user.routes';
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

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

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
  res.status(404).json({ success: false, message: 'Route not found' });
});

// ── Global error handler ──────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

export default app;
