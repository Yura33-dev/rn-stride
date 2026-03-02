import { format } from 'date-fns';

export const weekRangeFormatter = (start: Date, end: Date) => {
  const dayStart = format(start, 'd');
  const dayEnd = format(end, 'd');
  const monthAndYear = format(end, 'MMMM, yyyy');

  const capitalizedMonth = monthAndYear.charAt(0).toUpperCase() + monthAndYear.slice(1);

  return `${dayStart} - ${dayEnd} ${capitalizedMonth}`;
};
