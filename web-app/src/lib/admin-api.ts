import { apiRequest } from './api';
import { getAccessToken } from './auth';

function requireToken(): string {
  const token = getAccessToken();
  if (!token) {
    throw new Error('Not authenticated');
  }
  return token;
}

async function adminGet<T>(path: string): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(path, { method: 'GET' }, token);
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

async function adminPatch<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(path, {
    method: 'PATCH',
    body: JSON.stringify(body),
  }, token);
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

async function adminPost<T>(path: string, body: Record<string, unknown>): Promise<T> {
  const token = requireToken();
  const response = await apiRequest<T>(path, {
    method: 'POST',
    body: JSON.stringify(body),
  }, token);
  if (!response.success || !response.data) {
    throw new Error(response.message || 'Request failed');
  }
  return response.data;
}

export async function fetchAdminOverview() {
  return adminGet<{
    totalUsers: number;
    totalProperties: number;
    openTickets: number;
    totalRevenue: number;
    totalProduction: number;
    totalConsumption: number;
    netOffsetPercent: number;
  }>('/energy/admin/analytics/overview');
}

export async function fetchAdminUsers() {
  return adminGet<{
    users: Array<{
      id: string;
      email: string;
      name: string;
      phone: string | null;
      address: string | null;
      role: 'CITIZEN' | 'ADMIN' | 'EXECUTIVE';
      isActive: boolean;
      createdAt: string;
    }>;
  }>('/user/admin/users');
}

export async function updateAdminUserStatus(userId: string, isActive: boolean) {
  return adminPatch(`/user/admin/users/${userId}/status`, { isActive });
}

export async function updateAdminUserRole(userId: string, role: 'CITIZEN' | 'ADMIN' | 'EXECUTIVE') {
  return adminPatch(`/user/admin/users/${userId}/role`, { role });
}

export async function fetchAdminProperties() {
  return adminGet<{
    properties: Array<{
      id: string;
      userId: string;
      name: string;
      address: string;
      type: string;
      subscriptionStatus: string;
      createdAt: string;
    }>;
  }>('/subscription/admin/properties');
}

export async function updateAdminPropertySubscriptionStatus(propertyId: string, subscriptionStatus: string) {
  return adminPatch(`/subscription/admin/properties/${propertyId}/subscription-status`, { subscriptionStatus });
}

export async function fetchAdminBills() {
  return adminGet<{
    bills: Array<{
      billId: string;
      propertyId: string;
      propertyName: string | null;
      propertyAddress: string | null;
      customerId: string | null;
      customerName: string | null;
      customerEmail: string | null;
      month: string;
      totalAmount: number;
      subscriptionFee: number;
      usageCharge: number;
      taxes: number;
      status: string;
      dueDate: string;
      paidDate: string | null;
      generatedAt: string;
      pdfUrl: string | null;
    }>;
  }>('/billing/admin/all');
}

export async function adjustAdminBill(billId: string, payload: { usageCharge?: number; subscriptionFee?: number; taxes?: number; status?: 'pending' | 'paid'; note?: string }) {
  return adminPatch(`/billing/admin/${billId}/adjust`, payload);
}

export async function fetchAdminTickets() {
  return adminGet<{
    tickets: Array<{
      id: string;
      userId: string;
      propertyId: string;
      propertyName: string | null;
      propertyAddress: string | null;
      title: string;
      description: string;
      status: 'open' | 'in_progress' | 'resolved' | 'closed';
      priority: 'low' | 'medium' | 'high';
      category: string;
      createdAt: string;
      updatedAt: string;
      raisedBy: {
        id: string;
        name: string;
        email: string | null;
      };
      answeredBy: {
        id: string;
        name: string;
        email: string | null;
        repliedAt: string | null;
      } | null;
      messageCount: number;
    }>;
  }>('/support/admin/tickets');
}

export async function updateAdminTicket(ticketId: string, payload: { status?: 'open' | 'in_progress' | 'resolved' | 'closed'; priority?: 'low' | 'medium' | 'high' }) {
  return adminPatch(`/support/admin/tickets/${ticketId}`, payload);
}

export async function fetchAdminTicketDetail(ticketId: string) {
  return adminGet<{
    ticket: {
      id: string;
      title: string;
      description: string;
      category: string;
      priority: 'low' | 'medium' | 'high';
      status: 'open' | 'in_progress' | 'resolved' | 'closed';
      createdAt: string;
      updatedAt: string;
      estimatedResponse: string | null;
      property: {
        id: string;
        name: string;
        address: string;
      } | null;
      raisedBy: {
        id: string;
        name: string;
        email: string | null;
      };
    };
    messages: Array<{
      id: string;
      message: string;
      messageType: 'customer' | 'admin_reply' | 'system';
      createdAt: string;
      author: {
        id: string;
        name: string;
        email: string | null;
      };
    }>;
  }>(`/support/admin/tickets/${ticketId}`);
}

export async function replyToAdminTicket(ticketId: string, message: string) {
  return adminPost<{ messageId: string | null; createdAt: string }>(`/support/admin/tickets/${ticketId}/messages`, {
    message,
  });
}

export async function broadcastAdminNotification(payload: {
  title: string;
  message: string;
  type?: string;
  route?: string;
  userIds?: string[];
}) {
  return adminPost<{ recipientCount: number }>('/notifications/admin/broadcast', payload);
}

export async function fetchAdminAuditLogs() {
  return adminGet<{
    logs: Array<{
      id: string;
      actorUserId: string;
      action: string;
      entityType: string;
      entityId: string | null;
      createdAt: string;
    }>;
  }>('/user/admin/audit-logs');
}
