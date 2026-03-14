// app/(customer)/personal-info.tsx
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuthStore, useCurrentProperty } from '../../store/useAuthStore';
import apiWrapper from '../../services/apiWrapper';
import { InlineError, Toast } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function PersonalInfo() {
  const router = useRouter();
  const { user } = useAuthStore();
  const currentProperty = useCurrentProperty();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<string | null>(null);

  const [name, setName]       = useState(user?.name ?? '');
  const [email, setEmail]     = useState(user?.email ?? '');
  const [phone, setPhone]     = useState((user as any)?.phone ?? '');
  const [address, setAddress] = useState(
    currentProperty?.surveyData?.address ?? currentProperty?.address ?? ''
  );

  const handleSave = async () => {
    if (!name.trim()) { setFormError('Name is required'); return; }
    setIsSaving(true);
    setFormError(null);
    try {
      await apiWrapper.user.updateProfile({ name: name.trim(), phone: phone.trim(), address: address.trim() });
      setToastSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (e: any) {
      setFormError(e?.message || 'Failed to save changes. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setName(user?.name ?? '');
    setEmail(user?.email ?? '');
    setPhone((user as any)?.phone ?? '');
    setAddress(currentProperty?.surveyData?.address ?? currentProperty?.address ?? '');
    setFormError(null);
    setIsEditing(false);
  };

  const proposal = currentProperty?.proposedPlan;
  const installationDate = currentProperty?.installationProgress?.activationDate ?? null;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Toast message={toastSuccess} type="success" onDismiss={() => setToastSuccess(null)} />

      <ScrollView style={styles.scrollView}>
        {/* Header — back goes to profile */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.push('/(customer)/profile')} style={styles.backButton}>
            <Text style={styles.backArrow}>←</Text>
            <Text style={styles.backText}>Profile</Text>
          </TouchableOpacity>
          <View style={styles.headerTitleRow}>
            <Text style={styles.title}>Personal Information</Text>
            {!isEditing && (
              <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{name?.charAt(0)?.toUpperCase() ?? 'U'}</Text>
          </View>
        </View>

        <View style={styles.form}>
          <InlineError message={formError} onDismiss={() => setFormError(null)} />

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Full Name</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={name}
              onChangeText={setName}
              editable={isEditing}
              placeholder="Enter your full name"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email Address</Text>
            <TextInput
              style={[styles.input, styles.inputDisabled]}
              value={email}
              editable={false}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholderTextColor={colors.textTertiary}
            />
            <Text style={styles.fieldHint}>Email cannot be changed</Text>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Phone Number</Text>
            <TextInput
              style={[styles.input, !isEditing && styles.inputDisabled]}
              value={phone}
              onChangeText={setPhone}
              editable={isEditing}
              keyboardType="phone-pad"
              placeholder="Enter your phone number"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Property Address</Text>
            <TextInput
              style={[styles.input, styles.textArea, !isEditing && styles.inputDisabled]}
              value={address}
              onChangeText={setAddress}
              editable={isEditing}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              placeholder="Enter your property address"
              placeholderTextColor={colors.textTertiary}
            />
          </View>

          {/* Read-only account details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account Details</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Customer ID</Text>
              <Text style={styles.infoValue}>EAAS-{user?.id?.slice(-6) ?? '——'}</Text>
            </View>
            {installationDate && (
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Activation Date</Text>
                <Text style={styles.infoValue}>{installationDate}</Text>
              </View>
            )}
            {proposal && (
              <>
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>System Capacity</Text>
                  <Text style={styles.infoValue}>{proposal.solarCapacity ?? '—'} kW</Text>
                </View>
                {proposal.batteryStorage != null && (
                  <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Battery Storage</Text>
                    <Text style={styles.infoValue}>{proposal.batteryStorage} kWh</Text>
                  </View>
                )}
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Monthly Fee</Text>
                  <Text style={styles.infoValue}>₹{proposal.monthlyFee?.toLocaleString() ?? '—'}</Text>
                </View>
              </>
            )}
          </View>

          {isEditing && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton, isSaving && { opacity: 0.6 }]}
                onPress={handleSave}
                disabled={isSaving}
              >
                <Text style={styles.saveButtonText}>{isSaving ? 'Saving…' : 'Save Changes'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollView: { flex: 1, padding: spacing.md },
  header: { marginBottom: spacing.lg },
  backButton: { flexDirection: 'row', alignItems: 'center', padding: spacing.xs, marginLeft: -spacing.xs, marginBottom: spacing.md },
  backArrow: { fontSize: 24, color: colors.primary, marginRight: spacing.xs },
  backText: { fontSize: typography.body, color: colors.primary, fontWeight: '600' },
  headerTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  title: { fontSize: typography.h2, fontWeight: '700', color: colors.textPrimary },
  editButton: { paddingHorizontal: spacing.md, paddingVertical: spacing.xs },
  editButtonText: { fontSize: typography.body, color: colors.primary, fontWeight: '600' },
  avatarContainer: { alignItems: 'center', marginBottom: spacing.xl },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: colors.primary, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 40, fontWeight: '700', color: colors.primaryDark },
  form: { marginBottom: spacing.xl },
  fieldContainer: { marginBottom: spacing.lg },
  fieldLabel: { fontSize: typography.small, fontWeight: '600', color: colors.textSecondary, marginBottom: spacing.sm, textTransform: 'uppercase', letterSpacing: 0.5 },
  fieldHint: { fontSize: typography.tiny, color: colors.textTertiary, marginTop: 4, fontStyle: 'italic' },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, padding: spacing.md, fontSize: typography.body, color: colors.textPrimary },
  inputDisabled: { opacity: 0.6, backgroundColor: colors.background },
  textArea: { height: 80, textAlignVertical: 'top' },
  section: { backgroundColor: colors.surface, padding: spacing.md, borderRadius: borderRadius.lg, borderWidth: 1, borderColor: colors.border, marginTop: spacing.lg },
  sectionTitle: { fontSize: typography.body, fontWeight: '600', color: colors.textPrimary, marginBottom: spacing.md },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border },
  infoLabel: { fontSize: typography.small, color: colors.textSecondary },
  infoValue: { fontSize: typography.small, fontWeight: '600', color: colors.textPrimary },
  actionButtons: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xl },
  button: { flex: 1, padding: spacing.md, borderRadius: borderRadius.md, alignItems: 'center' },
  cancelButton: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  cancelButtonText: { fontSize: typography.body, fontWeight: '600', color: colors.textSecondary },
  saveButton: { backgroundColor: colors.primary },
  saveButtonText: { fontSize: typography.body, fontWeight: '700', color: colors.primaryDark },
});