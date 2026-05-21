"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearRecentEvents,
  loadRecentEvents,
  type RecentEvent,
} from "@/lib/recent-events";

export function SiteSidebar() {
  const [items, setItems] = useState<RecentEvent[]>([]);

  useEffect(() => {
    const update = () => setItems(loadRecentEvents());
    update();
    window.addEventListener("ituiku:recent-events:changed", update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener("ituiku:recent-events:changed", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-line bg-paper-cream md:flex">
      {/* Brand */}
      <div className="flex items-center px-5 py-4">
        <Link
          href="/"
          aria-label="いついく？ トップへ"
          className="group relative inline-flex h-9 items-center transition active:scale-[0.96]"
        >
          <span
            aria-hidden
            className="relative z-10 text-[26px] leading-none transition-transform duration-300 ease-out group-hover:-rotate-12 group-hover:scale-110"
          >
            📅
          </span>
          <span
            className="ml-1 inline-flex max-w-0 overflow-hidden opacity-0 -translate-x-2 transition-all duration-400 ease-out group-hover:max-w-[200px] group-hover:opacity-100 group-hover:translate-x-0"
            style={{ transitionDuration: "350ms" }}
          >
            <span className="whitespace-nowrap font-display text-[22px] font-bold leading-none tracking-[-0.03em] text-ink">
              いついく
              <span className="text-accent">？</span>
            </span>
          </span>
        </Link>
      </div>

      {/* New event CTA */}
      <div className="px-3 pb-3">
        <Link
          href="/new"
          className="flex h-10 w-full items-center justify-center gap-1.5 rounded-md bg-accent text-[14px] font-semibold text-paper shadow-sm transition hover:bg-accent-strong active:scale-[0.98]"
        >
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
            <path d="M10 4v12M4 10h12" />
          </svg>
          新しいイベント
        </Link>
      </div>

      {/* Recent list */}
      <div className="flex-1 overflow-y-auto px-2">
        <div className="flex items-center justify-between px-2 py-2">
          <span className="text-[10px] font-semibold tracking-wider text-ink-muted uppercase">
            最近のイベント
          </span>
          {items.length > 0 && (
            <button
              type="button"
              onClick={() => {
                if (confirm("最近のイベント一覧をクリアしますか？")) {
                  clearRecentEvents();
                }
              }}
              className="text-[10px] font-medium text-ink-faint hover:text-ink-muted transition"
            >
              クリア
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <p className="px-2 py-3 text-[12px] leading-relaxed text-ink-faint">
            まだイベントがありません。
            <br />
            上の「新しいイベント」から始めましょう。
          </p>
        ) : (
          <ul className="flex flex-col gap-0.5">
            {items.map((e) => {
              const href = e.adminToken
                ? `/event/${e.eventId}?admin=${e.adminToken}`
                : `/event/${e.eventId}`;
              return (
                <li key={e.eventId} className="group relative">
                  <Link
                    href={href}
                    className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[13px] text-ink hover:bg-paper-shade transition"
                  >
                    <span aria-hidden className="text-sm">
                      {e.adminToken ? "🔐" : "🗂"}
                    </span>
                    <span className="flex-1 truncate font-medium">
                      {e.title || "(タイトルなし)"}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Bottom: small help */}
      <div className="border-t border-line px-4 py-3">
        <p className="text-[11px] leading-relaxed text-ink-faint">
          ログイン不要・無料。
          <br />
          履歴はこの端末にだけ保存されます。
        </p>
      </div>
    </aside>
  );
}
