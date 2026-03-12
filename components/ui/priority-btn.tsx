import { ITask } from '@/types/interfaces';
import { useEffect } from 'react';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface IPriorityButtonPros {
  priority: {
    value: ITask['priority'];
    label: string;
    color: string;
  };
  isActive: boolean;
  onPress: () => void;
}

export function PriorityButton({ priority, isActive, onPress }: IPriorityButtonPros) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withSpring(isActive ? 1 : 0, {
      damping: 35,
      stiffness: 450,
      overshootClamping: true,
    });
  }, [isActive]);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    backgroundColor: `${priority.color}${Math.round(opacity.value * 51)
      .toString(16)
      .padStart(2, '0')}`,
    transform: [{ scale: scale.value }],
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: 0.4 + opacity.value * 0.6,
  }));

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.95);
      }}
      onPressOut={() => {
        scale.value = withSpring(1);
      }}
      style={[
        { flex: 1, padding: 10, borderRadius: 8, alignItems: 'center' },
        animatedContainerStyle,
      ]}
    >
      <Animated.Text
        style={[
          { fontWeight: '600', color: isActive ? priority.color : '#9ca3af' },
          animatedTextStyle,
        ]}
      >
        {priority.label}
      </Animated.Text>
    </AnimatedPressable>
  );
}
