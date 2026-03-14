// components/NotificationBanner.tsx
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useNotificationStore, generateNotificationsForStatus } from '../store/useNotificationStore';
import { useCurrentProperty } from '../store/useAuthStore';
import { colors, spacing, typography, borderRadius } from '../theme/colors';

export default function NotificationBanner() {
  const router = useRouter();
  const currentProperty = useCurrentProperty();
  const { notifications, markAsRead, dismissNotification, addNotification } = useNotificationStore();
  
  const [slideAnim] = useState(new Animated.Value(-100));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-generate notifications based on subscription status
  useEffect(() => {
    if (currentProperty) {
      const contextNotifications = generateNotificationsForStatus(currentProperty.subscriptionStatus);
      
      // Add notifications that don't exist yet
      contextNotifications.forEach(notif => {
        const exists = notifications.some(n => n.title === notif.title);
        if (!exists) {
          addNotification(notif);
        }
      });
    }
  }, [currentProperty?.subscriptionStatus]);

  // Get persistent notifications (those that should always show)
  const persistentNotifications = notifications.filter(n => n.persistent && !n.read);
  const currentNotification = persistentNotifications[currentIndex];

  // Slide in animation
  useEffect(() => {
    if (currentNotification) {
      Animated.spring(slideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 8,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [currentNotification]);

  // Auto-rotate notifications every 7 seconds
  useEffect(() => {
    if (persistentNotifications.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % persistentNotifications.length);
      }, 7000);
      return () => clearInterval(interval);
    }
  }, [persistentNotifications.length]);

  if (!currentNotification) return null;

  const handleAction = () => {
    if (currentNotification.action) {
      markAsRead(currentNotification.id);
      router.push(currentNotification.action.route as any);
    }
  };

  const handleDismiss = () => {
    if (currentNotification.dismissible) {
      dismissNotification(currentNotification.id);
    }
  };

  const getBackgroundColor = () => {
    switch (currentNotification.type) {
      case 'success': return colors.success;
      case 'warning': return colors.warning;
      case 'error': return colors.error;
      case 'info': return colors.primary;
      default: return colors.primary;
    }
  };

  const getIcon = () => {
    switch (currentNotification.type) {
      case 'success': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✕';
      case 'info': return 'ℹ';
      default: return 'ℹ';
    }
  };

  return (
    <Animated.View 
      style={[
        styles.container,
        { 
          backgroundColor: getBackgroundColor(),
          transform: [{ translateY: slideAnim }],
        }
      ]}
    >
      <View style={styles.content}>
        {/* Icon */}
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>{getIcon()}</Text>
        </View>

        {/* Message */}
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentNotification.title}
          </Text>
          <Text style={styles.message} numberOfLines={2}>
            {currentNotification.message}
          </Text>
        </View>

        {/* Action Button */}
        {currentNotification.action && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleAction}
            activeOpacity={0.7}
          >
            <Text style={styles.actionText}>{currentNotification.action.label}</Text>
          </TouchableOpacity>
        )}

        {/* Dismiss Button */}
        {currentNotification.dismissible && (
          <TouchableOpacity 
            style={styles.dismissButton}
            onPress={handleDismiss}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={styles.dismissText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Pagination Dots (if multiple notifications) */}
      {persistentNotifications.length > 1 && (
        <View style={styles.pagination}>
          {persistentNotifications.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.dotActive,
              ]}
            />
          ))}
        </View>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  icon: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '700',
  },
  textContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    fontSize: typography.small,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 2,
  },
  message: {
    fontSize: typography.tiny,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 16,
  },
  actionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginRight: spacing.xs,
  },
  actionText: {
    fontSize: typography.tiny,
    fontWeight: '700',
    color: colors.primaryDark,
  },
  dismissButton: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dismissText: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xs,
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    width: 16,
  },
});