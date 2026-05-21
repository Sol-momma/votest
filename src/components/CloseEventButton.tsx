"use client";

import { useState, useTransition } from "react";
import { closeEvent } from "@/actions/close-event";

type Props = {
  eventId: string;
  adminToken: string;
  isClosed: boolean;
  topDateId?: string | null;
};

export function CloseEventButton({ eventId, adminToken, isClosed, topDateId }: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (isClosed) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm font-medium text-emerald-800">
        この日程調整は締め切られました
      </div>
    );
  }

  const onClose = () => {
    if (!confirm("締め切ると、これ以上の回答ができなくなります。よろしいですか？")) return;
    setError(null);
    startTransition(async () => {
      const res = await closeEvent({
        eventId,
        adminToken,
        decidedDateId: topDateId ?? null,
      });
      if (!res.ok) setError(res.error);
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={onClose}
        disabled={pending}
        className="h-12 w-full rounded-2xl border-2 border-rose-300 bg-white text-sm font-bold text-rose-700 shadow-sm active:scale-[0.99] disabled:opacity-50"
      >
        {pending ? "締切処理中..." : "回答を締め切る（管理者のみ）"}
      </button>
      {error && (
        <p role="alert" className="text-sm text-rose-600">{error}</p>
      )}
    </div>
  );
}
