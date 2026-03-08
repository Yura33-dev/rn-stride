import { cn } from '@/utilities';
import { format } from 'date-fns';
import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface IDayCardProps {
  item: {
    id: string;
    date: Date;
    label: string;
    total: number;
    completed: number;
    progress: number;
  };
  today?: boolean;
}

export default function DayCard({ item, today }: IDayCardProps) {
  const router = useRouter();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPressIn={() => {
        scale.value = withSpring(0.96);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      onPress={() =>
        router.navigate({
          pathname: '/(tabs)/(tasks)/tasks',
          params: { date: format(item.date, 'yyyy-MM-dd') },
        })
      }
    >
      <View
        className={cn(
          'p-4 my-2 bg-blue-700/30 rounded-xl relative',
          today && 'border-[3px] border-primary',
        )}
      >
        <View className="flex-row justify-between items-center">
          <Text className="text-white font-bold text-base">{item.label}</Text>

          <Text
            className={cn(
              'text-xs font-medium',
              item.completed === item.total && item.total !== 0
                ? 'text-green-600'
                : 'text-blue-300/70',
              item.total === 0 && 'text-blue-300/40',
            )}
          >
            {item.total > 0 ? `${item.completed} / ${item.total} Tasks` : 'No tasks scheduled'}
          </Text>
        </View>

        <View className="bg-blue-900/70 w-full h-[6px] mt-4 rounded-xl relative">
          <View
            className={cn(
              'absolute left-0 top-0 rounded-xl h-full',
              item.completed === item.total && item.total !== 0 ? 'bg-green-600' : 'bg-primary',
              item.total === 0 && 'bg-blue-900/70',
            )}
            style={{ width: `${item.progress}%` }}
          />
        </View>

        {today && (
          <View className="absolute -top-[30%] left-5 px-3 py-1.5 bg-primary rounded-lg">
            <Text className="font-bold text-[10px] uppercase text-white">today</Text>
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
}
