// store/useAuthStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

// ========== TYPES ==========

export type Role = 'CITIZEN' | 'ADMIN' | 'EXECUTIVE';

export type SubscriptionStatus =
  | 'NONE'
  | 'SURVEY_PENDING'
  | 'SURVEY_SUBMITTED'
  | 'PLAN_PROPOSED'
  | 'PAYMENT_PENDING'
  | 'PENDING_INSTALLATION'
  | 'ACTIVE'
  | 'SUSPENDED';

export type EnergyService = 'solar' | 'battery' | 'lighting' | 'cooling';

export interface SurveyData {
  propertyType: 'residential' | 'commercial';
  address: string;
  monthlyBill: number;
  monthlyConsumption: number;
  peakHours: string;
  occupants: number;
  appliances: string[];
  energyServices: EnergyService[];
  submittedAt: string;
}

export interface ProposedPlan {
  id: string;
  solarCapacity: number;
  batteryStorage: number;
  monthlyFee: number;
  estimatedSavings: number;
  estimatedProduction: number;
  contractDuration: number;
  installationFee: number;
  securityDeposit: number;
  whatsIncluded: string[];
  generatedAt: string;
}

export interface InstallationProgress {
  paymentConfirmed: boolean;
  engineerAssigned: boolean;
  engineerName?: string;
  engineerPhone?: string;
  siteSurveyScheduled: boolean;
  siteSurveyDate?: string;
  installationStarted: boolean;
  installationDate?: string;
  systemActivated: boolean;
  activationDate?: string;
  estimatedCompletion?: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  type: 'residential' | 'commercial';
  subscriptionStatus: SubscriptionStatus;
  surveyData?: SurveyData;
  proposedPlan?: ProposedPlan;
  installationProgress?: InstallationProgress;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  properties: Property[];
  currentPropertyId: string | null;
}

// ========== HELPERS ==========

const defaultInstallationProgress = (): InstallationProgress => ({
  paymentConfirmed: true,
  engineerAssigned: false,
  siteSurveyScheduled: false,
  installationStarted: false,
  systemActivated: false,
  estimatedCompletion: (() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  })(),
});

const defaultProperty = (): Property => ({
  id: 'default_property',
  name: 'My Property',
  address: '',
  type: 'residential',
  subscriptionStatus: 'NONE',
  createdAt: new Date().toISOString(),
});

// Persist under a user-specific key so multiple accounts on one device don't collide
const saveUserData = (user: User): Promise<void> =>
  AsyncStorage.setItem(`user_${user.id}`, JSON.stringify(user));

// Merge only backend-owned scalars — never clobber local properties/currentPropertyId
function mergeBackendScalars(existing: User, backendUser: Partial<User>): User {
  return {
    ...existing,
    id: backendUser.id ?? existing.id,
    name: backendUser.name ?? existing.name,
    email: backendUser.email ?? existing.email,
    role: backendUser.role ?? existing.role,
    createdAt: backendUser.createdAt ?? existing.createdAt,
  };
}

