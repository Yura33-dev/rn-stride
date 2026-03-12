import { queryClient } from '@/api/query-client';
import { taskService } from '@/api/services';
import CustomToast from '@/components/ui/CustomToast';
import { ITask } from '@/types/interfaces';
import { getNextScheduledDate } from '@/utilities';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';
import { useAuth } from '../useAuth';

export const useUpdateTaskStatus = (weekStart: Date, weekEnd: Date) => {
  const { user } = useAuth();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: ({ taskId, completed }: { taskId: string; completed: boolean }) => {
      if (!user) throw new Error('User is not authenticated');

      if (completed) {
        const tasks = queryClient.getQueryData<ITask[]>(['tasks', user.uid, weekStart, weekEnd]);
        const task = tasks?.find((t) => t.id === taskId);

        if (task && task.repeatable !== 'none') {
          const nextDate = getNextScheduledDate(task.scheduledAt, task.repeatable);

          if (nextDate) {
            return taskService.update(user.uid, taskId, {
              ...task,
              scheduledAt: nextDate,
              completed: false,
              updatedAt: new Date(),
            });
          }
        }
      }

      return taskService.updateStatus(user.uid, taskId, completed);
    },

    onMutate: async ({ taskId }: { taskId: string; completed: boolean }) => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ['tasks', user.uid, weekStart, weekEnd] });

      const previousTasks = queryClient.getQueryData<ITask[]>([
        'tasks',
        user.uid,
        weekStart,
        weekEnd,
      ]);

      queryClient.setQueryData<ITask[]>(['tasks', user.uid, weekStart, weekEnd], (old = []) =>
        old.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
      );

      return { previousTasks };
    },

    onSuccess: (_data, variables) => {
      if (!variables.completed) return;

      toast.custom(
        <CustomToast
          title={t('ui_texts.toast.nice_title')}
          description={t('ui_texts.toast.on_completing_done')}
          icon={<MaterialIcons name="check-circle-outline" size={24} color="green" />}
        />,
        { duration: 4000 },
      );
    },

    onError: (_err, _id, context) => {
      if (context?.previousTasks) {
        if (!user) return;
        toast.error(t('ui_texts.toast.on_updating_error'));
        queryClient.setQueryData(['tasks', user.uid, weekStart, weekEnd], context.previousTasks);
      }
    },

    onSettled: () => {
      if (!user) return;
      queryClient.invalidateQueries({ queryKey: ['tasks', user.uid, weekStart, weekEnd] });
    },
  });
};
