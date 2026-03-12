import { useAuth } from '@/hooks';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import 'react-native-get-random-values';

export default function ProtectedLayout() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace({ pathname: '/authenticate', params: { signIn: 'true' } });
    }
  }, [user, loading]);

  if (loading) return <ActivityIndicator />;
  if (!user) return null;

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
