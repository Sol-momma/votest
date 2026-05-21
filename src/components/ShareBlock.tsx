"use client";

import { useState } from "react";

type Props = {
  eventTitle: string;
  respondPath: string; // e.g. /event/xxx/respond
};

export function ShareBlock({ eventTitle, respondPath }: Props) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  if (!shareUrl && typeof window !== "undefined") {
    setShareUrl(`${window.location.origin}${respondPath}`);
  }

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
        await navigator.share({ title: eventTitle, text: message, url: shareUrl });
        return;
      } catch {
        // ユーザーキャンセル等
      }
    }
    window.location.href = lineUrl;
  };

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
      <div>
        <p className="text-sm font-medium text-emerald-900">参加者にこのURLを送ろう</p>
        <p className="mt-1 break-all text-sm text-zinc-700">{shareUrl || "..."}</p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="h-12 rounded-xl border border-zinc-300 bg-white text-sm font-bold text-zinc-800 shadow-sm active:scale-[0.99]"
        >
          {copied ? "コピーしました ✓" : "URLをコピー"}
        </button>
        <button
          type="button"
          onClick={handleNativeShare}
          className="h-12 rounded-xl bg-emerald-600 text-sm font-bold text-white shadow-sm active:scale-[0.99]"
        >
          シェアする
        </button>
      </div>

      <a
        href={lineUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-12 rounded-xl bg-[#06C755] text-center text-sm font-bold leading-[3rem] text-white shadow-sm active:scale-[0.99]"
      >
        LINEで送る
      </a>
    </div>
  );
}
