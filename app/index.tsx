// app/index.tsx
import { Redirect } from 'expo-router';
import { useAuthStore } from '../store/useAuthStore';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (isAuthenticated) {
    return <Redirect href="/(customer)/dashboard" />;
  }
  
  return <Redirect href="/(auth)/login" />;
}