import { rank } from "@/lib/score";
import { formatDateJa } from "@/lib/format";
import type { EventDateScoreRow, Mark } from "@/types/db";

export type DateBreakdown = Record<Mark, string[]>;

type Props = {
  scores: EventDateScoreRow[];
  decidedDateId?: string | null;
  breakdown: Record<string, DateBreakdown>; // event_date_id -> { o: [name], t: [], x: [] }
};

const ROW_META: { mark: Mark; emoji: string; tone: string; bg: string }[] = [
  { mark: "o", emoji: "◯", tone: "text-emerald-700", bg: "bg-emerald-50" },
  { mark: "t", emoji: "🤔", tone: "text-amber-800", bg: "bg-amber-50" },
  { mark: "x", emoji: "×", tone: "text-rose-700", bg: "bg-rose-50" },
];

export function RankingList({ scores, decidedDateId, breakdown }: Props) {
  const ranked = rank(scores);

  return (
    <ol className="flex flex-col gap-3">
      {ranked.map((r, i) => {
        const decided = r.event_date_id === decidedDateId;
        const b = breakdown[r.event_date_id] ?? { o: [], t: [], x: [] };
        return (
          <li
            key={r.event_date_id}
            className={`rounded-2xl border bg-white p-4 shadow-sm ${
              decided ? "border-emerald-500 ring-2 ring-emerald-200" : "border-zinc-200"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-xs font-bold text-zinc-500">#{i + 1}</span>
                <span className="text-lg font-bold text-zinc-900">{formatDateJa(r.date)}</span>
                {decided && (
                  <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                    確定
                  </span>
                )}
              </div>
              <span className="text-2xl font-bold text-emerald-600">
                {Math.round(r.attendancePct)}
                <span className="text-sm">%</span>
              </span>
            </div>

            <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-zinc-100">
              <div
                className="h-full rounded-full bg-emerald-500"
                style={{ width: `${Math.min(100, r.attendancePct)}%` }}
              />
            </div>

            <div className="mt-3 flex flex-col gap-1.5">
              {ROW_META.map(({ mark, emoji, tone, bg }) => {
                const names = b[mark];
                return (
                  <div
                    key={mark}
                    className={`flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm ${bg}`}
                  >
                    <span className={`w-12 shrink-0 font-bold ${tone}`}>
                      {emoji} {names.length}
                    </span>
                    <span className="flex-1 text-zinc-700">
                      {names.length > 0 ? names.join("、") : <span className="text-zinc-400">—</span>}
                    </span>
                  </div>
                );
              })}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
