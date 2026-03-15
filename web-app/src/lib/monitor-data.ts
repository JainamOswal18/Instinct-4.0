// Monitor Data – tracks consumption for subscribed (completed) energies

import { getServiceRequests, getSurveyResults } from './notifications';
import { energyServices } from './mock-data';

export type SubscribedEnergy = {
  serviceId: string;
  serviceTitle: string;
  subscribedDate: string;
  currentUsage: number; // kWh
  dailyAverage: number;
  monthlyEstimate: number;
  status: 'active' | 'idle' | 'alert';
};

export type ConsumptionReading = {
  time: string;
  value: number;
};

export type DailyConsumption = {
  day: string;
  value: number;
};

// Get all subscribed (completed-survey) energies
export function getSubscribedEnergies(): SubscribedEnergy[] {
  const surveys = getSurveyResults();
  const requests = getServiceRequests().filter(r => r.status === 'completed');

  // If no completed requests, return demo subscribed energies
  if (requests.length === 0 && surveys.length === 0) {
    return getDefaultSubscribedEnergies();
  }

  const seen = new Set<string>();
  const result: SubscribedEnergy[] = [];

  for (const req of requests) {
    if (seen.has(req.serviceId)) continue;
    seen.add(req.serviceId);

    const consumption = parseFloat(req.consumption) || 300;
    const dailyAvg = +(consumption / 30).toFixed(1);

    result.push({
      serviceId: req.serviceId,
      serviceTitle: req.serviceTitle,
      subscribedDate: req.date,
      currentUsage: +(consumption * (0.8 + Math.random() * 0.4)).toFixed(1),
      dailyAverage: dailyAvg,
      monthlyEstimate: consumption,
      status: Math.random() > 0.85 ? 'alert' : Math.random() > 0.3 ? 'active' : 'idle',
    });
  }

  return result;
}

function getDefaultSubscribedEnergies(): SubscribedEnergy[] {
  // Show first 3 energy services as demo subscriptions
  const demoServices = energyServices.slice(0, 3);
  return demoServices.map(svc => ({
    serviceId: svc.id,
    serviceTitle: svc.title,
    subscribedDate: '2026-01-15',
    currentUsage: +(200 + Math.random() * 300).toFixed(1),
    dailyAverage: +(8 + Math.random() * 12).toFixed(1),
    monthlyEstimate: +(250 + Math.random() * 350).toFixed(0),
    status: 'active' as const,
  }));
}

// Generate hourly consumption data for a given service
export function getHourlyConsumption(serviceId: string): ConsumptionReading[] {
  const seed = hashCode(serviceId);
  const data: ConsumptionReading[] = [];

  for (let h = 0; h < 24; h++) {
    const hour = h.toString().padStart(2, '0') + ':00';
    // Simulate realistic curve: low at night, peak in morning/evening
    let base = 1.5;
    if (h >= 6 && h <= 9) base = 4 + Math.sin(h) * 2;
    else if (h >= 17 && h <= 21) base = 5 + Math.sin(h) * 2;
    else if (h >= 10 && h <= 16) base = 3.5;

    const noise = seededRandom(seed + h) * 1.5;
    data.push({ time: hour, value: +(base + noise).toFixed(2) });
  }

  return data;
}

// Generate last 7 days daily consumption
export function getWeeklyConsumption(serviceId: string): DailyConsumption[] {
  const seed = hashCode(serviceId);
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return days.map((day, i) => ({
    day,
    value: +(60 + seededRandom(seed + i * 7) * 80).toFixed(1),
  }));
}

// Simple hash for deterministic pseudo-random
function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}
