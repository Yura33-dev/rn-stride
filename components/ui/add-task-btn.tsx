import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import { Pressable } from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AddTaskButton() {
  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(pressed.value, [0, 1], [1, 0.9]) }],
    backgroundColor: interpolateColor(
      pressed.value,
      [0, 1],
      [Colors.primary, Colors.primaryActive],
    ),
  }));

  return (
    <Link href="/(protected)/(tabs)/(tasks)/modal-task" asChild push>
      <AnimatedPressable
        style={animatedStyle}
        className="w-20 h-20 mb-2 justify-center items-center absolute bottom-0 self-center bg-primary rounded-full"
        onPressIn={() => {
          pressed.value = withSpring(1);
        }}
        onPressOut={() => {
          pressed.value = withSpring(0);
        }}
      >
        <MaterialIcons name="add" size={48} color="white" />
      </AnimatedPressable>
    </Link>
  );
}
