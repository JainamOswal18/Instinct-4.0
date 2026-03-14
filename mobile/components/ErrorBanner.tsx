// components/ErrorBanner.tsx
import React, { useEffect, useRef } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Animated,
} from 'react-native';
import { colors, spacing, typography, borderRadius } from '../theme/colors';

// ── Inline field/form error ───────────────────────────────────────────────────
// Use this directly inside forms for API-level errors (e.g. "Email already registered")

interface InlineErrorProps {
  message: string | null | undefined;
  onDismiss?: () => void;
}

export function InlineError({ message, onDismiss }: InlineErrorProps) {
  if (!message) return null;

  return (
    <View style={styles.inlineError}>
      <Text style={styles.inlineErrorIcon}>⚠</Text>
      <Text style={styles.inlineErrorText}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.inlineDismiss}>
          <Text style={styles.inlineDismissText}>✕</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// ── Animated toast for transient errors/successes ────────────────────────────
// Use this for non-form feedback (network errors, success confirmations)

interface ToastProps {
  message: string | null | undefined;
  type?: 'error' | 'success' | 'info';
  onDismiss?: () => void;
  autoDismissMs?: number;
}

export function Toast({ message, type = 'error', onDismiss, autoDismissMs = 4000 }: ToastProps) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!message) return;

    Animated.timing(opacity, {
      toValue: 1, duration: 200, useNativeDriver: true,
    }).start();

    if (autoDismissMs && onDismiss) {
      const timer = setTimeout(() => {
        Animated.timing(opacity, {
          toValue: 0, duration: 300, useNativeDriver: true,
        }).start(() => onDismiss());
      }, autoDismissMs);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  const bgColor =
    type === 'success' ? colors.primary :
    type === 'info'    ? colors.info :
    colors.error;

  return (
    <Animated.View style={[styles.toast, { backgroundColor: bgColor, opacity }]}>
      <Text style={styles.toastIcon}>
        {type === 'success' ? '✓' : type === 'info' ? 'ℹ' : '✕'}
      </Text>
      <Text style={styles.toastText}>{message}</Text>
      {onDismiss && (
        <TouchableOpacity onPress={onDismiss} style={styles.toastDismiss}>
          <Text style={styles.toastDismissText}>✕</Text>
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // ── Inline ──────────────────────────────────────────────────────────────────
  inlineError: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 69, 58, 0.12)',
    borderWidth: 1,
    borderColor: colors.error,
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    marginBottom: spacing.md,
    gap: spacing.xs,
  },
  inlineErrorIcon: {
    fontSize: 14,
    color: colors.error,
    fontWeight: '700',
  },
  inlineErrorText: {
    flex: 1,
    fontSize: typography.small,
    color: colors.error,
    fontWeight: '500',
    lineHeight: 18,
  },
  inlineDismiss: { padding: 4 },
  inlineDismissText: { fontSize: 12, color: colors.error },

  // ── Toast ───────────────────────────────────────────────────────────────────
  toast: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    right: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    gap: spacing.sm,
    zIndex: 999,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  toastIcon: { fontSize: 16, color: colors.primaryDark, fontWeight: '700' },
  toastText: { flex: 1, fontSize: typography.small, color: colors.primaryDark, fontWeight: '600', lineHeight: 18 },
  toastDismiss: { padding: 4 },
  toastDismissText: { fontSize: 12, color: colors.primaryDark, fontWeight: '700' },
});