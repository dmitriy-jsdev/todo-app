import { v4 as uuidv4 } from 'uuid';
import { Task, TimerType } from '../../types/Task';

export const createTodoItem = (
  text: string,
  time: number,
  pause = true,
  isTimerStarted = false,
  timerType: TimerType = 'countdown'
): Task => {
  return {
    id: uuidv4(),
    description: text.trim(),
    created: new Date(),
    done: false,
    time,
    pause,
    isTimerStarted,
    timerType,
    isEditing: false,
  };
};
