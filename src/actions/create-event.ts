"use server";

import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";

type Input = {
  title: string;
  dates: string[]; // YYYY-MM-DD (ローカル)
};

export type CreateEventResult =
  | { ok: false; error: string }
  | { ok: true; eventId: string; adminToken: string };

export async function createEvent(input: Input): Promise<CreateEventResult> {
  const title = input.title.trim();
  if (title.length === 0 || title.length > 80) {
    return { ok: false, error: "タイトルは1〜80文字で入力してください" };
  }

  const dates = Array.from(new Set(input.dates)).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).sort();
  if (dates.length === 0) return { ok: false, error: "候補日を1つ以上選んでください" };
  if (dates.length > 31) return { ok: false, error: "候補日は31件までにしてください" };

  const sb = createServiceClient();

  const { data: ev, error: e1 } = await sb
    .from("events")
    .insert({ title })
    .select("id, admin_token")
    .single();
  if (e1 || !ev) return { ok: false, error: e1?.message ?? "イベント作成に失敗しました" };

  const rows = dates.map((date, i) => ({ event_id: ev.id, date, sort_order: i }));
  const { error: e2 } = await sb.from("event_dates").insert(rows);
  if (e2) {
    await sb.from("events").delete().eq("id", ev.id);
    return { ok: false, error: e2.message };
  }

  redirect(`/event/${ev.id}?admin=${ev.admin_token}`);
}
