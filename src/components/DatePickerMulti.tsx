"use client";

import "react-day-picker/style.css";
import { DayPicker } from "react-day-picker";
import { ja } from "react-day-picker/locale";
import { toIsoDate } from "@/lib/format";

type Props = {
  value: string[]; // ISO YYYY-MM-DD
  onChange: (next: string[]) => void;
};

export function DatePickerMulti({ value, onChange }: Props) {
  const selected = value.map((iso) => new Date(`${iso}T00:00:00`));
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="rdp-wrapper rounded-2xl border border-zinc-200 bg-white p-2 shadow-sm">
      <DayPicker
        mode="multiple"
        locale={ja}
        weekStartsOn={0}
        selected={selected}
        onSelect={(dates) => onChange((dates ?? []).map(toIsoDate).sort())}
        disabled={{ before: today }}
        showOutsideDays
        className="mx-auto"
      />
      <style>{`
        .rdp-wrapper .rdp-root { --rdp-accent-color: #059669; --rdp-accent-background-color: #d1fae5; }
        .rdp-wrapper .rdp-day_button { font-size: 1rem; height: 2.5rem; width: 2.5rem; }
        .rdp-wrapper .rdp-selected .rdp-day_button { background: #059669; color: white; border-radius: 9999px; }
        .rdp-wrapper .rdp-today { font-weight: 700; }
      `}</style>
    </div>
  );
}
