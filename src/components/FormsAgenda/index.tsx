"use client";

import * as React from "react";
import { Calendar } from "../ui/calendar";
import { ptBR } from "date-fns/locale";
import { Card, CardContent } from "../ui/card";
import { DynamicTimePicker } from "../TimeSelecter";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { FormData } from "@/app/agendamentos/page";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "next/navigation";

interface FormsAgendaProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmitData?: (data: FormData) => void;
}

type FormErrors = {
  nome?: string;
  email?: string;
  telefone?: string;
  tipo?: string;
  assunto?: string;
  data?: string;
  horario?: string;
};

export default function FormsAgenda({
  formData,
  setFormData,
  onSubmitData,
}: FormsAgendaProps): React.JSX.Element {
  const inputStyle = "p-2 border border-bege rounded-lg w-full";

  const [errors, setErrors] = useState<FormErrors>({});
  const [isMounted, setIsMounted] = useState(false);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);

  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  useEffect(() => {
    setIsMounted(true);

    if (editId) {
      const savedData = localStorage.getItem("agendamentos");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          const itemParaEditar = parsedData.find((a: any) => a.id === editId);

          if (itemParaEditar) {
            setFormData({
              nome: itemParaEditar.nomeCliente,
              email: itemParaEditar.email,
              telefone: itemParaEditar.telefone,
              empresa: itemParaEditar.empresa || "",
              tipo: itemParaEditar.tipo,
              assunto: itemParaEditar.assunto,
              data: new Date(itemParaEditar.data),
              horario: itemParaEditar.horario || [],
            });
            toast.info("Modo de edição: você pode alterar seus dados.");
          }
        } catch (error) {
          console.error("Erro ao carregar edição", error);
        }
      }
    }
  }, [editId, setFormData]);

  useEffect(() => {
    if (!formData?.data) return;

    const savedData = localStorage.getItem("agendamentos");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Filtra os agendamentos do mesmo dia
      const ocupadosNoDia = parsedData.filter((a: any) => {
        // Ignora os cancelados
        if (a.status === "cancelado") return false;
        // Ignora o próprio agendamento sendo editado (para liberar o horário dele mesmo)
        if (editId && a.id === editId) return false;
        
        const dataSalva = new Date(a.data).toDateString();
        const dataSelecionada = formData.data!.toDateString();
        return dataSalva === dataSelecionada;
      });

      // Extrai todos os horários que já foram pegos
      const arrayDeHorarios = ocupadosNoDia.flatMap((a: any) => a.horario || []);
      setHorariosOcupados(arrayDeHorarios);
    }
  }, [formData?.data, editId]);

  if (!isMounted) return <></>;

  const horarios = formData?.horario || [];
  const isButtonDisabled = !formData?.nome || !formData?.email;

  const FieldError = ({ message }: { message?: string }) => {
    if (!message) return null;
    return (
      <span className="text-red-500 text-xs font-medium mt-1">{message}</span>
    );
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
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
      horario: Array.isArray(range) ? range : [],
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: FormErrors = {};

    if (!formData?.nome || formData.nome.trim().length < 3) {
      newErrors.nome = "O nome completo deve ter pelo menos 3 caracteres.";
    }

    const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);
    if (!formData?.email || !isValidEmail(formData.email)) {
      newErrors.email =
        "Por favor, insira um e-mail válido (ex: nome@dominio.com).";
    }

    const phoneDigits = (formData?.telefone || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      newErrors.telefone =
        "Informe um número de telefone/Whatsapp válido com DDD";
    }

    if (!formData?.tipo) {
      newErrors.tipo = "Selecione ou digite o tipo de reunião.";
    }

    if (!formData?.data || horarios.length === 0) {
      newErrors.horario =
        "Por favor, selecione uma data e ao menos um horário!";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Preencha os campos destacados corretamente.", {
        toastId: "form-errors",
      });
      return;
    }

    setErrors({});

