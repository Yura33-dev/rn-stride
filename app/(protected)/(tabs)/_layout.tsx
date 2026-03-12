import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import 'react-native-reanimated';

import Colors from '@/constants/Colors';
import { useTranslation } from 'react-i18next';

export default function BottomTabsLayout() {
  const { t } = useTranslation();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.foreground,
        tabBarStyle: {
          backgroundColor: Colors.background[600],
          borderTopColor: Colors.secondary,
        },
      }}
    >
      <Tabs.Screen
        name="(tasks)"
        options={{
          tabBarLabel: t('tabs.tab_tasks'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="checklist" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: t('tabs.tab_settings'),
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
