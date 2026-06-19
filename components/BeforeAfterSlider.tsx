"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./Reveal";
import RevealText from "./RevealText";

/**
 * SECTION 3 — La cronología biológica.
 *
 * Draggable comparison between two conceptual macro images: microstructural
 * loss (before) and deep regeneration (after). Place the assets at:
 *   /public/cronologia-antes.jpg    (16:10, ~1920×1200)
 *   /public/cronologia-despues.jpg  (16:10, same framing)
 *
 * Honest by design: these are conceptual visualizations, not patient photos.
 */
const IMG_BEFORE = "/cronologia-antes.jpg";
const IMG_AFTER = "/cronologia-despues.jpg";

const metrics = [
  { label: "Densidad de colágeno", value: "+62%" },
  { label: "Vitalidad celular", value: "+48%" },
  { label: "Reparación tisular", value: "Acelerada" },
];

export default function BeforeAfterSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (dragging.current) setFromClientX(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      if (dragging.current && e.touches[0]) setFromClientX(e.touches[0].clientX);
    };
    const stop = () => (dragging.current = false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [setFromClientX]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(0, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(100, p + 4));
  };

  return (
    <section
      id="resultados"
      className="relative overflow-hidden border-t border-white/5 bg-noir-800 py-28 md:py-40"
    >
      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">La cronología biológica</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            <RevealText text="Resultados que desafían el envejecimiento celular" />
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">
            Desliza para visualizar el cambio: de la pérdida microestructural a
            la regeneración profunda lograda con el protocolo del Dr. Rivera.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            ref={containerRef}
            className="relative mt-14 aspect-[16/10] w-full select-none overflow-hidden rounded-sm bg-noir ring-1 ring-inset ring-white/10"
            onMouseDown={(e) => {
              dragging.current = true;
              setFromClientX(e.clientX);
            }}
            onTouchStart={(e) => {
              dragging.current = true;
              if (e.touches[0]) setFromClientX(e.touches[0].clientX);
            }}
          >
            {/* AFTER — regeneration (base layer) */}
            <div className="absolute inset-0">
              <Image
                src={IMG_AFTER}
                alt="Post-protocolo: regeneración profunda de la microestructura celular"
                fill
                sizes="100vw"
                className="object-cover"
                draggable={false}
              />
              <span className="absolute right-5 top-5 rounded-full border border-gold/40 bg-noir/70 px-4 py-1.5 text-[10px] uppercase tracking-luxe text-gold-light backdrop-blur">
                Post-protocolo · Regeneración profunda
              </span>
            </div>

            {/* BEFORE — loss (clipped from the left) */}
            <div
              className="absolute inset-0"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Image
                src={IMG_BEFORE}
                alt="Estado base: pérdida microestructural"
                fill
                sizes="100vw"
                className="object-cover"
                draggable={false}
              />
              <div className="absolute inset-0 bg-noir/20" />
              <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-noir/70 px-4 py-1.5 text-[10px] uppercase tracking-luxe text-bone-dim backdrop-blur">
                Estado base · Pérdida microestructural
              </span>
            </div>

            {/* Handle */}
            <div
              role="slider"
              aria-label="Comparador de cronología celular"
              aria-valuenow={Math.round(pos)}
              aria-valuemin={0}
              aria-valuemax={100}
              tabIndex={0}
              onKeyDown={onKey}
              className="absolute inset-y-0 z-10 flex w-0 cursor-ew-resize items-center justify-center focus:outline-none"
              style={{ left: `${pos}%` }}
            >
              <div className="absolute inset-y-0 w-px bg-gold/80 shadow-[0_0_20px_rgba(240,144,42,0.6)]" />
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-noir/80 backdrop-blur">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-gold-light">
                  <path
                    d="M9 6L4 12L9 18M15 6L20 12L15 18"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Conceptual metrics */}
        <Reveal delay={0.25}>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                whileHover={{ y: -4 }}
                className="rounded-sm border border-white/10 bg-noir-700/50 p-6 text-center"
              >
                <p className="font-serif text-3xl text-gold">{m.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-bone-dim">
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-8 text-center text-xs leading-relaxed text-bone-dim">
            Simulación ilustrativa generada digitalmente con fines explicativos;
            no corresponde a un paciente real. Los resultados varían en cada
            persona. Registro fotográfico de casos reales disponible en
            valoración médica.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
