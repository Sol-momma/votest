import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto min-h-dvh max-w-md px-6 pb-32 pt-6">
      {/* Hero */}
      <h1
        className="animate-fade-up font-display mt-6 text-[40px] leading-[1.1] font-bold text-ink"
        style={{ animationDelay: "60ms" }}
      >
        いつ集まる？を、
        <br />
        投票で決める。
      </h1>

      <p
        className="animate-fade-up mt-4 text-[15px] leading-relaxed text-ink-muted"
        style={{ animationDelay: "120ms" }}
      >
        ログインなし、URLを送るだけ。候補日に
        <span className="mx-1 tag tag-green">◯</span>
        <span className="mr-1 tag tag-yellow">🤔</span>
        <span className="tag tag-red">×</span>
        を投票して、出席率の高い順に自動集計。
      </p>

      {/* Steps */}
      <ol
        className="animate-fade-up mt-10 divide-y divide-line border-y border-line"
        style={{ animationDelay: "180ms" }}
      >
        {[
          {
            n: "01",
            emoji: "🗓",
            title: "候補日を選ぶ",
            body: "カレンダーから複数の候補を一気に。",
          },
          {
            n: "02",
            emoji: "🔗",
            title: "URLを共有",
            body: "LINE・SMS、ログイン不要で誰にでも届く。",
          },
          {
            n: "03",
            emoji: "🏆",
            title: "出席率順に集計",
            body: "1位の日が一目でわかる。",
          },
        ].map((s) => (
          <li
            key={s.n}
            className="hover-row flex items-center gap-4 px-2 py-4"
          >
            <span
              aria-hidden
              className="flex size-9 items-center justify-center rounded-md bg-paper-shade text-lg"
            >
              {s.emoji}
            </span>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-ink">{s.title}</p>
              <p className="mt-0.5 text-[13px] text-ink-muted">{s.body}</p>
            </div>
            <span className="tabular text-xs font-medium text-ink-faint">
              {s.n}
            </span>
          </li>
        ))}
      </ol>

      <p
        className="animate-fade-up mt-6 text-[12px] text-ink-faint"
        style={{ animationDelay: "260ms" }}
      >
        無料 ・ アカウント登録不要 ・ 候補日いくつでも
      </p>

      {/* Sticky CTA */}
      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-paper px-5 pt-3 pb-[calc(env(safe-area-inset-bottom)+14px)]">
        <div className="mx-auto max-w-md">
          <Link
            href="/new"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-md bg-accent text-[15px] font-semibold text-paper shadow-sm transition active:scale-[0.985] active:bg-accent-strong"
          >
            イベントを作る
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
        </div>
      </div>
    </main>
  );
}
