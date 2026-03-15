
import {
  LayoutDashboard,
  FileText,
  AreaChart,
  HeartHandshake,
  LifeBuoy,
  Zap,
  ClipboardList,
  ShieldCheck,
  Wrench,
  Users,
  Cpu,
  Ticket,
  Bell,
  Activity,
  CalendarClock,
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  pro?: boolean;
};

export const userNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/monitor', label: 'Monitor', icon: Activity },
  { href: '/maintenance', label: 'Maintenance', icon: CalendarClock },
  { href: '/billing', label: 'Billing', icon: FileText },
  { href: '/carbon-footprint', label: 'Carbon Footprint', icon: HeartHandshake },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const providerNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/installations', label: 'Installations', icon: Wrench },
  { href: '/provider-billing', label: 'Billing Review', icon: FileText },
  { href: '/customers', label: 'Customers', icon: Users },
  { href: '/equipment', label: 'Equipment', icon: Cpu },
  { href: '/provider-tickets', label: 'Tickets', icon: Ticket },
  { href: '/provider-alerts', label: 'Alerts', icon: Bell },
  { href: '/grid-status', label: 'Grid Status', icon: Zap },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const adminNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Admin Panel', icon: ShieldCheck },
  { href: '/analytics', label: 'Facility Analytics', icon: AreaChart },
  { href: '/grid-status', label: 'Grid Monitoring', icon: Zap },
];
