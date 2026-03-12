import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: Colors.foreground,
        headerStyle: { backgroundColor: Colors.background[600] },
        contentStyle: { backgroundColor: Colors.background[600] },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
