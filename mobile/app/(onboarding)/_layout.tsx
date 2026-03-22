// app/(onboarding)/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';
import { useStatusSync } from '../../hooks/useStatusSync';

function StatusSyncProvider() {
  useStatusSync();
  return null;
}

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <StatusSyncProvider />
      <Stack.Screen name="welcome" />
      <Stack.Screen name="survey" />
      <Stack.Screen 
        name="survey-submitted"
        options={{
          // Prevent swiping back to survey after submission
          gestureEnabled: false,
        }}
      />
      <Stack.Screen name="proposal" />
      <Stack.Screen name="payment" />
    </Stack>
  );
}