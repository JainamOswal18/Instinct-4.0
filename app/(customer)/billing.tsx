// app/(customer)/billing.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';
import { useRouter } from 'expo-router';

interface BillItem {
  id: string;
  month: string;
  totalAmount: number;
  subscriptionFee: number;
  usageCharge: number;
  taxes: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  paidDate?: string;
}

interface Transaction {
  id: string;
  date: string;
  amount: number;
  description: string;
  type: 'payment' | 'refund' | 'adjustment';
  method: 'UPI' | 'Card' | 'Bank Transfer';
}

export default function Billing() {
  const [activeTab, setActiveTab] = useState<'current' | 'history'>('current');

  const currentBill: BillItem = {
    id: 'bill_current',
    month: 'February 2026',
    totalAmount: 2850,
    subscriptionFee: 3500,
    usageCharge: -850, // Credit from solar generation
    taxes: 200,
    status: 'pending',
    dueDate: '2026-02-28',
  };

  const billHistory: BillItem[] = [
    {
      id: 'bill_1',
      month: 'January 2026',
      totalAmount: 3200,
      subscriptionFee: 3500,
      usageCharge: -500,
      taxes: 200,
      status: 'paid',
      dueDate: '2026-01-31',
      paidDate: '2026-01-25',
    },
    {
      id: 'bill_2',
      month: 'December 2025',
      totalAmount: 3450,
      subscriptionFee: 3500,
      usageCharge: -250,
      taxes: 200,
      status: 'paid',
      dueDate: '2025-12-31',
      paidDate: '2025-12-28',
    },
    {
      id: 'bill_3',
      month: 'November 2025',
      totalAmount: 3100,
      subscriptionFee: 3500,
      usageCharge: -600,
      taxes: 200,
      status: 'paid',
      dueDate: '2025-11-30',
      paidDate: '2025-11-27',
    },
  ];

  const transactions: Transaction[] = [
    {
      id: 'txn_1',
      date: '2026-01-25',
      amount: 3200,
      description: 'January 2026 Bill Payment',
      type: 'payment',
      method: 'UPI',
    },
    {
      id: 'txn_2',
      date: '2025-12-28',
      amount: 3450,
      description: 'December 2025 Bill Payment',
      type: 'payment',
      method: 'Card',
    },
  ];

  const handlePayNow = () => {
    Alert.alert(
      'Payment',
      'Choose payment method',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'UPI', onPress: () => Alert.alert('Success', 'Payment via UPI initiated') },
        { text: 'Card', onPress: () => Alert.alert('Success', 'Redirecting to card payment...') },
      ]
    );
  };

  const downloadBill = (billId: string) => {
    Alert.alert('Download', `Bill PDF downloaded to your device`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return colors.success;
      case 'pending': return colors.warning;
      case 'overdue': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const daysUntilDue = () => {
    const today = new Date();
    const due = new Date(currentBill.dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const router = useRouter();


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Billing & Payments</Text>
        <Text style={styles.subtitle}>Transparent billing with itemized invoices</Text>

        {/* Current Bill Card */}
        <View style={styles.currentBillCard}>
          <LinearGradient
            colors={[colors.primary, colors.accentSecondary]}
            style={styles.billGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text style={styles.billMonth}>{currentBill.month}</Text>
            <Text style={styles.billAmount}>₹{currentBill.totalAmount.toLocaleString()}</Text>
            <Text style={styles.billDue}>Due in {daysUntilDue()} days</Text>
            
            <TouchableOpacity style={styles.payButton} onPress={handlePayNow}>
              <Text style={styles.payButtonText}>Pay Now</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backArrow}>←</Text>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </View>

        {/* Bill Breakdown */}
        <View style={styles.breakdownCard}>
          <Text style={styles.breakdownTitle}>Bill Breakdown</Text>
          
          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Subscription Fee</Text>
            <Text style={styles.breakdownValue}>₹{currentBill.subscriptionFee.toLocaleString()}</Text>
          </View>

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Usage Charge</Text>
            <Text style={[
              styles.breakdownValue,
              currentBill.usageCharge < 0 && styles.breakdownCredit
            ]}>
              {currentBill.usageCharge < 0 ? '-' : ''}₹{Math.abs(currentBill.usageCharge).toLocaleString()}
            </Text>
          </View>

          {currentBill.usageCharge < 0 && (
            <View style={styles.creditNote}>
              <Text style={styles.creditNoteText}>
                💡 You generated more solar energy than you consumed!
              </Text>
            </View>
          )}

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabel}>Taxes & Fees</Text>
            <Text style={styles.breakdownValue}>₹{currentBill.taxes.toLocaleString()}</Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.breakdownRow}>
            <Text style={styles.breakdownLabelTotal}>Total Amount</Text>
            <Text style={styles.breakdownValueTotal}>₹{currentBill.totalAmount.toLocaleString()}</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'current' && styles.tabActive]}
            onPress={() => setActiveTab('current')}
          >
            <Text style={[styles.tabText, activeTab === 'current' && styles.tabTextActive]}>
              Current
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.tabActive]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
              History
            </Text>
          </TouchableOpacity>
        </View>

        {/* Content based on active tab */}
        {activeTab === 'current' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Payment Methods</Text>
            
            <TouchableOpacity style={styles.paymentMethod}>
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIcon}>
                  <Text style={styles.paymentIconText}>💳</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>Credit/Debit Card</Text>
                  <Text style={styles.paymentDesc}>Visa, Mastercard, RuPay</Text>
                </View>
              </View>
              <Text style={styles.paymentArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentMethod}>
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIcon}>
                  <Text style={styles.paymentIconText}>📱</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>UPI</Text>
                  <Text style={styles.paymentDesc}>PhonePe, GPay, Paytm</Text>
                </View>
              </View>
              <Text style={styles.paymentArrow}>→</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.paymentMethod}>
              <View style={styles.paymentLeft}>
                <View style={styles.paymentIcon}>
                  <Text style={styles.paymentIconText}>🏦</Text>
                </View>
                <View>
                  <Text style={styles.paymentName}>Net Banking</Text>
                  <Text style={styles.paymentDesc}>All major banks</Text>
                </View>
              </View>
              <Text style={styles.paymentArrow}>→</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Past Bills</Text>
            
            {billHistory.map(bill => (
              <View key={bill.id} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <View>
                    <Text style={styles.historyMonth}>{bill.month}</Text>
                    <Text style={styles.historyDate}>
                      Paid on {bill.paidDate ? formatDate(bill.paidDate) : 'N/A'}
                    </Text>
                  </View>
                  <View style={styles.historyRight}>
                    <Text style={styles.historyAmount}>₹{bill.totalAmount.toLocaleString()}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(bill.status) }]}>
                      <Text style={styles.statusText}>{bill.status.toUpperCase()}</Text>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.downloadButton}
                  onPress={() => downloadBill(bill.id)}
                >
                  <Text style={styles.downloadText}>Download PDF</Text>
                </TouchableOpacity>
              </View>
            ))}

            {/* Transactions */}
            <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Recent Transactions</Text>
            
            {transactions.map(txn => (
              <View key={txn.id} style={styles.transactionCard}>
                <View style={styles.transactionLeft}>
                  <Text style={styles.transactionDesc}>{txn.description}</Text>
                  <Text style={styles.transactionDate}>{formatDate(txn.date)} • {txn.method}</Text>
                </View>
                <Text style={styles.transactionAmount}>₹{txn.amount.toLocaleString()}</Text>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  backArrow: {
    fontSize: 18,
    marginRight: 6,
    color: colors.textPrimary,
},
  backText: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerContainer: {
    marginBottom: spacing.md,
},
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
  currentBillCard: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  billGradient: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  billMonth: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.primaryDark,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  billAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: spacing.xs,
  },
  billDue: {
    fontSize: typography.small,
    color: colors.primaryDark,
    opacity: 0.8,
    marginBottom: spacing.md,
  },
  payButton: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
  },
  payButtonText: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.primary,
  },
  breakdownCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
  },
  breakdownTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  breakdownLabel: {
    fontSize: typography.small,
    color: colors.textSecondary,
  },
  breakdownValue: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  breakdownCredit: {
    color: colors.success,
  },
  creditNote: {
    backgroundColor: colors.primaryLight,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
    marginVertical: spacing.xs,
  },
  creditNoteText: {
    fontSize: typography.tiny,
    color: colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.sm,
  },
  breakdownLabelTotal: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  breakdownValueTotal: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  tabContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
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
  section: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  paymentIconText: {
    fontSize: 20,
  },
  paymentName: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  paymentDesc: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
  },
  paymentArrow: {
    fontSize: 20,
    color: colors.textTertiary,
  },
  historyCard: {
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.sm,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  historyMonth: {
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  historyDate: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
  },
  historyRight: {
    alignItems: 'flex-end',
  },
  historyAmount: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
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
  downloadButton: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    alignItems: 'center',
  },
  downloadText: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.primary,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xs,
  },
  transactionLeft: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: typography.tiny,
    color: colors.textSecondary,
  },
  transactionAmount: {
    fontSize: typography.body,
    fontWeight: '700',
    color: colors.textPrimary,
  },
});