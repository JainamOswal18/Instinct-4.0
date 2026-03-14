// services/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ========== CONFIGURATION ==========

const API_BASE_URL = 'https://server-plum-six.vercel.app';

console.log('🌐 API Base URL:', API_BASE_URL);

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request interceptor — attach token ────────────────────────────────────────
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await AsyncStorage.getItem('accessToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor — unwrap data, normalise errors ─────────────────────
// Spec error shape: { success: false, error: { code, message, details } }
apiClient.interceptors.response.use(
  (response) => response.data as any,
  async (error: AxiosError<any>) => {
    if (!error.response) {
      return Promise.reject({
        message: __DEV__
          ? `Network error — is the backend running at ${API_BASE_URL}?`
          : 'Network error — check your connection and try again.',
        code: 'NETWORK_ERROR',
        details: {},
        status: 0,
      });
    }

    if (error.response.status === 401) {
      // Only clear token — user data keyed by user_${id} survives for next login
      await AsyncStorage.removeItem('accessToken');
    }

    const apiError = error.response.data?.error;
    return Promise.reject({
      message: apiError?.message ?? 'Something went wrong',
      code: apiError?.code ?? 'UNKNOWN_ERROR',
      details: apiError?.details ?? {},
      status: error.response.status,
    });
  }
);

const client = apiClient as any;

// ========== API ==========

export const api = {
  // ── AUTH ─────────────────────────────────────────────────────────────────
  auth: {
    register: (name: string, email: string, password: string, phone?: string) =>
      client.post('/auth/register', { name, email, password, phone }),

    login: (email: string, password: string) =>
      client.post('/auth/login', { email, password }),

    me: () =>
      client.get('/auth/me'),

    /**
     * Spec: POST /auth/logout (authenticated)
     * Notifies backend to invalidate the token, then clears local storage.
     * Fire-and-forget: local cleanup always happens even if the HTTP call fails.
     */
    logout: async () => {
      try {
        await client.post('/auth/logout');
      } catch {
        // Backend logout failed (expired token, network issue) — still clear locally
      } finally {
        await AsyncStorage.removeItem('accessToken');
      }
      return { success: true };
    },

    refreshToken: (refreshToken: string) =>
      client.post('/auth/refresh', { refreshToken }),
  },

  // ── SURVEY ───────────────────────────────────────────────────────────────
  // Spec: POST /survey/submit — propertyId in body alongside survey fields
  survey: {
    submit: (propertyId: string, surveyData: any) =>
      client.post('/survey/submit', { propertyId, ...surveyData }),
  },

  // ── SUBSCRIPTION ─────────────────────────────────────────────────────────
  // Spec: POST /subscription/generate-proposal — { propertyId, surveyId }
  // Spec: GET  /subscription/proposal/:proposalId
  subscription: {
    generateProposal: (propertyId: string, surveyId: string) =>
      client.post('/subscription/generate-proposal', { propertyId, surveyId }),

    getProposal: (proposalId: string) =>
      client.get(`/subscription/proposal/${proposalId}`),
  },

  // ── PAYMENT ──────────────────────────────────────────────────────────────
  // Spec: POST /payment/initiate — { propertyId, proposalId, paymentMethod, amount, currency }
  // Spec: POST /payment/verify   — { paymentId, orderId, signature }
  // Spec: GET  /payment/history  — ?propertyId=
  payment: {
    initiate: (propertyId: string, proposalId: string, paymentMethod: string, amount: number) =>
      client.post('/payment/initiate', { propertyId, proposalId, paymentMethod, amount, currency: 'INR' }),

    verify: (paymentId: string, orderId: string, signature: string) =>
      client.post('/payment/verify', { paymentId, orderId, signature }),

    getHistory: (propertyId: string) =>
      client.get('/payment/history', { params: { propertyId } }),
  },

  // ── INSTALLATION ─────────────────────────────────────────────────────────
  // Spec: GET   /installation/progress/:propertyId
  // Spec: PATCH /installation/update — { propertyId, step, data } in body
  installation: {
    getProgress: (propertyId: string) =>
      client.get(`/installation/progress/${propertyId}`),

    updateStep: (propertyId: string, step: string, data: any) =>
      client.patch('/installation/update', { propertyId, step, data }),
  },

  // ── ENERGY ───────────────────────────────────────────────────────────────
  // Spec: GET /energy/realtime/:propertyId
  // Spec: GET /energy/stats/:propertyId?period=&startDate=&endDate=
  // Spec: GET /energy/stream/:propertyId
  //   ⚠️  /energy/stream is a regular GET — returns Supabase realtime subscription
  //   config (channel/table/filter), NOT a WebSocket endpoint.
  //   The frontend should use this config with the Supabase JS client to subscribe.
  //   Until Supabase is integrated on the frontend, the mock stream handles live data.
  energy: {
    getRealtime: (propertyId: string) =>
      client.get(`/energy/realtime/${propertyId}`),

    getStats: (propertyId: string, period: string, startDate?: string, endDate?: string) =>
      client.get(`/energy/stats/${propertyId}`, { params: { period, startDate, endDate } }),

    /**
     * Fetches the Supabase realtime subscription config for this property.
     * Returns something like: { channel: string, table: string, filter: string }
     * Use this with createClient(supabaseUrl, supabaseKey).channel(config.channel)
     * to subscribe to live energy updates.
     *
     * apiWrapper.energy.connectStream() handles the fallback to mock until
     * Supabase is integrated on the frontend.
     */
    getStreamConfig: (propertyId: string) =>
      client.get(`/energy/stream/${propertyId}`),
  },

  // ── NOTIFICATIONS ────────────────────────────────────────────────────────
  // Spec: GET   /notifications?limit=&offset=&unreadOnly=
  // Spec: PATCH /notifications/:notificationId/read
  // Spec: PATCH /notifications/read-all
  notifications: {
    getAll: (limit = 50, offset = 0, unreadOnly = false) =>
      client.get('/notifications', { params: { limit, offset, unreadOnly } }),

    markAsRead: (notificationId: string) =>
      client.patch(`/notifications/${notificationId}/read`),

    markAllAsRead: () =>
      client.patch('/notifications/read-all'),
  },

  // ── ALERTS ───────────────────────────────────────────────────────────────
  // Spec: GET /alerts/:propertyId
  alerts: {
    getByProperty: (propertyId: string) =>
      client.get(`/alerts/${propertyId}`),
  },

  // ── BILLING ──────────────────────────────────────────────────────────────
  // Spec: GET /billing/current/:propertyId
  // Spec: GET /billing/history/:propertyId?limit=&offset=
  // Spec: GET /billing/download/:billId  →  returns PDF blob
  billing: {
    getCurrentBill: (propertyId: string) =>
      client.get(`/billing/current/${propertyId}`),

    getHistory: (propertyId: string, limit = 12, offset = 0) =>
      client.get(`/billing/history/${propertyId}`, { params: { limit, offset } }),

    downloadPDF: (billId: string) =>
      client.get(`/billing/download/${billId}`, { responseType: 'blob' }),
  },

  // ── SUPPORT ──────────────────────────────────────────────────────────────
  // Spec: POST /support/ticket  — singular (not /tickets)
  // Spec: GET  /support/tickets
  support: {
    createTicket: (
      propertyId: string,
      category: string,
      priority: string,
      title: string,
      description: string
    ) =>
      client.post('/support/ticket', { propertyId, category, priority, title, description }),

    getTickets: () =>
      client.get('/support/tickets'),
  },

  // ── USER ─────────────────────────────────────────────────────────────────
  // Spec: GET   /user/profile
  // Spec: PATCH /user/profile — { name, phone, address }
  // Spec: GET   /user/properties
  // Spec: POST  /user/properties — { name, address, type }
  user: {
    getProfile: () =>
      client.get('/user/profile'),

    updateProfile: (data: any) =>
      client.patch('/user/profile', data),

    getProperties: () =>
      client.get('/user/properties'),

    addProperty: (name: string, address: string, type: string) =>
      client.post('/user/properties', { name, address, type }),
  },

  // ── AI ADVISOR ───────────────────────────────────────────────────────────
  // Spec: POST /ai/chat               — { propertyId, message }
  // Spec: GET  /ai/chat/:propertyId/history
  ai: {
    sendMessage: (propertyId: string, message: string) =>
      client.post('/ai/chat', { propertyId, message }),

    getChatHistory: (propertyId: string) =>
      client.get(`/ai/chat/${propertyId}/history`),
  },
};

export default api;