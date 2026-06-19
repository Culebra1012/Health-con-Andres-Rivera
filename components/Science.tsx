"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import RevealText from "./RevealText";
import DnaHelix from "./DnaHelix";

const pillars = [
  {
    index: "01",
    title: "Preservación quirúrgica",
    short: "Arquitectura del SMAS profundo",
    detail:
      "Reposicionamiento de los planos profundos del rostro sin tensión superficial, preservando la expresión natural y la integridad de los tejidos.",
  },
  {
    index: "02",
    title: "Exosomas Flow — Cellgenic",
    short: "Aplicación transquirúrgica",
    detail:
      "Miles de millones de exosomas purificados aplicados durante el procedimiento para modular la inflamación, acelerar la reparación tisular y potenciar la regeneración celular.",
  },
  {
    index: "03",
    title: "Frozen Facelift",
    short: "Exosomas + microneedling + PRP",
    detail:
      "Protocolo combinado: microneedling de toda la cara, aplicación tópica y subdérmica de exosomas con plasma rico en plaquetas para uniformar y rejuvenecer piel, cuello y escote.",
  },
  {
    index: "04",
    title: "Recuperación monitoreada",
    short: "Infraestructura campestre Palmas",
    detail:
      "Seguimiento clínico continuo en un entorno natural diseñado para una convalecencia óptima, combinando seguridad médica y bienestar integral.",
  },
];

/**
 * SECTION 4 — La Ciencia del Mañana.
 * Interactive pillar cards grounded in the real Cellgenic Flow Exosomes
 * protocols. Reveals detail on hover/focus.
 */
export default function Science() {
  return (
    <section
      id="ciencia"
      className="relative overflow-hidden border-y border-white/5 bg-noir py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-60" />
      {/* Doble hélice de ADN — regeneración celular */}
      <div className="pointer-events-none absolute right-[5%] top-20 z-0 hidden h-[360px] w-[300px] opacity-90 md:block lg:right-[8%] lg:h-[420px]">
        <DnaHelix />
      </div>

      <div className="container-luxe">
        <Reveal className="max-w-2xl">
          <span className="eyebrow">El ecosistema clínico</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            <RevealText text="La ciencia del mañana, hoy" />
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">
            Cuatro pilares integrados que convierten cada intervención en un
            protocolo de regeneración profunda.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => (
            <Reveal key={p.index} delay={i * 0.1}>
              <Tilt className="h-full">
              <motion.article
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="group relative h-full overflow-hidden rounded-sm border border-white/10 bg-noir-700/60 p-7 transition-colors duration-500 hover:border-gold/40"
              >
                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-ember/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />

                <span className="font-serif text-5xl text-white/10 transition-colors duration-500 group-hover:text-gold/30">
                  {p.index}
                </span>

                <h3 className="mt-5 font-serif text-2xl text-bone">
                  {p.title}
                </h3>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-gold">
                  {p.short}
                </p>

                <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-bone-dim opacity-0 transition-opacity duration-500 group-hover:mt-4 group-hover:opacity-100">
                    {p.detail}
                  </p>
                </div>
              </motion.article>
              </Tilt>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-xs leading-relaxed text-bone-dim">
            Cellgenic Flow Exosomes es un aloinjerto de tejido humano para
            medicina regenerativa.{" "}
            <span className="text-bone-muted">www.cellgenic.com</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
