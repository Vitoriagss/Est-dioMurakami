import { Agendamento } from "./types";

// Função utilitária para pegar a lista atual do localStorage
function getAgendamentosSalvos(): any[] {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem("agendamentos");
  if (!dados) return [];
  try {
    const parsed = JSON.parse(dados);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch {
    return [];
  }
}

export async function buscarAgendamentoPorContato(
  contato: string,
): Promise<Agendamento[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const termo = contato.trim().toLowerCase();
  const apenasNumeros = termo.replace(/\D/g, "");
  const agendamentos = getAgendamentosSalvos();

  const encontrados = agendamentos.filter((item: any) => {
    const ag = item.formData || item;

    const emailMatch = ag.email?.toLowerCase() === termo;
    const telMatch =
      apenasNumeros.length > 0 &&
      ag.telefone?.replace(/\D/g, "").includes(apenasNumeros);

    return emailMatch || telMatch;
  });

  // Normaliza a estrutura para garantir que o retorno siga o tipo Agendamento
  return encontrados.map((item: any) => {
    const raw = item.formData || item;
    const horarios = Array.isArray(raw.horario) ? raw.horario : [];

    return {
      id: String(raw.id || Math.random()),
      nomeCliente: raw.nomeCliente || raw.nome || "Cliente",
      email: raw.email || "",
      telefone: raw.telefone || "",
      servico: raw.servico || { nome: raw.tipo || "Atendimento" },
      data: raw.data || new Date().toISOString(),
      horaInicio: raw.horaInicio || horarios[0] || "08:00",
      horaFim: raw.horaFim || horarios[horarios.length - 1] || "09:00",
      descricao: raw.descricao || raw.assunto || "",
      status: raw.status || "pendente",
    };
  });
}

export async function confirmarAgendamento(id: string): Promise<void> {
  const lista = getAgendamentosSalvos();

  const listaAtualizada = lista.map((item) => {
    const itemData = item.formData || item;
    if (itemData.id === id || item.id === id) {
      if (item.formData) {
        return {
          ...item,
          formData: { ...item.formData, status: "confirmado" },
        };
      }
      return { ...item, status: "confirmado" };
    }
    return item;
  });

  localStorage.setItem("agendamentos", JSON.stringify(listaAtualizada));
}

export async function cancelarAgendamento(id: string): Promise<void> {
  const lista = getAgendamentosSalvos();

  const listaAtualizada = lista.map((item) => {
    const itemData = item.formData || item;
    if (itemData.id === id || item.id === id) {
      if (item.formData) {
        return { ...item, formData: { ...item.formData, status: "cancelado" } };
      }
      return { ...item, status: "cancelado" };
    }
    return item;
  });

  localStorage.setItem("agendamentos", JSON.stringify(listaAtualizada));
}
