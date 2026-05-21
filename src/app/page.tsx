import Link from "next/link";
import { MouseTilt } from "@/components/MouseTilt";

export default function Home() {
  return (
    <main className="relative">
      {/* ============================================================
          01 · HERO
          ============================================================ */}
      <section className="relative px-6 pt-14 pb-32 md:px-12 md:pt-24 md:pb-48">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
                ITUIKU
              </span>
              <span aria-hidden className="h-px w-8 bg-line-strong" />
              <span className="font-brand text-[10px] tracking-[0.32em] text-ink-faint uppercase">
                01 — Schedule
              </span>
            </div>

            <h1 className="font-display mt-10 text-[56px] leading-[0.92] font-bold tracking-[-0.04em] text-ink md:mt-12 md:text-[112px]">
              When
              <br />
              should
              <br />
              <span className="italic font-medium">we meet?</span>
            </h1>

            <p className="mt-10 max-w-md text-[15px] leading-relaxed text-ink-muted md:mt-12 md:max-w-lg md:text-[17px]">
              候補日に投票するだけ。出席率の高い順に並んだ結果を、URL ひとつで共有。
              <span className="block mt-2 text-ink-faint">
                Vote on candidate dates. Share by URL. Decide instantly.
              </span>
            </p>

            <div className="mt-12 flex items-center gap-6 md:mt-16">
              <Link
                href="/new"
                className="group inline-flex items-center gap-3 border-b border-ink pb-1 text-[15px] font-medium text-ink transition hover:gap-4 md:text-base"
              >
                <span>始める</span>
                <svg
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10h12m-4-5l5 5-5 5" />
                </svg>
              </Link>
              <span className="text-[11px] tracking-wider text-ink-faint uppercase">
                Free · No sign-up
              </span>
            </div>
          </div>

          {/* Right: Interactive product preview */}
          <div className="relative md:translate-y-4">
            <MouseTilt intensity={5} className="relative">
              <div className="relative overflow-hidden rounded-[20px] border border-line bg-paper shadow-pop">
                {/* Top bar */}
                <div className="flex items-center justify-between border-b border-line bg-paper-cream px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden className="size-2 rounded-full bg-paper-deep" />
                    <span aria-hidden className="size-2 rounded-full bg-paper-deep" />
                    <span aria-hidden className="size-2 rounded-full bg-paper-deep" />
                  </div>
                  <span className="font-brand text-[9px] tracking-widest text-ink-faint uppercase">
                    Preview
                  </span>
                </div>

                <div className="p-5 md:p-6">
                  <span className="tag tag-gray text-[10px] tracking-wider uppercase">
                    Ranking
                  </span>
                  <h3 className="font-display mt-3 text-lg font-bold text-ink">
                    Year-end dinner
                  </h3>

                  <ol className="mt-5 space-y-3">
                    {[
                      { rank: "01", date: "Dec 14 · Fri", pct: 92, o: 11, t: 1, x: 0, winner: true },
                      { rank: "02", date: "Dec 21 · Fri", pct: 75, o: 8, t: 1, x: 3 },
                      { rank: "03", date: "Dec 7 · Fri", pct: 50, o: 5, t: 2, x: 5 },
                    ].map((row) => {
                      const total = row.o + row.t + row.x;
                      return (
                        <li
                          key={row.rank}
                          className={`rounded-xl border p-3 ${
                            row.winner
                              ? "border-ink bg-paper"
                              : "border-line bg-paper"
                          }`}
                        >
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-baseline gap-3">
                              <span className="font-brand tabular text-[10px] tracking-widest text-ink-faint">
                                {row.rank}
                              </span>
                              <span className="font-display text-[14px] font-bold text-ink">
                                {row.date}
                              </span>
                            </div>
                            <span className="font-display tabular text-[20px] font-bold text-ink">
                              {row.pct}
                              <span className="text-[10px] font-normal text-ink-muted">%</span>
                            </span>
                          </div>
                          <div className="mt-2 flex h-1 overflow-hidden rounded-full bg-paper-shade">
                            <div
                              style={{
                                width: `${(row.o / total) * 100}%`,
                                backgroundColor: "var(--color-ink)",
                              }}
                            />
                            <div
                              style={{
                                width: `${(row.t / total) * 100}%`,
                                backgroundColor: "var(--color-ink-muted)",
                              }}
                            />
                            <div
                              style={{
                                width: `${(row.x / total) * 100}%`,
                                backgroundColor: "var(--color-paper-deep)",
                              }}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </MouseTilt>

            {/* Caption */}
            <p className="mt-6 px-2 text-[11px] tracking-wider text-ink-faint uppercase">
              ↓ Move your cursor. Tilt the surface.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
          02 · STORY (scrollytelling)
          ============================================================ */}
      <section className="relative border-t border-line bg-paper-cream px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:gap-20">
            {/* Sticky left text */}
            <div className="md:sticky md:top-24 md:self-start">
              <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
                02 — Process
              </span>
              <h2 className="font-display mt-6 text-[40px] leading-[0.95] font-bold tracking-[-0.03em] text-ink md:text-[72px]">
                <span className="italic font-medium">Three</span>
                <br />
                gestures.
              </h2>
              <p className="mt-8 max-w-md text-[15px] leading-relaxed text-ink-muted">
                ログインも、アプリインストールも、メール認証も不要。三つの操作で意思決定が完了する。
              </p>
            </div>

            {/* Right: process panels */}
            <div className="flex flex-col gap-px overflow-hidden rounded-2xl border border-line bg-line">
              {[
                {
                  n: "01",
                  title: "Select",
                  jp: "候補日を選ぶ",
                  body: "カレンダーから複数の候補をまとめて選択。範囲指定にも対応。",
                },
                {
                  n: "02",
                  title: "Share",
                  jp: "URLを送る",
                  body: "ログイン不要のリンクを LINE・SMS・コピペで届ける。",
                },
                {
                  n: "03",
                  title: "Resolve",
                  jp: "結果を読む",
                  body: "出席率の高い順に自動で並び替え。チャートで一目。",
                },
              ].map((s, i) => (
                <article
                  key={s.n}
                  className={`scroll-enter flex gap-8 bg-paper p-7 transition md:p-10 ${
                    i === 0 ? "" : ""
                  }`}
                >
                  <span className="font-brand tabular text-[11px] tracking-widest text-ink-faint">
                    {s.n}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink md:text-[28px]">
                      <span className="italic font-medium">{s.title}</span>
                      <span className="ml-3 font-normal text-ink-muted text-base">
                        — {s.jp}
                      </span>
                    </h3>
                    <p className="mt-3 max-w-md text-[14px] leading-relaxed text-ink-muted">
                      {s.body}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 · POSITION (manifesto)
          ============================================================ */}
      <section className="relative border-t border-line px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-center gap-3">
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              03 — Manifesto
            </span>
            <span aria-hidden className="h-px flex-1 bg-line-strong" />
          </div>

          <blockquote className="scroll-enter mt-12 md:mt-16">
            <p className="font-display text-[32px] leading-[1.15] font-bold tracking-[-0.02em] text-ink md:text-[56px]">
              <span className="italic font-medium">候補日10件</span>
              でも、
              <br />
              <span className="text-ink-muted">30秒</span>
              で答えられる。
            </p>
            <footer className="mt-10 flex items-center gap-3 text-[11px] tracking-wider text-ink-faint uppercase">
              <span aria-hidden className="h-px w-12 bg-line-strong" />
              <span>The principle</span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ============================================================
          04 · PRINCIPLES
          ============================================================ */}
      <section className="relative border-t border-line bg-paper-cream px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between">
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              04 — Principles
            </span>
            <span className="font-brand text-[10px] tracking-widest text-ink-faint">
              5 · TOTAL
            </span>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-2">
            {[
              {
                n: "I",
                title: "Vote, not navigate",
                jp: "操作ではなく、投票",
                body: "30件の候補日も数タップで完結。一括投票・範囲投票で「指が疲れる」を解消。",
              },
              {
                n: "II",
                title: "Phone-first geometry",
                jp: "スマホ前提の設計",
                body: "ボタンは指サイズ。safe-area を尊重。片手で完結する縦スクロール。",
              },
              {
                n: "III",
                title: "No identity required",
                jp: "誰のものでもない",
                body: "ログインなし。URLを知っている人が、それだけで参加できる。",
              },
              {
                n: "IV",
                title: "Numbers, then names",
                jp: "数字 → 名前",
                body: "出席率順に自動ランキング。3色スタックバーで内訳が即時に伝わる。",
              },
              {
                n: "V",
                title: "Doubt is a valid state",
                jp: "「微妙」も意思",
                body: "◯ と × の間にある「行けるかも」を、◯ 🤔 × の三段階で素直に表現できる。",
              },
            ].map((p) => (
              <article
                key={p.n}
                className="scroll-enter flex flex-col gap-6 bg-paper p-7 transition md:p-10"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display tabular text-[36px] font-medium italic leading-none text-ink-faint md:text-[44px]">
                    {p.n}
                  </span>
                  <span className="text-[10px] tracking-widest text-ink-faint uppercase">
                    {p.jp}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight text-ink md:text-[26px]">
                  {p.title}
                </h3>
                <p className="text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
                  {p.body}
                </p>
              </article>
            ))}

            {/* Last empty cell for grid balance + final CTA hint */}
            <article className="scroll-enter flex flex-col justify-between gap-6 bg-paper p-7 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-display tabular text-[36px] font-medium italic leading-none text-ink-faint md:text-[44px]">
                  —
                </span>
                <span className="text-[10px] tracking-widest text-ink-faint uppercase">
                  Try it
                </span>
              </div>
              <Link
                href="/new"
                className="group mt-auto inline-flex items-center gap-3 text-[15px] font-medium text-ink"
              >
                <span className="border-b border-ink pb-0.5">
                  最初のイベントを作る
                </span>
                <svg
                  aria-hidden
                  className="size-4 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10h12m-4-5l5 5-5 5" />
                </svg>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* ============================================================
          05 · CTA
          ============================================================ */}
      <section className="relative border-t border-line px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
            05 — Begin
          </span>
          <h2 className="font-display mt-8 text-[44px] leading-[0.95] font-bold tracking-[-0.04em] text-ink md:text-[96px]">
            <span className="italic font-medium">Decide</span>
            <br />
            tonight.
          </h2>
          <p className="mt-10 text-[15px] text-ink-muted md:text-base">
            無料 · ログイン不要 · 候補日いくつでも
          </p>
          <div className="mt-14 flex justify-center md:mt-16">
            <Link
              href="/new"
              className="group inline-flex items-center gap-3 rounded-full border border-ink bg-ink px-8 py-4 text-[15px] font-medium text-paper transition hover:gap-4 active:scale-[0.98] md:px-10 md:py-5 md:text-base"
            >
              <span>イベントを作る</span>
              <svg
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12m-4-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer hairline */}
      <footer className="border-t border-line px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] tracking-widest text-ink-faint uppercase">
          <span className="font-brand">© Ituiku</span>
          <span>Mobile-first scheduling</span>
        </div>
      </footer>
    </main>
  );
}
