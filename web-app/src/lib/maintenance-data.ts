// Maintenance scheduling data helpers

import { getSubscribedEnergies } from './monitor-data';

export type MaintenanceSchedule = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  scheduledDate: string;
  timeSlot: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
  createdAt: string;
};

const STORAGE_KEY = 'eaas_maintenance_schedules';

export function getMaintenanceSchedules(): MaintenanceSchedule[] {
  try {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveSchedules(schedules: MaintenanceSchedule[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(schedules));
}

export function addMaintenanceSchedule(
  schedule: Omit<MaintenanceSchedule, 'id' | 'status' | 'createdAt'>
): MaintenanceSchedule {
  const newSchedule: MaintenanceSchedule = {
    ...schedule,
    id: `maint-${Date.now()}`,
    status: 'scheduled',
    createdAt: new Date().toISOString(),
  };
  const existing = getMaintenanceSchedules();
  existing.push(newSchedule);
  saveSchedules(existing);
  return newSchedule;
}

export function updateMaintenanceSchedule(
  id: string,
  updates: Partial<Omit<MaintenanceSchedule, 'id' | 'createdAt'>>
): void {
  const schedules = getMaintenanceSchedules();
  const updated = schedules.map(s => (s.id === id ? { ...s, ...updates } : s));
  saveSchedules(updated);
}

export function deleteMaintenanceSchedule(id: string): void {
  const schedules = getMaintenanceSchedules();
  saveSchedules(schedules.filter(s => s.id !== id));
}

export function cancelMaintenanceSchedule(id: string): void {
  updateMaintenanceSchedule(id, { status: 'cancelled' });
}

// Predefined time slots
export const TIME_SLOTS = [
  '08:00 AM - 10:00 AM',
  '10:00 AM - 12:00 PM',
  '12:00 PM - 02:00 PM',
  '02:00 PM - 04:00 PM',
  '04:00 PM - 06:00 PM',
];

export { getSubscribedEnergies };
