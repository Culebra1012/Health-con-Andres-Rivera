"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const links = [
  { label: "El Método", href: "#autoridad", id: "autoridad" },
  { label: "Resultados", href: "#resultados", id: "resultados" },
  { label: "Ciencia", href: "#ciencia", id: "ciencia" },
  { label: "Ecosistema", href: "#ecosistema", id: "ecosistema" },
  { label: "El Santuario", href: "#santuario", id: "santuario" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scrollspy — resalta la sección visible
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-50"
      >
        <nav className="container-luxe pt-3 sm:pt-4">
          <motion.div
            animate={{
              borderRadius: scrolled ? 999 : 18,
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className={`flex items-center justify-between gap-4 px-3 transition-all duration-500 sm:px-4 ${
              scrolled
                ? "h-14 border border-gold/15 bg-noir/70 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:h-16"
                : "h-16 border border-transparent bg-transparent sm:h-20"
            }`}
          >
            {/* Marca + moneda */}
            <a
              href="#top"
              className="group flex items-center gap-3"
              onClick={() => setOpen(false)}
            >
              <span className="relative grid h-9 w-9 place-items-center sm:h-10 sm:w-10">
                <motion.span
                  className="absolute inset-0 rounded-full bg-gold/20 blur-md"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <Image
                  src="/healthcoin-coin.png"
                  alt="Healthcoin"
                  width={40}
                  height={40}
                  className="relative h-full w-full object-contain transition-transform duration-500 group-hover:rotate-[18deg]"
                  priority
                />
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-serif text-base tracking-wide text-bone sm:text-lg">
                  Dr. Andrés Rivera
                </span>
                <span className="text-[9px] uppercase tracking-luxe text-gold sm:text-[10px]">
                  Palmas Campestre IPS
                </span>
              </span>
            </a>

            {/* Links desktop con indicador activo */}
            <ul className="hidden items-center gap-1 lg:flex">
              {links.map((l) => (
                <li key={l.href} className="relative">
                  <a
                    href={l.href}
                    className={`relative block rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.16em] transition-colors ${
                      active === l.id
                        ? "text-noir"
                        : "text-bone-muted hover:text-gold-light"
                    }`}
                  >
                    {active === l.id && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-gold to-ember"
                      />
                    )}
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <a
                href="#agenda"
                className="hidden items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-bone transition-all hover:border-gold hover:bg-gold/10 hover:text-gold-light md:inline-flex"
              >
                Agenda VIP
                <span aria-hidden>→</span>
              </a>

              {/* Botón hamburguesa (móvil) */}
              <button
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                onClick={() => setOpen((v) => !v)}
                className="relative grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-noir/40 backdrop-blur lg:hidden"
              >
                <span className="relative flex h-4 w-5 flex-col justify-between">
                  <motion.span
                    animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="h-0.5 w-full origin-center rounded-full bg-bone"
                  />
                  <motion.span
                    animate={open ? { opacity: 0 } : { opacity: 1 }}
                    className="h-0.5 w-full rounded-full bg-bone"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="h-0.5 w-full origin-center rounded-full bg-bone"
                  />
                </span>
              </button>
            </div>
          </motion.div>
        </nav>
      </motion.header>

      {/* Overlay menú móvil */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-noir/95 backdrop-blur-xl" />
            <div className="absolute inset-0 -z-0 bg-grid opacity-40" />
            <div className="absolute left-1/2 top-1/3 h-[60vh] w-[80vw] -translate-x-1/2 amber-glow" />

            <div className="relative flex h-full flex-col justify-center px-8">
              <ul className="space-y-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4"
                    >
                      <span className="font-serif text-[11px] text-gold/60">
                        0{i + 1}
                      </span>
                      <span className="display text-4xl text-bone transition-colors group-hover:text-gold-light sm:text-5xl">
                        {l.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#agenda"
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-12 inline-flex w-fit items-center gap-3 rounded-full bg-gradient-to-r from-gold to-ember px-8 py-4 text-sm font-medium uppercase tracking-[0.16em] text-noir shadow-[0_0_40px_rgba(240,144,42,0.35)]"
              >
                Agenda tu valoración
                <span aria-hidden>→</span>
              </motion.a>

              <p className="mt-10 text-xs uppercase tracking-luxe text-bone-dim">
                Palmas Campestre IPS · Medellín
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
