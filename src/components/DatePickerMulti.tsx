"use client";

import { useMemo, useState } from "react";
import { formatDateJa, toIsoDate } from "@/lib/format";

type Props = {
  value: string[];
  onChange: (next: string[]) => void;
};

type SelectionMode = "single" | "range";

const WEEKDAYS = ["日", "月", "火", "水", "木", "金", "土"] as const;

function addDays(base: Date, n: number): Date {
  const d = new Date(base);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + n);
  return d;
}

function startOfDay(d: Date): Date {
  const r = new Date(d);
  r.setHours(0, 0, 0, 0);
  return r;
}

function expandRange(a: Date, b: Date): string[] {
  const start = a <= b ? startOfDay(a) : startOfDay(b);
  const end = a <= b ? startOfDay(b) : startOfDay(a);
  const dates: string[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    dates.push(toIsoDate(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return dates;
}

function generateMonths(from: Date, count: number): Date[] {
  return Array.from({ length: count }, (_, i) => {
    return new Date(from.getFullYear(), from.getMonth() + i, 1);
  });
}

function generateMonthGrid(monthStart: Date): (Date | null)[] {
  const cells: (Date | null)[] = [];
  const y = monthStart.getFullYear();
  const m = monthStart.getMonth();
  const firstDow = new Date(y, m, 1).getDay();
  const lastDate = new Date(y, m + 1, 0).getDate();
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= lastDate; d++) cells.push(new Date(y, m, d));
  return cells;
}

function buildPresets(today: Date) {
  const dow = today.getDay();
  const daysToSat = (6 - dow + 7) % 7;
  const thisSat = addDays(today, daysToSat);
  const thisSun = addDays(thisSat, 1);
  return [
    {
      label: "今週末",
      dates:
        dow === 0
          ? [toIsoDate(today)]
          : [toIsoDate(thisSat), toIsoDate(thisSun)],
    },
    {
      label: "来週末",
      dates: [toIsoDate(addDays(thisSat, 7)), toIsoDate(addDays(thisSat, 8))],
    },
    {
      label: "今日から3日間",
      dates: [1, 2, 3].map((n) => toIsoDate(addDays(today, n))),
    },
  ];
}

export function DatePickerMulti({ value, onChange }: Props) {
  const [mode, setMode] = useState<SelectionMode>("single");
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [monthCount, setMonthCount] = useState(4);

  const today = useMemo(() => startOfDay(new Date()), []);
  const months = useMemo(
    () => generateMonths(today, monthCount),
    [today, monthCount],
  );
  const presets = useMemo(() => buildPresets(today), [today]);

  const selectedSet = new Set(value);
  const todayIso = toIsoDate(today);

  const merge = (additions: string[]) =>
    onChange(Array.from(new Set([...value, ...additions])).sort());

  const handleDayClick = (day: Date) => {
    if (day < today) return;
    if (mode === "single") {
      const iso = toIsoDate(day);
      if (selectedSet.has(iso)) {
        onChange(value.filter((v) => v !== iso));
      } else {
        onChange([...value, iso].sort());
      }
      return;
    }
    if (!rangeStart) {
      setRangeStart(day);
      return;
    }
    merge(expandRange(rangeStart, day));
    setRangeStart(null);
  };

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      {/* Top: mode tabs + guide + presets */}
      <div className="border-b border-line p-3">
        <div
          role="tablist"
          aria-label="選択モード"
          className="mb-3 flex gap-1 rounded-md bg-paper-shade p-0.5"
        >
          <button
            type="button"
            role="tab"
            aria-selected={mode === "single"}
            onClick={() => {
              setMode("single");
              setRangeStart(null);
            }}
            className={`flex-1 rounded-[5px] py-1.5 text-[13px] font-semibold transition ${
              mode === "single"
                ? "bg-paper text-ink shadow-sm"
                : "text-ink-muted"
            }`}
          >
            個別タップ
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={mode === "range"}
            onClick={() => setMode("range")}
            className={`flex-1 rounded-[5px] py-1.5 text-[13px] font-semibold transition ${
              mode === "range"
                ? "bg-paper text-ink shadow-sm"
                : "text-ink-muted"
            }`}
          >
            範囲で追加
          </button>
        </div>

        <p
          aria-live="polite"
          className={`mb-3 flex items-center gap-1.5 px-0.5 text-[12px] ${
            mode === "range" && rangeStart
              ? "font-semibold text-accent"
              : "text-ink-muted"
          }`}
        >
          <span aria-hidden>
            {mode === "single" ? "👆" : rangeStart ? "→" : "🎯"}
          </span>
          {mode === "single"
            ? "タップで追加・解除"
            : rangeStart
              ? `${formatDateJa(toIsoDate(rangeStart))} → 終わりの日をタップ`
              : "始まりの日をタップ"}
        </p>

        <div className="flex flex-wrap gap-1.5 px-0.5">
          {presets.map((p) => (
            <button
              key={p.label}
              type="button"
              onClick={() => merge(p.dates)}
              className="tag tag-gray hover:bg-paper-deep transition active:scale-[0.97]"
            >
              + {p.label}
            </button>
          ))}
          {value.length > 0 && (
            <button
              type="button"
              onClick={() => {
                onChange([]);
                setRangeStart(null);
              }}
              className="ml-auto text-[11px] font-medium text-ink-faint hover:text-ink-muted"
            >
              全クリア
            </button>
          )}
        </div>
      </div>

      {/* Scroll area */}
      <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
        {/* Sticky weekday header */}
        <div className="sticky-bar sticky top-0 z-20 grid grid-cols-7 px-2 py-2 text-center text-[11px] font-semibold">
          {WEEKDAYS.map((w, i) => (
            <div
              key={w}
              className={
                i === 0
                  ? "text-ink-soft"
                  : i === 6
                    ? "text-ink-soft"
                    : "text-ink-faint"
              }
            >
              {w}
            </div>
          ))}
        </div>

        {/* Months */}
        <div className="px-2 pb-3">
          {months.map((monthStart) => {
            const cells = generateMonthGrid(monthStart);
            return (
              <section
                key={`${monthStart.getFullYear()}-${monthStart.getMonth()}`}
                className="mb-2"
              >
                <h3 className="sticky top-9 z-10 mt-3 mb-1 flex items-baseline gap-2 bg-paper px-1 py-1.5">
                  <span className="font-display tabular text-[15px] font-bold text-ink">
                    {monthStart.getFullYear()}年{monthStart.getMonth() + 1}月
                  </span>
                </h3>

                <div className="grid grid-cols-7">
                  {cells.map((day, i) => {
                    if (!day)
                      return <div key={`pad-${i}`} className="h-11" />;

                    const iso = toIsoDate(day);
                    const isSelected = selectedSet.has(iso);
                    const isPast = day < today;
                    const isToday = iso === todayIso;
                    const isRangeStart =
                      !!rangeStart && toIsoDate(rangeStart) === iso;
                    const dow = day.getDay();

                    const prevIso = toIsoDate(addDays(day, -1));
                    const nextIso = toIsoDate(addDays(day, 1));
                    const extendLeft =
                      isSelected && dow !== 0 && selectedSet.has(prevIso);
                    const extendRight =
                      isSelected && dow !== 6 && selectedSet.has(nextIso);

                    return (
                      <div key={i} className="relative h-11">
                        {/* Range fill (light blue) */}
                        {extendLeft && extendRight && (
                          <div className="absolute inset-x-0 inset-y-1.5 bg-accent-soft" />
                        )}
                        {extendLeft && !extendRight && (
                          <div className="absolute inset-y-1.5 left-0 right-1/2 bg-accent-soft" />
                        )}
                        {extendRight && !extendLeft && (
                          <div className="absolute inset-y-1.5 left-1/2 right-0 bg-accent-soft" />
                        )}

                        <button
                          type="button"
                          disabled={isPast}
                          onClick={() => handleDayClick(day)}
                          aria-pressed={isSelected}
                          aria-label={formatDateJa(iso)}
                          className={[
                            "absolute inset-0 m-auto flex h-9 w-9 items-center justify-center rounded-md text-[13px] tabular transition",
                            isPast
                              ? "text-ink-disabled"
                              : "text-ink",
                            isToday && !isSelected && !isRangeStart
                              ? "font-bold text-accent"
                              : "",
                            isSelected && !isRangeStart
                              ? "!bg-accent !text-paper font-semibold"
                              : "",
                            isRangeStart
                              ? "!bg-accent-strong !text-paper font-semibold ring-2 ring-accent-soft ring-offset-2 ring-offset-paper animate-pulse"
                              : "",
                            !isPast && !isSelected && !isRangeStart
                              ? "hover:bg-paper-shade"
                              : "",
                          ].join(" ")}
                        >
                          {day.getDate()}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
          })}

          <button
            type="button"
            onClick={() => setMonthCount((c) => c + 3)}
            className="mx-auto mt-2 mb-1 flex h-9 items-center justify-center gap-1 rounded-md px-3 text-[12px] font-medium text-ink-muted hover:bg-paper-shade transition"
          >
            <span aria-hidden>+</span>
            もっと先の月を表示
          </button>
        </div>
      </div>
    </div>
  );
}
