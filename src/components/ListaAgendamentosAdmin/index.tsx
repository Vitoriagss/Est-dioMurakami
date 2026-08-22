"use client";

import { useMemo, useState } from "react";
import { Agendamento } from "@/lib/types";
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Tag,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";
import {
  cancelarAgendamento,
  confirmarAgendamento,
} from "@/lib/buscarAgendamento";
import CancelamentoModal from "@/components/CancelamentoModal";
import ConfirmacaoModal from "@/components/ConfirmacaoModal";
import { toast } from "sonner";

interface Props {
  agendamentos: Agendamento[];
  onAtualizarStatus?: () => void;
}

type FiltroStatus = "todos" | "pendente" | "confirmado" | "cancelado";

export default function ListaAgendamentosAdmin({
  agendamentos,
  onAtualizarStatus,
}: Props) {
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>(null);
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const parseDataAgendamento = (dataStr: string, horaStr?: string) => {
    if (!dataStr) return new Date(0);

    const hora = horaStr || "00:00";
    let ano = 0,
      mes = 0,
      dia = 0;

    // Trata formato ISO/HTML: "YYYY-MM-DD" ou "YYYY-MM-DDT..."
    if (dataStr.includes("-")) {
      const dataLimpa = dataStr.split("T")[0];
      const partes = dataLimpa.split("-");
      ano = parseInt(partes[0], 10);
      mes = parseInt(partes[1], 10) - 1; // Mês no JS vai de 0 a 11
      dia = parseInt(partes[2], 10);
    }
    // Trata formato BR: "DD/MM/YYYY"
    else if (dataStr.includes("/")) {
      const partes = dataStr.split("/");
      dia = parseInt(partes[0], 10);
      mes = parseInt(partes[1], 10) - 1;
      ano = parseInt(partes[2], 10);
    } else {
      return new Date(0);
    }

    const [horas, minutos] = hora.split(":").map((n) => parseInt(n, 10) || 0);

    return new Date(ano, mes, dia, horas, minutos);
  };

  // Manipulação do Cancelamento (CRUD)
  const handleConfirmarCancelamento = async () => {
    if (!agendamentoSelecionado) return;
    try {
      await cancelarAgendamento(agendamentoSelecionado.id);
      setIsCancelModalOpen(false);

      // Atualiza o drawer selecionado
      setAgendamentoSelecionado((prev) =>
        prev ? { ...prev, status: "cancelado" } : null,
      );

      toast.success("Agendamento cancelado");

      // Recarrega os dados na tela do Admin
      if (onAtualizarStatus) {
        onAtualizarStatus();
      }
    } catch (error) {
      console.error("Erro ao cancelar agendamento", error);
      toast.error("Erro ao cancelar o agendamento.");
    }
  };

  const handleConfirmar = async () => {
    if (!agendamentoSelecionado) return;
    try {
      await confirmarAgendamento(agendamentoSelecionado.id);
      setIsConfirmModalOpen(false);

      setAgendamentoSelecionado((prev) =>
        prev ? { ...prev, status: "confirmado" } : null,
      );

      toast.success("Agendamento confirmado");

      if (onAtualizarStatus) {
        onAtualizarStatus();
      }
    } catch (error) {
      console.error("Erro ao confirmar agendamento", error);
      toast.error("Erro ao confirmar o agendamento.");
    }
  };

  const getStatusBadge = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "confirmado":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
            Confirmado
          </span>
        );
      case "cancelado":
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
            Cancelado
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
            Pendente
          </span>
        );
    }
  };

  const agendamentosFiltradosEOrdenados = useMemo(() => {
    const agora = new Date();

    return agendamentos
      .filter((item) => {
        const dataAgendamento = parseDataAgendamento(
          item.data,
          item.horaFim || item.horaInicio,
        );
        return dataAgendamento >= agora;
      })
      .filter((item) => {
        if (filtroStatus === "todos") return true;
        const statusItem = (item.status || "pendente").toLowerCase();
        return statusItem === filtroStatus;
      })
      .sort((a, b) => {
        const dataA = parseDataAgendamento(a.data, a.horaInicio).getTime();
        const dataB = parseDataAgendamento(b.data, b.horaInicio).getTime();
        return dataA - dataB;
      });
  }, [agendamentos, filtroStatus]);

  const formatarData = (dataIso: string) => {
    if (!dataIso) return "—";
    const parsedDate = new Date(
      dataIso.includes("T") ? dataIso : `${dataIso}T00:00:00`,
    );
    if (isNaN(parsedDate.getTime())) return dataIso;

    return parsedDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="w-full flex gap-6 items-start">
      {/* Tabela / Lista de Agendamentos */}
      <div className="bg-white rounded-2xl px-4 w-full py-2 gap-2 shadow-sm border border-bege overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Agendamentos Realizados
          </h2>
          <p className="text-sm text-gray-500">
            Clique em qualquer item para visualizar todos os detalhes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-slate-50 w-fit p-1 rounded-xl border border-gray-100">
          <Filter size={16} className="text-gray-400 ml-2 hidden sm:block" />
          <button
            onClick={() => setFiltroStatus("todos")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filtroStatus === "todos"
                ? "bg-white text-gray-800 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFiltroStatus("pendente")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filtroStatus === "pendente"
                ? "bg-yellow-100 text-yellow-800 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Pendentes
          </button>
          <button
            onClick={() => setFiltroStatus("confirmado")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filtroStatus === "confirmado"
                ? "bg-green-100 text-green-800 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Confirmados
          </button>
          <button
            onClick={() => setFiltroStatus("cancelado")}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              filtroStatus === "cancelado"
                ? "bg-red-100 text-red-800 shadow-sm font-semibold"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Cancelados
          </button>
        </div>

        {agendamentosFiltradosEOrdenados.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            Nenhum agendamento encontrado no sistema.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Cliente</th>
                  <th className="px-6 py-4">Serviço</th>
                  <th className="px-6 py-4">Data / Hora</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {agendamentosFiltradosEOrdenados.map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => setAgendamentoSelecionado(item)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {item.nomeCliente}
                    </td>
                    <td className="px-6 py-4">
                      {typeof item.servico === "string"
                        ? item.servico
                        : item.servico?.nome}
                    </td>
                    <td className="px-6 py-4">
                      {item.data} às {item.horaInicio}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(item.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Painel Lateral (Drawer) */}

      {agendamentoSelecionado && (
        <section className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 lg:top-0 lg:left-0 lg:translate-x-0 lg:translate-y-0 lg:static px-12 py-8 bg-white max-w-100 w-full h-fit shadow-2xl rounded-lg">
          <div className="flex">
            <div className="w-full max-w-md bg-white h-full overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
              <div>
                <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-800">
                    Detalhes do Agendamento
                  </h3>
                  <button
                    onClick={() => setAgendamentoSelecionado(null)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-red-50 text-primaria rounded-xl">
                      <User size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium">
                        Cliente
                      </p>
                      <p className="text-lg font-bold text-gray-800">
                        {agendamentoSelecionado.nomeCliente}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Mail size={18} className="text-gray-400" />
                      <span>
                        {agendamentoSelecionado.email || "Não informado"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Phone size={18} className="text-gray-400" />
                      <span>
                        {agendamentoSelecionado.telefone || "Não informado"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Tag size={18} className="text-gray-400" />
                      <span>
                        Serviço:{" "}
                        <strong>
                          {typeof agendamentoSelecionado.servico === "string"
                            ? agendamentoSelecionado.servico
                            : agendamentoSelecionado.servico?.nome}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Calendar size={18} className="text-gray-400" />
                      <span>Data: {agendamentoSelecionado.data}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-700">
                      <Clock size={18} className="text-gray-400" />
                      <span>
                        Horário: {agendamentoSelecionado.horaInicio} -{" "}
                        {agendamentoSelecionado.horaFim}
                      </span>
                    </div>
                    <div className="pt-2">
                      <p className="text-xs text-gray-400 font-medium mb-1">
                        Status Atual
                      </p>
                      {getStatusBadge(agendamentoSelecionado.status)}
                    </div>
                    {agendamentoSelecionado.descricao && (
                      <div className="pt-2">
                        <p className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1">
                          <FileText size={14} /> Observações / Assunto
                        </p>
                        <p className="p-3 bg-gray-50 rounded-xl text-sm text-gray-600 border border-gray-100">
                          {agendamentoSelecionado.descricao}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="pt-6 border-t border-gray-100">
                {agendamentoSelecionado.status !== "cancelado" && (
                  <div className="flex gap-3 w-full">
                    {agendamentoSelecionado.status === "pendente" && (
                      <button
                        onClick={() => setIsConfirmModalOpen(true)}
                        className="flex-1 py-2.5 px-4 text-sm font-semibold text-green-700 bg-green-50 border border-green-600 rounded-xl hover:bg-green-100 transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle size={16} /> Confirmar
                      </button>
                    )}
                    <button
                      onClick={() => setIsCancelModalOpen(true)}
                      className="flex-1 py-2.5 px-4 text-sm font-semibold text-red-700 bg-red-50 border border-red-600 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                    >
                      <XCircle size={16} /> Cancelar
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setAgendamentoSelecionado(null)}
                  className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {isCancelModalOpen && agendamentoSelecionado && (
        <CancelamentoModal
          agendamento={agendamentoSelecionado}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleConfirmarCancelamento}
        />
      )}

      {isConfirmModalOpen && agendamentoSelecionado && (
        <ConfirmacaoModal
          agendamento={agendamentoSelecionado}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmar}
        />
      )}
    </div>
  );
}
