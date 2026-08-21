"use client";

import { useState } from "react";
import { Agendamento } from "@/lib/types"; // Ajuste o caminho das suas tipagens se necessário
import {
  X,
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  FileText,
  Tag,
} from "lucide-react";

interface Props {
  agendamentos: Agendamento[];
  onAtualizarStatus?: () => void;
}

export default function ListaAgendamentosAdmin({ agendamentos }: Props) {
  const [agendamentoSelecionado, setAgendamentoSelecionado] =
    useState<Agendamento | null>(null);

  const getStatusBadge = (status?: string) => {
    switch (status) {
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

  return (
    <div className="w-full flex gap-6 items-center">
      {/* Tabela / Lista de Agendamentos */}
      <div className="bg-white rounded-2xl w-full py-2 shadow-sm border border-bege overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-800">
            Agendamentos Realizados
          </h2>
          <p className="text-sm text-gray-500">
            Clique em qualquer item para visualizar todos os detalhes.
          </p>
        </div>

        {agendamentos.length === 0 ? (
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
                {agendamentos.map((item) => (
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
        <section className="px-12 py-8 bg-white w-125 h-fit shadow-2xl rounded-lg">
          <div className="flex justify-end bg-black/40">
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
    </div>
  );
}
