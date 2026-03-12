import { dateFnsLocales } from '@/constants';
import { SelectedWeek } from '@/store/weekStore';
import { ITask } from '@/types/interfaces';
import { format, isSameDay } from 'date-fns';

export const useDayCards = (
  selectedWeek: SelectedWeek,
  tasks: ITask[],
  currentLanguage: 'en' | 'de' | 'ru',
) => {
  if (!selectedWeek) return [];

  const dayCards = selectedWeek.days.map((day) => {
    const dayTasks = tasks.filter((t) => isSameDay(new Date(t.scheduledAt), day));

    const total = dayTasks.length;
    const completed = dayTasks.filter((t) => t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: format(day, 'yyyy-MM-dd'),
      date: day,
      label: format(day, 'EEEE, d MMMM', { locale: dateFnsLocales[currentLanguage] }),
      total,
      completed,
      progress,
    };
  });

  return dayCards;
};
