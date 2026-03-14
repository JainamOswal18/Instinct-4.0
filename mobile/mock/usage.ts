// mock/usage.ts
import { EnergyData, UsageStats } from '@/types';

// Simulates real-time energy data
export function getCurrentEnergyData(): EnergyData {
  return {
    solar_kwh: parseFloat((Math.random() * 5).toFixed(2)),
    battery_percent: parseFloat((Math.random() * 100).toFixed(1)),
    grid_kwh: parseFloat((Math.random() * 2).toFixed(2)),
    total_cost: parseFloat((Math.random() * 50 + 100).toFixed(2)),
    timestamp: new Date().toISOString(),
  };
}

// Dashboard summary stats
export function getUsageStats(): UsageStats {
  return {
    current_kwh: 342.5,
    carbon_saved_kg: 124,
    monthly_bill: 2850,
    trend: 'down',
    trend_percent: 12,
  };
}

// Simulates streaming updates every 15 seconds
export function startEnergyStream(callback: (data: EnergyData) => void) {
  // Initial data
  callback(getCurrentEnergyData());
  
  // Update every 15 seconds
  const interval = setInterval(() => {
    callback(getCurrentEnergyData());
  }, 15000);
  
  // Return cleanup function
  return () => clearInterval(interval);
}