const novoAgendamento = {
      id: editId || crypto.randomUUID(), // Mantém o ID se for edição
      nomeCliente: formData.nome,
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      empresa: formData.empresa,
      tipo: formData.tipo,
      assunto: formData.assunto,
      descricao: formData.assunto,
      servico: { nome: formData.tipo },
      data: formData.data ? formData.data.toISOString() : new Date().toISOString(),
      horaInicio: horarios[0] || "",
      horaFim: horarios[horarios.length - 1] || "",
      horario: horarios,
      status: "pendente" as const,
    };

    try {
      const dadosSalvos = localStorage.getItem("agendamentos");
      const listaExistente = dadosSalvos ? JSON.parse(dadosSalvos) : [];
      let novaLista;

      if (editId) {
        // Substitui o agendamento antigo pelo atualizado
        novaLista = listaExistente.map((item: any) => item.id === editId ? novoAgendamento : item);
      } else {
        // Adiciona um novo
        novaLista = Array.isArray(listaExistente) ? [...listaExistente, novoAgendamento] : [listaExistente, novoAgendamento];
      }

      localStorage.setItem("agendamentos", JSON.stringify(novaLista));
      toast.success(editId ? "Agendamento atualizado com sucesso!" : "Agendamento salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar os dados no navegador.");
    }

    if (onSubmitData) {
      onSubmitData(formData);
    }

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

  const dateFormatted = formData?.data ? format(formData.data, "dd/MM") : "";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-4 max-w-6xl"
    >
      <ToastContainer position="top-right" autoClose={3000} />
      <section className="flex flex-col py-12 px-6 gap-12 bg-gray-100 rounded-xl drop-shadow-xl w-full">
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
                className={`${inputStyle} ${errors.nome ? "border-red-500 bg-red-50" : ""}`}
                name="nome"
                value={formData?.nome || ""}
                onChange={handleChange}
                required
              />
              <FieldError message={errors.nome} />
            </div>
            <div className="flex flex-col gap-2">
              <h1>E-mail</h1>
              <input
                type="email"
                placeholder="anapaula@exemplo.com"
                className={`${inputStyle} ${errors.email ? "border-red-500 bg-red-50" : ""}`}
                name="email"
                value={formData?.email || ""}
                onChange={handleChange}
                required
              />
              <FieldError message={errors.email} />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Telefone</h1>
              <input
                type="text"
                placeholder="(99) 99999-9999"
                className={`${inputStyle} ${errors.telefone ? "border-red-500 bg-red-50" : ""}`}
                name="telefone"
                value={formData?.telefone || ""}
                onChange={handleChange}
                required
              />
              <FieldError message={errors.telefone} />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Empresa (Opcional)</h1>
              <input
                type="text"
                placeholder="Nome da minha empresa"
                className={`${inputStyle}`}
                name="empresa"
                value={formData?.empresa || ""}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

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
                className={`${inputStyle} ${errors.tipo ? "border-red-500 bg-red-50" : ""}`}
                placeholder="Consultoria Inicial"
                name="tipo"
                value={formData?.tipo || ""}
                onChange={handleChange}
                required
              />
              <FieldError message={errors.tipo} />
            </div>
            <div className="flex flex-col gap-2">
              <h1>Assunto/Observações</h1>
              <textarea
                className={`${inputStyle} ${errors.assunto ? "border-red-500 bg-red-50" : ""}`}
                placeholder="Digite aqui brevemente o que gostaria de abordar..."
                name="assunto"
                value={formData?.assunto || ""}
                onChange={handleChange}
                required
              />
              <FieldError message={errors.assunto} />
            </div>
          </div>
        </div>

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
            <Card size="default" className="min-w-60 h-fit">
              <CardContent className="flex justify-center">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={formData?.data}
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
                  selectedDate={formData?.data}
                  onReserveSuccess={handleReservaConcluida}
                  horariosOcupados={horariosOcupados}
                />
              </div>

              {horarios.length > 0 && (
                <div className="p-2 bg-bege/30 rounded text-sm text-center border">
                  Intervalo selecionado:{" "}
                  <strong>
                    {horarios[0]} até {horarios[horarios.length - 1]}
                  </strong>
                </div>
              )}

              <FieldError message={errors.horario} />

              <p className="text-gray-500 text-xs">
                Fuso horário: Horário de Brasília (GMT-3)
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button
              type="submit"
              disabled={isButtonDisabled}
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
