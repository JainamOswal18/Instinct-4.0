// store/useAuthStore.ts
import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import apiWrapper from '../services/apiWrapper';

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

const saveUserData = (user: User): Promise<void> =>
  AsyncStorage.setItem(`user_${user.id}`, JSON.stringify(user));

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

  // ⭐ Polling helpers — called by useStatusSync every 30s
  syncProperties: () => Promise<void>;
  syncInstallationProgress: (propertyId: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  // ========== REGISTER ==========
  register: async (name, email, password, phone) => {
    try {
      const response = await api.auth.register(name, email, password, phone, 'CITIZEN');

      if (!response.success) {
        throw new Error(response.error?.message || response.message || 'Registration failed');
      }

      const token = response.data.accessToken ?? response.data.token;
      if (!token) throw new Error('No access token received from server');
      await AsyncStorage.setItem('accessToken', token);

      const backendUser = response.data.user;

      let properties: Property[] = [];
      let currentPropertyId: string | null = null;
      try {
        const propsRes = await api.user.getProperties();
        if (propsRes?.success && propsRes.data?.properties?.length) {
          properties = propsRes.data.properties.map((p: any) => ({
            id: p.id,
            name: p.name,
            address: p.address,
            type: p.type,
            subscriptionStatus: (p.subscriptionStatus ?? 'NONE') as SubscriptionStatus,
            createdAt: p.createdAt,
          }));
          currentPropertyId = properties[0].id;
        }
      } catch {
        // No properties yet — fine for new user
      }

      if (!properties.length) {
        try {
          const addRes = await api.user.addProperty('My Property', '', 'residential');
          if (addRes?.success && addRes.data) {
            const p = addRes.data;
            properties = [{
              id: p.propertyId ?? p.id,
              name: p.name ?? 'My Property',
              address: p.address ?? '',
              type: p.type ?? 'residential',
              subscriptionStatus: 'NONE',
              createdAt: p.createdAt ?? new Date().toISOString(),
            }];
            currentPropertyId = properties[0].id;
          }
        } catch {
          properties = [defaultProperty()];
          currentPropertyId = 'default_property';
        }
      }

      const user: User = {
        id: backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role ?? 'CITIZEN',
        createdAt: backendUser.createdAt ?? new Date().toISOString(),
        properties,
        currentPropertyId,
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

      const token = response.data.accessToken ?? response.data.token;
      if (!token) throw new Error('No access token received from server');
      await AsyncStorage.setItem('accessToken', token);

      const backendUser = response.data.user;

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

      try {
        const propsRes = await api.user.getProperties();
        if (propsRes?.success && propsRes.data?.properties?.length) {
          const backendProps: any[] = propsRes.data.properties;
          const mergedProperties: Property[] = backendProps.map((bp: any) => {
            const local = user.properties.find(lp => lp.id === bp.id);
            return {
              id: bp.id,
              name: bp.name,
              address: bp.address,
              type: bp.type,
              subscriptionStatus: (bp.subscriptionStatus ?? 'NONE') as SubscriptionStatus,
              createdAt: bp.createdAt,
              surveyData: local?.surveyData,
              proposedPlan: local?.proposedPlan,
              installationProgress: local?.installationProgress,
            };
          });

          const localDefault = user.properties.find(p => p.id === 'default_property');
          if (localDefault?.surveyData && mergedProperties.length > 0 && !mergedProperties[0].surveyData) {
            mergedProperties[0] = { ...mergedProperties[0], surveyData: localDefault.surveyData };
          }

          const currentId = mergedProperties.find(p => p.id === user.currentPropertyId)
            ? user.currentPropertyId
            : mergedProperties[0].id;

          user = { ...user, properties: mergedProperties, currentPropertyId: currentId };
        }
      } catch (e) {
        console.warn('[login] Could not fetch backend properties:', e);
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

          try {
            const propsRes = await api.user.getProperties();
            if (propsRes?.success && propsRes.data?.properties?.length) {
              const backendProps: any[] = propsRes.data.properties;
              const mergedProperties: Property[] = backendProps.map((bp: any) => {
                const local = user.properties.find(lp => lp.id === bp.id);
                const localDefault = user.properties.find(lp => lp.id === 'default_property');
                return {
                  id: bp.id,
                  name: bp.name,
                  address: bp.address,
                  type: bp.type,
                  subscriptionStatus: (bp.subscriptionStatus ?? 'NONE') as SubscriptionStatus,
                  createdAt: bp.createdAt,
                  surveyData: local?.surveyData ?? (backendProps.length === 1 ? localDefault?.surveyData : undefined),
                  proposedPlan: local?.proposedPlan ?? (backendProps.length === 1 ? localDefault?.proposedPlan : undefined),
                  installationProgress: local?.installationProgress ?? (backendProps.length === 1 ? localDefault?.installationProgress : undefined),
                };
              });
              const currentId = mergedProperties.find(p => p.id === user.currentPropertyId)
                ? user.currentPropertyId
                : mergedProperties[0].id;
              user = { ...user, properties: mergedProperties, currentPropertyId: currentId };
            }
          } catch {
            // Non-critical — use cached properties
          }

          await saveUserData(user);
          set({ user, isAuthenticated: true, isLoading: false });
          return;
        }
      } catch {
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

  // ── SYNC PROPERTIES (called by useStatusSync every 30s) ──────────────────
  syncProperties: async () => {
    const user = get().user;
    if (!user) return;

    try {
      const response = await apiWrapper.user.getProperties();
      if (!response?.success) return;

      const backendProps: any[] = response.data?.properties ?? [];
      if (!backendProps.length) return;

      let changed = false;

      const hasOnlyDefault = user.properties.length === 1 && user.properties[0].id === 'default_property';
      if (hasOnlyDefault) {
        const localDefault = user.properties[0];
        const mergedProperties: Property[] = backendProps.map((bp: any) => ({
          id: bp.id,
          name: bp.name,
          address: bp.address,
          type: bp.type,
          subscriptionStatus: (bp.subscriptionStatus ?? 'NONE') as SubscriptionStatus,
          createdAt: bp.createdAt,
          surveyData: localDefault.surveyData,
          proposedPlan: localDefault.proposedPlan,
          installationProgress: localDefault.installationProgress,
        }));
        const updatedUser = { ...user, properties: mergedProperties, currentPropertyId: mergedProperties[0].id };
        await saveUserData(updatedUser);
        set({ user: updatedUser });
        return;
      }

      const updatedProperties = user.properties.map((localProp) => {
        const remote = backendProps.find((bp: any) => bp.id === localProp.id);
        if (!remote) return localProp;

        const remoteStatus = remote.subscriptionStatus as SubscriptionStatus;
        if (remoteStatus === localProp.subscriptionStatus) return localProp;

        changed = true;
        console.log(`[syncProperties] ${localProp.id}: ${localProp.subscriptionStatus} → ${remoteStatus}`);
        return { ...localProp, subscriptionStatus: remoteStatus };
      });

      if (!changed) return;

      const updatedUser = { ...user, properties: updatedProperties };
      await saveUserData(updatedUser);
      set({ user: updatedUser });

      for (const prop of updatedProperties) {
        if (prop.subscriptionStatus === 'PLAN_PROPOSED' && !prop.proposedPlan) {
          try {
            const proposalRes = await api.subscription.getProposalByProperty(prop.id);
            if (proposalRes?.success && proposalRes.data) {
              const d = proposalRes.data;
              const proposal: ProposedPlan = {
                id: d.proposalId ?? prop.id,
                solarCapacity: d.solarCapacity,
                batteryStorage: d.batteryStorage,
                monthlyFee: d.monthlyFee,
                estimatedSavings: d.estimatedSavings,
                estimatedProduction: d.estimatedProduction,
                contractDuration: d.contractDuration,
                installationFee: d.installationFee,
                securityDeposit: d.securityDeposit,
                whatsIncluded: d.whatsIncluded,
                generatedAt: d.generatedAt,
              };
              const withProposal = {
                ...updatedUser,
                properties: updatedProperties.map(p =>
                  p.id === prop.id ? { ...p, proposedPlan: proposal } : p
                ),
              };
              await saveUserData(withProposal);
              set({ user: withProposal });
            }
          } catch (e) {
            console.warn('[syncProperties] Could not fetch proposal for', prop.id, e);
          }
        }
      }
    } catch (e) {
      console.warn('[syncProperties] Failed:', e);
    }
  },

  // ── SYNC INSTALLATION PROGRESS (called by useStatusSync in PENDING_INSTALLATION) ──
  syncInstallationProgress: async (propertyId: string) => {
    const user = get().user;
    if (!user) return;

    try {
      const response = await apiWrapper.installation.getProgress(propertyId);
      if (!response?.success) return;

      const raw = response.data?.progress ?? response.data;
      if (!raw) return;

      const r = raw as any;
      const progress: Partial<InstallationProgress> = {
        paymentConfirmed:    r.paymentConfirmed    ?? r.payment_confirmed    ?? undefined,
        engineerAssigned:    r.engineerAssigned    ?? r.engineer_assigned    ?? undefined,
        engineerName:        r.engineerName        ?? r.engineer_name        ?? undefined,
        engineerPhone:       r.engineerPhone       ?? r.engineer_phone       ?? undefined,
        siteSurveyScheduled: r.siteSurveyScheduled ?? r.site_survey_scheduled ?? undefined,
        siteSurveyDate:      r.siteSurveyDate      ?? r.site_survey_date     ?? undefined,
        installationStarted: r.installationStarted ?? r.installation_started ?? undefined,
        installationDate:    r.installationDate    ?? r.installation_date    ?? undefined,
        systemActivated:     r.systemActivated     ?? r.system_activated     ?? undefined,
        activationDate:      r.activationDate      ?? r.activation_date      ?? undefined,
        estimatedCompletion: r.estimatedCompletion ?? r.estimated_completion ?? undefined,
      };

      const clean = Object.fromEntries(
        Object.entries(progress).filter(([, v]) => v !== undefined)
      ) as Partial<InstallationProgress>;

      const updatedUser: User = {
        ...user,
        properties: user.properties.map((p) => {
          if (p.id !== propertyId) return p;
          const existing = p.installationProgress ?? defaultInstallationProgress();
          return { ...p, installationProgress: { ...existing, ...clean } };
        }),
      };
      await saveUserData(updatedUser);
      set({ user: updatedUser });

      if (clean.systemActivated) {
        const withActive: User = {
          ...updatedUser,
          properties: updatedUser.properties.map((p) =>
            p.id === propertyId ? { ...p, subscriptionStatus: 'ACTIVE' as SubscriptionStatus } : p
          ),
        };
        await saveUserData(withActive);
        set({ user: withActive });
      }
    } catch (e) {
      console.warn('[syncInstallationProgress] Failed:', e);
    }
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
