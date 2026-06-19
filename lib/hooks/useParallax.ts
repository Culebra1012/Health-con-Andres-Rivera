"use client";

import { useScroll, useTransform, MotionValue } from "framer-motion";
import { RefObject } from "react";

/**
 * Native-feeling parallax driven by Framer Motion's scroll progress.
 *
 * Tracks the target element as it moves through the viewport and maps that
 * progress (0 → 1) to a vertical offset. `speed` controls intensity:
 *   - positive  → element drifts up slower than scroll (classic background)
 *   - negative  → element moves against the scroll direction
 *
 * Returns a MotionValue<string> ready to drop into `style={{ y }}`.
 */
export function useParallax(
  ref: RefObject<HTMLElement>,
  speed = 0.3
): MotionValue<string> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const distance = `${speed * 100}%`;
  return useTransform(scrollYProgress, [0, 1], [`-${distance}`, distance]);
}
