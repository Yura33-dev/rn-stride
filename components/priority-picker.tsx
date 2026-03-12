import { PRIORITIES } from '@/constants';
import { useLanguage } from '@/hooks';
import { cn } from '@/utilities';
import { Control, Controller, FieldErrors, FieldValues, Path } from 'react-hook-form';
import { Text, View } from 'react-native';
import { PriorityButton } from './ui/priority-btn';

interface IPriortyPickerProps<T extends FieldValues> {
  label: string;
  control: Control<T>;
  name: Path<T>;
  errors?: FieldErrors<T>;
  containerClassName?: string;
}

export default function PriortyPicker<T extends FieldValues>({
  label,
  control,
  name,
  errors,
  containerClassName,
}: IPriortyPickerProps<T>) {
  const { currentLanguage } = useLanguage();

  return (
    <View className={cn(containerClassName && containerClassName)}>
      {label && <Text className="uppercase text-gray-400 font-semibold text-xs">{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <View
            className={cn(
              'bg-[#13243f] mt-3 rounded-xl flex-row p-1 border',
              errors?.[name] ? 'border-red-500' : 'border-transparent',
            )}
          >
            {PRIORITIES[currentLanguage].map((p) => (
              <PriorityButton
                key={p.value}
                priority={p}
                isActive={value === p.value}
                onPress={() => onChange(p.value)}
              />
            ))}
          </View>
        )}
      />
      {errors?.[name] && (
        <Text className="text-red-400 text-xs mt-1">{errors[name]?.message as string}</Text>
      )}
    </View>
  );
}
