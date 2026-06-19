"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Counter from "./Counter";

const stats = [
  {
    node: <Counter to={712} prefix="+" suffix="K" />,
    label: "Comunidad médica",
  },
  { node: "SCCP", label: "Miembro acreditado" },
  { node: <Counter to={1000} prefix="+" />, label: "Procedimientos faciales" },
];

/**
 * SECTION 1 — El Umbral.
 * Editorial hero: a single real portrait of Dr. Rivera blended into the
 * warm obsidian grid, with amber glow and the core authority signals.
 *
 * Place the real photo at /public/dr-rivera-hero.jpg (vertical 2:3, ≥1600×2400).
 */
const HERO_PORTRAIT = "/dr-rivera-hero.jpg";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Warm grid + amber glow backdrop */}
      <div className="absolute inset-0 z-0 bg-grid" />
      <div className="absolute -right-1/4 top-0 z-0 h-[120vh] w-[80vw] amber-glow animate-glow" />

      {/* Portrait — single real photo. Full-bleed on mobile, right 55% on desktop. */}
      <motion.div
        style={{ y: portraitY }}
        className="absolute inset-0 z-0 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[55%]"
      >
        <Image
          src={HERO_PORTRAIT}
          alt="Dr. Andrés Rivera, cirujano plástico y reconstructivo"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 55vw"
          className="object-cover object-[center_top]"
        />
        {/* Light touch: the photo is already a warm noir portrait.
            Mobile dims a bit for legibility; desktop only fades into the copy. */}
        <div className="absolute inset-0 bg-noir/60 lg:bg-transparent lg:bg-gradient-to-r lg:from-noir lg:via-noir/20 lg:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-noir/50 via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-luxe relative z-10 py-32"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex items-center gap-3"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-noir-700/60 px-4 py-1.5 backdrop-blur">
            <VerifiedBadge />
            <span className="text-[11px] uppercase tracking-[0.18em] text-bone-muted">
              Cirujano Plástico · Palmas Campestre IPS
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-7 max-w-4xl text-4xl text-bone sm:text-5xl md:text-6xl lg:text-7xl"
        >
          La evolución del tiempo en tu piel:{" "}
          <span className="text-gradient-gold">
            ingeniería quirúrgica y longevidad celular
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="mt-8 max-w-xl text-base font-light leading-relaxed text-bone-muted md:text-lg"
        >
          En la intersección de la medicina regenerativa avanzada y la alta
          costura quirúrgica, el{" "}
          <span className="text-bone">Dr. Andrés Rivera</span> redefine los
          límites del rejuvenecimiento facial en Palmas Campestre IPS, Medellín.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.85 }}
          className="mt-12 flex flex-wrap items-center gap-5"
        >
          <MagneticButton href="#agenda">Agenda tu valoración</MagneticButton>
          <MagneticButton href="#ciencia" variant="outline">
            Conoce el método
          </MagneticButton>
        </motion.div>

        {/* Real authority stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.05 }}
          className="mt-16 flex flex-wrap gap-x-12 gap-y-6 border-t border-white/10 pt-8"
        >
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl text-gold md:text-4xl">
                {s.node}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.14em] text-bone-dim">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-bone/30 p-1.5"
        >
          <span className="h-2 w-0.5 rounded-full bg-gold" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function VerifiedBadge() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l2.4 1.8 3-.3 1 2.85 2.6 1.5-.9 2.85.9 2.85-2.6 1.5-1 2.85-3-.3L12 22l-2.4-1.8-3 .3-1-2.85L3 16.35l.9-2.85L3 10.65l2.6-1.5 1-2.85 3 .3L12 2z"
        fill="#e0a64e"
      />
      <path
        d="M8.5 12.2l2.4 2.3 4.6-4.8"
        stroke="#0b0907"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
