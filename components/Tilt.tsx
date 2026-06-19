"use client";

import { ReactNode, useRef } from "react";

/**
 * Envoltorio que inclina su contenido en 3D siguiendo el cursor (efecto
 * profundidad). Se desactiva solo en táctil (no hay mousemove).
 */
export default function Tilt({
  children,
  className = "",
  max = 9,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.25s ease-out", transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}
