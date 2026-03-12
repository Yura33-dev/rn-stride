import Colors from '@/constants/Colors';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ITimePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

export default function TimePicker<T extends FieldValues>({
  control,
  name,
  label,
}: ITimePickerProps<T>) {
  const [showTimePicker, setShowTimePicker] = useState(false);

  const pickerTimeHeight = useSharedValue(0);

  useEffect(() => {
    pickerTimeHeight.value = withSpring(showTimePicker ? 200 : 0, {
      damping: 20,
      stiffness: 200,
      overshootClamping: true,
    });
  }, [showTimePicker]);

  const animatedTimeStyle = useAnimatedStyle(() => ({
    height: pickerTimeHeight.value,
    overflow: 'hidden',
  }));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="border-b border-gray-600">
          <Pressable
            className="px-4 py-3 flex-row justify-between"
            onPress={() => setShowTimePicker((value) => !value)}
          >
            <View className="flex-row items-center gap-4">
              <MaterialIcons name="access-time" size={24} color={Colors.foreground} />
              <Text className="text-white">{label}</Text>
            </View>
            <View className="p-3 bg-gray-700 rounded-xl">
              <Text className="text-white">{format(value, 'HH:mm')}</Text>
            </View>
          </Pressable>

          <Animated.View style={animatedTimeStyle}>
            <DateTimePicker
              value={value}
              mode="time"
              themeVariant="dark"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedTime?: Date) => {
                if (event.type === 'set' && selectedTime) {
                  onChange(selectedTime);
                }
              }}
            />
          </Animated.View>
        </View>
      )}
    />
  );
}
