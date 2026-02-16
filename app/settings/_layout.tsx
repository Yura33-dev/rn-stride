import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'General settings' }} />
      <Stack.Screen name="app-settings" options={{ title: 'App settings' }} />
    </Stack>
  );
}
