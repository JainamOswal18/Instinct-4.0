// app/(onboarding)/payment.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, Alert, ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore, useCurrentProperty } from '../../store/useAuthStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import apiWrapper from '../../services/apiWrapper';
import { InlineError } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

type PaymentMethod = 'UPI' | 'Card' | 'NetBanking';

export default function PaymentScreen() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { updateSubscriptionStatus, updateInstallationProgress } = useAuthStore();
  const { addNotification } = useNotificationStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [upiId, setUpiId]           = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV]       = useState('');
  const [cardName, setCardName]     = useState('');
  const [bankName, setBankName]     = useState('');

  const proposal = currentProperty?.proposedPlan;

  if (!proposal || !currentProperty) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No payment details found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const totalAmount = (proposal.monthlyFee ?? 0) + (proposal.securityDeposit ?? 0);

  const validate = (): boolean => {
    setFormError(null);
    switch (selectedMethod) {
      case 'UPI':
        if (!upiId.trim())      { setFormError('Please enter your UPI ID'); return false; }
        if (!upiId.includes('@')) { setFormError('Please enter a valid UPI ID (e.g., username@upi)'); return false; }
        break;
      case 'Card':
        if (cardNumber.length < 16) { setFormError('Please enter a valid 16-digit card number'); return false; }
        if (!cardExpiry.includes('/')) { setFormError('Please enter expiry date in MM/YY format'); return false; }
        if (cardCVV.length < 3)     { setFormError('Please enter a valid CVV'); return false; }
        if (!cardName.trim())       { setFormError('Please enter the cardholder name'); return false; }
        break;
      case 'NetBanking':
        if (!bankName) { setFormError('Please select your bank'); return false; }
        break;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validate()) return;
    setIsProcessing(true);

    try {
      // Step 1 — Initiate payment
      const initiateRes = await apiWrapper.payment.initiate(
        currentProperty.id,
        proposal.id,
        selectedMethod,
        totalAmount
      );

      if (!initiateRes?.success && !initiateRes?.data) {
        throw new Error('Payment initiation failed. Please try again.');
      }

      const paymentId = initiateRes?.data?.paymentId ?? `pay_${Date.now()}`;
      const orderId   = initiateRes?.data?.orderId   ?? `order_${Date.now()}`;

      // Step 2 — Verify payment (mock signature in dev)
      const verifyRes = await apiWrapper.payment.verify(paymentId, orderId, 'mock_signature');

      if (verifyRes?.data?.status === 'SUCCESS' || verifyRes?.success) {
        const txnId = verifyRes?.data?.transactionId ?? `TXN${Date.now()}`;

        // Step 3 — Update local state
        updateSubscriptionStatus(currentProperty.id, 'PENDING_INSTALLATION');
        updateInstallationProgress(currentProperty.id, {
          paymentConfirmed: true,
          engineerAssigned: false,
          siteSurveyScheduled: false,
          installationStarted: false,
          systemActivated: false,
        });

        // Step 4 — Notifications
        addNotification({
          type: 'success',
          title: 'Payment Confirmed! 💳',
          message: `₹${totalAmount.toLocaleString()} received. Transaction ID: ${txnId}`,
          read: false, dismissible: true, persistent: false,
        });
        addNotification({
          type: 'info',
          title: 'Installation Scheduled',
          message: 'Our team will call you within 24 hours to confirm a convenient installation time.',
          read: false, dismissible: false, persistent: true,
          action: { label: 'Track Progress', route: '/(installation)/progress' },
        });

        // Step 5 — Navigate
        Alert.alert(
          'Payment Successful! 🎉',
          `₹${totalAmount.toLocaleString()} confirmed.\nTransaction: ${txnId}\n\nOur team will contact you within 24 hours.`,
          [{ text: 'Track Installation', onPress: () => router.replace('/') }]
        );
      } else {
        throw new Error((verifyRes as any)?.error?.message || 'Payment verification failed.');
      }
    } catch (error: any) {
      console.error('Payment error:', error);
      setFormError(error?.message || 'Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatExpiry = (text: string) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length >= 2) return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    return cleaned;
  };

  const methods: { key: PaymentMethod; icon: string; label: string; desc: string }[] = [
    { key: 'UPI',        icon: '📱', label: 'UPI',                 desc: 'PhonePe, GPay, Paytm'   },
    { key: 'Card',       icon: '💳', label: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
    { key: 'NetBanking', icon: '🏦', label: 'Net Banking',         desc: 'All major banks'         },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Payment</Text>
          <Text style={styles.subtitle}>Complete your subscription</Text>
        </View>

        {/* Amount card */}
        <View style={styles.amountCard}>
          <LinearGradient colors={[colors.primary, colors.accentSecondary]} style={styles.amountGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.amountLabel}>Total Amount</Text>
            <Text style={styles.amountValue}>₹{totalAmount.toLocaleString()}</Text>
            <View style={styles.amountBreakdown}>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>First Month Fee</Text>
                <Text style={styles.breakdownText}>₹{proposal.monthlyFee.toLocaleString()}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={styles.breakdownText}>Security Deposit</Text>
                <Text style={styles.breakdownText}>₹{proposal.securityDeposit.toLocaleString()}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Error banner */}
        <View style={{ paddingHorizontal: spacing.md }}>
          <InlineError message={formError} onDismiss={() => setFormError(null)} />
        </View>

        {/* Method selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Payment Method</Text>
          {methods.map(m => (
            <TouchableOpacity
              key={m.key}
              style={[styles.methodCard, selectedMethod === m.key && styles.methodCardActive]}
              onPress={() => { setSelectedMethod(m.key); setFormError(null); }}
            >
              <View style={styles.methodLeft}>
                <View style={styles.methodIcon}><Text style={styles.methodIconText}>{m.icon}</Text></View>
                <View>
                  <Text style={styles.methodName}>{m.label}</Text>
                  <Text style={styles.methodDesc}>{m.desc}</Text>
                </View>
              </View>
              <View style={[styles.radioButton, selectedMethod === m.key && styles.radioButtonActive]}>
                {selectedMethod === m.key && <View style={styles.radioButtonInner} />}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Payment form */}
        <View style={styles.formSection}>
          {selectedMethod === 'UPI' && (
            <>
              <Text style={styles.formLabel}>UPI ID</Text>
              <TextInput style={styles.input} placeholder="yourname@upi" placeholderTextColor={colors.textTertiary} value={upiId} onChangeText={v => { setUpiId(v); setFormError(null); }} keyboardType="email-address" autoCapitalize="none" />
              <Text style={styles.formHint}>e.g., 9876543210@paytm</Text>
            </>
          )}
          {selectedMethod === 'Card' && (
            <>
              <Text style={styles.formLabel}>Card Number</Text>
              <TextInput style={styles.input} placeholder="1234 5678 9012 3456" placeholderTextColor={colors.textTertiary} value={cardNumber} onChangeText={t => { const c = t.replace(/\D/g, ''); if (c.length <= 16) setCardNumber(c); setFormError(null); }} keyboardType="number-pad" maxLength={16} />
              <View style={styles.formRow}>
                <View style={styles.formHalf}>
                  <Text style={styles.formLabel}>Expiry</Text>
                  <TextInput style={styles.input} placeholder="MM/YY" placeholderTextColor={colors.textTertiary} value={cardExpiry} onChangeText={t => { const f = formatExpiry(t); if (f.length <= 5) setCardExpiry(f); setFormError(null); }} keyboardType="number-pad" maxLength={5} />
                </View>
                <View style={styles.formHalf}>
                  <Text style={styles.formLabel}>CVV</Text>
                  <TextInput style={styles.input} placeholder="123" placeholderTextColor={colors.textTertiary} value={cardCVV} onChangeText={t => { const c = t.replace(/\D/g, ''); if (c.length <= 3) setCardCVV(c); setFormError(null); }} keyboardType="number-pad" maxLength={3} secureTextEntry />
                </View>
              </View>
              <Text style={styles.formLabel}>Cardholder Name</Text>
              <TextInput style={styles.input} placeholder="Name on card" placeholderTextColor={colors.textTertiary} value={cardName} onChangeText={v => { setCardName(v); setFormError(null); }} autoCapitalize="words" />
            </>
          )}
          {selectedMethod === 'NetBanking' && (
            <>
              <Text style={styles.formLabel}>Select Your Bank</Text>
              {['HDFC Bank', 'ICICI Bank', 'State Bank of India', 'Axis Bank', 'Kotak Mahindra'].map(bank => (
                <TouchableOpacity key={bank} style={[styles.bankOption, bankName === bank && styles.bankOptionActive]} onPress={() => { setBankName(bank); setFormError(null); }}>
                  <Text style={[styles.bankName, bankName === bank && styles.bankNameActive]}>{bank}</Text>
                  <View style={[styles.radioButton, bankName === bank && styles.radioButtonActive]}>
                    {bankName === bank && <View style={styles.radioButtonInner} />}
                  </View>
                </TouchableOpacity>
              ))}
            </>
          )}
        </View>

        {/* Security note */}
        <View style={styles.securityNote}>
          <Text style={styles.securityIcon}>🔒</Text>
          <Text style={styles.securityText}>Your payment information is encrypted and secure</Text>
        </View>

        {/* Pay button */}
        <TouchableOpacity style={[styles.payButton, isProcessing && styles.payButtonDisabled]} onPress={handlePayment} disabled={isProcessing} activeOpacity={0.8}>
          <LinearGradient colors={[colors.primary, colors.accentSecondary]} style={styles.payGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
            {isProcessing
              ? <ActivityIndicator color={colors.primaryDark} />
              : <>
                  <Text style={styles.payButtonText}>Pay ₹{totalAmount.toLocaleString()}</Text>
                  <Text style={styles.payButtonSubtext}>via {selectedMethod}</Text>
                </>
            }
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.termsText}>By proceeding, you agree to our Terms & Conditions and Privacy Policy.</Text>
        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1 },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: spacing.xl },
  errorText: { fontSize: typography.h3, color: colors.textSecondary, marginBottom: spacing.lg },
  backButton: { backgroundColor: colors.primary, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  backButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primaryDark },
  header: { padding: spacing.md },
  backBtn: { padding: spacing.xs, marginLeft: -spacing.xs, marginBottom: spacing.sm },
  backArrow: { fontSize: 24, color: colors.primary },
  title: { fontSize: typography.h1, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },
  amountCard: { marginHorizontal: spacing.md, marginBottom: spacing.lg, borderRadius: borderRadius.lg, overflow: 'hidden' },
  amountGradient: { padding: spacing.xl, alignItems: 'center' },
  amountLabel: { fontSize: typography.small, fontWeight: '600', color: colors.primaryDark, textTransform: 'uppercase', letterSpacing: 1, marginBottom: spacing.xs },
  amountValue: { fontSize: 56, fontWeight: '700', color: colors.primaryDark, marginBottom: spacing.md },
  amountBreakdown: { backgroundColor: 'rgba(0,0,0,0.1)', padding: spacing.sm, borderRadius: borderRadius.sm, width: '100%' },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
  breakdownText: { fontSize: typography.tiny, color: colors.primaryDark, opacity: 0.8 },
  section: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  sectionTitle: { fontSize: typography.h4, fontWeight: '700', color: colors.textPrimary, marginBottom: spacing.md },
  methodCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.border, marginBottom: spacing.sm },
  methodCardActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  methodLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  methodIcon: { width: 48, height: 48, borderRadius: borderRadius.sm, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center', marginRight: spacing.sm },
  methodIconText: { fontSize: 24 },
  methodName: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: 2 },
  methodDesc: { fontSize: typography.tiny, color: colors.textSecondary },
  radioButton: { width: 24, height: 24, borderRadius: 12, borderWidth: 2, borderColor: colors.border, justifyContent: 'center', alignItems: 'center' },
  radioButtonActive: { borderColor: colors.primary },
  radioButtonInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: colors.primary },
  formSection: { paddingHorizontal: spacing.md, marginBottom: spacing.lg },
  formLabel: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.xs, marginTop: spacing.sm },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: typography.body, color: colors.textPrimary, marginBottom: spacing.xs },
  formHint: { fontSize: typography.tiny, color: colors.textTertiary, marginBottom: spacing.sm },
  formRow: { flexDirection: 'row', gap: spacing.sm },
  formHalf: { flex: 1 },
  bankOption: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 2, borderColor: colors.border, marginBottom: spacing.sm },
  bankOptionActive: { borderColor: colors.primary, backgroundColor: colors.primaryLight },
  bankName: { fontSize: typography.body, color: colors.textPrimary, fontWeight: '600' },
  bankNameActive: { color: colors.primary },
  securityNote: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.surface, marginHorizontal: spacing.md, padding: spacing.md, borderRadius: borderRadius.md, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.lg },
  securityIcon: { fontSize: 20, marginRight: spacing.sm },
  securityText: { flex: 1, fontSize: typography.small, color: colors.textSecondary },
  payButton: { marginHorizontal: spacing.md, borderRadius: borderRadius.lg, overflow: 'hidden', marginBottom: spacing.md },
  payButtonDisabled: { opacity: 0.5 },
  payGradient: { padding: spacing.md, alignItems: 'center' },
  payButtonText: { fontSize: typography.h3, fontWeight: '700', color: colors.primaryDark, marginBottom: 4 },
  payButtonSubtext: { fontSize: typography.small, color: colors.primaryDark, opacity: 0.8 },
  termsText: { fontSize: typography.tiny, color: colors.textTertiary, textAlign: 'center', paddingHorizontal: spacing.xl, lineHeight: 16 },
});