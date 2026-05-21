import { rank } from "@/lib/score";
import { formatDateJa, relativeLabel } from "@/lib/format";
import type { EventDateScoreRow, Mark } from "@/types/db";

export type DateBreakdown = Record<Mark, string[]>;

type Props = {
  scores: EventDateScoreRow[];
  decidedDateId?: string | null;
  breakdown: Record<string, DateBreakdown>;
};

const SEGMENTS: {
  mark: Mark;
  emoji: string;
  label: string;
  bg: string;
  text: string;
  cssVar: string;
}[] = [
  {
    mark: "o",
    emoji: "◯",
    label: "OK",
    bg: "bg-tag-green-bg",
    text: "text-tag-green-text",
    cssVar: "var(--color-tag-green-text)",
  },
  {
    mark: "t",
    emoji: "🤔",
    label: "微妙",
    bg: "bg-tag-yellow-bg",
    text: "text-tag-yellow-text",
    cssVar: "var(--color-tag-yellow-text)",
  },
  {
    mark: "x",
    emoji: "×",
    label: "NG",
    bg: "bg-tag-red-bg",
    text: "text-tag-red-text",
    cssVar: "var(--color-tag-red-text)",
  },
];

export function RankingList({ scores, decidedDateId, breakdown }: Props) {
  const ranked = rank(scores);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Find the highest attendance pct to scale comparison
  const maxPct = ranked[0]?.attendancePct ?? 0;

  return (
    <ol className="flex flex-col gap-3">
      {ranked.map((r, i) => {
        const decided = r.event_date_id === decidedDateId;
        const isWinner = i === 0 && r.respondents > 0;
        const b = breakdown[r.event_date_id] ?? { o: [], t: [], x: [] };
        const pct = Math.round(r.attendancePct);
        const total = Math.max(b.o.length + b.t.length + b.x.length, 1);

        const okPct = (b.o.length / total) * 100;
        const tPct = (b.t.length / total) * 100;
        const xPct = (b.x.length / total) * 100;

        return (
          <li
            key={r.event_date_id}
            className={`overflow-hidden rounded-md border bg-paper transition ${
              isWinner
                ? "border-line-strong shadow-sm"
                : "border-line"
            }`}
          >
            <div className="p-4 md:p-5">
              {/* Rank header row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    {isWinner ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-tag-yellow-bg px-2 py-0.5 text-[11px] font-bold text-tag-yellow-text">
                        <span aria-hidden>🏆</span>1位
                      </span>
                    ) : (
                      <span className="tabular text-[12px] font-semibold text-ink-muted">
                        #{i + 1}
                      </span>
                    )}
                    <span className="font-display text-[16px] font-bold text-ink md:text-[18px]">
                      {formatDateJa(r.date)}
                    </span>
                    {(() => {
                      const rel = relativeLabel(r.date, today);
                      return rel ? (
                        <span className="text-[11px] font-medium text-ink-faint tabular">
                          {rel}
                        </span>
                      ) : null;
                    })()}
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
                </div>

                <div className="text-right">
                  <span
                    className={`tabular font-display text-[26px] font-bold leading-none md:text-[32px] ${
                      isWinner ? "text-accent" : "text-ink-soft"
                    }`}
                  >
                    {pct}
                    <span className="text-[12px] font-medium text-ink-muted">
                      %
                    </span>
                  </span>
                  <p className="mt-1 text-[10px] tracking-wider text-ink-faint uppercase">
                    出席率
                  </p>
                </div>
              </div>

              {/* Comparative bar (single tone, vs max) */}
              <div className="mt-3 flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-paper-shade">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isWinner ? "bg-accent" : "bg-line-strong"
                    }`}
                    style={{
                      width: `${
                        maxPct > 0 ? (pct / maxPct) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Stacked bar chart by votes (◯ / 🤔 / ×) */}
              <div className="mt-4">
                <div className="mb-2 flex items-baseline justify-between">
                  <span className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
                    投票内訳
                  </span>
                  <span className="text-[11px] text-ink-muted tabular">
                    {b.o.length + b.t.length + b.x.length}名
                  </span>
                </div>

                {/* Stacked bar */}
                <div
                  className="flex h-3 overflow-hidden rounded-full bg-paper-shade"
                  role="img"
                  aria-label={`◯${b.o.length}名 🤔${b.t.length}名 ×${b.x.length}名`}
                >
                  <div
                    className="transition-[width] duration-500"
                    style={{
                      width: `${okPct}%`,
                      backgroundColor: SEGMENTS[0].cssVar,
                    }}
                  />
                  <div
                    className="transition-[width] duration-500"
                    style={{
                      width: `${tPct}%`,
                      backgroundColor: SEGMENTS[1].cssVar,
                    }}
                  />
                  <div
                    className="transition-[width] duration-500"
                    style={{
                      width: `${xPct}%`,
                      backgroundColor: SEGMENTS[2].cssVar,
                    }}
                  />
                </div>

                {/* Legend with names */}
                <div className="mt-3 space-y-1.5">
                  {SEGMENTS.map(({ mark, emoji, bg, text }) => {
                    const names = b[mark];
                    return (
                      <div
                        key={mark}
                        className={`flex items-start gap-2.5 rounded-md px-2.5 py-1.5 text-[13px] ${bg}`}
                      >
                        <span className={`flex shrink-0 items-baseline gap-1 font-bold ${text}`}>
                          <span aria-hidden className="text-base">
                            {emoji}
                          </span>
                          <span className="font-display tabular text-base">
                            {names.length}
                          </span>
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
            </div>
          </li>
        );
      })}
    </ol>
  );
}
