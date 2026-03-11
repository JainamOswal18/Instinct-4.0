// app/(customer)/monitor.tsx
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useEnergyStore } from '../../store/useEnergyStore';
import { startEnergyStream } from '../../mock/usage';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

const { width } = Dimensions.get('window');

export default function Monitor() {
  const { currentData, setCurrentData } = useEnergyStore();
  const [history, setHistory] = useState<Array<{ time: string; value: number }>>([]);

  useEffect(() => {
    const cleanup = startEnergyStream((data) => {
      setCurrentData(data);
      
      // Add to history for simple chart
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;
      
      setHistory(prev => {
        const newHistory = [...prev, { time: timeStr, value: data.solar_kwh }];
        return newHistory.slice(-10); // Keep last 10 readings
      });
    });
    
    return cleanup;
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}>Real-Time Monitor</Text>
        <Text style={styles.subtitle}>Live updates every 15 seconds</Text>

        {/* Live Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusHeader}>
            <Text style={styles.statusLabel}>System Status</Text>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          </View>
        </View>

        {/* Energy Sources */}
        {currentData && (
          <>
            <View style={styles.sourceCard}>
              <LinearGradient
                colors={['rgba(255, 184, 0, 0.1)', 'transparent']}
                style={styles.sourceGradient}
              >
                <View style={styles.sourceHeader}>
                  <Text style={styles.sourceLabel}>Solar Generation</Text>
                  <View style={[styles.sourceIndicator, { backgroundColor: colors.solar }]} />
                </View>
                <Text style={styles.sourceValue}>{currentData.solar_kwh}</Text>
                <Text style={styles.sourceUnit}>kW</Text>
              </LinearGradient>
            </View>

            <View style={styles.sourceCard}>
              <LinearGradient
                colors={['rgba(168, 255, 53, 0.1)', 'transparent']}
                style={styles.sourceGradient}
              >
                <View style={styles.sourceHeader}>
                  <Text style={styles.sourceLabel}>Battery Level</Text>
                  <View style={[styles.sourceIndicator, { backgroundColor: colors.battery }]} />
                </View>
                <Text style={styles.sourceValue}>{currentData.battery_percent}</Text>
                <Text style={styles.sourceUnit}>%</Text>
                
                {/* Battery progress bar */}
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { width: `${currentData.battery_percent}%`, backgroundColor: colors.battery }
                    ]} 
                  />
                </View>
              </LinearGradient>
            </View>

            <View style={styles.sourceCard}>
              <LinearGradient
                colors={['rgba(74, 158, 255, 0.1)', 'transparent']}
                style={styles.sourceGradient}
              >
                <View style={styles.sourceHeader}>
                  <Text style={styles.sourceLabel}>Grid Consumption</Text>
                  <View style={[styles.sourceIndicator, { backgroundColor: colors.grid }]} />
                </View>
                <Text style={styles.sourceValue}>{currentData.grid_kwh}</Text>
                <Text style={styles.sourceUnit}>kW</Text>
              </LinearGradient>
            </View>

            {/* Cost Tracker */}
            <View style={styles.costCard}>
              <Text style={styles.costLabel}>Current Cost Rate</Text>
              <Text style={styles.costValue}>₹{currentData.total_cost}</Text>
              <Text style={styles.costPeriod}>per month (estimated)</Text>
            </View>
          </>
        )}

        {/* Simple History Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.chartTitle}>Solar History (Last 10 readings)</Text>
          <View style={styles.chart}>
            {history.map((item, index) => (
              <View key={index} style={styles.chartBar}>
                <View 
                  style={[
                    styles.chartBarFill, 
                    { height: `${(item.value / 5) * 100}%` }
                  ]} 
                />
                <Text style={styles.chartLabel}>{item.time}</Text>
              </View>
            ))}
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
  statusCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusLabel: {
    fontSize: typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(168, 255, 53, 0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
    marginRight: 6,
  },
  liveText: {
    fontSize: typography.tiny,
    color: colors.primary,
    fontWeight: '700',
  },
  sourceCard: {
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  sourceGradient: {
    padding: spacing.md,
  },
  sourceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sourceLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sourceIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  sourceValue: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sourceUnit: {
    fontSize: typography.body,
    color: colors.textSecondary,
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginTop: spacing.md,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  costCard: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  costLabel: {
    fontSize: typography.small,
    color: colors.primaryDark,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  costValue: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  costPeriod: {
    fontSize: typography.small,
    color: colors.primaryDark,
    opacity: 0.7,
  },
  chartCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  chartTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  chart: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  chartBar: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  chartBarFill: {
    width: '100%',
    backgroundColor: colors.solar,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
  chartLabel: {
    fontSize: 8,
    color: colors.textTertiary,
    marginTop: 4,
    transform: [{ rotate: '-45deg' }],
  },
});