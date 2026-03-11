// store/useEnergyStore.ts
import { create } from 'zustand';
import { EnergyData, UsageStats, Alert } from '@/types';

interface EnergyState {
  currentData: EnergyData | null;
  stats: UsageStats | null;
  alerts: Alert[];
  isLoading: boolean;
  
  setCurrentData: (data: EnergyData) => void;
  setStats: (stats: UsageStats) => void;
  setAlerts: (alerts: Alert[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useEnergyStore = create<EnergyState>((set) => ({
  currentData: null,
  stats: null,
  alerts: [],
  isLoading: true,
  
  setCurrentData: (data) => set({ currentData: data }),
  setStats: (stats) => set({ stats }),
  setAlerts: (alerts) => set({ alerts }),
  setLoading: (loading) => set({ isLoading: loading }),
}));