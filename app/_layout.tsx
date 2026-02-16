import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../global.css';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen name="(tasks)" options={{ tabBarLabel: 'Tasks' }} />
        <Tabs.Screen name="settings" options={{ tabBarLabel: 'Settings' }} />
      </Tabs>
    </SafeAreaProvider>
  );
}
