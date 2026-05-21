"use client";

import { useMemo, useState, useTransition } from "react";
import { submitResponse } from "@/actions/submit-response";
import {
  formatDateJa,
  formatYearMonth,
  relativeLabel,
  yearMonthOf,
} from "@/lib/format";
import type { Mark } from "@/types/db";

type EventDate = { id: string; date: string };

type Props = {
  eventId: string;
  eventTitle: string;
  dates: EventDate[];
};

type VoteMode = "full" | "range";

const MARK_META: Record<
  Mark,
  {
    label: string;
    emoji: string;
    tag: string;
    activeBg: string;
    barColor: string;
  }
> = {
  o: {
    label: "OK",
    emoji: "◯",
    tag: "tag tag-green",
    activeBg: "bg-tag-green-bg",
    barColor: "var(--color-tag-green-text)",
  },
  t: {
    label: "微妙",
    emoji: "🤔",
    tag: "tag tag-yellow",
    activeBg: "bg-tag-yellow-bg",
    barColor: "var(--color-tag-yellow-text)",
  },
  x: {
    label: "NG",
    emoji: "×",
    tag: "tag tag-red",
    activeBg: "bg-tag-red-bg",
    barColor: "var(--color-tag-red-text)",
  },
};

const NEXT_MARK: Record<Mark, Mark> = { o: "t", t: "x", x: "o" };

