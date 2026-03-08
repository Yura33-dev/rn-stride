import AddTaskButton from '@/components/ui/add-task-btn';
import BackButton from '@/components/ui/back-btn';
import Colors from '@/constants/Colors';
import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function Layout() {
  return (
    <View className="flex-1 relative">
      <Stack
        screenOptions={{
          headerTintColor: Colors.foreground,
          headerShadowVisible: false,
          headerStyle: { backgroundColor: Colors.background[600] },
          contentStyle: { backgroundColor: Colors.background[600] },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="tasks/index" />

        <Stack.Screen
          name="modal-calendar"
          options={{
            presentation: 'formSheet',
            headerShown: true,
            title: 'Calendar',
            sheetAllowedDetents: [0.6, 1.0],
            sheetInitialDetentIndex: 0,
            sheetGrabberVisible: true,
          }}
        />

        <Stack.Screen
          name="modal-add-task"
          options={{
            presentation: 'modal',
            headerShown: true,
            title: 'New Task',
            headerLeft: (props) => <BackButton />,
          }}
        />
      </Stack>

      <AddTaskButton />
    </View>
  );
}
