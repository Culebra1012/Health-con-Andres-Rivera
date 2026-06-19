"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";

/**
 * SECTION — Diagnóstico asistido por IA (demo).
 *
 * El usuario sube una foto de su rostro; se redimensiona en el navegador y se
 * envía a /api/analyze (GPT-4o visión). Devuelve zonas con oportunidad de
 * mejora mapeadas a los protocolos reales del Dr. Rivera.
 *
 * Demo ilustrativo — no es un diagnóstico médico.
 */

type Zona = {
  zona: string;
  observacion: string;
  tratamiento: string;
  intensidad?: "Sutil" | "Moderado" | "Notable";
};

type Resultado = {
  edadAparente?: string;
  resumen?: string;
  zonas?: Zona[];
  error?: string;
};

const MAX_SIZE = 768; // px lado mayor — suficiente para visión, payload liviano

function resizeToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const scale = Math.min(1, MAX_SIZE / Math.max(img.width, img.height));
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        if (!ctx) return reject(new Error("canvas"));
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL("image/jpeg", 0.85));
      };
      img.onerror = reject;
      img.src = reader.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function AIScanner() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "scanning" | "done" | "error">(
    "idle"
  );
  const [result, setResult] = useState<Resultado | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const analyze = useCallback(async (file: File) => {
    try {
      setStatus("scanning");
      setResult(null);
      setErrorMsg("");
      const dataUrl = await resizeToDataUrl(file);
      setPreview(dataUrl);

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: dataUrl }),
      });
      const data: Resultado = await res.json();

      if (!res.ok || data.error) {
        setErrorMsg(data.error ?? "No se pudo completar el análisis.");
        setStatus("error");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch {
      setErrorMsg("No se pudo completar el análisis. Intenta de nuevo.");
      setStatus("error");
    }
  }, []);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) analyze(file);
  };

  const reset = () => {
    setPreview(null);
    setResult(null);
    setErrorMsg("");
    setStatus("idle");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section
      id="ia"
      className="relative overflow-hidden border-y border-white/5 bg-noir-800 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute -left-1/4 top-1/4 -z-10 h-[80vh] w-[60vw] amber-glow" />

      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Tecnología de vanguardia · Healthcoin</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            Análisis facial asistido por{" "}
            <span className="text-gradient-gold">inteligencia artificial</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">
            Sube una foto frontal y nuestra IA identificará, en segundos, las
            zonas con mayor potencial de rejuvenecimiento y el protocolo del
            Dr. Rivera indicado para cada una.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Visor */}
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-white/10 bg-noir ring-1 ring-inset ring-white/5">
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={preview}
                  alt="Rostro a analizar"
                  className="h-full w-full object-cover"
                />
              ) : (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="group flex h-full w-full flex-col items-center justify-center gap-4 px-8 text-center transition-colors hover:bg-white/[0.02]"
                >
                  <ScanIcon />
                  <span className="font-serif text-xl text-bone">
                    Sube tu fotografía
                  </span>
                  <span className="text-xs uppercase tracking-[0.16em] text-bone-dim">
                    Foto frontal · bien iluminada · sin lentes
                  </span>
                </button>
              )}

              {/* Línea de escaneo */}
              <AnimatePresence>
                {status === "scanning" && (
                  <>
                    <motion.div
                      initial={{ top: "0%" }}
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                      className="pointer-events-none absolute left-0 right-0 h-px bg-gold shadow-[0_0_24px_6px_rgba(240,144,42,0.7)]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gold/5" />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-gold/40 bg-noir/80 px-4 py-1.5 text-[10px] uppercase tracking-luxe text-gold-light backdrop-blur"
                    >
                      Analizando rostro…
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {/* Marco de targeting */}
              <div className="pointer-events-none absolute inset-5 rounded-sm border border-gold/20" />
              <Corner className="left-3 top-3" />
              <Corner className="right-3 top-3 rotate-90" />
              <Corner className="bottom-3 right-3 rotate-180" />
              <Corner className="bottom-3 left-3 -rotate-90" />
            </div>

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              className="hidden"
            />

            {(preview || status === "error") && (
              <button
                onClick={reset}
                className="mt-4 text-xs uppercase tracking-[0.16em] text-bone-dim transition-colors hover:text-gold"
              >
                ↺ Probar con otra foto
              </button>
            )}
          </Reveal>

          {/* Resultados */}
          <Reveal delay={0.1}>
            <div className="min-h-[20rem]">
              {status === "idle" && (
                <div className="flex h-full flex-col justify-center rounded-sm border border-dashed border-white/10 p-10 text-center">
                  <p className="text-sm leading-relaxed text-bone-dim">
                    El informe aparecerá aquí: edad aparente estimada, zonas de
                    oportunidad y el tratamiento sugerido para cada una.
                  </p>
                </div>
              )}

              {status === "scanning" && (
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-20 animate-pulse rounded-sm border border-white/5 bg-noir-700/40"
                    />
                  ))}
                </div>
              )}

              {status === "error" && (
                <div className="rounded-sm border border-ember/30 bg-ember/5 p-8 text-center">
                  <p className="text-sm text-bone-muted">{errorMsg}</p>
                </div>
              )}

              {status === "done" && result && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <p className="text-[11px] uppercase tracking-luxe text-gold">
                        Edad aparente estimada
                      </p>
                      <p className="font-serif text-4xl text-bone">
                        {result.edadAparente ?? "—"}
                      </p>
                    </div>
                    <span className="rounded-full border border-gold/30 bg-noir/60 px-3 py-1 text-[10px] uppercase tracking-luxe text-gold-light">
                      Informe IA
                    </span>
                  </div>

                  {result.resumen && (
                    <p className="mt-5 text-sm font-light leading-relaxed text-bone-muted">
                      {result.resumen}
                    </p>
                  )}

                  <div className="mt-6 space-y-3">
                    {result.zonas?.map((z, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.1 }}
                        className="rounded-sm border border-white/10 bg-noir-700/50 p-5 transition-colors hover:border-gold/40"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-serif text-lg text-bone">
                            {z.zona}
                          </h3>
                          {z.intensidad && (
                            <span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-gold">
                              {z.intensidad}
                            </span>
                          )}
                        </div>
                        <p className="mt-1.5 text-sm leading-relaxed text-bone-dim">
                          {z.observacion}
                        </p>
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-3 py-1 text-[11px] text-gold-light">
                          <Spark /> {z.tratamiento}
                        </p>
                      </motion.div>
                    ))}
                  </div>

                  <a
                    href="#agenda"
                    className="mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
                  >
                    Agenda tu valoración con estos resultados →
                  </a>
                </motion.div>
              )}
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-xs leading-relaxed text-bone-dim">
          Demostración tecnológica con inteligencia artificial. El análisis es
          ilustrativo y educativo, no constituye un diagnóstico médico ni
          garantiza resultados. La valoración profesional la realiza
          personalmente el Dr. Andrés Rivera.
        </p>
      </div>
    </section>
  );
}

function ScanIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gold/70">
      <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Corner({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute h-4 w-4 border-l border-t border-gold/60 ${className}`}
    />
  );
}

function Spark() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2z" />
    </svg>
  );
}
