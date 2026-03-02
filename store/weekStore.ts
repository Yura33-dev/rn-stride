import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
import { create } from 'zustand';

export type SelectedWeek = {
  start: Date;
  end: Date;
  days: Date[];
} | null;

interface WeekStore {
  selectedWeek: SelectedWeek;
  setSelectedWeek: (week: SelectedWeek) => void;
}

const getWeekRange = (date: Date): SelectedWeek => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const end = endOfWeek(date, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start, end });

  return { start, end, days };
};

export const useWeekStore = create<WeekStore>((set) => ({
  selectedWeek: getWeekRange(new Date()),
  setSelectedWeek: (week) => set({ selectedWeek: week }),
}));
