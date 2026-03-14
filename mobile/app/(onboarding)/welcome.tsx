// app/(onboarding)/welcome.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* ── Hero ── */}
        <View style={styles.hero}>
          <Text style={styles.heroIcon}>⚡</Text>
          <Text style={styles.heroTitle}>Welcome to{'\n'}EaaS Nexus</Text>
          <Text style={styles.heroSubtitle}>
            Energy as a Service — clean, affordable energy solutions tailored to your property.
          </Text>
        </View>

        {/* ── Services ── */}
        <View style={styles.features}>
          {[
            { icon: '☀️', text: 'Solar energy — reduce electricity bills by up to 50%' },
            { icon: '🔋', text: 'Battery storage — store and use energy on your terms' },
            { icon: '💡', text: 'Smart lighting — efficient lighting for every space' },
            { icon: '❄️', text: 'Cooling solutions — energy-efficient climate control' },
          ].map(({ icon, text }) => (
            <View key={text} style={styles.featureItem}>
              <Text style={styles.featureIcon}>{icon}</Text>
              <Text style={styles.featureText}>{text}</Text>
            </View>
          ))}
        </View>

        {/* ── How it works ── */}
        <View style={styles.stepsSection}>
          <Text style={styles.stepsTitle}>How it works</Text>
          {[
            { step: '1', label: 'Tell us about your energy needs' },
            { step: '2', label: 'Engineer visits & designs your plan' },
            { step: '3', label: 'Review proposal & pay' },
            { step: '4', label: 'We install — you start saving' },
          ].map(({ step, label }) => (
            <View key={step} style={styles.stepItem}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>{step}</Text>
              </View>
              <Text style={styles.stepLabel}>{label}</Text>
            </View>
          ))}
        </View>

        {/* ── CTA ── */}
        <View style={styles.ctaSection}>
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => router.push('/(onboarding)/survey')}
            activeOpacity={0.85}
          >
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.ctaGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.ctaText}>Get Started</Text>
              <Text style={styles.ctaSubtext}>Complete energy survey • ~2 minutes</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>
            No credit card required • Free consultation
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },

  // ── Hero ─────────────────────────────────────────────────────────────────────
  hero: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  heroIcon: {
    fontSize: 72,
    marginBottom: spacing.md,
  },
  heroTitle: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.sm,
    lineHeight: 40,
  },
  heroSubtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },

  // ── Features ─────────────────────────────────────────────────────────────────
  features: {
    gap: spacing.sm,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  featureIcon: {
    fontSize: 22,
    marginRight: spacing.sm,
  },
  featureText: {
    flex: 1,
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },

  // ── Steps ────────────────────────────────────────────────────────────────────
  stepsSection: {
    gap: spacing.sm,
  },
  stepsTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    borderWidth: 1.5,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepNumber: {
    fontSize: typography.small,
    fontWeight: '700',
    color: colors.primary,
  },
  stepLabel: {
    fontSize: typography.body,
    color: colors.textSecondary,
    flex: 1,
  },

  // ── CTA ──────────────────────────────────────────────────────────────────────
  ctaSection: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  ctaButton: {
    width: '100%',
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  ctaGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 4,
  },
  ctaSubtext: {
    fontSize: typography.small,
    color: colors.primaryDark,
    opacity: 0.8,
  },
  disclaimer: {
    fontSize: typography.small,
    color: colors.textTertiary,
    textAlign: 'center',
  },
});