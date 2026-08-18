import Link from "next/link";
import type { ReactNode } from "react";

interface ButtonProps {
  href: string;
  children: ReactNode;
}

export function Button({ href, children }: ButtonProps) {
  return (
    <Link
      href={href}
      className="px-4 py-3 bg-secundaria rounded-[32px] flex justify-center items-center"
    >
      <span className="font-(family-name:--font-montserrat-sans) text-orange-50 text-lg lg:text-xl font-semibold">
        {children}
      </span>
    </Link>
  );
}
