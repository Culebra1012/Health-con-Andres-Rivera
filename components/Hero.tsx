"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./MagneticButton";
import Counter from "./Counter";
import Aurora from "./Aurora";

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
 * Video del Dr. en /public/dr-rivera-hero.MP4 (con la foto como poster).
 */
const HERO_VIDEO = "/dr-rivera-hero.MP4";
const HERO_POSTER = "/dr-rivera-hero.jpg";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // El parallax/fade solo aplica en desktop; en móvil el layout es apilado.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="grain relative overflow-hidden lg:flex lg:min-h-screen lg:items-center"
    >
      {/* Warm grid + amber glow backdrop */}
      <div className="absolute inset-0 z-0 bg-grid" />
      <div className="absolute -right-1/4 top-0 z-0 h-[120vh] w-[80vw] amber-glow animate-glow" />
      <Aurora />

      {/* Retrato — video del Dr.
          Móvil: bloque superior (~62vh). Desktop: columna derecha 55%. */}
      <motion.div
        style={isDesktop ? { y: portraitY } : undefined}
        className="relative z-0 h-[62vh] w-full sm:h-[70vh] lg:absolute lg:inset-y-0 lg:left-auto lg:right-0 lg:h-full lg:w-[55%]"
      >
        <video
          src={HERO_VIDEO}
          poster={HERO_POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="h-full w-full object-cover object-[center_18%] lg:object-contain lg:object-[right_bottom]"
        />
        {/* Móvil: oscurece bajo el navbar y funde a noir en la base */}
        <div className="absolute inset-0 bg-gradient-to-b from-noir/75 via-transparent to-noir lg:hidden" />
        {/* Desktop: funde hacia el texto a la izquierda */}
        <div className="absolute inset-0 hidden lg:block lg:bg-gradient-to-r lg:from-noir lg:via-noir/20 lg:to-transparent" />
      </motion.div>

      <motion.div
        style={isDesktop ? { y: contentY, opacity: contentOpacity } : undefined}
        className="container-luxe relative z-10 -mt-20 pb-20 sm:-mt-24 lg:mt-0 lg:py-32"
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
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 lg:block"
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
