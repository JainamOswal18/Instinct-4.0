// app/index.tsx
import { useEffect, useState } from 'react';
import { Redirect } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';

export default function Index() {
  const { user, isLoading } = useAuthStore();
  const [isCheckingToken, setIsCheckingToken] = useState(true);
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('accessToken').then((token) => {
      setHasToken(!!token);
      setIsCheckingToken(false);
    });
  }, []);

  // Still reading AsyncStorage
  if (isCheckingToken) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  // No token → go to auth immediately, don't wait for store
  if (!hasToken) {
    return <Redirect href="/(auth)/login" />;
  }

  // Has token but store still loading user — show spinner briefly
  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const currentProperty = user.properties?.find(p => p.id === user.currentPropertyId);

  if (!currentProperty) {
    return <Redirect href="/(auth)/login" />;
  }

  switch (currentProperty.subscriptionStatus) {
    case 'NONE':
      return <Redirect href="/(onboarding)/welcome" />;
    case 'SURVEY_PENDING':
      return <Redirect href="/(onboarding)/survey" />;
    case 'SURVEY_SUBMITTED':
      return <Redirect href="/(onboarding)/survey-submitted" />;
    case 'PLAN_PROPOSED':
      return <Redirect href="/(onboarding)/proposal" />;
    case 'PAYMENT_PENDING':
      return <Redirect href="/(onboarding)/payment" />;
    case 'PENDING_INSTALLATION':
      return <Redirect href="/(installation)/progress" />;
    case 'ACTIVE':
      return <Redirect href="/(customer)/dashboard" />;
    default:
      return <Redirect href="/(onboarding)/welcome" />;
  }
}
