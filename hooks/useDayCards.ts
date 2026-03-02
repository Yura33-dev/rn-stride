import { SelectedWeek } from '@/store/weekStore';
import { ITask } from '@/types/interfaces';
import { format, isSameDay } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const useDayCards = (selectedWeek: SelectedWeek, tasks: ITask[]) => {
  if (!selectedWeek) return [];

  const dayCards = selectedWeek.days.map((day) => {
    const dayTasks = tasks.filter((t) => isSameDay(new Date(t.date), day));

    const total = dayTasks.length;
    const completed = dayTasks.filter((t) => t.completed).length;
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: format(day, 'yyyy-MM-dd'),
      date: day,
      label: format(day, 'EEEE, d MMM', { locale: enUS }),
      total,
      completed,
      progress,
    };
  });

  return dayCards;
};
