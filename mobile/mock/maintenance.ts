// mock/maintenance.ts

export interface ServiceItem {
  id: string;
  component: string;
  icon: string;
  lastServiced: string;
  nextService: string;
  status: 'good' | 'due_soon' | 'overdue';
  notes: string;
}

export interface ServiceHistory {
  id: string;
  date: string;
  component: string;
  type: string;
  engineer: string;
  notes: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmt(d: Date): string {
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function addMonths(base: Date, n: number): Date {
  const d = new Date(base);
  d.setMonth(d.getMonth() + n);
  return d;
}

function daysUntil(d: Date): number {
  return Math.ceil((d.getTime() - Date.now()) / 86400000);
}

function statusFor(nextDate: Date): ServiceItem['status'] {
  const days = daysUntil(nextDate);
  if (days < 0)  return 'overdue';
  if (days <= 30) return 'due_soon';
  return 'good';
}

// ── Schedule ──────────────────────────────────────────────────────────────────

/**
 * Build a maintenance schedule based on when the system was activated.
 * Each component has its own service interval in months.
 * Pass `activationDateStr` from installationProgress.activationDate if available.
 */
export function getMaintenanceSchedule(activationDateStr?: string): ServiceItem[] {
  const base = activationDateStr ? new Date(activationDateStr) : new Date();

  const components: Array<{
    id: string;
    component: string;
    icon: string;
    lastOffset: number; // months before next service
    intervalMonths: number;
    notes: string;
  }> = [
    {
      id: 'solar_panels',
      component: 'Solar Panels',
      icon: '☀️',
      lastOffset: 2,
      intervalMonths: 6,
      notes: 'Clean panels surface, check mounting brackets, inspect wiring and connections',
    },
    {
      id: 'battery',
      component: 'Battery Storage',
      icon: '🔋',
      lastOffset: 1,
      intervalMonths: 6,
      notes: 'Check charge/discharge cycles, test BMS, inspect terminal connections',
    },
    {
      id: 'inverter',
      component: 'Inverter',
      icon: '⚡',
      lastOffset: 3,
      intervalMonths: 6,
      notes: 'Firmware update check, efficiency test, cooling fan and heat sink inspection',
    },
    {
      id: 'wiring',
      component: 'Wiring & Connections',
      icon: '🔌',
      lastOffset: 5,
      intervalMonths: 12,
      notes: 'Inspect all DC/AC cables, check for corrosion, verify earthing',
    },
    {
      id: 'monitoring',
      component: 'Smart Meter & Monitoring',
      icon: '📊',
      lastOffset: 4,
      intervalMonths: 12,
      notes: 'Verify data accuracy, check connectivity, sync firmware',
    },
  ];

  return components.map(c => {
    const lastServiceDate = addMonths(base, -c.lastOffset);
    const nextServiceDate = addMonths(lastServiceDate, c.intervalMonths);

    return {
      id: c.id,
      component: c.component,
      icon: c.icon,
      lastServiced: fmt(lastServiceDate),
      nextService: fmt(nextServiceDate),
      status: statusFor(nextServiceDate),
      notes: c.notes,
    };
  });
}

// ── History ───────────────────────────────────────────────────────────────────

export function getServiceHistory(activationDateStr?: string): ServiceHistory[] {
  const base = activationDateStr ? new Date(activationDateStr) : new Date();

  return [
    {
      id: 'h1',
      date: fmt(addMonths(base, -1)),
      component: 'Solar Panels',
      type: 'Routine Cleaning',
      engineer: 'Rajesh Sharma',
      notes: 'Panels cleaned, dust removed. Efficiency restored to 98%.',
    },
    {
      id: 'h2',
      date: fmt(addMonths(base, -2)),
      component: 'Battery Storage',
      type: 'Health Check',
      engineer: 'Amit Verma',
      notes: 'Battery health at 94%. No degradation detected. All cells nominal.',
    },
    {
      id: 'h3',
      date: fmt(addMonths(base, -3)),
      component: 'Inverter',
      type: 'Firmware Update',
      engineer: 'Rajesh Sharma',
      notes: 'Updated to v3.2.1. Efficiency improved by ~2%. No issues.',
    },
    {
      id: 'h4',
      date: fmt(addMonths(base, -6)),
      component: 'Full System',
      type: 'Annual Inspection',
      engineer: 'Service Team',
      notes: 'All systems nominal. Performance guarantee certificate issued.',
    },
  ];
}

// ── Upcoming visits ───────────────────────────────────────────────────────────

export interface UpcomingVisit {
  id: string;
  date: string;
  type: string;
  engineer: string;
  components: string[];
  confirmed: boolean;
}

export function getUpcomingVisits(activationDateStr?: string): UpcomingVisit[] {
  const base = activationDateStr ? new Date(activationDateStr) : new Date();
  const nextVisit = addMonths(base, 1);
  nextVisit.setDate(15); // schedule on the 15th

  return [
    {
      id: 'v1',
      date: fmt(nextVisit),
      type: 'Bi-annual Service',
      engineer: 'Rajesh Sharma',
      components: ['Solar Panels', 'Inverter', 'Battery Storage'],
      confirmed: false,
    },
  ];
}