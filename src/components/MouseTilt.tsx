"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  intensity?: number;
  className?: string;
};

/**
 * マウス位置に応じて perspective tilt をかけるラッパー。
 * 子要素を中央に置いて回転軸を中央に保つ。
 */
export function MouseTilt({ children, intensity = 6, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const animate = () => {
      // ease toward target
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      el.style.setProperty("--tx", `${currentX.toFixed(2)}deg`);
      el.style.setProperty("--ty", `${currentY.toFixed(2)}deg`);
      raf = requestAnimationFrame(animate);
    };

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      targetX = -dy * intensity;
      targetY = dx * intensity;
    };

    const handleLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(raf);
    };
  }, [intensity]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform:
          "perspective(1400px) rotateX(var(--tx, 0)) rotateY(var(--ty, 0))",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}
