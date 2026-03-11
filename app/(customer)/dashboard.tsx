// app/(customer)/dashboard.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

import { useAuthStore } from '../../store/useAuthStore';
import { useEnergyStore } from '../../store/useEnergyStore';
import { getUsageStats, startEnergyStream } from '../../mock/usage';
import { getAlerts } from '../../mock/alerts';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function Dashboard() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  
  const { currentData, stats, alerts, isLoading, setCurrentData, setStats, setAlerts, setLoading } = useEnergyStore();
  
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
    
    const cleanup = startEnergyStream((data) => {
      setCurrentData(data);
    });
    
    return cleanup;
  }, []);

  const loadData = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStats(getUsageStats());
    setAlerts(getAlerts());
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Loading energy data...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ScrollView 
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primary} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello,</Text>
            <Text style={styles.name}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/(customer)/profile')} 
            style={styles.settingsButton}
          >
            <Text style={styles.settingsIcon}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Main Energy Card */}
        <View style={styles.mainCard}>
          <LinearGradient
            colors={[colors.surfaceLight, colors.surface]}
            style={styles.gradientCard}
          >
            <View style={styles.mainCardHeader}>
              <View>
                <Text style={styles.mainCardLabel}>Current Usage</Text>
                <Text style={styles.mainCardValue}>{stats?.current_kwh || 0} kWh</Text>
              </View>
              <View style={styles.trendBadge}>
                <Text style={styles.trendText}>↓ {stats?.trend_percent}%</Text>
              </View>
            </View>
            
            {/* Real-time indicators */}
            {currentData && (
              <View style={styles.realtimeRow}>
                <View style={styles.realtimeItem}>
                  <View style={[styles.indicator, { backgroundColor: colors.solar }]} />
                  <Text style={styles.realtimeLabel}>Solar</Text>
                  <Text style={styles.realtimeValue}>{currentData.solar_kwh} kW</Text>
                </View>
                
                <View style={styles.realtimeItem}>
                  <View style={[styles.indicator, { backgroundColor: colors.battery }]} />
                  <Text style={styles.realtimeLabel}>Battery</Text>
                  <Text style={styles.realtimeValue}>{currentData.battery_percent}%</Text>
                </View>
                
                <View style={styles.realtimeItem}>
                  <View style={[styles.indicator, { backgroundColor: colors.grid }]} />
                  <Text style={styles.realtimeLabel}>Grid</Text>
                  <Text style={styles.realtimeValue}>{currentData.grid_kwh} kW</Text>
                </View>
              </View>
            )}
          </LinearGradient>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Carbon Saved</Text>
            <Text style={styles.statValue}>{stats?.carbon_saved_kg}</Text>
            <Text style={styles.statUnit}>kg CO₂</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>Monthly Bill</Text>
            <Text style={styles.statValue}>₹{stats?.monthly_bill}</Text>
            <Text style={styles.statUnit}>estimated</Text>
          </View>
        </View>

        {/* Alerts */}
        {alerts.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Alerts</Text>
              <View style={styles.alertCount}>
                <Text style={styles.alertCountText}>{alerts.length}</Text>
              </View>
            </View>
            
            {alerts.slice(0, 2).map((alert) => (
              <View key={alert.id} style={styles.alertCard}>
                <View style={[
                  styles.alertIndicator,
                  alert.severity === 'critical' && { backgroundColor: colors.error },
                  alert.severity === 'warning' && { backgroundColor: colors.warning },
                  alert.severity === 'info' && { backgroundColor: colors.info },
                ]} />
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>{alert.title}</Text>
                  <Text style={styles.alertMessage}>{alert.message}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* AI Advisor CTA */}
        <TouchableOpacity 
          style={styles.aiCard}
          onPress={() => router.push('/(customer)/ai-advisor')}
          activeOpacity={0.9}
        >
          <View style={styles.aiCardContent}>
            <View style={styles.aiIcon}>
              <Text style={styles.aiIconText}>AI</Text>
            </View>
            <View style={styles.aiText}>
              <Text style={styles.aiTitle}>Energy Advisor</Text>
              <Text style={styles.aiSubtitle}>Get personalized insights</Text>
            </View>
            <Text style={styles.aiArrow}>→</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    padding: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: spacing.md,
    fontSize: typography.body,
    color: colors.textSecondary,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  greeting: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  name: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  settingsIcon: {
    fontSize: 20,
  },
  mainCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  gradientCard: {
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.lg,
  },
  mainCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  mainCardLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  mainCardValue: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  trendBadge: {
    backgroundColor: 'rgba(168, 255, 53, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  trendText: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: '600',
  },
  realtimeRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  realtimeItem: {
    flex: 1,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  realtimeLabel: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
    marginBottom: 2,
  },
  realtimeValue: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statLabel: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statValue: {
    fontSize: typography.h3,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  statUnit: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.textPrimary,
    marginRight: spacing.sm,
  },
  alertCount: {
    backgroundColor: colors.error,
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertCountText: {
    fontSize: typography.tiny,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  alertIndicator: {
    width: 4,
    borderRadius: 2,
    marginRight: spacing.sm,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  aiCard: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  aiCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.primaryDark,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  aiIconText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primary,
  },
  aiText: {
    flex: 1,
  },
  aiTitle: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 2,
  },
  aiSubtitle: {
    fontSize: typography.small,
    color: colors.primaryDark,
    opacity: 0.7,
  },
  aiArrow: {
    fontSize: 24,
    color: colors.primaryDark,
  },
});