export type StatusAgendamento = "pendente" | "confirmado" | "cancelado";

export type Agendamento = {
  id: string;
  nomeCliente: string;
  email: string;
  telefone: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  descricao?: string;
  status: StatusAgendamento;
  servico?: { nome: string };
};