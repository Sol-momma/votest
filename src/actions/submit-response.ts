"use server";

import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import {
  SubmitResponseInputSchema,
  firstErrorMessage,
} from "@/lib/schemas";

export type SubmitResponseResult = { ok: false; error: string } | { ok: true };

export async function submitResponse(
  raw: unknown,
): Promise<SubmitResponseResult> {
  const parsed = SubmitResponseInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: firstErrorMessage(parsed.error) };
  }

  const { eventId, nickname, answers } = parsed.data;
  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, is_closed")
    .eq("id", eventId)
    .maybeSingle();
  if (!ev) return { ok: false, error: "イベントが見つかりません" };
  if (ev.is_closed)
    return { ok: false, error: "この日程調整は締め切られています" };

  // event_dates 整合性チェック（外部入力からのIDが正当か）
  const { data: validDates, error: eDates } = await sb
    .from("event_dates")
    .select("id")
    .eq("event_id", eventId);
  if (eDates) return { ok: false, error: eDates.message };
  const validIds = new Set((validDates ?? []).map((d) => d.id));
  const filtered = answers.filter((a) => validIds.has(a.eventDateId));
  if (filtered.length === 0) {
    return { ok: false, error: "回答対象の候補日がありません" };
  }

  const { data: resp, error: e1 } = await sb
    .from("responses")
    .insert({ event_id: eventId, nickname })
    .select("id")
    .single();
  if (e1 || !resp) {
    return { ok: false, error: e1?.message ?? "回答作成に失敗しました" };
  }

  const rows = filtered.map((a) => ({
    response_id: resp.id,
    event_date_id: a.eventDateId,
    mark: a.mark,
  }));
  const { error: e2 } = await sb.from("response_answers").insert(rows);
  if (e2) {
    await sb.from("responses").delete().eq("id", resp.id);
    return { ok: false, error: e2.message };
  }

  redirect(`/event/${eventId}?submitted=1`);
}
