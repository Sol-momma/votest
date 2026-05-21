import Link from "next/link";
import { notFound } from "next/navigation";
import { createServiceClient } from "@/lib/supabase/server";
import { RankingList, type DateBreakdown } from "@/components/RankingList";
import { RankingChart } from "@/components/RankingChart";
import { ShareBlock } from "@/components/ShareBlock";
import { CloseEventButton } from "@/components/CloseEventButton";
import { RecentEventRecorder } from "@/components/RecentEventRecorder";
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
    scoreRows.map((s) => [
      s.event_date_id,
      { o: [], t: [], x: [] } as DateBreakdown,
    ]),
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
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-6 px-5 pb-16 pt-6 md:max-w-6xl md:px-10">
      <RecentEventRecorder
        eventId={ev.id}
        title={ev.title}
        adminToken={isAdmin ? ev.admin_token : null}
      />
      <header className="animate-fade-up">
        <div className="flex items-center gap-2">
          <span
            className={ev.is_closed ? "tag tag-gray" : "tag tag-green"}
          >
            {ev.is_closed ? "締切済み" : "投票受付中"}
          </span>
          {totalRespondents > 0 && (
            <span className="text-[12px] text-ink-muted">
              <span className="tabular font-semibold text-ink">
                {totalRespondents}
              </span>
              名が投票
            </span>
          )}
        </div>

        <h1 className="font-display mt-2 text-2xl leading-tight font-bold text-ink md:text-[32px]">
          {ev.title}
        </h1>
      </header>

      {submitted && (
        <div className="animate-bounce-in callout callout-gray">
          <span aria-hidden>✅</span>
          <p className="flex-1 text-[13px] font-semibold text-ink">
            投票ありがとうございました
          </p>
        </div>
      )}

      {/* 2-col on md+: main content (left) + sidebar (right) */}
      <div className="flex flex-col gap-6 md:grid md:grid-cols-[minmax(0,1fr)_24rem] md:items-start md:gap-8 lg:grid-cols-[minmax(0,1fr)_28rem]">
        {/* Left: main content */}
        <div className="md:col-start-1 flex flex-col gap-6">
          {!ev.is_closed && (
            <Link
              href={`/event/${eventId}/respond`}
              className="animate-fade-up flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent text-[15px] font-semibold text-paper shadow-sm transition active:scale-[0.985] active:bg-accent-strong"
              style={{ animationDelay: "60ms" }}
            >
              {totalRespondents > 0 ? "あなたも投票する" : "投票する"}
              <svg
                aria-hidden
                className="size-4"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12m-4-4l4 4-4 4" />
              </svg>
            </Link>
          )}

          {totalRespondents === 0 ? (
            <div
              className="animate-fade-up overflow-hidden rounded-md border border-line bg-paper"
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-center justify-between border-b border-line bg-paper-cream px-3 py-2">
                <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
                  候補日 · {scoreRows.length} 件
                </span>
                <span className="text-[11px] text-ink-faint">投票待ち</span>
              </div>
              <ul className="divide-y divide-line">
                {scoreRows
                  .slice()
                  .sort((a, b) => a.sort_order - b.sort_order)
                  .map((s) => (
                    <li
                      key={s.event_date_id}
                      className="flex items-center justify-between px-3 py-2.5"
                    >
                      <span className="font-display tabular text-[14px] font-semibold text-ink">
                        {formatDateJa(s.date)}
                      </span>
                      <span className="text-[11px] text-ink-faint">—</span>
                    </li>
                  ))}
              </ul>
            </div>
          ) : (
            <section
              aria-label="結果ランキング"
              className="animate-fade-up flex flex-col gap-5"
              style={{ animationDelay: "120ms" }}
            >
              <div className="flex items-baseline justify-between px-0.5">
                <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
                  出席率ランキング
                </span>
                <span className="text-[11px] text-ink-faint">高い順</span>
              </div>

              {/* 横棒グラフ - 一望できる summary view */}
              <RankingChart
                scores={scoreRows}
                decidedDateId={ev.decided_date_id}
              />

              {/* 詳細カード - 名前・内訳まで含む detail view */}
              <div className="pt-2">
                <span className="mb-3 inline-block px-0.5 text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
                  詳細
                </span>
                <RankingList
                  scores={scoreRows}
                  decidedDateId={ev.decided_date_id}
                  breakdown={breakdown}
                />
              </div>
            </section>
          )}
        </div>

        {/* Right: sticky sidebar (share + admin) */}
        <aside
          className="animate-fade-up md:col-start-2 md:sticky md:top-24 md:self-start flex flex-col gap-4"
          style={{ animationDelay: "150ms" }}
        >
          <ShareBlock
            eventTitle={ev.title}
            respondPath={`/event/${eventId}/respond`}
          />

          {isAdmin && (
            <div className="overflow-hidden rounded-md border border-line bg-paper">
              <div className="flex items-center gap-2 border-b border-line bg-paper-cream px-3 py-2">
                <span aria-hidden>🔐</span>
                <span className="text-[11px] font-semibold tracking-wider text-ink-muted uppercase">
                  管理メニュー
                </span>
              </div>
              <div className="p-3">
                <CloseEventButton
                  eventId={ev.id}
                  adminToken={ev.admin_token}
                  isClosed={ev.is_closed}
                  topDateId={topDateId}
                />
                <p className="mt-2 text-[11px] text-ink-faint">
                  このURL（?admin=…付き）は他の人に共有しないでください
                </p>
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  );
}