// ========== STORE ==========

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // ⭐ phone is optional — register.tsx passes it, api.ts accepts it
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;

  addProperty: (data: Omit<Property, 'id' | 'createdAt'>) => void;
  switchProperty: (propertyId: string) => void;
  updateSubscriptionStatus: (propertyId: string, status: SubscriptionStatus) => void;
  saveSurveyData: (propertyId: string, surveyData: SurveyData) => void;
  saveProposal: (propertyId: string, proposal: ProposedPlan) => void;
  updateInstallationProgress: (propertyId: string, progress: Partial<InstallationProgress>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // ========== REGISTER ==========
  register: async (name, email, password, phone) => {
    try {
      const response = await api.auth.register(name, email, password, phone);

      if (!response.success) {
        throw new Error(response.error?.message || response.message || 'Registration failed');
      }

      // Backend returns `accessToken` — guard against old field name just in case
      const token = response.data.accessToken ?? response.data.token;
      if (!token) throw new Error('No access token received from server');
      await AsyncStorage.setItem('accessToken', token);

      const user: User = {
        id: response.data.user.id,
        name: response.data.user.name,
        email: response.data.user.email,
        role: response.data.user.role ?? 'CITIZEN',
        createdAt: response.data.user.createdAt ?? new Date().toISOString(),
        properties: [defaultProperty()],
        currentPropertyId: 'default_property',
      };

      await saveUserData(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.error('Registration failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  // ========== LOGIN ==========
  login: async (email, password) => {
    try {
      const response = await api.auth.login(email, password);

      if (!response.success) {
        throw new Error(response.error?.message || response.message || 'Login failed');
      }

      // Backend returns `accessToken` — guard against old field name just in case
      const token = response.data.accessToken ?? response.data.token;
      if (!token) throw new Error('No access token received from server');
      await AsyncStorage.setItem('accessToken', token);

      const backendUser = response.data.user;

      // Restore locally-saved data for this user if it exists (preserves survey/property state)
      const savedUserJson = await AsyncStorage.getItem(`user_${backendUser.id}`);
      let user: User;

      if (savedUserJson) {
        const savedUser: User = JSON.parse(savedUserJson);
        user = mergeBackendScalars(savedUser, backendUser);
        console.log('✅ Restored user data for:', user.name);
      } else {
        user = {
          id: backendUser.id,
          name: backendUser.name,
          email: backendUser.email,
          role: backendUser.role ?? 'CITIZEN',
          createdAt: backendUser.createdAt ?? new Date().toISOString(),
          properties: [defaultProperty()],
          currentPropertyId: 'default_property',
        };
        console.log('✅ Created new user data for:', user.name);
      }

      await saveUserData(user);
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error: any) {
      console.error('Login failed:', error);
      set({ isLoading: false });
      throw error;
    }
  },

  // ========== LOGOUT ==========
  logout: async () => {
    try {
      await api.auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Only remove the token — keep user_* data so survey/property state survives re-login
      await AsyncStorage.removeItem('accessToken');
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // ========== LOAD USER (on app start) ==========
  loadUser: async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      if (!token) {
        set({ user: null, isAuthenticated: false, isLoading: false });
        return;
      }

      try {
        const response = await api.auth.me();
        if (response.success) {
          const backendUser = response.data.user ?? response.data;
          const savedUserJson = await AsyncStorage.getItem(`user_${backendUser.id}`);

          let user: User;
          if (savedUserJson) {
            const savedUser: User = JSON.parse(savedUserJson);
            user = mergeBackendScalars(savedUser, backendUser);
          } else {
            user = {
              id: backendUser.id,
              name: backendUser.name,
              email: backendUser.email,
              role: backendUser.role ?? 'CITIZEN',
              createdAt: backendUser.createdAt ?? new Date().toISOString(),
              properties: [defaultProperty()],
              currentPropertyId: 'default_property',
            };
          }

          await saveUserData(user);
          set({ user, isAuthenticated: true, isLoading: false });
          return;
        }
      } catch {
        // Token invalid — clear it
        await AsyncStorage.removeItem('accessToken');
      }

      set({ user: null, isAuthenticated: false, isLoading: false });
    } catch {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  // ========== PROPERTY MANAGEMENT ==========

  addProperty: (data) => {
    const user = get().user;
    if (!user) return;
    const newProperty: Property = { ...data, id: `prop_${Date.now()}`, createdAt: new Date().toISOString() };
    const updatedUser: User = { ...user, properties: [...user.properties, newProperty], currentPropertyId: newProperty.id };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },

  switchProperty: (propertyId) => {
    const user = get().user;
    if (!user) return;
    const updatedUser = { ...user, currentPropertyId: propertyId };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },

  updateSubscriptionStatus: (propertyId, status) => {
    const user = get().user;
    if (!user) return;
    const updatedUser: User = {
      ...user,
      properties: user.properties.map((p) => p.id === propertyId ? { ...p, subscriptionStatus: status } : p),
    };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },

  saveSurveyData: (propertyId, surveyData) => {
    const user = get().user;
    if (!user) return;
    const updatedUser: User = {
      ...user,
      properties: user.properties.map((p) =>
        p.id === propertyId
          ? { ...p, surveyData, address: surveyData.address || p.address, subscriptionStatus: 'SURVEY_SUBMITTED' as SubscriptionStatus }
          : p
      ),
    };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },

  saveProposal: (propertyId, proposal) => {
    const user = get().user;
    if (!user) return;
    const updatedUser: User = {
      ...user,
      properties: user.properties.map((p) =>
        p.id === propertyId
          ? { ...p, proposedPlan: proposal, subscriptionStatus: 'PLAN_PROPOSED' as SubscriptionStatus }
          : p
      ),
    };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },

  updateInstallationProgress: (propertyId, progress) => {
    const user = get().user;
    if (!user) return;
    const updatedUser: User = {
      ...user,
      properties: user.properties.map((p) => {
        if (p.id !== propertyId) return p;
        const existing = p.installationProgress ?? defaultInstallationProgress();
        return { ...p, installationProgress: { ...existing, ...progress } };
      }),
    };
    saveUserData(updatedUser);
    set({ user: updatedUser });
  },
}));

// ========== SELECTOR ==========

export const useCurrentProperty = (): Property | null => {
  return useAuthStore((state) => {
    if (!state.user) return null;
    const { properties, currentPropertyId } = state.user;
    return properties.find((p) => p.id === currentPropertyId) ?? null;
  });
};