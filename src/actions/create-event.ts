"use server";

import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import {
  CreateEventInputSchema,
  firstErrorMessage,
  type CreateEventInput,
} from "@/lib/schemas";

export type CreateEventResult =
  | { ok: false; error: string }
  | { ok: true; eventId: string; adminToken: string };

export async function createEvent(
  raw: unknown,
): Promise<CreateEventResult> {
  const parsed = CreateEventInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: firstErrorMessage(parsed.error) };
  }

  const { title, dates }: CreateEventInput = parsed.data;
  const sb = createServiceClient();

  const { data: ev, error: e1 } = await sb
    .from("events")
    .insert({ title })
    .select("id, admin_token")
    .single();
  if (e1 || !ev) {
    return { ok: false, error: e1?.message ?? "イベント作成に失敗しました" };
  }

  const rows = dates.map((date, i) => ({
    event_id: ev.id,
    date,
    sort_order: i,
  }));
  const { error: e2 } = await sb.from("event_dates").insert(rows);
  if (e2) {
    await sb.from("events").delete().eq("id", ev.id);
    return { ok: false, error: e2.message };
  }

  redirect(`/event/${ev.id}?admin=${ev.admin_token}`);
}
