// types/index.ts

export interface User {
  id: string;
  name: string;
  email: string;
  planType: 'basic' | 'premium' | 'pro' | 'enterprise';
}

export interface EnergyData {
  solar_kwh: number;
  battery_percent: number;
  grid_kwh: number;
  total_cost: number;
  timestamp: string;
}

export interface UsageStats {
  current_kwh: number;
  carbon_saved_kg: number;
  monthly_bill: number;
  trend: 'up' | 'down';
  trend_percent: number;
}

export interface ChatMessage {
  id: string;
  text: string;
  createdAt: Date;
  user: {
    _id: number;
    name: string;
  };
}

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
}