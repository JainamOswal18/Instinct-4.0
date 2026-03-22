// ============================================================
// Provider Dashboard — Data Layer
// All types, localStorage CRUD, and mock data seeding
// ============================================================

// ---- TYPES ----

export type InstallationStatus =
  | 'survey'
  | 'approval'
  | 'procurement'
  | 'installation'
  | 'testing'
  | 'live';

export const INSTALLATION_STAGES: InstallationStatus[] = [
  'survey',
  'approval',
  'procurement',
  'installation',
  'testing',
  'live',
];

export type Installation = {
  id: string;
  requestId?: string;
  serviceTitle: string;
  customerName: string;
  machineName: string;
  machineCost: number;
  estimatedSetupDays: number;
  actualStartDate?: string;
  completedDate?: string;
  status: InstallationStatus;
  assignedTechnician: string;
  notes?: string;
  subscriptionPlanSummary?: {
    planName: string;
    totalMonthly: number;
  };
  createdAt: string;
};

export type EquipmentStatus = 'online' | 'offline' | 'needs-attention';

export type Equipment = {
  id: string;
  installationId: string;
  name: string;
  model: string;
  serialNumber: string;
  status: EquipmentStatus;
  healthScore: number;
  installedDate: string;
  warrantyExpiry: string;
  lastMaintenanceDate?: string;
  nextMaintenanceDate?: string;
  customerName: string;
};

export type TicketCategory =
  | 'billing'
  | 'equipment-fault'
  | 'service-request'
  | 'general';

export type TicketPriority = 'high' | 'medium' | 'low';

export type TicketStatus =
  | 'open'
  | 'awaiting-approval'
  | 'in-progress'
  | 'resolved'
  | 'closed';

export type TicketApprovalAction =
  | 'credit'
  | 'refund'
  | 'dispatch-tech'
  | 'none';

export type SupportTicket = {
  id: string;
  customerName: string;
  customerEmail: string;
  category: TicketCategory;
  priority: TicketPriority;
  subject: string;
  description: string;
  status: TicketStatus;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  providerNotes?: string;
  approvalAction?: TicketApprovalAction;
  slaDeadline: string;
};

export type ProviderAlertType =
  | 'new-request'
  | 'payment-overdue'
  | 'equipment-failure'
  | 'sla-breach'
  | 'contract-renewal'
  | 'ticket';

export type ProviderAlertSeverity = 'critical' | 'warning' | 'info';

export type ProviderAlert = {
  id: string;
  type: ProviderAlertType;
  severity: ProviderAlertSeverity;
  title: string;
  message: string;
  relatedId?: string;
  dismissed: boolean;
  createdAt: string;
};

export type PaymentStatus = 'paid' | 'pending' | 'overdue';

export type CustomerPayment = {
  id: string;
  customerId: string;
  customerName: string;
  serviceTitle: string;
  planName: string;
  monthlyAmount: number;
  status: PaymentStatus;
  dueDate: string;
  paidDate?: string;
  month: string;
};

// ---- STORAGE KEYS ----

const KEYS = {
  INSTALLATIONS: 'eaas_provider_installations',
  EQUIPMENT: 'eaas_provider_equipment',
  TICKETS: 'eaas_provider_tickets',
  ALERTS: 'eaas_provider_alerts',
  PAYMENTS: 'eaas_provider_payments',
  SEEDED: 'eaas_provider_seeded',
};

// ---- GENERIC HELPERS ----

