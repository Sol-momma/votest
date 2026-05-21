import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-md items-center px-5 py-3 md:max-w-6xl md:px-10 md:py-4">
        <Link
          href="/"
          aria-label="いついく？ トップへ"
          className="group flex items-center gap-2 transition active:scale-[0.98]"
        >
          <span
            aria-hidden
            className="text-[26px] leading-none md:text-[30px]"
          >
            📅
          </span>
          <span className="font-display text-[24px] font-bold leading-none tracking-[-0.03em] text-ink md:text-[30px]">
            いついく
            <span className="text-accent">？</span>
          </span>
        </Link>
      </div>
    </header>
  );
}
