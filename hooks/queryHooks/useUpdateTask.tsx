import { queryClient } from '@/api/query-client';
import { taskService } from '@/api/services';
import CustomToast from '@/components/ui/CustomToast';
import { useWeekStore } from '@/store';
import { ITask } from '@/types/interfaces';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';
import { useAuth } from '../useAuth';

export const useUpdateTask = () => {
  const { user } = useAuth();
  const selectedWeek = useWeekStore((state) => state.selectedWeek);
  const { t } = useTranslation();

  return useMutation({
    mutationFn: (task: ITask) => {
      if (!user) throw new Error('User is not authenticated');
      return taskService.update(user.uid, task.id, task);
    },

    onMutate: async (task) => {
      if (!user) return;

      const loadToast = toast.custom(
        <CustomToast title={t('ui_texts.toast.on_updating')} loading />,
        {
          duration: Infinity,
        },
      );

      await queryClient.cancelQueries({
        queryKey: ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
      });

      const previousTasks = queryClient.getQueryData<ITask[]>([
        'tasks',
        user.uid,
        selectedWeek?.start,
        selectedWeek?.end,
      ]);

      queryClient.setQueryData<ITask[]>(
        ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
        (old = []) => old.map((t) => (t.id === task.id ? { ...task } : t)),
      );

      return { previousTasks, loadToast };
    },

    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context?.loadToast);
      toast.custom(
        <CustomToast
          title={t('ui_texts.toast.ok_title')}
          description={t('ui_texts.toast.on_updating_done')}
          icon={<MaterialIcons name="check-circle-outline" size={24} color="green" />}
        />,
        { duration: 4000 },
      );
    },

    onError: (_err, _variables, context) => {
      if (!user) return;
      toast.dismiss(context?.loadToast);
      toast.error(t('ui_texts.toast.on_updating_error'));
      queryClient.setQueryData(
        ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
        context?.previousTasks,
      );
    },

    onSettled: (_data, _error, task) => {
      if (!user) return;
      queryClient.invalidateQueries({
        queryKey: ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
      });
      queryClient.invalidateQueries({
        queryKey: ['task', user.uid, task.id],
      });
    },
  });
};
