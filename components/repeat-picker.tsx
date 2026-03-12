import Colors from '@/constants/Colors';
import { useRepeatOptions } from '@/hooks';
import { ITask } from '@/types/interfaces';
import { cn } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { Pressable, Switch, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface IRepeatPickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  setValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  task: ITask | undefined;
  label: string;
}

export default function RepeatPicker<T extends FieldValues>({
  control,
  name,
  setValue,
  watch,
  task,
  label,
}: IRepeatPickerProps<T>) {
  const [showRepeat, setShowRepeat] = useState(false);
  const repeatableHeight = useSharedValue(0);

  const togglePicker = () => {
    if (showRepeat) setValue(name, 'none' as PathValue<T, Path<T>>);
    setShowRepeat((value) => !value);
  };

  const animatedRepeatStyle = useAnimatedStyle(() => ({
    height: repeatableHeight.value,
    overflow: 'hidden',
  }));

  useEffect(() => {
    repeatableHeight.value = withSpring(showRepeat ? 225 : 0, {
      damping: 20,
      stiffness: 200,
      overshootClamping: true,
    });
  }, [showRepeat]);

  useEffect(() => {
    if (task) {
      setShowRepeat(task.repeatable !== 'none');
    }
  }, [task]);

  const dateForTask = watch('date' as Path<T>);

  const options = useRepeatOptions(dateForTask);

  return (
    <View className=" px-4 py-3">
      <View className="flex-row justify-between">
        <View className="flex-row items-center gap-4">
          <MaterialIcons name="event-repeat" size={24} color={Colors.warning} />
          <Text className="text-white">{label}</Text>
        </View>

        <Switch
          value={showRepeat}
          onValueChange={togglePicker}
          trackColor={{ false: '#374151', true: Colors.primary }}
          thumbColor="#ffffff"
          ios_backgroundColor="#374151"
        />
      </View>

      <Animated.View style={animatedRepeatStyle}>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, value } }) => (
            <View className="flex-row flex-wrap gap-3 mt-6">
              {options.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => onChange(value === option.value ? 'none' : option.value)}
                  className={cn(
                    'px-4 py-2 rounded-full border',
                    value === option.value
                      ? 'bg-primary border-primary'
                      : 'bg-transparent border-gray-600',
                  )}
                >
                  <Text className={value === option.value ? 'text-white' : 'text-gray-400'}>
                    {option.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}
