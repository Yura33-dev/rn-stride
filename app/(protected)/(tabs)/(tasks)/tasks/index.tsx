import DailyTaskItem from '@/components/daily-task-item';
import Header from '@/components/header';
import Subheader from '@/components/subheader';
import ViewContainer from '@/components/view-container';
import { dateFnsLocales } from '@/constants';
import { useLanguage, useUpdateTaskStatus, useWeekTasks } from '@/hooks';
import { useWeekStore } from '@/store';
import { format, isSameDay } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

export default function DayTasksScreen() {
  const { date } = useLocalSearchParams<{ date: string }>();
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const { data: weeksTasks = [] } = useWeekTasks();

  const selectedWeek = useWeekStore((state) => state.selectedWeek);
  const { mutate: switchStatus } = useUpdateTaskStatus(selectedWeek!.start, selectedWeek!.end);

  const { activeTasks, completedTasks, sortedTasks } = useMemo(() => {
    const filtered = weeksTasks.filter((task) => isSameDay(task.scheduledAt, new Date(date)));

    const activeTasks = filtered
      .filter((t) => !t.completed)
      .sort((a, b) => new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime());

    const completedTasks = filtered.filter((t) => t.completed);
    return {
      activeTasks,
      completedTasks,
      sortedTasks: [...activeTasks, ...completedTasks],
    };
  }, [weeksTasks, date]);

  return (
    <ViewContainer>
      <Header
        title={format(date, 'd MMMM, yyyy', { locale: dateFnsLocales[currentLanguage] })}
        withGoBack
      />

      {sortedTasks.length > 0 ? (
        <Animated.FlatList
          showsVerticalScrollIndicator={false}
          data={sortedTasks}
          keyExtractor={(task) => task.id}
          itemLayoutAnimation={LinearTransition}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item, index }) => (
            <>
              {index === 0 && (
                <Subheader
                  title={
                    activeTasks.length === 0
                      ? t('ui_texts.no_active_tasks')
                      : t('ui_texts.active_tasks')
                  }
                  className="mt-8"
                />
              )}
              {index === activeTasks.length && completedTasks.length > 0 && (
                <Subheader title={t('ui_texts.completed_tasks')} className="mt-8" />
              )}

              <DailyTaskItem item={item} switchStatus={switchStatus} />
            </>
          )}
        />
      ) : (
        <Text className="text-center text-gray-500 text-xl mt-12">
          {t('ui_texts.no_more_tasks')}
        </Text>
      )}
    </ViewContainer>
  );
}
