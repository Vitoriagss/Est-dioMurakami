import Image from "next/image";
import { Button } from "./Button";
import { VectorBurst, VectorHourglass, VectorM } from "../icons";
import livro from "../img/livro.png";
import notebook from "../img/notebook.png";
import oculos from "../img/oculos.png";

export function Hero() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
      <div className="flex flex-col items-start gap-8 lg:gap-12 max-w-2xl">
        <h1 className="font-(family-name:--font-playfair) text-4xl sm:text-5xl lg:text-7xl font-semibold text-black leading-tight">
          Agendamento fácil com planejamento
        </h1>
        <p className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-black">
          Junte-se a 20 milhões de profissionais que agendam reuniões
          facilmente com a ferramenta de agendamento número 1.
        </p>
        <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-16">
          <Button href="/agendamentos">Agendar agora</Button>
          <Button href="/status">Consultar status</Button>
          <Image
            src="/img/Icone.png"
            alt=""
            width={100}
            height={100}
            className="w-[100px] h-[100px] shrink-0"
          />
        </div>
      </div>

      <div
        aria-hidden
        className="hidden lg:block relative w-[670px] h-[814px] shrink-0 overflow-hidden"
      >
        <Image
          src={livro}
          alt=""
          className="w-60 h-96 left-[316px] top-[435px] absolute object-cover"
        />
        <Image
          src={notebook}
          alt=""
          className="w-45 h-68 left-[54px] top-[275px] absolute object-cover"
        />
        <VectorM className="w-41 h-16 left-[255px] top-[403px] absolute" />
        <Image
          src={oculos}
          alt=""
          className="w-81.5 h-54.5 left-[255px] top-[117px] absolute rounded-2xl object-cover"
        />
        <VectorHourglass className="w-23 h-32 left-[106px] top-[101px] absolute" />
        <VectorBurst className="w-[158px] h-[136px] left-[177px] top-[542px] absolute" />
      </div>
    </section>
  );
}
