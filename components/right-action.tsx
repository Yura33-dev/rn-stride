import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface IRightActionProps {
  prog: SharedValue<number>;
  drag: SharedValue<number>;
  swipeProgress: SharedValue<number>;
  onEdit: () => void;
  onDelete: () => void;
}

export default function RightAction({
  prog,
  drag,
  swipeProgress,
  onEdit,
  onDelete,
}: IRightActionProps) {
  useAnimatedReaction(
    () => prog.value,
    (value) => {
      swipeProgress.value = value;
    },
  );

  const deleteStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(drag.value, [-120, 0], [0, 60], Extrapolation.CLAMP) }],
    opacity: interpolate(drag.value, [-120, -60, 0], [1, 1, 0]),
  }));

  const editStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: interpolate(drag.value, [-120, -90, 0], [0, 35, 120], Extrapolation.CLAMP) },
    ],
    opacity: interpolate(drag.value, [-120, -40, 0], [1, 0.8, 0]),
  }));

  return (
    <View className="flex-row">
      <Animated.View style={editStyle}>
        <TouchableOpacity
          className="justify-center items-center w-[60] bg-primary flex-1"
          onPress={onEdit}
        >
          <MaterialIcons name="edit" size={24} color="white" className="p-2" />
        </TouchableOpacity>
      </Animated.View>
      {/*  */}
      <Animated.View style={deleteStyle}>
        <TouchableOpacity
          className="justify-center items-center w-[60] bg-error rounded-tr-xl rounded-br-xl flex-1"
          onPress={onDelete}
        >
          <MaterialIcons name="delete" size={24} color="white" className="p-2" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
