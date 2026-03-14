// app/(customer)/support.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useCurrentProperty } from '../../store/useAuthStore';
import apiWrapper from '../../services/apiWrapper';
import { InlineError, Toast } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  category: 'technical' | 'billing' | 'general';
  createdAt: string;
  updatedAt: string;
  responses?: number;
}

export default function Support() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();

  const [activeTab, setActiveTab]       = useState<'tickets' | 'new'>('tickets');
  const [tickets, setTickets]           = useState<Ticket[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError]       = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<string | null>(null);
  const [toastError, setToastError]     = useState<string | null>(null);

  const [title, setTitle]                 = useState('');
  const [description, setDescription]     = useState('');
  const [category, setCategory]           = useState<'technical' | 'billing' | 'general'>('technical');
  const [priority, setPriority]           = useState<'low' | 'medium' | 'high'>('medium');

  useEffect(() => { loadTickets(); }, []);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const res = await apiWrapper.support.getTickets();
      if (res?.data?.tickets) setTickets(res.data.tickets);
    } catch (e: any) {
      setToastError('Could not load tickets — showing cached data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    setFormError(null);
    if (!title.trim())       { setFormError('Subject is required'); return; }
    if (!description.trim()) { setFormError('Description is required'); return; }

    setIsSubmitting(true);
    try {
      await apiWrapper.support.createTicket(
        currentProperty?.id ?? '',
        category,
        priority,
        title.trim(),
        description.trim()
      );
      setTitle('');
      setDescription('');
      setToastSuccess('Ticket created — we will respond within 24 hours.');
      setActiveTab('tickets');
      loadTickets(); // refresh list
    } catch (e: any) {
      setFormError(e?.message || 'Failed to create ticket. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStatusColor = (s: string) => {
    switch (s) {
      case 'open':        return colors.info ?? colors.primary;
      case 'in-progress': return colors.warning;
      case 'resolved':    return colors.success ?? colors.primary;
      case 'closed':      return colors.textTertiary;
      default:            return colors.textSecondary;
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high':   return colors.error;
      case 'medium': return colors.warning;
      case 'low':    return colors.info ?? colors.primary;
      default:       return colors.textSecondary;
    }
  };

  const formatDate = (d: string) => {
    try { return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }); }
    catch { return d; }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Toast message={toastSuccess} type="success" onDismiss={() => setToastSuccess(null)} />
      <Toast message={toastError}   type="error"   onDismiss={() => setToastError(null)} />

      {/* Header — back to profile */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/(customer)/profile')} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Profile</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.subtitle}>Get help from our team</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        {(['tickets', 'new'] as const).map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'tickets' ? `My Tickets (${tickets.length})` : 'New Ticket'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {activeTab === 'tickets' ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {isLoading ? (
            <Text style={styles.loadingText}>Loading tickets…</Text>
          ) : tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📬</Text>
              <Text style={styles.emptyTitle}>No tickets yet</Text>
              <Text style={styles.emptyText}>Create a ticket to get support from our team.</Text>
            </View>
          ) : (
            <View style={styles.ticketsContainer}>
              {tickets.map(ticket => {
                const responseCount = ticket.responses ?? 0;
                return (
                  <TouchableOpacity key={ticket.id} style={styles.ticketCard}>
                    <View style={styles.ticketHeader}>
                      <View style={styles.ticketLeft}>
                        <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(ticket.priority) }]} />
                        <Text style={styles.ticketTitle}>{ticket.title}</Text>
                      </View>
                      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) + '22', borderColor: getStatusColor(ticket.status), borderWidth: 1 }]}>
                        <Text style={[styles.statusText, { color: getStatusColor(ticket.status) }]}>
                          {ticket.status.toUpperCase().replace('-', ' ')}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.ticketDescription} numberOfLines={2}>{ticket.description}</Text>
                    <View style={styles.ticketFooter}>
                      <View style={styles.ticketMeta}>
                        <Text style={styles.ticketMetaText}>#{(ticket.id ?? '').slice(-4)}</Text>
                        <Text style={styles.ticketMetaDot}>•</Text>
                        <Text style={styles.ticketMetaText}>{formatDate(ticket.createdAt)}</Text>
                        {responseCount > 0 && (
                          <>
                            <Text style={styles.ticketMetaDot}>•</Text>
                            <Text style={styles.ticketMetaText}>{responseCount} {responseCount === 1 ? 'response' : 'responses'}</Text>
                          </>
                        )}
                      </View>
                      <Text style={styles.viewDetails}>View →</Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}

          {/* Quick help */}
          <View style={styles.quickHelpSection}>
            <Text style={styles.quickHelpTitle}>Quick Help</Text>
            {[
              { icon: '📚', title: 'Help Center',   desc: 'Browse FAQs and guides' },
              { icon: '💬', title: 'Live Chat',      desc: 'Chat with a support agent' },
              { icon: '📞', title: 'Call Support',   desc: '1800-123-4567' },
            ].map(item => (
              <TouchableOpacity key={item.title} style={styles.helpCard}>
                <View style={styles.helpIcon}><Text style={styles.helpIconText}>{item.icon}</Text></View>
                <View style={styles.helpContent}>
                  <Text style={styles.helpTitle}>{item.title}</Text>
                  <Text style={styles.helpDesc}>{item.desc}</Text>
                </View>
                <Text style={styles.helpArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.newTicketForm}>
            <InlineError message={formError} onDismiss={() => setFormError(null)} />

            <Text style={styles.formLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {(['technical', 'billing', 'general'] as const).map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryCard, category === cat && styles.categoryCardActive]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={styles.categoryEmoji}>
                    {cat === 'technical' ? '🔧' : cat === 'billing' ? '💰' : '💡'}
                  </Text>
                  <Text style={[styles.categoryText, category === cat && styles.categoryTextActive]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.formLabel}>Priority</Text>
            <View style={styles.priorityGrid}>
              {(['low', 'medium', 'high'] as const).map(pri => (
                <TouchableOpacity
                  key={pri}
                  style={[styles.priorityCard, priority === pri && styles.priorityCardActive]}
                  onPress={() => setPriority(pri)}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(pri) }]} />
                  <Text style={[styles.priorityText, priority === pri && styles.priorityTextActive]}>
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.formLabel}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief description of your issue"
              placeholderTextColor={colors.textTertiary}
              value={title}
              onChangeText={t => { setTitle(t); setFormError(null); }}
            />

            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide detailed information about your issue"
              placeholderTextColor={colors.textTertiary}
              value={description}
              onChangeText={t => { setDescription(t); setFormError(null); }}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>{isSubmitting ? 'Submitting…' : 'Submit Ticket'}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: spacing.md, paddingTop: spacing.md, paddingBottom: spacing.sm },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm },
  backArrow: { fontSize: 24, color: colors.primary, marginRight: spacing.xs },
  backText: { fontSize: typography.body, color: colors.primary, fontWeight: '600' },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary },
  subtitle: { fontSize: typography.small, color: colors.textSecondary, marginTop: 2 },
  loadingText: { textAlign: 'center', paddingVertical: spacing.xl, color: colors.textSecondary },

  tabContainer: { flexDirection: 'row', paddingHorizontal: spacing.md, marginBottom: spacing.md, gap: spacing.sm },
  tab: { flex: 1, paddingVertical: spacing.sm, borderRadius: borderRadius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  tabText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  tabTextActive: { color: colors.primary },
  scrollView: { flex: 1, paddingHorizontal: spacing.md },

  ticketsContainer: { marginBottom: spacing.lg },
  ticketCard: { backgroundColor: colors.surface, borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.sm, borderWidth: 1, borderColor: colors.border },
  ticketHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: spacing.sm },
  ticketLeft: { flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: spacing.sm },
  priorityDot: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.sm, flexShrink: 0 },
  ticketTitle: { flex: 1, fontSize: typography.body, fontWeight: '600', color: colors.textPrimary },
  statusBadge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '700' },
  ticketDescription: { fontSize: typography.small, color: colors.textSecondary, lineHeight: 20, marginBottom: spacing.sm },
  ticketFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ticketMeta: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
  ticketMetaText: { fontSize: typography.tiny, color: colors.textTertiary },
  ticketMetaDot: { fontSize: typography.tiny, color: colors.textTertiary, marginHorizontal: 4 },
  viewDetails: { fontSize: typography.small, fontWeight: '600', color: colors.primary },

  emptyState: { alignItems: 'center', paddingVertical: spacing.xxl },
  emptyIcon: { fontSize: 48, marginBottom: spacing.md },
  emptyTitle: { fontSize: typography.h4, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.xs },
  emptyText: { fontSize: typography.small, color: colors.textSecondary },

  quickHelpSection: { marginBottom: spacing.xl },
  quickHelpTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.md },
  helpCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  helpIcon: { width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  helpIconText: { fontSize: 20 },
  helpContent: { flex: 1 },
  helpTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  helpDesc: { fontSize: typography.tiny, color: colors.textSecondary },
  helpArrow: { fontSize: 20, color: colors.textTertiary },

  newTicketForm: { marginBottom: spacing.xl },
  formLabel: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.sm, marginTop: spacing.md },
  categoryGrid: { flexDirection: 'row', gap: spacing.sm },
  categoryCard: { flex: 1, backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  categoryCardActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  categoryEmoji: { fontSize: 24, marginBottom: spacing.xs },
  categoryText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  categoryTextActive: { color: colors.primary },
  priorityGrid: { flexDirection: 'row', gap: spacing.sm },
  priorityCard: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.surface, padding: spacing.sm, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border },
  priorityCardActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  priorityIndicator: { width: 8, height: 8, borderRadius: 4, marginRight: spacing.xs },
  priorityText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  priorityTextActive: { color: colors.primary },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: typography.body, color: colors.textPrimary },
  textArea: { height: 120, textAlignVertical: 'top' },
  submitButton: { backgroundColor: colors.primary, padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center', marginTop: spacing.lg },
  submitButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primaryDark },
});