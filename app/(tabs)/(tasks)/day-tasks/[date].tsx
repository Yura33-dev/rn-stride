import Header from '@/components/header';
import Subheader from '@/components/subheader';
import TaskCard from '@/components/task-card';
import ViewContainer from '@/components/view-container';
import { useUpdateTaskStatus, useWeekTasks } from '@/hooks';
import { useWeekStore } from '@/store';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { Text } from 'react-native';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

export default function DayTasksScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { data: weeksTasks = [] } = useWeekTasks();

  const selectedWeek = useWeekStore((state) => state.selectedWeek);
  const { mutate: switchStatus } = useUpdateTaskStatus(selectedWeek!.start, selectedWeek!.end);

  const { activeTasks, completedTasks, sortedTasks } = useMemo(() => {
    const filtered = weeksTasks.filter((task) => task.date === date);
    const activeTasks = filtered
      .filter((t) => !t.completed)
      .sort((a, b) => a.time.localeCompare(b.time));
    const completedTasks = filtered.filter((t) => t.completed);
    return {
      activeTasks,
      completedTasks,
      sortedTasks: [...activeTasks, ...completedTasks],
    };
  }, [weeksTasks, date]);

  const onSwitchTaskStatus = (id: string) => {
    switchStatus(id);
  };

  return (
    <ViewContainer>
      <Header title="Daily Tasks" withGoBack />
      <Text className="text-secondary font-medium mt-2 mb-6">{format(date, 'd MMMM, yyyy')}</Text>

      {sortedTasks.length > 0 ? (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={sortedTasks}
          keyExtractor={(task) => task.id}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item, index }) => (
            <>
              {index === 0 && (
                <Subheader
                  title={activeTasks.length === 0 ? 'No active tasks' : 'Active Tasks'}
                  className="mt-8"
                />
              )}
              {index === activeTasks.length && completedTasks.length > 0 && (
                <Subheader title="Completed Tasks" className="mt-8" />
              )}

              <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
                <TaskCard item={item} onSwitchTaskStatus={onSwitchTaskStatus} />
              </Animated.View>
            </>
          )}
        />
      ) : (
        <Text className="text-center text-gray-500 text-2xl mt-4">
          There are no tasks for this day
        </Text>
      )}
    </ViewContainer>
  );
}
