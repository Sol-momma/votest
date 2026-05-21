"use client";

import { useEffect, useRef } from "react";

/**
 * カスタムカーソル。ホーム画面の theme-night 配下でのみ使用想定。
 * - 小さな白丸が遅延付きで追従
 * - インタラクティブ要素にホバーすると拡大
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    // Tag <html> so CSS can hide default cursor
    document.documentElement.classList.add("cursor-hidden");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0;
    let my = 0;
    let dx = 0;
    let dy = 0;
    let rx = 0;
    let ry = 0;
    let raf = 0;

    const update = () => {
      // dot follows fast
      dx += (mx - dx) * 0.45;
      dy += (my - dy) * 0.45;
      // ring follows slower
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(update);
    };

    const handleMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor='hover']");
      if (interactive) {
        ring.classList.add("vt-cursor-hover");
        dot.classList.add("vt-cursor-hover-dot");
      } else {
        ring.classList.remove("vt-cursor-hover");
        dot.classList.remove("vt-cursor-hover-dot");
      }
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    raf = requestAnimationFrame(update);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="vt-cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] size-9 rounded-full border border-cream-warm/60 transition-[width,height,border-color] duration-200 ease-out"
        style={{ mixBlendMode: "difference" }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="vt-cursor-dot pointer-events-none fixed left-0 top-0 z-[9999] size-1.5 rounded-full bg-cream-warm transition-[width,height,background-color] duration-150 ease-out"
        style={{ mixBlendMode: "difference" }}
      />
      <style>{`
        .vt-cursor-ring.vt-cursor-hover {
          width: 56px;
          height: 56px;
          border-color: rgba(244, 243, 238, 1);
        }
        .vt-cursor-hover-dot {
          width: 4px;
          height: 4px;
        }
      `}</style>
    </>
  );
}
