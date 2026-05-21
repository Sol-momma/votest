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

/**
 * "今日" / "明日" / "あさって" / "N日後" / "来週" / "Nヶ月後" を返す。
 * 過去日は null（呼び出し側でフォールバック）。
 */
export function relativeLabel(iso: string, today: Date): string | null {
  const target = parseDateLocal(iso);
  const t = new Date(today);
  t.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - t.getTime()) / 86_400_000);
  if (diff < 0) return null;
  if (diff === 0) return "今日";
  if (diff === 1) return "明日";
  if (diff === 2) return "あさって";
  if (diff <= 7) return `${diff}日後`;
  if (diff <= 13) return "来週";
  if (diff <= 30) return `${Math.floor(diff / 7)}週間後`;
  const months = Math.round(diff / 30);
  return `約${months}ヶ月後`;
}

/** "2026-06" → "2026年6月" */
export function formatYearMonth(yearMonth: string): string {
  const [y, m] = yearMonth.split("-").map(Number);
  return `${y}年${m}月`;
}

/** "YYYY-MM-DD" → "YYYY-MM" */
export function yearMonthOf(iso: string): string {
  return iso.slice(0, 7);
}
