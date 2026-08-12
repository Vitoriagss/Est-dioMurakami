import { Agendamento } from "./types";
import { mockAgendamentos } from "./mockAgendamentos";

// TODO: substituir por chamada real ao Strapi quando o backend estiver pronto.
// Ex: const response = await api.get("/agendamentos", { params: { filters: {...} } });
export async function buscarAgendamentoPorContato(contato: string): Promise<Agendamento | null> {
  // simula o tempo de uma requisição de rede
  await new Promise((resolve) => setTimeout(resolve, 600));

  const encontrado = mockAgendamentos.find(
    (agendamento) => agendamento.email === contato || agendamento.telefone === contato
  );

  return encontrado ?? null;
}

// TODO: substituir por chamada real ao Strapi (PUT /agendamentos/:id)
export async function cancelarAgendamento(id: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const agendamento = mockAgendamentos.find((a) => a.id === id);
  if (agendamento) {
    agendamento.status = "cancelado";
  }
}