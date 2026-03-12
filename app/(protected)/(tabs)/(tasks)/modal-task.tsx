import DatePicker from '@/components/date-picker';
import PriortyPicker from '@/components/priority-picker';
import RepeatPicker from '@/components/repeat-picker';
import TimePicker from '@/components/time-picker';
import ControlledTextInput from '@/components/ui/controlled-text-input';
import SubmitButton from '@/components/ui/submit-btn';
import { useCreateTask, useLanguage, useTask, useUpdateTask } from '@/hooks';
import { getTaskSchema } from '@/schemas';
import { TaskFormData } from '@/types';
import { cn, combineDateAndTime } from '@/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { set, startOfDay } from 'date-fns';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

export default function AddTaskModalScreen() {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();

  const { taskId } = useLocalSearchParams<{ taskId?: string }>();
  const isEditing = !!taskId;

  const { data: task } = useTask(taskId);
  const { mutate: createTask } = useCreateTask();
  const { mutate: updateTask } = useUpdateTask();

  const descriptionRef = useRef<TextInput>(null);

  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: taskId ? t('modals.task_modal.edit_modal') : t('modals.task_modal.add_modal'),
    });
  }, [taskId]);

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
        date: startOfDay(task.scheduledAt),
        time: set(new Date(), {
          hours: task.scheduledAt.getHours(),
          minutes: task.scheduledAt.getMinutes(),
          seconds: 0,
        }),
        priority: task.priority,
        repeatable: task.repeatable,
      });
    }
  }, [task]);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(getTaskSchema(t)),
    mode: 'onBlur',
    defaultValues: {
      title: task?.title ?? '',
      description: task?.description ?? null,
      date: task?.scheduledAt ? startOfDay(task.scheduledAt) : new Date(),
      time: task?.scheduledAt
        ? set(new Date(), {
            hours: task.scheduledAt.getHours(),
            minutes: task.scheduledAt.getMinutes(),
            seconds: 0,
          })
        : new Date(),
      priority: task?.priority ?? 'low',
      repeatable: task?.repeatable ?? 'none',
    },
  });

  const onSubmit = async (data: TaskFormData) => {
    if (isEditing) {
      updateTask({
        ...data,
        id: taskId,
        completed: task?.completed ?? false,
        scheduledAt: combineDateAndTime(data.date, data.time),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } else {
      const newTask = {
        ...data,
        completed: false,
        scheduledAt: combineDateAndTime(data.date, data.time),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { date, time, ...TaskObject } = newTask;

      createTask(TaskObject);
    }
    router.back();
  };

  if (isEditing && !task) return <ActivityIndicator />;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
      className="bg-[#11264783]"
    >
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 py-12 px-4">
          <ControlledTextInput<TaskFormData>
            name="title"
            label={t('modals.task_modal.input_name_label')}
            placeholder={t('modals.task_modal.input_name_placeholder')}
            control={control}
            errors={errors}
            onNextElementFocus={() => descriptionRef.current?.focus()}
            returnKeyType="next"
          />

          <ControlledTextInput<TaskFormData>
            name="description"
            label={t('modals.task_modal.input_desc_label')}
            placeholder={t('modals.task_modal.input_desc_placeholder')}
            containerClassName="mt-4"
            control={control}
            errors={errors}
            elementRef={descriptionRef}
            inputClassName="h-28"
            returnKeyType="default"
            numberOfLines={4}
            maxLength={70}
            textAlignVertical="top"
            editable
            multiline
          />

          <View className="mt-8">
            <Text className="uppercase text-gray-400 font-semibold text-xs">
              {t('modals.task_modal.modal_section_schedule')}
            </Text>

            <View className="bg-[#13243f] mt-3 rounded-xl border border-gray-600 overflow-hidden">
              <DatePicker
                control={control}
                name="date"
                errors={errors}
                label={t('modals.task_modal.schedule_date')}
              />

              <TimePicker
                control={control}
                name="time"
                label={t('modals.task_modal.schedule_time')}
              />

              <RepeatPicker
                control={control}
                name="repeatable"
                setValue={setValue}
                watch={watch}
                task={task}
                label={t('modals.task_modal.schedule_repeatable')}
              />
            </View>
          </View>

          <PriortyPicker
            label={t('modals.task_modal.modal_section_priority')}
            control={control}
            name="priority"
            errors={errors}
            containerClassName="mt-8"
          />

          <SubmitButton
            onPress={handleSubmit(onSubmit)}
            isSubmitting={isSubmitting}
            disabled={isSubmitting || !!errors.title}
            title={isEditing ? t('ui_texts.save_button') : t('ui_texts.create_button')}
            className={cn('mt-10')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
