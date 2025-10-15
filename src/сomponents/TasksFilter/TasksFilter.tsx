import { useState } from 'react';
import { useTasks } from '../../context/tasks/TasksContext';
import styles from './TasksFilter.module.scss';

type FilterType = 'All' | 'Active' | 'Completed';

const TasksFilter: React.FC = () => {
  const { setFilter } = useTasks();
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');

  const handleFilterChange = (filter: FilterType): void => {
    setActiveFilter(filter);
    setFilter(filter);
  };

  return (
    <ul className={styles.filters}>
      <li>
        <button
          type="button"
          className={activeFilter === 'All' ? styles.active : ''}
          onClick={() => handleFilterChange('All')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Active' ? styles.active : ''}
          onClick={() => handleFilterChange('Active')}
        >
          Active
        </button>
      </li>
      <li>
        <button
          type="button"
          className={activeFilter === 'Completed' ? styles.active : ''}
          onClick={() => handleFilterChange('Completed')}
        >
          Completed
        </button>
      </li>
    </ul>
  );
};

export default TasksFilter;