// Various date and time utility functions

/**
 * Formats a date to a relative time string (e.g., "2 days ago").
 *
 * @param date - The date to format.
 * @returns A string representing the relative time.
 */
export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

  if (Math.abs(diffInDays) < 1) {
    return `${Math.floor(Math.abs(diffInHours))} hours ago`;
  }
  return `${Math.floor(Math.abs(diffInDays))} days ago`;
}

/**
 * Formats a date to a shorter ISO datetime string:
 * YYYY-MM-DD HH:MM:SS
 *
 * @param date - The date to format. Can be a Date object or ISO string.
 * @returns A string representing the locale datetime.
 */
export function formatLocaleDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toISOString().split("T").join(" ").slice(0, 19);
}
