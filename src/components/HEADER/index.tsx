import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center px-12 py-4 justify-between bg-branco drop-shadow-2xl">
      <div className="relative h-20 w-20">
        <Image src="/img/Logo-nome-SemFundo.png" alt="" fill />
      </div>

      <div className="flex gap-8 items-center font-semibold">
        <h1 className="text-lg">Sobre nos</h1>
        <h1 className="text-lg">Agendamentos</h1>
        <h1 className="text-lg">Status</h1>
        <h1 className="text-lg">Contatos</h1>

        <button className="border xl px-2 py-2 text-xl rounded-2xl">
          Entrar
        </button>
        <button className="border px-2 py-2 text-2xl rounded-2xl bg-vermelho">
          Cadastrar-se
        </button>
      </div>
    </div>
  );
}
