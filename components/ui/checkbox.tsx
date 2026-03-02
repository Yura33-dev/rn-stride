import { cn } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { Pressable, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';

interface ICheckboxProps {
  checked: boolean;
  onPress?: () => void;
  icon?: ComponentProps<typeof MaterialIcons>;
}

export default function Checkbox({ onPress, checked, icon }: ICheckboxProps) {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(checked ? 1 : 0) }],
    opacity: withSpring(checked ? 1 : 0),
  }));

  return (
    <Pressable
      hitSlop={8}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      className={cn(
        'w-8 h-8 rounded-md border-blue-800/70 border-[2px] flex-row items-center gap-2',
      )}
      style={({ pressed }) => [pressed && { opacity: 0.7 }]}
      onPress={onPress}
    >
      <View className="flex-1 h-full items-center justify-center">
        <Animated.View style={animatedStyle}>
          <MaterialIcons {...icon} />
        </Animated.View>
      </View>
    </Pressable>
  );
}
