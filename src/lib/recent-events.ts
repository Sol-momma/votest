"use client";

/**
 * 最近作った／閲覧したイベントを localStorage に保存。
 * 認証ナシのアプリで「自分が触ったイベント」をサイドバーから素早く戻れるようにする。
 */

const KEY = "ituiku.recent-events.v1";
const MAX = 20;

export type RecentEvent = {
  eventId: string;
  title: string;
  adminToken?: string;
  visitedAt: number;
};

function safeStorage(): Storage | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

export function loadRecentEvents(): RecentEvent[] {
  const s = safeStorage();
  if (!s) return [];
  try {
    const raw = s.getItem(KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    if (!Array.isArray(arr)) return [];
    return arr
      .filter(
        (x): x is RecentEvent =>
          x &&
          typeof x.eventId === "string" &&
          typeof x.title === "string" &&
          typeof x.visitedAt === "number",
      )
      .slice(0, MAX);
  } catch {
    return [];
  }
}

export function saveRecentEvent(entry: {
  eventId: string;
  title: string;
  adminToken?: string;
}): void {
  const s = safeStorage();
  if (!s) return;
  try {
    const existing = loadRecentEvents();
    // 既存の同IDを除いて、先頭に追加
    const next: RecentEvent[] = [
      {
        eventId: entry.eventId,
        title: entry.title,
        adminToken: entry.adminToken,
        visitedAt: Date.now(),
      },
      ...existing.filter((e) => e.eventId !== entry.eventId),
    ].slice(0, MAX);
    s.setItem(KEY, JSON.stringify(next));
    // sidebar 等の他コンポーネントに変更を通知
    window.dispatchEvent(new CustomEvent("ituiku:recent-events:changed"));
  } catch {
    // localStorage quota 等は黙って失敗
  }
}

export function removeRecentEvent(eventId: string): void {
  const s = safeStorage();
  if (!s) return;
  try {
    const next = loadRecentEvents().filter((e) => e.eventId !== eventId);
    s.setItem(KEY, JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("ituiku:recent-events:changed"));
  } catch {
    // ignore
  }
}

export function clearRecentEvents(): void {
  const s = safeStorage();
  if (!s) return;
  try {
    s.removeItem(KEY);
    window.dispatchEvent(new CustomEvent("ituiku:recent-events:changed"));
  } catch {
    // ignore
  }
}
