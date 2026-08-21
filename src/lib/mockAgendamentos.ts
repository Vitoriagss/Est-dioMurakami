import { Agendamento } from "./types";

export const mockAgendamentos: Agendamento[] = [
  {
    id: "mock-101",
    nomeCliente: "Mariana Souza",
    email: "mariana.souza@gmail.com",
    telefone: "(11) 98765-4321",
    servico: {
      nome: "Consulta Odontológica Inicial",
    },
    data: "2026-08-22",
    horaInicio: "09:00",
    horaFim: "10:00",
    descricao:
      "Primeira consulta de avaliação. Cliente relata sensibilidade no dente siso.",
    status: "confirmado",
  },
  {
    id: "mock-102",
    nomeCliente: "Carlos Eduardo Mendes",
    email: "carlos.mendes@outlook.com",
    telefone: "(11) 97123-8899",
    servico: {
      nome: "Limpeza e Profilaxia",
    },
    data: "2026-08-22",
    horaInicio: "10:30",
    horaFim: "11:15",
    descricao: "Manutenção semestral de rotina.",
    status: "pendente",
  },
  {
    id: "mock-103",
    nomeCliente: "Beatriz Lima",
    email: "beatriz.lima@hotmail.com",
    telefone: "(21) 99887-1122",
    servico: {
      nome: "Clareamento Dental",
    },
    data: "2026-08-23",
    horaInicio: "14:00",
    horaFim: "15:30",
    descricao: "Sessão 1 de clareamento a laser.",
    status: "confirmado",
  },
  {
    id: "mock-104",
    nomeCliente: "Roberto Alves",
    email: "roberto.alves@yahoo.com",
    telefone: "(31) 98444-5566",
    servico: {
      nome: "Ajuste de Aparelho Ortodôntico",
    },
    data: "2026-08-24",
    horaInicio: "08:30",
    horaFim: "09:00",
    descricao: "Troca de borrachinhas e ajuste mensal do arco.",
    status: "cancelado",
  },
  {
    id: "mock-105",
    nomeCliente: "Fernanda Costa",
    email: "fer.costa@gmail.com",
    telefone: "(11) 96555-4321",
    servico: {
      nome: "Tratamento de Canal",
    },
    data: "2026-08-25",
    horaInicio: "16:00",
    horaFim: "17:30",
    descricao: "Encaminhada da urgência na semana passada.",
    status: "pendente",
  },
];
