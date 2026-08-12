import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="flex items-center px-6 py-4 justify-between bg-branco drop-shadow-2xl">
      <div className="relative h-20 w-20">
        <Image src="/img/Logo-nome-SemFundo.png" alt="" fill />
      </div>

      <div className="flex gap-4 md:gap-8 items-center font-semibold">
        <div className="flex items-center gap-4">
          <Link href="" className="hidden md:flex text-lg">
            Sobre nos
          </Link>
          <Link href="" className="text-md md:text-lg">
            Agendamentos
          </Link>
          <Link href="" className="text-md md:text-lg">
            Status
          </Link>
          <Link href="" className="hidden md:flex text-lg">
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
  );
}
