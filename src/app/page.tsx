import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-md flex-col gap-8 px-6 py-12">
      <div className="mt-8">
        <p className="text-sm font-bold tracking-wider text-emerald-700">VOTEST</p>
        <h1 className="mt-2 text-3xl font-bold leading-tight text-zinc-900">
          候補日を投票で、
          <br />
          サクッと決定。
        </h1>
        <p className="mt-3 text-base leading-relaxed text-zinc-600">
          ログイン不要。候補日に ◯ 🤔 × を投票するだけで、出席率の高い順に自動集計。
        </p>
      </div>

      <ul className="flex flex-col gap-3 text-sm text-zinc-700">
        <li className="flex gap-2">
          <span aria-hidden>①</span> 候補日を選んでイベントを作る
        </li>
        <li className="flex gap-2">
          <span aria-hidden>②</span> LINE で URL を共有
        </li>
        <li className="flex gap-2">
          <span aria-hidden>③</span> 出席率の高い順に自動ランキング
        </li>
      </ul>

      <Link
        href="/new"
        className="mt-auto flex h-14 w-full items-center justify-center rounded-2xl bg-emerald-600 text-lg font-bold text-white shadow-md active:scale-[0.99]"
      >
        イベントを作る
      </Link>
    </main>
  );
}
