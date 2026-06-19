"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";

const links = [
  { label: "El Método", href: "#autoridad" },
  { label: "Resultados", href: "#resultados" },
  { label: "Ciencia", href: "#ciencia" },
  { label: "El Santuario", href: "#santuario" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-noir/80 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-luxe flex h-20 items-center justify-between">
        <a href="#top" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-wide text-bone">
            Dr. Andrés Rivera
          </span>
          <span className="text-[10px] uppercase tracking-luxe text-gold">
            Palmas Campestre IPS
          </span>
        </a>

        <ul className="hidden items-center gap-10 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-xs uppercase tracking-[0.18em] text-bone-muted transition-colors hover:text-gold-light"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <MagneticButton href="#agenda" variant="outline">
            Agenda VIP
          </MagneticButton>
        </div>
      </nav>
    </motion.header>
  );
}
