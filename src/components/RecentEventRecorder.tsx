"use client";

import { useEffect } from "react";
import { saveRecentEvent } from "@/lib/recent-events";

type Props = {
  eventId: string;
  title: string;
  adminToken?: string | null;
};

/**
 * イベントページを開いたタイミングで localStorage に履歴保存する。
 * 画面には何も描画しない（副作用専用コンポーネント）。
 */
export function RecentEventRecorder({ eventId, title, adminToken }: Props) {
  useEffect(() => {
    saveRecentEvent({
      eventId,
      title,
      adminToken: adminToken ?? undefined,
    });
  }, [eventId, title, adminToken]);

  return null;
}
