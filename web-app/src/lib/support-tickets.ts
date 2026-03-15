// Support tickets data helpers – CRUD + Escalation

export type TicketPriority = 'low' | 'medium' | 'high';
export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed' | 'escalated';
export type TicketCategory = 'billing' | 'technical' | 'general' | 'maintenance';

export type TicketResponse = {
  id: string;
  message: string;
  author: 'user' | 'support' | 'provider';
  createdAt: string;
};

export type SupportTicket = {
  id: string;
  subject: string;
  description: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  escalatedAt?: string;
  escalatedTo?: string;
  responses: TicketResponse[];
};

const STORAGE_KEY = 'eaas_support_tickets';

export function getTickets(): SupportTicket[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveTickets(tickets: SupportTicket[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tickets));
}

export function createTicket(
  ticket: Pick<SupportTicket, 'subject' | 'description' | 'category' | 'priority'>
): SupportTicket {
  const now = new Date().toISOString();
  const newTicket: SupportTicket = {
    ...ticket,
    id: `TKT-${Date.now().toString(36).toUpperCase()}`,
    status: 'open',
    createdAt: now,
    updatedAt: now,
    responses: [],
  };
  const existing = getTickets();
  existing.unshift(newTicket);
  saveTickets(existing);
  return newTicket;
}

export function getTicketById(id: string): SupportTicket | undefined {
  return getTickets().find(t => t.id === id);
}

export function updateTicket(
  id: string,
  updates: Partial<Pick<SupportTicket, 'subject' | 'description' | 'category' | 'priority' | 'status'>>
): void {
  const tickets = getTickets();
  const updated = tickets.map(t =>
    t.id === id
      ? { ...t, ...updates, updatedAt: new Date().toISOString() }
      : t
  );
  saveTickets(updated);
}

export function deleteTicket(id: string): void {
  const tickets = getTickets();
  saveTickets(tickets.filter(t => t.id !== id));
}

export function escalateTicket(id: string, providerName: string = 'Energy Provider'): void {
  const tickets = getTickets();
  const updated = tickets.map(t =>
    t.id === id
      ? {
          ...t,
          status: 'escalated' as TicketStatus,
          escalatedAt: new Date().toISOString(),
          escalatedTo: providerName,
          updatedAt: new Date().toISOString(),
        }
      : t
  );
  saveTickets(updated);
}

export function addTicketResponse(
  ticketId: string,
  message: string,
  author: TicketResponse['author'] = 'user'
): void {
  const tickets = getTickets();
  const updated = tickets.map(t => {
    if (t.id !== ticketId) return t;
    const response: TicketResponse = {
      id: `resp-${Date.now()}`,
      message,
      author,
      createdAt: new Date().toISOString(),
    };
    return {
      ...t,
      responses: [...t.responses, response],
      updatedAt: new Date().toISOString(),
    };
  });
  saveTickets(updated);
}

export const CATEGORIES: { value: TicketCategory; label: string }[] = [
  { value: 'billing', label: 'Billing' },
  { value: 'technical', label: 'Technical' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'general', label: 'General' },
];

export const PRIORITIES: { value: TicketPriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'text-green-500' },
  { value: 'medium', label: 'Medium', color: 'text-amber-500' },
  { value: 'high', label: 'High', color: 'text-red-500' },
];
