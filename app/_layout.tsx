import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Toaster } from 'sonner-native';

import { queryClient } from '@/api/query-client';
import Colors from '@/constants/Colors';
import { useTranslation } from 'react-i18next';
import '../global.css';
import '../i18n/i18n.config';

export default function RootLayout() {
  const { i18n } = useTranslation();

  if (!i18n.isInitialized) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: Colors.background[600] },
              contentStyle: { backgroundColor: Colors.background[600] },
              headerShown: false,
            }}
          >
            <Stack.Screen name="(protected)" options={{ animation: 'none' }} />
            <Stack.Screen name="authenticate" options={{ animation: 'none' }} />
          </Stack>
          <Toaster />
        </SafeAreaProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
