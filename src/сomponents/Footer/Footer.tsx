import React from 'react';
import TasksFilter from '../TasksFilter/TasksFilter';
import { useTasks } from '../../context/tasks/TasksContext';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  const { tasks, setTasks } = useTasks();
  const count = tasks.filter(({ done }) => !done).length;

  const clearCompleted = (): void => {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.done));
  };

  return (
    <footer className={styles.footer}>
      <span className={styles['todo-count']}>{count} items left</span>
      <TasksFilter />
      <button type="button" className={styles['clear-completed']} onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
