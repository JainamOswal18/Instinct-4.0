import { apiRequest } from './api';
import { getAccessToken } from './auth';

function requireToken(): string {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
}

async function providerGet<T>(path: string): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(path, { method: 'GET' }, token);
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

async function providerPatch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(
    path,
    {
      method: 'PATCH',
      body: JSON.stringify(body),
    },
    token,
  );
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

async function providerPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
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

export type ProviderInstallationStatus =
  | 'survey'
  | 'approval'
  | 'procurement'
  | 'installation'
  | 'testing'
  | 'live';

export type ProviderRequestStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export type ProviderDashboardData = {
  stats: {
    activeInstallations: number;
    pendingSurveys: number;
    openTickets: number;
    equipmentAlerts: number;
    totalMRR: number;
    overduePayments: number;
  };
  pipeline: Record<string, number>;
  recentAlerts: Array<{
    id: string;
    type: string;
    severity: string;
    title: string;
    createdAt: string;
  }>;
  recentRequests: Array<{
    id: string;
    customerName: string;
    serviceTitle: string;
    status: string;
    date: string;
  }>;
};

export async function fetchProviderDashboard() {
  return providerGet<ProviderDashboardData>('/provider/dashboard');
}

export async function fetchProviderRequests() {
  return providerGet<{
    requests: Array<{
      id: string;
      propertyId: string;
      customerName: string;
      serviceTitle: string;
      status: ProviderRequestStatus;
      date: string;
      monthlyConsumption: number;
      monthlyBill: number;
      draftId: string | null;
    }>;
  }>('/provider/requests');
}

export async function updateProviderRequestStatus(requestId: string, status: ProviderRequestStatus) {
  return providerPatch<{
    requestId: string;
    status: ProviderRequestStatus;
    updatedAt: string;
  }>(`/provider/requests/${requestId}/status`, { status });
}

function toApiInstallationStatus(status: ProviderInstallationStatus): string {
  return status.toUpperCase();
}

function fromApiInstallationStatus(status: string): ProviderInstallationStatus {
  return status.toLowerCase() as ProviderInstallationStatus;
}

export async function fetchProviderInstallations(status?: ProviderInstallationStatus) {
  const query = status ? `?status=${toApiInstallationStatus(status)}` : '';
  const data = await providerGet<{
    installations: Array<{
      id: string;
      propertyId: string;
      serviceTitle: string;
      customerName: string;
      machineName: string;
      machineCost: number;
      estimatedSetupDays: number;
      actualStartDate: string | null;
      completedDate: string | null;
      status: string;
      assignedTechnician: string | null;
      notes?: string;
      subscriptionPlanSummary?: {
        planName: string;
        totalMonthly: number;
      };
      createdAt: string;
    }>;
  }>(`/provider/installations${query}`);

  return {
    installations: data.installations.map((item) => ({
      ...item,
      status: fromApiInstallationStatus(item.status),
      assignedTechnician: item.assignedTechnician || '',
      actualStartDate: item.actualStartDate || undefined,
      completedDate: item.completedDate || undefined,
    })),
  };
}

export async function fetchProviderPipeline() {
  const data = await providerGet<{
    pipeline: Record<string, number>;
    total: number;
  }>('/provider/installations/pipeline');

  return {
    pipeline: {
      survey: data.pipeline.SURVEY || 0,
      approval: data.pipeline.APPROVAL || 0,
      procurement: data.pipeline.PROCUREMENT || 0,
      installation: data.pipeline.INSTALLATION || 0,
      testing: data.pipeline.TESTING || 0,
      live: data.pipeline.LIVE || 0,
    },
    total: data.total,
  };
}

export async function updateProviderInstallationStatus(
  installationId: string,
  status: ProviderInstallationStatus,
  extra?: { notes?: string; assignedTechnician?: string },
) {
  return providerPatch(`/provider/installations/${installationId}/status`, {
    status: toApiInstallationStatus(status),
    ...(extra?.notes !== undefined ? { notes: extra.notes } : {}),
    ...(extra?.assignedTechnician !== undefined ? { assignedTechnician: extra.assignedTechnician } : {}),
  });
}

