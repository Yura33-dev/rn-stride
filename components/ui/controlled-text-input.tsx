import Colors from '@/constants/Colors';
import { cn } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useState } from 'react';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { ReturnKeyTypeOptions, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface IControlledTextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  errors?: FieldErrors<T>;
  onNextElementFocus?: () => void;
  elementRef?: React.RefObject<TextInput | null>;
  containerClassName?: string;
  inputClassName?: string;
  returnKeyType?: ReturnKeyTypeOptions;
  numberOfLines?: number;
  maxLength?: number;
  textAlignVertical?: 'center' | 'auto' | 'top' | 'bottom';
  editable?: boolean;
  multiline?: boolean;
  secureTextEntry?: boolean;
}

export default function ControlledTextInput<T extends FieldValues>({
  name,
  control,
  label = undefined,
  placeholder = undefined,
  errors = undefined,
  onNextElementFocus,
  elementRef,
  containerClassName = undefined,
  inputClassName = undefined,
  returnKeyType,
  numberOfLines,
  maxLength,
  textAlignVertical,
  editable,
  multiline,
  secureTextEntry,
}: IControlledTextInputProps<T>) {
  const [isShown, setIsShown] = useState(false);

  return (
    <View className={cn('gap-3', containerClassName && containerClassName)}>
      {label && <Text className="uppercase text-gray-400 font-semibold text-xs">{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <View className="relative">
            <TextInput
              ref={elementRef}
              className={cn(
                'p-4 bg-[#13243f] text-gray-300 rounded-xl border',
                inputClassName && inputClassName,
                secureTextEntry && 'pr-14',
                errors?.[name] ? 'border-red-500' : 'border-gray-600',
              )}
              placeholder={placeholder}
              placeholderTextColor={Colors.placeholder}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              returnKeyType={returnKeyType}
              onSubmitEditing={onNextElementFocus}
              numberOfLines={numberOfLines}
              maxLength={maxLength}
              textAlignVertical={textAlignVertical}
              editable={editable}
              multiline={multiline}
              secureTextEntry={isShown ? false : secureTextEntry}
            />
            {secureTextEntry && (
              <TouchableOpacity
                className=" h-full w-14 items-center justify-center absolute bottom-0 right-0 p-2"
                onPress={() => setIsShown((value) => !value)}
              >
                <MaterialIcons name="remove-red-eye" size={18} color="white" />
                {isShown && (
                  <View className="w-[30] h-[2] bg-gray-400 rounded-xl rotate-45 absolute top-[22] right-[10]"></View>
                )}
              </TouchableOpacity>
            )}
          </View>
        )}
      />
      {errors?.[name] && (
        <Text className="text-red-400 text-xs">{errors[name]?.message as string}</Text>
      )}
    </View>
  );
}
