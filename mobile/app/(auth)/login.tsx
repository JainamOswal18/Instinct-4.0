// app/(auth)/login.tsx
import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  TextInput, ActivityIndicator, KeyboardAvoidingView,
  Platform, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuthStore } from '../../store/useAuthStore';
import { InlineError } from '../../components/ErrorBanner';
import { colors, spacing, typography, borderRadius } from '../../theme/colors';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errs: { email?: string; password?: string } = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format';
    if (!password) errs.password = 'Password is required';
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleLogin = async () => {
    setFormError(null);
    if (!validate()) return;

    setIsLoading(true);
    try {
      await login(email.trim().toLowerCase(), password);
      router.replace('/');
    } catch (error: any) {
      console.error('Login error:', error);

      // Map status codes to friendly messages
      if (error.status === 401 || error.code === 'UNAUTHORIZED') {
        setFieldErrors({ email: ' ', password: 'Invalid email or password' });
      } else if (error.status === 403) {
        setFormError('Your account has been deactivated. Please contact support.');
      } else if (error.code === 'NETWORK_ERROR') {
        setFormError('Network error — please check your connection and try again.');
      } else {
        setFormError(error.message || 'Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.icon}>☀️</Text>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Login to continue to EaaS Nexus</Text>
          </View>

          <View style={styles.form}>
            {/* API-level error banner */}
            <InlineError message={formError} onDismiss={() => setFormError(null)} />

            {/* Email */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, fieldErrors.email && fieldErrors.email !== ' ' && styles.inputError]}
                placeholder="Enter your email"
                placeholderTextColor={colors.textTertiary}
                value={email}
                onChangeText={(v) => { setEmail(v); setFieldErrors(e => ({ ...e, email: undefined })); setFormError(null); }}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {fieldErrors.email && fieldErrors.email !== ' ' && (
                <Text style={styles.fieldError}>⚠ {fieldErrors.email}</Text>
              )}
            </View>

            {/* Password */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={[styles.input, fieldErrors.password && styles.inputError]}
                placeholder="Enter your password"
                placeholderTextColor={colors.textTertiary}
                value={password}
                onChangeText={(v) => { setPassword(v); setFieldErrors(e => ({ ...e, password: undefined })); setFormError(null); }}
                secureTextEntry
                autoCapitalize="none"
                editable={!isLoading}
                returnKeyType="done"
                onSubmitEditing={handleLogin}
              />
              {fieldErrors.password && (
                <Text style={styles.fieldError}>⚠ {fieldErrors.password}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.loginButton, isLoading && styles.buttonDisabled]}
              onPress={handleLogin}
              disabled={isLoading}
            >
              <LinearGradient
                colors={[colors.primary, colors.accentSecondary]}
                style={styles.gradient}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
              >
                {isLoading
                  ? <ActivityIndicator color={colors.primaryDark} />
                  : <Text style={styles.loginText}>Login</Text>
                }
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.registerLink}>
              <Text style={styles.registerText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/register')} disabled={isLoading}>
                <Text style={styles.registerButton}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  content: { flexGrow: 1, padding: spacing.xl, justifyContent: 'center' },

  header: { alignItems: 'center', marginBottom: spacing.xxl },
  icon: { fontSize: 64, marginBottom: spacing.md },
  title: { fontSize: typography.h1, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { fontSize: typography.body, color: colors.textSecondary },

  form: { gap: spacing.md },
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

  loginButton: { borderRadius: borderRadius.lg, overflow: 'hidden', marginTop: spacing.sm },
  buttonDisabled: { opacity: 0.6 },
  gradient: { padding: spacing.md, alignItems: 'center' },
  loginText: { fontSize: typography.h4, fontWeight: '700', color: colors.primaryDark },

  registerLink: { flexDirection: 'row', justifyContent: 'center', marginTop: spacing.sm },
  registerText: { fontSize: typography.body, color: colors.textSecondary },
  registerButton: { fontSize: typography.body, fontWeight: '700', color: colors.primary },
});