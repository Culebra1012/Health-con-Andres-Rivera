"use client";

import { useEffect, useRef } from "react";

/**
 * Glow ámbar radial que sigue al cursor sobre toda la página (mix-blend screen,
 * solo lo ilumina sutilmente). Solo en punteros finos.
 */
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    el.style.opacity = "1";

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const loop = () => {
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(240,144,42,0.10), rgba(240,144,42,0.04) 30%, transparent 65%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[30] opacity-0 mix-blend-screen transition-opacity duration-700"
    />
  );
}
