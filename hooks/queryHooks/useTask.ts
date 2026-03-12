import { taskService } from '@/api/services';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../useAuth';

export const useTask = (taskId?: string) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['task', user?.uid, taskId],
    queryFn: () => {
      if (!user) throw new Error('User is not authenticated');
      if (!taskId) throw new Error('Task ID is required');

      return taskService.getById(user.uid, taskId);
    },

    enabled: !!user && !!taskId,
  });
};
