"use server";

import { redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import type { Mark } from "@/types/db";

type Input = {
  eventId: string;
  nickname: string;
  answers: { eventDateId: string; mark: Mark }[];
};

export type SubmitResponseResult = { ok: false; error: string } | { ok: true };

export async function submitResponse(input: Input): Promise<SubmitResponseResult> {
  const nickname = input.nickname.trim();
  if (!nickname) return { ok: false, error: "名前を入力してください" };
  if (nickname.length > 30) return { ok: false, error: "名前は30文字以内にしてください" };
  if (input.answers.length === 0) return { ok: false, error: "回答がありません" };

  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, is_closed")
    .eq("id", input.eventId)
    .maybeSingle();
  if (!ev) return { ok: false, error: "イベントが見つかりません" };
  if (ev.is_closed) return { ok: false, error: "この日程調整は締め切られています" };

  const { data: validDates, error: eDates } = await sb
    .from("event_dates")
    .select("id")
    .eq("event_id", input.eventId);
  if (eDates) return { ok: false, error: eDates.message };
  const validIds = new Set((validDates ?? []).map((d) => d.id));
  const filtered = input.answers.filter((a) => validIds.has(a.eventDateId));
  if (filtered.length === 0) return { ok: false, error: "回答対象の候補日がありません" };

  const { data: resp, error: e1 } = await sb
    .from("responses")
    .insert({ event_id: input.eventId, nickname })
    .select("id")
    .single();
  if (e1 || !resp) return { ok: false, error: e1?.message ?? "回答作成に失敗しました" };

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

  redirect(`/event/${input.eventId}?submitted=1`);
}
