import { apiRequest } from './api';
import { getAccessToken } from './auth';

function requireToken(): string {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
}

async function customerGet<T>(path: string): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(path, { method: 'GET' }, token);
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

async function customerPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(
    path,
    {
      method: 'POST',
      body: JSON.stringify(body),
    },
    token,
  );
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

export async function fetchServices() {
  return customerGet<{
    services: Array<{
      id: string;
      title: string;
      description: string;
      imageId: string;
      category: string;
    }>;
  }>('/services');
}

export async function submitServiceRequest(payload: {
  serviceId: string;
  propertyId?: string;
  consumption?: number;
  areaDescription: string;
  files: Array<{
    fileName: string;
    fileUrl?: string;
    mimeType?: string;
    sizeBytes?: number;
  }>;
}) {
  return customerPost<{
    requestId: string;
    serviceId: string;
    serviceTitle: string;
    status: string;
  }>('/services/requests', payload);
}

export async function fetchCurrentUserProfile() {
  return customerGet<{
    id: string;
    email: string;
    name: string;
    phone: string | null;
    address: string | null;
    currentPropertyId: string | null;
    createdAt: string;
  }>('/user/profile');
}

export async function fetchUserProperties() {
  return customerGet<{
    properties: Array<{
      id: string;
      name: string;
      address: string;
      type: 'residential' | 'commercial';
      subscriptionStatus: string;
      planType: string | null;
      solarCapacity: number | null;
      batteryStorage: number | null;
      installationDate: string | null;
      createdAt: string;
    }>;
  }>('/user/properties');
}

export async function fetchGridInsights(propertyId: string) {
  return customerGet<{
    stats: {
      gridFrequency: number;
      voltageLevel: number;
      currentLoad: number;
      discomStatus: string;
    };
    demandSeries: Array<{ time: string; demand: number }>;
    events: Array<{ id: string; timestamp: string; description: string; severity: string }>;
  }>(`/insights/grid/${propertyId}`);
}

export async function fetchCarbonInsights(propertyId: string) {
  return customerGet<{
    monthly: Array<{ month: string; saved: number; offset: number }>;
    stats: {
      totalSavedKg: number;
      totalOffsetKg: number;
      renewableKwh: number;
      equivalentTrees: number;
    };
  }>(`/insights/carbon/${propertyId}`);
}

export async function fetchSupportFaqs() {
  return customerGet<{
    faqs: Array<{ id: string; question: string; answer: string }>;
  }>('/support/faqs');
}

// ── Billing Drafts (real API) ─────────────────────────────────

export type ApiDraft = {
  draftId: string;
  billId: string | null;
  propertyId: string;
  title: string;
  description: string | null;
  lineItems: Record<string, unknown>[];
  charges: { subscriptionFee: number; usageCharge: number; taxes: number };
  totalAmount: number;
  status: 'sent' | 'accepted' | 'disputed';
  sentAt: string | null;
  acceptedAt: string | null;
  disputedAt: string | null;
  createdAt: string;
  dueDate: string | null;
  generatedAt: string | null;
  billStatus: string | null;
};

export async function fetchMyBillingDrafts() {
  return customerGet<{ drafts: ApiDraft[] }>('/billing/my-drafts');
}

export async function acceptBillingDraft(draftId: string) {
  const token = requireToken();
  const response = await apiRequest<{ draftId: string; status: string; acceptedAt: string }>(
    `/billing/my-drafts/${draftId}/accept`,
    { method: 'POST', body: '{}' },
    token,
  );
  if (!response.success) throw new Error(response.message || 'Request failed');
  return response.data!;
}

export async function disputeBillingDraft(draftId: string, reason: string) {
  const token = requireToken();
  const response = await apiRequest<{ draftId: string; status: string; disputedAt: string }>(
    `/billing/my-drafts/${draftId}/dispute`,
    { method: 'POST', body: JSON.stringify({ reason }) },
    token,
  );
  if (!response.success) throw new Error(response.message || 'Request failed');
  return response.data!;
}
