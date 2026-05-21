import Link from "next/link";
import { MouseTilt } from "@/components/MouseTilt";

export default function Home() {
  return (
    <main className="relative bg-paper text-ink">
      {/* ════════════════════════════════════════════════════════
          TOP META BAR  ―  情報帯
          ════════════════════════════════════════════════════════ */}
      <div className="border-b border-line px-6 py-3 md:px-12">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[10px] tracking-[0.32em] text-ink-faint">
          <span className="uppercase">Ituiku · Schedule for Phones</span>
          <span className="tabular">東京・二〇二六</span>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          壱 ―  HERO
          ════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-line px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-[14px] font-medium text-ink">壱</span>
            <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              Beginning
            </span>
          </div>

          <h1 className="text-jp-display font-display mt-14 text-[64px] leading-[0.94] font-bold tracking-[-0.045em] text-ink md:mt-20 md:text-[148px]">
            集まる日を、
            <br />
            <span className="text-ink-muted">投票で</span>
            <br />
            決める。
          </h1>

          <div className="mt-16 grid gap-12 md:mt-24 md:grid-cols-[1.1fr_1fr] md:items-end md:gap-20">
            <p className="leading-jp max-w-md text-[15px] text-ink md:text-[16px]">
              候補日を共有し、◯ 🤔 × で投票するだけ。
              <br />
              出席率の高い順に並んだ結果が、
              <span className="text-ink-muted">URLひとつで全員に届く</span>。
            </p>

            <div className="flex flex-col items-start gap-6 md:items-end">
              <Link
                href="/new"
                className="group inline-flex items-baseline gap-3 text-[16px] text-ink md:text-[17px]"
              >
                <span className="border-b border-accent pb-0.5 text-accent transition group-hover:tracking-wider">
                  いま、はじめる
                </span>
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-1 text-accent"
                >
                  →
                </span>
              </Link>
              <span className="text-[11px] tracking-[0.24em] text-ink-faint uppercase">
                Free · No sign-up
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          弐 ―  SHOWCASE  / 製品プレビュー
          ════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-line bg-paper-cream px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-[14px] font-medium text-ink">弐</span>
            <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              Showcase
            </span>
          </div>

          <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-[1fr_1.15fr] md:items-center md:gap-24">
            <div className="md:order-2">
              <MouseTilt intensity={4}>
                <article className="overflow-hidden border border-line bg-paper">
                  <header className="flex items-baseline justify-between border-b border-line px-5 py-3">
                    <span className="tabular text-[10px] tracking-[0.3em] text-ink-faint uppercase">
                      Result · 結果
                    </span>
                    <span className="text-[10px] text-ink-faint">8名 / 投票</span>
                  </header>

                  <div className="px-5 py-6 md:px-7 md:py-8">
                    <h3 className="font-display text-[18px] font-bold tracking-tight text-ink md:text-xl">
                      年末ご飯会
                    </h3>
                    <p className="mt-1 text-[11px] tracking-[0.2em] text-ink-faint uppercase">
                      Year-end Dinner
                    </p>

                    <ol className="mt-6 divide-y divide-line border-t border-line">
                      {[
                        { rank: "一", date: "12月14日 ・ 金", pct: 92, o: 7, t: 1, x: 0, winner: true },
                        { rank: "二", date: "12月21日 ・ 金", pct: 75, o: 5, t: 1, x: 2 },
                        { rank: "三", date: "12月07日 ・ 金", pct: 50, o: 3, t: 2, x: 3 },
                      ].map((row) => {
                        const total = row.o + row.t + row.x;
                        return (
                          <li key={row.rank} className="py-4">
                            <div className="flex items-baseline justify-between gap-4">
                              <div className="flex items-baseline gap-3">
                                <span className="font-display text-[14px] font-medium text-ink-muted">
                                  {row.rank}
                                </span>
                                <span className="font-display text-[14px] font-bold text-ink">
                                  {row.date}
                                </span>
                                {row.winner && (
                                  <span className="text-[9px] tracking-[0.3em] text-accent uppercase">
                                    Top
                                  </span>
                                )}
                              </div>
                              <span className="tabular font-display text-[24px] font-bold leading-none text-ink">
                                {row.pct}
                                <span className="text-[10px] font-normal text-ink-faint">%</span>
                              </span>
                            </div>
                            <div className="mt-3 flex h-px overflow-hidden bg-line">
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
                                  backgroundColor: "var(--color-ink-faint)",
                                }}
                              />
                            </div>
                            <div className="mt-2 flex gap-4 text-[10px] tabular text-ink-muted">
                              <span>◯ {row.o}</span>
                              <span>· {row.t}</span>
                              <span>× {row.x}</span>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </article>
              </MouseTilt>

              <p className="mt-5 px-2 text-[10px] tracking-[0.3em] text-ink-faint uppercase">
                カーソルを動かしてください
              </p>
            </div>

            <div className="md:order-1">
              <h2 className="text-jp-display font-display text-[40px] leading-[1.05] font-bold tracking-[-0.035em] text-ink md:text-[72px]">
                みんなの予定を、
                <br />
                <span className="text-ink-muted">一枚に。</span>
              </h2>
              <p className="leading-jp mt-8 max-w-sm text-[14px] text-ink md:mt-10 md:text-[15px]">
                出席率の高い順に並ぶ。
                <br />
                ◯（行ける） 🤔（迷う） ×（行けない）の三段階を、
                細い三色のバーで示します。
                <br />
                <span className="text-ink-muted">
                  誰がどう答えたか、計算なしで読み取れます。
                </span>
              </p>

              {/* Vertical accent text - 縦書き */}
              <div className="mt-12 flex items-center gap-6">
                <span aria-hidden className="h-px w-12 bg-line-strong" />
                <span className="tate text-[10px] tracking-[0.4em] text-ink-faint leading-jp-tight">
                  三色のバーで読む
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          参 ―  PROCESS / 三つの所作
          ════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-line px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-[14px] font-medium text-ink">参</span>
            <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              Process
            </span>
          </div>

          <h2 className="text-jp-display font-display mt-14 text-[44px] leading-[0.95] font-bold tracking-[-0.04em] text-ink md:mt-20 md:text-[88px]">
            みっつの所作で、
            <br />
            <span className="text-ink-muted">日付が決まる。</span>
          </h2>

          <div className="mt-20 grid border-t border-line md:mt-28 md:grid-cols-3 md:divide-x md:divide-line">
            {[
              {
                num: "壱",
                ja: "選ぶ",
                en: "Select",
                body: "カレンダーから複数の候補日をまとめてタップ。範囲指定にも対応します。",
              },
              {
                num: "弐",
                ja: "送る",
                en: "Share",
                body: "ログイン不要のリンクを LINE・SMS・コピペで全員に届けます。",
              },
              {
                num: "参",
                ja: "決まる",
                en: "Resolve",
                body: "出席率の高い順に自動で並び替え。一目で決まります。",
              },
            ].map((s) => (
              <article
                key={s.num}
                className="scroll-enter flex flex-col gap-10 border-b border-line py-10 md:gap-16 md:border-b-0 md:px-12 md:py-16"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-display text-[88px] font-medium leading-none text-ink md:text-[120px]">
                    {s.num}
                  </span>
                  <span className="font-brand text-[10px] tracking-[0.32em] text-ink-faint uppercase">
                    {s.en}
                  </span>
                </div>
                <div>
                  <h3 className="text-jp-display font-display text-[28px] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[34px]">
                    {s.ja}。
                  </h3>
                  <p className="leading-jp mt-5 max-w-sm text-[13px] text-ink md:text-[14px]">
                    {s.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          肆 ―  MANIFESTO / 言葉
          ════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-line bg-paper-cream px-6 py-32 md:px-12 md:py-56">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-6">
              <span className="font-display text-[14px] font-medium text-ink">肆</span>
              <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
              <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
                Words
              </span>
            </div>
          </div>

          <blockquote className="scroll-enter mt-20 md:mt-28">
            <div className="relative">
              <span
                aria-hidden
                className="font-display absolute -top-8 -left-2 text-[80px] font-bold leading-none text-ink-faint md:-top-12 md:-left-4 md:text-[140px]"
              >
                「
              </span>
              <p className="text-jp-display font-display text-[34px] leading-[1.4] font-bold tracking-[-0.025em] text-ink md:text-[64px]">
                候補日が、
                <br />
                <span className="text-ink-muted">十でも、二十でも。</span>
                <br />
                決まる時間は、
                <br />
                <span className="text-ink-muted">変わらない。</span>
              </p>
              <span
                aria-hidden
                className="font-display absolute -bottom-8 -right-2 text-[80px] font-bold leading-none text-ink-faint md:-bottom-12 md:-right-4 md:text-[140px]"
              >
                」
              </span>
            </div>

            <footer className="mt-16 flex items-center gap-4 md:mt-20">
              <span aria-hidden className="h-px w-16 bg-line-strong" />
              <span className="font-brand text-[10px] tracking-[0.3em] text-ink-faint uppercase">
                — The Principle
              </span>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          伍 ―  PRINCIPLES / 五つの原則
          ════════════════════════════════════════════════════════ */}
      <section className="relative border-b border-line px-6 py-24 md:px-12 md:py-40">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-[14px] font-medium text-ink">伍</span>
            <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              Principles
            </span>
          </div>

          <div className="mt-14 flex items-baseline justify-between md:mt-20">
            <h2 className="text-jp-display font-display text-[40px] leading-tight font-bold tracking-[-0.04em] text-ink md:text-[80px]">
              五つの原則。
            </h2>
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-faint uppercase tabular">
              五 / 伍
            </span>
          </div>

          <ol className="mt-20 border-t border-line md:mt-28">
            {[
              {
                num: "一",
                ja: "操作ではなく、投票。",
                en: "Vote, not navigate",
                body: "30件の候補日も数タップで完結。一括投票・範囲投票で「指が疲れる」を解消する。",
              },
              {
                num: "二",
                ja: "スマホ前提の設計。",
                en: "Phone-first geometry",
                body: "ボタンは指サイズ、safe-area を尊重。片手で完結する縦スクロール。",
              },
              {
                num: "三",
                ja: "誰のものでもない。",
                en: "No identity required",
                body: "ログインなし。URLを知っている人が、それだけで参加できる。",
              },
              {
                num: "四",
                ja: "数字を、名前に。",
                en: "Numbers, then names",
                body: "出席率順に自動ランキング。三色のスタックバーで内訳が瞬時に伝わる。",
              },
              {
                num: "五",
                ja: "「微妙」も意思。",
                en: "Doubt is a valid state",
                body: "◯ と × の間にある「行けるかも」を、◯ 🤔 × の三段階で素直に表現できる。",
              },
            ].map((p) => (
              <li
                key={p.num}
                className="scroll-enter grid gap-6 border-b border-line py-10 md:grid-cols-[80px_1fr_2fr] md:items-baseline md:gap-12 md:py-14"
              >
                <span className="font-display text-[44px] font-medium leading-none text-ink md:text-[56px]">
                  {p.num}
                </span>
                <div>
                  <h3 className="text-jp-display font-display text-[20px] font-bold leading-tight tracking-[-0.03em] text-ink md:text-[26px]">
                    {p.ja}
                  </h3>
                  <p className="font-brand mt-2 text-[10px] tracking-[0.32em] text-ink-faint uppercase">
                    {p.en}
                  </p>
                </div>
                <p className="leading-jp text-[13px] text-ink md:text-[14px]">
                  {p.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          終 ―  CTA
          ════════════════════════════════════════════════════════ */}
      <section className="relative px-6 py-32 md:px-12 md:py-56">
        <div className="mx-auto max-w-5xl">
          <div className="flex items-baseline gap-6">
            <span className="font-display text-[14px] font-medium text-ink">終</span>
            <span aria-hidden className="h-px w-16 bg-line-strong md:w-24" />
            <span className="font-brand text-[10px] tracking-[0.32em] text-ink-muted uppercase">
              Begin
            </span>
          </div>

          <h2 className="text-jp-display font-display mt-14 text-[56px] leading-[0.95] font-bold tracking-[-0.045em] text-ink md:mt-20 md:text-[140px]">
            さあ、
            <br />
            <span className="text-ink-muted">決めましょう。</span>
          </h2>

          <p className="leading-jp mt-10 text-[14px] text-ink md:mt-12 md:text-[15px]">
            無料 · 登録不要 · 候補日いくつでも
          </p>

          <div className="mt-16 md:mt-20">
            <Link
              href="/new"
              className="group inline-flex items-baseline gap-4 border-b border-ink pb-2 text-[18px] font-medium text-ink transition hover:gap-5 md:text-[22px]"
            >
              <span>イベントをつくる</span>
              <span aria-hidden className="text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════════════════ */}
      <footer className="border-t border-line px-6 py-10 md:px-12">
        <div className="mx-auto flex max-w-7xl items-baseline justify-between text-[10px] tracking-[0.3em] text-ink-faint uppercase">
          <span>© Ituiku</span>
          <span className="tabular">東京・二〇二六</span>
        </div>
      </footer>
    </main>
  );
}
