"use client";

import { Agendamento } from "@/lib/types";

interface CancelamentoModalProps {
  agendamento: Agendamento;
  onClose: () => void;
  onConfirm: () => void;
}

export default function CancelamentoModal({ agendamento, onClose, onConfirm }: CancelamentoModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-branco rounded-2xl p-6 max-w-md w-full space-y-4 border border-bege">
        <h2 className="text-xl font-bold text-primaria">Confirmar cancelamento</h2>
        <p className="text-secundaria">
          Deseja mesmo cancelar o agendamento de{" "}
          <strong className="text-primaria">{agendamento.nomeCliente}</strong> para o dia{" "}
          <strong>{new Date(agendamento.data).toLocaleDateString("pt-BR")}</strong>, às{" "}
          <strong>{agendamento.horaInicio}</strong>? Esta ação não pode ser desfeita.
        </p>
        <div className="flex gap-3 justify-end pt-2">
          <button onClick={onClose} className="px-5 py-2 rounded-2xl border border-bege hover:bg-bege/30 transition-colors">
            Voltar
          </button>
          <button onClick={onConfirm} className="px-5 py-2 rounded-2xl bg-vermelho text-white hover:opacity-90 transition-opacity">
            Confirmar cancelamento
          </button>
        </div>
      </div>
    </div>
  );
}