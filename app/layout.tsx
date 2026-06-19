import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dr. Andrés Rivera | Longevidad & Rejuvenecimiento Facial — Healthcoin Palmas",
  description:
    "El Dr. Andrés Rivera redefine los límites del rejuvenecimiento facial en la intersección de la medicina regenerativa avanzada y la alta costura quirúrgica. Healthcoin Palmas IPS Campestre, Medellín.",
  keywords: [
    "Dr. Andrés Rivera",
    "rejuvenecimiento facial",
    "longevidad",
    "exosomas",
    "cirugía facial Medellín",
    "Healthcoin",
    "Palmas IPS",
  ],
  openGraph: {
    title: "Dr. Andrés Rivera | Ingeniería Quirúrgica y Longevidad Celular",
    description:
      "Rejuvenecimiento facial avanzado y medicina regenerativa en Healthcoin Palmas, Medellín.",
    type: "website",
    locale: "es_CO",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
