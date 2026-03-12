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

export const useDeleteTask = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  return useMutation({
    mutationFn: (taskId: string) => {
      if (!user) throw new Error('User is not authenticated');
      return taskService.remove(user.uid, taskId);
    },

    onMutate: async (taskId) => {
      if (!user) return;

      const loadToast = toast.custom(
        <CustomToast title={t('ui_texts.toast.on_deleting')} loading />,
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
        (old = []) => old.filter((t) => t.id !== taskId),
      );

      return { previousTasks, loadToast };
    },

    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context?.loadToast);
      toast.custom(
        <CustomToast
          title={t('ui_texts.toast.ok_title')}
          description={t('ui_texts.toast.on_deleting_done')}
          icon={<MaterialIcons name="check-circle-outline" size={24} color="green" />}
        />,
        { duration: 4000 },
      );
    },

    onError: (_err, _variables, context) => {
      if (!user) return;
      toast.dismiss(context?.loadToast);
      toast.error(t('ui_texts.toast.on_deleting_error'));
      queryClient.setQueryData(
        ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
        context?.previousTasks,
      );
    },

    onSettled: () => {
      if (!user) return;
      queryClient.invalidateQueries({
        queryKey: ['tasks', user.uid, selectedWeek?.start, selectedWeek?.end],
      });
    },
  });
};
