import { rank } from "@/lib/score";
import { formatDateJa } from "@/lib/format";
import type { EventDateScoreRow } from "@/types/db";

type Props = {
  scores: EventDateScoreRow[];
  decidedDateId?: string | null;
};

const TICKS = [0, 25, 50, 75, 100];

/**
 * 横棒グラフ形式の出席率チャート
 * - Y軸: 候補日（上から順位高い順）
 * - X軸: 出席率 0-100%
 * - 1位はaccent blue、それ以下は段階的にfade
 */
export function RankingChart({ scores, decidedDateId }: Props) {
  const ranked = rank(scores);
  if (ranked.length === 0) return null;

  return (
    <section
      aria-label="出席率チャート"
      className="overflow-hidden rounded-2xl border border-line bg-paper"
    >
      <header className="flex items-baseline justify-between border-b border-line bg-paper-cream px-5 py-3">
        <h3 className="font-display text-[14px] font-bold text-ink">
          出席率チャート
        </h3>
        <span className="text-[10px] tracking-[0.2em] text-ink-faint uppercase">
          高い順 → 低い順
        </span>
      </header>

      <div className="p-5 md:p-6">
        {/* Chart body */}
        <div className="relative">
          {/* Grid: vertical lines at 0/25/50/75/100% */}
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{
              left: "5rem",
              right: "0",
              top: "0",
              bottom: "1.75rem",
            }}
          >
            {TICKS.map((t) => (
              <div
                key={t}
                className="absolute inset-y-0 border-l border-paper-shade"
                style={{ left: `${t}%` }}
              />
            ))}
          </div>

          {/* Bars */}
          <ol className="relative flex flex-col gap-2.5">
            {ranked.map((r, i) => {
              const pct = Math.round(r.attendancePct);
              const isWinner = i === 0;
              const isDecided = r.event_date_id === decidedDateId;
              const labelInside = pct >= 18;

              return (
                <li
                  key={r.event_date_id}
                  className="flex items-center gap-2.5 md:gap-3"
                >
                  {/* Y-axis label */}
                  <div className="flex w-[4.5rem] shrink-0 items-baseline justify-end gap-1.5">
                    <span
                      aria-hidden
                      className={`tabular text-[10px] font-bold ${
                        isWinner ? "text-accent" : "text-ink-faint"
                      }`}
                    >
                      {isWinner ? "🏆" : `#${i + 1}`}
                    </span>
                    <span className="font-display text-[12px] font-bold text-ink md:text-[13px]">
                      {formatDateJa(r.date)}
                    </span>
                  </div>

                  {/* Bar track */}
                  <div className="relative h-7 flex-1 overflow-hidden rounded-md bg-paper-shade/60">
                    <div
                      className="absolute inset-y-0 left-0 flex items-center justify-end pr-2 transition-[width] duration-700 ease-out"
                      style={{
                        width: `${Math.max(pct, 1)}%`,
                        backgroundColor: isWinner
                          ? "var(--color-accent)"
                          : "var(--color-ink-muted)",
                        opacity: isWinner ? 1 : Math.max(0.45, 0.95 - i * 0.1),
                      }}
                      role="img"
                      aria-label={`${formatDateJa(r.date)} 出席率 ${pct}%`}
                    >
                      {labelInside && (
                        <span
                          className={`tabular text-[11px] font-bold ${
                            isWinner || pct >= 50 ? "text-paper" : "text-paper"
                          }`}
                        >
                          {pct}%
                        </span>
                      )}
                    </div>
                    {!labelInside && (
                      <span
                        className="absolute inset-y-0 flex items-center pl-2 tabular text-[11px] font-bold text-ink"
                        style={{ left: `${Math.max(pct, 1)}%` }}
                      >
                        {pct}%
                      </span>
                    )}
                    {/* Decided badge inside the bar */}
                    {isDecided && (
                      <span
                        className="absolute inset-y-0 right-1 flex items-center text-[9px] font-bold tracking-wider text-paper"
                        style={{ paddingRight: "4px" }}
                      >
                        ✓ 確定
                      </span>
                    )}
                  </div>
                </li>
              );
            })}
          </ol>

          {/* X-axis tick labels */}
          <div
            className="mt-3 relative h-4"
            style={{ marginLeft: "calc(4.5rem + 0.625rem)" }}
          >
            {TICKS.map((t) => (
              <span
                key={t}
                className="absolute -translate-x-1/2 tabular text-[10px] font-medium text-ink-faint"
                style={{ left: `${t}%` }}
              >
                {t}%
              </span>
            ))}
          </div>
        </div>

        {/* Footer caption */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-line pt-4 text-[10px] text-ink-faint">
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded bg-accent" />
            <span>1位</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="inline-block size-2.5 rounded bg-ink-muted/60" />
            <span>2位以下（順位が下がるほど薄く）</span>
          </div>
          <span className="ml-auto">
            出席率 = (◯×1 + 🤔×0.5) / 回答者数 × 100
          </span>
        </div>
      </div>
    </section>
  );
}
