import { ITask } from '@/types/interfaces';
import { cn } from '@/utilities';
import { format, isBefore } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { Pressable, Text, View } from 'react-native';
import Animated, { interpolate, SharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Checkbox from './ui/checkbox';

interface ITaskCardProps {
  item: ITask;
  onSwitchTaskStatus: ({ taskId, completed }: { taskId: string; completed: boolean }) => void;
  swipeProgress: SharedValue<number>;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TaskCard({ item, onSwitchTaskStatus, swipeProgress }: ITaskCardProps) {
  const { t } = useTranslation();
  const isOverdue = isBefore(item.scheduledAt, new Date()) && !item.completed;

  const animatedStyle = useAnimatedStyle(() => ({
    borderTopRightRadius: interpolate(swipeProgress.value, [0, 1], [12, 0]),
    borderBottomRightRadius: interpolate(swipeProgress.value, [0, 1], [12, 0]),
  }));

  return (
    <AnimatedPressable
      className={cn(
        'p-4 bg-blue-700/30 rounded-xl flex-row justify-center items-center gap-4',
        item.completed && 'bg-gray-700/70',
      )}
      style={animatedStyle}
    >
      <Checkbox
        checked={item.completed}
        icon={{ name: 'done', size: 24, color: 'gray' }}
        onPress={() => onSwitchTaskStatus({ taskId: item.id, completed: !item.completed })}
      />

      <View className="flex-1">
        <View className="mb-3">
          <Text
            className={cn(
              'font-semibold text-xl leading-none text-white',
              item.completed && 'text-gray-400 line-through',
            )}
          >
            {item.title}
          </Text>
        </View>
        <View>
          <Text
            className={cn(
              'font-light text-gray-400',
              item.completed && 'text-gray-600 line-through',
              isOverdue && 'text-red-600 font-semibold',
            )}
          >
            {t('ui_texts.at_time', { time: format(item.scheduledAt, 'HH:mm') })}
            {!isOverdue && item.description && item.description}
          </Text>
        </View>
      </View>

      <View className="justify-center">
        <View className="flex-row gap-2 justify-center items-center">
          <View
            className={cn(
              'rounded-md px-2 py-1',
              item.priority === 'high'
                ? 'bg-red-400/30'
                : item.priority === 'medium'
                  ? 'bg-yellow-400/30'
                  : 'bg-green-400/30',
              item.completed && 'bg-gray-600/60',
            )}
          >
            <Text
              className={cn(
                'uppercase font-bold text-xs',
                item.priority === 'high'
                  ? 'text-red-500/90'
                  : item.priority === 'medium'
                    ? 'text-yellow-500/90'
                    : 'text-green-500/90',
                item.completed && 'text-gray-500',
              )}
            >
              {item.priority === 'medium' ? 'med' : item.priority}
            </Text>
          </View>

          <View
            className={cn(
              'h-14 w-1.5 rounded-md',
              item.priority === 'high'
                ? 'bg-red-500'
                : item.priority === 'medium'
                  ? 'bg-yellow-500'
                  : 'bg-green-500',
              item.completed && 'bg-gray-600/60',
            )}
          ></View>
        </View>
      </View>
    </AnimatedPressable>
  );
}
