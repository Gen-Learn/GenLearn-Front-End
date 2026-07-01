export function formatDuration(duration?: number | string): string {
  if (duration == null || duration === "") return "00:00";

  const seconds = typeof duration === "number" ? duration : Number(duration);
  if (Number.isNaN(seconds)) return String(duration);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, "0")}`;
}
