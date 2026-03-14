// app/(onboarding)/proposal.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCurrentProperty, useAuthStore } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function ProposalPage() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { updateSubscriptionStatus, saveProposal } = useAuthStore();
  const { addNotification } = useNotificationStore();
  const [selectedDuration, setSelectedDuration] = useState<12 | 24 | 36>(24);

  const proposal = currentProperty?.proposedPlan;

  useEffect(() => {
    // If no proposal, redirect back
    if (!proposal || !currentProperty) {
      Alert.alert('No Plan Found', 'Please complete the survey first.');
      router.replace('/(customer)/dashboard');
    }
  }, [proposal, currentProperty]);

  if (!proposal || !currentProperty) return null;

  // Calculate adjusted pricing based on duration
  const getAdjustedPricing = (duration: 12 | 24 | 36) => {
    const baseMonthly = proposal.monthlyFee;
    
    // Discounts: 12 months (0%), 24 months (5%), 36 months (10%)
    const discounts = { 12: 0, 24: 0.05, 36: 0.10 };
    const discount = discounts[duration];
    const adjustedMonthly = Math.floor(baseMonthly * (1 - discount));
    const totalAmount = adjustedMonthly * duration;
    const totalSavings = (proposal.estimatedSavings * duration) - totalAmount;

    return {
      monthlyFee: adjustedMonthly,
      totalAmount,
      totalSavings,
      discount: discount * 100,
    };
  };

  const pricing = getAdjustedPricing(selectedDuration);

  const handleAcceptPlan = () => {
    Alert.alert(
      'Confirm Subscription',
      `Accept ${selectedDuration}-month plan for ₹${pricing.monthlyFee.toLocaleString()}/month?\n\nTotal: ₹${pricing.totalAmount.toLocaleString()}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Accept & Pay',
          onPress: () => {
            // Save duration-adjusted pricing back to store so payment screen reads correct values
            saveProposal(currentProperty.id, {
              ...proposal,
              monthlyFee: pricing.monthlyFee,
              contractDuration: selectedDuration,
            });

            // Update subscription status to payment pending
            updateSubscriptionStatus(currentProperty.id, 'PAYMENT_PENDING');
            
            // Add notification
            addNotification({
              type: 'info',
              title: 'Plan Accepted!',
              message: 'Complete your payment to schedule installation.',
              read: false,
              dismissible: false,
              persistent: true,
              action: {
                label: 'Pay Now',
                route: '/(onboarding)/payment',
              },
            });

            // Navigate to payment
            router.push('/(onboarding)/payment');
          },
        },
      ]
    );
  };

  const handleDecline = () => {
    Alert.alert(
      'Modify Plan',
      'Would you like to retake the survey or speak with our team?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Retake Survey', 
          onPress: () => router.push('/(onboarding)/survey') 
        },
        { 
          text: 'Contact Support', 
          onPress: () => router.push('/(customer)/support') 
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>PERSONALIZED FOR YOU</Text>
          </View>
        </View>

        <Text style={styles.title}>Your Custom Solar Plan</Text>
        <Text style={styles.subtitle}>
          Designed specifically for your energy needs and property
        </Text>

        {/* Main Plan Card */}
        <View style={styles.planCard}>
          <LinearGradient
            colors={[colors.primary, colors.accentSecondary]}
            style={styles.planGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/* Solar Capacity */}
            <View style={styles.planHero}>
              <Text style={styles.planCapacity}>{proposal.solarCapacity} kW</Text>
              <Text style={styles.planCapacityLabel}>Solar System</Text>
            </View>

            {/* Key Metrics */}
            <View style={styles.metricsGrid}>
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>₹{pricing.monthlyFee.toLocaleString()}</Text>
                <Text style={styles.metricLabel}>per month</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>₹{proposal.estimatedSavings.toLocaleString()}</Text>
                <Text style={styles.metricLabel}>estimated savings</Text>
              </View>
              <View style={styles.metricDivider} />
              <View style={styles.metricItem}>
                <Text style={styles.metricValue}>{proposal.estimatedProduction.toLocaleString()}</Text>
                <Text style={styles.metricLabel}>kWh/month</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Contract Duration Selector */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Contract Duration</Text>
          <Text style={styles.sectionSubtitle}>
            Longer contracts offer better discounts
          </Text>

          <View style={styles.durationGrid}>
            {([12, 24, 36] as const).map((duration) => {
              const durationPricing = getAdjustedPricing(duration);
              const isSelected = selectedDuration === duration;

              return (
                <TouchableOpacity
                  key={duration}
                  style={[
                    styles.durationCard,
                    isSelected && styles.durationCardActive,
                  ]}
                  onPress={() => setSelectedDuration(duration)}
                  activeOpacity={0.7}
                >
                  {duration === 24 && (
                    <View style={styles.recommendedBadge}>
                      <Text style={styles.recommendedText}>RECOMMENDED</Text>
                    </View>
                  )}
                  
                  {durationPricing.discount > 0 && (
                    <View style={styles.discountBadge}>
                      <Text style={styles.discountText}>-{durationPricing.discount}%</Text>
                    </View>
                  )}

                  <Text style={[styles.durationMonths, isSelected && styles.durationMonthsActive]}>
                    {duration} months
                  </Text>
                  <Text style={[styles.durationYears, isSelected && styles.durationYearsActive]}>
                    {duration / 12} year{duration > 12 ? 's' : ''}
                  </Text>
                  <Text style={[styles.durationPrice, isSelected && styles.durationPriceActive]}>
                    ₹{durationPricing.monthlyFee.toLocaleString()}/mo
                  </Text>
                  <Text style={[styles.durationTotal, isSelected && styles.durationTotalActive]}>
                    Total: ₹{durationPricing.totalAmount.toLocaleString()}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* What's Included */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What's Included</Text>
          
          <View style={styles.includedGrid}>
            {proposal.whatsIncluded.map((item, index) => (
              <View key={index} style={styles.includedItem}>
                <View style={styles.checkIcon}>
                  <Text style={styles.checkIconText}>✓</Text>
                </View>
                <Text style={styles.includedText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Savings Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Savings Breakdown</Text>
          
          <View style={styles.savingsCard}>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Monthly Subscription</Text>
              <Text style={styles.savingsValue}>₹{pricing.monthlyFee.toLocaleString()}</Text>
            </View>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabel}>Estimated Monthly Savings</Text>
              <Text style={styles.savingsValueGreen}>₹{proposal.estimatedSavings.toLocaleString()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabelBold}>Net Benefit (per month)</Text>
              <Text style={styles.savingsValueBoldGreen}>
                ₹{(proposal.estimatedSavings - pricing.monthlyFee).toLocaleString()}
              </Text>
            </View>
            <View style={styles.savingsRow}>
              <Text style={styles.savingsLabelBold}>Total Savings ({selectedDuration} months)</Text>
              <Text style={styles.savingsValueBoldGreen}>
                ₹{pricing.totalSavings.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Payment Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          
          <View style={styles.paymentCard}>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Installation Fee</Text>
              <Text style={styles.paymentValue}>
                {proposal.installationFee === 0 ? 'FREE' : `₹${proposal.installationFee.toLocaleString()}`}
              </Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>Security Deposit (Refundable)</Text>
              <Text style={styles.paymentValue}>₹{proposal.securityDeposit.toLocaleString()}</Text>
            </View>
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabel}>First Month Payment</Text>
              <Text style={styles.paymentValue}>₹{pricing.monthlyFee.toLocaleString()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.paymentRow}>
              <Text style={styles.paymentLabelTotal}>Due Today</Text>
              <Text style={styles.paymentValueTotal}>
                ₹{(proposal.securityDeposit + pricing.monthlyFee).toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* Important Terms */}
        <View style={styles.termsBox}>
          <Text style={styles.termsTitle}>Important Terms</Text>
          <Text style={styles.termsText}>
            • Contract duration: {selectedDuration} months{'\n'}
            • No mid-contract cancellation{'\n'}
            • Monthly billing on the 1st of each month{'\n'}
            • Performance guarantee: 90% of estimated production{'\n'}
            • Maintenance included for contract period{'\n'}
            • Auto-renewal option at contract end
          </Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={styles.declineButton}
            onPress={handleDecline}
          >
            <Text style={styles.declineButtonText}>Modify Plan</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.acceptButton}
            onPress={handleAcceptPlan}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.acceptGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.acceptButtonText}>Accept & Pay</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Bottom Padding */}
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  headerBadge: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  headerBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  planCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  planGradient: {
    padding: spacing.lg,
  },
  planHero: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  planCapacity: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  planCapacityLabel: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primaryDark,
    opacity: 0.8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metricsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricItem: {
    flex: 1,
    alignItems: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.primaryDark,
    opacity: 0.3,
  },
  metricValue: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  metricLabel: {
    fontSize: typography.tiny,
    color: colors.primaryDark,
    opacity: 0.8,
    textAlign: 'center',
    marginTop: 2,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  sectionSubtitle: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  durationGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  durationCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  durationCardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -1,
    left: '50%',
    transform: [{ translateX: -40 }],
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderBottomLeftRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
  },
  recommendedText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  discountBadge: {
    position: 'absolute',
    top: spacing.xs,
    right: spacing.xs,
    backgroundColor: colors.success,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  durationMonths: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
  durationMonthsActive: {
    color: colors.primary,
  },
  durationYears: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  durationYearsActive: {
    color: colors.primary,
  },
  durationPrice: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  durationPriceActive: {
    color: colors.primary,
  },
  durationTotal: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
    marginTop: 2,
  },
  durationTotalActive: {
    color: colors.primary,
  },
  includedGrid: {
    gap: spacing.sm,
  },
  includedItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  checkIconText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  includedText: {
    flex: 1,
    fontSize: typography.small,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  savingsCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  savingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  savingsLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  savingsValue: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  savingsValueGreen: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.success,
  },
  savingsLabelBold: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  savingsValueBoldGreen: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  paymentCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  paymentLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  paymentValue: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  paymentLabelTotal: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  paymentValueTotal: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.primary,
  },
  termsBox: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  termsTitle: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  termsText: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  declineButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  declineButtonText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  acceptButton: {
    flex: 2,
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  acceptGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  acceptButtonText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});