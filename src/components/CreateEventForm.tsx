"use client";

import { useState, useTransition } from "react";
import { createEvent } from "@/actions/create-event";
import { DatePickerMulti } from "./DatePickerMulti";
import { formatDateJa } from "@/lib/format";

export function CreateEventForm() {
  const [title, setTitle] = useState("");
  const [dates, setDates] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState(false);
  const [pending, startTransition] = useTransition();

  const titleValid = title.trim().length > 0;
  const datesValid = dates.length > 0;
  const canSubmit = titleValid && datesValid && !pending;

  const titleError = attempted && !titleValid;
  const datesError = attempted && !datesValid;

  const onSubmit = () => {
    setAttempted(true);
    setError(null);
    if (!canSubmit) return;
    startTransition(async () => {
      const res = await createEvent({ title: title.trim(), dates });
      if (res && !res.ok) setError(res.error);
    });
  };

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-5 pb-32 pt-6 md:max-w-6xl md:px-10">
      <header className="animate-fade-up">
        <h1 className="font-display text-3xl leading-tight font-bold text-ink md:text-[40px]">
          新しいイベント
        </h1>
        <p className="mt-2 text-[14px] text-ink-muted">
          タイトルと候補日を決めて、共有URLを発行します。
        </p>
      </header>

      {/* Title field — full width */}
      <section
        className="animate-fade-up"
        style={{ animationDelay: "60ms" }}
      >
        <label className="block">
          <div className="mb-2 flex items-center justify-between px-0.5">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft">
              タイトル
              <span aria-hidden className="text-tag-red-text">
                *
              </span>
            </span>
            <span className="tabular text-[11px] text-ink-faint">
              {title.length} / 80
            </span>
          </div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={80}
            placeholder="例：卒業祝いごはん🌸"
            aria-invalid={titleError}
            aria-describedby={titleError ? "title-error" : undefined}
            className={`font-display h-12 w-full rounded-md border bg-paper px-3 text-[16px] font-semibold text-ink transition placeholder:font-normal placeholder:text-ink-faint focus:outline-none focus:ring-2 ${
              titleError
                ? "border-tag-red-text bg-tag-red-bg/30 focus:border-tag-red-text focus:ring-tag-red-bg"
                : "border-line focus:border-accent focus:ring-accent-soft"
            }`}
          />
          {titleError && (
            <p
              id="title-error"
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
              タイトルを入力してください
            </p>
          )}
        </label>
      </section>

      {/* 2-col on md+: calendar (left) + summary (right) */}
      <div className="flex flex-col gap-8 md:grid md:grid-cols-[minmax(0,1fr)_28rem] md:items-start md:gap-8 lg:grid-cols-[minmax(0,1fr)_32rem]">
        {/* Calendar */}
        <section
          className="animate-fade-up md:col-start-1"
          style={{ animationDelay: "120ms" }}
        >
          <div className="mb-2 flex items-center justify-between px-0.5">
            <span className="flex items-center gap-1.5 text-[13px] font-semibold text-ink-soft">
              候補日
              <span aria-hidden className="text-tag-red-text">
                *
              </span>
            </span>
            {dates.length > 0 && (
              <span className="tabular text-[11px] text-ink-faint">
                {dates.length} 件選択中
              </span>
            )}
          </div>
          <div
            className={
              datesError
                ? "rounded-md ring-2 ring-tag-red-text ring-offset-2 ring-offset-paper"
                : ""
            }
            aria-invalid={datesError}
            aria-describedby={datesError ? "dates-error" : undefined}
          >
            <DatePickerMulti value={dates} onChange={setDates} />
          </div>
          {datesError && (
            <p
              id="dates-error"
              role="alert"
              className="mt-2 flex items-center gap-1 px-1 text-[12px] font-medium text-tag-red-text"
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
              候補日を1つ以上選んでください
            </p>
          )}
        </section>

        {/* Selected dates panel — sticky on desktop */}
        <aside
          className="animate-fade-up md:col-start-2 md:sticky md:top-24 md:self-start"
          style={{ animationDelay: "150ms" }}
        >
          {dates.length > 0 ? (
            <div className="callout callout-gray">
              <span aria-hidden className="text-base leading-tight">
                ✨
              </span>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="text-[12px] font-semibold text-ink-soft">
                    選んだ候補日
                    <span className="ml-1.5 tabular text-ink-faint">
                      {dates.length}件
                    </span>
                  </p>
                  <button
                    type="button"
                    onClick={() => setDates([])}
                    className="text-[11px] font-medium text-ink-faint hover:text-ink-muted transition"
                  >
                    全クリア
                  </button>
                </div>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {dates.map((d) => (
                    <li
                      key={d}
                      className="group flex items-center gap-0.5 rounded-md border border-line bg-paper py-0.5 pl-2 pr-1 transition hover:border-line-strong"
                    >
                      <span className="font-display tabular text-[12px] font-semibold text-ink">
                        {formatDateJa(d)}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setDates((prev) => prev.filter((v) => v !== d))
                        }
                        aria-label={`${formatDateJa(d)}を削除`}
                        className="flex size-4 shrink-0 items-center justify-center rounded text-ink-faint transition hover:bg-paper-shade hover:text-ink active:scale-90"
                      >
                        <svg
                          aria-hidden
                          className="size-3"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                        >
                          <path d="M6 6l8 8M6 14l8-8" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div
              className={`callout ${
                datesError ? "" : "callout-gray"
              }`}
              style={
                datesError
                  ? {
                      backgroundColor: "var(--color-tag-red-bg)",
                      color: "var(--color-tag-red-text)",
                    }
                  : undefined
              }
            >
              <span aria-hidden className="text-base leading-tight">
                {datesError ? "⚠️" : "📝"}
              </span>
              <div className="flex-1">
                <p
                  className={`text-[12px] font-semibold ${
                    datesError ? "" : "text-ink-soft"
                  }`}
                >
                  選んだ候補日
                </p>
                <p
                  className={`mt-1 text-[12px] ${
                    datesError ? "font-medium" : "text-ink-faint"
                  }`}
                >
                  {datesError
                    ? "1つ以上選んでください"
                    : "ここに選んだ日が並びます。"}
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>

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

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)] md:px-10">
        <div className="mx-auto max-w-md md:max-w-6xl md:flex md:items-center md:justify-end md:gap-4">
          {attempted && !canSubmit && !pending && (
            <p className="mb-2 flex items-center justify-center gap-1 text-[11px] font-medium text-tag-red-text md:mb-0 md:justify-end">
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
              {!titleValid && "タイトル"}
              {!titleValid && !datesValid && " と "}
              {!datesValid && "候補日"}
              が未入力です
            </p>
          )}
          <button
            type="button"
            onClick={onSubmit}
            className={`flex h-12 w-full items-center justify-center gap-2 rounded-md text-[15px] font-semibold transition active:scale-[0.985] md:w-auto md:px-8 ${
              canSubmit
                ? "bg-accent text-paper shadow-sm hover:bg-accent-strong"
                : "bg-paper-deep text-ink-faint hover:bg-paper-shade"
            }`}
          >
            {pending ? (
              <>
                <span className="inline-block size-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                作成中…
              </>
            ) : (
              <>
                イベントを作成
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
        </div>
      </div>
    </main>
  );
}
