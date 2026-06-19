"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

// El coin 3D solo en cliente (usa WebGL / window)
const TokenCoin3D = dynamic(() => import("./TokenCoin3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-40 w-40 animate-pulse rounded-full bg-gold/10" />
    </div>
  ),
});

/**
 * SECTION — Ecosistema Healthcoin (ICO en vivo).
 * Datos de demostración basados en el deck (precio HCN, soft cap, progreso).
 */
const RAISED_PCT = 12.5;

const stats = [
  { label: "Precio actual", value: "1 HCN = $0.10" },
  { label: "Soft Cap", value: "$1,000,000" },
  { label: "Documentación legal", value: "100%" },
  { label: "ROI proyectado", value: "Escalable" },
];

export default function ICOWidget() {
  return (
    <section
      id="ecosistema"
      className="relative overflow-hidden border-y border-white/5 bg-noir py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      <div className="absolute left-1/2 top-1/3 -z-10 h-[80vh] w-[70vw] -translate-x-1/2 amber-glow animate-glow" />

      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">El ecosistema Healthcoin</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            Invierte en el <span className="text-gradient-gold">futuro</span> de
            la salud
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">
            Infraestructura médica premium respaldada por tecnología blockchain,
            terreno real y permisos aprobados. No promesas: desarrollo en curso.
          </p>
        </Reveal>

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-2">
          {/* Moneda 3D */}
          <Reveal>
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <TokenCoin3D />
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="pointer-events-none absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2.5 rounded-full border border-gold/20 bg-noir/50 px-4 py-2 backdrop-blur"
              >
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <motion.span
                    className="absolute h-5 w-5 rounded-full border border-gold/60"
                    animate={{ scale: [0.5, 1.6], opacity: [0.8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#f5cd86"
                    animate={{ x: [-3, 3, -3], y: [0, -1.5, 0] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path d="M5 3l14 7-6 2-2 6-6-15z" />
                  </motion.svg>
                </span>
                <span className="text-[10px] uppercase tracking-luxe text-bone-muted">
                  Gírala con el cursor
                </span>
              </motion.div>
            </div>
          </Reveal>

          {/* Tarjeta ICO */}
          <Reveal delay={0.1}>
            <div className="rounded-sm border border-white/10 bg-noir-700/60 p-8 backdrop-blur md:p-10">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-ember" />
                <span className="text-[11px] uppercase tracking-luxe text-gold">
                  ICO en etapa inicial
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-bone-dim">
                      {s.label}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-bone">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Barra de progreso */}
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-bone-muted">
                  <span>Recaudado</span>
                  <span className="text-gold">{RAISED_PCT}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-noir-600">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${RAISED_PCT}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full rounded-full bg-gradient-to-r from-gold-deep via-gold to-ember"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-ember px-6 py-3 text-sm font-medium text-noir shadow-[0_0_30px_rgba(240,144,42,0.35)] transition-transform hover:scale-[1.03]">
                  Comprar Healthcoin
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </button>
                <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-bone transition-colors hover:border-gold/50 hover:text-gold-light">
                  ▶ Ver Whitepaper
                </button>
              </div>

              <p className="mt-6 text-[11px] leading-relaxed text-bone-dim">
                Cifras de demostración. La compra de token y la conexión de
                wallet se habilitan en la plataforma oficial de Healthcoin.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
