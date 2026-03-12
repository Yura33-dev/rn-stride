import { taskService } from '@/api/services';
import { useWeekStore } from '@/store';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';

export const useWeekTasks = () => {
  const { user } = useAuth();
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  return useQuery({
    queryKey: ['tasks', user?.uid, selectedWeek?.start, selectedWeek?.end],
    queryFn: () => {
      if (!user) throw new Error('User is not authenticated');
      return taskService.getTaskForPeriod(user!.uid, selectedWeek!.start, selectedWeek!.end);
    },
    enabled: !!selectedWeek && !!user,
  });
};
