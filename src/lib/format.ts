const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

export function parseDateLocal(iso: string): Date {
  return new Date(`${iso}T00:00:00`);
}

export function formatDateJa(iso: string): string {
  const d = parseDateLocal(iso);
  const w = WEEKDAYS[d.getDay()];
  return `${d.getMonth() + 1}/${d.getDate()}(${w})`;
}

export function formatDateJaFull(iso: string): string {
  const d = parseDateLocal(iso);
  const w = WEEKDAYS[d.getDay()];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日 (${w})`;
}

export function toIsoDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}
