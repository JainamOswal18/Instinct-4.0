// mock/installation.ts
import { InstallationProgress } from '../store/useAuthStore';

/**
 * Returns mock installation progress for a given subscription status.
 * In production this comes from the backend — the service provider marks
 * steps complete on the web dashboard and it reflects here via API polling
 * or websocket push.
 */
export function getInstallationProgress(status: string): InstallationProgress {
  const baseProgress: InstallationProgress = {
    paymentConfirmed: true,
    engineerAssigned: false,
    siteSurveyScheduled: false,
    installationStarted: false,
    systemActivated: false,
  };

  if (status === 'PENDING_INSTALLATION') {
    return {
      ...baseProgress,
      engineerAssigned: true,
      engineerName: 'Rajesh Sharma',
      engineerPhone: '+91 98765 43210',
      siteSurveyScheduled: false,
      estimatedCompletion: getDateAfterDays(14),
    };
  }

  return baseProgress;
}

/**
 * Simulate the service provider marking an installation step as complete
 * on their web dashboard. In production this is a backend PATCH — the
 * result is pushed to the consumer app via webhook/polling.
 */
export async function updateInstallationStep(
  currentProgress: InstallationProgress,
  step: keyof InstallationProgress
): Promise<InstallationProgress> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { ...currentProgress, [step]: true };
}

/**
 * DEV ONLY: Simulate the full installation being marked complete by the
 * service provider. Sets systemActivated = true which triggers the app
 * to transition status → ACTIVE.
 */
export async function simulateInstallationComplete(
  currentProgress: InstallationProgress
): Promise<InstallationProgress> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    ...currentProgress,
    engineerAssigned: true,
    engineerName: currentProgress.engineerName ?? 'Rajesh Sharma',
    engineerPhone: currentProgress.engineerPhone ?? '+91 98765 43210',
    siteSurveyScheduled: true,
    siteSurveyDate: getDateAfterDays(-5),
    installationStarted: true,
    installationDate: getDateAfterDays(-2),
    systemActivated: true,
    activationDate: new Date().toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    }),
  };
}

function getDateAfterDays(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}