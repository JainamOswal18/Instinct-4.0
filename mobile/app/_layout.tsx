// app/_layout.tsx
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthStore } from '../store/useAuthStore';

export default function RootLayout() {
  const { loadUser } = useAuthStore();

  useEffect(() => {
    // Always clear session on app start — user must log in each time
    AsyncStorage.removeItem('accessToken').then(() => {
      loadUser();
    });
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