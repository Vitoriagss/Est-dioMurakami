import Image from "next/image";
import { EmailIcon, InstagramIcon, PhoneIcon } from "../icons";
import autonomosImg from "../img/autonomos.jpg";
import corporativoImg from "../img/corporativo.jpg";
import startupImg from "../img/startup.jpg";

const SEGMENTOS = [
  { nome: "Corporativo", imagem: corporativoImg },
  { nome: "Autônomos", imagem: autonomosImg },
  { nome: "Startups", imagem: startupImg },
];

export function Segmentos() {
  return (
    <section className="bg-orange-50 flex flex-col items-center gap-16 px-6 sm:px-10 lg:px-16 py-16 lg:py-24">
      <h2 className="font-(family-name:--font-playfair) text-3xl lg:text-5xl font-semibold text-black">
        Segmentos
      </h2>

      <div className="flex flex-wrap justify-center items-start gap-10">
        {SEGMENTOS.map(({ nome, imagem }) => (
          <div
            key={nome}
            className="w-72 lg:w-80 flex flex-col items-center gap-2.5"
          >
            <Image
              src={imagem}
              alt={nome}
              className="self-stretch w-full h-64 object-cover border border-black/20"
            />
            <p className="font-(family-name:--font-montserrat-sans) text-xl font-semibold text-black">
              {nome}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        <h3 className="font-(family-name:--font-montserrat-sans) text-2xl lg:text-3xl font-semibold text-black">
          Nos contate!
        </h3>
        <div className="flex flex-col items-start sm:items-center gap-3 w-full sm:w-auto">
          <a
            href="mailto:estudiomurakami@email.com"
            className="flex items-center gap-4"
          >
            <EmailIcon className="size-6 sm:size-7 shrink-0" aria-hidden />
            <span className="font-(family-name:--font-montserrat-sans) text-base sm:text-lg lg:text-xl font-semibold text-black break-all sm:break-normal">
              estudiomurakami@email.com
            </span>
          </a>
          <a href="tel:+5599999999999" className="flex items-center gap-4">
            <PhoneIcon className="size-7" aria-hidden />
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
            <InstagramIcon className="size-7" aria-hidden />
            <span className="font-(family-name:--font-montserrat-sans) text-lg lg:text-xl font-semibold text-black">
              @estudiomurakami
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
