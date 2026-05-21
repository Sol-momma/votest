import Link from "next/link";

export default function Home() {
  return (
    <main className="relative mx-auto min-h-dvh max-w-md overflow-hidden px-6 pb-32 pt-6 md:max-w-5xl md:px-10 md:pb-20">
      {/* Decorative pastel blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-tag-blue-bg blur-3xl opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-40 -left-20 h-60 w-60 rounded-full bg-tag-yellow-bg blur-3xl opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-96 right-10 h-72 w-72 rounded-full bg-tag-green-bg blur-3xl opacity-40"
      />

      {/* Hero */}
      <section className="relative">
        {/* Floating decorative emojis with parallax */}
        <span
          aria-hidden
          className="animate-float-a scroll-parallax-slow absolute -top-2 right-2 inline-block text-3xl md:text-4xl"
        >
          🎉
        </span>
        <span
          aria-hidden
          className="animate-float-b scroll-parallax-mid absolute top-24 left-0 inline-block text-2xl md:text-3xl"
          style={{ animationDelay: "0.6s" }}
        >
          🍣
        </span>
        <span
          aria-hidden
          className="animate-float-c scroll-parallax-fast absolute top-10 right-1/3 hidden text-3xl md:inline-block md:text-4xl"
          style={{ animationDelay: "1.2s" }}
        >
          ⭐
        </span>
        <span
          aria-hidden
          className="animate-float-a scroll-parallax-mid absolute top-40 right-4 hidden text-2xl md:inline-block md:text-3xl"
          style={{ animationDelay: "1.8s" }}
        >
          🍰
        </span>

        <div className="relative animate-fade-up">
          <span
            aria-hidden
            className="inline-block rounded-full bg-paper px-3 py-1 text-[11px] font-bold tracking-wider text-ink-muted shadow-sm border border-line"
          >
            👋 ようこそ
          </span>
        </div>

        <h1
          className="animate-fade-up font-display relative mt-5 text-[44px] leading-[1.05] font-bold text-ink md:text-[64px]"
          style={{ animationDelay: "60ms" }}
        >
          <span className="relative inline-block">
            いつ集まる
            <span className="text-accent">？</span>
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">投票で決める。</span>
            <span
              aria-hidden
              className="absolute bottom-1 left-0 -z-0 h-3 w-full rounded-sm bg-tag-yellow-bg md:h-4"
            />
          </span>
        </h1>

        <p
          className="animate-fade-up relative mt-5 text-[15px] leading-relaxed text-ink-muted md:text-base"
          style={{ animationDelay: "140ms" }}
        >
          ログインなし、URLを送るだけ。候補日に
          <span className="mx-1 tag tag-green">◯</span>
          <span className="mr-1 tag tag-yellow">🤔</span>
          <span className="tag tag-red">×</span>
          を投票して、出席率の高い順に自動集計。
        </p>
      </section>

      {/* 3D rotating cube — vote marks */}
      <section className="relative mt-14 md:mt-20">
        <div className="scroll-enter flex flex-col items-center">
          <p className="font-brand text-[10px] tracking-widest text-ink-muted uppercase">
            How it works
          </p>
          <p className="font-display mt-2 text-center text-[14px] text-ink-muted md:text-[15px]">
            候補日に <span className="font-bold text-ink">◯ 🤔 ×</span> を投票。
            <br />
            集まる日が一目で決まる。
          </p>
        </div>

        <div className="cube-perspective scroll-cube-spin mx-auto mt-10 size-32 md:scale-125">
          <div className="cube-3d mx-auto size-full">
            {/* 6 faces */}
            <div
              className="cube-face border border-line bg-tag-green-bg text-[64px] md:text-[80px]"
              style={{ transform: "translateZ(64px)" }}
            >
              ◯
            </div>
            <div
              className="cube-face border border-line bg-tag-yellow-bg text-[56px] md:text-[72px]"
              style={{ transform: "rotateY(90deg) translateZ(64px)" }}
            >
              🤔
            </div>
            <div
              className="cube-face border border-line bg-tag-red-bg text-[64px] md:text-[80px]"
              style={{ transform: "rotateY(180deg) translateZ(64px)" }}
            >
              ×
            </div>
            <div
              className="cube-face border border-line bg-tag-blue-bg text-[56px] md:text-[72px]"
              style={{ transform: "rotateY(-90deg) translateZ(64px)" }}
            >
              📅
            </div>
            <div
              className="cube-face border border-line bg-tag-orange-bg text-[56px] md:text-[72px]"
              style={{ transform: "rotateX(90deg) translateZ(64px)" }}
            >
              🏆
            </div>
            <div
              className="cube-face border border-line bg-tag-purple-bg text-[56px] md:text-[72px]"
              style={{ transform: "rotateX(-90deg) translateZ(64px)" }}
            >
              🎉
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-[11px] text-ink-faint md:text-[12px]">
          ↓ スクロールでさらに回る
        </p>
      </section>

      {/* Sample event preview — fake card */}
      <section
        className="scroll-enter-rotate relative mt-14 md:mt-20"
        style={{ animationDelay: "220ms" }}
      >
        <div className="relative">
          {/* Decorative emoji on top of card */}
          <span
            aria-hidden
            className="animate-float-b absolute -top-4 right-6 z-10 text-2xl"
          >
            ✨
          </span>

          <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-5 shadow-card md:p-7">
            {/* Card header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="tag tag-green">投票受付中</span>
                <span className="text-[12px] text-ink-muted">
                  <span className="font-bold text-ink">8</span>名が投票
                </span>
              </div>
              <span className="text-[10px] tracking-wider text-ink-faint uppercase">
                Sample
              </span>
            </div>
            <h2 className="font-display mt-2 text-xl font-bold text-ink md:text-2xl">
              卒業祝いごはん🌸
            </h2>

            {/* Sample ranking entries */}
            <ol className="mt-5 space-y-3">
              {[
                { rank: "🏆", date: "6/15(土)", pct: 88, o: 7, t: 1, x: 0, names: "たろう · はなこ · じろう ..." },
                { rank: "#2", date: "6/16(日)", pct: 75, o: 6, t: 0, x: 2, names: "たろう · はなこ · ..." },
                { rank: "#3", date: "6/14(金)", pct: 50, o: 3, t: 2, x: 3, names: "じろう · さぶろう" },
              ].map((row, i) => (
                <li
                  key={row.date}
                  className={`rounded-2xl border p-3 md:p-4 ${
                    i === 0 ? "border-line-strong bg-tag-yellow-bg/40" : "border-line bg-paper"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="tabular text-[12px] font-bold text-ink">
                        {row.rank}
                      </span>
                      <span className="font-display text-[15px] font-bold text-ink">
                        {row.date}
                      </span>
                    </div>
                    <span className="tabular font-display text-[20px] font-bold text-accent">
                      {row.pct}
                      <span className="text-[11px] text-ink-muted">%</span>
                    </span>
                  </div>
                  {/* Stacked bar */}
                  <div className="mt-2 flex h-2 overflow-hidden rounded-full bg-paper-shade">
                    <div
                      className="transition-[width]"
                      style={{
                        width: `${(row.o / 8) * 100}%`,
                        backgroundColor: "var(--color-tag-green-text)",
                      }}
                    />
                    <div
                      className="transition-[width]"
                      style={{
                        width: `${(row.t / 8) * 100}%`,
                        backgroundColor: "var(--color-tag-yellow-text)",
                      }}
                    />
                    <div
                      className="transition-[width]"
                      style={{
                        width: `${(row.x / 8) * 100}%`,
                        backgroundColor: "var(--color-tag-red-text)",
                      }}
                    />
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1 text-[11px]">
                    <span className="tag tag-green tabular">◯ {row.o}</span>
                    <span className="tag tag-yellow tabular">🤔 {row.t}</span>
                    <span className="tag tag-red tabular">× {row.x}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Speech bubble — testimonial */}
          <div
            aria-hidden
            className="animate-float-a absolute -bottom-4 -right-2 hidden md:block"
            style={{ animationDelay: "1.5s" }}
          >
            <div className="relative rounded-2xl bg-paper border border-line px-4 py-2 shadow-sm">
              <p className="text-[13px] font-semibold text-ink">
                これで決まり！ <span aria-hidden>🙌</span>
              </p>
              <span
                aria-hidden
                className="absolute -bottom-1.5 left-6 size-3 rotate-45 border-r border-b border-line bg-paper"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3 steps */}
      <section
        className="animate-fade-up mt-12 md:mt-16"
        style={{ animationDelay: "320ms" }}
      >
        <h3 className="font-display text-center text-[18px] font-bold text-ink md:text-2xl">
          かんたん3ステップ
        </h3>
        <ol className="mt-5 grid gap-3 md:grid-cols-3 md:gap-4">
          {[
            {
              n: "01",
              emoji: "🗓",
              title: "候補日を選ぶ",
              body: "カレンダーから複数の候補を一気にタップ。範囲選択もOK。",
              chip: "tag-blue",
            },
            {
              n: "02",
              emoji: "🔗",
              title: "URLを共有",
              body: "LINE・SMS で送るだけ。ログイン不要で誰でも投票できる。",
              chip: "tag-green",
            },
            {
              n: "03",
              emoji: "🏆",
              title: "出席率順に集計",
              body: "1位が一目でわかる。チャートで全員の都合がパッと見える。",
              chip: "tag-yellow",
            },
          ].map((s) => (
            <li
              key={s.n}
              className="group relative overflow-hidden rounded-2xl border border-line bg-paper p-5 transition hover:border-line-strong hover:shadow-soft"
            >
              <div className="flex items-center justify-between">
                <span
                  aria-hidden
                  className={`tag ${s.chip} text-[10px] tracking-wider uppercase`}
                >
                  STEP {s.n}
                </span>
                <span
                  aria-hidden
                  className="text-3xl transition group-hover:animate-wiggle"
                >
                  {s.emoji}
                </span>
              </div>
              <h4 className="font-display mt-3 text-[16px] font-bold text-ink md:text-lg">
                {s.title}
              </h4>
              <p className="mt-1 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                {s.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Strengths / why ituiku */}
      <section className="scroll-enter relative mt-14 md:mt-20">
        <div className="text-center">
          <span className="tag tag-blue">なぜ いついく？</span>
          <h3 className="font-display mt-3 text-[22px] font-bold text-ink md:text-3xl">
            候補日が多くてもラク。
            <br className="md:hidden" />
            これが いついく？ の理由。
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-[13px] leading-relaxed text-ink-muted md:text-[14px]">
            既存の日程調整は「候補日が増えると地獄」。いついく？ は
            <strong className="font-bold text-ink">スマホで・速く・楽しく</strong>
            集計できる仕組みを最優先で作りました。
          </p>
        </div>

        <ul className="mt-8 grid gap-3 md:grid-cols-2 md:gap-4">
          {[
            {
              emoji: "⚡",
              tag: "tag-yellow",
              tagLabel: "圧倒的に速い",
              title: "30件の候補日も数タップで",
              body: "「全部◯」「範囲で◯」を組み合わせれば、候補日が多くてもベース投票が一瞬。あとは合わない日だけ × にすればOK。",
              vs: "vs 調整さん：1セルずつタップして指が疲れる",
            },
            {
              emoji: "📱",
              tag: "tag-green",
              tagLabel: "スマホ100%",
              title: "片手で完結する大きなUI",
              body: "ボタンは指タップ最適サイズ。safe-areaも考慮。電車内・片手でもストレスなし。",
              vs: "vs LINEスケジュール：縦長で読みにくく操作も面倒",
            },
            {
              emoji: "🔓",
              tag: "tag-purple",
              tagLabel: "ログイン不要",
              title: "URL を送るだけで投票開始",
              body: "幹事も参加者もアカウント不要。LINE 未利用の友達にも普通のURLとして送れる。",
              vs: "vs LINEスケジュール：LINE グループ内でしか使えない",
            },
            {
              emoji: "📊",
              tag: "tag-orange",
              tagLabel: "結果が一目",
              title: "出席率順 + チャートで可視化",
              body: "1位が一目でわかる。◯/🤔/× の人数を3色スタックバーで表示し、誰がどう答えたかも丸わかり。",
              vs: "vs 他サービス：数字だけで頭で計算が必要",
            },
            {
              emoji: "🤔",
              tag: "tag-blue",
              tagLabel: "「微妙」も投票",
              title: "現実的な3段階評価",
              body: "◯ と × だけでは表現できない「行けるけど…」を 🤔 で。複雑な事情を1タップで共有。",
              vs: "vs 単純な◯×：「微妙」を補足コメントで書く手間",
            },
            {
              emoji: "💸",
              tag: "tag-gray",
              tagLabel: "無料",
              title: "完全無料・広告なし",
              body: "ご飯会レベルの日程調整に課金は不要。長く続けられる仕組みで運用。",
              vs: "ストレスフリーな日程調整体験",
            },
          ].map((s) => (
            <li
              key={s.title}
              className="group relative flex gap-4 rounded-2xl border border-line bg-paper p-4 transition hover:border-line-strong hover:shadow-soft md:p-5"
            >
              <div
                aria-hidden
                className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-paper-shade text-2xl transition group-hover:animate-wiggle"
              >
                {s.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className={`tag ${s.tag} text-[10px] uppercase tracking-wider`}>
                    {s.tagLabel}
                  </span>
                </div>
                <h4 className="font-display mt-1.5 text-[15px] font-bold text-ink md:text-base">
                  {s.title}
                </h4>
                <p className="mt-1 text-[12px] leading-relaxed text-ink-muted md:text-[13px]">
                  {s.body}
                </p>
                <p className="mt-2 text-[11px] text-ink-faint italic">
                  {s.vs}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Differentiation tagline */}
      <section className="scroll-enter-rotate relative mt-14 overflow-hidden rounded-3xl border border-line bg-paper p-7 text-center md:mt-20 md:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-12 -left-12 h-40 w-40 rounded-full bg-tag-yellow-bg blur-3xl opacity-60"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full bg-tag-blue-bg blur-3xl opacity-60"
        />
        <div className="relative">
          <p className="font-brand text-[10px] tracking-widest text-ink-muted uppercase">
            One Liner
          </p>
          <p className="font-display mt-2 text-[20px] leading-tight font-bold text-ink md:text-2xl">
            候補日10件でも、30秒で答えられる。
            <br />
            スマホ専用の日程調整、いついく？
          </p>
        </div>
      </section>

      {/* Footer note */}
      <p
        className="animate-fade-up mt-12 text-center text-[12px] text-ink-faint"
        style={{ animationDelay: "560ms" }}
      >
        無料 ・ アカウント登録不要 ・ 候補日いくつでも
      </p>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper/95 px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)] backdrop-blur md:left-64 md:px-10 md:pt-4 md:pb-4">
        <div className="mx-auto max-w-md md:max-w-5xl">
          <Link
            href="/new"
            className="group relative flex h-14 w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-accent text-[16px] font-bold text-paper shadow-pop transition hover:bg-accent-strong active:scale-[0.985] md:h-12 md:text-[15px]"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-white/30"
            />
            <span className="relative font-display tracking-tight">
              イベントを作る
            </span>
            <svg
              aria-hidden
              className="relative size-5 transition group-hover:translate-x-0.5"
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
      </div>
    </main>
  );
}
