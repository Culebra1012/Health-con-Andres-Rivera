"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "./Reveal";
import MagneticButton from "./MagneticButton";

const interests = [
  "Lifting de preservación",
  "Terapia de exosomas",
  "Rejuvenecimiento integral",
  "Evaluación de longevidad",
];

const inputClass =
  "w-full border-b border-white/15 bg-transparent py-3 text-bone placeholder:text-bone-dim focus:border-gold focus:outline-none transition-colors";

/**
 * SECTION 6 — Agenda VIP (Conversión).
 * Client-side validated lead form with a graceful confirmation state.
 */
export default function VIPForm() {
  const [interest, setInterest] = useState(interests[0]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Wire to a CRM / email endpoint here.
    setSubmitted(true);
  };

  return (
    <section
      id="agenda"
      className="relative overflow-hidden border-t border-white/5 bg-noir-800 py-28 md:py-40"
    >
      {/* ambient gold glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/5 blur-3xl" />

      <div className="container-luxe grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <span className="eyebrow">Agenda VIP</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            Accede a una Consulta Evaluativa con el Dr. Andrés Rivera
          </h2>
          <p className="mt-8 max-w-md text-lg font-light leading-relaxed text-bone-muted">
            Los espacios son limitados y se asignan por evaluación previa.
            Comparte tus datos y nuestro equipo de coordinación médica te
            contactará de forma confidencial.
          </p>

          <div className="mt-12 space-y-3 text-sm text-bone-dim">
            <p>Palmas IPS Campestre · Vía Las Palmas, Medellín</p>
            <p>Atención exclusiva con cita previa</p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="rounded-sm border border-white/10 bg-noir-700/50 p-8 md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[420px] flex-col items-center justify-center text-center"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/50">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#e6cf95"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-6 font-serif text-2xl text-bone">
                    Solicitud recibida
                  </h3>
                  <p className="mt-3 max-w-xs text-sm text-bone-muted">
                    Gracias. Nuestro equipo de coordinación médica se pondrá en
                    contacto contigo en las próximas 24 horas.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-7"
                >
                  <div>
                    <label className="text-[10px] uppercase tracking-luxe text-bone-dim">
                      Nombre completo
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Tu nombre"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-7 sm:grid-cols-2">
                    <div>
                      <label className="text-[10px] uppercase tracking-luxe text-bone-dim">
                        Correo
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="tu@correo.com"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="text-[10px] uppercase tracking-luxe text-bone-dim">
                        Teléfono
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+57"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-luxe text-bone-dim">
                      Área de interés
                    </label>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {interests.map((it) => (
                        <button
                          key={it}
                          type="button"
                          onClick={() => setInterest(it)}
                          className={`rounded-full border px-4 py-2 text-xs transition-colors ${
                            interest === it
                              ? "border-gold bg-gold/10 text-gold-light"
                              : "border-white/15 text-bone-muted hover:border-gold/40"
                          }`}
                        >
                          {it}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase tracking-luxe text-bone-dim">
                      Mensaje (opcional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Cuéntanos sobre tus objetivos"
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <div className="pt-2">
                    <MagneticButton type="submit">
                      Solicitar Espacio Exclusivo
                    </MagneticButton>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
