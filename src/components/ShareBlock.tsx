"use client";

import { useEffect, useState } from "react";

type Props = {
  eventTitle: string;
  respondPath: string;
};

export function ShareBlock({ eventTitle, respondPath }: Props) {
  const [shareUrl, setShareUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}${respondPath}`);
    }
  }, [respondPath]);

  const message = `「${eventTitle}」の日程アンケートです\n${shareUrl}`;
  const lineUrl = `https://line.me/R/msg/text/?${encodeURIComponent(message)}`;

  const handleCopy = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("コピーしてください:", shareUrl);
    }
  };

  const handleNativeShare = async () => {
    if (!shareUrl) return;
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          title: eventTitle,
          text: message,
          url: shareUrl,
        });
        return;
      } catch {
        // user canceled
      }
    }
    window.location.href = lineUrl;
  };

  return (
    <div className="overflow-hidden rounded-md border border-line bg-paper">
      <div className="flex items-center gap-2 border-b border-line bg-paper-cream px-3 py-2">
        <span aria-hidden>🔗</span>
        <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
          投票リンクを共有
        </span>
      </div>

      <div className="p-3">
        {/* URL block */}
        <div className="flex items-center gap-2 rounded-md border border-line bg-paper-cream px-3 py-2">
          <svg
            aria-hidden
            className="size-3.5 shrink-0 text-ink-faint"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 12.5a3 3 0 004.24 0l2-2a3 3 0 10-4.24-4.24l-1 1m1.24 4.24a3 3 0 01-4.24 0l-2-2a3 3 0 014.24-4.24l1 1" />
          </svg>
          <span className="flex-1 truncate text-[12px] text-ink-muted">
            {shareUrl || "..."}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-2 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-10 items-center justify-center gap-1.5 rounded-md border border-line bg-paper px-3 text-[13px] font-semibold text-ink transition hover:bg-paper-shade active:scale-[0.98]"
          >
            {copied ? (
              <>
                <svg
                  aria-hidden
                  className="size-3.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 10l4 4 7-8" />
                </svg>
                コピー済み
              </>
            ) : (
              <>
                <svg
                  aria-hidden
                  className="size-3.5"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="7" y="7" width="9" height="9" rx="1.5" />
                  <path d="M5 13H4.5A1.5 1.5 0 013 11.5v-7A1.5 1.5 0 014.5 3h7A1.5 1.5 0 0113 4.5V5" />
                </svg>
                URLコピー
              </>
            )}
          </button>
          <button
            type="button"
            onClick={handleNativeShare}
            className="flex h-10 items-center justify-center gap-1.5 rounded-md bg-accent px-3 text-[13px] font-semibold text-paper transition active:scale-[0.98] active:bg-accent-strong"
          >
            <svg
              aria-hidden
              className="size-3.5"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 6V4a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h6a2 2 0 002-2v-2m-2-4h7m0 0l-3-3m3 3l-3 3" />
            </svg>
            シェア
          </button>
        </div>

        {/* LINE special CTA */}
        <a
          href={lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex h-10 w-full items-center justify-center gap-1.5 rounded-md text-[13px] font-semibold text-paper transition active:scale-[0.98]"
          style={{ backgroundColor: "#06C755" }}
        >
          <svg
            aria-hidden
            className="size-3.5 fill-paper"
            viewBox="0 0 20 20"
          >
            <path d="M10 2C5.03 2 1 5.36 1 9.5c0 3.7 3.27 6.8 7.7 7.4.3.07.7.21.8.48.09.25.06.63.03.88l-.13.78c-.04.23-.18.9.79.49.97-.41 5.25-3.1 7.16-5.3C18.62 12.84 19 11.22 19 9.5 19 5.36 14.97 2 10 2z" />
          </svg>
          LINEで送る
        </a>
      </div>
    </div>
  );
}
