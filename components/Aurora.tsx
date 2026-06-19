"use client";

import { motion } from "framer-motion";

/**
 * Aurora: blobs ámbar difusos que se mueven lento detrás del contenido.
 * Capa absoluta (contenedor position relative). Muy ligero (CSS/transform).
 */
export default function Aurora() {
  return (
    <div
      className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block"
      aria-hidden
    >
      <motion.div
        className="absolute -left-1/4 top-0 h-[60vh] w-[60vh] rounded-full bg-ember/20 blur-[120px]"
        animate={{ x: [0, 120, 0], y: [0, 60, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-0 top-1/3 h-[55vh] w-[55vh] rounded-full bg-gold/15 blur-[130px]"
        animate={{ x: [0, -100, 0], y: [0, 80, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
