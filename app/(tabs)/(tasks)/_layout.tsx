import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.foreground,
        headerShadowVisible: false,
        headerStyle: { backgroundColor: Colors.background[600] },
        contentStyle: { backgroundColor: Colors.background[600] },
        // title: '',
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="daily-tasks" />
    </Stack>
  );
}
