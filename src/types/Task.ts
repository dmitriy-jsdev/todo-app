export type TimerType = 'countdown' | 'countup';

export interface Task {
  id: string;
  description: string;
  created: Date;
  done: boolean;
  time: number;
  pause: boolean;
  isTimerStarted: boolean;
  timerType: TimerType;
  isEditing: boolean;
}
