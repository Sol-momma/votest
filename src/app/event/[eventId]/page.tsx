import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { RankingList, type DateBreakdown } from "@/components/RankingList";
import { ShareBlock } from "@/components/ShareBlock";
import { CloseEventButton } from "@/components/CloseEventButton";
import { rank } from "@/lib/score";
import { formatDateJa } from "@/lib/format";
import type { EventDateScoreRow, EventRow, Mark } from "@/types/db";

type ResponseWithAnswers = {
  id: string;
  nickname: string;
  response_answers: { event_date_id: string; mark: Mark }[];
};

type Params = Promise<{ eventId: string }>;
type SearchParams = Promise<{ admin?: string; submitted?: string }>;

export default async function EventPage(props: {
  params: Params;
  searchParams: SearchParams;
}) {
  const { eventId } = await props.params;
  const { admin, submitted } = await props.searchParams;

  const sb = createServiceClient();

  const { data: ev } = await sb
    .from("events")
    .select("id, title, admin_token, is_closed, decided_date_id, created_at")
    .eq("id", eventId)
    .maybeSingle<EventRow>();
  if (!ev) notFound();

  const { data: scores } = await sb
    .from("event_date_scores")
    .select("*")
    .eq("event_id", eventId)
    .order("sort_order", { ascending: true });

  const { data: respRows } = await sb
    .from("responses")
    .select("id, nickname, response_answers(event_date_id, mark)")
    .eq("event_id", eventId)
    .order("created_at", { ascending: true });

  const scoreRows = (scores ?? []) as EventDateScoreRow[];
  const responses = (respRows ?? []) as ResponseWithAnswers[];
  const totalRespondents = responses.length;

  const breakdown: Record<string, DateBreakdown> = Object.fromEntries(
    scoreRows.map((s) => [s.event_date_id, { o: [], t: [], x: [] } as DateBreakdown]),
  );
  for (const r of responses) {
    for (const a of r.response_answers) {
      const slot = breakdown[a.event_date_id];
      if (slot) slot[a.mark].push(r.nickname);
    }
  }

  const isAdmin = admin === ev.admin_token;
  const ranked = rank(scoreRows);
  const topDateId = ranked.length > 0 ? ranked[0].event_date_id : null;

  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-5 px-4 pb-12 pt-6">
      <header>
        <p className="text-xs text-zinc-500">
          {ev.is_closed ? "締切済み" : "回答受付中"}
          {totalRespondents > 0 && ` ・ ${totalRespondents}名が回答`}
        </p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-zinc-900">{ev.title}</h1>
      </header>

      {submitted && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          回答ありがとうございました ✓
        </div>
      )}

      {!ev.is_closed && (
        <Link
          href={`/event/${eventId}/respond`}
          className="flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-md active:scale-[0.99]"
        >
          {totalRespondents > 0 ? "あなたも回答する" : "回答する"}
        </Link>
      )}

      {totalRespondents === 0 ? (
        <>
          <div className="rounded-2xl border border-zinc-200 bg-white p-4">
            <p className="mb-2 text-sm font-medium text-zinc-700">
              候補日（{scoreRows.length}件）
            </p>
            <p className="text-sm text-zinc-600">
              {scoreRows
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order)
                .map((s) => formatDateJa(s.date))
                .join("、")}
            </p>
          </div>
          <ShareBlock
            eventTitle={ev.title}
            respondPath={`/event/${eventId}/respond`}
          />
        </>
      ) : (
        <section aria-label="結果ランキング">
          <p className="mb-2 text-sm font-medium text-zinc-700">
            みんなが行ける順
          </p>
          <RankingList
            scores={scoreRows}
            decidedDateId={ev.decided_date_id}
            breakdown={breakdown}
          />
          <div className="mt-4">
            <ShareBlock
              eventTitle={ev.title}
              respondPath={`/event/${eventId}/respond`}
            />
          </div>
        </section>
      )}

      {isAdmin && (
        <div className="mt-4">
          <p className="mb-2 text-xs text-zinc-500">幹事メニュー</p>
          <CloseEventButton
            eventId={ev.id}
            adminToken={ev.admin_token}
            isClosed={ev.is_closed}
            topDateId={topDateId}
          />
          <p className="mt-2 text-xs text-zinc-500">
            ※ このURL（?admin=...付き）は他の人に共有しないでください
          </p>
        </div>
      )}
    </main>
  );
}
