import { queryClient } from '@/api/query-client';
import { taskService } from '@/api/services';
import CustomToast from '@/components/ui/CustomToast';
import { useWeekStore } from '@/store';
import { ITask } from '@/types/interfaces';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner-native';
import { v4 as uuidv4 } from 'uuid';
import { useAuth } from '../useAuth';

export const useCreateTask = () => {
  const { user } = useAuth();
  const { t } = useTranslation();
  const selectedWeek = useWeekStore((state) => state.selectedWeek);

  return useMutation({
    mutationFn: (task: Omit<ITask, 'id'>) => {
      if (!user) throw new Error('User is not authenticated');
      return taskService.create(user.uid, task);
    },

    onMutate: async (newTask: Omit<ITask, 'id'>) => {
      if (!user) throw new Error('User is not authenticated');
      if (!selectedWeek) throw new Error('There is no provided selected week');

      const loadToast = toast.custom(
        <CustomToast title={t('ui_texts.toast.on_creating')} loading />,
        {
          duration: Infinity,
        },
      );

      await queryClient.cancelQueries({
        queryKey: ['tasks', user.uid, selectedWeek.start, selectedWeek.end],
      });

      const previousTasks = queryClient.getQueryData<ITask[]>([
        'tasks',
        user.uid,
        selectedWeek.start,
        selectedWeek.end,
      ]);

      queryClient.setQueryData<ITask[]>(
        ['tasks', user.uid, selectedWeek.start, selectedWeek.end],
        (old = []) => [
          ...old,
          {
            ...newTask,
            id: uuidv4(),
          },
        ],
      );

      return { previousTasks, loadToast };
    },

    onSuccess: (_data, _variables, context) => {
      toast.dismiss(context?.loadToast);
      toast.custom(
        <CustomToast
          title={t('ui_texts.toast.ok_title')}
          description={t('ui_texts.toast.on_creating_done')}
          icon={<MaterialIcons name="check-circle-outline" size={24} color="green" />}
        />,
        { duration: 4000 },
      );
    },

    onError: (_err, _newTask, context) => {
      if (!user) return;

      toast.dismiss(context?.loadToast);
      toast.error(t('ui_texts.toast.on_creating_error'));
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
