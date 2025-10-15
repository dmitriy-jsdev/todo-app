export function filterTimerField(value: string): string {
  const num = parseInt(value, 10);
  if (!Number.isNaN(num) && num >= 0 && num <= 59) {
    return String(num);
  }
  return '';
}
