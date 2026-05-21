import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  slow?: boolean;
};

/**
 * 無限スクロールするテキストストリップ。
 * 子要素を2回繰り返してシームレスループ。
 */
export function Marquee({ children, className = "", slow = false }: Props) {
  return (
    <div
      className={`group flex overflow-hidden whitespace-nowrap ${className}`}
      role="marquee"
      aria-label="Notice ticker"
    >
      <div
        className={`flex shrink-0 items-center gap-12 pr-12 ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        {children}
      </div>
      <div
        aria-hidden
        className={`flex shrink-0 items-center gap-12 pr-12 ${
          slow ? "animate-marquee-slow" : "animate-marquee"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
