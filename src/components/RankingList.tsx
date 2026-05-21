import { rank } from "@/lib/score";
import { formatDateJa } from "@/lib/format";
import type { EventDateScoreRow, Mark } from "@/types/db";

export type DateBreakdown = Record<Mark, string[]>;

type Props = {
  scores: EventDateScoreRow[];
  decidedDateId?: string | null;
  breakdown: Record<string, DateBreakdown>;
};

const ROW_META: { mark: Mark; emoji: string; tag: string }[] = [
  { mark: "o", emoji: "◯", tag: "tag tag-green" },
  { mark: "t", emoji: "🤔", tag: "tag tag-yellow" },
  { mark: "x", emoji: "×", tag: "tag tag-red" },
];

export function RankingList({ scores, decidedDateId, breakdown }: Props) {
  const ranked = rank(scores);

  return (
    <ol className="flex flex-col gap-2.5">
      {ranked.map((r, i) => {
        const decided = r.event_date_id === decidedDateId;
        const isWinner = i === 0 && r.respondents > 0;
        const b = breakdown[r.event_date_id] ?? { o: [], t: [], x: [] };
        const pct = Math.round(r.attendancePct);

        return (
          <li
            key={r.event_date_id}
            className={`overflow-hidden rounded-md border bg-paper transition ${
              isWinner
                ? "border-line-strong"
                : "border-line"
            }`}
          >
            <div className="p-4">
              {/* Top row */}
              <div className="flex items-baseline justify-between gap-3">
                <div className="flex items-baseline gap-2">
                  <span
                    className={`tabular text-[13px] font-semibold ${
                      isWinner ? "text-ink" : "text-ink-muted"
                    }`}
                  >
                    {isWinner && <span aria-hidden className="mr-0.5">🏆</span>}
                    #{i + 1}
                  </span>
                  <span className="font-display text-[15px] font-bold text-ink">
                    {formatDateJa(r.date)}
                  </span>
                  {decided && (
                    <span className="tag tag-blue">
                      <svg
                        aria-hidden
                        className="size-3"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 10l4 4 7-8" />
                      </svg>
                      確定
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span
                    className={`tabular text-[22px] font-bold leading-none ${
                      isWinner ? "text-ink" : "text-ink-soft"
                    }`}
                  >
                    {pct}
                    <span className="text-[12px] font-medium text-ink-muted">
                      %
                    </span>
                  </span>
                </div>
              </div>

              {/* Bar */}
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-paper-shade">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isWinner ? "bg-accent" : "bg-line-strong"
                  }`}
                  style={{ width: `${Math.min(100, pct)}%` }}
                />
              </div>

              {/* Per-mark breakdown */}
              <div className="mt-3 space-y-1">
                {ROW_META.map(({ mark, emoji, tag }) => {
                  const names = b[mark];
                  return (
                    <div
                      key={mark}
                      className="flex items-start gap-2 py-0.5 text-[13px]"
                    >
                      <span className={tag}>
                        {emoji} {names.length}
                      </span>
                      <span className="flex-1 pt-0.5 leading-relaxed text-ink-muted">
                        {names.length > 0 ? (
                          names.map((n, idx) => (
                            <span key={n + idx}>
                              {n}
                              {idx < names.length - 1 && (
                                <span className="mx-1 text-ink-faint">·</span>
                              )}
                            </span>
                          ))
                        ) : (
                          <span className="text-ink-faint">—</span>
                        )}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
