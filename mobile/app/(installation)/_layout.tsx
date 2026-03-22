// app/(installation)/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';
import { useStatusSync } from '../../hooks/useStatusSync';

function StatusSyncProvider() {
  useStatusSync();
  return null;
}

export default function InstallationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <StatusSyncProvider />
      <Stack.Screen name="progress" />
    </Stack>
  );
}