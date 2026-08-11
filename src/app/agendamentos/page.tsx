import FormsAgenda from "@/components/FormsAgenda";
import Header from "@/components/HEADER";

export default function Agendamentos() {
  return (
    <main className="bg-branco grow">
      <Header />
      {/* Título */}
      <div className="flex flex-col px-8 py-12 gap-4">
        <section>
          <div className="flex flex-col gap-6">
            <h1 className="text-6xl font-playfair font-bold">
              Agende sua Reunião
            </h1>
            <p className="text-gray-500">
              Escolha o melhor horário para conversar com nossa equipe. Rápido,
              fácil e sem complicações.
            </p>
          </div>
        </section>
        <section>
          <FormsAgenda />
        </section>
      </div>
    </main>
  );
}
