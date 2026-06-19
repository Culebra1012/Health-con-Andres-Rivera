"use client";

import Reveal from "./Reveal";

const credentials = [
  {
    title: "Cirujano Plástico y Reconstructivo",
    detail: "Formación en cirugía estética facial y reconstructiva avanzada.",
  },
  {
    title: "Miembro de la SCCP",
    detail: "Sociedad Colombiana de Cirugía Plástica, Estética y Reconstructiva.",
  },
  {
    title: "Enfoque en longevidad celular",
    detail: "Integración de terapias regenerativas y exosomas Cellgenic Flow.",
  },
  {
    title: "Referente digital verificado",
    detail: "Más de 712.000 personas en su comunidad médica educativa.",
  },
];

/**
 * SECTION 2 — Autoridad y Prestigio.
 * Editorial, photography-free: a defining quote beside verifiable
 * credentials, framed in gold linework.
 */
export default function Authority() {
  return (
    <section
      id="autoridad"
      className="relative overflow-hidden border-t border-white/5 bg-noir py-28 md:py-40"
    >
      <div className="absolute -left-1/4 top-1/4 -z-10 h-[60vh] w-[50vw] amber-glow" />

      <div className="container-luxe grid gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24">
        {/* Statement */}
        <div>
          <Reveal>
            <span className="eyebrow">¿Por qué el Dr. Andrés Rivera?</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="display mt-8 text-3xl leading-snug text-bone md:text-4xl">
              “La cirugía estética convencional se limita a{" "}
              <span className="text-bone-dim">tensar</span>. Yo trato el rostro
              como un{" "}
              <span className="text-gradient-gold">ecosistema vivo</span>.”
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg font-light leading-relaxed text-bone-muted">
              Al integrar técnicas de preservación quirúrgica con terapias
              celulares y de exosomas, cada intervención no solo corrige:{" "}
              <span className="text-bone">
                restaura la vitalidad celular desde el interior
              </span>
              . Un resultado natural, coherente con tu rostro y sostenible en el
              tiempo.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mt-10 flex items-center gap-4">
              <span className="h-px w-12 bg-gold" />
              <p className="font-serif text-xl text-bone">Dr. Andrés Rivera</p>
            </div>
          </Reveal>
        </div>

        {/* Credentials */}
        <div className="flex flex-col justify-center">
          {credentials.map((c, i) => (
            <Reveal key={c.title} delay={0.15 + i * 0.1}>
              <div className="group border-t border-white/10 py-6 transition-colors first:border-t-0 hover:border-gold/30">
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-serif text-sm text-gold">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-medium text-bone">
                      {c.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-bone-dim">
                      {c.detail}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
