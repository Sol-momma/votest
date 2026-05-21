"use client";

import { useState, useTransition } from "react";
import { createEvent } from "@/actions/create-event";
import { DatePickerMulti } from "./DatePickerMulti";
import { formatDateJa } from "@/lib/format";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const canSubmit = title.trim().length > 0 && dates.length > 0 && !pending;

  const onSubmit = () => {
    setError(null);
    startTransition(async () => {
      const res = await createEvent({ title: title.trim(), dates });
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pb-32 pt-6">
      <header>
        <p className="text-xs text-zinc-500">新しい日程調整</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-zinc-900">
          イベントを作る
        </h1>
      </header>

      <label className="block">
        <span className="mb-1 block text-sm font-medium text-zinc-700">イベント名</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={80}
          placeholder="例：卒業式ご飯会🌸"
          className="h-14 w-full rounded-2xl border border-zinc-300 bg-white px-4 text-lg shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
        />
      </label>

      <div>
        <span className="mb-2 block text-sm font-medium text-zinc-700">
          候補日（タップで選択／もう一度タップで解除）
        </span>
        <DatePickerMulti value={dates} onChange={setDates} />
      </div>

      {dates.length > 0 && (
        <div className="rounded-2xl bg-zinc-50 p-3">
          <p className="mb-1 text-xs text-zinc-500">選択中（{dates.length}件）</p>
          <p className="text-sm text-zinc-700">
            {dates.map(formatDateJa).join("、")}
          </p>
        </div>
      )}

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
            {pending ? "作成中..." : "イベント作成"}
          </button>
        </div>
      </div>
    </div>
  );
}
