import DayCard from '@/components/day-card';
import Header from '@/components/header';
import Subheader from '@/components/subheader';
import ViewContainer from '@/components/view-container';
import Colors from '@/constants/Colors';
import { useDayCards, useWeekTasks } from '@/hooks';
import { useWeekStore } from '@/store';
import { cn, weekRangeFormatter } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { isSameDay } from 'date-fns';
import { useRouter } from 'expo-router';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  const { data: tasks = [], isLoading, isError } = useWeekTasks();
  const dayCards = useDayCards(selectedWeek, tasks);

  const onCalendarPress = () => {
    router.navigate('/(tabs)/(tasks)/modal-calendar');
  };

  return (
    <ViewContainer>
      <Header
        title="Weekly Overview"
        icon={<MaterialIcons name="calendar-month" size={24} color={Colors.primary} />}
        onIconPress={onCalendarPress}
      />
      {selectedWeek && (
        <Text className="text-secondary font-medium mb-6">
          {weekRangeFormatter(selectedWeek.start, selectedWeek.end)}
        </Text>
      )}

      <View className="flex-1">
        {selectedWeek && <Subheader title="Daily Breakdown" />}

        {isLoading && (
          <View className={cn('flex-1 justify-center items-center')}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        )}

        {isError && (
          <Text className="text-red-500 text-center mt-4 mb-6">
            Ошибка загрузки. Попробуйте снова.
          </Text>
        )}

        {!isLoading && !isError && (
          <FlatList
            className="pt-2"
            showsVerticalScrollIndicator={false}
            data={dayCards}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DayCard item={item} today={isSameDay(item.date, new Date())} />
            )}
          />
        )}
      </View>
    </ViewContainer>
  );
}
