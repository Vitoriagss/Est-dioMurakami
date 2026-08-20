"use client";

import FormsAgenda from "@/components/FormsAgenda";
import Header from "@/components/HEADER";
import { Calendar, Clock, Info, Mail, MapPin, Phone, User, ChevronLeft } from "lucide-react"; 
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  tipo: string;
  assunto: string;
  data: Date | undefined;
  horario: string[];
}

export default function Agendamentos() {
  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    empresa: "",
    tipo: "",
    assunto: "",
    data: new Date(),
    horario: [],
  });

  const handleFinalSubmit = (data: FormData) => {
    console.log("Formulário submetido para a API:", data);
    alert("Agendamento efetuado com sucesso!");
  };

  const dataFormatada = formData.data
    ? format(formData.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })
    : "Selecione uma data";

  const horarioFormatado =
    formData.horario.length > 0
      ? `${formData.horario[0]} às ${formData.horario[formData.horario.length - 1]}`
      : "Selecione um horário";

  return (
    <main className="bg-branco grow">
      <Header />
      <div className="container mx-auto flex flex-col px-4 md:px-16 pt-32 pb-12 md:pt-40 gap-4">
        <div className="flex justify-between items-center w-full mb-6 md:mb-10">
          <Link
            href="/"
            className="flex items-center text-vermelho hover:opacity-80 transition-opacity w-fit font-medium"
          >
            <ChevronLeft size={20} />
            Voltar para o início
          </Link>
        </div>
        
        {/* Título */}
        <section>
          <div className="flex flex-col gap-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-center lg:text-start">
              Agende sua Reunião
            </h1>
            <p className="text-gray-500 text-center lg:text-start">
              Escolha o melhor horário para conversar com nossa equipe. Rápido,
              fácil e sem complicações.
            </p>
          </div>
        </section>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8 items-center">
          <section className="flex justify-center">
            <FormsAgenda
              formData={formData}
              setFormData={setFormData}
              onSubmitData={handleFinalSubmit}
            />
          </section>

          <section className="flex flex-col gap-16 px-6">
            <div className="bg-orange-50 hidden lg:flex flex-col w-full gap-4 p-4 rounded-lg border border-bege">
              <div className="flex items-center gap-2">
                <span className="flex bg-gray-100/75 justify-center items-center h-10 w-10 rounded-full shrink-0">
                  <User size="25px" />
                </span>
                <div>
                  <p className="text-gray-800 text-sm">CLIENTE</p>
                  <p className="text-lg font-semibold">
                    {formData.nome.trim() !== ""
                      ? formData.nome
                      : "Nome cliente"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex bg-gray-100/75 justify-center items-center h-10 w-10 rounded-full shrink-0">
                  <Info size="25px" />
                </span>
                <div>
                  <p className="text-gray-800 text-sm">SERVIÇO</p>
                  <p className="text-lg font-semibold">
                    {formData.tipo.trim() !== ""
                      ? formData.tipo
                      : "Consultoria Inicial"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="flex bg-gray-100/75 justify-center items-center h-10 w-10 rounded-full shrink-0">
                  <Calendar size="25px" />
                </span>
                <div>
                  <p className="text-gray-800 text-sm">DATA E HORÁRIO</p>
                  <p className="text-base font-semibold">{dataFormatada}</p>
                  <p className="text-sm font-medium text-gray-600">
                    {horarioFormatado}
                  </p>
                </div>
              </div>
            </div>

            {/* Informações Gerais */}
            <div className="flex flex-col gap-4 px-6 mx-4">
              <h1 className="text-xl font-semibold">Informações Gerais</h1>
              <p className="flex gap-2 text-gray-700 text-sm">
                <Mail />
                contato@murakami.com
              </p>
              <p className="flex gap-2 text-gray-700 text-sm">
                <Phone />
                +55 (11) 4003-8888
              </p>
              <p className="flex gap-2 text-gray-700 text-sm">
                <MapPin />
                Av. Paulista, 1000 - Bela Vista, São Paulo/SP
              </p>
              <p className="flex gap-2 text-gray-700 text-sm">
                <Clock />
                Seg–Sex, 08:00–18:00
              </p>
            </div>

            <div className="relative hidden lg:flex h-50 w-50 xl:h-100 xl:w-100">
              <Image src="/img/Icone.png" alt="" fill />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
