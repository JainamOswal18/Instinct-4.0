// app/(customer)/support.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
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
  const [activeTab, setActiveTab] = useState<'tickets' | 'new'>('tickets');
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'technical' | 'billing' | 'general'>('technical');
  const [selectedPriority, setSelectedPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'ticket_1',
      title: 'Solar panel not generating power',
      description: 'My solar panel stopped generating power since yesterday afternoon.',
      status: 'in-progress',
      priority: 'high',
      category: 'technical',
      createdAt: '2026-02-10T10:30:00',
      updatedAt: '2026-02-11T14:20:00',
      responses: 3,
    },
    {
      id: 'ticket_2',
      title: 'Billing discrepancy',
      description: 'I noticed an incorrect charge on my last bill.',
      status: 'resolved',
      priority: 'medium',
      category: 'billing',
      createdAt: '2026-02-05T09:15:00',
      updatedAt: '2026-02-07T16:45:00',
      responses: 5,
    },
    {
      id: 'ticket_3',
      title: 'Request for usage report',
      description: 'Need detailed usage report for last 3 months.',
      status: 'closed',
      priority: 'low',
      category: 'general',
      createdAt: '2026-01-28T11:00:00',
      updatedAt: '2026-01-30T10:30:00',
      responses: 2,
    },
  ]);

  const handleSubmitTicket = () => {
    if (!newTicketTitle.trim() || !newTicketDescription.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const newTicket: Ticket = {
      id: `ticket_${Date.now()}`,
      title: newTicketTitle,
      description: newTicketDescription,
      status: 'open',
      priority: selectedPriority,
      category: selectedCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      responses: 0,
    };

    setTickets([newTicket, ...tickets]);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setActiveTab('tickets');
    
    Alert.alert('Success', 'Your support ticket has been created. We\'ll respond within 24 hours.');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return colors.info;
      case 'in-progress': return colors.warning;
      case 'resolved': return colors.success;
      case 'closed': return colors.textTertiary;
      default: return colors.textSecondary;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return colors.error;
      case 'medium': return colors.warning;
      case 'low': return colors.info;
      default: return colors.textSecondary;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const renderTicket = (ticket: Ticket) => (
    <TouchableOpacity key={ticket.id} style={styles.ticketCard}>
      <View style={styles.ticketHeader}>
        <View style={styles.ticketLeft}>
          <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(ticket.priority) }]} />
          <Text style={styles.ticketTitle}>{ticket.title}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(ticket.status) }]}>
          <Text style={styles.statusText}>{ticket.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text style={styles.ticketDescription} numberOfLines={2}>
        {ticket.description}
      </Text>

      <View style={styles.ticketFooter}>
        <View style={styles.ticketMeta}>
          <Text style={styles.ticketMetaText}>#{ticket.id.slice(-4)}</Text>
          <Text style={styles.ticketMetaDot}>•</Text>
          <Text style={styles.ticketMetaText}>{formatDate(ticket.createdAt)}</Text>
          {ticket.responses && ticket.responses > 0 && (
            <>
              <Text style={styles.ticketMetaDot}>•</Text>
              <Text style={styles.ticketMetaText}>{ticket.responses} responses</Text>
            </>
          )}
        </View>
        <Text style={styles.viewDetails}>View →</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Support</Text>
        <Text style={styles.subtitle}>Get help from our team</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'tickets' && styles.tabActive]}
          onPress={() => setActiveTab('tickets')}
        >
          <Text style={[styles.tabText, activeTab === 'tickets' && styles.tabTextActive]}>
            My Tickets ({tickets.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'new' && styles.tabActive]}
          onPress={() => setActiveTab('new')}
        >
          <Text style={[styles.tabText, activeTab === 'new' && styles.tabTextActive]}>
            New Ticket
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'tickets' ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {tickets.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>📬</Text>
              <Text style={styles.emptyTitle}>No tickets yet</Text>
              <Text style={styles.emptyText}>Create a ticket to get support</Text>
            </View>
          ) : (
            <View style={styles.ticketsContainer}>
              {tickets.map(ticket => renderTicket(ticket))}
            </View>
          )}

          {/* Quick Help */}
          <View style={styles.quickHelpSection}>
            <Text style={styles.quickHelpTitle}>Quick Help</Text>
            
            <TouchableOpacity style={styles.helpCard}>
              <View style={styles.helpIcon}>
                <Text style={styles.helpIconText}>📚</Text>
              </View>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>Help Center</Text>
                <Text style={styles.helpDesc}>Browse FAQs and guides</Text>
              </View>
              <Text style={styles.helpArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpCard}>
              <View style={styles.helpIcon}>
                <Text style={styles.helpIconText}>💬</Text>
              </View>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>Live Chat</Text>
                <Text style={styles.helpDesc}>Chat with support agent</Text>
              </View>
              <Text style={styles.helpArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpCard}>
              <View style={styles.helpIcon}>
                <Text style={styles.helpIconText}>📞</Text>
              </View>
              <View style={styles.helpContent}>
                <Text style={styles.helpTitle}>Call Support</Text>
                <Text style={styles.helpDesc}>1800-123-4567</Text>
              </View>
              <Text style={styles.helpArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.newTicketForm}>
            {/* Category Selection */}
            <Text style={styles.formLabel}>Category</Text>
            <View style={styles.categoryGrid}>
              {(['technical', 'billing', 'general'] as const).map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.categoryCard, selectedCategory === cat && styles.categoryCardActive]}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={styles.categoryEmoji}>
                    {cat === 'technical' ? '🔧' : cat === 'billing' ? '💰' : '💡'}
                  </Text>
                  <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Priority Selection */}
            <Text style={styles.formLabel}>Priority</Text>
            <View style={styles.priorityGrid}>
              {(['low', 'medium', 'high'] as const).map(pri => (
                <TouchableOpacity
                  key={pri}
                  style={[styles.priorityCard, selectedPriority === pri && styles.priorityCardActive]}
                  onPress={() => setSelectedPriority(pri)}
                >
                  <View style={[styles.priorityIndicator, { backgroundColor: getPriorityColor(pri) }]} />
                  <Text style={[styles.priorityText, selectedPriority === pri && styles.priorityTextActive]}>
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Title Input */}
            <Text style={styles.formLabel}>Subject</Text>
            <TextInput
              style={styles.input}
              placeholder="Brief description of your issue"
              placeholderTextColor={colors.textTertiary}
              value={newTicketTitle}
              onChangeText={setNewTicketTitle}
            />

            {/* Description Input */}
            <Text style={styles.formLabel}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Provide detailed information about your issue"
              placeholderTextColor={colors.textTertiary}
              value={newTicketDescription}
              onChangeText={setNewTicketDescription}
              multiline
              numberOfLines={6}
              textAlignVertical="top"
            />

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmitTicket}>
              <Text style={styles.submitButtonText}>Submit Ticket</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  tabText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  ticketsContainer: {
    marginBottom: spacing.lg,
  },
  ticketCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ticketHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  ticketLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: spacing.sm,
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  ticketTitle: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  statusBadge: {
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  ticketDescription: {
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.sm,
  },
  ticketFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ticketMetaText: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
  },
  ticketMetaDot: {
    fontSize: typography.tiny,
    color: colors.textTertiary,
    marginHorizontal: 4,
  },
  viewDetails: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.primary,
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
  quickHelpSection: {
    marginBottom: spacing.xl,
  },
  quickHelpTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  helpCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  helpIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  helpIconText: {
    fontSize: 20,
  },
  helpContent: {
    flex: 1,
  },
  helpTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  helpDesc: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
  },
  helpArrow: {
    fontSize: 20,
    color: colors.textTertiary,
  },
  newTicketForm: {
    marginBottom: spacing.xl,
  },
  formLabel: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  categoryGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  categoryCard: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  categoryCardActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  categoryEmoji: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  categoryText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  categoryTextActive: {
    color: colors.primary,
  },
  priorityGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priorityCardActive: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primary,
  },
  priorityIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  priorityText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  priorityTextActive: {
    color: colors.primary,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    fontSize: typography.body,
    color: colors.textPrimary,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  submitButtonText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});