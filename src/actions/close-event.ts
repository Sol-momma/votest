"use server";

import { revalidatePath } from "next/cache";
import { createServiceClient } from "@/lib/supabase/server";

type Input = {
  eventId: string;
  adminToken: string;
  decidedDateId?: string | null;
};

export type CloseEventResult = { ok: false; error: string } | { ok: true };

export async function closeEvent(input: Input): Promise<CloseEventResult> {
  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, admin_token, is_closed")
    .eq("id", input.eventId)
    .maybeSingle();
  if (!ev) return { ok: false, error: "イベントが見つかりません" };
  if (ev.admin_token !== input.adminToken) {
    return { ok: false, error: "管理権限がありません" };
  }
  if (ev.is_closed) return { ok: true };

  const { error } = await sb
    .from("events")
    .update({
      is_closed: true,
      decided_date_id: input.decidedDateId ?? null,
    })
    .eq("id", input.eventId);
  if (error) return { ok: false, error: error.message };

  revalidatePath(`/event/${input.eventId}`);
  return { ok: true };
}
