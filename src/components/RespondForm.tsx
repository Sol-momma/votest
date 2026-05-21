"use client";

import { useState, useTransition } from "react";
import { submitResponse } from "@/actions/submit-response";
import { formatDateJa } from "@/lib/format";
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
  { label: string; emoji: string; tag: string; activeBg: string }
> = {
  o: {
    label: "OK",
    emoji: "◯",
    tag: "tag tag-green",
    activeBg: "bg-tag-green-bg",
  },
  t: {
    label: "微妙",
    emoji: "🤔",
    tag: "tag tag-yellow",
    activeBg: "bg-tag-yellow-bg",
  },
  x: {
    label: "NG",
    emoji: "×",
    tag: "tag tag-red",
    activeBg: "bg-tag-red-bg",
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
    // range mode
    if (pendingRange) {
      // already have pending range, ignore until applied or canceled
      return;
    }
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

  // Compute row state in range mode
  const rangeStartIdx = rangeStartId
    ? dates.findIndex((d) => d.id === rangeStartId)
    : -1;

  const isInPendingRange = (idx: number): boolean => {
    if (!pendingRange) return false;
    return idx >= pendingRange.from && idx <= pendingRange.to;
  };

  const counts: Record<Mark, number> = { o: 0, t: 0, x: 0 };
  for (const m of Object.values(answers)) counts[m]++;

  const canSubmit = nickname.trim().length > 0 && !pending;

  const onSubmit = () => {
    setError(null);
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

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-7 px-5 pb-32 pt-6">
      <header className="animate-fade-up">
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
      </header>

      {/* Nickname */}
      <section
        className="animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        <label className="block">
          <span className="mb-2 block px-0.5 text-[13px] font-semibold text-ink-soft">
            あなたの名前
          </span>
          <input
            type="text"
            inputMode="text"
            autoComplete="nickname"
            maxLength={30}
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="例：たろう"
            className="font-display h-12 w-full rounded-md border border-line bg-paper px-3 text-[16px] font-semibold text-ink transition placeholder:font-normal placeholder:text-ink-faint focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent-soft"
          />
        </label>
      </section>

      {/* Vote mode controls */}
      <section
        aria-label="投票モード"
        className="animate-fade-up overflow-hidden rounded-md border border-line bg-paper"
        style={{ animationDelay: "120ms" }}
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
                  : "text-ink-muted"
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
                  : "text-ink-muted"
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
              {/* Step indicator + guide */}
              {!pendingRange ? (
                <div
                  className="callout callout-gray"
                  aria-live="polite"
                >
                  <span aria-hidden>
                    {rangeStartIdx === -1 ? "🎯" : "→"}
                  </span>
                  <p className="flex-1 text-[13px] leading-relaxed">
                    {rangeStartIdx === -1 ? (
                      <>
                        <span className="font-semibold text-ink">
                          下のリストで始点をタップ
                        </span>
                        <span className="text-ink-muted">
                          {" "}
                          範囲の始まりとなる候補日
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
                  {/* Range summary */}
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

                  {/* Mark choose */}
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

      {/* Tally callout */}
      <div className="animate-fade-up callout callout-gray">
        <span aria-hidden>📊</span>
        <div className="flex flex-1 items-center gap-3 text-[13px]">
          <span className="tag tag-green tabular">◯ {counts.o}</span>
          <span className="tag tag-yellow tabular">🤔 {counts.t}</span>
          <span className="tag tag-red tabular">× {counts.x}</span>
        </div>
      </div>

      {/* Per-date list (Notion database-row style) */}
      <section
        aria-label="候補日リスト"
        className="animate-fade-up overflow-hidden rounded-md border border-line bg-paper"
        style={{ animationDelay: "200ms" }}
      >
        <div className="flex items-center justify-between border-b border-line bg-paper-cream px-3 py-2">
          <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
            候補日 · {dates.length} 件
          </span>
          {voteMode === "range" && (
            <span className="text-[11px] text-ink-faint">範囲モード</span>
          )}
        </div>
        <ul className="divide-y divide-line">
          {dates.map((d, idx) => {
            const m = answers[d.id] ?? "o";
            const meta = MARK_META[m];
            const popping =
              lastChanged === d.id || lastChanged === "__bulk__";

            const isRangeStart = idx === rangeStartIdx;
            const isInRange = isInPendingRange(idx);

            return (
              <li
                key={d.id}
                className={`flex items-center justify-between gap-3 px-3 py-2.5 transition ${
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
                      className={`flex size-4 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold ${
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
                  <span className="font-display tabular text-[14px] font-semibold text-ink">
                    {formatDateJa(d.date)}
                  </span>
                  <span className={meta.tag}>
                    {meta.emoji} {meta.label}
                  </span>
                </button>

                <div className="flex gap-1">
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
                        className={`flex h-9 w-9 items-center justify-center rounded-md text-[14px] font-semibold transition ${
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
          })}
        </ul>
      </section>

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

      {/* Sticky submit */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)]">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onSubmit}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-md text-[15px] font-semibold transition active:scale-[0.985] ${
              canSubmit
                ? "bg-accent text-paper shadow-sm active:bg-accent-strong"
                : "cursor-not-allowed bg-paper-deep text-ink-faint"
            }`}
          >
            {pending ? (
              <>
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                送信中…
              </>
            ) : (
              "投票を送信"
            )}
          </button>
          {!canSubmit && !pending && (
            <p className="mt-2 text-center text-[11px] text-ink-faint">
              名前を入力してください
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
