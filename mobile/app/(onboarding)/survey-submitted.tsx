// app/(onboarding)/survey-submitted.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore, useCurrentProperty } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { generateProposal } from '../../mock/subscription';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';
import { useRouter } from 'expo-router';

const TIMELINE = [
  {
    label: 'Survey submitted',
    detail: 'Your energy requirements have been recorded.',
    done: true,
  },
  {
    label: 'Engineer site visit',
    detail: 'An engineer will contact you within 24 hours to schedule a visit.',
    done: false,
  },
  {
    label: 'Custom proposal generated',
    detail: "After the site visit we'll design an energy plan tailored to your property.",
    done: false,
  },
  {
    label: 'Review & payment',
    detail: 'Review the proposal, pick a contract duration, and complete payment.',
    done: false,
  },
  {
    label: 'Installation & activation',
    detail: 'Our team installs your system. You start saving from day one.',
    done: false,
  },
];

export default function SurveySubmittedScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { saveProposal } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [simulating, setSimulating] = useState(false);

  const handleGoHome = () => {
    router.replace('/');
  };

  // ── DEV ONLY: simulate engineer submitting proposal after site visit ────────
  const handleSimulateProposal = async () => {
    if (!currentProperty?.surveyData) {
      Alert.alert('No survey data', 'Cannot generate a proposal without survey data.');
      return;
    }
    setSimulating(true);
    try {
      const proposal = await generateProposal(currentProperty.surveyData);
      // saveProposal also sets subscriptionStatus → PLAN_PROPOSED
      saveProposal(currentProperty.id, proposal);

      addNotification({
        type: 'success',
        title: 'Your Energy Plan is Ready! 🎉',
        message: "We've designed a solution tailored to your energy needs. Review your plan and get started.",
        read: false,
        dismissible: false,
        persistent: true,
        action: { label: 'View Plan', route: '/(onboarding)/proposal' },
      });

      Alert.alert(
        '[DEV] Proposal Generated',
        'Status → PLAN_PROPOSED. Go back to home — the app will route you to the proposal screen.',
        [{ text: 'OK' }]
      );
    } catch {
      Alert.alert('Error', 'Failed to generate proposal.');
    } finally {
      setSimulating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>

        {/* ── Success banner ── */}
        <LinearGradient
          colors={[colors.primary, colors.accentSecondary]}
          style={styles.heroBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.heroIconWrap}>
            <Text style={styles.heroIcon}>✓</Text>
          </View>
          <Text style={styles.heroTitle}>Survey Submitted!</Text>
          <Text style={styles.heroSubtitle}>
            Thanks for completing the energy survey. Our team will review your details and be in touch shortly.
          </Text>
        </LinearGradient>

        {/* ── Timeline ── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What happens next?</Text>
          {TIMELINE.map((step, index) => {
            const isLast = index === TIMELINE.length - 1;
            return (
              <View key={step.label} style={styles.timelineRow}>
                {!isLast && (
                  <View style={[styles.timelineLine, step.done && styles.timelineLineDone]} />
                )}
                <View style={[styles.timelineNode, step.done && styles.timelineNodeDone]}>
                  <Text style={[styles.timelineNodeText, step.done && styles.timelineNodeTextDone]}>
                    {step.done ? '✓' : (index + 1).toString()}
                  </Text>
                </View>
                <View style={styles.timelineContent}>
                  <Text style={[styles.timelineLabel, step.done && styles.timelineLabelDone]}>
                    {step.label}
                  </Text>
                  <Text style={styles.timelineDetail}>{step.detail}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Contact expectation ── */}
        <View style={styles.contactCard}>
          <Text style={styles.contactCardIcon}>📞</Text>
          <View style={styles.contactCardText}>
            <Text style={styles.contactCardTitle}>Expect a call within 24 hours</Text>
            <Text style={styles.contactCardDesc}>
              Our engineer will call you at the number registered with your account to confirm a convenient site visit time.
            </Text>
          </View>
        </View>

        {/* ── Property info ── */}
        {currentProperty && currentProperty.surveyData && (
          <View style={styles.propertyCard}>
            <Text style={styles.propertyLabel}>Survey submitted for</Text>
            <Text style={styles.propertyName}>{currentProperty.name}</Text>
            <Text style={styles.propertyAddress}>
              {currentProperty.surveyData.address || currentProperty.address}
            </Text>
            <View style={styles.propertyDetails}>
              <View style={styles.propertyDetailRow}>
                <Text style={styles.propertyDetailLabel}>Type:</Text>
                <Text style={styles.propertyDetailValue}>
                  {currentProperty.surveyData.propertyType === 'residential' ? '🏠 Residential' : '🏢 Commercial'}
                </Text>
              </View>
              <View style={styles.propertyDetailRow}>
                <Text style={styles.propertyDetailLabel}>Monthly Bill:</Text>
                <Text style={styles.propertyDetailValue}>
                  ₹{currentProperty.surveyData.monthlyBill}
                </Text>
              </View>
              <View style={styles.propertyDetailRow}>
                <Text style={styles.propertyDetailLabel}>Services:</Text>
                <Text style={styles.propertyDetailValue}>
                  {(currentProperty.surveyData.energyServices ?? [])
                    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
                    .join(', ') || '—'}
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Inline support ── */}
        <View style={styles.supportCard}>
          <Text style={styles.supportTitle}>Need help?</Text>
          <Text style={styles.supportDesc}>
            Haven't heard from us within 24 hours? Reach out directly:
          </Text>
          <TouchableOpacity
            style={styles.supportRow}
            onPress={() => Linking.openURL('tel:18001234567')}
            activeOpacity={0.7}
          >
            <Text style={styles.supportRowIcon}>📞</Text>
            <View style={styles.supportRowText}>
              <Text style={styles.supportRowLabel}>Call us (Toll Free)</Text>
              <Text style={styles.supportRowValue}>1800-123-4567</Text>
            </View>
            <Text style={styles.supportRowArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.supportRow}
            onPress={() => Linking.openURL('mailto:support@eaasnexus.com')}
            activeOpacity={0.7}
          >
            <Text style={styles.supportRowIcon}>✉️</Text>
            <View style={styles.supportRowText}>
              <Text style={styles.supportRowLabel}>Email us</Text>
              <Text style={styles.supportRowValue}>support@eaasnexus.com</Text>
            </View>
            <Text style={styles.supportRowArrow}>→</Text>
          </TouchableOpacity>
        </View>

        {/* ── DEV simulation ── */}
        {__DEV__ && (
          <View style={styles.devBox}>
            <Text style={styles.devLabel}>🛠 Dev Tools</Text>
            <TouchableOpacity
              style={[styles.devButton, simulating && styles.devButtonDisabled]}
              onPress={handleSimulateProposal}
              disabled={simulating}
            >
              <Text style={styles.devButtonText}>
                {simulating ? 'Generating proposal…' : '⚡ Simulate: Engineer submitted proposal'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.devHint}>
              Sets status → PLAN_PROPOSED. Replicates what the backend does after the engineer's site visit. Tap "Back to Home" after.
            </Text>
          </View>
        )}

        {/* ── Back to Home ── */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={handleGoHome}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.primary, colors.accentSecondary]}
            style={styles.homeGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.homeButtonText}>← Back to Home</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md, gap: spacing.lg },

  heroBanner: { borderRadius: borderRadius.lg, padding: spacing.xl, alignItems: 'center' },
  heroIconWrap: {
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(0,0,0,0.15)',
    justifyContent: 'center', alignItems: 'center', marginBottom: spacing.md,
  },
  heroIcon: { fontSize: 32, color: colors.primaryDark, fontWeight: '700' },
  heroTitle: { fontSize: typography.h2, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.sm },
  heroSubtitle: { fontSize: typography.body, color: colors.primaryDark, textAlign: 'center', lineHeight: 22, opacity: 0.85 },

  section: {},
  sectionTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.lg },

  timelineRow: { flexDirection: 'row', position: 'relative', marginBottom: spacing.lg },
  timelineLine: { position: 'absolute', left: 19, top: 40, width: 2, bottom: -spacing.lg, backgroundColor: colors.border },
  timelineLineDone: { backgroundColor: colors.primary },
  timelineNode: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.surface, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginRight: spacing.md, flexShrink: 0 },
  timelineNodeDone: { backgroundColor: colors.primary, borderColor: colors.primary },
  timelineNodeText: { fontSize: typography.small, fontWeight: '700', color: colors.textTertiary },
  timelineNodeTextDone: { color: colors.primaryDark },
  timelineContent: { flex: 1, paddingTop: 8 },
  timelineLabel: { fontSize: typography.body, fontWeight: '600', color: colors.textSecondary, marginBottom: 2 },
  timelineLabelDone: { color: colors.primary },
  timelineDetail: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 18 },

  contactCard: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, gap: spacing.sm },
  contactCardIcon: { fontSize: 28, marginTop: 2 },
  contactCardText: { flex: 1 },
  contactCardTitle: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  contactCardDesc: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 18 },

  propertyCard: { backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  propertyLabel: { fontSize: typography.tiny, color: colors.textTertiary, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  propertyName: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  propertyAddress: { fontSize: typography.small, color: colors.textSecondary },
  propertyDetails: { marginTop: spacing.sm, gap: spacing.xs },
  propertyDetailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  propertyDetailLabel: { fontSize: typography.small, color: colors.textSecondary },
  propertyDetailValue: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary, flexShrink: 1, textAlign: 'right', marginLeft: spacing.sm },

  supportCard: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  supportTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  supportDesc: { fontSize: typography.small, color: colors.textSecondary, marginBottom: spacing.md, lineHeight: 18 },
  supportRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border },
  supportRowIcon: { fontSize: 22, marginRight: spacing.sm },
  supportRowText: { flex: 1 },
  supportRowLabel: { fontSize: typography.small, color: colors.textSecondary },
  supportRowValue: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary },
  supportRowArrow: { fontSize: 18, color: colors.textTertiary },

  devBox: { borderWidth: 1.5, borderColor: colors.warning, borderStyle: 'dashed', borderRadius: borderRadius.md, padding: spacing.md, gap: spacing.sm },
  devLabel: { fontSize: typography.small, fontWeight: '700', color: colors.warning },
  devButton: { backgroundColor: colors.warning, borderRadius: borderRadius.md, padding: spacing.md, alignItems: 'center' },
  devButtonDisabled: { opacity: 0.5 },
  devButtonText: { fontSize: typography.body, fontWeight: '700', color: '#fff' },
  devHint: { fontSize: typography.tiny, color: colors.textTertiary, lineHeight: 16 },

  homeButton: { borderRadius: borderRadius.lg, overflow: 'hidden', marginTop: spacing.md },
  homeGradient: { padding: spacing.md, alignItems: 'center' },
  homeButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primaryDark },
});