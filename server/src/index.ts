import 'dotenv/config';
import http from 'http';
import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { WebSocketServer } from 'ws';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import surveyRoutes from './routes/survey.routes';
import subscriptionRoutes from './routes/subscription.routes';
import paymentRoutes from './routes/payment.routes';
import installationRoutes from './routes/installation.routes';
import energyRoutes from './routes/energy.routes';
import notificationsRoutes from './routes/notifications.routes';
import alertsRoutes from './routes/alerts.routes';
import billingRoutes from './routes/billing.routes';
import supportRoutes from './routes/support.routes';
import aiRoutes from './routes/ai.routes';
import maintenanceRoutes from './routes/maintenance.routes';
import providerDashboardRoutes from './routes/provider.dashboard.routes';
import providerInstallationsRoutes from './routes/provider.installations.routes';
import providerCustomersRoutes from './routes/provider.customers.routes';
import providerRevenueRoutes from './routes/provider.revenue.routes';
import providerTicketsRoutes from './routes/provider.tickets.routes';
import providerEquipmentRoutes from './routes/provider.equipment.routes';
import providerAlertsRoutes from './routes/provider.alerts.routes';
import swaggerSpec from './config/swagger';
import { verifyToken } from './utils/jwt';
import { publishEnergyEvent } from './utils/realtime';

const app = express();
const PORT = parseInt(process.env.PORT ?? '3001', 10);

// ── Middleware ────────────────────────────────────────────────
app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Routes ────────────────────────────────────────────────────
/**
 * @openapi
 * /health:
 *   get:
 *     tags:
 *       - Health
 *     summary: Server health check
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 */
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
app.use(
  ['/provider', '/api/provider'],
  providerDashboardRoutes,
  providerInstallationsRoutes,
  providerCustomersRoutes,
  providerRevenueRoutes,
  providerTicketsRoutes,
  providerEquipmentRoutes,
  providerAlertsRoutes,
);

// ── Swagger UI ────────────────────────────────────────────────
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Instinct 4.0 API Docs',
  swaggerOptions: { persistAuthorization: true },
}));
app.get('/api/docs.json', (_req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// 404
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

// ── Start ─────────────────────────────────────────────────────
async function main() {
  console.log('✓ Supabase mode active');

  const server = http.createServer(app);
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (req, socket, head) => {
    const url = req.url || '';
    if (!url.startsWith('/energy/stream/')) {
      socket.destroy();
      return;
    }

    const [, queryString] = url.split('?');
    const params = new URLSearchParams(queryString || '');
    const token = params.get('token');
    if (!token) {
      socket.destroy();
      return;
    }

    try {
      verifyToken(token);
    } catch {
      socket.destroy();
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });

  wss.on('connection', (ws, req) => {
    const segments = (req.url || '').split('?')[0].split('/');
    const propertyId = segments[segments.length - 1] || 'unknown';

    const interval = setInterval(() => {
      const solarKw = Number((Math.random() * 4 + 2).toFixed(2));
      const gridKw = Number((Math.random() * 1.2).toFixed(2));
      const consumption = Number((solarKw + gridKw).toFixed(2));
      const timestamp = new Date().toISOString();
      ws.send(
        JSON.stringify({
          type: 'ENERGY_UPDATE',
          data: {
            propertyId,
            timestamp,
            solarKw,
            batteryPercent: Math.round(Math.random() * 40 + 50),
            gridKw,
            consumption,
          },
        }),
      );

      publishEnergyEvent({
        propertyId,
        timestamp,
        solarKw,
        batteryPercent: Math.round(Math.random() * 40 + 50),
        gridKw,
        consumption,
      }).catch(() => {
        // no-op for local stream stability
      });
    }, 15000);

    ws.on('close', () => clearInterval(interval));
  });

  server.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`);
  });
}

main().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
