// app/(customer)/monitor.tsx
import React, { useEffect } from 'react';
import {
  View, Text, ScrollView, StyleSheet,
  TouchableOpacity, ActivityIndicator, Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useCurrentProperty } from '../../store/useAuthStore';
import { useEnergyStore } from '../../store/useEnergyStore';
import { useEnergyServices } from '../../hooks/useEnergyServices';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
type Period = 'day' | 'week' | 'month' | 'year';

export default function MonitorScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { hasSolar, hasBattery, hasLighting, hasCooling, label } = useEnergyServices();

  const {
    currentData, stats, isLoading, period,
    loadData, setPeriod, startStream, stopStream,
  } = useEnergyStore();

  const propertyId = currentProperty?.id ?? '';

  useEffect(() => {
    loadData(propertyId, period);
    startStream(propertyId);
    return () => stopStream();
  }, [propertyId]);

  const handlePeriodChange = (p: Period) => {
    setPeriod(p);
    loadData(propertyId, p);
  };

  const periods: { key: Period; label: string }[] = [
    { key: 'day', label: 'Day' },
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'year', label: 'Year' },
  ];

  const realtimeItems = [
    hasSolar    && { key: 'solar',    icon: '☀️', label: 'Solar',    value: `${currentData?.solarKw ?? 0} kW` },
    hasBattery  && { key: 'battery',  icon: '🔋', label: 'Battery',  value: `${currentData?.batteryPercent ?? 0}%` },
    hasLighting && { key: 'lighting', icon: '💡', label: 'Lighting', value: `${currentData?.lightingKw ?? 0} kW` },
    hasCooling  && { key: 'cooling',  icon: '❄️', label: 'Cooling',  value: `${currentData?.coolingKw ?? 0} kW` },
                   { key: 'grid',     icon: '⚡', label: 'Grid',     value: `${currentData?.gridKw ?? 0} kW` },
                   { key: 'usage',    icon: '🏠', label: 'Usage',    value: `${currentData?.consumption ?? 0} kW` },
  ].filter(Boolean) as { key: string; icon: string; label: string; value: string }[];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{label} Monitor</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Live card */}
        <LinearGradient
          colors={[colors.primaryDark, colors.surface]}
          style={styles.realtimeCard}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={styles.livePill}>● Live</Text>
          {currentData ? (
            <View style={styles.realtimeGrid}>
              {realtimeItems.map((item, i) => (
                <React.Fragment key={item.key}>
                  {i > 0 && <View style={styles.realtimeDivider} />}
                  <View style={styles.realtimeItem}>
                    <Text style={styles.realtimeIcon}>{item.icon}</Text>
                    <Text style={styles.realtimeValue}>{item.value}</Text>
                    <Text style={styles.realtimeItemLabel}>{item.label}</Text>
                  </View>
                </React.Fragment>
              ))}
            </View>
          ) : (
            <ActivityIndicator color={colors.primary} style={{ marginTop: spacing.md }} />
          )}
        </LinearGradient>

        {/* Period selector */}
        <View style={styles.periodSelector}>
          {periods.map((p) => (
            <TouchableOpacity
              key={p.key}
              style={[styles.periodBtn, period === p.key && styles.periodBtnActive]}
              onPress={() => handlePeriodChange(p.key)}
            >
              <Text style={[styles.periodText, period === p.key && styles.periodTextActive]}>
                {p.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : (
          <>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>⚡</Text>
                <Text style={styles.statValue}>{stats?.currentKwh ?? 0}</Text>
                <Text style={styles.statUnit}>kWh used</Text>
              </View>
              {hasSolar && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>☀️</Text>
                  <Text style={styles.statValue}>{stats?.solarProduction ?? 0}</Text>
                  <Text style={styles.statUnit}>kWh solar</Text>
                </View>
              )}
              {hasBattery && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🔋</Text>
                  <Text style={styles.statValue}>{stats?.batteryCycles ?? 0}</Text>
                  <Text style={styles.statUnit}>battery cycles</Text>
                </View>
              )}
              {hasLighting && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>💡</Text>
                  <Text style={styles.statValue}>{stats?.lightingHours ?? 0}</Text>
                  <Text style={styles.statUnit}>hrs lighting</Text>
                </View>
              )}
              {hasCooling && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>❄️</Text>
                  <Text style={styles.statValue}>{stats?.coolingHours ?? 0}</Text>
                  <Text style={styles.statUnit}>hrs cooling</Text>
                </View>
              )}
              {hasSolar && (
                <View style={styles.statCard}>
                  <Text style={styles.statIcon}>🌱</Text>
                  <Text style={styles.statValue}>{stats?.carbonSavedKg ?? 0}</Text>
                  <Text style={styles.statUnit}>kg CO₂ saved</Text>
                </View>
              )}
              <View style={styles.statCard}>
                <Text style={styles.statIcon}>💰</Text>
                <Text style={styles.statValue}>₹{stats?.monthlyBill ?? 0}</Text>
                <Text style={styles.statUnit}>bill estimate</Text>
              </View>
            </View>

            {stats?.trendPercent !== undefined && (
              <View style={styles.trendCard}>
                <Text style={styles.trendTitle}>Usage Trend</Text>
                <View style={styles.trendRow}>
                  <Text style={[styles.trendValue, { color: stats.trendPercent < 0 ? colors.primary : colors.error }]}>
                    {stats.trendPercent < 0 ? '↓' : '↑'} {Math.abs(stats.trendPercent)}%
                  </Text>
                  <Text style={styles.trendDesc}>
                    {stats.trendPercent < 0 ? 'Lower than previous period — great work!' : 'Higher than previous period'}
                  </Text>
                </View>
              </View>
            )}

            {stats?.history && stats.history.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Consumption History</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.barsContainer}>
                    {stats.history.slice(-14).map((item, index) => {
                      const maxVal = Math.max(...stats.history!.map(h => h.consumption ?? 0), 1);
                      const height = Math.max(((item.consumption ?? 0) / maxVal) * 80, 4);
                      return (
                        <View key={index} style={styles.barWrapper}>
                          <View style={styles.barTrack}>
                            <View style={[styles.bar, { height }]} />
                          </View>
                          <Text style={styles.barLabel}>{new Date(item.date).getDate()}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}

            {hasSolar && stats?.solarHistory && stats.solarHistory.length > 0 && (
              <View style={styles.historySection}>
                <Text style={styles.historyTitle}>Solar Production History</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.barsContainer}>
                    {stats.solarHistory.slice(-14).map((item, index) => {
                      const maxVal = Math.max(...stats.solarHistory!.map(h => h.production ?? 0), 1);
                      const height = Math.max(((item.production ?? 0) / maxVal) * 80, 4);
                      return (
                        <View key={index} style={styles.barWrapper}>
                          <View style={styles.barTrack}>
                            <View style={[styles.bar, { height, backgroundColor: colors.solar }]} />
                          </View>
                          <Text style={styles.barLabel}>{new Date(item.date).getDate()}</Text>
                        </View>
                      );
                    })}
                  </View>
                </ScrollView>
              </View>
            )}
          </>
        )}
        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  backBtn: { padding: spacing.xs },
  backArrow: { fontSize: 24, color: colors.primary },
  title: { fontSize: typography.h3, fontWeight: '700', color: colors.textPrimary },
  realtimeCard: { margin: spacing.md, borderRadius: borderRadius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  livePill: { fontSize: typography.tiny, color: colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.md },
  realtimeGrid: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 },
  realtimeItem: { flex: 1, alignItems: 'center', minWidth: 52 },
  realtimeDivider: { width: 1, backgroundColor: colors.border, alignSelf: 'stretch' },
  realtimeIcon: { fontSize: 20, marginBottom: spacing.xs },
  realtimeValue: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },
  realtimeItemLabel: { fontSize: typography.tiny, color: colors.textTertiary, marginTop: 2 },
  periodSelector: { flexDirection: 'row', marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: 4 },
  periodBtn: { flex: 1, paddingVertical: spacing.xs, alignItems: 'center', borderRadius: borderRadius.sm },
  periodBtnActive: { backgroundColor: colors.primary },
  periodText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  periodTextActive: { color: colors.primaryDark },
  loadingContainer: { padding: spacing.xxl, alignItems: 'center' },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, paddingHorizontal: spacing.md, marginBottom: spacing.md },
  statCard: { width: (SCREEN_WIDTH - spacing.md * 2 - spacing.sm) / 2 - 1, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  statIcon: { fontSize: 28, marginBottom: spacing.xs },
  statValue: { fontSize: typography.h3, fontWeight: '700', color: colors.textPrimary },
  statUnit: { fontSize: typography.tiny, color: colors.textTertiary, marginTop: 2 },
  trendCard: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  trendTitle: { fontSize: typography.small, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.sm },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  trendValue: { fontSize: typography.h3, fontWeight: '700' },
  trendDesc: { flex: 1, fontSize: typography.small, color: colors.textSecondary },
  historySection: { marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, borderWidth: 1, borderColor: colors.border },
  historyTitle: { fontSize: typography.small, fontWeight: '700', color: colors.textSecondary, marginBottom: spacing.md },
  barsContainer: { flexDirection: 'row', alignItems: 'flex-end', gap: 6, paddingBottom: spacing.xs },
  barWrapper: { alignItems: 'center', width: 24 },
  barTrack: { height: 80, justifyContent: 'flex-end' },
  bar: { width: 16, backgroundColor: colors.primary, borderRadius: 3 },
  barLabel: { fontSize: 9, color: colors.textTertiary, marginTop: 4 },
});