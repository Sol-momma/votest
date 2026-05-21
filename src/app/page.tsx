import Link from "next/link";
import { MouseTilt } from "@/components/MouseTilt";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* ════════════════════════════════════════════════════════
          ふんわり水色グラデ背景
          ════════════════════════════════════════════════════════ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #E8F1FB 0%, #F3F7FC 35%, #FBFBFA 70%, #FFFFFF 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 left-1/2 -z-10 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-accent-soft/60 blur-[120px]"
      />

      {/* ════════════════════════════════════════════════════════
          HERO  ―  中央集約
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pt-12 pb-20 text-center md:px-12 md:pt-20 md:pb-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center">
          {/* App logo card */}
          <div
            className="relative animate-fade-up flex size-20 items-center justify-center rounded-[22px] bg-accent text-white shadow-pop md:size-24"
            style={{
              boxShadow:
                "0 12px 32px -8px rgba(46, 117, 204, 0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
            }}
          >
            <span aria-hidden className="text-[44px] leading-none md:text-[52px]">
              📅
            </span>
          </div>

          <h1
            className="animate-fade-up font-display mt-7 text-[44px] leading-[1] font-bold tracking-[-0.04em] text-ink md:text-[64px]"
            style={{ animationDelay: "60ms" }}
          >
            いついく
            <span className="text-accent">？</span>
          </h1>

          <p
            className="animate-fade-up mt-5 max-w-md text-[18px] leading-[1.55] font-bold text-ink md:mt-6 md:text-[22px]"
            style={{ animationDelay: "120ms" }}
          >
            候補日が
            <span className="text-accent">10件</span>
            でも、
            <br className="md:hidden" />
            答えるのは
            <span className="text-accent">30秒</span>
            。
          </p>
          <p
            className="animate-fade-up mt-3 max-w-md text-[13px] leading-relaxed text-ink-muted md:text-[14px]"
            style={{ animationDelay: "150ms" }}
          >
            一括投票・範囲投票で、たくさんの候補日もサクッと。
            <br />
            投票結果は出席率順に自動で並びます。
          </p>

          {/* Annotation pointer */}
          <div
            className="animate-fade-up relative mt-12 mb-2"
            style={{ animationDelay: "180ms" }}
          >
            <p className="text-[14px] font-bold text-accent md:text-[15px]">
              <span className="text-ink">候補日いくつあっても</span>サクサク投票！
            </p>
            <svg
              aria-hidden
              className="absolute -bottom-9 left-1/2 -translate-x-1/2 text-accent"
              width="40"
              height="44"
              viewBox="0 0 40 44"
              fill="none"
            >
              <path
                d="M20 2 C 22 14, 12 22, 20 34"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M14 28 L 20 36 L 26 28"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRODUCT PREVIEW  ―  デモカード
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-2xl">
          <MouseTilt intensity={3}>
            <div
              className="relative overflow-hidden rounded-[24px] border border-line bg-paper p-5 md:p-7"
              style={{
                boxShadow:
                  "0 1px 0 rgba(255,255,255,0.6) inset, 0 24px 60px -16px rgba(15, 23, 42, 0.18), 0 8px 24px -8px rgba(15, 23, 42, 0.08)",
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-tag-green-bg px-2.5 py-1 text-[11px] font-bold text-tag-green-text">
                    <span aria-hidden className="size-1.5 animate-pulse rounded-full bg-tag-green-text" />
                    投票受付中
                  </span>
                  <span className="text-[11px] text-ink-faint">8名が投票</span>
                </div>
                <span className="text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                  Demo
                </span>
              </div>

              <h3 className="font-display mt-4 text-[20px] font-bold text-ink md:text-2xl">
                卒業祝いごはん🌸
              </h3>

              <ol className="mt-5 space-y-2.5">
                {[
                  { rank: "🏆", date: "6/15(土)", pct: 92, o: 7, t: 1, x: 0, winner: true },
                  { rank: "2", date: "6/16(日)", pct: 75, o: 6, t: 0, x: 2 },
                  { rank: "3", date: "6/14(金)", pct: 50, o: 3, t: 2, x: 3 },
                ].map((row) => {
                  const total = row.o + row.t + row.x;
                  return (
                    <li
                      key={row.date}
                      className={`rounded-2xl border p-3.5 md:p-4 ${
                        row.winner
                          ? "border-accent/40 bg-accent-soft/30"
                          : "border-line bg-paper"
                      }`}
                    >
                      <div className="flex items-baseline justify-between">
                        <div className="flex items-baseline gap-2.5">
                          <span className={`text-[14px] font-bold ${row.winner ? "" : "text-ink-faint"}`}>
                            {row.rank}{!row.winner && "位"}
                          </span>
                          <span className="font-display text-[15px] font-bold text-ink md:text-base">
                            {row.date}
                          </span>
                        </div>
                        <span className={`tabular font-display text-[22px] font-bold leading-none md:text-[26px] ${row.winner ? "text-accent" : "text-ink-soft"}`}>
                          {row.pct}
                          <span className="text-[11px] font-normal text-ink-muted">%</span>
                        </span>
                      </div>
                      {/* Stacked bar */}
                      <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-paper-shade">
                        <div
                          className="transition-[width] duration-700"
                          style={{
                            width: `${(row.o / total) * 100}%`,
                            backgroundColor: "var(--color-tag-green-text)",
                          }}
                        />
                        <div
                          className="transition-[width] duration-700"
                          style={{
                            width: `${(row.t / total) * 100}%`,
                            backgroundColor: "var(--color-tag-yellow-text)",
                          }}
                        />
                        <div
                          className="transition-[width] duration-700"
                          style={{
                            width: `${(row.x / total) * 100}%`,
                            backgroundColor: "var(--color-tag-red-text)",
                          }}
                        />
                      </div>
                      <div className="mt-2 flex gap-1.5">
                        <span className="tag tag-green tabular">◯ {row.o}</span>
                        <span className="tag tag-yellow tabular">🤔 {row.t}</span>
                        <span className="tag tag-red tabular">× {row.x}</span>
                      </div>
                    </li>
                  );
                })}
              </ol>

              <p className="mt-4 text-center text-[10px] tracking-[0.2em] text-ink-faint uppercase">
                ↑ カーソルを動かしてみてください
              </p>
            </div>
          </MouseTilt>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          SPEED COMPARISON  ―  他より速いを見せる
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pb-20 md:px-12 md:pb-28">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-[24px] border border-line bg-paper p-7 md:p-10">
            <div className="text-center">
              <span className="font-brand text-[11px] tracking-[0.3em] text-ink-muted uppercase">
                Speed Comparison
              </span>
              <h2 className="font-display mt-3 text-[26px] leading-tight font-bold tracking-tight text-ink md:text-[36px]">
                候補日10件を答えるのに、
                <br className="md:hidden" />
                いくつタップする？
              </h2>
            </div>

            <div className="mt-10 grid gap-3 md:grid-cols-2 md:gap-4">
              {/* 他のサービス */}
              <div className="rounded-2xl border border-line bg-paper-cream p-6 md:p-7">
                <p className="text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                  他のサービス
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display tabular text-[64px] font-bold leading-none text-ink-muted md:text-[80px]">
                    10
                  </span>
                  <span className="text-[16px] font-bold text-ink-muted">タップ</span>
                </div>
                <div className="mt-4 grid grid-cols-10 gap-1">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className="h-3 rounded bg-ink-faint/40" />
                  ))}
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                  1日ずつ ◯ × をタップしていく必要があります。
                </p>
              </div>

              {/* いついく？ */}
              <div className="rounded-2xl border-2 border-accent bg-accent-soft/30 p-6 md:p-7">
                <p className="text-[11px] tracking-[0.2em] text-accent uppercase font-bold">
                  ✨ いついく？
                </p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display tabular text-[64px] font-bold leading-none text-accent md:text-[80px]">
                    2
                  </span>
                  <span className="text-[16px] font-bold text-accent">タップ</span>
                </div>
                <div className="mt-4 grid grid-cols-10 gap-1">
                  {Array.from({ length: 2 }).map((_, i) => (
                    <div key={i} className="h-3 rounded bg-accent" />
                  ))}
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-3 rounded bg-paper" />
                  ))}
                </div>
                <p className="mt-4 text-[12px] leading-relaxed text-ink md:text-[13px]">
                  「全部◯」→ 行けない日だけ ×。それで完了。
                </p>
              </div>
            </div>

            <p className="mt-8 text-center text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
              候補日が
              <span className="font-bold text-ink">30件あっても、50件あっても</span>
              、答え方は同じ。
              <br className="md:hidden" />
              <span className="font-bold text-accent">範囲投票</span>
              でさらに速く。
            </p>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PRIMARY CTA
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 pb-20 text-center md:px-12 md:pb-28">
        <div className="mx-auto max-w-md">
          <Link
            href="/new"
            className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-accent text-[16px] font-bold text-paper shadow-pop transition hover:scale-[1.02] hover:bg-accent-strong active:scale-[0.98] md:text-[17px]"
            style={{
              boxShadow:
                "0 12px 32px -8px rgba(46, 117, 204, 0.45), 0 4px 12px -4px rgba(46, 117, 204, 0.3)",
            }}
          >
            無料ではじめる
            <svg
              aria-hidden
              className="size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12m-4-4l4 4-4 4" />
            </svg>
          </Link>
          <p className="mt-3 text-[12px] text-ink-faint">
            アカウント登録不要 ・ クレジットカード不要
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FEATURE CARDS  ―  サービスの特徴
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-paper px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-brand text-[11px] tracking-[0.3em] text-ink-muted uppercase">
              Features
            </span>
            <h2 className="font-display mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[40px]">
              候補日が多くても、
              <br className="md:hidden" />
              ラクに決まる仕掛け。
            </h2>
          </div>

          <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
            {/* Card 1: 出席率自動集計 */}
            <article className="scroll-enter group relative overflow-hidden rounded-[24px] bg-tag-blue-bg/40 p-7 transition hover:bg-tag-blue-bg/60 md:p-9">
              <div className="relative">
                {/* Mini chart illustration */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <span className="font-display tabular text-[11px] font-bold text-ink">6/15</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper">
                      <div className="h-full w-[92%] rounded-full bg-tag-green-text" />
                    </div>
                    <span className="font-display tabular text-[12px] font-bold text-tag-green-text">92%</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-70">
                    <span className="font-display tabular text-[11px] font-bold text-ink">6/16</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper">
                      <div className="h-full w-[65%] rounded-full bg-ink-muted" />
                    </div>
                    <span className="font-display tabular text-[12px] font-bold text-ink-muted">65%</span>
                  </div>
                  <div className="flex items-center gap-2 opacity-50">
                    <span className="font-display tabular text-[11px] font-bold text-ink">6/14</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-paper">
                      <div className="h-full w-[40%] rounded-full bg-ink-faint" />
                    </div>
                    <span className="font-display tabular text-[12px] font-bold text-ink-faint">40%</span>
                  </div>
                </div>

                <h3 className="font-display mt-7 text-[20px] font-bold text-ink md:text-[22px]">
                  出席率順に自動集計
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
                  ◯ × の数を見て頭で計算する必要なし。1位の日が一目でわかります。
                </p>
              </div>
            </article>

            {/* Card 2: 三段階投票 */}
            <article className="scroll-enter group relative overflow-hidden rounded-[24px] bg-tag-yellow-bg/40 p-7 transition hover:bg-tag-yellow-bg/60 md:p-9">
              <div className="relative">
                {/* 3 vote buttons illustration */}
                <div className="flex gap-2">
                  <div className="flex h-14 flex-1 flex-col items-center justify-center rounded-2xl bg-tag-green-bg shadow-sm">
                    <span className="text-xl leading-none">◯</span>
                    <span className="mt-0.5 text-[10px] font-bold text-tag-green-text">OK</span>
                  </div>
                  <div className="flex h-14 flex-1 flex-col items-center justify-center rounded-2xl bg-tag-yellow-bg shadow-sm">
                    <span className="text-xl leading-none">🤔</span>
                    <span className="mt-0.5 text-[10px] font-bold text-tag-yellow-text">微妙</span>
                  </div>
                  <div className="flex h-14 flex-1 flex-col items-center justify-center rounded-2xl bg-tag-red-bg shadow-sm">
                    <span className="text-xl leading-none">×</span>
                    <span className="mt-0.5 text-[10px] font-bold text-tag-red-text">NG</span>
                  </div>
                </div>

                <h3 className="font-display mt-7 text-[20px] font-bold text-ink md:text-[22px]">
                  「微妙」も投票できる
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
                  ◯ と × の間にある「行けるかも」を、◯ 🤔 × の3段階で素直に表現できます。
                </p>
              </div>
            </article>

            {/* Card 3: 一括・範囲投票 */}
            <article className="scroll-enter group relative overflow-hidden rounded-[24px] bg-tag-green-bg/40 p-7 transition hover:bg-tag-green-bg/60 md:p-9">
              <div className="relative">
                {/* Calendar grid illustration with range */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: 21 }).map((_, i) => {
                    const inRange = i >= 8 && i <= 13;
                    const isStart = i === 8;
                    const isEnd = i === 13;
                    return (
                      <div
                        key={i}
                        className={`flex h-7 items-center justify-center text-[10px] font-bold ${
                          inRange
                            ? "bg-accent text-paper"
                            : "bg-paper text-ink-muted"
                        } ${isStart ? "rounded-l-md" : ""} ${isEnd ? "rounded-r-md" : ""}`}
                      >
                        {i + 1}
                      </div>
                    );
                  })}
                </div>

                <h3 className="font-display mt-7 text-[20px] font-bold text-ink md:text-[22px]">
                  範囲投票で爆速
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
                  候補日が30件あっても、始点と終点をタップすれば一気に投票できます。
                </p>
              </div>
            </article>

            {/* Card 4: URL共有・LINE */}
            <article className="scroll-enter group relative overflow-hidden rounded-[24px] bg-tag-purple-bg/40 p-7 transition hover:bg-tag-purple-bg/60 md:p-9">
              <div className="relative">
                {/* URL + LINE buttons illustration */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2 rounded-xl border border-line bg-paper px-3 py-2">
                    <svg aria-hidden className="size-3.5 text-ink-faint" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12.5a3 3 0 004.24 0l2-2a3 3 0 10-4.24-4.24l-1 1m1.24 4.24a3 3 0 01-4.24 0l-2-2a3 3 0 014.24-4.24l1 1" />
                    </svg>
                    <span className="font-display tabular text-[11px] text-ink-muted">ituiku.app/event/...</span>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="flex h-10 items-center justify-center gap-1.5 rounded-xl text-[12px] font-bold text-paper shadow-sm"
                    style={{ backgroundColor: "#06C755" }}
                  >
                    <svg aria-hidden className="size-3.5 fill-paper" viewBox="0 0 20 20">
                      <path d="M10 2C5.03 2 1 5.36 1 9.5c0 3.7 3.27 6.8 7.7 7.4.3.07.7.21.8.48.09.25.06.63.03.88l-.13.78c-.04.23-.18.9.79.49.97-.41 5.25-3.1 7.16-5.3C18.62 12.84 19 11.22 19 9.5 19 5.36 14.97 2 10 2z" />
                    </svg>
                    LINEで送る
                  </button>
                </div>

                <h3 className="font-display mt-7 text-[20px] font-bold text-ink md:text-[22px]">
                  LINEで一発シェア
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
                  URLを送るだけ。受け取った人はログインなしですぐ投票できます。
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          HOW IT WORKS  ―  使い方（3ステップ）
          ════════════════════════════════════════════════════════ */}
      <section className="relative bg-paper-cream px-6 py-20 md:px-12 md:py-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <span className="font-brand text-[11px] tracking-[0.3em] text-ink-muted uppercase">
              How it works
            </span>
            <h2 className="font-display mt-3 text-[28px] leading-tight font-bold tracking-tight text-ink md:text-[40px]">
              3ステップで集まる日が決まる
            </h2>
          </div>

          <ol className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3 md:gap-8">
            {[
              {
                num: "01",
                title: "候補日を選ぶ",
                body: "カレンダーから候補日を複数タップ。範囲選択でも一気に追加できます。",
                icon: (
                  <svg className="size-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18M8 3v4M16 3v4M9 14l2 2 4-4" />
                  </svg>
                ),
              },
              {
                num: "02",
                title: "URLを送る",
                body: "LINE・SMS・メールで参加者にリンクを共有。ログイン不要で投票できます。",
                icon: (
                  <svg className="size-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1" />
                  </svg>
                ),
              },
              {
                num: "03",
                title: "結果を見る",
                body: "出席率の高い順に自動ランキング。3色のグラフで内訳が一目でわかります。",
                icon: (
                  <svg className="size-7 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 3v18h18M8 17V9M13 17V5M18 17v-4" />
                  </svg>
                ),
              },
            ].map((s) => (
              <li
                key={s.num}
                className="scroll-enter rounded-[20px] border border-line bg-paper p-6 md:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-accent-soft">
                    {s.icon}
                  </span>
                  <span className="font-display tabular text-[14px] font-bold text-ink-faint">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display mt-5 text-[18px] font-bold text-ink md:text-[20px]">
                  {s.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink-soft md:text-[14px]">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FINAL CTA  ―  もう一度
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-24 text-center md:px-12 md:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-80 bg-gradient-to-b from-accent-soft/50 to-transparent"
        />
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-[32px] leading-tight font-bold tracking-tight text-ink md:text-[48px]">
            候補日いっぱい？
            <br />
            <span className="text-accent">大丈夫、30秒。</span>
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-ink-soft md:text-[16px]">
            10件でも30件でも、答えやすさは変わりません。
            <br />
            まずは1イベント作ってみてください。
          </p>

          <Link
            href="/new"
            className="mt-10 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-accent px-10 text-[16px] font-bold text-paper transition hover:scale-[1.03] hover:bg-accent-strong active:scale-[0.98] md:mt-12"
            style={{
              boxShadow:
                "0 12px 32px -8px rgba(46, 117, 204, 0.45), 0 4px 12px -4px rgba(46, 117, 204, 0.3)",
            }}
          >
            無料ではじめる
            <svg
              aria-hidden
              className="size-4"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 10h12m-4-4l4 4-4 4" />
            </svg>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-line bg-paper px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] text-ink-faint">
          <span>© いついく？</span>
          <span>スマホで日程調整 · 2026</span>
        </div>
      </footer>
    </main>
  );
}
