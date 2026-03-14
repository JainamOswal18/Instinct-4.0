// services/apiWrapper.ts
import api from './api';
import * as mockAuth from '../mock/auth';
import * as mockUsage from '../mock/usage';
import * as mockAlerts from '../mock/alerts';
import * as mockAiAdvisor from '../mock/aiAdvisor';
import * as mockSubscription from '../mock/subscription';
import * as mockInstallation from '../mock/installation';
import * as mockMaintenance from '../mock/maintenance';

// ========== CONFIGURATION ==========
const USE_REAL_API = true;      // ⭐ TOGGLE: true = real API, false = all mock
const FALLBACK_ON_ERROR = true; // silently fall back to mock if real API fails

// ========== INTERNAL HELPER ==========

async function handleApiCall<T>(
  apiCall: () => Promise<T>,
  mockFallback: () => T | Promise<T>,
  serviceName: string
): Promise<T> {
  if (!USE_REAL_API) {
    if (__DEV__) console.log(`[MOCK] ${serviceName}`);
    return await mockFallback();
  }

  try {
    if (__DEV__) console.log(`[API] ${serviceName}`);
    const result = await apiCall();
    if (__DEV__) console.log(`[API] ✓ ${serviceName}`);
    return result;
  } catch (error: any) {
    if (__DEV__) console.warn(
      `[API] ✗ ${serviceName} — ${error?.message ?? 'unknown'}${FALLBACK_ON_ERROR ? ' (using mock)' : ''}`
    );
    if (FALLBACK_ON_ERROR) return await mockFallback();
    throw error;
  }
}

