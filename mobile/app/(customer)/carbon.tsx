// app/(customer)/carbon.tsx
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useCurrentProperty } from '../../store/useAuthStore';
import { useEnergyStore } from '../../store/useEnergyStore';
import { useEnergyServices } from '../../hooks/useEnergyServices';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function Carbon() {
  const currentProperty = useCurrentProperty();
  const { hasSolar, hasBattery, hasLighting, hasCooling } = useEnergyServices();
  const { stats, loadData } = useEnergyStore();

  useEffect(() => {
    if (currentProperty?.id) loadData(currentProperty.id, 'month');
  }, [currentProperty?.id]);

  // Derive per-service savings from stats.
  // When real API returns these fields they'll be used directly.
  // Until then the store's mock data gives solarProduction / batteryUsage as proxies.
  const solarCo2    = hasSolar    ? (stats?.carbonSavedKg ?? 0) : 0;
  const batteryCo2  = hasBattery  ? Math.round((stats?.batteryUsage ?? 0) * 0.23) : 0;
  const lightingCo2 = hasLighting ? 12 : 0; // TODO: real field from API
  const coolingCo2  = hasCooling  ? 18 : 0; // TODO: real field from API
  const totalCo2    = solarCo2 + batteryCo2 + lightingCo2 + coolingCo2;

  const gridOffset =
    hasSolar ? Math.min(Math.round((stats?.solarProduction ?? 0) / 10), 99) || 68
    : hasBattery ? 35
    : hasLighting || hasCooling ? 15
    : 0;

  const breakdownItems = [
    hasSolar    && { color: colors.solar,   label: 'Solar Generation', value: `${solarCo2} kg CO₂` },
    hasBattery  && { color: colors.battery, label: 'Battery Storage',  value: `${batteryCo2} kg CO₂` },
    hasLighting && { color: colors.warning, label: 'Smart Lighting',   value: `${lightingCo2} kg CO₂` },
    hasCooling  && { color: colors.info,    label: 'Smart Cooling',    value: `${coolingCo2} kg CO₂` },
  ].filter(Boolean) as { color: string; label: string; value: string }[];

  // Simple 5-month trend from current total (real API would return this)
  const monthlyHistory = [
    { month: 'Jan', value: Math.round(totalCo2 * 0.79) },
    { month: 'Feb', value: Math.round(totalCo2 * 0.90) },
    { month: 'Mar', value: Math.round(totalCo2 * 0.85) },
    { month: 'Apr', value: Math.round(totalCo2 * 0.95) },
    { month: 'May', value: totalCo2 },
  ];

  if (totalCo2 === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ScrollView style={styles.scrollView}>
          <Text style={styles.title}>Carbon Impact</Text>
          <Text style={styles.subtitle}>Your environmental contribution</Text>
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌱</Text>
            <Text style={styles.emptyTitle}>No carbon data yet</Text>
            <Text style={styles.emptyText}>Carbon savings will appear once your system is active.</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

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
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          >
            <Text style={styles.impactLabel}>This Month</Text>
            <Text style={styles.impactValue}>{totalCo2}</Text>
            <Text style={styles.impactUnit}>kg CO₂ saved</Text>
            <View style={styles.trendContainer}>
              <Text style={styles.trendText}>
                {(stats?.trendPercent ?? 0) <= 0 ? '↓' : '↑'} {Math.abs(stats?.trendPercent ?? 15)}% from last month
              </Text>
            </View>
          </LinearGradient>
        </View>

        {/* Lifetime / trees — solar only */}
        {hasSolar && (
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{Math.round(totalCo2 * 14.9)}</Text>
              <Text style={styles.statLabel}>Lifetime Saved</Text>
              <Text style={styles.statUnit}>kg CO₂ (est.)</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statValue}>{Math.max(1, Math.round(totalCo2 / 21))}</Text>
              <Text style={styles.statLabel}>Trees Equivalent</Text>
              <Text style={styles.statUnit}>planted</Text>
            </View>
          </View>
        )}

        {/* Grid Offset */}
        <View style={styles.offsetCard}>
          <View style={styles.offsetHeader}>
            <View style={{ flex: 1 }}>
              <Text style={styles.offsetLabel}>Grid Offset</Text>
              <Text style={styles.offsetDescription}>Energy from your clean sources</Text>
            </View>
            <Text style={styles.offsetPercent}>{gridOffset}%</Text>
          </View>
          <View style={styles.progressRing}>
            <View style={styles.progressBackground} />
            <View style={[styles.progressFill, { width: `${gridOffset}%` }]} />
          </View>
        </View>

        {/* Monthly Trend Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Monthly Savings</Text>
          <Text style={styles.chartSubtitle}>Last 5 months (kg CO₂)</Text>
          <View style={styles.chart}>
            {monthlyHistory.map((item, index) => {
              const maxValue = Math.max(...monthlyHistory.map(d => d.value), 1);
              const heightPercent = (item.value / maxValue) * 100;
              return (
                <View key={index} style={styles.chartColumn}>
                  <View style={styles.chartBarContainer}>
                    <View style={[styles.chartBar, { height: `${heightPercent}%` }]}>
                      <LinearGradient colors={[colors.primary, colors.accentSecondary]} style={styles.chartBarGradient} />
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
          {breakdownItems.map((item) => (
            <View key={item.label} style={styles.breakdownItem}>
              <View style={styles.breakdownLeft}>
                <View style={[styles.breakdownDot, { backgroundColor: item.color }]} />
                <Text style={styles.breakdownLabel}>{item.label}</Text>
              </View>
              <Text style={styles.breakdownValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        {/* Environmental Fact */}
        <View style={styles.factCard}>
          <Text style={styles.factTitle}>🌍 Did You Know?</Text>
          <Text style={styles.factText}>
            Your carbon savings this month are equivalent to driving{' '}
            {Math.round(totalCo2 * 3.6)} km less in a typical car
            {hasSolar ? `, or powering your home with clean energy for ${Math.round(totalCo2 / 6.8)} days` : ''}.
          </Text>
        </View>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.small, color: colors.textSecondary, marginBottom: spacing.lg },
  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyIcon: { fontSize: 56, marginBottom: spacing.md },
  emptyTitle: { fontSize: typography.h4, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.xs },
  emptyText: { fontSize: typography.small, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  mainCard: { marginBottom: spacing.lg, borderRadius: borderRadius.lg, overflow: 'hidden' },
  impactGradient: { padding: spacing.xl, alignItems: 'center' },
  impactLabel: { fontSize: typography.small, color: colors.primaryDark, marginBottom: spacing.xs, textTransform: 'uppercase', letterSpacing: 1, fontWeight: '600' },
  impactValue: { fontSize: 64, fontWeight: '700', color: colors.primaryDark, lineHeight: 64 },
  impactUnit: { fontSize: typography.body, color: colors.primaryDark, opacity: 0.8, marginTop: spacing.xs },
  trendContainer: { marginTop: spacing.md, backgroundColor: 'rgba(0,0,0,0.1)', paddingHorizontal: spacing.md, paddingVertical: spacing.xs, borderRadius: borderRadius.sm },
  trendText: { fontSize: typography.small, color: colors.primaryDark, fontWeight: '600' },
  statsGrid: { flexDirection: 'row', gap: spacing.md, marginBottom: spacing.lg },
  statBox: { flex: 1, backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statValue: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  statLabel: { fontSize: typography.tiny, color: colors.textSecondary, textAlign: 'center', marginBottom: 2 },
  statUnit: { fontSize: typography.tiny, color: colors.textTertiary },
  offsetCard: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  offsetHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md },
  offsetLabel: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 4 },
  offsetDescription: { fontSize: typography.tiny, color: colors.textSecondary },
  offsetPercent: { fontSize: typography.h1, fontWeight: '700', color: colors.primary },
  progressRing: { height: 8, borderRadius: 4, overflow: 'hidden', position: 'relative' },
  progressBackground: { position: 'absolute', width: '100%', height: '100%', backgroundColor: colors.border },
  progressFill: { height: '100%', backgroundColor: colors.primary, borderRadius: 4 },
  chartCard: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  chartTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  chartSubtitle: { fontSize: typography.tiny, color: colors.textSecondary, marginBottom: spacing.lg },
  chart: { flexDirection: 'row', height: 140, alignItems: 'flex-end', justifyContent: 'space-between' },
  chartColumn: { flex: 1, alignItems: 'center', marginHorizontal: 4 },
  chartBarContainer: { flex: 1, width: '100%', justifyContent: 'flex-end', marginBottom: spacing.xs },
  chartBar: { width: '100%', borderRadius: 4, overflow: 'hidden', minHeight: 8 },
  chartBarGradient: { flex: 1 },
  chartValue: { fontSize: typography.tiny, color: colors.textPrimary, fontWeight: '600', marginBottom: 2 },
  chartMonth: { fontSize: 10, color: colors.textTertiary },
  breakdownCard: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  breakdownTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.md },
  breakdownItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  breakdownLeft: { flexDirection: 'row', alignItems: 'center' },
  breakdownDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.sm },
  breakdownLabel: { fontSize: typography.small, color: colors.textSecondary },
  breakdownValue: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary },
  factCard: { backgroundColor: colors.surfaceLight, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.xl },
  factTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm },
  factText: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 20 },
});