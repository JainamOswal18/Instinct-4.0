// app/(customer)/billing.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCurrentProperty } from '../../store/useAuthStore';
import apiWrapper from '../../services/apiWrapper';
import { Toast } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function Billing() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');
  const [currentBill, setCurrentBill] = useState<any>(null);
  const [billHistory, setBillHistory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toastError, setToastError] = useState<string | null>(null);

  useEffect(() => { loadBilling(); }, []);

  const loadBilling = async () => {
    setIsLoading(true);
    try {
      const [currentRes, historyRes] = await Promise.all([
        apiWrapper.billing.getCurrentBill(currentProperty?.id ?? ''),
        apiWrapper.billing.getHistory(currentProperty?.id ?? ''),
      ]);
      if (currentRes?.data) setCurrentBill(currentRes.data);
      if (historyRes?.data?.bills) setBillHistory(historyRes.data.bills);
    } catch (e: any) {
      setToastError(e?.message || 'Failed to load billing data.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayNow = () => {
    // Route to payment screen with current bill context
    router.push('/(onboarding)/payment');
  };

  const handleDownload = async (billId: string) => {
    try {
      await apiWrapper.billing.downloadPDF(billId);
    } catch {
      setToastError('PDF download is not available yet.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':    return colors.success ?? colors.primary;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default:        return colors.textSecondary;
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch { return dateStr; }
  };

  const daysUntilDue = (dueDate: string) => {
    const diff = new Date(dueDate).getTime() - Date.now();
    return Math.ceil(diff / 86400000);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Toast message={toastError} onDismiss={() => setToastError(null)} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header — back to profile */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(customer)/profile')} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Profile</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Billing & Payments</Text>
          <Text style={styles.subtitle}>Transparent billing with itemized invoices</Text>
        </View>

        {/* Current Bill Card */}
        {currentBill && (
          <View style={styles.currentBillCard}>
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.billGradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            >
              <Text style={styles.billMonth}>{currentBill.month}</Text>
              <Text style={styles.billAmount}>₹{(currentBill.totalAmount ?? 0).toLocaleString()}</Text>
              {currentBill.dueDate && (
                <Text style={styles.billDue}>
                  {daysUntilDue(currentBill.dueDate) >= 0
                    ? `Due in ${daysUntilDue(currentBill.dueDate)} days`
                    : 'Overdue'}
                </Text>
              )}
              {currentBill.status === 'pending' && (
                <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
                  <Text style={styles.payButtonText}>Pay Now</Text>
                </TouchableOpacity>
              )}
            </LinearGradient>
          </View>
        )}

        {/* Bill Breakdown */}
        {currentBill && (
          <View style={styles.breakdownCard}>
            <Text style={styles.breakdownTitle}>Bill Breakdown</Text>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Subscription Fee</Text>
              <Text style={styles.breakdownValue}>₹{(currentBill.subscriptionFee ?? 0).toLocaleString()}</Text>
            </View>
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Usage Charge</Text>
              <Text style={[styles.breakdownValue, (currentBill.usageCharge ?? 0) < 0 && styles.breakdownCredit]}>
                {(currentBill.usageCharge ?? 0) < 0 ? '-' : ''}₹{Math.abs(currentBill.usageCharge ?? 0).toLocaleString()}
              </Text>
            </View>
            {(currentBill.usageCharge ?? 0) < 0 && (
              <View style={styles.creditNote}>
                <Text style={styles.creditNoteText}>💡 You generated more solar energy than you consumed!</Text>
              </View>
            )}
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabel}>Taxes & Fees</Text>
              <Text style={styles.breakdownValue}>₹{(currentBill.taxes ?? 0).toLocaleString()}</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.breakdownRow}>
              <Text style={styles.breakdownLabelTotal}>Total</Text>
              <Text style={styles.breakdownValueTotal}>₹{(currentBill.totalAmount ?? 0).toLocaleString()}</Text>
            </View>
          </View>
        )}

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {(['current', 'history'] as const).map(tab => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.tabActive]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'current' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            {[
              { icon: '💳', name: 'Credit/Debit Card', desc: 'Visa, Mastercard, RuPay' },
              { icon: '📱', name: 'UPI',                desc: 'PhonePe, GPay, Paytm'   },
              { icon: '🏦', name: 'Net Banking',        desc: 'All major banks'         },
            ].map(m => (
              <TouchableOpacity key={m.name} style={styles.paymentMethod} onPress={handlePayNow}>
                <View style={styles.paymentLeft}>
                  <View style={styles.paymentIcon}><Text style={styles.paymentIconText}>{m.icon}</Text></View>
                  <View>
                    <Text style={styles.paymentName}>{m.name}</Text>
                    <Text style={styles.paymentDesc}>{m.desc}</Text>
                  </View>
                </View>
                <Text style={styles.paymentArrow}>→</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Bills</Text>
            {billHistory.length === 0 ? (
              <Text style={styles.emptyText}>No billing history yet.</Text>
            ) : billHistory.map((bill: any) => (
              <View key={bill.billId ?? bill.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View>
                    <Text style={styles.historyMonth}>{bill.month}</Text>
                    <Text style={styles.historyDate}>
                      {bill.paidDate ? `Paid ${formatDate(bill.paidDate)}` : `Due ${formatDate(bill.dueDate)}`}
                    </Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyAmount}>₹{(bill.totalAmount ?? 0).toLocaleString()}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bill.status) }]}>
                      <Text style={styles.statusText}>{(bill.status ?? '').toUpperCase()}</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.downloadButton} onPress={() => handleDownload(bill.billId ?? bill.id)}>
                  <Text style={styles.downloadText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1, padding: spacing.md },
  header: { marginBottom: spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', marginBottom: spacing.md },
  backArrow: { fontSize: 24, color: colors.primary, marginRight: spacing.xs },
  backText: { fontSize: typography.body, color: colors.primary, fontWeight: '600' },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.small, color: colors.textSecondary },
  emptyText: { fontSize: typography.body, color: colors.textSecondary, textAlign: 'center', paddingVertical: spacing.xl },

  currentBillCard: { borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.lg },
  billGradient: { padding: spacing.lg, alignItems: 'center' },
  billMonth: { fontSize: typography.body, fontWeight: '600', color: colors.primaryDark, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs },
  billAmount: { fontSize: 48, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.xs },
  billDue: { fontSize: typography.small, color: colors.primaryDark, opacity: 0.8, marginBottom: spacing.md },
  payButton: { backgroundColor: colors.primaryDark, paddingHorizontal: spacing.xl, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  payButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primary },

  breakdownCard: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  breakdownTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.md },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm },
  breakdownLabel: { fontSize: typography.small, color: colors.textSecondary },
  breakdownValue: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary },
  breakdownCredit: { color: colors.primary },
  creditNote: { backgroundColor: colors.primaryLight, padding: spacing.sm, borderRadius: borderRadius.sm, marginVertical: spacing.xs },
  creditNoteText: { fontSize: typography.tiny, color: colors.primary },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  breakdownLabelTotal: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },
  breakdownValueTotal: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary },

  tabContainer: { flexDirection: 'row', gap: spacing.sm, marginBottom: spacing.lg },
  tab: { flex: 1, paddingVertical: spacing.sm, borderRadius: borderRadius.sm, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  tabActive: { backgroundColor: colors.primaryLight, borderColor: colors.primary },
  tabText: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary },
  tabTextActive: { color: colors.primary },

  section: { marginBottom: spacing.xl },
  sectionTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.md },
  paymentMethod: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  paymentLeft: { flexDirection: 'row', alignItems: 'center' },
  paymentIcon: { width: 40, height: 40, borderRadius: borderRadius.sm, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  paymentIconText: { fontSize: 20 },
  paymentName: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  paymentDesc: { fontSize: typography.tiny, color: colors.textSecondary },
  paymentArrow: { fontSize: 20, color: colors.textTertiary },

  historyCard: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.sm },
  historyHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: spacing.sm },
  historyMonth: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  historyDate: { fontSize: typography.tiny, color: colors.textSecondary },
  historyRight: { alignItems: 'flex-end' },
  historyAmount: { fontSize: typography.body, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  statusBadge: { paddingHorizontal: spacing.xs, paddingVertical: 2, borderRadius: 4 },
  statusText: { fontSize: 10, fontWeight: '700', color: '#fff' },
  downloadButton: { borderTopWidth: 1, borderTopColor: colors.border, paddingTop: spacing.sm, alignItems: 'center' },
  downloadText: { fontSize: typography.small, fontWeight: '600', color: colors.primary },
});