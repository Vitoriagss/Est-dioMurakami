"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SECTION_IDS = ["sobre", "segmentos"];

export default function Header() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection("");
      return;
    }

    const sections = SECTION_IDS.map((id) =>
      document.getElementById(id),
    ).filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      {
        // Trigger when a section is crossing the vertical center of the
        // viewport, accounting for the fixed header's height.
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  const linkClasses = (path: string) => {
    const isActive =
      pathname === path ||
      hash === path ||
      (activeSection !== "" && path === `/#${activeSection}`);

    return isActive
      ? "text-md lg:text-lg font-bold text-vermelho border-b-2 border-vermelho"
      : "text-md lg:text-lg text-primaria hover:text-secundaria transition-colors";
  };

  return (
    <div className="fixed top-0 z-50 w-full bg-branco drop-shadow-lg">
      <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3 md:px-12 md:py-4">
        <Link
          href="/#"
          className="relative h-14 w-14 shrink-0 sm:h-16 sm:w-16 lg:h-20 lg:w-20"
        >
          <Image
            src="/img/Logo-nome-SemFundo.png"
            alt="Logo Estúdio Murakami"
            fill
            sizes="(min-width: 1024px) 100px, 64px"
            className="object-contain"
          />
        </Link>
        <nav className="flex flex-wrap items-center justify-end gap-4 font-semibold lg:gap-8">
          <Link
            href="/#sobre"
            className={`hidden lg:inline ${linkClasses("/#sobre")}`}
          >
            Sobre nós
          </Link>
          <Link
            href="/#segmentos"
            className={`hidden lg:inline ${linkClasses("/#segmentos")}`}
          >
            Segmentos
          </Link>
          <Link href="/agendamentos" className={linkClasses("/agendamentos")}>
            Agendamentos
          </Link>
          <Link href="/status" className={linkClasses("/status")}>
            Status
          </Link>
        </nav>
      </div>
    </div>
  );
}
