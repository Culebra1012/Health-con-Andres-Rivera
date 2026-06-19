"use client";

import { useEffect, useRef } from "react";

/**
 * Doble hélice de ADN dorada (canvas 2D, ligera). Metáfora de regeneración /
 * rejuvenecimiento celular. Gira continuamente; los nodos que pasan al frente
 * se agrandan y brillan (profundidad 3D fingida con seno). Se dimensiona a su
 * contenedor (debe ser position relative). pointer-events-none.
 */
export default function DnaHelix() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let t = 0;

    const build = () => {
      w = parent.clientWidth;
      h = parent.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    build();

    const drawFrame = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const R = Math.min(w * 0.34, 100); // amplitud (radio) de la hélice
      const freq = 0.06; // espiral más apretada → más vueltas (look ADN)

      // Punto de una cadena a cierta altura. z: profundidad -1 (atrás) .. 1 (frente)
      const strand = (y: number, phase: number) => {
        const angle = t + y * freq + phase;
        return { x: cx + Math.sin(angle) * R, z: Math.cos(angle) };
      };

      // 1) Peldaños (pares de bases) — frecuentes y nítidos = lectura de ADN.
      //    Se dibujan primero para que las cadenas pasen por encima.
      const rungGap = 16;
      for (let y = 0; y <= h; y += rungGap) {
        const a = strand(y, 0);
        const b = strand(y, Math.PI);
        const depth = (a.z + 1) / 2; // 0 atrás, 1 al frente
        ctx.beginPath();
        ctx.moveTo(a.x, y);
        ctx.lineTo(b.x, y);
        ctx.strokeStyle = `rgba(240,166,78,${0.12 + depth * 0.5})`;
        ctx.lineWidth = 0.8 + depth * 1.4;
        ctx.stroke();
      }

      // 2) Cadenas dibujadas por segmentos, atenuándose y adelgazando al ir
      //    hacia atrás → efecto tejido (pasa por delante / por detrás).
      const step = 4;
      const drawStrand = (phase: number, rgb: string) => {
        let prev = strand(0, phase);
        for (let y = step; y <= h; y += step) {
          const p = strand(y, phase);
          const d = (p.z + 1) / 2; // profundidad del segmento
          ctx.beginPath();
          ctx.moveTo(prev.x, y - step);
          ctx.lineTo(p.x, y);
          ctx.strokeStyle = `rgba(${rgb},${0.12 + d * 0.85})`;
          ctx.lineWidth = 1 + d * 2.4;
          ctx.lineCap = "round";
          ctx.shadowColor = "rgba(240,166,78,0.7)";
          ctx.shadowBlur = d * 7;
          ctx.stroke();
          prev = p;
        }
        ctx.shadowBlur = 0;
      };
      drawStrand(0, "245,205,134"); // hebra clara
      drawStrand(Math.PI, "240,144,42"); // hebra profunda

      // 3) Nodos del backbone donde cada cadena está al frente (brillan)
      for (let y = 0; y <= h; y += rungGap) {
        for (const [phase, base] of [
          [0, "245,205,134"],
          [Math.PI, "240,144,42"],
        ] as const) {
          const p = strand(y, phase);
          const d = (p.z + 1) / 2;
          if (d < 0.45) continue; // solo los del frente
          ctx.beginPath();
          ctx.arc(p.x, y, 1.4 + d * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${base},${0.4 + d * 0.55})`;
          ctx.shadowColor = "rgba(240,166,78,0.8)";
          ctx.shadowBlur = d * 9;
          ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
    };

    let raf = 0;
    let active = false;
    let onScreen = true;
    const loop = () => {
      t += 0.012;
      drawFrame();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (active || reduce) return;
      active = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      if (!active) return;
      active = false;
      cancelAnimationFrame(raf);
    };

    if (reduce) drawFrame(); // un solo fotograma estático

    // Solo anima cuando está en pantalla y la pestaña visible
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting;
        if (onScreen && !document.hidden) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(parent);

    const onVis = () => {
      if (document.hidden) stop();
      else if (onScreen) start();
    };
    document.addEventListener("visibilitychange", onVis);

    const onResize = () => build();
    window.addEventListener("resize", onResize);
    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
