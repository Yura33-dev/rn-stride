import { z } from 'zod';
import { TFunction } from 'i18next';

export const getTaskSchema = (t: TFunction) =>
  z.object({
    title: z
      .string()
      .min(1, t('task_validation.title.required'))
      .min(3, t('task_validation.title.tooShort'))
      .max(30, t('task_validation.title.tooLong')),

    description: z.string().max(70, t('task_validation.description.tooLong')).nullable(),

    repeatable: z.enum(['days', 'workDays', 'weeks', 'months', 'years', 'none']),

    date: z.date().refine(
      (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      { message: t('task_validation.date.past') },
    ),

    time: z.date(),

    priority: z.enum(['low', 'medium', 'high'], {
      message: t('task_validation.priority.required'),
    }),
  });

export type TaskFormData = z.infer<ReturnType<typeof getTaskSchema>>;
