import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Authority from "@/components/Authority";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import Science from "@/components/Science";
import DoseAgeCurve from "@/components/DoseAgeCurve";
import AIScanner from "@/components/AIScanner";
import Sanctuary from "@/components/Sanctuary";
import ICOWidget from "@/components/ICOWidget";
import VIPForm from "@/components/VIPForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Authority />
      <BeforeAfterSlider />
      <Science />
      <DoseAgeCurve />
      <AIScanner />
      <Sanctuary />
      <ICOWidget />
      <VIPForm />
      <Footer />
    </main>
  );
}
