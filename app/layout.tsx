import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import CursorSpotlight from "@/components/CursorSpotlight";
import ScrollProgress from "@/components/ScrollProgress";
import Particles from "@/components/Particles";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://health-con-andres-rivera.up.railway.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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

export const viewport: Viewport = {
  themeColor: "#0b0907",
  width: "device-width",
  initialScale: 1,
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
        <CursorSpotlight />
        <ScrollProgress />
        {/* Partículas doradas flotando sobre toda la página */}
        <div className="pointer-events-none fixed inset-0 z-[20]">
          <Particles density={1} />
        </div>
        {children}
      </body>
    </html>
  );
}
