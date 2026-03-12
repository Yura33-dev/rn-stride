import { useDeleteTask } from '@/hooks';
import { ITask } from '@/types/interfaces';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert } from 'react-native';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, useSharedValue } from 'react-native-reanimated';
import RightAction from './right-action';
import TaskCard from './task-card';

interface IDailyTaskItemProps {
  item: ITask;
  switchStatus: ({ taskId, completed }: { taskId: string; completed: boolean }) => void;
}

export default function DailyTaskItem({ item, switchStatus }: IDailyTaskItemProps) {
  const { t } = useTranslation();
  const swipeProgress = useSharedValue(0);
  const router = useRouter();

  const swipeableRef = useRef<SwipeableMethods>(null);

  const { mutate: removeTask } = useDeleteTask();

  useFocusEffect(
    useCallback(() => {
      return () => {
        swipeableRef.current?.close();
      };
    }, []),
  );

  const onEditTask = () => {
    router.navigate({
      pathname: '/(protected)/(tabs)/(tasks)/modal-task',
      params: { taskId: item.id },
    });
  };

  const onDeleteTask = (taskId: string) => {
    Alert.alert(
      t('ui_texts.for_sure_header'),
      t('ui_texts.on_delete_task.text', { title: item.title }),
      [
        { text: t('ui_texts.cancel_button'), style: 'cancel' },
        {
          text: t('ui_texts.confirm_button'),
          style: 'destructive',
          onPress: () => removeTask(taskId),
        },
      ],
    );
  };

  return (
    <Animated.View entering={FadeIn.duration(500)} exiting={FadeOut.duration(500)}>
      <ReanimatedSwipeable
        ref={swipeableRef}
        friction={5}
        rightThreshold={10}
        renderRightActions={(prog, drag) => (
          <RightAction
            prog={prog}
            drag={drag}
            swipeProgress={swipeProgress}
            onEdit={onEditTask}
            onDelete={() => onDeleteTask(item.id)}
          />
        )}
      >
        <TaskCard item={item} onSwitchTaskStatus={switchStatus} swipeProgress={swipeProgress} />
      </ReanimatedSwipeable>
    </Animated.View>
  );
}
