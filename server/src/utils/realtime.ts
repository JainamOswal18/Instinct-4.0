import { getSupabaseClient } from '../lib/supabase';
import { APP_DB_SCHEMA } from '../lib/eaas-db';

export async function publishEnergyEvent(payload: {
  propertyId: string;
  solarKw: number;
  batteryPercent: number;
  gridKw: number;
  consumption: number;
  timestamp: string;
}): Promise<void> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return;
  }

  const { error } = await supabase.schema(APP_DB_SCHEMA).from('energy_events').insert({
    property_id: payload.propertyId,
    solar_kw: payload.solarKw,
    battery_percent: payload.batteryPercent,
    grid_kw: payload.gridKw,
    consumption: payload.consumption,
    timestamp: payload.timestamp,
  });

  if (error) {
    throw new Error(error.message);
  }
}
