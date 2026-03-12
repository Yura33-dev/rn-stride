import Colors from '@/constants/Colors';
import { cn } from '@/utilities';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
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
  const { t } = useTranslation();
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.9]) }],
    backgroundColor: interpolateColor(pressed.value, [0, 1], [Colors.primary, Colors.primaryActiv]),
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={onPress}
      className={cn(
        'mt-4 p-4 rounded-xl items-center justify-center',
        isSubmitting ? 'bg-blue-800' : 'bg-blue-600',
        className && className,
      )}
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
        <View className="justify-center items-center gap-3">
          <Text className={cn('text-white font-bold text-base', textClassName && textClassName)}>
            {title ? title : t('ui_texts.save_button')}
          </Text>
        </View>
      )}
    </AnimatedPressable>
  );
}
