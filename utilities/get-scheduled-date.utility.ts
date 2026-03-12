import { ITask } from '@/types/interfaces';
import { addDays, addMonths, addWeeks, addYears } from 'date-fns';

export const getNextScheduledDate = (date: Date, repeatable: ITask['repeatable']): Date | null => {
  switch (repeatable) {
    case 'days':
      return addDays(date, 1);

    case 'workDays': {
      const next = addDays(date, 1);
      const day = next.getDay();
      if (day === 6) return addDays(next, 2);
      if (day === 0) return addDays(next, 1);
      return next;
    }

    case 'weeks':
      return addWeeks(date, 1);

    case 'months':
      return addMonths(date, 1);

    case 'years':
      return addYears(date, 1);

    case 'none':
      return null;
  }
};
