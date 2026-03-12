import { dateFnsLocales } from '@/constants';
import { Language } from '@/types';
import { format } from 'date-fns';

export const weekRangeFormatter = (start: Date, end: Date, currentLanguage: Language) => {
  const dayStart = format(start, 'd');
  const dayEnd = format(end, 'd');
  const monthAndYear = format(end, 'MMMM, yyyy', { locale: dateFnsLocales[currentLanguage] });

  const capitalizedMonth = monthAndYear.charAt(0).toUpperCase() + monthAndYear.slice(1);

  return `${dayStart} - ${dayEnd} ${capitalizedMonth}`;
};
