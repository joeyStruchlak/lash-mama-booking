// App Root Layout
// Handles navigation container, fonts, and global providers

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '@/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" backgroundColor={colors.cream.DEFAULT} />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.cream.DEFAULT },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" options={{ animation: 'fade' }} />
        <Stack.Screen name="(client)" />
        <Stack.Screen name="(staff)" />
        <Stack.Screen name="(admin)" />
      </Stack>
    </SafeAreaProvider>
  );
}
