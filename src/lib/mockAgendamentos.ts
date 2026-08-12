import { Agendamento } from "./types";

export const mockAgendamentos: Agendamento[] = [
  {
    id: "1",
    nomeCliente: "Ana Paula Silva",
    email: "ana@email.com",
    telefone: "11987654321",
    data: "2026-08-20",
    horaInicio: "14:00",
    horaFim: "14:45",
    descricao: "Reunião geral para alinhamento de projeto.",
    status: "confirmado",
    servico: { nome: "Reunião Geral" },
  },
  {
    id: "2",
    nomeCliente: "Rodrigo Alencar",
    email: "rodrigo@email.com",
    telefone: "11912345678",
    data: "2026-08-22",
    horaInicio: "10:30",
    horaFim: "11:15",
    status: "pendente",
    servico: { nome: "Avaliação Financeira" },
  },
  {
    id: "3",
    nomeCliente: "Mariana Costa",
    email: "mariana@email.com",
    telefone: "11999998888",
    data: "2026-08-18",
    horaInicio: "16:00",
    horaFim: "16:30",
    status: "cancelado",
    servico: { nome: "Marketing" },
  },
];