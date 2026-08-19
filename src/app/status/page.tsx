"use client";

import { buscarAgendamentoPorContato, cancelarAgendamento, confirmarAgendamento } from "@/lib/buscarAgendamento";
import { Agendamento } from "@/lib/types";
import CancelamentoModal from "@/components/CancelamentoModal";
import ConfirmacaoModal from "@/components/ConfirmacaoModal";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

export default function StatusPage() {
  const [busca, setBusca] = useState("");
  const [agendamento, setAgendamento] = useState<Agendamento | null>(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleBuscar = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro(null);
    setAgendamento(null);

    try {
      const resultado = await buscarAgendamentoPorContato(busca);
      if (!resultado) {
        setErro("Nenhum agendamento encontrado com esse e-mail ou telefone.");
        return;
      }
      setAgendamento(resultado);
    } catch (error) {
      console.error("Erro ao buscar agendamento", error);
      setErro("Não foi possível buscar o agendamento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

    const handleConfirmarCancelamento = async () => {
    if (!agendamento) return;
    try {
        await cancelarAgendamento(agendamento.id);
        setAgendamento({ ...agendamento, status: "cancelado" });
        setIsCancelModalOpen(false);
        toast.success("Agendamento cancelado com sucesso!");
    } catch (error) {
        console.error("Erro ao cancelar agendamento", error);
        setErro("Não foi possível cancelar o agendamento. Tente novamente.");
        toast.error("Erro ao cancelar o agendamento.");
    }
    };

    const handleConfirmar = async () => {
    if (!agendamento) return;
    try {
      if (confirmarAgendamento) {
        await confirmarAgendamento(agendamento.id);
      }
      
      setAgendamento({ ...agendamento, status: "confirmado" });
      setIsConfirmModalOpen(false);
      toast.success("Agendamento confirmado com sucesso!");
    } catch (error) {
      console.error("Erro ao confirmar agendamento", error);
      toast.error("Erro ao confirmar o agendamento.");
    }
  };

  return (
    <main className="grow py-12 bg-branco">
      <div className="container mx-auto px-4 max-w-2xl">
        <Link
          href="/"
          className="flex items-center text-vermelho hover:opacity-80 transition-opacity mb-6 w-fit"
        >
          <ChevronLeft size={20} />
          Voltar para o início
        </Link>

        <h1 className="font-(family-name:--font-playfair) text-3xl sm:text-4xl font-bold text-center mb-2 text-primaria">
          Consultar Agendamento
        </h1>
        <p className="text-center text-secundaria mb-8">
          Digite o e-mail ou telefone usado no momento do agendamento. (teste com: ana@email.com, rodrigo@email.com ou mariana@email.com)
        </p>

        <form onSubmit={handleBuscar} className="flex flex-col sm:flex-row gap-3 mb-8">
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
            className="bg-primaria text-white px-6 py-3 rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {loading ? "Buscando..." : "Buscar"}
          </button>
        </form>

        {erro && <p className="text-center text-vermelho mb-6">{erro}</p>}

        {agendamento && (
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-4 border border-bege">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-primaria">{agendamento.nomeCliente}</h2>
              <StatusBadge status={agendamento.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-secundaria">Serviço</p>
                <p className="font-medium">{agendamento.servico?.nome ?? "—"}</p>
              </div>
              <div>
                <p className="text-secundaria">Data</p>
                <p className="font-medium">{formatarData(agendamento.data)}</p>
              </div>
              <div>
                <p className="text-secundaria">Horário</p>
                <p className="font-medium">{agendamento.horaInicio} - {agendamento.horaFim}</p>
              </div>
            </div>

            {agendamento.descricao && (
              <div>
                <p className="text-secundaria text-sm">Descrição</p>
                <p>{agendamento.descricao}</p>
              </div>
            )}

            {agendamento.status !== "cancelado" && (
              <div className="flex flex-col sm:flex-row gap-4 pt-2">

                {agendamento.status === "pendente" && (
                  <button
                    onClick={() => setIsConfirmModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-2 rounded-2xl border border-green-600 text-green-600 hover:bg-green-100 transition-colors"
                  >
                    Confirmar agendamento
                  </button>
                )}

                <button
                  onClick={() => setIsCancelModalOpen(true)}
                  className="w-full sm:w-auto px-6 py-2 rounded-2xl border border-vermelho text-vermelho hover:bg-vermelho/10 transition-colors"
                >
                  Cancelar agendamento
                </button>
                
              </div>
            )}
          </div>
        )}
      </div>

      {isCancelModalOpen && agendamento && (
        <CancelamentoModal
          agendamento={agendamento}
          onClose={() => setIsCancelModalOpen(false)}
          onConfirm={handleConfirmarCancelamento}
        />
      )}

      {isConfirmModalOpen && agendamento && (
        <ConfirmacaoModal
          agendamento={agendamento}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleConfirmar}
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
  const { label, classes } = config[status];
  return <span className={`text-xs font-medium px-3 py-1 rounded-2xl ${classes}`}>{label}</span>;
}

function formatarData(dataIso: string) {
  return new Date(dataIso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}