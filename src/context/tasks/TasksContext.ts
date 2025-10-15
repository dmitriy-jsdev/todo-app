import { createContext, useContext } from 'react';
import type { Task } from '../../types/Task';

export type Filter = 'All' | 'Active' | 'Completed';

export type TasksCtx = {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export const TasksContext = createContext<TasksCtx | null>(null);

export function useTasks() {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error('useTasks must be used within <TasksProvider>');
  return ctx;
}