// store/useNotificationStore.ts
import { create } from 'zustand';
import { SubscriptionStatus } from './useAuthStore';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  dismissible: boolean;
  persistent?: boolean;
  action?: {
    label: string;
    route: string;
  };
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;

  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (notificationId: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      read: false,
    };
    set(state => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + 1,
    }));
  },

  markAsRead: (notificationId) => {
    set(state => ({
      notifications: state.notifications.map(n =>
        n.id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));
  },

  markAllAsRead: () => {
    set(state => ({
      notifications: state.notifications.map(n => ({ ...n, read: true })),
      unreadCount: 0,
    }));
  },

  dismissNotification: (notificationId) => {
    set(state => {
      const notification = state.notifications.find(n => n.id === notificationId);
      const wasUnread = notification && !notification.read;
      return {
        notifications: state.notifications.filter(n => n.id !== notificationId),
        unreadCount: wasUnread ? Math.max(0, state.unreadCount - 1) : state.unreadCount,
      };
    });
  },

  clearAll: () => set({ notifications: [], unreadCount: 0 }),
}));

// ── Context notifications keyed by SubscriptionStatus ─────────────────────────
// Keys must exactly match the SubscriptionStatus union in useAuthStore

export function generateNotificationsForStatus(
  status: SubscriptionStatus
): Omit<Notification, 'id' | 'timestamp'>[] {
  const map: Partial<Record<SubscriptionStatus, Omit<Notification, 'id' | 'timestamp'>[]>> = {

    NONE: [
      {
        type: 'info',
        title: 'Welcome to EaaS Nexus!',
        message: 'Start your journey to clean energy. Complete the energy survey to get your personalised plan.',
        read: false,
        dismissible: true,
        persistent: true,
        action: { label: 'Start Survey', route: '/(onboarding)/survey' },
      },
    ],

    SURVEY_PENDING: [
      {
        type: 'warning',
        title: 'Complete Your Energy Survey',
        message: "You're almost there! Finish the survey to receive your customised energy solution.",
        read: false,
        dismissible: false,
        persistent: true,
        action: { label: 'Continue Survey', route: '/(onboarding)/survey' },
      },
    ],

    SURVEY_SUBMITTED: [
      {
        type: 'success',
        title: 'Survey Submitted ✓',
        message: 'Our team has received your details. An engineer will contact you within 24 hours to schedule a site visit.',
        read: false,
        dismissible: true,
        persistent: true,
        action: { label: 'View Status', route: '/(onboarding)/survey-submitted' },
      },
    ],

    // Matches SubscriptionStatus exactly — was incorrectly PROPOSAL_READY
    PLAN_PROPOSED: [
      {
        type: 'success',
        title: 'Your Energy Plan is Ready! 🎉',
        message: "We've designed a solution tailored to your property and energy needs. Review your plan and get started.",
        read: false,
        dismissible: false,
        persistent: true,
        action: { label: 'View Plan', route: '/(onboarding)/proposal' },
      },
    ],

    PAYMENT_PENDING: [
      {
        type: 'warning',
        title: 'Complete Your Payment',
        message: "You're one step away from cleaner energy! Complete the payment to schedule your installation.",
        read: false,
        dismissible: false,
        persistent: true,
        action: { label: 'Pay Now', route: '/(onboarding)/payment' },
      },
    ],

    PENDING_INSTALLATION: [
      {
        type: 'success',
        title: 'Payment Confirmed! 💳',
        message: 'Thank you! Your payment has been received successfully.',
        read: false,
        dismissible: true,
        persistent: false,
      },
      {
        type: 'info',
        title: 'Installation Scheduled',
        message: 'Our team will call you shortly to confirm a convenient installation time. Typical turnaround is 5–7 business days.',
        read: false,
        dismissible: false,
        persistent: true,
        action: { label: 'Track Progress', route: '/(installation)/progress' },
      },
    ],

    ACTIVE: [
      {
        type: 'success',
        title: 'Installation Complete! 🎉',
        message: 'Your system is live. You can now monitor energy production, savings, and usage from your dashboard.',
        read: false,
        dismissible: true,
        persistent: false,
        action: { label: 'Go to Dashboard', route: '/(customer)/dashboard' },
      },
    ],

    SUSPENDED: [
      {
        type: 'error',
        title: 'Account Suspended',
        message: 'Your account has been temporarily suspended. Please contact support to resolve this.',
        read: false,
        dismissible: false,
        persistent: true,
      },
    ],
  };

  return map[status] ?? [];
}