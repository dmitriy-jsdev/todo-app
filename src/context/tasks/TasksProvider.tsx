import { useState, useEffect, type PropsWithChildren } from 'react';
import { TasksContext, type Filter } from './TasksContext';
import { createTodoItem } from '../../utils/tasks/createTodoItem';
import type { Task } from '../../types/Task';

export function TasksProvider({ children }: PropsWithChildren) {
  const [tasks, setTasks] = useState<Task[]>([
    createTodoItem('First task', 300, true),
    createTodoItem('Second task', 300, true),
    createTodoItem('Third task', 300, true),
  ]);
  const [filter, setFilter] = useState<Filter>('All');

  useEffect(() => {
    const id = setInterval(() => {
      setTasks(curr => curr.map(task => {
        if (task.pause) return task;
        if (task.timerType === 'countdown') {
          if (task.time > 0) return { ...task, time: task.time - 1 };
          return { ...task, time: 0, pause: true };
        }
        if (task.timerType === 'countup' && task.isTimerStarted) {
          return { ...task, time: task.time + 1 };
        }
        return task;
      }));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <TasksContext.Provider value={{ tasks, setTasks, filter, setFilter }}>
      {children}
    </TasksContext.Provider>
  );
}