"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const features = [
  "Quirófanos de alta complejidad certificados",
  "Suites de recuperación inmersas en naturaleza",
  "Acompañamiento clínico y hospitalidad premium",
  "Permanencia de paciente y familiares en un mismo entorno",
];

/**
 * SECTION 5 — La Experiencia Santuario (Palmas IPS Campestre).
 * No photography available — built atmospherically with the warm grid,
 * layered amber glows and the real corporate copy from the Healthcoin deck.
 */
export default function Sanctuary() {
  return (
    <section
      id="santuario"
      className="relative flex min-h-[90vh] items-center overflow-hidden bg-noir-800"
    >
      <div className="absolute inset-0 -z-20 bg-grid" />
      {/* Layered warm glows evoking the campestre sunset of the renderings */}
      <div className="absolute bottom-0 right-0 -z-10 h-[80vh] w-[70vw] amber-glow animate-glow" />
      <div className="absolute left-0 top-0 -z-10 h-[50vh] w-[40vw] amber-glow opacity-60" />

      <div className="container-luxe py-28">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
          <Reveal>
            <span className="eyebrow">La experiencia santuario</span>
            <h2 className="display mt-5 text-4xl text-bone md:text-5xl lg:text-6xl">
              Tu recuperación en un entorno premium
            </h2>
            <p className="mt-8 text-lg font-light leading-relaxed text-bone-muted">
              Ubicada en Las Palmas, Medellín,{" "}
              <span className="text-bone">Palmas IPS Campestre</span> integra
              medicina, bienestar y tranquilidad en un solo lugar: la máxima
              seguridad clínica en contacto directo con la naturaleza que exige
              una recuperación óptima.
            </p>

            <ul className="mt-10 space-y-4">
              {features.map((f, i) => (
                <Reveal key={f} delay={i * 0.1}>
                  <li className="flex items-center gap-4 text-bone">
                    <span className="h-px w-8 bg-gold" />
                    <span className="text-sm font-light">{f}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </Reveal>

          {/* Atmospheric card stack instead of a photo */}
          <Reveal delay={0.2}>
            <div className="relative flex h-full min-h-[360px] items-center justify-center">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full max-w-sm rounded-sm border border-gold/20 bg-noir-700/60 p-8 backdrop-blur"
              >
                <p className="font-serif text-2xl text-bone">
                  “Medicina, bienestar y tranquilidad en un solo lugar.”
                </p>
                <p className="mt-6 text-sm leading-relaxed text-bone-dim">
                  Un ecosistema diseñado para transformar la experiencia médica
                  en un proceso más humano, rodeado de naturaleza y hospitalidad
                  premium.
                </p>
                <div className="mt-8 flex items-center gap-3 border-t border-white/10 pt-6">
                  <span className="text-[10px] uppercase tracking-luxe text-gold">
                    Palmas IPS Campestre · Healthcoin
                  </span>
                </div>
                {/* Reserve a slot: drop a real render here when available */}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
