// app/(installation)/progress.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  Linking, Alert, RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore, useCurrentProperty } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

type InstallStep = 'engineerAssigned' | 'siteSurveyScheduled' | 'installationStarted' | 'systemActivated';

interface JourneyStep {
  id: string;
  title: string;
  description: string;
  icon: string;
  phase: 'pre' | 'install';
}

const JOURNEY_STEPS: JourneyStep[] = [
  { id: 'surveySubmitted',     title: 'Energy Survey Submitted',     description: 'Your energy requirements were recorded.',                   icon: '📋', phase: 'pre' },
  { id: 'engineerVisit',       title: 'Engineer Site Visit',          description: 'Our engineer assessed your property and measured the site.', icon: '🏠', phase: 'pre' },
  { id: 'proposalAccepted',    title: 'Proposal Accepted',            description: 'You reviewed and accepted your custom energy plan.',         icon: '✅', phase: 'pre' },
  { id: 'paymentConfirmed',    title: 'Payment Confirmed',            description: 'Your payment was successfully processed.',                   icon: '💳', phase: 'pre' },
  { id: 'engineerAssigned',    title: 'Engineer Assigned',            description: 'An installation expert has been assigned to your project.',  icon: '👷', phase: 'install' },
  { id: 'siteSurveyScheduled', title: 'Installation Date Confirmed',  description: 'Your installation date has been scheduled.',                 icon: '📅', phase: 'install' },
  { id: 'installationStarted', title: 'Installation In Progress',     description: 'Our team is installing your system at your property.',       icon: '🔧', phase: 'install' },
  { id: 'systemActivated',     title: 'System Activated',             description: 'Your system is live and generating clean energy.',           icon: '⚡', phase: 'install' },
];

const PRE_STEP_IDS = new Set(['surveySubmitted', 'engineerVisit', 'proposalAccepted', 'paymentConfirmed']);

