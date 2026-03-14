// store/useEnergyStore.ts
import { create } from 'zustand';
import apiWrapper from '../services/apiWrapper';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface EnergyData {
  solarKw: number;
  batteryPercent: number;
  gridKw: number;
  consumption: number;
  production: number;
  exporting: boolean;
  timestamp: string;
  // Extended services
  lightingKw: number;
  coolingKw: number;
}

export interface EnergyStats {
  currentKwh: number;
  trendPercent: number;
  carbonSavedKg: number;
  monthlyBill: number;
  solarProduction: number;
  gridConsumption: number;
  batteryUsage: number;
  // Extended services
  batteryCycles: number;
  lightingHours: number;
  coolingHours: number;
  // Optional history arrays (present on month/year periods)
  history?: { date: string; consumption: number }[];
  solarHistory?: { date: string; production: number }[];
}

type Period = 'day' | 'week' | 'month' | 'year';

interface EnergyState {
  currentData: EnergyData | null;
  stats: EnergyStats | null;
  alerts: any[];
  isLoading: boolean;
  isRefreshing: boolean;
  period: Period;
  error: string | null;
  streamCleanup: (() => void) | null;

  loadData: (propertyId: string, period?: Period) => Promise<void>;
  loadAlerts: (propertyId: string) => Promise<void>;
  setPeriod: (period: Period) => void;
  startStream: (propertyId: string) => void;
  stopStream: () => void;
  clearError: () => void;
}

// ── Normalise helpers — handle camelCase (API) and snake_case (legacy mock) ───

function normaliseEnergyData(raw: any): EnergyData {
  return {
    solarKw:        raw.solarKw        ?? raw.solar_kw        ?? raw.solar_kwh        ?? 0,
    batteryPercent: raw.batteryPercent ?? raw.battery_percent ?? raw.batteryKwh        ?? 0,
    gridKw:         raw.gridKw         ?? raw.grid_kw         ?? raw.grid_kwh          ?? 0,
    consumption:    raw.consumption    ?? raw.consumptionKw   ?? raw.consumption_kw    ?? 0,
    production:     raw.production     ?? raw.productionKw    ?? raw.solarKw           ?? 0,
    exporting:      raw.exporting      ?? false,
    timestamp:      raw.timestamp      ?? new Date().toISOString(),
    lightingKw:     raw.lightingKw     ?? raw.lighting_kw     ?? 0,
    coolingKw:      raw.coolingKw      ?? raw.cooling_kw      ?? 0,
  };
}

function normaliseStats(raw: any): EnergyStats {
  return {
    currentKwh:     raw.currentKwh     ?? raw.current_kwh     ?? 0,
    trendPercent:   raw.trendPercent   ?? raw.trend_percent   ?? 0,
    carbonSavedKg:  raw.carbonSavedKg  ?? raw.carbon_saved_kg ?? 0,
    monthlyBill:    raw.monthlyBill    ?? raw.monthly_bill    ?? 0,
    solarProduction: raw.solarProduction ?? raw.solar_production ?? 0,
    gridConsumption: raw.gridConsumption ?? raw.grid_consumption ?? 0,
    batteryUsage:    raw.batteryUsage   ?? raw.battery_usage   ?? 0,
    batteryCycles:   raw.batteryCycles  ?? raw.battery_cycles  ?? 0,
    lightingHours:   raw.lightingHours  ?? raw.lighting_hours  ?? 0,
    coolingHours:    raw.coolingHours   ?? raw.cooling_hours   ?? 0,
    history:         raw.history        ?? undefined,
    solarHistory:    raw.solarHistory   ?? undefined,
  };
}

// ── Store ─────────────────────────────────────────────────────────────────────

export const useEnergyStore = create<EnergyState>((set, get) => ({
  currentData: null,
  stats: null,
  alerts: [],
  isLoading: false,
  isRefreshing: false,
  period: 'month',
  error: null,
  streamCleanup: null,

  // ── Load stats + optional period ─────────────────────────────────────────
  loadData: async (propertyId: string, period?: Period) => {
    const targetPeriod = period ?? get().period;
    const alreadyHasData = get().stats !== null;

    // First load → full loading indicator; subsequent → silent refresh
    set(alreadyHasData
      ? { isRefreshing: true, error: null }
      : { isLoading: true, error: null }
    );

    try {
      const res = await apiWrapper.energy.getStats(propertyId, targetPeriod);
      if (res?.data) {
        set({ stats: normaliseStats(res.data) });
      }
    } catch (error: any) {
      set({ error: error?.message ?? 'Failed to load energy data' });
    } finally {
      set({ isLoading: false, isRefreshing: false });
    }
  },

  // ── Load alerts separately so dashboard can refresh them independently ────
  loadAlerts: async (propertyId: string) => {
    try {
      const res = await apiWrapper.alerts.getByProperty(propertyId);
      if (res?.data?.alerts) set({ alerts: res.data.alerts });
    } catch {
      // Alerts failing shouldn't block the dashboard
    }
  },

  // ── Period selector — re-fetches stats when period changes ───────────────
  setPeriod: (period: Period) => {
    set({ period });
    // Caller is responsible for calling loadData again with the new period
    // (avoids the store needing to know the current propertyId)
  },

  // ── Real-time stream via apiWrapper ──────────────────────────────────────
  startStream: (propertyId: string) => {
    // Stop any existing stream first
    get().stopStream();

    const cleanup = apiWrapper.energy.connectStream(
      propertyId,
      '', // token is attached by the axios interceptor
      (raw) => set({ currentData: normaliseEnergyData(raw) })
    );

    set({ streamCleanup: cleanup });
  },

  stopStream: () => {
    const cleanup = get().streamCleanup;
    if (cleanup) {
      cleanup();
      set({ streamCleanup: null });
    }
  },

  clearError: () => set({ error: null }),
}));