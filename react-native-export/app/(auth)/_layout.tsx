// Auth Routes Layout
// Shared layout for login/signup screens

import { Stack } from 'expo-router';
import { colors } from '@/theme';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.cream.DEFAULT },
        animation: 'fade',
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
