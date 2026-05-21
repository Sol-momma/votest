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

const MARK_META: Record<Mark, { label: string; emoji: string; bg: string; border: string }> = {
  o: { label: "OK", emoji: "◯", bg: "bg-emerald-500", border: "border-emerald-600" },
  t: { label: "微妙", emoji: "🤔", bg: "bg-amber-400", border: "border-amber-500" },
  x: { label: "NG", emoji: "×", bg: "bg-rose-500", border: "border-rose-600" },
};

const NEXT_MARK: Record<Mark, Mark> = { o: "t", t: "x", x: "o" };

export function RespondForm({ eventId, eventTitle, dates }: Props) {
  const [nickname, setNickname] = useState("");
  const [answers, setAnswers] = useState<Record<string, Mark>>(() =>
    Object.fromEntries(dates.map((d) => [d.id, "o" as Mark])),
  );
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const bulkSet = (mark: Mark) =>
    setAnswers(Object.fromEntries(dates.map((d) => [d.id, mark])));

  const toggle = (id: string) =>
    setAnswers((prev) => ({ ...prev, [id]: NEXT_MARK[prev[id] ?? "o"] }));

  const setMark = (id: string, mark: Mark) =>
    setAnswers((prev) => ({ ...prev, [id]: mark }));

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
    <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pb-32 pt-6">
      <header>
        <p className="text-xs text-zinc-500">日程アンケート</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-zinc-900">{eventTitle}</h1>
      </header>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-zinc-700">
          あなたの名前（ニックネーム）
        </span>
        <input
          type="text"
          inputMode="text"
          autoComplete="nickname"
          maxLength={30}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="例：たろう"
          className="h-14 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-lg shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </label>

      <section aria-label="一括変更">
        <p className="mb-2 text-sm font-medium text-zinc-700">
          まず一括で選んで、合わない日だけタップで切替↓
        </p>
        <div className="grid grid-cols-3 gap-2">
          {(["o", "t", "x"] as Mark[]).map((m) => {
            const meta = MARK_META[m];
            return (
              <button
                key={m}
                type="button"
                onClick={() => bulkSet(m)}
                className={`flex h-16 flex-col items-center justify-center rounded-2xl border-2 text-white shadow-sm active:scale-[0.97] ${meta.bg} ${meta.border}`}
              >
                <span className="text-2xl leading-none">{meta.emoji}</span>
                <span className="text-xs font-medium">全部{meta.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-label="候補日リスト" className="flex flex-col gap-2">
        {dates.map((d) => {
          const m = answers[d.id] ?? "o";
          const meta = MARK_META[m];
          return (
            <div
              key={d.id}
              className="flex h-16 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 shadow-sm"
            >
              <button
                type="button"
                onClick={() => toggle(d.id)}
                className="flex flex-1 items-center gap-3 text-left active:opacity-70"
              >
                <span className="text-base font-semibold text-zinc-800">
                  {formatDateJa(d.date)}
                </span>
              </button>
              <div className="flex gap-1.5">
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
                      className={`flex h-11 w-11 items-center justify-center rounded-full border-2 text-lg font-bold transition ${
                        active
                          ? `${meta2.bg} ${meta2.border} text-white scale-100`
                          : "border-zinc-200 bg-white text-zinc-400 scale-90"
                      }`}
                    >
                      {meta2.emoji}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </section>

      {error && (
        <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </p>
      )}

      <div className="fixed inset-x-0 bottom-0 border-t border-zinc-200 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 backdrop-blur">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={onSubmit}
            className="h-14 w-full rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-md transition active:scale-[0.99] disabled:bg-zinc-300"
          >
            {pending ? "送信中..." : "回答を送信する"}
          </button>
        </div>
      </div>
    </div>
  );
}
