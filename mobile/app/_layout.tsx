// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { colors } from '../theme/colors';

export default function RootLayout() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    // Restore session on app start — no token clearing
    // Sessions persist until the user explicitly logs out
    loadUser();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(onboarding)" />
      <Stack.Screen name="(customer)" />
      <Stack.Screen name="(installation)" />
    </Stack>
  );
}