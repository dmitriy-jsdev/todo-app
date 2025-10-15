import { useState } from 'react';
import { useTasks } from '../../context/tasks/TasksContext';
import Task from '../Task/Task';
import { filterTasks } from '../../utils/tasks/filterTasks';
import styles from './TaskList.module.scss';

const TaskList: React.FC = () => {
  const { tasks, filter } = useTasks();
  const [editingId, setEditingId] = useState<string | null>(null);

  const visibleTasks = filterTasks(tasks, filter);

  return (
    <ul className={styles['todo-list']}>
      {visibleTasks.map((task) => (
        <li key={task.id} className={styles['todo-list-item']}>
          <Task
            id={task.id}
            description={task.description}
            created={task.created}
            done={task.done}
            time={task.time}
            pause={task.pause}
            isTimerStarted={task.isTimerStarted}
            timerType={task.timerType}
            isEditing={task.id === editingId}
            startEditing={() => setEditingId(task.id)}
            stopEditing={() => setEditingId(null)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
