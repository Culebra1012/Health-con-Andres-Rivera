"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent, ReactNode, useRef } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
  className?: string;
}

/**
 * A button that subtly tracks the cursor (magnetic effect) and lifts a gold
 * sheen on hover. Built for the primary/secondary CTAs across the landing.
 */
export default function MagneticButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className = "",
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const base =
    "relative inline-flex items-center justify-center overflow-hidden rounded-full px-9 py-4 text-xs font-medium uppercase tracking-luxe transition-colors duration-300";

  const styles =
    variant === "solid"
      ? "bg-gold text-noir hover:bg-gold-light"
      : "border border-gold/50 text-bone hover:border-gold hover:text-gold-light";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <span className={`${base} ${styles} ${className}`}>
        <span className="relative z-10">{children}</span>
        {variant === "solid" && (
          <span className="pointer-events-none absolute inset-0 bg-gold-sheen bg-[length:200%_100%] animate-sheen opacity-60" />
        )}
      </span>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} className="inline-block">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className="inline-block">
      {content}
    </button>
  );
}
