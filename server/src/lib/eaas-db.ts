import { PostgrestError } from '@supabase/supabase-js';
import { getSupabaseClient } from './supabase';

export const APP_DB_SCHEMA = process.env.APP_DB_SCHEMA || 'eaas';

export interface UserRow {
  id: string;
  email: string;
  password: string;
  name: string;
  phone: string | null;
  address: string | null;
  role: 'CITIZEN' | 'ADMIN' | 'EXECUTIVE';
  is_active: boolean;
  current_property_id: string | null;
  created_at: string;
}

export interface PropertyRow {
  id: string;
  user_id: string;
  name: string;
  address: string;
  type: 'residential' | 'commercial';
  subscription_status: string;
  plan_type: string | null;
  solar_capacity: number | null;
  battery_storage: number | null;
  installation_date: string | null;
  created_at: string;
}

export function getEaasClient() {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase client is not configured');
  }

  return client.schema(APP_DB_SCHEMA);
}

export function assertNoDbError(error: PostgrestError | null): void {
  if (error) {
    throw new Error(error.message);
  }
}

export function mapUserProfile(row: UserRow) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone,
    address: row.address,
    currentPropertyId: row.current_property_id,
    createdAt: row.created_at,
  };
}

export function mapUserAuth(row: UserRow) {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    phone: row.phone,
    role: row.role,
    createdAt: row.created_at,
  };
}

export function mapProperty(row: PropertyRow) {
  return {
    id: row.id,
    name: row.name,
    address: row.address,
    type: row.type,
    subscriptionStatus: row.subscription_status,
    planType: row.plan_type,
    solarCapacity: row.solar_capacity,
    batteryStorage: row.battery_storage,
    installationDate: row.installation_date,
    createdAt: row.created_at,
  };
}
