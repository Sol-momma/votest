"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";
import {
  CloseEventInputSchema,
  firstErrorMessage,
} from "@/lib/schemas";

export type CloseEventResult = { ok: false; error: string } | { ok: true };

export async function closeEvent(raw: unknown): Promise<CloseEventResult> {
  const parsed = CloseEventInputSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: firstErrorMessage(parsed.error) };
  }

  const { eventId, adminToken, decidedDateId } = parsed.data;
  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, admin_token, is_closed")
    .eq("id", eventId)
    .maybeSingle();
  if (!ev) return { ok: false, error: "イベントが見つかりません" };
  if (ev.admin_token !== adminToken) {
    return { ok: false, error: "管理権限がありません" };
  }
  if (ev.is_closed) return { ok: true };

  const { error } = await sb
    .from("events")
    .update({
      is_closed: true,
      decided_date_id: decidedDateId ?? null,
    })
    .eq("id", eventId);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/event/${eventId}`);
  return { ok: true };
}