export async function createProviderBillingDraft(payload: {
  propertyId: string;
  surveyId?: string;
  title: string;
  description?: string;
  lineItems?: Array<Record<string, unknown>>;
  charges: {
    subscriptionFee: number;
    usageCharge: number;
    taxes: number;
  };
  dueDate?: string;
  status?: 'draft' | 'sent';
}) {
  return providerPost<{
    draftId: string;
    billId: string | null;
    status: string;
    totalAmount: number;
    sentAt: string | null;
  }>('/provider/billing/drafts', {
    ...(payload.propertyId.trim() ? { propertyId: payload.propertyId.trim() } : {}),
    surveyId: payload.surveyId,
    title: payload.title,
    description: payload.description,
    lineItems: payload.lineItems || [],
    charges: payload.charges,
    dueDate: payload.dueDate,
    status: payload.status || 'sent',
  });
}

export async function fetchProviderBillingDrafts(status?: string) {
  const query = status ? `?status=${encodeURIComponent(status)}` : '';
  return providerGet<{
    drafts: Array<{
      id: string;
      propertyId: string;
      surveyId: string | null;
      billId: string | null;
      title: string;
      description: string | null;
      lineItems: Array<Record<string, unknown>>;
      charges: {
        subscriptionFee: number;
        usageCharge: number;
        taxes: number;
      };
      totalAmount: number;
      status: string;
      sentAt: string | null;
      createdAt: string;
      updatedAt: string;
    }>;
  }>(`/provider/billing/drafts${query}`);
}

export type ProviderTicketStatus =
  | 'open'
  | 'awaiting-approval'
  | 'in-progress'
  | 'resolved'
  | 'closed';

export type ProviderTicketApprovalAction = 'credit' | 'refund' | 'dispatch-tech' | 'none';

function fromApiTicketStatus(status: string): ProviderTicketStatus {
  return status.replace('_', '-') as ProviderTicketStatus;
}

function toApiTicketStatus(status: ProviderTicketStatus): string {
  return status.replace('-', '_');
}

function fromApiApprovalAction(action: string | null | undefined): ProviderTicketApprovalAction {
  if (!action) return 'none';
  return action.replace('_', '-') as ProviderTicketApprovalAction;
}

function toApiApprovalAction(action: ProviderTicketApprovalAction): string {
  return action.replace('-', '_');
}

export async function fetchProviderTickets() {
  const data = await providerGet<{
    tickets: Array<{
      id: string;
      customerName: string;
      customerEmail: string;
      category: string;
      priority: 'high' | 'medium' | 'low';
      subject: string;
      description: string;
      status: string;
      providerNotes?: string;
      approvalAction?: string;
      createdAt: string;
      updatedAt: string;
      slaDeadline: string;
    }>;
    stats: Record<string, number>;
    total: number;
  }>('/provider/tickets');

  return {
    tickets: data.tickets.map((ticket) => ({
      ...ticket,
      status: fromApiTicketStatus(ticket.status),
      approvalAction: fromApiApprovalAction(ticket.approvalAction),
    })),
    stats: {
      open: data.stats.open || 0,
      'awaiting-approval': data.stats.awaiting_approval || 0,
      'in-progress': data.stats.in_progress || 0,
      resolved: data.stats.resolved || 0,
      closed: data.stats.closed || 0,
    },
    total: data.total,
  };
}

export async function updateProviderTicket(ticketId: string, payload: { status?: ProviderTicketStatus; providerNotes?: string }) {
  return providerPatch(`/provider/tickets/${ticketId}`, {
    ...(payload.status ? { status: toApiTicketStatus(payload.status) } : {}),
    ...(payload.providerNotes !== undefined ? { providerNotes: payload.providerNotes } : {}),
  });
}

export async function approveProviderTicket(ticketId: string, payload: { approvalAction: ProviderTicketApprovalAction; providerNotes?: string }) {
  return providerPost(`/provider/tickets/${ticketId}/approve`, {
    approvalAction: toApiApprovalAction(payload.approvalAction),
    ...(payload.providerNotes !== undefined ? { providerNotes: payload.providerNotes } : {}),
  });
}

export async function resolveProviderTicket(ticketId: string, payload: { approvalAction: ProviderTicketApprovalAction; providerNotes: string }) {
  return providerPost(`/provider/tickets/${ticketId}/resolve`, {
    approvalAction: toApiApprovalAction(payload.approvalAction),
    providerNotes: payload.providerNotes,
  });
}

export type ProviderAlertSeverity = 'critical' | 'warning' | 'info';
export type ProviderAlertType = 'new-request' | 'payment-overdue' | 'equipment-failure' | 'sla-breach' | 'contract-renewal' | 'ticket';

function fromApiAlertType(type: string): ProviderAlertType {
  return type.replace('_', '-') as ProviderAlertType;
}

