// mock/notifications.ts
import { SubscriptionStatus } from '../store/useAuthStore';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    route: string;
  };
}

/**
 * Get notifications based on subscription status
 */
export function getNotificationsForStatus(status: SubscriptionStatus): Notification[] {
  const notifications: Record<SubscriptionStatus, Notification[]> = {
    NONE: [
      {
        id: 'notif_welcome',
        type: 'info',
        title: 'Welcome to EaaS Nexus!',
        message: 'Start your journey to clean energy. Complete the energy survey to get started.',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'Start Survey',
          route: '/(onboarding)/survey',
        },
      },
    ],
    
    SURVEY_PENDING: [
      {
        id: 'notif_survey_reminder',
        type: 'warning',
        title: 'Complete Your Survey',
        message: 'You\'re almost there! Finish the energy survey to receive your personalized plan.',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'Continue Survey',
          route: '/(onboarding)/survey',
        },
      },
    ],
    
    SURVEY_SUBMITTED: [
      {
        id: 'notif_survey_submitted',
        type: 'success',
        title: 'Survey Submitted Successfully!',
        message: 'We\'re analyzing your energy needs. Your personalized plan will be ready shortly.',
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 'notif_plan_generating',
        type: 'info',
        title: 'Generating Your Plan',
        message: 'Our AI is calculating the optimal solar solution for your property...',
        timestamp: new Date().toISOString(),
        read: false,
      },
    ],
    
    PLAN_PROPOSED: [
      {
        id: 'notif_plan_ready',
        type: 'success',
        title: 'Your Custom Plan is Ready! 🎉',
        message: 'We\'ve designed a solar solution tailored to your needs. Review it now!',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'View Plan',
          route: '/(onboarding)/proposal',
        },
      },
    ],
    
    PAYMENT_PENDING: [
      {
        id: 'notif_payment_pending',
        type: 'warning',
        title: 'Complete Your Payment',
        message: 'You\'re one step away! Complete the payment to schedule your installation.',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'Pay Now',
          route: '/(onboarding)/payment',
        },
      },
    ],
    
    PENDING_INSTALLATION: [
      {
        id: 'notif_payment_success',
        type: 'success',
        title: 'Payment Successful! 💳',
        message: 'Your payment has been confirmed. Our engineer will contact you within 24 hours.',
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: 'notif_engineer_contact',
        type: 'info',
        title: 'Engineer Will Contact You Soon',
        message: 'Expect a call from our installation team to schedule your site survey.',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'View Progress',
          route: '/(installation)/progress',
        },
      },
    ],
    
    ACTIVE: [
      {
        id: 'notif_system_live',
        type: 'success',
        title: 'Your Solar System is Now LIVE! 🌞',
        message: 'Congratulations! Start monitoring your energy production and savings.',
        timestamp: new Date().toISOString(),
        read: false,
        action: {
          label: 'View Dashboard',
          route: '/(customer)/dashboard',
        },
      },
    ],
  };

  return notifications[status] || [];
}

/**
 * Get all notifications for current user
 */
export function getAllNotifications(status: SubscriptionStatus): Notification[] {
  // In real app, fetch from API
  return getNotificationsForStatus(status);
}