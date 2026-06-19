"use client";

import { useMemo, useState } from "react";
import Reveal from "./Reveal";

/**
 * SECTION — Longevidad celular: curva dosis-edad.
 * Inspirada en la gráfica "Cellgenic Exosomes Recommended Doses" (dosis vs edad).
 * El usuario mueve su edad y ve la dosis sugerida y el protocolo del Dr. Rivera.
 *
 * Educativo / ilustrativo — no sustituye la valoración médica.
 */

const MIN_AGE = 30;
const MAX_AGE = 85;

// Dimensiones del lienzo SVG
const W = 640;
const H = 320;
const PAD = { l: 56, r: 24, t: 24, b: 44 };

// Dosis (en miles de millones) en función de la edad: crecimiento exponencial
function doseAt(age: number) {
  const k = 0.052;
  return 4 * Math.exp(k * (age - MIN_AGE)); // ~4 a ~55
}

const MAX_DOSE = doseAt(MAX_AGE);

function x(age: number) {
  return PAD.l + ((age - MIN_AGE) / (MAX_AGE - MIN_AGE)) * (W - PAD.l - PAD.r);
}
function y(dose: number) {
  return H - PAD.b - (dose / MAX_DOSE) * (H - PAD.t - PAD.b);
}

const curvePath = (() => {
  let d = "";
  for (let a = MIN_AGE; a <= MAX_AGE; a += 1) {
    d += `${a === MIN_AGE ? "M" : "L"}${x(a).toFixed(1)},${y(doseAt(a)).toFixed(1)} `;
  }
  return d.trim();
})();

const areaPath = `${curvePath} L${x(MAX_AGE)},${H - PAD.b} L${x(MIN_AGE)},${H - PAD.b} Z`;

function protocolFor(age: number) {
  if (age < 40)
    return {
      etapa: "Prevención temprana",
      protocolo: "Exosomas Flow Cellgenic — mantenimiento",
      nota: "Optimización celular y calidad de piel antes de los primeros signos.",
    };
  if (age < 55)
    return {
      etapa: "Gestión activa",
      protocolo: "Frozen Facelift + Exosomas Flow",
      nota: "Estimulación de colágeno y rejuvenecimiento integral de rostro y cuello.",
    };
  return {
    etapa: "Regeneración intensiva",
    protocolo: "Reposicionamiento SMAS + Exosomas Flow",
    nota: "Restauración estructural profunda con soporte regenerativo celular.",
  };
}

export default function DoseAgeCurve() {
  const [age, setAge] = useState(45);
  const dose = useMemo(() => doseAt(age), [age]);
  const plan = useMemo(() => protocolFor(age), [age]);

  const px = x(age);
  const py = y(dose);

  return (
    <section
      id="longevidad"
      className="relative overflow-hidden border-b border-white/5 bg-noir-800 py-28 md:py-40"
    >
      <div className="absolute inset-0 -z-10 bg-grid opacity-40" />

      <div className="container-luxe">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Ciencia de la longevidad</span>
          <h2 className="display mt-5 text-4xl text-bone md:text-5xl">
            Tu edad, tu{" "}
            <span className="text-gradient-gold">protocolo regenerativo</span>
          </h2>
          <p className="mt-6 text-lg font-light leading-relaxed text-bone-muted">
            La necesidad de soporte celular aumenta con la edad. Mueve el control
            y descubre la intensidad y el protocolo indicado para tu momento.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Gráfica */}
          <Reveal>
            <div className="rounded-sm border border-white/10 bg-noir-700/40 p-5 md:p-7">
              <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
                <defs>
                  <linearGradient id="doseArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(240,144,42,0.35)" />
                    <stop offset="100%" stopColor="rgba(240,144,42,0)" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal */}
                {[0, 0.25, 0.5, 0.75, 1].map((f) => {
                  const gy = PAD.t + f * (H - PAD.t - PAD.b);
                  return (
                    <line
                      key={f}
                      x1={PAD.l}
                      x2={W - PAD.r}
                      y1={gy}
                      y2={gy}
                      stroke="rgba(255,255,255,0.06)"
                    />
                  );
                })}

                {/* Área + curva */}
                <path d={areaPath} fill="url(#doseArea)" />
                <path
                  d={curvePath}
                  fill="none"
                  stroke="#e0a64e"
                  strokeWidth={2.5}
                />

                {/* Marcador */}
                <line
                  x1={px}
                  x2={px}
                  y1={py}
                  y2={H - PAD.b}
                  stroke="rgba(245,205,134,0.5)"
                  strokeDasharray="4 4"
                />
                <circle cx={px} cy={py} r={9} fill="#f0902a" opacity={0.3} />
                <circle cx={px} cy={py} r={5} fill="#f5cd86" />

                {/* Etiquetas eje X */}
                {[30, 45, 55, 70, 85].map((a) => (
                  <text
                    key={a}
                    x={x(a)}
                    y={H - PAD.b + 22}
                    fill="#8c8275"
                    fontSize="12"
                    textAnchor="middle"
                  >
                    {a}
                  </text>
                ))}
                <text
                  x={(W + PAD.l) / 2}
                  y={H - 6}
                  fill="#8c8275"
                  fontSize="11"
                  textAnchor="middle"
                  letterSpacing="2"
                >
                  EDAD
                </text>
                <text
                  x={16}
                  y={PAD.t + 6}
                  fill="#8c8275"
                  fontSize="11"
                >
                  Dosis
                </text>
              </svg>

              {/* Control de edad */}
              <div className="mt-4 px-1">
                <input
                  type="range"
                  min={MIN_AGE}
                  max={MAX_AGE}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-noir-600 accent-gold"
                  aria-label="Selecciona tu edad"
                />
                <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.14em] text-bone-dim">
                  <span>{MIN_AGE} años</span>
                  <span>{MAX_AGE} años</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Panel de resultado */}
          <Reveal delay={0.1}>
            <div className="rounded-sm border border-gold/20 bg-noir-700/60 p-8">
              <div className="border-b border-white/10 pb-5">
                <p className="text-[10px] uppercase tracking-luxe text-bone-dim">
                  Edad seleccionada
                </p>
                <p className="font-serif text-5xl text-bone">{age}</p>
              </div>

              <p className="mt-5 text-[11px] uppercase tracking-luxe text-gold">
                {plan.etapa}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-bone">
                {plan.protocolo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-bone-dim">
                {plan.nota}
              </p>

              <a
                href="#agenda"
                className="mt-7 inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-gold transition-colors hover:text-gold-light"
              >
                Diseña tu protocolo con el Dr. Rivera →
              </a>
            </div>
          </Reveal>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-xs leading-relaxed text-bone-dim">
          Gráfica ilustrativa inspirada en las dosis recomendadas de Cellgenic
          Flow Exosomes. La dosificación real la determina el médico según cada
          caso.
        </p>
      </div>
    </section>
  );
}
