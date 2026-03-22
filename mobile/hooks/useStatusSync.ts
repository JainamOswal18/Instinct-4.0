// hooks/useStatusSync.ts
import { useEffect, useRef, useCallback } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useAuthStore, useCurrentProperty, SubscriptionStatus } from '../store/useAuthStore';

// ── States that require active polling ───────────────────────────────────────
// These are "waiting for provider action" states.

/** Just needs subscriptionStatus to change — provider generates proposal */
const STATUS_POLLING_STATES: SubscriptionStatus[] = [
  'SURVEY_SUBMITTED',   // waiting for engineer site visit + proposal
  'PLAN_PROPOSED',      // waiting for payment to propagate from backend
];

/** Needs both subscriptionStatus AND installation steps — provider marks each step */
const INSTALLATION_POLLING_STATES: SubscriptionStatus[] = [
  'PENDING_INSTALLATION',
];

const POLL_INTERVAL_MS = 30_000;       // 30s — respectful cadence
const FOREGROUND_RECHECK_MS = 5_000;  // brief delay after app resumes

/**
 * Polls the backend while the user is in a "waiting for provider" state.
 *
 * - In SURVEY_SUBMITTED / PLAN_PROPOSED: polls /user/properties for status change.
 *   When provider generates proposal → status becomes PLAN_PROPOSED → index.tsx routes.
 *
 * - In PENDING_INSTALLATION: polls BOTH /user/properties (for ACTIVE status)
 *   AND /installation/progress/:id (for individual step flags).
 *   When provider marks engineerAssigned / siteSurveyScheduled / installationStarted /
 *   systemActivated, those appear on progress.tsx automatically.
 *
 * Also syncs immediately when the app comes back to the foreground.
 */
export function useStatusSync() {
  const { syncProperties, syncInstallationProgress } = useAuthStore();
  const currentProperty = useCurrentProperty();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const isSyncingRef = useRef(false);

  const status = currentProperty?.subscriptionStatus;
  const propertyId = currentProperty?.id ?? '';

  const needsStatusPoll = status
    ? STATUS_POLLING_STATES.includes(status) || INSTALLATION_POLLING_STATES.includes(status)
    : false;

  const needsInstallationPoll = status
    ? INSTALLATION_POLLING_STATES.includes(status)
    : false;

  const sync = useCallback(async () => {
    if (isSyncingRef.current) return;
    isSyncingRef.current = true;
    try {
      // Always fetch properties to catch subscriptionStatus changes
      await syncProperties();

      // Additionally fetch installation steps when in installation phase
      if (needsInstallationPoll && propertyId) {
        await syncInstallationProgress(propertyId);
      }
    } finally {
      isSyncingRef.current = false;
    }
  }, [syncProperties, syncInstallationProgress, needsInstallationPoll, propertyId]);

  // ── Interval polling ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!needsStatusPoll) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Sync immediately on mount
    sync();

    intervalRef.current = setInterval(sync, POLL_INTERVAL_MS);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [needsStatusPoll, sync]);

  // ── App foreground re-sync ────────────────────────────────────────────────
  useEffect(() => {
    if (!needsStatusPoll) return;

    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      const wasBackground =
        appStateRef.current === 'background' || appStateRef.current === 'inactive';
      const isNowActive = nextState === 'active';

      if (wasBackground && isNowActive) {
        setTimeout(sync, FOREGROUND_RECHECK_MS);
      }

      appStateRef.current = nextState;
    });

    return () => subscription.remove();
  }, [needsStatusPoll, sync]);
}

/**
 * Lightweight version — syncs once on mount without continuous polling.
 * Use on screens that should be fresh but don't need live updates
 * (e.g. dashboard on first load after a long gap).
 */
export function useSyncOnMount() {
  const { syncProperties } = useAuthStore();

  useEffect(() => {
    syncProperties().catch(() => {
      // Non-critical — UI still works with cached data
    });
  }, []);
}