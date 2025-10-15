import { useState, ChangeEvent, FormEvent } from 'react';
import { useTasks } from '../../context/tasks/TasksContext';
import { createTodoItem } from '../../utils/tasks/createTodoItem';
import { filterTimerField } from '../../utils/filterTimerField';
import styles from './NewTaskForm.module.scss';

const NewTaskForm: React.FC = () => {
  const { setTasks } = useTasks();
  const [description, setDescription] = useState('');
  const [min, setMin] = useState('');
  const [sec, setSec] = useState('');

  const addItem = (text: string, time: number) => {
    const isTimerStarted = time === 0;
    const timerType: 'countup' | 'countdown' = time === 0 ? 'countup' : 'countdown';
    const newItem = createTodoItem(text, time, true, isTimerStarted, timerType);
    setTasks((current) => [...current, newItem]);
  };

  const onDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value);
  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) =>
    setMin(filterTimerField(e.target.value));
  const onChangeSec = (e: ChangeEvent<HTMLInputElement>) =>
    setSec(filterTimerField(e.target.value));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const minutes = parseInt(min, 10) || 0;
    const seconds = parseInt(sec, 10) || 0;
    const totalSeconds = minutes * 60 + seconds || 5 * 60;

    if (description.trim()) {
      addItem(description.trim(), totalSeconds);
      setDescription('');
      setMin('');
      setSec('');
    }
  };

  return (
    <header className={styles.header}>
      <h1>Todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className={styles['new-todo']}
          placeholder="What needs to be done?"
          onChange={onDescriptionChange}
          value={description}
        />
        <input
          type="number"
          className={styles['new-todo-form__timer']}
          placeholder="Min"
          value={min}
          onChange={onChangeMin}
          min="0"
          max="59"
        />
        <input
          type="number"
          className={styles['new-todo-form__timer']}
          placeholder="Sec"
          value={sec}
          onChange={onChangeSec}
          min="0"
          max="59"
        />
        <button type="submit" hidden>
          Add Task
        </button>
      </form>
    </header>
  );
};

export default NewTaskForm;
