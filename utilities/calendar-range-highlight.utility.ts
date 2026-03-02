import Colors from '@/constants/Colors';
import { SelectedWeek } from '@/store/weekStore';
import { format } from 'date-fns';

export const getMarkedDates = (week: SelectedWeek) => {
  if (!week) return {};

  const marked: Record<string, any> = {};
  week.days.forEach((d, index) => {
    const dateStr = format(d, 'yyyy-MM-dd');
    marked[dateStr] = {
      color: Colors.primary,
      textColor: 'white',
      startingDay: index === 0,
      endingDay: index === 6,
    };
  });
  return marked;
};