function getList<T>(key: string): T[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveList<T>(key: string, list: T[]): void {
  localStorage.setItem(key, JSON.stringify(list));
}

// ---- INSTALLATIONS CRUD ----

export function getInstallations(): Installation[] {
  return getList<Installation>(KEYS.INSTALLATIONS);
}

export function addInstallation(
  inst: Omit<Installation, 'id' | 'createdAt'>
): Installation {
  const newInst: Installation = {
    ...inst,
    id: `inst-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  const list = getInstallations();
  list.push(newInst);
  saveList(KEYS.INSTALLATIONS, list);
  return newInst;
}

export function updateInstallationStatus(
  id: string,
  status: InstallationStatus,
  extra?: Partial<Installation>
): void {
  const list = getInstallations();
  const updated = list.map((i) =>
    i.id === id ? { ...i, ...extra, status } : i
  );
  saveList(KEYS.INSTALLATIONS, updated);
}

export function getInstallationPipeline(): Record<InstallationStatus, number> {
  const list = getInstallations();
  const pipeline: Record<InstallationStatus, number> = {
    survey: 0,
    approval: 0,
    procurement: 0,
    installation: 0,
    testing: 0,
    live: 0,
  };
  list.forEach((i) => {
    pipeline[i.status]++;
  });
  return pipeline;
}

// ---- EQUIPMENT CRUD ----

export function getEquipmentList(): Equipment[] {
  return getList<Equipment>(KEYS.EQUIPMENT);
}

export function addEquipment(
  eq: Omit<Equipment, 'id'>
): Equipment {
  const newEq: Equipment = {
    ...eq,
    id: `eq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  const list = getEquipmentList();
  list.push(newEq);
  saveList(KEYS.EQUIPMENT, list);
  return newEq;
}

export function updateEquipmentStatus(
  id: string,
  status: EquipmentStatus,
  healthScore?: number
): void {
  const list = getEquipmentList();
  const updated = list.map((e) =>
    e.id === id
      ? { ...e, status, healthScore: healthScore ?? e.healthScore }
      : e
  );
  saveList(KEYS.EQUIPMENT, updated);
}

export function updateEquipmentMaintenance(
  id: string,
  nextMaintenanceDate: string
): void {
  const list = getEquipmentList();
  const updated = list.map((e) =>
    e.id === id
      ? { ...e, lastMaintenanceDate: new Date().toISOString().split('T')[0], nextMaintenanceDate }
      : e
  );
  saveList(KEYS.EQUIPMENT, updated);
}

// ---- SUPPORT TICKETS CRUD ----

export function getTickets(): SupportTicket[] {
  return getList<SupportTicket>(KEYS.TICKETS);
}

export function addTicket(
  ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'slaDeadline'>
): SupportTicket {
  const now = new Date();
  const slaHours =
    ticket.priority === 'high' ? 24 : ticket.priority === 'medium' ? 48 : 72;
  const slaDeadline = new Date(
    now.getTime() + slaHours * 60 * 60 * 1000
  ).toISOString();

  const newTicket: SupportTicket = {
    ...ticket,
    id: `tkt-${Date.now()}`,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    slaDeadline,
  };
  const list = getTickets();
  list.push(newTicket);
  saveList(KEYS.TICKETS, list);
  return newTicket;
}

export function updateTicketStatus(
  id: string,
  status: TicketStatus,
  extra?: Partial<SupportTicket>
): void {
  const list = getTickets();
  const updated = list.map((t) =>
    t.id === id
      ? {
          ...t,
          ...extra,
          status,
          updatedAt: new Date().toISOString(),
          ...(status === 'resolved'
            ? { resolvedAt: new Date().toISOString() }
            : {}),
        }
      : t
  );
  saveList(KEYS.TICKETS, updated);
}

export function getTicketStats(): Record<TicketStatus, number> {
  const list = getTickets();
  const stats: Record<TicketStatus, number> = {
    open: 0,
    'awaiting-approval': 0,
    'in-progress': 0,
    resolved: 0,
    closed: 0,
  };
  list.forEach((t) => {
    stats[t.status]++;
  });
  return stats;
}

// ---- PROVIDER ALERTS CRUD ----

export function getProviderAlerts(): ProviderAlert[] {
  return getList<ProviderAlert>(KEYS.ALERTS);
}

export function addProviderAlert(
  alert: Omit<ProviderAlert, 'id' | 'createdAt' | 'dismissed'>
): ProviderAlert {
  const newAlert: ProviderAlert = {
    ...alert,
    id: `pa-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    dismissed: false,
    createdAt: new Date().toISOString(),
  };
  const list = getProviderAlerts();
  list.push(newAlert);
  saveList(KEYS.ALERTS, list);
  return newAlert;
}

export function dismissAlert(id: string): void {
  const list = getProviderAlerts();
  const updated = list.map((a) =>
    a.id === id ? { ...a, dismissed: true } : a
  );
  saveList(KEYS.ALERTS, updated);
}

export function dismissAllAlerts(severity?: ProviderAlertSeverity): void {
  const list = getProviderAlerts();
  const updated = list.map((a) => {
    if (severity && a.severity !== severity) return a;
    return { ...a, dismissed: true };
  });
  saveList(KEYS.ALERTS, updated);
}

// ---- CUSTOMER PAYMENTS CRUD ----

export function getCustomerPayments(): CustomerPayment[] {
  return getList<CustomerPayment>(KEYS.PAYMENTS);
}

export function addCustomerPayment(
  payment: Omit<CustomerPayment, 'id'>
): CustomerPayment {
  const newPayment: CustomerPayment = {
    ...payment,
    id: `pay-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  };
  const list = getCustomerPayments();
  list.push(newPayment);
  saveList(KEYS.PAYMENTS, list);
  return newPayment;
}

export function getRevenueOverview() {
  const payments = getCustomerPayments();
  const totalMRR = payments.reduce((sum, p) => sum + p.monthlyAmount, 0);
  const paid = payments.filter((p) => p.status === 'paid');
  const overdue = payments.filter((p) => p.status === 'overdue');
  const pending = payments.filter((p) => p.status === 'pending');

  return {
    totalMRR,
    totalPaid: paid.reduce((sum, p) => sum + p.monthlyAmount, 0),
    totalOutstanding:
      overdue.reduce((sum, p) => sum + p.monthlyAmount, 0) +
      pending.reduce((sum, p) => sum + p.monthlyAmount, 0),
    overdueCount: overdue.length,
    paidCount: paid.length,
    collectionRate:
      payments.length > 0
        ? Math.round((paid.length / payments.length) * 100 * 10) / 10
        : 0,
  };
}

// ---- MOCK CUSTOMER CONSUMPTION DATA ----

export type CustomerConsumption = {
  customerName: string;
  propertyId: string;
  serviceTitle: string;
  planName: string;
  planThreshold: number;
  monthlyConsumption: number;
  paymentStatus: PaymentStatus;
  lastPaymentDate: string;
  hourlyData: { time: string; consumption: number }[];
};

export function getCustomerConsumptionData(): CustomerConsumption[] {
  const installations = getInstallations().filter((i) => i.status === 'live');

  return installations.map((inst) => {
    const baseConsumption = 3 + Math.random() * 4;
    const hourlyData = Array.from({ length: 24 }, (_, h) => {
      const hourStr = `${h.toString().padStart(2, '0')}:00`;
      const timeModifier =
        h >= 6 && h <= 9
          ? 1.5
          : h >= 17 && h <= 21
          ? 1.8
          : h >= 0 && h <= 5
          ? 0.5
          : 1.0;
      return {
        time: hourStr,
        consumption:
          Math.round(baseConsumption * timeModifier * (0.8 + Math.random() * 0.4) * 10) / 10,
      };
    });

    const monthlyConsumption = Math.round(
      hourlyData.reduce((sum, h) => sum + h.consumption, 0) * 30
    );

    const payment = getCustomerPayments().find(
      (p) => p.customerName === inst.customerName
    );

    return {
      customerName: inst.customerName,
      propertyId: inst.requestId || inst.id,
      serviceTitle: inst.serviceTitle,
      planName: inst.subscriptionPlanSummary?.planName || 'Standard Plan',
      planThreshold: 500,
      monthlyConsumption,
      paymentStatus: payment?.status || 'pending',
      lastPaymentDate: payment?.paidDate || '',
      hourlyData,
    };
  });
}

// ---- SEED MOCK DATA ----

export function seedProviderMockData(): void {
  if (typeof window === 'undefined') return;
  if (localStorage.getItem(KEYS.SEEDED)) return;

  // --- Installations ---
  const mockInstallations: Omit<Installation, 'id' | 'createdAt'>[] = [
    {
      serviceTitle: 'Solar Energy',
      customerName: 'Rahul Kumar',
      machineName: 'Loom Solar 5kW Mono PERC',
      machineCost: 275000,
      estimatedSetupDays: 14,
      status: 'live',
      assignedTechnician: 'Rajesh Sharma',
      completedDate: '2026-01-20',
      actualStartDate: '2026-01-10',
      subscriptionPlanSummary: { planName: 'Solar Rooftop Starter', totalMonthly: 3500 },
    },
    {
      serviceTitle: 'EV Charging',
      customerName: 'Priya Patel',
      machineName: 'Tata EZ Charge 7.4kW',
      machineCost: 85000,
      estimatedSetupDays: 7,
      status: 'live',
      assignedTechnician: 'Amit Verma',
      completedDate: '2026-02-05',
      actualStartDate: '2026-02-01',
      subscriptionPlanSummary: { planName: 'EV Smart Charge', totalMonthly: 1800 },
    },
    {
      serviceTitle: 'Battery Backup',
      customerName: 'Anita Singh',
      machineName: 'Luminous 10kWh Li-ion',
      machineCost: 320000,
      estimatedSetupDays: 10,
      status: 'installation',
      assignedTechnician: 'Rajesh Sharma',
      actualStartDate: '2026-03-10',
      subscriptionPlanSummary: { planName: 'PowerGuard Plus', totalMonthly: 4200 },
    },
    {
      serviceTitle: 'Solar Energy',
      customerName: 'Vikram Mehta',
      machineName: 'Waaree 8kW Bifacial',
      machineCost: 440000,
      estimatedSetupDays: 18,
      status: 'procurement',
      assignedTechnician: 'Suresh Nair',
      subscriptionPlanSummary: { planName: 'Solar Premium 8kW', totalMonthly: 5500 },
    },
    {
      serviceTitle: 'Cooling as a Service',
      customerName: 'Meera Desai',
      machineName: 'Daikin VRV IV 14kW',
      machineCost: 195000,
      estimatedSetupDays: 5,
      status: 'approval',
      assignedTechnician: '',
      subscriptionPlanSummary: { planName: 'Cool Comfort', totalMonthly: 2800 },
    },
    {
      serviceTitle: 'Water Heating',
      customerName: 'Arjun Rao',
      machineName: 'Racold Heat Pump 200L',
      machineCost: 65000,
      estimatedSetupDays: 3,
      status: 'live',
      assignedTechnician: 'Amit Verma',
      completedDate: '2026-02-20',
      actualStartDate: '2026-02-18',
      subscriptionPlanSummary: { planName: 'AquaHeat Saver', totalMonthly: 1200 },
    },
    {
      serviceTitle: 'Lighting as a Service',
      customerName: 'Neha Gupta',
      machineName: 'Philips SmartBright LED Kit',
      machineCost: 42000,
      estimatedSetupDays: 2,
      status: 'testing',
      assignedTechnician: 'Suresh Nair',
      actualStartDate: '2026-03-12',
      subscriptionPlanSummary: { planName: 'BrightSpace Lite', totalMonthly: 900 },
    },
  ];

  const instList: Installation[] = mockInstallations.map((inst, i) => ({
    ...inst,
    id: `inst-seed-${i + 1}`,
    createdAt: new Date(Date.now() - (30 - i * 4) * 86400000).toISOString(),
  }));
  saveList(KEYS.INSTALLATIONS, instList);

  // --- Equipment (for 'live' installations) ---
  const liveInstallations = instList.filter((i) => i.status === 'live');
  const mockEquipment: Equipment[] = [
    {
      id: 'eq-001',
      installationId: liveInstallations[0]?.id || '',
      name: 'Solar Inverter',
      model: 'Growatt 5kW MIN',
      serialNumber: 'GW-2026-001234',
      status: 'online',
      healthScore: 95,
      installedDate: '2026-01-20',
      warrantyExpiry: '2031-01-20',
      lastMaintenanceDate: '2026-03-01',
      nextMaintenanceDate: '2026-06-01',
      customerName: 'Rahul Kumar',
    },
    {
      id: 'eq-002',
      installationId: liveInstallations[0]?.id || '',
      name: 'Solar Panel Array (10x)',
      model: 'Loom Solar 500W Mono',
      serialNumber: 'LS-PANEL-2026-0050',
      status: 'online',
      healthScore: 98,
      installedDate: '2026-01-20',
      warrantyExpiry: '2051-01-20',
      customerName: 'Rahul Kumar',
    },
    {
      id: 'eq-003',
      installationId: liveInstallations[1]?.id || '',
      name: 'EV Charger Unit',
      model: 'Tata EZ Charge 7.4kW AC',
      serialNumber: 'TATA-EZ-2026-0088',
      status: 'online',
      healthScore: 100,
      installedDate: '2026-02-05',
      warrantyExpiry: '2029-02-05',
      lastMaintenanceDate: '2026-02-05',
      nextMaintenanceDate: '2026-08-05',
      customerName: 'Priya Patel',
    },
    {
      id: 'eq-004',
      installationId: liveInstallations[1]?.id || '',
      name: 'Smart Meter',
      model: 'Secure Liberty 300',
      serialNumber: 'SEC-LIB-2026-0312',
      status: 'needs-attention',
      healthScore: 62,
      installedDate: '2026-02-05',
      warrantyExpiry: '2031-02-05',
      customerName: 'Priya Patel',
    },
    {
      id: 'eq-005',
      installationId: liveInstallations[2]?.id || '',
      name: 'Heat Pump Unit',
      model: 'Racold Platinum 200L',
      serialNumber: 'RAC-HP-2026-0200',
      status: 'online',
      healthScore: 88,
      installedDate: '2026-02-20',
      warrantyExpiry: '2031-02-20',
      lastMaintenanceDate: '2026-02-20',
      nextMaintenanceDate: '2026-05-20',
      customerName: 'Arjun Rao',
    },
    {
      id: 'eq-006',
      installationId: liveInstallations[0]?.id || '',
      name: 'Net Meter',
      model: 'HPL 3-Phase Bidirectional',
      serialNumber: 'HPL-NM-2026-0099',
      status: 'offline',
      healthScore: 0,
      installedDate: '2026-01-20',
      warrantyExpiry: '2036-01-20',
      customerName: 'Rahul Kumar',
    },
  ];
  saveList(KEYS.EQUIPMENT, mockEquipment);

  // --- Support Tickets ---
  const now = Date.now();
  const mockTickets: SupportTicket[] = [
    {
      id: 'tkt-001',
      customerName: 'Rahul Kumar',
      customerEmail: 'rahul@example.com',
      category: 'equipment-fault',
      priority: 'high',
      subject: 'Net meter showing offline',
      description:
        'The bidirectional net meter installed on my property has been showing as offline since this morning. Export readings have stopped.',
      status: 'open',
      createdAt: new Date(now - 6 * 3600000).toISOString(),
      updatedAt: new Date(now - 6 * 3600000).toISOString(),
      slaDeadline: new Date(now + 18 * 3600000).toISOString(),
    },
    {
      id: 'tkt-002',
      customerName: 'Priya Patel',
      customerEmail: 'priya@example.com',
      category: 'billing',
      priority: 'medium',
      subject: 'Incorrect charge on March bill',
      description:
        'My March bill shows ₹4,200 but my plan is ₹1,800/month. I think there is an error in the usage calculation.',
      status: 'awaiting-approval',
      createdAt: new Date(now - 2 * 86400000).toISOString(),
      updatedAt: new Date(now - 1 * 86400000).toISOString(),
      slaDeadline: new Date(now + 22 * 3600000).toISOString(),
      providerNotes: 'Checking billing records — may need to issue a credit.',
    },
    {
      id: 'tkt-003',
      customerName: 'Arjun Rao',
      customerEmail: 'arjun@example.com',
      category: 'service-request',
      priority: 'low',
      subject: 'Request for additional heat pump unit',
      description:
        'I would like to add a second heat pump for the upstairs bathroom. Please advise on options.',
      status: 'in-progress',
      createdAt: new Date(now - 4 * 86400000).toISOString(),
      updatedAt: new Date(now - 2 * 86400000).toISOString(),
      slaDeadline: new Date(now + 44 * 3600000).toISOString(),
      providerNotes: 'Sent catalogue options to customer via email.',
    },
    {
      id: 'tkt-004',
      customerName: 'Rahul Kumar',
      customerEmail: 'rahul@example.com',
      category: 'general',
      priority: 'low',
      subject: 'When is next scheduled maintenance?',
      description: 'Just wanted to know when the next cleaning/maintenance visit is planned for my solar panels.',
      status: 'resolved',
      createdAt: new Date(now - 10 * 86400000).toISOString(),
      updatedAt: new Date(now - 8 * 86400000).toISOString(),
      resolvedAt: new Date(now - 8 * 86400000).toISOString(),
      slaDeadline: new Date(now - 7 * 86400000).toISOString(),
      providerNotes: 'Informed customer: next maintenance is scheduled for June 2026.',
    },
  ];
  saveList(KEYS.TICKETS, mockTickets);

  // --- Provider Alerts ---
  const mockAlerts: ProviderAlert[] = [
    {
      id: 'pa-001',
      type: 'equipment-failure',
      severity: 'critical',
      title: 'Net Meter Offline — Rahul Kumar',
      message:
        'HPL 3-Phase Bidirectional Net Meter (HPL-NM-2026-0099) has been offline for 6 hours.',
      relatedId: 'eq-006',
      dismissed: false,
      createdAt: new Date(now - 6 * 3600000).toISOString(),
    },
    {
      id: 'pa-002',
      type: 'payment-overdue',
      severity: 'warning',
      title: 'Payment Overdue — Priya Patel',
      message:
        'March payment of ₹1,800 for EV Smart Charge plan is 5 days overdue.',
      relatedId: 'pay-002',
      dismissed: false,
      createdAt: new Date(now - 5 * 86400000).toISOString(),
    },
    {
      id: 'pa-003',
      type: 'ticket',
      severity: 'warning',
      title: 'Ticket Awaiting Approval',
      message:
        'Billing dispute from Priya Patel requires your approval to issue credit.',
      relatedId: 'tkt-002',
      dismissed: false,
      createdAt: new Date(now - 1 * 86400000).toISOString(),
    },
    {
      id: 'pa-004',
      type: 'sla-breach',
      severity: 'critical',
      title: 'SLA Breach Risk — Ticket #tkt-001',
      message:
        'High-priority ticket "Net meter showing offline" has 18 hours remaining before SLA breach.',
      relatedId: 'tkt-001',
      dismissed: false,
      createdAt: new Date(now - 2 * 3600000).toISOString(),
    },
    {
      id: 'pa-005',
      type: 'contract-renewal',
      severity: 'info',
      title: 'Contract Renewal — Arjun Rao',
      message:
        'AquaHeat Saver plan for Arjun Rao is up for renewal in 30 days.',
      dismissed: false,
      createdAt: new Date(now - 1 * 86400000).toISOString(),
    },
  ];
  saveList(KEYS.ALERTS, mockAlerts);

  // --- Customer Payments ---
  const mockPayments: CustomerPayment[] = [
    {
      id: 'pay-001',
      customerId: 'cust-001',
      customerName: 'Rahul Kumar',
      serviceTitle: 'Solar Energy',
      planName: 'Solar Rooftop Starter',
      monthlyAmount: 3500,
      status: 'paid',
      dueDate: '2026-03-31',
      paidDate: '2026-03-20',
      month: 'March 2026',
    },
    {
      id: 'pay-002',
      customerId: 'cust-002',
      customerName: 'Priya Patel',
      serviceTitle: 'EV Charging',
      planName: 'EV Smart Charge',
      monthlyAmount: 1800,
      status: 'overdue',
      dueDate: '2026-03-10',
      month: 'March 2026',
    },
    {
      id: 'pay-003',
      customerId: 'cust-003',
      customerName: 'Arjun Rao',
      serviceTitle: 'Water Heating',
      planName: 'AquaHeat Saver',
      monthlyAmount: 1200,
      status: 'paid',
      dueDate: '2026-03-31',
      paidDate: '2026-03-15',
      month: 'March 2026',
    },
  ];
  saveList(KEYS.PAYMENTS, mockPayments);

  localStorage.setItem(KEYS.SEEDED, 'true');
}
