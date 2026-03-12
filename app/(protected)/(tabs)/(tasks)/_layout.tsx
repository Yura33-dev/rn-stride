import AddTaskButton from '@/components/ui/add-task-btn';
import BackButton from '@/components/ui/back-btn';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

export default function Layout() {
  const { t } = useTranslation();
  return (
    <View className="flex-1 relative">
      <Stack
        screenOptions={{
          headerTintColor: Colors.foreground,
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: { backgroundColor: Colors.background[600] },
          contentStyle: { backgroundColor: Colors.background[600] },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="tasks/index" />

        <Stack.Screen
          name="modal-calendar"
          options={{
            presentation: 'formSheet',
            headerShown: true,
            title: t('modals.calendar'),
            sheetAllowedDetents: [0.6, 1.0],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
          }}
        />

        <Stack.Screen
          name="modal-task"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: '',
            headerLeft: (props) => <BackButton />,
          }}
        />
      </Stack>

      <AddTaskButton />
    </View>
  );
}
