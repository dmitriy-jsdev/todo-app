import { formatDistanceToNow } from 'date-fns';

export function formatTaskCreated(created: Date): string {
  const taskTime = formatDistanceToNow(created);

  if (taskTime === 'less than a minute') {
    return 'less than minute ago';
  }
  if (taskTime.includes('minute')) {
    return `created ${taskTime.split(' ')[0]} minutes ago`;
  }
  if (taskTime.includes('hour')) {
    return `created ${taskTime.split(' ')[0]} hours ago`;
  }
  return taskTime;
}
