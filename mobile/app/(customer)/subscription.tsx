// app/(customer)/subscription.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../store/useAuthStore';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

interface Plan {
  id: string;
  name: string;
  price: number;
  period: 'month';
  features: string[];
  popular?: boolean;
  savings: string;
}

export default function Subscription() {
  const router = useRouter();
  const user = useAuthStore(state => state.user);
  const currentPlan = user?.planType || 'basic';

  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 1500,
      period: 'month',
      savings: '₹1,100/month vs grid',
      features: [
        'Solar monitoring',
        'Basic reports',
        'Email support',
        'Mobile app access',
        '5 kW solar capacity',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 3500,
      period: 'month',
      popular: true,
      savings: '₹1,800/month vs grid',
      features: [
        'Everything in Basic',
        'AI-powered recommendations',
        'Battery storage (5 kWh)',
        'Priority support',
        'Advanced analytics',
        '10 kW solar capacity',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 5999,
      period: 'month',
      savings: '₹2,500/month vs grid',
      features: [
        'Everything in Premium',
        'Battery storage (10 kWh)',
        '24/7 phone support',
        'Custom reports',
        'API access',
        '15 kW solar capacity',
      ],
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 12000,
      period: 'month',
      savings: '₹5,000/month vs grid',
      features: [
        'Everything in Pro',
        'Dedicated account manager',
        'Custom integration',
        'SLA guarantee',
        'Unlimited capacity',
        'DISCOM coordination',
      ],
    },
  ];

  const handleSubscribe = (planId: string, planName: string) => {
    if (planId === currentPlan) {
      Alert.alert('Current Plan', `You're already on the ${planName} plan.`);
      return;
    }

    Alert.alert(
      'Upgrade Plan',
      `Switch to ${planName} plan for ₹${plans.find(p => p.id === planId)?.price}/month?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Subscribe',
          onPress: () => {
            Alert.alert('Success', 'Plan upgrade successful! Changes will take effect next billing cycle.');
          },
        },
      ]
    );
  };

  const renderPlan = (plan: Plan) => {
    const isCurrentPlan = plan.id === currentPlan;
    
    return (
      <View key={plan.id} style={[styles.planCard, isCurrentPlan && styles.planCardCurrent]}>
        {plan.popular && (
          <View style={styles.popularBadge}>
            <Text style={styles.popularText}>MOST POPULAR</Text>
          </View>
        )}
        
        <Text style={styles.planName}>{plan.name}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.currency}>₹</Text>
          <Text style={styles.price}>{plan.price.toLocaleString()}</Text>
          <Text style={styles.period}>/{plan.period}</Text>
        </View>

        <View style={styles.savingsTag}>
          <Text style={styles.savingsText}>{plan.savings}</Text>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <Text style={styles.featureCheck}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.subscribeButton,
            isCurrentPlan && styles.subscribeButtonCurrent,
          ]}
          onPress={() => handleSubscribe(plan.id, plan.name)}
          disabled={isCurrentPlan}
        >
          {isCurrentPlan ? (
            <Text style={styles.subscribeButtonTextCurrent}>Current Plan</Text>
          ) : (
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.subscribeGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.subscribeButtonText}>
                {plan.id === 'basic' ? 'Downgrade' : 'Upgrade'}
              </Text>
            </LinearGradient>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Back Button Header */}
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.title}>Subscription Plans</Text>
        <Text style={styles.subtitle}>
          Choose the perfect plan for your energy needs
        </Text>

        {/* Current Plan Info */}
        <View style={styles.currentPlanInfo}>
          <Text style={styles.currentPlanLabel}>Your Current Plan</Text>
          <Text style={styles.currentPlanName}>{currentPlan.toUpperCase()}</Text>
        </View>

        {/* Plans */}
        <View style={styles.plansContainer}>
          {plans.map(plan => renderPlan(plan))}
        </View>

        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Can I change plans anytime?</Text>
            <Text style={styles.faqAnswer}>
              Yes, you can upgrade or downgrade your plan at any time. Changes take effect in the next billing cycle.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>What happens to my data?</Text>
            <Text style={styles.faqAnswer}>
              All your energy data and history are preserved when you change plans.
            </Text>
          </View>

          <View style={styles.faqItem}>
            <Text style={styles.faqQuestion}>Is installation included?</Text>
            <Text style={styles.faqAnswer}>
              Yes, professional installation is included in all plans with no additional cost.
            </Text>
          </View>
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
  scrollView: {
    flex: 1,
    padding: spacing.md,
  },
  headerContainer: {
    paddingBottom: spacing.sm,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.xs,
    marginLeft: -spacing.xs,
  },
  backArrow: {
    fontSize: 24,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  backText: {
    fontSize: typography.body,
    color: colors.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  currentPlanInfo: {
    backgroundColor: colors.primaryLight,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  currentPlanLabel: {
    fontSize: typography.tiny,
    color: colors.primary,
    textTransform: 'uppercase',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  currentPlanName: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 2,
  },
  plansContainer: {
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  planCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    position: 'relative',
  },
  planCardCurrent: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  popularBadge: {
    position: 'absolute',
    top: -1,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderBottomLeftRadius: borderRadius.sm,
    borderBottomRightRadius: borderRadius.sm,
  },
  popularText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.primaryDark,
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  currency: {
    fontSize: typography.h4,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  price: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  period: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  savingsTag: {
    backgroundColor: colors.primaryLight,
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    marginBottom: spacing.md,
  },
  savingsText: {
    fontSize: typography.tiny,
    fontWeight: '600',
    color: colors.primary,
  },
  featuresContainer: {
    marginBottom: spacing.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  featureCheck: {
    fontSize: typography.body,
    color: colors.primary,
    marginRight: spacing.sm,
    fontWeight: '700',
  },
  featureText: {
    flex: 1,
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  subscribeButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  subscribeButtonCurrent: {
    backgroundColor: colors.border,
  },
  subscribeGradient: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  subscribeButtonText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  subscribeButtonTextCurrent: {
    paddingVertical: spacing.md,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textTertiary,
    textAlign: 'center',
  },
  faqSection: {
    marginBottom: spacing.xxl,
  },
  faqTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  faqItem: {
    marginBottom: spacing.lg,
  },
  faqQuestion: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  faqAnswer: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});