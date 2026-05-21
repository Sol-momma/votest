import Link from "next/link";
import { CustomCursor } from "@/components/CustomCursor";
import { Marquee } from "@/components/Marquee";
import { MouseTilt } from "@/components/MouseTilt";

export default function Home() {
  return (
    <div className="theme-night relative min-h-dvh bg-night text-cream-warm">
      <CustomCursor />

      {/* ============================================================
          TOP MARQUEE
          ============================================================ */}
      <div className="border-b border-cream-warm-faint/20 bg-night py-3 text-cream-warm-muted">
        <Marquee className="text-[11px] uppercase tracking-[0.32em]">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="flex items-center gap-12">
              <span aria-hidden className="text-spark">
                ●
              </span>
              <span>Ituiku · Mobile-first scheduling</span>
              <span aria-hidden>—</span>
              <span>2026 · Quiet · Decisive</span>
              <span aria-hidden>—</span>
              <span>候補日 10件 でも 30秒 で答えられる</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* ============================================================
          NAV STRIP
          ============================================================ */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-cream-warm-faint/20 bg-night/80 px-6 py-4 backdrop-blur md:px-12">
        <Link href="/" className="font-brand text-[12px] tracking-[0.32em] text-cream-warm">
          ITUIKU
        </Link>
        <div className="flex items-center gap-4 text-[10px] tracking-[0.28em] text-cream-warm-muted uppercase md:gap-6">
          <span className="hidden md:inline">
            <span className="text-cream-warm">Dark</span>·ON
          </span>
          <span className="hidden md:inline">Sound·OFF</span>
          <span>
            <span className="text-cream-warm">JA</span>
            <span className="mx-1 opacity-30">/</span>EN
          </span>
        </div>
      </header>

      {/* ============================================================
          01 · HERO
          ============================================================ */}
      <section className="relative px-6 pt-20 pb-32 md:px-12 md:pt-28 md:pb-48">
        <div className="mx-auto max-w-7xl">
          {/* Section index */}
          <div className="flex items-baseline justify-between">
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-muted uppercase">
              01 — Shaping the schedule
            </span>
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase tabular">
              2026
            </span>
          </div>

          <h1 className="font-display mt-14 text-[68px] leading-[0.84] font-bold tracking-[-0.045em] md:mt-20 md:text-[160px]">
            <span className="block">Shaping</span>
            <span className="block text-cream-warm-muted">the</span>
            <span className="block italic font-medium">schedule.</span>
          </h1>

          <div className="mt-12 grid gap-12 md:mt-20 md:grid-cols-[1fr_1fr] md:gap-20 md:items-end">
            <p className="max-w-md font-display text-2xl leading-[1.25] font-medium md:text-[34px]">
              集まる日を、
              <br />
              組み立てる。
            </p>

            <div className="flex flex-col items-start gap-6 md:items-end md:text-right">
              <p className="max-w-sm text-[13px] leading-relaxed text-cream-warm-muted md:text-[14px]">
                候補日に投票して、出席率の高い順に並べる。
                URL ひとつで全員と意思決定を共有できる、ログイン不要のスケジューラ。
              </p>
              <Link
                href="/new"
                data-cursor="hover"
                className="group inline-flex items-center gap-3 border-b border-cream-warm pb-1 text-[13px] tracking-[0.2em] text-cream-warm uppercase transition hover:gap-4"
              >
                <span>Start now</span>
                <svg
                  aria-hidden
                  className="size-3.5 transition-transform group-hover:translate-x-1"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 10h12m-4-5l5 5-5 5" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          AWARD STRIP
          ============================================================ */}
      <div className="border-y border-cream-warm-faint/20 bg-night-soft py-4">
        <Marquee className="text-[10px] uppercase tracking-[0.36em]" slow>
          <span className="text-spark">★</span>
          <span className="text-cream-warm">FWA · Site of the day · pending</span>
          <span aria-hidden className="text-cream-warm-faint">/</span>
          <span className="text-cream-warm-muted">Awwwards · honorable mention</span>
          <span aria-hidden className="text-cream-warm-faint">/</span>
          <span className="text-spark">★</span>
          <span className="text-cream-warm">Tokyo · 東京</span>
          <span aria-hidden className="text-cream-warm-faint">/</span>
          <span className="text-cream-warm-muted">Build for phones · 2026</span>
        </Marquee>
      </div>

      {/* ============================================================
          02 · INTERACTIVE SHOWCASE
          ============================================================ */}
      <section className="relative px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-[1fr_1.1fr] md:items-center md:gap-24">
            {/* Text */}
            <div>
              <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-muted uppercase">
                02 — Showcase
              </span>
              <h2 className="font-display mt-10 text-[40px] leading-[0.95] font-bold tracking-[-0.03em] md:mt-12 md:text-[80px]">
                <span className="italic font-medium text-cream-warm-muted">Quiet</span>
                <br />
                ranking.
              </h2>
              <p className="mt-8 max-w-md text-[14px] leading-relaxed text-cream-warm-muted md:text-[15px]">
                出席率の高い順に並ぶ。3色のスタックバーで、誰がどう答えたかが瞬時に伝わる。
                数字で語る、無駄のないインターフェース。
              </p>
              <div className="mt-12 flex items-center gap-6 text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase">
                <span aria-hidden className="h-px w-12 bg-cream-warm-faint/50" />
                <span>Move cursor · 3D tilt</span>
              </div>
            </div>

            {/* Product preview with mouse tilt */}
            <MouseTilt intensity={5}>
              <div className="relative overflow-hidden rounded-[20px] border border-cream-warm-faint/20 bg-night-soft shadow-pop">
                <div className="flex items-center justify-between border-b border-cream-warm-faint/20 px-5 py-3">
                  <div className="flex items-center gap-1.5">
                    <span aria-hidden className="size-2 rounded-full bg-night-strong" />
                    <span aria-hidden className="size-2 rounded-full bg-night-strong" />
                    <span aria-hidden className="size-2 rounded-full bg-night-strong" />
                  </div>
                  <span className="font-brand text-[9px] tracking-[0.32em] text-cream-warm-faint uppercase">
                    Preview
                  </span>
                </div>

                <div className="p-5 md:p-7">
                  <span className="inline-block border border-cream-warm-faint/30 px-2 py-0.5 text-[9px] tracking-[0.32em] text-cream-warm-muted uppercase">
                    Year-end Dinner
                  </span>

                  <ol className="mt-6 space-y-3">
                    {[
                      { rank: "01", date: "Dec 14 · Fri", pct: 92, o: 11, t: 1, x: 0, winner: true },
                      { rank: "02", date: "Dec 21 · Fri", pct: 75, o: 8, t: 1, x: 3 },
                      { rank: "03", date: "Dec 07 · Fri", pct: 50, o: 5, t: 2, x: 5 },
                    ].map((row) => {
                      const total = row.o + row.t + row.x;
                      return (
                        <li
                          key={row.rank}
                          className={`border-t pt-4 ${
                            row.winner
                              ? "border-cream-warm"
                              : "border-cream-warm-faint/20"
                          }`}
                        >
                          <div className="flex items-baseline justify-between">
                            <div className="flex items-baseline gap-4">
                              <span className="font-brand tabular text-[10px] tracking-[0.3em] text-cream-warm-faint">
                                {row.rank}
                              </span>
                              <span className="font-display text-[16px] font-medium">
                                {row.date}
                              </span>
                              {row.winner && (
                                <span className="text-[9px] tracking-[0.3em] text-spark uppercase">
                                  ● Top
                                </span>
                              )}
                            </div>
                            <span className="font-display tabular text-[28px] font-bold leading-none">
                              {row.pct}
                              <span className="text-[10px] font-normal text-cream-warm-faint">
                                %
                              </span>
                            </span>
                          </div>
                          <div className="mt-3 flex h-px overflow-hidden bg-cream-warm-faint/20">
                            <div
                              style={{
                                width: `${(row.o / total) * 100}%`,
                                backgroundColor: "var(--color-cream-warm)",
                              }}
                            />
                            <div
                              style={{
                                width: `${(row.t / total) * 100}%`,
                                backgroundColor: "var(--color-cream-warm-muted)",
                              }}
                            />
                            <div
                              style={{
                                width: `${(row.x / total) * 100}%`,
                                backgroundColor: "var(--color-cream-warm-faint)",
                              }}
                            />
                          </div>
                          <div className="mt-2 flex gap-4 text-[10px] tabular text-cream-warm-muted">
                            <span>◯ {row.o}</span>
                            <span>· {row.t}</span>
                            <span>× {row.x}</span>
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              </div>
            </MouseTilt>
          </div>
        </div>
      </section>

      {/* ============================================================
          03 · PROCESS — bilingual three gestures
          ============================================================ */}
      <section className="relative border-t border-cream-warm-faint/20 px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between">
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-muted uppercase">
              03 — Process
            </span>
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase tabular">
              03 · steps
            </span>
          </div>

          <h2 className="font-display mt-14 text-[40px] leading-[0.95] font-bold tracking-[-0.03em] md:text-[80px]">
            <span className="italic font-medium text-cream-warm-muted">Three</span>
            <br />
            gestures.
          </h2>

          <div className="mt-20 grid gap-0 border-t border-cream-warm-faint/20 md:grid-cols-3 md:divide-x md:divide-cream-warm-faint/20">
            {[
              {
                n: "01",
                en: "Select",
                jp: "候補日を選ぶ",
                body: "カレンダーから複数候補をまとめてタップ。範囲指定にも対応。",
              },
              {
                n: "02",
                en: "Share",
                jp: "URLを送る",
                body: "ログイン不要のリンクを LINE・SMS・コピペで全員に届ける。",
              },
              {
                n: "03",
                en: "Resolve",
                jp: "結果を読む",
                body: "出席率の高い順に自動ソート。チャートで意思決定を後押し。",
              },
            ].map((s) => (
              <article
                key={s.n}
                className="scroll-enter flex flex-col gap-10 border-b border-cream-warm-faint/20 py-10 md:gap-14 md:border-b-0 md:py-16 md:px-10"
              >
                <span className="font-brand tabular text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase">
                  {s.n}
                </span>
                <h3 className="font-display text-3xl leading-tight tracking-tight md:text-[44px]">
                  <span className="italic font-medium text-cream-warm">
                    {s.en}.
                  </span>
                  <br />
                  <span className="font-normal text-cream-warm-muted">
                    {s.jp}
                  </span>
                </h3>
                <p className="max-w-sm text-[13px] leading-relaxed text-cream-warm-muted md:text-[14px]">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MANIFESTO MARQUEE
          ============================================================ */}
      <div className="border-y border-cream-warm-faint/20 bg-night-soft py-12 md:py-16">
        <Marquee className="font-display text-[56px] font-bold tracking-[-0.03em] md:text-[120px]">
          <span className="italic font-medium text-cream-warm-muted">候補日10件</span>
          <span aria-hidden className="mx-6 text-cream-warm-faint">●</span>
          <span>30秒で答えられる</span>
          <span aria-hidden className="mx-6 text-cream-warm-faint">●</span>
          <span className="italic font-medium text-cream-warm-muted">Decide</span>
          <span aria-hidden className="mx-6 text-cream-warm-faint">●</span>
          <span>tonight</span>
          <span aria-hidden className="mx-6 text-cream-warm-faint">●</span>
        </Marquee>
      </div>

      {/* ============================================================
          04 · PRINCIPLES
          ============================================================ */}
      <section className="relative px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline justify-between">
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-muted uppercase">
              04 — Principles
            </span>
            <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase tabular">
              V · total
            </span>
          </div>

          <div className="mt-16 grid gap-0 border-t border-cream-warm-faint/20 md:grid-cols-2 md:divide-x md:divide-cream-warm-faint/20">
            {[
              {
                n: "I",
                en: "Vote, not navigate.",
                jp: "操作ではなく、投票。",
                body: "30件の候補日も数タップで完結。一括投票・範囲投票で「指が疲れる」を解消。",
              },
              {
                n: "II",
                en: "Phone-first geometry.",
                jp: "スマホ前提の設計。",
                body: "ボタンは指サイズ。safe-area を尊重。片手で完結する縦スクロール。",
              },
              {
                n: "III",
                en: "No identity required.",
                jp: "誰のものでもない。",
                body: "ログインなし。URLを知っている人がそれだけで参加できる。",
              },
              {
                n: "IV",
                en: "Numbers, then names.",
                jp: "数字 → 名前。",
                body: "出席率順に自動ランキング。3色スタックバーで内訳が即時に伝わる。",
              },
              {
                n: "V",
                en: "Doubt is a valid state.",
                jp: "「微妙」も意思。",
                body: "◯ と × の間にある「行けるかも」を、◯ 🤔 × の三段階で素直に表現できる。",
              },
            ].map((p) => (
              <article
                key={p.n}
                className="scroll-enter flex flex-col gap-8 border-b border-cream-warm-faint/20 px-0 py-12 md:px-10 md:py-16"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display tabular text-[64px] font-medium italic leading-none text-cream-warm-faint md:text-[88px]">
                    {p.n}
                  </span>
                  <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-faint uppercase">
                    {p.jp}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-tight md:text-[32px]">
                  <span className="italic">{p.en}</span>
                </h3>
                <p className="max-w-md text-[13px] leading-relaxed text-cream-warm-muted md:text-[14px]">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          05 · CTA
          ============================================================ */}
      <section className="relative border-t border-cream-warm-faint/20 px-6 py-32 md:px-12 md:py-56">
        <div className="mx-auto max-w-5xl text-center">
          <span className="font-brand text-[10px] tracking-[0.32em] text-cream-warm-muted uppercase">
            05 — Begin
          </span>
          <h2 className="font-display mt-12 text-[64px] leading-[0.9] font-bold tracking-[-0.045em] md:text-[160px]">
            <span className="italic font-medium text-cream-warm-muted">Decide</span>
            <br />
            tonight.
          </h2>
          <p className="mt-10 text-[13px] tracking-[0.2em] text-cream-warm-muted uppercase md:text-[14px]">
            無料 · ログイン不要 · 候補日いくつでも
          </p>
          <div className="mt-16 flex justify-center">
            <Link
              href="/new"
              data-cursor="hover"
              className="group inline-flex items-center gap-4 border border-cream-warm px-10 py-5 text-[12px] tracking-[0.32em] text-cream-warm uppercase transition hover:bg-cream-warm hover:text-night md:px-14 md:py-6 md:text-[13px]"
            >
              <span>Create your event</span>
              <svg
                aria-hidden
                className="size-4 transition-transform group-hover:translate-x-1"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 10h12m-4-5l5 5-5 5" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
          ============================================================ */}
      <footer className="border-t border-cream-warm-faint/20 bg-night-soft px-6 py-12 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[28px] leading-tight font-bold tracking-tight md:text-[36px]">
              <span className="italic font-medium text-cream-warm-muted">Ituiku.</span>
            </p>
            <p className="mt-2 text-[11px] tracking-[0.3em] text-cream-warm-faint uppercase">
              Mobile-first scheduling · 2026
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12 text-[11px] tracking-[0.28em] text-cream-warm-muted uppercase md:gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-cream-warm-faint">Pages</span>
              <Link href="/" data-cursor="hover" className="hover:text-cream-warm">
                Home
              </Link>
              <Link href="/new" data-cursor="hover" className="hover:text-cream-warm">
                Create
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-cream-warm-faint">Source</span>
              <a
                href="https://github.com/Sol-momma/votest"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="hover:text-cream-warm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-cream-warm-faint/20 pt-6 text-[10px] tracking-[0.3em] text-cream-warm-faint uppercase">
          <span>© Ituiku</span>
          <span>JA / EN</span>
        </div>
      </footer>
    </div>
  );
}
