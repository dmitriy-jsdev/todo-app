import { useState, useRef, useEffect } from 'react';
import { useTasks } from '../../context/tasks/TasksContext';
import TextareaAutosize from 'react-textarea-autosize';
import styles from './Task.module.scss';
import { Task as TaskModel } from '../../types/Task';
import { formatTaskCreated } from '../../utils/formatTaskCreated';

interface TaskProps extends TaskModel {
  startEditing: () => void;
  stopEditing: () => void;
}

const Task: React.FC<TaskProps> = ({
  id,
  description,
  created,
  done,
  time,
  pause,
  isEditing,
  startEditing,
  stopEditing,
}) => {
  const { setTasks } = useTasks();
  const [editText, setEditText] = useState(description);
  const prevPauseRef = useRef(pause);
  const editInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      const input = editInputRef.current;
      input.focus();
      input.selectionStart = input.value.length;
    }
  }, [isEditing]);

  const updateTasks = (updateFunc: (t: TaskModel) => TaskModel) => {
    setTasks((curr) => curr.map((t) => (t.id === id ? updateFunc(t) : t)));
  };

  const onToggleDone = () => {
    updateTasks((task) => {
      if (!task.done) {
        prevPauseRef.current = task.pause;
        return { ...task, done: true, pause: true };
      }
      return { ...task, done: false, pause: prevPauseRef.current };
    });
  };

  const toggleTimer = () => {
    updateTasks((task) => (task.done ? task : { ...task, pause: !task.pause }));
  };

  const deleteItem = () => {
    setTasks((curr) => curr.filter((t) => t.id !== id));
  };

  const handleEdit = () => {
    if (isEditing) {
      saveEdit();
    } else {
      startEditing();
    }
  };

  const saveEdit = () => {
    updateTasks((t) => ({ ...t, description: editText }));
    stopEditing();
  };

  const cancelEdit = () => {
    setEditText(description);
    stopEditing();
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      saveEdit();
      return;
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      cancelEdit();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const next = e.relatedTarget as HTMLElement | null;
    if (next?.dataset?.editBtn === '1') return;
    saveEdit();
  };

  const taskTime = formatTaskCreated(created);

  const titleClass = done ? `${styles.title} ${styles.completed}` : styles.title;
  const playPauseClass = pause ? styles['icon-play'] : styles['icon-pause'];

  return (
    <div className={styles.view}>
      <input
        className={styles.toggle}
        type="checkbox"
        checked={done}
        onChange={onToggleDone}
        id={`toggle-${id}`}
      />
      <label htmlFor={`toggle-${id}`}>
        {isEditing ? (
          <TextareaAutosize
            className={`${styles.title} ${styles.edit} ${styles.editAsTitle}`}
            ref={editInputRef}
            value={editText}
            onChange={handleChange}
            onKeyDown={handleKeyPress}
            onBlur={handleBlur}
            id={`edit-${id}`}
            minRows={1}
          />
        ) : (
          <button type="button" className={titleClass} onClick={onToggleDone} tabIndex={0}>
            {description}
          </button>
        )}
        <span className={styles.description}>
          <button
            type="button"
            className={playPauseClass}
            onClick={toggleTimer}
            tabIndex={0}
            aria-label={pause ? 'Play' : 'Pause'}
          />
          <span className={styles.time}>
            {`${Math.floor(time / 60)
              .toString()
              .padStart(2, '0')}:${(time % 60).toString().padStart(2, '0')}`}
          </span>
          <span className={styles.created}>{taskTime}</span>
        </span>
      </label>
      <button
        type="button"
        className={`${styles.icon} ${styles['icon-edit']}`}
        data-edit-btn="1"
        onClick={handleEdit}
        aria-label="Edit"
      />
      <button
        type="button"
        className={`${styles.icon} ${styles['icon-destroy']}`}
        onClick={deleteItem}
        aria-label="Delete"
      />
    </div>
  );
};

export default Task;
