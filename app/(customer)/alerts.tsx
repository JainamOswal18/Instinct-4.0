// app/(customer)/alerts.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  read: boolean;
  category: 'usage' | 'billing' | 'system' | 'savings';
}

export default function Alerts() {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: '1',
      title: 'High Energy Usage Detected',
      message: 'Your consumption is 23% higher than usual today. Consider checking AC settings.',
      severity: 'warning',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
      category: 'usage',
    },
    {
      id: '2',
      title: 'Solar Peak Opportunity',
      message: 'Solar generation at peak. Good time to run washing machine and dishwasher.',
      severity: 'info',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      read: false,
      category: 'savings',
    },
    {
      id: '3',
      title: 'Battery Low',
      message: 'Battery charge below 20%. Switching to grid backup mode.',
      severity: 'critical',
      timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      read: true,
      category: 'system',
    },
    {
      id: '4',
      title: 'Bill Payment Reminder',
      message: 'Your monthly bill of ₹2,850 is due in 3 days.',
      severity: 'info',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: true,
      category: 'billing',
    },
    {
        id: '5',
        title: 'Savings Milestone Reached',
        message: "Congratulations! You've saved ₹5,000 this year compared to grid-only usage.",
        severity: 'info',
        timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        read: true,
        category: 'savings',
    },
]);

  const unreadCount = alerts.filter(a => !a.read).length;
  const filteredAlerts = filter === 'unread' ? alerts.filter(a => !a.read) : alerts;

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const markAllAsRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return colors.error;
      case 'warning': return colors.warning;
      case 'info': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'usage': return '⚡';
      case 'billing': return '💰';
      case 'system': return '🔧';
      case 'savings': return '🎯';
      default: return '📢';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins}m ago`;
    } else if (diffHours < 24) {
      return `${diffHours}h ago`;
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays}d ago`;
    }
  };

  const renderAlert = ({ item }: { item: Alert }) => (
    <TouchableOpacity
      style={[styles.alertCard, !item.read && styles.alertUnread]}
      onPress={() => markAsRead(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.alertHeader}>
        <View style={styles.alertLeft}>
          <View style={styles.categoryIcon}>
            <Text style={styles.categoryIconText}>{getCategoryIcon(item.category)}</Text>
          </View>
          <View style={styles.alertInfo}>
            <Text style={styles.alertTitle}>{item.title}</Text>
            <Text style={styles.alertTime}>{formatTime(item.timestamp)}</Text>
          </View>
        </View>
        {!item.read && <View style={styles.unreadDot} />}
      </View>
      
      <View style={[styles.severityBar, { backgroundColor: getSeverityColor(item.severity) }]} />
      
      <Text style={styles.alertMessage}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Alerts</Text>
          <Text style={styles.subtitle}>
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
            <Text style={styles.markAllText}>Mark all read</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, filter === 'all' && styles.filterTabActive]}
          onPress={() => setFilter('all')}
        >
          <Text style={[styles.filterText, filter === 'all' && styles.filterTextActive]}>
            All ({alerts.length})
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.filterTab, filter === 'unread' && styles.filterTabActive]}
          onPress={() => setFilter('unread')}
        >
          <Text style={[styles.filterText, filter === 'unread' && styles.filterTextActive]}>
            Unread ({unreadCount})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Alerts List */}
      <FlatList
        data={filteredAlerts}
        renderItem={renderAlert}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>✓</Text>
            <Text style={styles.emptyTitle}>All caught up!</Text>
            <Text style={styles.emptyText}>No unread notifications</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  markAllButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  markAllText: {
    fontSize: typography.small,
    color: colors.primary,
    fontWeight: '600',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterTab: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterTabActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.primary,
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xl,
  },
  alertCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  alertUnread: {
    backgroundColor: colors.surfaceLight,
    borderColor: colors.primary,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  alertLeft: {
    flexDirection: 'row',
    flex: 1,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  categoryIconText: {
    fontSize: 18,
  },
  alertInfo: {
    flex: 1,
  },
  alertTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  alertTime: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: 4,
  },
  severityBar: {
    height: 3,
    borderRadius: 1.5,
    marginBottom: spacing.sm,
  },
  alertMessage: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing.xxl,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: typography.h4,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  emptyText: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
});