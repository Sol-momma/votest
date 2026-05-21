import type { EventDateScoreRow } from "@/types/db";

export type RankedDate = EventDateScoreRow & {
  attendancePct: number;
};

export function rank(scores: EventDateScoreRow[]): RankedDate[] {
  return scores
    .map((s) => {
      const denom = Math.max(s.respondents, 1);
      const attendancePct = ((s.cnt_o + s.cnt_t * 0.5) / denom) * 100;
      return { ...s, attendancePct };
    })
    .sort((a, b) => {
      if (b.attendancePct !== a.attendancePct) return b.attendancePct - a.attendancePct;
      if (b.score !== a.score) return b.score - a.score;
      return a.date.localeCompare(b.date);
    });
}
