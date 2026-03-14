// app/(customer)/maintenance.tsx
import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  ActivityIndicator, Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useCurrentProperty } from '../../store/useAuthStore';
import apiWrapper from '../../services/apiWrapper';
import { Toast } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';
import type { ServiceItem, ServiceHistory, UpcomingVisit } from '../../mock/maintenance';

function StatusBadge({ status }: { status: ServiceItem['status'] }) {
  const map = {
    good:     { label: 'Good',     bg: 'rgba(168,255,53,0.15)', border: colors.primary, text: colors.primary },
    due_soon: { label: 'Due Soon', bg: 'rgba(255,196,0,0.15)',  border: colors.warning, text: colors.warning },
    overdue:  { label: 'Overdue',  bg: 'rgba(255,69,58,0.15)',  border: colors.error,   text: colors.error   },
  };
  const s = map[status];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg, borderColor: s.border }]}>
      <Text style={[styles.badgeText, { color: s.text }]}>{s.label}</Text>
    </View>
  );
}

export default function MaintenanceScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();

  const [schedule, setSchedule]         = useState<ServiceItem[]>([]);
  const [history, setHistory]           = useState<ServiceHistory[]>([]);
  const [upcomingVisits, setUpcoming]   = useState<UpcomingVisit[]>([]);
  const [activeTab, setActiveTab]       = useState<'schedule' | 'history'>('schedule');
  const [isLoading, setIsLoading]       = useState(true);
  const [toastError, setToastError]     = useState<string | null>(null);

  const activationDate = currentProperty?.installationProgress?.activationDate;
  const propertyId     = currentProperty?.id ?? '';

  useEffect(() => { loadData(); }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [schedRes, histRes, visitRes] = await Promise.all([
        apiWrapper.maintenance.getSchedule(propertyId, activationDate),
        apiWrapper.maintenance.getHistory(propertyId, activationDate),
        apiWrapper.maintenance.getUpcomingVisits(propertyId, activationDate),
      ]);
      if (schedRes?.data?.schedule)   setSchedule(schedRes.data.schedule);
      if (histRes?.data?.history)     setHistory(histRes.data.history);
      if (visitRes?.data?.visits)     setUpcoming(visitRes.data.visits);
    } catch (e: any) {
      setToastError('Failed to load maintenance data.');
    } finally {
      setIsLoading(false);
    }
  };

  const dueCount = schedule.filter(s => s.status !== 'good').length;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Toast message={toastError} onDismiss={() => setToastError(null)} />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Maintenance</Text>
            <Text style={styles.subtitle}>Keep your system performing at its best</Text>
          </View>
          {dueCount > 0 && (
            <View style={styles.dueBadge}>
              <Text style={styles.dueBadgeText}>{dueCount} due</Text>
            </View>
          )}
        </View>

        {/* Summary card */}
        <LinearGradient
          colors={dueCount > 0 ? [colors.warning, '#ff9500'] : [colors.primary, colors.accentSecondary]}
          style={styles.summaryCard}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        >
          <Text style={styles.summaryIcon}>{dueCount > 0 ? '⚠️' : '✅'}</Text>
          <Text style={styles.summaryTitle}>
            {dueCount > 0
              ? `${dueCount} service${dueCount > 1 ? 's' : ''} need attention`
              : 'All systems healthy'}
          </Text>
          <Text style={styles.summarySubtitle}>
            {dueCount > 0
              ? 'Schedule a service visit to keep your system running optimally.'
              : 'Your next scheduled service is coming up. We will notify you in advance.'}
          </Text>
          {dueCount > 0 && (
            <TouchableOpacity
              style={styles.scheduleBtn}
              onPress={() => Linking.openURL('tel:18001234567')}
            >
              <Text style={styles.scheduleBtnText}>📞 Schedule Service</Text>
            </TouchableOpacity>
          )}
        </LinearGradient>

        {/* Upcoming visits */}
        {upcomingVisits.length > 0 && (
          <View style={styles.visitSection}>
            <Text style={styles.sectionTitle}>Upcoming Visit</Text>
            {upcomingVisits.map(v => (
              <View key={v.id} style={styles.visitCard}>
                <View style={styles.visitLeft}>
                  <Text style={styles.visitDate}>{v.date}</Text>
                  <Text style={styles.visitType}>{v.type}</Text>
                  <Text style={styles.visitEngineer}>Engineer: {v.engineer}</Text>
                  <Text style={styles.visitComponents}>{v.components.join(' · ')}</Text>
                </View>
                <View style={[styles.visitStatus, v.confirmed ? styles.visitConfirmed : styles.visitPending]}>
                  <Text style={styles.visitStatusText}>{v.confirmed ? 'Confirmed' : 'Pending'}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabRow}>
          {(['schedule', 'history'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab === 'schedule' ? 'Schedule' : 'History'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {isLoading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator color={colors.primary} />
          </View>
        ) : activeTab === 'schedule' ? (
          <View style={styles.section}>
            {schedule.map(item => (
              <View key={item.id} style={styles.serviceCard}>
                <View style={styles.serviceTop}>
                  <Text style={styles.serviceIcon}>{item.icon}</Text>
                  <View style={styles.serviceInfo}>
                    <Text style={styles.serviceComponent}>{item.component}</Text>
                    <Text style={styles.serviceDates}>
                      Last: {item.lastServiced}  ·  Next: {item.nextService}
                    </Text>
                  </View>
                  <StatusBadge status={item.status} />
                </View>
                <Text style={styles.serviceNotes}>{item.notes}</Text>
                {item.status !== 'good' && (
                  <TouchableOpacity
                    style={styles.raiseTicketBtn}
                    onPress={() => router.push('/(customer)/support')}
                  >
                    <Text style={styles.raiseTicketText}>🎫 Raise Service Ticket</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            {history.map(h => (
              <View key={h.id} style={styles.historyCard}>
                <View style={styles.historyLeft}>
                  <Text style={styles.historyDate}>{h.date}</Text>
                  <Text style={styles.historyComponent}>{h.component}</Text>
                  <Text style={styles.historyType}>{h.type}</Text>
                  <Text style={styles.historyNotes}>{h.notes}</Text>
                </View>
                <View style={styles.historyRight}>
                  <Text style={styles.historyEngineer}>{h.engineer}</Text>
                  <View style={styles.historyDoneBadge}>
                    <Text style={styles.historyDoneText}>Done</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Help */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Need help?</Text>
          <TouchableOpacity style={styles.helpCard} onPress={() => Linking.openURL('tel:18001234567')}>
            <Text style={styles.helpIcon}>📞</Text>
            <View style={styles.helpText}><Text style={styles.helpCardTitle}>Call Support</Text><Text style={styles.helpCardDesc}>1800-123-4567 (Toll Free)</Text></View>
            <Text style={styles.helpArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpCard} onPress={() => router.push('/(customer)/support')}>
            <Text style={styles.helpIcon}>🎫</Text>
            <View style={styles.helpText}><Text style={styles.helpCardTitle}>Raise a Ticket</Text><Text style={styles.helpCardDesc}>Track your service requests</Text></View>
            <Text style={styles.helpArrow}>→</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpCard} onPress={() => router.push('/(customer)/ai-advisor')}>
            <Text style={styles.helpIcon}>🤖</Text>
            <View style={styles.helpText}><Text style={styles.helpCardTitle}>Ask AI Advisor</Text><Text style={styles.helpCardDesc}>Get maintenance tips & insights</Text></View>
            <Text style={styles.helpArrow}>→</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: spacing.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', paddingHorizontal: spacing.md, paddingVertical: spacing.md },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: typography.small, color: colors.textSecondary, marginTop: 2 },
  dueBadge: { backgroundColor: colors.error, paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.sm },
  dueBadgeText: { fontSize: typography.tiny, fontWeight: '700', color: '#fff' },

  summaryCard: { marginHorizontal: spacing.md, marginBottom: spacing.lg, borderRadius: borderRadius.lg, padding: spacing.lg, alignItems: 'center' },
  summaryIcon: { fontSize: 40, marginBottom: spacing.sm },
  summaryTitle: { fontSize: typography.h3, fontWeight: '700', color: colors.primaryDark, marginBottom: 6, textAlign: 'center' },
  summarySubtitle: { fontSize: typography.small, color: colors.primaryDark, opacity: 0.85, textAlign: 'center', lineHeight: 20, marginBottom: spacing.md },
  scheduleBtn: { backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  scheduleBtnText: { fontSize: typography.body, fontWeight: '700', color: '#fff' },

  visitSection: { paddingHorizontal: spacing.md, marginBottom: spacing.md },
  sectionTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  visitCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md },
  visitLeft: { flex: 1 },
  visitDate: { fontSize: typography.small, fontWeight: '700', color: colors.primary, marginBottom: 2 },
  visitType: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  visitEngineer: { fontSize: typography.small, color: colors.textSecondary, marginBottom: 2 },
  visitComponents: { fontSize: typography.tiny, color: colors.textTertiary },
  visitStatus: { paddingHorizontal: spacing.sm, paddingVertical: 4, borderRadius: borderRadius.sm },
  visitConfirmed: { backgroundColor: 'rgba(168,255,53,0.15)', borderWidth: 1, borderColor: colors.primary },
  visitPending: { backgroundColor: 'rgba(255,196,0,0.15)', borderWidth: 1, borderColor: colors.warning },
  visitStatusText: { fontSize: typography.tiny, fontWeight: '700', color: colors.textPrimary },

  tabRow: { flexDirection: 'row', marginHorizontal: spacing.md, marginBottom: spacing.md, backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: 4 },
  tab: { flex: 1, paddingVertical: spacing.xs, alignItems: 'center', borderRadius: borderRadius.sm },
  tabActive: { backgroundColor: colors.primary },
  tabText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  tabTextActive: { color: colors.primaryDark },

  loadingBox: { padding: spacing.xxl, alignItems: 'center' },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.md },

  serviceCard: { backgroundColor: colors.surface, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
  serviceTop: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: spacing.xs },
  serviceIcon: { fontSize: 28, marginRight: spacing.sm, marginTop: 2 },
  serviceInfo: { flex: 1 },
  serviceComponent: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 },
  serviceDates: { fontSize: typography.tiny, color: colors.textSecondary },
  serviceNotes: { fontSize: typography.small, color: colors.textTertiary, marginTop: spacing.xs, lineHeight: 18 },
  raiseTicketBtn: { marginTop: spacing.sm, borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, alignItems: 'center' },
  raiseTicketText: { fontSize: typography.small, fontWeight: '700', color: colors.primary },

  badge: { paddingHorizontal: spacing.xs, paddingVertical: 3, borderRadius: 6, borderWidth: 1 },
  badgeText: { fontSize: 10, fontWeight: '700' },

  historyCard: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: colors.surface, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.sm },
  historyLeft: { flex: 1 },
  historyDate: { fontSize: typography.tiny, color: colors.textTertiary, marginBottom: 2 },
  historyComponent: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },
  historyType: { fontSize: typography.small, color: colors.primary, fontWeight: '600', marginBottom: 4 },
  historyNotes: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 18 },
  historyRight: { alignItems: 'flex-end', gap: spacing.xs },
  historyEngineer: { fontSize: typography.tiny, color: colors.textSecondary },
  historyDoneBadge: { backgroundColor: 'rgba(168,255,53,0.15)', borderRadius: 4, paddingHorizontal: 6, paddingVertical: 2, borderWidth: 1, borderColor: colors.primary },
  historyDoneText: { fontSize: 10, fontWeight: '700', color: colors.primary },

  helpSection: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  helpTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  helpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  helpIcon: { fontSize: 24, marginRight: spacing.sm },
  helpText: { flex: 1 },
  helpCardTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  helpCardDesc: { fontSize: typography.small, color: colors.textSecondary },
  helpArrow: { fontSize: 20, color: colors.textTertiary },
});