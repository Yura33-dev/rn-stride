import { dateFnsLocales } from '@/constants';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from './useLanguage';

type RepeatOption = {
  label: string;
  value: 'days' | 'workDays' | 'weeks' | 'months' | 'years' | 'none';
};

export function useRepeatOptions(dateForTask: Date): RepeatOption[] {
  const { t } = useTranslation();
  const { currentLanguage } = useLanguage();
  const locale = dateFnsLocales[currentLanguage];

  return useMemo(
    () => [
      { label: t('modals.task_modal.repeat_options.days'), value: 'days' },
      { label: t('modals.task_modal.repeat_options.work_days'), value: 'workDays' },
      {
        label: t('modals.task_modal.repeat_options.weeks', {
          weekDay: format(dateForTask, 'EEEE', { locale }),
        }),
        value: 'weeks',
      },
      {
        label: t('modals.task_modal.repeat_options.months', {
          day: format(dateForTask, 'd', { locale }),
        }),
        value: 'months',
      },
      {
        label: t('modals.task_modal.repeat_options.years', {
          dateAndMonth: format(dateForTask, 'd MMMM', { locale }),
        }),
        value: 'years',
      },
    ],
    [t, dateForTask, locale],
  );
}
