export interface ITask {
  id: string;
  title: string;
  description: string | null;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  repeatable: 'days' | 'workDays' | 'weeks' | 'months' | 'years' | 'none';
  scheduledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