export function RespondForm({ eventId, eventTitle, dates }: Props) {
  const [nickname, setNickname] = useState("");
  const [answers, setAnswers] = useState<Record<string, Mark>>(() =>
    Object.fromEntries(dates.map((d) => [d.id, "o" as Mark])),
  );
  const [lastChanged, setLastChanged] = useState<string | null>(null);

  // Vote mode
  const [voteMode, setVoteMode] = useState<VoteMode>("full");
  const [rangeStartId, setRangeStartId] = useState<string | null>(null);
  const [pendingRange, setPendingRange] = useState<
    { from: number; to: number } | null
  >(null);

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const nicknameValid = nickname.trim().length > 0;
  const nicknameError = attempted && !nicknameValid;

  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  // group dates by year-month
  const grouped = useMemo(() => {
    const m = new Map<string, EventDate[]>();
    for (const d of dates) {
      const key = yearMonthOf(d.date);
      if (!m.has(key)) m.set(key, []);
      m.get(key)!.push(d);
    }
    return Array.from(m.entries());
  }, [dates]);

  const bulkSet = (mark: Mark) => {
    setAnswers(Object.fromEntries(dates.map((d) => [d.id, mark])));
    setLastChanged("__bulk__");
    setTimeout(() => setLastChanged(null), 320);
  };

  const setMark = (id: string, mark: Mark) => {
    setAnswers((prev) => ({ ...prev, [id]: mark }));
    setLastChanged(id);
    setTimeout(() => setLastChanged(null), 320);
  };

  const toggle = (id: string) => {
    const next = NEXT_MARK[answers[id] ?? "o"];
    setMark(id, next);
  };

  // Range mode tap handler
  const handleRowTap = (id: string) => {
    if (voteMode === "full") {
      toggle(id);
      return;
    }
    if (pendingRange) return;
    if (!rangeStartId) {
      setRangeStartId(id);
      return;
    }
    const startIdx = dates.findIndex((d) => d.id === rangeStartId);
    const endIdx = dates.findIndex((d) => d.id === id);
    if (startIdx === -1 || endIdx === -1) return;
    const [from, to] =
      startIdx <= endIdx ? [startIdx, endIdx] : [endIdx, startIdx];
    setPendingRange({ from, to });
    setRangeStartId(null);
  };

  const applyMarkToRange = (mark: Mark) => {
    if (!pendingRange) return;
    setAnswers((prev) => {
      const next = { ...prev };
      for (let i = pendingRange.from; i <= pendingRange.to; i++) {
        next[dates[i].id] = mark;
      }
      return next;
    });
    setPendingRange(null);
    setLastChanged("__bulk__");
    setTimeout(() => setLastChanged(null), 320);
  };

  const cancelRange = () => {
    setRangeStartId(null);
    setPendingRange(null);
  };

  const rangeStartIdx = rangeStartId
    ? dates.findIndex((d) => d.id === rangeStartId)
    : -1;

  const isInPendingRange = (idx: number): boolean => {
    if (!pendingRange) return false;
    return idx >= pendingRange.from && idx <= pendingRange.to;
  };

  // counts
  const counts: Record<Mark, number> = { o: 0, t: 0, x: 0 };
  for (const m of Object.values(answers)) counts[m]++;
  const total = Math.max(dates.length, 1);
  const okPct = (counts.o / total) * 100;
  const tPct = (counts.t / total) * 100;
  const xPct = (counts.x / total) * 100;

  const canSubmit = nicknameValid && !pending;

  const onSubmit = () => {
    setAttempted(true);
    setError(null);
    if (!canSubmit) return;
    startTransition(async () => {
      const res = await submitResponse({
        eventId,
        nickname: nickname.trim(),
        answers: Object.entries(answers).map(([eventDateId, mark]) => ({
          eventDateId,
          mark,
        })),
      });
      if (res && !res.ok) setError(res.error);
    });
  };

  // ----- shared sub-renders -----

  const VoteModeBlock = (
    <section
      aria-label="投票モード"
      className="overflow-hidden rounded-md border border-line bg-paper"
    >
      <div className="flex items-center justify-between border-b border-line bg-paper-cream px-3 py-2">
        <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
          まとめて投票
        </span>
        <div
          role="tablist"
          aria-label="投票モード切替"
          className="flex gap-0.5 rounded-md bg-paper p-0.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={voteMode === "full"}
            onClick={() => {
              setVoteMode("full");
              cancelRange();
            }}
            className={`rounded-[5px] px-2.5 py-1 text-[11px] font-semibold transition ${
              voteMode === "full"
                ? "bg-accent text-paper"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            全部
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={voteMode === "range"}
            onClick={() => {
              setVoteMode("range");
              cancelRange();
            }}
            className={`rounded-[5px] px-2.5 py-1 text-[11px] font-semibold transition ${
              voteMode === "range"
                ? "bg-accent text-paper"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            範囲
          </button>
        </div>
      </div>

      <div className="p-3">
        {voteMode === "full" ? (
          <div className="grid grid-cols-3 gap-2">
            {(["o", "t", "x"] as Mark[]).map((m) => {
              const meta = MARK_META[m];
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => bulkSet(m)}
                  className={`flex h-16 flex-col items-center justify-center gap-1 rounded-md border border-line ${meta.activeBg} transition hover:border-line-strong active:scale-[0.97]`}
                >
                  <span className="text-xl leading-none">{meta.emoji}</span>
                  <span className="text-[11px] font-semibold text-ink-soft">
                    全部 {meta.label}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {!pendingRange ? (
              <div className="callout callout-gray" aria-live="polite">
                <span aria-hidden>
                  {rangeStartIdx === -1 ? "🎯" : "→"}
                </span>
                <p className="flex-1 text-[13px] leading-relaxed">
                  {rangeStartIdx === -1 ? (
                    <>
                      <span className="font-semibold text-ink">
                        右の候補日リストで始点をタップ
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="font-display tabular font-bold text-ink">
                        {formatDateJa(dates[rangeStartIdx].date)}
                      </span>
                      <span className="text-ink-muted"> → </span>
                      <span className="font-semibold text-ink">
                        終わりの日をタップ
                      </span>
                    </>
                  )}
                </p>
                {rangeStartIdx !== -1 && (
                  <button
                    type="button"
                    onClick={cancelRange}
                    className="text-[11px] font-medium text-ink-faint hover:text-ink-muted"
                  >
                    キャンセル
                  </button>
                )}
              </div>
            ) : (
              <>
                <div
                  className="callout"
                  style={{
                    backgroundColor: "var(--color-tag-blue-bg)",
                    color: "var(--color-tag-blue-text)",
                  }}
                  aria-live="polite"
                >
                  <span aria-hidden>✨</span>
                  <p className="flex-1 text-[13px] leading-relaxed">
                    <span className="font-display tabular font-bold">
                      {formatDateJa(dates[pendingRange.from].date)}
                    </span>
                    <span className="mx-1.5">〜</span>
                    <span className="font-display tabular font-bold">
                      {formatDateJa(dates[pendingRange.to].date)}
                    </span>
                    <span className="ml-1.5 tabular">
                      （{pendingRange.to - pendingRange.from + 1}件）
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={cancelRange}
                    className="text-[11px] font-medium underline-offset-2 hover:underline"
                  >
                    取消
                  </button>
                </div>
                <p className="px-1 text-[12px] font-medium text-ink-muted">
                  どのマークを適用する？
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {(["o", "t", "x"] as Mark[]).map((m) => {
                    const meta = MARK_META[m];
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => applyMarkToRange(m)}
                        className={`flex h-16 flex-col items-center justify-center gap-1 rounded-md border border-line ${meta.activeBg} transition hover:border-line-strong active:scale-[0.97]`}
                      >
                        <span className="text-xl leading-none">
                          {meta.emoji}
                        </span>
                        <span className="text-[11px] font-semibold text-ink-soft">
                          {meta.label} にする
                        </span>
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );

  const TallyBlock = (
    <section
      aria-label="あなたの投票集計"
      className="overflow-hidden rounded-md border border-line bg-paper"
    >
      <div className="flex items-center justify-between border-b border-line bg-paper-cream px-3 py-2">
        <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
          あなたの投票
        </span>
        <span className="tabular text-[11px] text-ink-muted">
          <span className="font-display font-bold text-ink">
            {dates.length - counts.x}
          </span>
          <span className="mx-0.5">/</span>
          {dates.length}件 参加意向
        </span>
      </div>
      <div className="p-3">
        {/* Stacked bar */}
        <div className="flex h-2 overflow-hidden rounded-full bg-paper-shade">
          <div
            className="transition-[width] duration-300"
            style={{
              width: `${okPct}%`,
              backgroundColor: MARK_META.o.barColor,
            }}
            aria-label={`OK ${counts.o}件`}
          />
          <div
            className="transition-[width] duration-300"
            style={{
              width: `${tPct}%`,
              backgroundColor: MARK_META.t.barColor,
            }}
            aria-label={`微妙 ${counts.t}件`}
          />
          <div
            className="transition-[width] duration-300"
            style={{
              width: `${xPct}%`,
              backgroundColor: MARK_META.x.barColor,
            }}
            aria-label={`NG ${counts.x}件`}
          />
        </div>
        <div className="mt-2.5 flex gap-1.5">
          <span className="tag tag-green tabular">◯ {counts.o}</span>
          <span className="tag tag-yellow tabular">🤔 {counts.t}</span>
          <span className="tag tag-red tabular">× {counts.x}</span>
        </div>
      </div>
    </section>
  );

  const NicknameBlock = (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 px-0.5 text-[13px] font-semibold text-ink-soft">
        あなたの名前
        <span aria-hidden className="text-tag-red-text">
          *
        </span>
      </span>
      <input
        type="text"
        inputMode="text"
        autoComplete="nickname"
        maxLength={30}
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="例：たろう"
        aria-invalid={nicknameError}
        aria-describedby={nicknameError ? "nickname-error" : undefined}
        className={`font-display h-12 w-full rounded-md border bg-paper px-3 text-[16px] font-semibold text-ink transition placeholder:font-normal placeholder:text-ink-faint focus:outline-none focus:ring-2 ${
          nicknameError
            ? "border-tag-red-text bg-tag-red-bg/30 focus:border-tag-red-text focus:ring-tag-red-bg"
            : "border-line focus:border-accent focus:ring-accent-soft"
        }`}
      />
      {nicknameError && (
        <p
          id="nickname-error"
          role="alert"
          className="mt-1.5 flex items-center gap-1 px-1 text-[12px] font-medium text-tag-red-text"
        >
          <svg
            aria-hidden
            className="size-3.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4M10 14h.01" />
          </svg>
          名前を入力してください
        </p>
      )}
    </label>
  );

  const SubmitButton = (
    <div>
      <button
        type="button"
        onClick={onSubmit}
        className={`flex h-12 w-full items-center justify-center gap-2 rounded-md text-[15px] font-semibold transition active:scale-[0.985] ${
          canSubmit
            ? "bg-accent text-paper shadow-sm hover:bg-accent-strong"
            : "bg-paper-deep text-ink-faint hover:bg-paper-shade"
        }`}
      >
        {pending ? (
          <>
            <span className="inline-block size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
            送信中…
          </>
        ) : (
          <>
            投票を送信
            <svg
              aria-hidden
              className="size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12m-4-4l4 4-4 4" />
            </svg>
          </>
        )}
      </button>
      {attempted && !canSubmit && !pending && (
        <p className="mt-2 flex items-center justify-center gap-1 text-center text-[11px] font-medium text-tag-red-text">
          <svg
            aria-hidden
            className="size-3.5"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="10" cy="10" r="8" />
            <path d="M10 6v4M10 14h.01" />
          </svg>
          名前を入力してください
        </p>
      )}
    </div>
  );

  // ----- date row -----

  const DateRow = ({ d, idx }: { d: EventDate; idx: number }) => {
    const m = answers[d.id] ?? "o";
    const meta = MARK_META[m];
    const popping = lastChanged === d.id || lastChanged === "__bulk__";
    const isRangeStart = idx === rangeStartIdx;
    const isInRange = isInPendingRange(idx);
    const rel = relativeLabel(d.date, today);

    return (
      <li
        className={`flex items-center justify-between gap-3 px-3 py-3 transition ${
          isRangeStart
            ? "bg-accent-soft"
            : isInRange
              ? "bg-tag-blue-bg"
              : "hover-row"
        }`}
      >
        <button
          type="button"
          onClick={() => handleRowTap(d.id)}
          className="flex flex-1 items-center gap-3 text-left"
          aria-label={
            voteMode === "range"
              ? `${formatDateJa(d.date)}を範囲の始点/終点に設定`
              : `${formatDateJa(d.date)}を切り替え`
          }
        >
          {voteMode === "range" && (
            <span
              aria-hidden
              className={`flex size-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
                isRangeStart
                  ? "border-accent bg-accent text-paper"
                  : isInRange
                    ? "border-tag-blue-text bg-tag-blue-text text-paper"
                    : "border-line text-ink-faint"
              }`}
            >
              {isRangeStart ? "▶" : isInRange ? "•" : ""}
            </span>
          )}
          <div className="flex flex-1 flex-col gap-0.5">
            <div className="flex items-baseline gap-2">
              <span className="font-display tabular text-[15px] font-semibold text-ink">
                {formatDateJa(d.date)}
              </span>
              {rel && (
                <span className="text-[10px] font-medium text-ink-faint tabular">
                  {rel}
                </span>
              )}
            </div>
            <span className={meta.tag}>
              {meta.emoji} {meta.label}
            </span>
          </div>
        </button>

        <div className="flex gap-1 md:gap-1.5">
          {(["o", "t", "x"] as Mark[]).map((mk) => {
            const meta2 = MARK_META[mk];
            const active = m === mk;
            return (
              <button
                key={mk}
                type="button"
                aria-label={meta2.label}
                aria-pressed={active}
                onClick={() => setMark(d.id, mk)}
                className={`flex h-9 w-9 items-center justify-center rounded-md text-[14px] font-semibold transition md:h-10 md:w-10 ${
                  active
                    ? `${meta2.activeBg} ${popping ? "animate-pop" : ""}`
                    : "text-ink-faint hover:bg-paper-shade hover:text-ink-muted"
                }`}
              >
                {meta2.emoji}
              </button>
            );
          })}
        </div>
      </li>
    );
  };

  const ListBlock = (
    <section
      aria-label="候補日リスト"
      className="flex flex-col gap-4"
    >
      <div className="flex items-baseline justify-between px-0.5">
        <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
          候補日 · {dates.length} 件
        </span>
        {voteMode === "range" && (
          <span className="text-[11px] text-ink-faint">範囲モード</span>
        )}
      </div>

      {grouped.map(([ym, items]) => (
        <div
          key={ym}
          className="overflow-hidden rounded-md border border-line bg-paper"
        >
          <div className="flex items-baseline justify-between border-b border-line bg-paper-cream px-3 py-2">
            <span className="font-display tabular text-[13px] font-bold text-ink">
              {formatYearMonth(ym)}
            </span>
            <span className="text-[11px] text-ink-faint">{items.length}件</span>
          </div>
          <ul className="divide-y divide-line">
            {items.map((d) => {
              const idx = dates.findIndex((x) => x.id === d.id);
              return <DateRow key={d.id} d={d} idx={idx} />;
            })}
          </ul>
        </div>
      ))}
    </section>
  );

  // ----- final render -----

  return (
    <main className="mx-auto max-w-md px-5 pt-6 pb-32 md:max-w-6xl md:px-10 md:pb-12">
      {/* Mobile header */}
      <header className="animate-fade-up mb-7 md:hidden">
        <span className="tag tag-blue">
          <span aria-hidden>🗳️</span>
          投票ページ
        </span>
        <h1 className="font-display mt-3 text-2xl leading-tight font-bold text-ink">
          {eventTitle}
        </h1>
        <p className="mt-2 text-[13px] text-ink-muted">
          各候補日に
          <span className="mx-1 tag tag-green">◯</span>
          <span className="mr-1 tag tag-yellow">🤔</span>
          <span className="tag tag-red">×</span>
          を選んで投票してください。
        </p>
        {dates.length >= 7 && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-accent/30 bg-accent-soft/40 px-3 py-2.5 text-[12px] leading-relaxed text-ink">
            <span aria-hidden className="shrink-0 text-accent">💡</span>
            <p>
              候補日が
              <span className="font-bold text-accent">{dates.length}件</span>
              あります。「全部◯」→ 行けない日だけ × にするのが最速です。
            </p>
          </div>
        )}
      </header>

      {/* Desktop: 2-col layout */}
      <div className="flex flex-col gap-7 md:grid md:grid-cols-[22rem_minmax(0,1fr)] md:items-start md:gap-8">
        {/* Left aside (sticky on md+) */}
        <aside className="flex flex-col gap-5 md:sticky md:top-24 md:max-h-[calc(100vh-7rem)] md:overflow-y-auto md:pr-1">
          {/* Desktop-only header */}
          <header className="hidden animate-fade-up md:block">
            <span className="tag tag-blue">
              <span aria-hidden>🗳️</span>
              投票ページ
            </span>
            <h1 className="font-display mt-3 text-[28px] leading-tight font-bold text-ink">
              {eventTitle}
            </h1>
            <p className="mt-2 text-[13px] text-ink-muted">
              候補日に
              <span className="mx-1 tag tag-green">◯</span>
              <span className="mr-1 tag tag-yellow">🤔</span>
              <span className="tag tag-red">×</span>
              を選んで投票してください。
            </p>
            {dates.length >= 7 && (
              <div className="mt-4 flex items-start gap-2 rounded-md border border-accent/30 bg-accent-soft/40 px-3 py-2.5 text-[12px] leading-relaxed text-ink">
                <span aria-hidden className="shrink-0 text-accent">💡</span>
                <p>
                  <span className="font-bold text-accent">{dates.length}件</span>
                  の候補日。「全部◯」→ 行けない日だけ × が最速です。
                </p>
              </div>
            )}
          </header>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "60ms" }}
          >
            {NicknameBlock}
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            {VoteModeBlock}
          </div>

          <div
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          >
            {TallyBlock}
          </div>

          {/* Desktop inline submit (visible only on md+) */}
          <div className="hidden md:block">{SubmitButton}</div>

          {error && (
            <div
              className="callout"
              style={{
                backgroundColor: "var(--color-tag-red-bg)",
                color: "var(--color-tag-red-text)",
              }}
            >
              <span aria-hidden>⚠️</span>
              <p className="flex-1 text-[13px] font-medium">{error}</p>
            </div>
          )}
        </aside>

        {/* Right: dates list */}
        <div
          className="animate-fade-up md:col-start-2"
          style={{ animationDelay: "200ms" }}
        >
          {ListBlock}
        </div>
      </div>

      {/* Mobile sticky submit */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)] md:hidden">
        <div className="mx-auto max-w-md">{SubmitButton}</div>
      </div>
    </main>
  );
}
