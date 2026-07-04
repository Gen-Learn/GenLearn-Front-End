export function formatDuration(duration?: number | string): string {
  if (duration == null || duration === "") return "00:00";

  const minutes = typeof duration === "number" ? duration : Number(duration);
  if (Number.isNaN(minutes)) return String(duration);

  return `${minutes}:00`;
}