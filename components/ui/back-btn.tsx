import { cn } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';
import { Pressable, Text } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

interface IBackButtonProps {
  title?: string;
  onlyIcon?: boolean;
  className?: string | null;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function BackButton({
  title = 'Cancel',
  onlyIcon = false,
  className = null,
}: IBackButtonProps) {
  const router = useNavigation();

  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(pressed.value, [0, 1], [1, 0.5]),
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      className={cn(
        'w-max h-max flex-row items-center py-0.5',
        onlyIcon && 'pr-4',
        className && className,
      )}
      onPress={() => router.goBack()}
      onPressIn={() => {
        pressed.value = withSpring(1);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0);
      }}
    >
      <MaterialIcons name="arrow-back-ios" size={20} color="white" />
      {!onlyIcon && <Text className="text-lg text-white">{title ? title : 'Cancel'}</Text>}
    </AnimatedPressable>
  );
}