export default function InstallationProgressScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { updateSubscriptionStatus, updateInstallationProgress } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [refreshing, setRefreshing] = useState(false);

  const ip = currentProperty?.installationProgress;
  const isComplete = ip?.systemActivated ?? false;

  const isStepDone = (step: JourneyStep): boolean => {
    if (PRE_STEP_IDS.has(step.id)) return true;
    if (!ip) return false;
    return !!ip[step.id as InstallStep];
  };

  const getStepStatus = (step: JourneyStep): 'completed' | 'current' | 'pending' => {
    if (isStepDone(step)) return 'completed';
    const firstIncomplete = JOURNEY_STEPS.find(s => !isStepDone(s));
    if (firstIncomplete?.id === step.id) return 'current';
    return 'pending';
  };

  const completedCount = JOURNEY_STEPS.filter(s => isStepDone(s)).length;
  const progressPct = (completedCount / JOURNEY_STEPS.length) * 100;
  const currentIdx = JOURNEY_STEPS.findIndex(s => getStepStatus(s) === 'current');

  const handleSimulateNextStep = () => {
    if (!currentProperty || !ip) return;

    if (!ip.engineerAssigned) {
      updateInstallationProgress(currentProperty.id, { engineerAssigned: true, engineerName: 'Rajesh Sharma', engineerPhone: '+91 98765 43210' });
      addNotification({ type: 'success', title: 'Engineer Assigned! 👷', message: 'Rajesh Sharma will handle your installation.', read: false, dismissible: true });
    } else if (!ip.siteSurveyScheduled) {
      const d = new Date(); d.setDate(d.getDate() + 3);
      const dateStr = d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
      updateInstallationProgress(currentProperty.id, { siteSurveyScheduled: true, siteSurveyDate: dateStr });
      addNotification({ type: 'info', title: 'Installation Date Confirmed 📅', message: `Your installation is scheduled for ${dateStr}.`, read: false, dismissible: true });
    } else if (!ip.installationStarted) {
      updateInstallationProgress(currentProperty.id, { installationStarted: true, installationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) });
      addNotification({ type: 'info', title: 'Installation Started! 🔧', message: 'Our team has begun setting up your system.', read: false, dismissible: true });
    } else if (!ip.systemActivated) {
      updateInstallationProgress(currentProperty.id, { systemActivated: true, activationDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) });
      updateSubscriptionStatus(currentProperty.id, 'ACTIVE');
      addNotification({ type: 'success', title: 'System Activated! 🎉', message: 'Your system is now live. Check your dashboard to monitor energy production.', read: false, dismissible: true, action: { label: 'Go to Dashboard', route: '/(customer)/dashboard' } });
      Alert.alert(
        'System is Live! 🎉',
        'Your system is now active and generating clean energy.',
        [{ text: 'Go to Dashboard', onPress: () => router.replace('/') }]
      );
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await new Promise(r => setTimeout(r, 1000));
    setRefreshing(false);
  };

  if (!ip || !currentProperty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No installation data found</Text>
          {/* Only show back if activated */}
          {isComplete && (
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.replace('/')}>
              <Text style={styles.ctaButtonText}>Go to Dashboard</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />}
      >
        {/* Header — back button ONLY shown after full activation */}
        <View style={styles.header}>
          {isComplete ? (
            <TouchableOpacity onPress={() => router.replace('/')} style={styles.backBtn}>
              <Text style={styles.backArrow}>←</Text>
              <Text style={styles.backText}>Dashboard</Text>
            </TouchableOpacity>
          ) : (
            // Placeholder to keep layout consistent
            <View style={styles.backBtn} />
          )}
          <View style={styles.headerTitles}>
            <Text style={styles.title}>Installation Progress</Text>
            <Text style={styles.subtitle}>Your full journey with EaaS Nexus</Text>
          </View>
        </View>

        {/* Progress card */}
        <View style={styles.progressCard}>
          <LinearGradient
            colors={isComplete ? [colors.primary, colors.accentSecondary] : [colors.primaryDark, colors.surface]}
            style={styles.progressGradient}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <Text style={styles.progressLabel}>Overall Progress</Text>
            <Text style={styles.progressPercentage}>{Math.round(progressPct)}%</Text>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: `${progressPct}%` }]} />
            </View>
            <Text style={styles.progressStatus}>
              {isComplete
                ? 'Installation Complete! 🎉'
                : currentIdx >= 0
                  ? `Step ${currentIdx + 1} of ${JOURNEY_STEPS.length}`
                  : ''}
            </Text>
          </LinearGradient>
        </View>

        {/* Go to dashboard CTA — only after activation */}
        {isComplete && (
          <TouchableOpacity style={styles.dashboardCta} onPress={() => router.replace('/')}>
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.dashboardCtaGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              <Text style={styles.dashboardCtaText}>🎉 Go to Dashboard →</Text>
            </LinearGradient>
          </TouchableOpacity>
        )}

        {/* Estimated completion */}
        {ip.estimatedCompletion && !isComplete && (
          <View style={styles.estimatedCard}>
            <Text style={styles.estimatedIcon}>📅</Text>
            <View>
              <Text style={styles.estimatedLabel}>Estimated Completion</Text>
              <Text style={styles.estimatedDate}>{ip.estimatedCompletion}</Text>
            </View>
          </View>
        )}

        {/* Engineer card */}
        {ip.engineerAssigned && (
          <View style={styles.engineerCard}>
            <View style={styles.engineerHeader}>
              <View style={styles.engineerAvatar}>
                <Text style={styles.engineerAvatarText}>{ip.engineerName?.charAt(0) ?? 'E'}</Text>
              </View>
              <View style={styles.engineerInfo}>
                <Text style={styles.engineerLabel}>Your Installation Engineer</Text>
                <Text style={styles.engineerName}>{ip.engineerName}</Text>
                <Text style={styles.engineerPhone}>{ip.engineerPhone}</Text>
              </View>
            </View>
            <View style={styles.engineerActions}>
              <TouchableOpacity style={styles.contactButton} onPress={() => {
                Alert.alert('Call Engineer', `Call ${ip.engineerName}?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Call', onPress: () => Linking.openURL(`tel:${ip.engineerPhone}`) },
                ]);
              }}>
                <Text style={styles.contactIcon}>📞</Text>
                <Text style={styles.contactText}>Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.contactButton} onPress={() => {
                const phone = ip.engineerPhone?.replace(/\D/g, '');
                Linking.openURL(`whatsapp://send?phone=${phone}`);
              }}>
                <Text style={styles.contactIcon}>💬</Text>
                <Text style={styles.contactText}>WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Journey timeline */}
        <View style={styles.timelineSection}>
          <Text style={styles.sectionTitle}>Your Journey</Text>
          {JOURNEY_STEPS.map((step, index) => {
            const status = getStepStatus(step);
            const isLast = index === JOURNEY_STEPS.length - 1;
            const showDivider = index > 0 && step.phase !== JOURNEY_STEPS[index - 1].phase;
            return (
              <React.Fragment key={step.id}>
                {showDivider && (
                  <View style={styles.phaseDivider}>
                    <View style={styles.phaseDividerLine} />
                    <Text style={styles.phaseDividerLabel}>Installation Phase</Text>
                    <View style={styles.phaseDividerLine} />
                  </View>
                )}
                <View style={styles.timelineItem}>
                  {!isLast && (
                    <View style={[styles.timelineLine, status === 'completed' && styles.timelineLineCompleted]} />
                  )}
                  <View style={[
                    styles.timelineNode,
                    status === 'completed' && styles.timelineNodeCompleted,
                    status === 'current' && styles.timelineNodeCurrent,
                  ]}>
                    {status === 'completed'
                      ? <Text style={styles.timelineNodeCheck}>✓</Text>
                      : status === 'current'
                        ? <View style={styles.timelineNodePulse} />
                        : <View style={styles.timelineNodeDot} />}
                  </View>
                  <View style={styles.timelineContent}>
                    <View style={[
                      styles.timelineCard,
                      status === 'current' && styles.timelineCardCurrent,
                      status === 'pending' && styles.timelineCardPending,
                    ]}>
                      <Text style={[styles.timelineIcon, status === 'pending' && styles.timelineIconPending]}>
                        {step.icon}
                      </Text>
                      <View style={styles.timelineTextContainer}>
                        <Text style={[
                          styles.timelineTitle,
                          status === 'current' && styles.timelineTitleCurrent,
                          status === 'pending' && styles.timelineTitlePending,
                        ]}>
                          {step.title}
                        </Text>
                        <Text style={[styles.timelineDescription, status === 'pending' && styles.timelineDescriptionPending]}>
                          {step.description}
                        </Text>
                        {step.id === 'siteSurveyScheduled' && ip.siteSurveyDate && (
                          <Text style={styles.timelineDate}>Scheduled: {ip.siteSurveyDate}</Text>
                        )}
                        {step.id === 'installationStarted' && ip.installationDate && (
                          <Text style={styles.timelineDate}>Started: {ip.installationDate}</Text>
                        )}
                        {step.id === 'systemActivated' && ip.activationDate && (
                          <Text style={styles.timelineDate}>Activated: {ip.activationDate}</Text>
                        )}
                      </View>
                      {status === 'completed' && <View style={styles.completedBadge}><Text style={styles.completedText}>Done</Text></View>}
                      {status === 'current' && <View style={styles.currentBadge}><Text style={styles.currentText}>Next</Text></View>}
                    </View>
                  </View>
                </View>
              </React.Fragment>
            );
          })}
        </View>

        {/* DEV tools */}
        {!isComplete && __DEV__ && (
          <View style={styles.devBox}>
            <Text style={styles.devLabel}>🛠 Dev Tools</Text>
            <TouchableOpacity style={styles.devButton} onPress={handleSimulateNextStep}>
              <Text style={styles.devButtonText}>⚡ Simulate: Next Installation Step</Text>
            </TouchableOpacity>
            <Text style={styles.devHint}>Replicates the service provider marking a step complete.</Text>
          </View>
        )}

        {/* Help */}
        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Need Help?</Text>
          <TouchableOpacity style={styles.helpCard} onPress={() => Linking.openURL('tel:18001234567')}>
            <Text style={styles.helpIcon}>📞</Text>
            <View style={styles.helpText}><Text style={styles.helpCardTitle}>Call Support</Text><Text style={styles.helpCardDesc}>1800-123-4567 (Toll Free)</Text></View>
            <Text style={styles.helpArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpCard} onPress={() => router.push('/(customer)/support')}>
            <Text style={styles.helpIcon}>💬</Text>
            <View style={styles.helpText}><Text style={styles.helpCardTitle}>Raise a Ticket</Text><Text style={styles.helpCardDesc}>Get help from our team</Text></View>
            <Text style={styles.helpArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  errorText: { fontSize: typography.h3, color: colors.textSecondary, marginBottom: spacing.lg },
  ctaButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  ctaButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primaryDark },

  header: { flexDirection: 'row', alignItems: 'flex-start', padding: spacing.md, gap: spacing.sm },
  backBtn: { paddingTop: 4, minWidth: 80 },
  backArrow: { fontSize: 18, color: colors.primary },
  backText: { fontSize: typography.small, color: colors.primary, fontWeight: '600' },
  headerTitles: { flex: 1 },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  subtitle: { fontSize: typography.small, color: colors.textSecondary },

  progressCard: { marginHorizontal: spacing.md, marginBottom: spacing.lg, borderRadius: borderRadius.lg, overflow: 'hidden', elevation: 5 },
  progressGradient: { padding: spacing.xl, alignItems: 'center' },
  progressLabel: { fontSize: typography.small, fontWeight: '600', color: '#fff', textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.xs },
  progressPercentage: { fontSize: 64, fontWeight: '700', color: '#fff', marginBottom: spacing.md },
  progressBarBg: { width: '100%', height: 8, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 4, overflow: 'hidden', marginBottom: spacing.sm },
  progressStatus: { fontSize: typography.small, color: '#fff', opacity: 0.9 },
  progressBarFill: { height: '100%', backgroundColor: '#fff', borderRadius: 4 },

  dashboardCta: { marginHorizontal: spacing.md, marginBottom: spacing.lg, borderRadius: borderRadius.lg, overflow: 'hidden' },
  dashboardCtaGradient: { padding: spacing.md, alignItems: 'center' },
  dashboardCtaText: { fontSize: typography.h4, fontWeight: '700', color: colors.primaryDark },

  estimatedCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: spacing.md, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg, gap: spacing.sm },
  estimatedIcon: { fontSize: 24 },
  estimatedLabel: { fontSize: typography.small, color: colors.textSecondary, marginBottom: 2 },
  estimatedDate: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },

  engineerCard: { backgroundColor: colors.surface, marginHorizontal: spacing.md, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  engineerHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  engineerAvatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md },
  engineerAvatarText: { fontSize: 24, fontWeight: '700', color: colors.primaryDark },
  engineerInfo: { flex: 1 },
  engineerLabel: { fontSize: typography.tiny, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  engineerName: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  engineerPhone: { fontSize: typography.small, color: colors.textSecondary },
  engineerActions: { flexDirection: 'row', gap: spacing.sm },
  contactButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primaryLight, padding: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.primary },
  contactIcon: { fontSize: 18, marginRight: spacing.xs },
  contactText: { fontSize: typography.small, fontWeight: '600', color: colors.primary },

  timelineSection: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  sectionTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.lg },
  phaseDivider: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.lg, gap: spacing.sm },
  phaseDividerLine: { flex: 1, height: 1, backgroundColor: colors.border },
  phaseDividerLabel: { fontSize: typography.tiny, fontWeight: '700', color: colors.textTertiary, textTransform: 'uppercase', letterSpacing: 1 },
  timelineItem: { position: 'relative', marginBottom: spacing.md },
  timelineLine: { position: 'absolute', left: 19, top: 40, width: 2, height: '100%', backgroundColor: colors.border },
  timelineLineCompleted: { backgroundColor: colors.primary },
  timelineNode: { position: 'absolute', left: 0, top: 0, width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', zIndex: 1 },
  timelineNodeCompleted: { backgroundColor: colors.primary, borderColor: colors.primary },
  timelineNodeCurrent: { backgroundColor: colors.primaryLight, borderColor: colors.primary, borderWidth: 3 },
  timelineNodeCheck: { fontSize: 18, color: colors.primaryDark, fontWeight: '700' },
  timelineNodePulse: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  timelineNodeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.border },
  timelineContent: { marginLeft: 56 },
  timelineCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  timelineCardCurrent: { borderColor: colors.primary, borderWidth: 2, backgroundColor: colors.primaryLight },
  timelineCardPending: { opacity: 0.45 },
  timelineIcon: { fontSize: 22, marginRight: spacing.sm, marginTop: 1 },
  timelineIconPending: { opacity: 0.4 },
  timelineTextContainer: { flex: 1 },
  timelineTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  timelineTitleCurrent: { color: colors.primary, fontWeight: '700' },
  timelineTitlePending: { color: colors.textTertiary },
  timelineDescription: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 18 },
  timelineDescriptionPending: { color: colors.textTertiary },
  timelineDate: { fontSize: typography.tiny, color: colors.primary, marginTop: 4, fontWeight: '600' },
  completedBadge: { backgroundColor: colors.success ?? colors.primary, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' },
  completedText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  currentBadge: { backgroundColor: colors.primary, paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4, alignSelf: 'flex-start' },
  currentText: { fontSize: 10, fontWeight: '700', color: colors.primaryDark },

  devBox: { marginHorizontal: spacing.md, marginBottom: spacing.lg, borderWidth: 1.5, borderColor: colors.warning, borderStyle: 'dashed', borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.sm },
  devLabel: { fontSize: typography.small, fontWeight: '700', color: colors.warning },
  devButton: { backgroundColor: colors.warning, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center' },
  devButtonText: { fontSize: typography.body, fontWeight: '700', color: '#fff' },
  devHint: { fontSize: typography.tiny, color: colors.textTertiary, lineHeight: 16 },

  helpSection: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  helpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  helpIcon: { fontSize: 24, marginRight: spacing.sm },
  helpText: { flex: 1 },
  helpCardTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  helpCardDesc: { fontSize: typography.small, color: colors.textSecondary },
  helpArrow: { fontSize: 20, color: colors.textTertiary },
});