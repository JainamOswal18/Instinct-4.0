// app/(installation)/_layout.tsx
import { Stack } from 'expo-router';
import { colors } from '../../theme/colors';

export default function InstallationLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="progress" />
    </Stack>
  );
}