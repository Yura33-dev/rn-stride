import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { clsx } from 'clsx';
import { Link } from 'expo-router';
import { Button, FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DayItem = {
  id: string;
  label: string;
  progress: string;
  completed: number;
  total: number;
};

const MOCK_DAYS: DayItem[] = [
  { id: '1', label: 'Monday, 1', progress: '3/3 Tasks', completed: 3, total: 3 },
  { id: '2', label: 'Tuesday, 2', progress: '1/5 Tasks', completed: 1, total: 5 },
  { id: '3', label: 'Wednesday, 3', progress: '2/3 Tasks', completed: 2, total: 3 },
  { id: '4', label: 'Thursday, 4', progress: '2/7 Tasks', completed: 2, total: 7 },
  { id: '5', label: 'Friday, 5', progress: '1/4 Tasks', completed: 1, total: 4 },
  { id: '6', label: 'Saturday, 6', progress: '0/3 Tasks', completed: 0, total: 0 },
  { id: '7', label: 'Sunday, 7', progress: '0/3 Tasks', completed: 0, total: 0 },
]; // TODO

function DayCard({ item, today = false }: { item: DayItem; today?: boolean }) {
  const progressPercent = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;

  return (
    <View
      className={clsx(
        'my-2 p-5 bg-blue-700/30 rounded-xl relative',
        today && 'border-[3px] border-primary',
      )}
    >
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-bold text-base">{item.label}</Text>
        <Text
          className={clsx(
            'text-xs font-medium',
            item.completed === item.total && item.total !== 0
              ? 'text-green-600'
              : 'text-blue-300/70',
            item.total === 0 && 'text-blue-900/70',
          )}
        >
          {item.total === 0 ? 'No tasks scheduled' : item.progress}
        </Text>
      </View>

      <View className="bg-blue-900/70 w-full h-[6px] mt-4 rounded-xl relative">
        <View
          className={clsx(
            'absolute left-0 top-0 rounded-xl h-full',
            item.completed === item.total && item.total !== 0 ? 'bg-green-600' : 'bg-primary',
            item.total === 0 && 'bg-blue-900/70',
          )}
          style={{ width: `${progressPercent}%` }}
        />
      </View>

      {today && (
        <View className="absolute -top-[30%] left-5 px-3 py-1.5 bg-primary rounded-lg">
          <Text className="font-bold text-[10px] uppercase text-white">today</Text>
        </View>
      )}
    </View>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="flex-1 px-2 pb-6" style={{ marginTop: insets.top + 24 }}>
      <View className="flex-row justify-between items-center">
        <Text className="text-foreground font-bold text-4xl mb-1">Weekly Overview</Text>
        <View className="w-12 h-12 rounded-full bg-blue-800/20 justify-center items-center">
          <MaterialIcons name="calendar-month" size={24} color={Colors.primary} />
        </View>
      </View>
      <Text className="text-secondary font-medium">February 2026</Text>

      {/* next */}
      <View className="flex-1 mt-8">
        <Text className="font-semibold text-sm uppercase text-secondary mb-4">Daily Breakdown</Text>

        <FlatList
          className="px-3"
          data={MOCK_DAYS}
          keyExtractor={(item) => item.id}
          renderItem={(item) => <DayCard item={item.item} today={item.index === 1 && true} />}
        />
      </View>

      <Link href="/(tabs)/(tasks)/daily-tasks" asChild push>
        <Button title="To Daily Screen" />
      </Link>

      <Link href="/modal" asChild push>
        <Button title="To Modal Screen" />
      </Link>
    </View>
  );
}
