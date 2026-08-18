import Image from "next/image";
import logopreta from "../img/logopreta.png";

const SERVICOS = [
  "Consultoria Inicial",
  "Planejamento Estratégico",
  "Acompanhamento Mensal",
  "Revisão de Processos",
  "Mentoria Executiva",
  "Diagnóstico Financeiro",
];

export function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-28 bg-primaria shadow-[0px_4px_4px_0px_rgba(0,0,0,0.60)] flex flex-col items-center gap-14 px-6 sm:px-10 lg:px-16 py-16 lg:py-24"
    >
      <div className="w-full flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-16">
        <Image
          src={logopreta}
          alt="Logo Estúdio Murakami"
          className="w-full max-w-[699px] aspect-square h-auto shrink-0 mx-auto lg:mx-0"
        />

        <div className="flex-1 flex flex-col items-start gap-6 lg:gap-10">
          <h1 className="font-(family-name:--font-playfair) text-4xl lg:text-6xl font-semibold text-orange-50">
            Sobre nós
          </h1>
          <p className="font-(family-name:--font-montserrat-sans) text-2xl lg:text-3xl font-semibold text-orange-50">
            Sua Agenda trabalha pra você.
          </p>
          <p className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-orange-50 text-justify leading-relaxed">
            28,9% dos agendamentos do Murakami acontecem fora do horário
            comercial — o link atende quando você já fechou a porta.
          </p>
        </div>
      </div>

      <div aria-hidden className="w-screen ml-translate-x-1/2 overflow-hidden">
        <div className="flex w-max gap-16 animate-[marquee_15s_linear_infinite]">
          {[...SERVICOS, ...SERVICOS].map((servico, i) => (
            <span
              key={`${servico}-${i}`}
              className="font-(family-name:--font-montserrat-sans) text-2xl lg:text-4xl font-semibold text-orange-50 whitespace-nowrap"
            >
              {servico}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
