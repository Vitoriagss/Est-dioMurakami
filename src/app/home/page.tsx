import Header from "@/components/HEADER";
import { Footer } from "@/components/HOME/components/Footer";
import { Hero } from "@/components/HOME/components/Hero";
import { Segmentos } from "@/components/HOME/components/Segmentos";
import { Sobre } from "@/components/HOME/components/Sobre";

export default function Home() {
  return (
    <main className="bg-orange-50 flex flex-col overflow-hidden">
      <Header />
      <Hero />
      <Sobre />
      <Segmentos />
      <Footer />
    </main>
  );
}
