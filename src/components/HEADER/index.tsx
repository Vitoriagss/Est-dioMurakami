import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="sticky top-0 z-50 w-full bg-branco drop-shadow-lg">
      <div className="container mx-auto  flex items-center sticky top-0 z-50 px-12 py-4 justify-between">
        <Link href="/" className="relative h-20 w-20">
          <Image src="/img/Logo-nome-SemFundo.png" alt="" fill sizes="100px" />
        </Link>
        <div className="flex gap-4 lg:gap-8 items-center font-semibold">
          <div className="flex items-center gap-4">
            <Link href="/#sobre" className="hidden lg:flex text-lg">
              Sobre nos
            </Link>
            <Link href="/agendamentos" className="text-md lg:text-lg">
              Agendamentos
            </Link>
            <Link href="/status" className="text-md lg:text-lg">
              Status
            </Link>
            <Link href="" className="hidden lg:flex text-lg">
              Projetos
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center border xl px-1 py-1 lg:py-2 lg:px-2 text-md lg:text-xl rounded-2xl">
              Entrar
            </button>
            <button className="flex items-center border px-1 py-1 lg:py-2 lg:px-2 text-lg lg:text-2xl rounded-2xl bg-vermelho">
              Cadastrar-se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
