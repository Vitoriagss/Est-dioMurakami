"use client";

import { Agendamento } from "@/lib/types";

interface ConfirmacaoModalProps {
  agendamento: Agendamento;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmacaoModal({ agendamento, onClose, onConfirm }: ConfirmacaoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-branco rounded-2xl p-6 max-w-md w-full space-y-4 border border-bege">
        <h2 className="text-xl font-bold text-primaria">Confirmar agendamento</h2>
        <p className="text-secundaria">
          Deseja confirmar o agendamento de{" "}
          <strong className="text-primaria">{agendamento.nomeCliente}</strong> para o dia{" "}
          <strong>{new Date(agendamento.data).toLocaleDateString("pt-BR")}</strong>, às{" "}
          <strong>{agendamento.horaInicio}</strong>?
        </p>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="px-5 py-2 rounded-2xl border border-bege hover:bg-bege/30 transition-colors">
            Voltar
          </button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-2xl bg-green-700 text-white hover:opacity-90 transition-opacity">
            Confirmar agendamento
          </button>
        </div>
      </div>
    </div>
  );
}