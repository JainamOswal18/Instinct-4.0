// app/(auth)/register.tsx
import React, { useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, TouchableOpacity,
  TextInput, ActivityIndicator, KeyboardAvoidingView, Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/useAuthStore';
import { InlineError } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearField = (field: keyof FieldErrors) => {
    setErrors(e => ({ ...e, [field]: undefined }));
    setFormError(null);
  };

  const validateEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const validatePhone = (v: string) => /^(\+91|0)?[6-9]\d{9}$/.test(v.replace(/[\s\-()]/g, ''));

  const validateForm = (): boolean => {
    const e: FieldErrors = {};
    if (!name.trim()) e.name = 'Name is required';
    else if (name.trim().length < 2) e.name = 'Name must be at least 2 characters';

    if (!email.trim()) e.email = 'Email is required';
    else if (!validateEmail(email)) e.email = 'Invalid email format';

    if (!phone.trim()) e.phone = 'Phone number is required';
    else if (!validatePhone(phone)) e.phone = 'Enter a valid 10-digit Indian mobile number';

    if (!password) e.password = 'Password is required';
    else if (password.length < 8) e.password = 'Password must be at least 8 characters';

    if (!confirmPassword) e.confirmPassword = 'Please confirm your password';
    else if (password !== confirmPassword) e.confirmPassword = 'Passwords do not match';

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleRegister = async () => {
    setFormError(null);
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await register(name.trim(), email.trim().toLowerCase(), password, phone.trim());
      // Success — index.tsx routes to survey automatically
      router.replace('/');
    } catch (error: any) {
      console.error('Registration error:', error);

      if (error.status === 409 || error.code === 'CONFLICT') {
        // Highlight the email field
        setErrors(e => ({ ...e, email: 'This email is already registered' }));
        setFormError('This email is already registered. Would you like to log in instead?');
      } else if (error.code === 'NETWORK_ERROR') {
        setFormError('Network error — please check your connection and try again.');
      } else if (error.details && Object.keys(error.details).length > 0) {
        // Map backend validation details to field errors
        const backendErrors: FieldErrors = {};
        if (error.details.email) backendErrors.email = Array.isArray(error.details.email) ? error.details.email[0] : error.details.email;
        if (error.details.password) backendErrors.password = Array.isArray(error.details.password) ? error.details.password[0] : error.details.password;
        if (error.details.name) backendErrors.name = Array.isArray(error.details.name) ? error.details.name[0] : error.details.name;
        if (error.details.phone) backendErrors.phone = Array.isArray(error.details.phone) ? error.details.phone[0] : error.details.phone;
        setErrors(backendErrors);
      } else {
        setFormError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.replace('/(auth)/login')}
              style={styles.backBtn}
              disabled={isSubmitting}
            >
              <Text style={styles.backArrow}>←</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join EaaS Nexus and start saving on energy</Text>
          </View>

          <View style={styles.form}>
            {/* API-level error banner */}
            <InlineError
              message={formError}
              onDismiss={() => setFormError(null)}
            />
            {/* Login shortcut if email conflict */}
            {formError?.includes('log in') && (
              <TouchableOpacity
                style={styles.loginShortcut}
                onPress={() => router.replace('/(auth)/login')}
              >
                <Text style={styles.loginShortcutText}>Go to Login →</Text>
              </TouchableOpacity>
            )}

            {/* Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Full Name *</Text>
              <TextInput
                style={[styles.input, errors.name && styles.inputError]}
                placeholder="e.g., Rahul Kumar"
                placeholderTextColor={colors.textTertiary}
                value={name}
                onChangeText={(v) => { setName(v); clearField('name'); }}
                autoCapitalize="words"
                editable={!isSubmitting}
              />
              {errors.name && <Text style={styles.fieldError}>⚠ {errors.name}</Text>}
            </View>

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email Address *</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                placeholder="e.g., rahul@example.com"
                placeholderTextColor={colors.textTertiary}
                value={email}
                onChangeText={(v) => { setEmail(v); clearField('email'); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isSubmitting}
              />
              {errors.email && <Text style={styles.fieldError}>⚠ {errors.email}</Text>}
            </View>

            {/* Phone */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Mobile Number *</Text>
              <View style={styles.phoneRow}>
                <View style={styles.phonePrefix}>
                  <Text style={styles.phonePrefixText}>🇮🇳 +91</Text>
                </View>
                <TextInput
                  style={[styles.input, styles.phoneInput, errors.phone && styles.inputError]}
                  placeholder="98765 43210"
                  placeholderTextColor={colors.textTertiary}
                  value={phone}
                  onChangeText={(v) => { setPhone(v); clearField('phone'); }}
                  keyboardType="phone-pad"
                  autoCapitalize="none"
                  maxLength={13}
                  editable={!isSubmitting}
                />
              </View>
              {errors.phone && <Text style={styles.fieldError}>⚠ {errors.phone}</Text>}
              <Text style={styles.helperText}>Our engineer will call this number to schedule your site visit</Text>
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password *</Text>
              <TextInput
                style={[styles.input, errors.password && styles.inputError]}
                placeholder="Minimum 8 characters"
                placeholderTextColor={colors.textTertiary}
                value={password}
                onChangeText={(v) => { setPassword(v); clearField('password'); }}
                secureTextEntry
                autoCapitalize="none"
                editable={!isSubmitting}
              />
              {errors.password && <Text style={styles.fieldError}>⚠ {errors.password}</Text>}
            </View>

            {/* Confirm Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Confirm Password *</Text>
              <TextInput
                style={[styles.input, errors.confirmPassword && styles.inputError]}
                placeholder="Re-enter password"
                placeholderTextColor={colors.textTertiary}
                value={confirmPassword}
                onChangeText={(v) => { setConfirmPassword(v); clearField('confirmPassword'); }}
                secureTextEntry
                autoCapitalize="none"
                editable={!isSubmitting}
                returnKeyType="done"
                onSubmitEditing={handleRegister}
              />
              {errors.confirmPassword && <Text style={styles.fieldError}>⚠ {errors.confirmPassword}</Text>}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={isSubmitting}
          >
            <LinearGradient
              colors={[colors.primary, colors.accentSecondary]}
              style={styles.gradient}
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
            >
              {isSubmitting
                ? <ActivityIndicator color={colors.primaryDark} />
                : <Text style={styles.submitText}>Create Account</Text>
              }
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.loginLink}>
            <Text style={styles.loginLinkText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')} disabled={isSubmitting}>
              <Text style={styles.loginLinkButton}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: spacing.xxl }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollView: { flex: 1 },

  header: { padding: spacing.md, paddingTop: spacing.lg },
  backBtn: { padding: spacing.xs, marginLeft: -spacing.xs, marginBottom: spacing.sm },
  backArrow: { fontSize: 24, color: colors.primary },
  title: { fontSize: typography.h1, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },

  form: { padding: spacing.md, gap: spacing.lg },
  inputContainer: {},
  label: {
    fontSize: typography.small, fontWeight: '600', color: colors.textSecondary,
    marginBottom: spacing.xs, textTransform: 'uppercase', letterSpacing: 0.5,
  },
  input: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.md, padding: spacing.md,
    fontSize: typography.body, color: colors.textPrimary,
  },
  inputError: { borderColor: colors.error, borderWidth: 2 },
  fieldError: { marginTop: 4, fontSize: typography.small, color: colors.error, fontWeight: '500' },
  helperText: { marginTop: 4, fontSize: typography.small, color: colors.textTertiary },

  phoneRow: { flexDirection: 'row', gap: spacing.sm, alignItems: 'stretch' },
  phonePrefix: {
    backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border,
    borderRadius: borderRadius.md, paddingHorizontal: spacing.sm,
    justifyContent: 'center', alignItems: 'center',
  },
  phonePrefixText: { fontSize: typography.body, color: colors.textPrimary, fontWeight: '600' },
  phoneInput: { flex: 1 },

  loginShortcut: {
    alignSelf: 'flex-start',
    marginTop: -spacing.xs,
    marginBottom: spacing.xs,
  },
  loginShortcutText: { fontSize: typography.small, color: colors.primary, fontWeight: '700' },

  submitButton: {
    marginHorizontal: spacing.md, borderRadius: borderRadius.lg,
    overflow: 'hidden', marginTop: spacing.md,
  },
  buttonDisabled: { opacity: 0.6 },
  gradient: { padding: spacing.md, alignItems: 'center' },
  submitText: { fontSize: typography.h4, fontWeight: '700', color: colors.primaryDark },

  loginLink: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.md },
  loginLinkText: { fontSize: typography.body, color: colors.textSecondary },
  loginLinkButton: { fontSize: typography.body, fontWeight: '700', color: colors.primary },
});