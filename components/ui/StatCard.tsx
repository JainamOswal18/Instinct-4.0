// components/ui/StatCard.tsx
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme/colors';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
  subtextColor?: string;
  icon?: string;
}

export function StatCard({ label, value, unit, subtext, subtextColor, icon }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        {icon && <Text style={styles.icon}>{icon}</Text>}
      </View>
      
      <View style={styles.valueContainer}>
        <Text style={styles.value}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      
      {subtext && (
        <Text style={[styles.subtext, { color: subtextColor || colors.textSecondary }]}>
          {subtext}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 16,
    marginBottom: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  icon: {
    fontSize: 20,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  value: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  unit: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
    marginLeft: spacing.xs,
  },
  subtext: {
    fontSize: 12,
    marginTop: spacing.xs,
  },
});