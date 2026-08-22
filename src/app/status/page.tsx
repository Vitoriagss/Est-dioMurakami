"use client";

import {
  buscarAgendamentoPorContato,
  cancelarAgendamento,
  confirmarAgendamento,
} from "@/lib/buscarAgendamento";
import { Agendamento } from "@/lib/types";
import CancelamentoModal from "@/components/CancelamentoModal";
import ConfirmacaoModal from "@/components/ConfirmacaoModal";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import Header from "@/components/HEADER";

export default function StatusPage() {
  const [busca, setBusca] = useState("");
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [idSelecionado, setIdSelecionado] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setAgendamentos([]);

    try {
      const resultados = await buscarAgendamentoPorContato(busca);
      if (!resultados || resultados.length === 0) {
        setErro("Nenhum agendamento encontrado com esse e-mail ou telefone.");
        return;
      }
      setAgendamentos(resultados);
    } catch (error) {
      console.error("Erro ao buscar agendamento", error);
      setErro("Não foi possível buscar os agendamentos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmarCancelamento = async () => {
    if (!idSelecionado) return;
    try {
      await cancelarAgendamento(idSelecionado);
      // Atualiza apenas o status do item correto na lista
      setAgendamentos((prev) => prev.filter((ag) => ag.id !== idSelecionado));

      setIsCancelModalOpen(false);
      toast.success("Agendamento cancelado com sucesso!");
    } catch (error) {
      console.error("Erro ao cancelar agendamento", error);
      toast.error("Erro ao cancelar o agendamento.");
    }
  };

  if (!isMounted) {
    return null;
  }

  // Pega o objeto completo do agendamento selecionado para passar para os modais
  const agendamentoSelecionado =
    agendamentos.find((ag) => ag.id === idSelecionado) || null;

  return (
    <main className="grow py-12 pt-32 pb-12 md:pt-40">
      <Header />

      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex justify-between items-center w-full mb-6">
          <Link
            href="/"
            className="flex items-center text-vermelho hover:opacity-80 transition-opacity w-fit"
          >
            <ChevronLeft size={20} />
            Voltar para o início
          </Link>

          <div className="relative w-12 h-12 sm:w-16 sm:h-16 shrink-0">
            <Image
              src="/img/Icone.png"
              alt=""
              fill
              sizes="100px"
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="font-(family-name:--font-playfair) text-3xl sm:text-4xl font-bold text-center mb-2 text-primaria">
          Consultar Agendamentos
        </h1>
        <p className="text-center text-secundaria mb-8">
          Digite o e-mail ou telefone usado no momento do agendamento.
        </p>

        <div className="max-w-2xl mx-auto">
          <form
            onSubmit={handleBuscar}
            className="flex flex-col sm:flex-row gap-3 mb-8"
          >
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="E-mail ou telefone"
              required
              className="grow p-3 border border-bege rounded-2xl focus:outline-none focus:ring-2 focus:ring-vermelho"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-primaria text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer"
            >
              {loading ? "Buscando..." : "Buscar"}
            </button>
          </form>
          {erro && <p className="text-center text-vermelho mb-6">{erro}</p>}
        </div>

        {agendamentos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {agendamentos.map((agendamento) => (
              <div
                key={agendamento.id}
                className="bg-white rounded-2xl shadow-md p-6 flex flex-col border border-bege"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-primaria truncate pr-2">
                    {agendamento.nomeCliente}
                  </h2>
                  <StatusBadge status={agendamento.status} />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm mb-4 grow">
                  <div>
                    <p className="text-secundaria">Serviço</p>
                    <p className="font-medium">
                      {agendamento.servico?.nome ?? "—"}
                    </p>
                  </div>
                  <div>
                    <p className="text-secundaria">Data</p>
                    <p className="font-medium">
                      {formatarData(agendamento.data)}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-secundaria">Horário</p>
                    <p className="font-medium">
                      {agendamento.horaInicio} - {agendamento.horaFim}
                    </p>
                  </div>
                  {agendamento.descricao && (
                    <div className="col-span-2">
                      <p className="text-secundaria text-sm">Descrição</p>
                      <p className="text-gray-700 mt-1 line-clamp-3">
                        {agendamento.descricao}
                      </p>
                    </div>
                  )}
                </div>

                {agendamento.status !== "cancelado" && (
                  <div className="flex flex-col items-center gap-3 pt-4 border-t border-gray-100 mt-auto">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                      <button
                        onClick={() => {
                          setIdSelecionado(agendamento.id);
                          setIsCancelModalOpen(true);
                        }}
                        className="w-full sm:w-auto flex-1 px-4 py-2 text-sm rounded-xl border border-vermelho text-vermelho hover:bg-vermelho/10 transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                    </div>

                    <Link
                      href={`/agendamentos?edit=${agendamento.id}`}
                      className="text-xs font-medium text-gray-500 hover:text-primaria underline transition-colors"
                    >
                      Editar agendamento
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isCancelModalOpen && agendamentoSelecionado && (
        <CancelamentoModal
          agendamento={agendamentoSelecionado}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleConfirmarCancelamento}
        />
      )}
    </main>
  );
}

function StatusBadge({ status }: { status: Agendamento["status"] }) {
  const config = {
    pendente: { label: "Pendente", classes: "bg-bege text-primaria" },
    confirmado: { label: "Confirmado", classes: "bg-secundaria text-white" },
    cancelado: { label: "Cancelado", classes: "bg-vermelho text-white" },
  };

  const statusFormatado = status?.toLowerCase() as keyof typeof config;
  const { label, classes } = config[statusFormatado] || config.pendente;

  return (
    <span className={`text-xs font-medium px-3 py-1 rounded-full ${classes}`}>
      {label}
    </span>
  );
}

function formatarData(dataIso: string) {
  if (!dataIso) return "—";
  const parsedDate = new Date(dataIso);
  if (isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
