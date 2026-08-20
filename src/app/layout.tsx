import type { Metadata } from "next";
import { Montserrat, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const montserrat = Montserrat({
  variable: "--font-montserrat-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estúdio Murakami | Agendamentos",
  description: "Faça seu agendamento de forma fácil e rápida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={cn(
        "h-full",
        "antialiased",
        montserrat.variable,
        playfairDisplay.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body className="min-h-full flex flex-col bg-branco grow">
        {children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