// ========== WRAPPED API ==========
export const apiWrapper = {

  // ── AUTH ─────────────────────────────────────────────────────────────────────
  auth: {
    login: (email: string, password: string) =>
      handleApiCall(
        () => api.auth.login(email, password),
        () => mockAuth.loginUser(email, password),
        'Login'
      ),

    // Mock returns `token` — useAuthStore reads `accessToken ?? token` so both work
    register: (name: string, email: string, password: string, phone?: string) =>
      handleApiCall(
        () => api.auth.register(name, email, password, phone),
        async () => {
          await new Promise(r => setTimeout(r, 800));
          return {
            success: true,
            data: {
              user: { id: `user_${Date.now()}`, email, name, phone },
              token: 'mock_access_token',
            },
          };
        },
        'Register'
      ),

    logout: () =>
      handleApiCall(
        () => api.auth.logout(),
        async () => ({ success: true }),
        'Logout'
      ),

    refreshToken: (token: string) =>
      handleApiCall(
        () => api.auth.refreshToken(token),
        async () => ({ success: true, data: { token: 'new_mock_token' } }),
        'Refresh Token'
      ),
  },

  // ── SURVEY ───────────────────────────────────────────────────────────────────
  // Strip undefined fields before sending — survey form no longer collects
  // roofArea (measured by engineer) or energyServices (removed from UI)
  survey: {
    submit: (propertyId: string, surveyData: any) => {
      // Remove keys that are undefined/null/0 so backend doesn't receive junk
      const clean = Object.fromEntries(
        Object.entries(surveyData).filter(([, v]) => v !== undefined && v !== null)
      );
      return handleApiCall(
        () => api.survey.submit(propertyId, clean),
        async () => {
          await new Promise(r => setTimeout(r, 800));
          return {
            success: true,
            data: {
              surveyId: `survey_${Date.now()}`,
              submittedAt: new Date().toISOString(),
              status: 'SUBMITTED',
            },
          };
        },
        'Submit Survey'
      );
    },
  },

  // ── SUBSCRIPTION ─────────────────────────────────────────────────────────────
  subscription: {
    generateProposal: (propertyId: string, surveyData: any) =>
      handleApiCall(
        () => api.subscription.generateProposal(propertyId, 'survey_id'),
        () => mockSubscription.generateProposal(surveyData),
        'Generate Proposal'
      ),

    getProposal: (proposalId: string) =>
      handleApiCall(
        () => api.subscription.getProposal(proposalId),
        async () => ({
          success: true,
          data: {
            proposalId,
            solarCapacity: 10,
            batteryStorage: 5,
            monthlyFee: 3500,
            estimatedSavings: 1800,
            estimatedProduction: 1200,
            contractDuration: 24,
            installationFee: 0,
            securityDeposit: 5000,
            whatsIncluded: [
              '10 kW Solar Panel System',
              '5 kWh Battery Storage',
              'Smart Energy Monitoring Dashboard',
              'Grid Integration & Net Metering',
              'Professional Installation',
              '24-month Maintenance & Support',
            ],
            generatedAt: new Date().toISOString(),
          },
        }),
        'Get Proposal'
      ),
  },

  // ── PAYMENT ──────────────────────────────────────────────────────────────────
  // Payment is always mocked — no live payment gateway connected.
  // Mock shapes match exactly what payment.tsx reads:
  //   initiate → { data: { paymentId, orderId } }
  //   verify   → { success: true, data: { status: 'SUCCESS', transactionId } }
  payment: {
    initiate: (propertyId: string, proposalId: string, paymentMethod: string, amount: number) =>
      handleApiCall(
        () => api.payment.initiate(propertyId, proposalId, paymentMethod, amount),
        async () => {
          await new Promise(r => setTimeout(r, 1500)); // simulate gateway delay
          return {
            success: true,
            data: {
              paymentId: `pay_${Date.now()}`,
              orderId:   `order_${Date.now()}`,
              amount,
              currency: 'INR',
              status: 'PENDING',
            },
          };
        },
        'Initiate Payment'
      ),

    // ⚠️ Shape matters — payment.tsx checks verifyRes?.data?.status === 'SUCCESS'
    //    AND reads verifyRes?.data?.transactionId for the receipt
    verify: (paymentId: string, orderId: string, _signature: string) =>
      handleApiCall(
        () => api.payment.verify(paymentId, orderId, _signature),
        async () => ({
          success: true,
          data: {
            paymentId,
            transactionId: `TXN${Date.now()}`,
            status: 'SUCCESS',
            amount: 8500,
            paidAt: new Date().toISOString(),
          },
        }),
        'Verify Payment'
      ),

    getHistory: (propertyId: string) =>
      handleApiCall(
        () => api.payment.getHistory(propertyId),
        async () => ({
          success: true,
          data: {
            payments: [
              {
                paymentId: 'pay_001',
                transactionId: 'TXN1234567890',
                amount: 8500,
                paymentMethod: 'UPI',
                status: 'SUCCESS',
                description: 'First month payment + Security deposit',
                paidAt: new Date().toISOString(),
              },
            ],
          },
        }),
        'Get Payment History'
      ),
  },

  // ── INSTALLATION ─────────────────────────────────────────────────────────────
  installation: {
    getProgress: (propertyId: string) =>
      handleApiCall(
        () => api.installation.getProgress(propertyId),
        async () => ({
          success: true,
          data: {
            propertyId,
            progress: mockInstallation.getInstallationProgress('PENDING_INSTALLATION'),
          },
        }),
        'Get Installation Progress'
      ),

    updateStep: (propertyId: string, step: string, data: any) =>
      handleApiCall(
        () => api.installation.updateStep(propertyId, step, data),
        async () => ({ success: true, data: { message: 'Installation step updated' } }),
        'Update Installation Step'
      ),
  },

  // ── ENERGY ───────────────────────────────────────────────────────────────────
  energy: {
    getRealtime: (propertyId: string) =>
      handleApiCall(
        () => api.energy.getRealtime(propertyId),
        () => ({ success: true, data: mockUsage.getCurrentEnergyData() }),
        'Get Realtime Energy'
      ),

    getStats: (propertyId: string, period: string) =>
      handleApiCall(
        () => api.energy.getStats(propertyId, period),
        () => ({ success: true, data: mockUsage.getUsageStats() }),
        'Get Energy Stats'
      ),

    /**
     * Connects to the live energy stream.
     *
     * The backend exposes GET /energy/stream/:propertyId which returns a
     * Supabase realtime subscription config (channel/table/filter), NOT a WebSocket.
     * Full Supabase integration is pending — until then this always uses the mock
     * stream which produces realistic live data every few seconds.
     *
     * Returns a cleanup function the caller must invoke on unmount.
     *
     * TODO: When Supabase is integrated, fetch api.energy.getStreamConfig(propertyId),
     * then call supabaseClient.channel(config.channel).on(...).subscribe().
     */
    connectStream: (
      propertyId: string,
      _token: string,
      onMessage: (data: any) => void
    ): (() => void) => {
      if (__DEV__) console.log('[MOCK] Energy stream — using mock (Supabase realtime pending integration)');
      return mockUsage.startEnergyStream(onMessage);
    },
  },

  // ── NOTIFICATIONS ─────────────────────────────────────────────────────────────
  notifications: {
    getAll: (limit = 50, offset = 0, unreadOnly = false) =>
      handleApiCall(
        () => api.notifications.getAll(limit, offset, unreadOnly),
        async () => ({ success: true, data: { notifications: [], unreadCount: 0, total: 0 } }),
        'Get Notifications'
      ),

    markAsRead: (notificationId: string) =>
      handleApiCall(
        () => api.notifications.markAsRead(notificationId),
        async () => ({ success: true }),
        'Mark Notification Read'
      ),

    markAllAsRead: () =>
      handleApiCall(
        () => api.notifications.markAllAsRead(),
        async () => ({ success: true }),
        'Mark All Notifications Read'
      ),
  },

  // ── ALERTS ────────────────────────────────────────────────────────────────────
  alerts: {
    getByProperty: (propertyId: string) =>
      handleApiCall(
        () => api.alerts.getByProperty(propertyId),
        () => ({ success: true, data: { alerts: mockAlerts.getAlerts() } }),
        'Get Alerts'
      ),
  },

  // ── BILLING ───────────────────────────────────────────────────────────────────
  billing: {
    getCurrentBill: (propertyId: string) =>
      handleApiCall(
        () => api.billing.getCurrentBill(propertyId),
        async () => ({
          success: true,
          data: {
            billId: 'bill_current',
            propertyId,
            month: 'February 2026',
            totalAmount: 2850,
            subscriptionFee: 3500,
            usageCharge: -850,
            taxes: 200,
            status: 'pending',
            dueDate: '2026-02-28',
            generatedAt: '2026-02-01',
          },
        }),
        'Get Current Bill'
      ),

    getHistory: (propertyId: string, limit = 12, offset = 0) =>
      handleApiCall(
        () => api.billing.getHistory(propertyId, limit, offset),
        async () => ({
          success: true,
          data: {
            bills: [
              { billId: 'bill_1', month: 'January 2026',   totalAmount: 3200, subscriptionFee: 3500, usageCharge: -500, taxes: 200, status: 'paid', dueDate: '2026-01-31', paidDate: '2026-01-25' },
              { billId: 'bill_2', month: 'December 2025',  totalAmount: 3450, subscriptionFee: 3500, usageCharge: -250, taxes: 200, status: 'paid', dueDate: '2025-12-31', paidDate: '2025-12-28' },
              { billId: 'bill_3', month: 'November 2025',  totalAmount: 3100, subscriptionFee: 3500, usageCharge: -600, taxes: 200, status: 'paid', dueDate: '2025-11-30', paidDate: '2025-11-27' },
            ],
            total: 3,
          },
        }),
        'Get Billing History'
      ),

    downloadPDF: (billId: string) =>
      handleApiCall(
        () => api.billing.downloadPDF(billId),
        async () => {
          const { Alert } = require('react-native');
          Alert.alert('PDF Download', 'Bill PDF will be available once connected to the live backend.');
          return { success: true };
        },
        'Download Bill PDF'
      ),
  },

  // ── SUPPORT ───────────────────────────────────────────────────────────────────
  support: {
    createTicket: (
      propertyId: string,
      category: string,
      priority: string,
      title: string,
      description: string
    ) =>
      handleApiCall(
        () => api.support.createTicket(propertyId, category, priority, title, description),
        async () => ({
          success: true,
          data: {
            ticketId: `ticket_${Date.now()}`,
            status: 'open',
            createdAt: new Date().toISOString(),
            estimatedResponse: 'within 24 hours',
          },
        }),
        'Create Support Ticket'
      ),

    getTickets: () =>
      handleApiCall(
        () => api.support.getTickets(),
        async () => ({ success: true, data: { tickets: [] } }),
        'Get Support Tickets'
      ),
  },

  // ── USER ─────────────────────────────────────────────────────────────────────
  user: {
    getProfile: () =>
      handleApiCall(
        () => api.user.getProfile(),
        async () => ({
          success: true,
          data: {
            id: 'user_001',
            name: 'Rahul Kumar',
            email: 'user@example.com',
            phone: '+91 98765 43210',
            address: '123 Green Energy Lane, Mumbai',
          },
        }),
        'Get User Profile'
      ),

    updateProfile: (data: any) =>
      handleApiCall(
        () => api.user.updateProfile(data),
        async () => ({ success: true, data }),
        'Update User Profile'
      ),

    getProperties: () =>
      handleApiCall(
        () => api.user.getProperties(),
        async () => ({ success: true, data: { properties: [] } }),
        'Get User Properties'
      ),

    addProperty: (name: string, address: string, type: string) =>
      handleApiCall(
        () => api.user.addProperty(name, address, type),
        async () => ({
          success: true,
          data: {
            propertyId: `prop_${Date.now()}`,
            name, address, type,
            subscriptionStatus: 'NONE',
            createdAt: new Date().toISOString(),
          },
        }),
        'Add Property'
      ),
  },

  // ── AI ADVISOR ────────────────────────────────────────────────────────────────
  ai: {
    sendMessage: (propertyId: string, message: string) =>
      handleApiCall(
        () => api.ai.sendMessage(propertyId, message),
        async () => {
          const response = await mockAiAdvisor.getAIResponseAsync(message);
          return {
            success: true,
            data: {
              messageId: `msg_${Date.now()}`,
              response,
              timestamp: new Date().toISOString(),
            },
          };
        },
        'AI Chat'
      ),

    getChatHistory: (propertyId: string) =>
      handleApiCall(
        () => api.ai.getChatHistory(propertyId),
        async () => ({ success: true, data: { messages: [] } }),
        'Get Chat History'
      ),
  },

  // ── MAINTENANCE ───────────────────────────────────────────────────────────────
  // No backend endpoint yet — always uses mock.
  // When /maintenance endpoints are added to the backend, replace the
  // `async () => { throw ... }` lines with real api.* calls.
  maintenance: {
    getSchedule: (propertyId: string, activationDate?: string) =>
      handleApiCall(
        async () => { throw new Error('Maintenance API not yet implemented'); },
        async () => ({
          success: true,
          data: { schedule: mockMaintenance.getMaintenanceSchedule(activationDate) },
        }),
        'Get Maintenance Schedule'
      ),

    getHistory: (propertyId: string, activationDate?: string) =>
      handleApiCall(
        async () => { throw new Error('Maintenance API not yet implemented'); },
        async () => ({
          success: true,
          data: { history: mockMaintenance.getServiceHistory(activationDate) },
        }),
        'Get Service History'
      ),

    getUpcomingVisits: (propertyId: string, activationDate?: string) =>
      handleApiCall(
        async () => { throw new Error('Maintenance API not yet implemented'); },
        async () => ({
          success: true,
          data: { visits: mockMaintenance.getUpcomingVisits(activationDate) },
        }),
        'Get Upcoming Visits'
      ),
  },
};

export const apiConfig = {
  isUsingRealAPI: USE_REAL_API,
  hasFallback: FALLBACK_ON_ERROR,
};

export default apiWrapper;