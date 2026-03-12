import { dateFnsLocales } from '@/constants';
import Colors from '@/constants/Colors';
import { useLanguage } from '@/hooks';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Platform, Pressable, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface IDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  label: string;
}

export default function DatePicker<T extends FieldValues>({
  control,
  name,
  errors,
  label,
}: IDatePickerProps<T>) {
  const { currentLanguage } = useLanguage();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickerDateHeight = useSharedValue(0);

  const animatedDateStyle = useAnimatedStyle(() => ({
    height: pickerDateHeight.value,
    overflow: 'hidden',
  }));

  useEffect(() => {
    pickerDateHeight.value = withSpring(showDatePicker ? 200 : 0, {
      damping: 20,
      stiffness: 200,
      overshootClamping: true,
    });
  }, [showDatePicker]);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View className="border-b border-gray-600">
          <Pressable onPress={() => setShowDatePicker((value) => !value)} className="px-4 py-3">
            <View className="flex-row justify-between">
              <View className="flex-row items-center gap-4">
                <MaterialIcons name="calendar-month" size={24} color={Colors.primary} />
                <Text className="text-white">{label}</Text>
              </View>
              <View className="p-3 bg-gray-700 rounded-xl">
                <Text className="text-white">
                  {format(value, 'd MMMM, yyyy', { locale: dateFnsLocales[currentLanguage] })}
                </Text>
              </View>
            </View>
            {errors?.[name] && (
              <Text className="text-red-400 text-xs mt-2">{errors?.[name]?.message as string}</Text>
            )}
          </Pressable>

          <Animated.View style={animatedDateStyle}>
            <DateTimePicker
              locale={currentLanguage}
              value={value}
              mode="date"
              themeVariant="dark"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
                if (event.type === 'set' && selectedDate) {
                  onChange(selectedDate);
                }
              }}
            />
          </Animated.View>
        </View>
      )}
    />
  );
}
