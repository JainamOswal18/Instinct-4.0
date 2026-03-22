// components/ErrorBoundary.tsx
import React, { Component, ReactNode } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing, typography, borderRadius } from '../theme/colors';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  componentStack: string | null;
}

/**
 * Wraps the entire app. Catches any unhandled React render errors and shows
 * a styled in-app screen instead of the default red crash screen.
 *
 * Usage in app/_layout.tsx:
 *   <ErrorBoundary>
 *     <Stack ... />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, componentStack: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, componentStack: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ componentStack: info.componentStack ?? null });
    // Log to console in dev — swap for a crash reporting service in production
    if (__DEV__) {
      console.error('[ErrorBoundary] Uncaught error:', error);
      console.error('[ErrorBoundary] Component stack:', info.componentStack);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, componentStack: null });
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    const errorMessage = this.state.error?.message ?? 'An unexpected error occurred.';
    const isKnownError = errorMessage.length < 200; // don't show huge stack traces as the main message

    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Icon */}
          <Text style={styles.icon}>⚡</Text>

          {/* Title */}
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.subtitle}>
            The app ran into an unexpected problem. Your data is safe.
          </Text>

          {/* Error message */}
          <View style={styles.errorBox}>
            <Text style={styles.errorLabel}>Error details</Text>
            <Text style={styles.errorMessage}>
              {isKnownError ? errorMessage : 'An unexpected rendering error occurred.'}
            </Text>
          </View>

          {/* Dev-only stack trace */}
          {__DEV__ && this.state.componentStack && (
            <View style={styles.stackBox}>
              <Text style={styles.stackLabel}>Component stack (dev only)</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <Text style={styles.stackText}>{this.state.componentStack}</Text>
              </ScrollView>
            </View>
          )}

          {/* Actions */}
          <TouchableOpacity style={styles.retryButton} onPress={this.handleReset}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>

          <Text style={styles.hint}>
            If this keeps happening, try logging out and back in, or contact support.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: {
    flexGrow: 1, alignItems: 'center', justifyContent: 'center',
    padding: spacing.xl,
  },

  icon: { fontSize: 64, marginBottom: spacing.lg },
  title: {
    fontSize: typography.h2, fontWeight: '700',
    color: colors.textPrimary, marginBottom: spacing.sm, textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.body, color: colors.textSecondary,
    textAlign: 'center', lineHeight: 22, marginBottom: spacing.xl,
  },

  errorBox: {
    width: '100%', backgroundColor: 'rgba(255,69,58,0.08)',
    borderWidth: 1, borderColor: colors.error,
    borderRadius: borderRadius.md, padding: spacing.md, marginBottom: spacing.lg,
  },
  errorLabel: {
    fontSize: typography.tiny, fontWeight: '700', color: colors.error,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs,
  },
  errorMessage: {
    fontSize: typography.small, color: colors.error, lineHeight: 20,
  },

  stackBox: {
    width: '100%', backgroundColor: colors.surface,
    borderRadius: borderRadius.md, padding: spacing.md,
    marginBottom: spacing.lg, borderWidth: 1, borderColor: colors.border,
  },
  stackLabel: {
    fontSize: typography.tiny, fontWeight: '700', color: colors.warning,
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: spacing.xs,
  },
  stackText: {
    fontSize: 10, color: colors.textTertiary,
    fontFamily: 'monospace', lineHeight: 16,
  },

  retryButton: {
    backgroundColor: colors.primary, paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.md, borderRadius: borderRadius.lg, marginBottom: spacing.md,
  },
  retryButtonText: {
    fontSize: typography.h4, fontWeight: '700', color: colors.primaryDark,
  },
  hint: {
    fontSize: typography.small, color: colors.textTertiary,
    textAlign: 'center', lineHeight: 20,
  },
});