import { Task } from '../../types/Task';

export type FilterType = 'All' | 'Active' | 'Completed';

export function filterTasks(tasks: Task[], filter: FilterType): Task[] {
  switch (filter) {
    case 'Active':
      return tasks.filter((t) => !t.done);
    case 'Completed':
      return tasks.filter((t) => t.done);
    default:
      return tasks;
  }
}
