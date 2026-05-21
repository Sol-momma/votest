import { notFound, redirect } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { RespondForm } from "@/components/RespondForm";
import type { EventDateRow, EventRow } from "@/types/db";

type Params = Promise<{ eventId: string }>;

export default async function RespondPage(props: { params: Params }) {
  const { eventId } = await props.params;
  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, title, admin_token, is_closed, decided_date_id, created_at")
    .eq("id", eventId)
    .maybeSingle<EventRow>();
  if (!ev) notFound();
  if (ev.is_closed) redirect(`/event/${eventId}`);

  const { data: dates } = await sb
    .from("event_dates")
    .select("id, event_id, date, sort_order")
    .eq("event_id", eventId)
    .order("sort_order", { ascending: true });

  const dateRows = (dates ?? []) as EventDateRow[];
  if (dateRows.length === 0) notFound();

  return (
    <RespondForm
      eventId={ev.id}
      eventTitle={ev.title}
      dates={dateRows.map((d) => ({ id: d.id, date: d.date }))}
    />
  );
}
