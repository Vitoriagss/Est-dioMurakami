import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-orange-50 border-t border-black/20 py-6 sm:py-8">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-10 lg:px-16">
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
  );
}
