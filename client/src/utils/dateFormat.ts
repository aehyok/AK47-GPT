import { format } from 'date-fns';

export function formatDate(date: string, { pattern = 'yyyy-MM-dd HH:mm:ss', def = '--' } = {}) {
  try {
    return format(new Date(date), pattern);
  } catch {
    return def;
  }
}
