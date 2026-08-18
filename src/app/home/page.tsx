import Header from "@/components/HEADER";
import livro from "@/components/HOME/livro.png";
import logopreta from "@/components/HOME/logopreta.png";
import notebook from "@/components/HOME/notebook.png";
import oculos from "@/components/HOME/oculos.png";
import vectorM from "@/components/HOME/Vector.svg";
import vectorBurst from "@/components/HOME/Vector-1.svg";
import vectorHourglass from "@/components/HOME/Vector-2.svg";
import emailIcon from "@/components/HOME/Email.svg";
import phoneIcon from "@/components/HOME/Phone.svg";
import instagramIcon from "@/components/HOME/Instagram.svg";
import Image from "next/image";
import Link from "next/link";

const SERVICOS = [
  "Consultoria Inicial",
  "Planejamento Estratégico",
  "Acompanhamento Mensal",
  "Revisão de Processos",
  "Mentoria Executiva",
  "Diagnóstico Financeiro",
];

const SEGMENTOS = ["Corporativo", "Autônomos", "Startups"];

export default function Home() {
  return (
    <main className="bg-orange-50 flex flex-col overflow-hidden">
      <Header />

      {/* Hero */}
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
            <Link
              href="/agendamentos"
              className="px-4 py-3 bg-secundaria rounded-[32px] flex justify-center items-center"
            >
              <span className="font-(family-name:--font-montserrat-sans) text-orange-50 text-lg lg:text-xl font-semibold">
                Agendar agora
              </span>
            </Link>
            <Link
              href="/status"
              className="px-4 py-3 bg-secundaria rounded-[32px] flex justify-center items-center"
            >
              <span className="font-(family-name:--font-montserrat-sans) text-orange-50 text-lg lg:text-xl font-semibold">
                Consultar status
              </span>
            </Link>
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
          <div className="w-44 h-72 left-[54.50px] top-[275.99px] absolute" />
          <Image
            src={notebook}
            alt=""
            className="w-45 h-68 left-[54px] top-[275px] absolute object-cover"
          />
          <Image
            src={vectorM}
            alt=""
            className="w-41 h-16 left-[255px] top-[403px] absolute"
          />
          <Image
            src={oculos}
            alt=""
            className="w-81.5 h-54.5 left-[255px] top-[117px] absolute rounded-2xl object-cover"
          />
          <Image
            src={vectorHourglass}
            alt=""
            className="w-23 h-32 left-[106px] top-[101px] absolute"
          />
          <Image
            src={vectorBurst}
            alt=""
            className="w-[158px] h-[136px] left-[177px] top-[542px] absolute"
          />
        </div>
      </section>

      {/* Sobre nós */}
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

        <div
          aria-hidden
          className="w-screen ml-translate-x-1/2 overflow-hidden"
        >
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

      {/* Segmentos */}
      <section className="bg-orange-50 flex flex-col items-center gap-16 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
        <h2 className="font-(family-name:--font-playfair) text-3xl lg:text-5xl font-semibold text-black">
          Segmentos
        </h2>

        <div className="flex flex-wrap justify-center items-start gap-10">
          {SEGMENTOS.map((segmento) => (
            <div
              key={segmento}
              className="w-72 lg:w-80 flex flex-col items-center gap-2.5"
            >
              <div className="self-stretch h-64 bg-zinc-300" />
              <p className="font-(family-name:--font-montserrat-sans) text-xl font-semibold text-black">
                {segmento}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4">
          <h3 className="font-(family-name:--font-montserrat-sans) text-2xl lg:text-3xl font-semibold text-black">
            Nos contate!
          </h3>
          <div className="flex flex-col items-center gap-2.5">
            <a
              href="mailto:estudiomurakami@email.com"
              className="flex items-center gap-4"
            >
              <Image src={emailIcon} alt="" className="size-7" aria-hidden />
              <span className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-black">
                estudiomurakami@email.com
              </span>
            </a>
            <a href="tel:+5599999999999" className="flex items-center gap-4">
              <Image src={phoneIcon} alt="" className="size-7" aria-hidden />
              <span className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-black">
                (99) 99999-9999
              </span>
            </a>
            <a
              href="https://instagram.com/estudiomurakami"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4"
            >
              <Image src={instagramIcon} alt="" className="size-7" aria-hidden />
              <span className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-black">
                @estudiomurakami
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-50 border-t border-black/20 px-6 sm:px-10 lg:px-16 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-(family-name:--font-montserrat-sans) text-base lg:text-xl font-semibold text-black text-center">
            © 2026 Estúdio Murakami • Todos os direitos reservados
          </p>
          <div className="flex items-center gap-4">
            <Link href="" className="text-sm text-neutral-800">
              Termos de Uso
            </Link>
            <Link href="" className="text-sm text-neutral-800">
              Política de Privacidade
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
