// app/(customer)/carbon.tsx
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

const { width } = Dimensions.get('window');

export default function Carbon() {
  const [carbonData, setCarbonData] = useState({
    monthlySaved: 124,
    lifetimeSaved: 1847,
    treesEquivalent: 6,
    gridOffset: 68,
    trend: 15, // % increase from last month
  });

  // Simulate monthly data for simple chart
  const monthlyData = [
    { month: 'Jan', value: 98 },
    { month: 'Feb', value: 112 },
    { month: 'Mar', value: 105 },
    { month: 'Apr', value: 118 },
    { month: 'May', value: 124 },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Carbon Impact</Text>
        <Text style={styles.subtitle}>Your environmental contribution</Text>

        {/* Main Impact Card */}
        <View style={styles.mainCard}>
          <LinearGradient
            colors={[colors.primary, colors.accentSecondary]}
            style={styles.impactGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.impactLabel}>This Month</Text>
            <Text style={styles.impactValue}>{carbonData.monthlySaved}</Text>
            <Text style={styles.impactUnit}>kg CO₂ saved</Text>
            
            <View style={styles.trendContainer}>
              <Text style={styles.trendText}>↑ {carbonData.trend}% from last month</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{carbonData.lifetimeSaved}</Text>
            <Text style={styles.statLabel}>Lifetime Saved</Text>
            <Text style={styles.statUnit}>kg CO₂</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>{carbonData.treesEquivalent}</Text>
            <Text style={styles.statLabel}>Trees Planted</Text>
            <Text style={styles.statUnit}>equivalent</Text>
          </View>
        </View>

        {/* Grid Offset */}
        <View style={styles.offsetCard}>
          <View style={styles.offsetHeader}>
            <View>
              <Text style={styles.offsetLabel}>Grid Offset</Text>
              <Text style={styles.offsetDescription}>
                Energy from renewable sources
              </Text>
            </View>
            <Text style={styles.offsetPercent}>{carbonData.gridOffset}%</Text>
          </View>

          {/* Progress Ring Visualization */}
          <View style={styles.progressRing}>
            <View style={styles.progressBackground} />
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${carbonData.gridOffset}%`,
                }
              ]} 
            />
          </View>
        </View>

        {/* Monthly Trend Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Savings</Text>
          <Text style={styles.chartSubtitle}>Last 5 months</Text>

          <View style={styles.chart}>
            {monthlyData.map((item, index) => {
              const maxValue = Math.max(...monthlyData.map(d => d.value));
              const heightPercent = (item.value / maxValue) * 100;
              
              return (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.chartBarContainer}>
                    <View 
                      style={[
                        styles.chartBar,
                        { height: `${heightPercent}%` }
                      ]}
                    >
                      <LinearGradient
                        colors={[colors.primary, colors.accentSecondary]}
                        style={styles.chartBarGradient}
                      />
                    </View>
                  </View>
                  <Text style={styles.chartValue}>{item.value}</Text>
                  <Text style={styles.chartMonth}>{item.month}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Impact Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Impact Breakdown</Text>
          
          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.breakdownDot, { backgroundColor: colors.solar }]} />
              <Text style={styles.breakdownLabel}>Solar Generation</Text>
            </View>
            <Text style={styles.breakdownValue}>86 kg CO₂</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.breakdownDot, { backgroundColor: colors.battery }]} />
              <Text style={styles.breakdownLabel}>Battery Storage</Text>
            </View>
            <Text style={styles.breakdownValue}>28 kg CO₂</Text>
          </View>

          <View style={styles.breakdownItem}>
            <View style={styles.breakdownLeft}>
              <View style={[styles.breakdownDot, { backgroundColor: colors.grid }]} />
              <Text style={styles.breakdownLabel}>Grid Reduction</Text>
            </View>
            <Text style={styles.breakdownValue}>10 kg CO₂</Text>
          </View>
        </View>

        {/* Environmental Facts */}
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>🌍 Did You Know?</Text>
          <Text style={styles.factText}>
            Your carbon savings this month are equivalent to driving 450 km less in a typical car, 
            or powering your home with clean energy for 18 days.
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
  scrollView: {
    flex: 1,
    padding: spacing.md,
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
  mainCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  impactGradient: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  impactLabel: {
    fontSize: typography.small,
    color: colors.primaryDark,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  impactValue: {
    fontSize: 64,
    fontWeight: '700',
    color: colors.primaryDark,
    lineHeight: 64,
  },
  impactUnit: {
    fontSize: typography.body,
    color: colors.primaryDark,
    opacity: 0.8,
    marginTop: spacing.xs,
  },
  trendContainer: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  trendText: {
    fontSize: typography.small,
    color: colors.primaryDark,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
  },
  statUnit: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
  },
  offsetCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  offsetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  offsetLabel: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  offsetDescription: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
  },
  offsetPercent: {
    fontSize: typography.h1,
    fontWeight: '700',
    color: colors.primary,
  },
  progressRing: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  progressBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  chartCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  chartTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  chartSubtitle: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  chart: {
    flexDirection: 'row',
    height: 140,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  chartBarContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-end',
    marginBottom: spacing.xs,
  },
  chartBar: {
    width: '100%',
    borderRadius: 4,
    overflow: 'hidden',
    minHeight: 8,
  },
  chartBarGradient: {
    flex: 1,
  },
  chartValue: {
    fontSize: typography.tiny,
    color: colors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  chartMonth: {
    fontSize: 10,
    color: colors.textTertiary,
  },
  breakdownCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  breakdownTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  breakdownItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  breakdownLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  breakdownLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  breakdownValue: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  factCard: {
    backgroundColor: colors.surfaceLight,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  factTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  factText: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});