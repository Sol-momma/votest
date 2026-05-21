"use client";

import { useState, useTransition } from "react";
import { closeEvent } from "@/actions/close-event";

type Props = {
  eventId: string;
  adminToken: string;
  isClosed: boolean;
  topDateId?: string | null;
};

export function CloseEventButton({
  eventId,
  adminToken,
  isClosed,
  topDateId,
}: Props) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (isClosed) {
    return (
      <div className="callout callout-gray">
        <span aria-hidden>✅</span>
        <p className="flex-1 text-[13px] font-medium text-ink">
          この投票は締め切られました
        </p>
      </div>
    );
  }

  const onClose = () => {
    if (
      !confirm("締め切ると、これ以上の投票ができなくなります。よろしいですか？")
    )
      return;
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
        className="flex h-10 w-full items-center justify-center gap-1.5 rounded-md border border-line bg-paper px-3 text-[13px] font-semibold text-ink transition hover:bg-paper-shade active:scale-[0.98] disabled:opacity-50"
      >
        {pending ? (
          <>
            <span className="inline-block size-3.5 animate-spin rounded-full border-2 border-line border-t-ink" />
            締切処理中…
          </>
        ) : (
          <>
            <svg
              aria-hidden
              className="size-3.5 text-ink-muted"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10" cy="10" r="7" />
              <path d="M10 6v4l2.5 2.5" />
            </svg>
            投票を締め切る
          </>
        )}
      </button>
      {error && (
        <p role="alert" className="text-center text-[11px] text-tag-red-text">
          {error}
        </p>
      )}
    </div>
  );
}
