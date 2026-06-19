"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Barra de progreso de scroll dorada, fija arriba.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-gradient-to-r from-gold-deep via-gold to-ember"
    />
  );
}
