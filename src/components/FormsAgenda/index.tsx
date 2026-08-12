"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import { DynamicTimePicker } from "../TimeSelecter";
import { ChangeEvent, FormEvent, useState } from "react";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { FormData } from "@/app/agendamentos/page";

interface FormsAgendaProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmitData?: (data: FormData) => void;
}

export default function FormsAgenda({
  formData,
  setFormData,
  onSubmitData,
}: FormsAgendaProps): React.JSX.Element {
  const inputStyle = "p-2 border border-bege rounded-lg w-full";

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setFormData((prev) => ({
      ...prev,
      data: newDate,
      horario: [],
    }));
  };

  const handleReservaConcluida = (range: string[]) => {
    setFormData((prev) => ({
      ...prev,
      horario: range,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.data || formData.horario.length === 0) {
      alert("Por favor, selecione uma data e ao menos um horário.");
      return;
    }

    console.log("Formulário Enviado com Sucesso:", formData);

    setFormData({
      nome: "",
      email: "",
      telefone: "",
      empresa: "",
      tipo: "",
      assunto: "",
      data: new Date(),
      horario: [],
    });
  };

  const dateFormatted = formData.data ? format(formData.data, "dd/MM") : "";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-6xl">
      <section className="flex flex-col py-12 px-6 gap-12 bg-gray-100 rounded-xl drop-shadow-xl w-full">
        {/* Seção 1: Seus Dados */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
              1
            </span>
            <h1 className="text-2xl font-semibold">Seus Dados</h1>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <h1>Nome Completo</h1>
              <input
                type="text"
                placeholder="Ana Paula"
                className={inputStyle}
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>E-mail</h1>
              <input
                type="email"
                placeholder="anapaula@exemplo.com"
                className={inputStyle}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Telefone</h1>
              <input
                type="text"
                placeholder="(99) 99999-9999"
                className={inputStyle}
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Empresa (Opcional)</h1>
              <input
                type="text"
                placeholder="Nome da minha empresa"
                className={inputStyle}
                name="empresa"
                value={formData.empresa}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Seção 2: Detalhes Reunião */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
              2
            </span>
            <h1 className="text-xl font-semibold">Detalhes da Reunião</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <h1>Tipo de Reunião</h1>
              <input
                type="text"
                className={inputStyle}
                placeholder="Consultoria Inicial"
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Assunto/Observações</h1>
              <textarea
                className={inputStyle}
                placeholder="Digite aqui brevemente o que gostaria de abordar..."
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* Seção 3: Data e Horário */}
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <span className="flex justify-center items-center bg-bege/50 w-7 h-7 rounded-full shrink-0 font-semibold">
              3
            </span>
            <h1 className="text-2xl font-semibold">
              Selecione uma data e um horário
            </h1>
          </div>
          <div className="flex flex-wrap flex-col lg:justify-center lg:flex-row justify-between gap-8">
            <Card size="default" className="min-w-60 max-h-100">
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={formData.data}
                  onSelect={handleDateChange}
                  className="p-0 [--cell-size:--spacing(8)] md:[--cell-size:--spacing(12)] lg:[--cell-size:--spacing(15)]"
                />
              </CardContent>
            </Card>
            <div className="flex flex-col gap-4">
              <h3>
                Horários Disponíveis {dateFormatted && `(${dateFormatted})`}
              </h3>
              <div>
                <DynamicTimePicker
                  selectedDate={formData.data}
                  onReserveSuccess={handleReservaConcluida}
                />
              </div>

              {formData.horario.length > 0 && (
                <div className="p-2 bg-bege/30 rounded text-sm text-center border">
                  Intervalo selecionado:{" "}
                  <strong>
                    {formData.horario[0]} até{" "}
                    {formData.horario[formData.horario.length - 1]}
                  </strong>
                </div>
              )}

              <p className="text-gray-500 text-xs">
                Fuso horário: Horário de Brasília (GMT-3)
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={!formData.data || formData.horario.length === 0}
              className="flex justify-center items-center gap-2 bg-primaria text-branco hover:scale-102 cursor-pointer py-4 rounded-lg w-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirmar Agendamento <ArrowRight />
            </button>
            <p className="text-primaria opacity-70 text-sm">
              Você receberá uma confirmação por Email
            </p>
          </div>
        </div>
      </section>
    </form>
  );
}