export async function fetchProviderAlerts(params?: { severity?: ProviderAlertSeverity; type?: ProviderAlertType; dismissed?: boolean }) {
  const query = new URLSearchParams();
  if (params?.severity) query.set('severity', params.severity);
  if (params?.type) query.set('type', params.type.replace('-', '_'));
  if (params?.dismissed !== undefined) query.set('dismissed', String(params.dismissed));
  const suffix = query.toString() ? `?${query.toString()}` : '';

  const data = await providerGet<{
    alerts: Array<{
      id: string;
      type: string;
      severity: ProviderAlertSeverity;
      title: string;
      message: string;
      relatedId?: string;
      dismissed: boolean;
      createdAt: string;
    }>;
    stats: { critical: number; warning: number; info: number };
    total: number;
  }>(`/provider/alerts${suffix}`);

  return {
    ...data,
    alerts: data.alerts.map((item) => ({
      ...item,
      type: fromApiAlertType(item.type),
    })),
  };
}

export async function dismissProviderAlert(alertId: string) {
  return providerPatch(`/provider/alerts/${alertId}/dismiss`, {});
}

export async function dismissAllProviderAlerts(severity?: ProviderAlertSeverity) {
  const query = severity ? `?severity=${severity}` : '';
  return providerPatch(`/provider/alerts/dismiss-all${query}`, {});
}

export type ProviderEquipmentStatus = 'online' | 'offline' | 'needs-attention';

function fromApiEquipmentStatus(status: string): ProviderEquipmentStatus {
  return status.toLowerCase().replace('_', '-') as ProviderEquipmentStatus;
}

function toApiEquipmentStatus(status: ProviderEquipmentStatus): string {
  return status.toUpperCase().replace('-', '_');
}

export async function fetchProviderEquipment(status?: ProviderEquipmentStatus) {
  const query = status ? `?status=${toApiEquipmentStatus(status)}` : '';
  const data = await providerGet<{
    equipment: Array<{
      id: string;
      installationId: string;
      name: string;
      model: string;
      serialNumber: string;
      status: string;
      healthScore: number;
      installedDate: string;
      warrantyExpiry: string;
      lastMaintenanceDate?: string;
      nextMaintenanceDate?: string;
      customerName: string;
    }>;
    summary: {
      online: number;
      offline: number;
      needsAttention: number;
      averageHealth: number;
    };
    total: number;
  }>(`/provider/equipment${query}`);

  return {
    ...data,
    equipment: data.equipment.map((item) => ({
      ...item,
      status: fromApiEquipmentStatus(item.status),
    })),
  };
}

export async function updateProviderEquipmentStatus(equipmentId: string, status: ProviderEquipmentStatus, healthScore?: number) {
  return providerPatch(`/provider/equipment/${equipmentId}/status`, {
    status: toApiEquipmentStatus(status),
    ...(healthScore !== undefined ? { healthScore } : {}),
  });
}

export async function scheduleProviderEquipmentMaintenance(equipmentId: string, nextMaintenanceDate: string, notes?: string) {
  return providerPost(`/provider/equipment/${equipmentId}/maintenance`, {
    nextMaintenanceDate,
    ...(notes ? { notes } : {}),
  });
}

export async function fetchProviderCustomers() {
  return providerGet<{
    customers: Array<{
      id: string;
      name: string;
      email: string;
      propertyId: string;
      serviceTitle: string;
      planName: string;
      subscriptionStatus: string;
      monthlyConsumption: number;
      planThreshold: number;
      paymentStatus: 'paid' | 'pending' | 'overdue';
      lastPaymentDate: string | null;
    }>;
    total: number;
    page: number;
  }>('/provider/customers');
}

export async function fetchProviderConsumptionAggregate() {
  return providerGet<{
    totalCustomers: number;
    totalKwhServed: number;
    averagePerCustomer: number;
    customersExceedingThreshold: number;
    peakDemandTime: string;
  }>('/provider/consumption/aggregate');
}

export async function fetchProviderRevenueOverview() {
  return providerGet<{
    totalMRR: number;
    totalOutstanding: number;
    paidThisMonth: number;
    overdueCount: number;
    collectionRate: number;
  }>('/provider/revenue/overview');
}

export async function fetchProviderPayments(status?: 'paid' | 'pending' | 'overdue') {
  const query = status ? `?status=${status}` : '';
  return providerGet<{
    payments: Array<{
      customerId: string | null;
      customerName: string;
      propertyId: string;
      billId: string;
      month: string;
      amount: number;
      status: 'paid' | 'pending' | 'overdue';
      dueDate: string;
      paidDate: string | null;
    }>;
    total: number;
  }>(`/provider/revenue/payments${query}`);
}