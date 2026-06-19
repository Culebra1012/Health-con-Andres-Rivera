import Image from "next/image";

const navLinks = [
  { label: "El Método", href: "#autoridad" },
  { label: "Resultados", href: "#resultados" },
  { label: "Ciencia", href: "#ciencia" },
  { label: "El Santuario", href: "#santuario" },
  { label: "Ecosistema", href: "#ecosistema" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Foto del sitio con capa oscura encima */}
      <Image
        src="/IPS.jpeg"
        alt="Palmas Campestre IPS — Vía Las Palmas, Medellín"
        fill
        sizes="100vw"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-noir/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-noir/90 via-noir/25 to-noir/95" />

      <div className="container-luxe relative z-10">
        {/* CTA superior */}
        <div className="border-b border-white/10 py-16 text-center md:py-20">
          <p className="eyebrow">Palmas Campestre IPS · Medellín</p>
          <h2 className="display mt-5 text-3xl text-bone md:text-5xl">
            Tu transformación comienza con{" "}
            <span className="text-gradient-gold">una valoración</span>
          </h2>
          <a
            href="#agenda"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-gold to-ember px-8 py-3.5 text-sm font-medium text-noir shadow-[0_0_30px_rgba(240,144,42,0.35)] transition-transform hover:scale-[1.03]"
          >
            Agenda tu valoración VIP →
          </a>
        </div>

        {/* Columnas */}
        <div className="grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl text-bone">Dr. Andrés Rivera</p>
            <p className="mt-2 text-[10px] uppercase tracking-luxe text-gold">
              Cirujano Plástico · Palmas Campestre IPS
            </p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-bone-muted">
              Medicina regenerativa y rejuvenecimiento facial avanzado, en un
              santuario campestre rodeado de naturaleza.
            </p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-luxe text-bone-dim">
              Navegación
            </p>
            <ul className="mt-4 space-y-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-bone-muted transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-luxe text-bone-dim">
              Contacto
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-bone-muted">
              <li>Vía Las Palmas, Medellín</li>
              <li>Colombia</li>
              <li>
                <a
                  href="https://bybio.co/DrAndresRivera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold transition-colors hover:text-gold-light"
                >
                  bybio.co/DrAndresRivera
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-7 text-center md:flex-row md:text-left">
          <p className="text-xs text-bone-dim">
            © {new Date().getFullYear()} Healthcoin · Palmas Campestre IPS.
            Todos los derechos reservados.
          </p>
          <p className="text-[10px] uppercase tracking-luxe text-bone-dim">
            Medellín · Colombia
          </p>
        </div>
      </div>
    </footer>
  );
}
