import Colors from '@/constants/Colors';
import { cn } from '@/utilities';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface ISubmitButtonProps {
  onPress: () => void;
  title?: string;
  className?: string;
  textClassName?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function SubmitButton({
  title,
  className,
  textClassName,
  onPress,
  isSubmitting = false,
  disabled = false,
}: ISubmitButtonProps) {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.9]) }],
    backgroundColor: interpolateColor(pressed.value, [0, 1], [Colors.primary, Colors.primaryActiv]),
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={onPress}
      className={cn(className && className)}
      onPressIn={() => {
        pressed.value = withSpring(1);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0);
      }}
      disabled={disabled}
    >
      {isSubmitting ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className={textClassName && textClassName}>{title ? title : 'Save'}</Text>
      )}
    </AnimatedPressable>
  );
}
