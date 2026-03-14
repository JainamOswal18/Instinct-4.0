// app/(customer)/add-property.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/useAuthStore';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

type PropertyType = 'residential' | 'commercial';

export default function AddPropertyScreen() {
  const router = useRouter();
  const { addProperty } = useAuthStore();

  const [propertyName, setPropertyName] = useState('');
  const [address, setAddress] = useState('');
  const [propertyType, setPropertyType] = useState<PropertyType>('residential');

  const handleAddProperty = () => {
    if (!propertyName.trim()) {
      Alert.alert('Missing Field', 'Please enter a property name.');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Missing Field', 'Please enter the property address.');
      return;
    }

    addProperty({
      name: propertyName.trim(),
      address: address.trim(),
      type: propertyType,
      subscriptionStatus: 'NONE',
    });

    Alert.alert(
      'Property Added ✓',
      'Your new property has been added. Would you like to start the energy survey now?',
      [
        {
          text: 'Later',
          style: 'cancel',
          onPress: () => router.back(),
        },
        {
          text: 'Start Survey',
          onPress: () => router.push('/(onboarding)/survey'),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Text style={styles.backArrow}>←</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Add New Property</Text>
          <Text style={styles.subtitle}>
            Manage multiple solar installations from a single account.
          </Text>
        </View>

        {/* ── Form ── */}
        <View style={styles.form}>

          {/* Property Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Property Name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Home, Office, Warehouse"
              placeholderTextColor={colors.textTertiary}
              value={propertyName}
              onChangeText={setPropertyName}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Enter complete address"
              placeholderTextColor={colors.textTertiary}
              value={address}
              onChangeText={setAddress}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              returnKeyType="done"
            />
          </View>

          {/* Property Type */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Property Type</Text>
            <View style={styles.typeOptions}>

              <TouchableOpacity
                style={[
                  styles.typeOption,
                  propertyType === 'residential' && styles.typeOptionActive,
                ]}
                onPress={() => setPropertyType('residential')}
                activeOpacity={0.7}
              >
                <Text style={styles.typeIcon}>🏠</Text>
                <Text style={[
                  styles.typeText,
                  propertyType === 'residential' && styles.typeTextActive,
                ]}>
                  Residential
                </Text>
                <View style={[
                  styles.radioButton,
                  propertyType === 'residential' && styles.radioButtonActive,
                ]}>
                  {propertyType === 'residential' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.typeOption,
                  propertyType === 'commercial' && styles.typeOptionActive,
                ]}
                onPress={() => setPropertyType('commercial')}
                activeOpacity={0.7}
              >
                <Text style={styles.typeIcon}>🏢</Text>
                <Text style={[
                  styles.typeText,
                  propertyType === 'commercial' && styles.typeTextActive,
                ]}>
                  Commercial
                </Text>
                <View style={[
                  styles.radioButton,
                  propertyType === 'commercial' && styles.radioButtonActive,
                ]}>
                  {propertyType === 'commercial' && (
                    <View style={styles.radioButtonInner} />
                  )}
                </View>
              </TouchableOpacity>

            </View>
          </View>
        </View>

        {/* ── Info card ── */}
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>ℹ️</Text>
          <Text style={styles.infoText}>
            After adding the property you'll be prompted to complete an energy survey so we can
            generate a personalised solar plan.
          </Text>
        </View>

        {/* ── Submit ── */}
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddProperty}
          activeOpacity={0.85}
        >
          <LinearGradient
            colors={[colors.primary, colors.accentSecondary]}
            style={styles.submitGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.submitText}>Add Property</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: spacing.xl }} />
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

  // ── Header ──────────────────────────────────────────────────────────────────
  header: {
    marginBottom: spacing.xl,
  },
  backBtn: {
    padding: spacing.xs,
    marginLeft: -spacing.xs,
    marginBottom: spacing.sm,
    alignSelf: 'flex-start',
  },
  backArrow: {
    fontSize: 24,
    color: colors.primary,
  },
  title: {
    fontSize: typography.h2,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: typography.body,
    color: colors.textSecondary,
    lineHeight: 22,
  },

  // ── Form ────────────────────────────────────────────────────────────────────
  form: {
    marginBottom: spacing.lg,
  },
  inputContainer: {
    marginBottom: spacing.lg,
  },
  label: {
    fontSize: typography.small,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    height: 88,
    paddingTop: spacing.md,
  },

  // ── Type selector ────────────────────────────────────────────────────────────
  typeOptions: {
    gap: spacing.sm,
  },
  typeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.border,
  },
  typeOptionActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primaryLight,
  },
  typeIcon: {
    fontSize: 28,
    marginRight: spacing.md,
  },
  typeText: {
    flex: 1,
    fontSize: typography.body,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  typeTextActive: {
    color: colors.primary,
  },
  radioButton: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonActive: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },

  // ── Info card ────────────────────────────────────────────────────────────────
  infoCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  infoText: {
    flex: 1,
    fontSize: typography.small,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  // ── Submit ───────────────────────────────────────────────────────────────────
  submitButton: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitGradient: {
    padding: spacing.md,
    alignItems: 'center',
  },
  submitText: {
    fontSize: typography.h4,
    fontWeight: '700',
    color: colors.primaryDark,
  },
});