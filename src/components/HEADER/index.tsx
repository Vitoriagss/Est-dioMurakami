import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="fixed top-0 z-50 w-full bg-branco drop-shadow-lg">
      <div className="container mx-auto flex items-center top-0 z-50 px-4 md:px-12 py-4 justify-between">
        <Link href="/#" className="relative h-20 w-20 shrink-0">
          <Image
            src="/img/Logo-nome-SemFundo.png"
            alt=""
            fill
            sizes="100px"
            className="object-contain"
          />
        </Link>
        <div className="flex gap-4 lg:gap-8 items-center font-semibold">
          <div className="flex items-center gap-4">
            <Link href="/#sobre" className="hidden lg:flex text-lg">
              Sobre nos
            </Link>
            <Link href="/#segmentos" className="hidden lg:flex text-lg">
              Segmentos
            </Link>
            <Link href="/agendamentos" className="text-md lg:text-lg">
              Agendamentos
            </Link>
            <Link href="/status" className="text-md lg:text-lg">
              Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
