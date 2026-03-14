
import {
  LayoutDashboard,
  FileText,
  AreaChart,
  HeartHandshake,
  LifeBuoy,
  Zap,
  ClipboardList,
  ShieldCheck
} from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon: React.ElementType;
  pro?: boolean;
};

export const userNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
  { href: '/billing', label: 'Billing', icon: FileText },
  { href: '/carbon-footprint', label: 'Carbon Footprint', icon: HeartHandshake },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const providerNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Surveys', icon: ClipboardList },
  { href: '/grid-status', label: 'Grid Status', icon: Zap },
  { href: '/support', label: 'Support', icon: LifeBuoy },
];

export const adminNavLinks: NavLink[] = [
  { href: '/dashboard', label: 'Admin Panel', icon: ShieldCheck },
  { href: '/analytics', label: 'Facility Analytics', icon: AreaChart },
  { href: '/grid-status', label: 'Grid Monitoring', icon: Zap },
];
