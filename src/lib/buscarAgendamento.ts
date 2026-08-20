import { Agendamento } from "./types";
import { mockAgendamentos } from "./mockAgendamentos";

function normalizarAgendamento(item: any): Agendamento | null {
  if (!item) return null;
  const raw = item.formData || item;

  if (!raw.email && !raw.telefone) return null;

  const horarios = Array.isArray(raw.horario) ? raw.horario : [];

  return {
    id: raw.id || "agendamento-id",
    nomeCliente: raw.nomeCliente || raw.nome || "Cliente",
    email: raw.email || "",
    telefone: raw.telefone || "",
    servico: raw.servico || { nome: raw.tipo || "Atendimento" },
    data: raw.data
      ? typeof raw.data === "string"
        ? raw.data
        : new Date(raw.data).toISOString()
      : new Date().toISOString(),
    horaInicio: raw.horaInicio || horarios[0] || "08:00",
    horaFim: raw.horaFim || horarios[horarios.length - 1] || "09:00",
    descricao: raw.descricao || raw.assunto || "",
    status: raw.status || "pendente",
  };
}

export async function buscarAgendamentoPorContato(
  contato: string,
): Promise<Agendamento | null> {
  if (typeof window === "undefined") return null;

  const termo = contato.trim().toLowerCase();
  const apenasNumeros = termo.replace(/\D/g, "");

  const confereContato = (item: Agendamento) => {
    const emailMatch = item.email?.toLowerCase() === termo;
    const telMatch =
      apenasNumeros.length > 0 &&
      item.telefone?.replace(/\D/g, "").includes(apenasNumeros);
    return emailMatch || telMatch;
  };

  const dadosSalvos = localStorage.getItem("agendamentos");

  if (dadosSalvos) {
    try {
      const parsedData = JSON.parse(dadosSalvos);
      const listaBruta = Array.isArray(parsedData) ? parsedData : [parsedData];

      const listaLocal = listaBruta
        .map(normalizarAgendamento)
        .filter((item): item is Agendamento => item !== null);

      const encontradoLocal = listaLocal.find(confereContato);
      if (encontradoLocal) return encontradoLocal;
    } catch (error) {
      console.error("Erro ao ler dados do localStorage:", error);
    }
  }

  const encontradoMock = mockAgendamentos.find(confereContato);
  return encontradoMock || null;
}

export async function cancelarAgendamento(id: string): Promise<void> {
  await atualizarStatusAgendamento(id, "cancelado");
}

export async function confirmarAgendamento(id: string): Promise<void> {
  await atualizarStatusAgendamento(id, "confirmado");
}

async function atualizarStatusAgendamento(
  id: string,
  novoStatus: "cancelado" | "confirmado",
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  if (typeof window === "undefined") return;

  const dadosSalvos = localStorage.getItem("agendamentos");
  let listaExistente: any[] = [];

  if (dadosSalvos) {
    try {
      const parsed = JSON.parse(dadosSalvos);
      listaExistente = Array.isArray(parsed) ? parsed : [parsed];
    } catch (e) {
      console.error("Erro ao ler localStorage:", e);
      listaExistente = [];
    }
  }

  let alterado = false;

  const listaAtualizada = listaExistente.map((item) => {
    const obj = item.formData || item;

    const idItem = String(obj.id || item.id || "");
    const idBusca = String(id || "");

    if (idItem !== "" && idItem === idBusca) {
      alterado = true;
      if (item.formData) {
        return { ...item, formData: { ...item.formData, status: novoStatus } };
      }
      return { ...item, status: novoStatus };
    }

    return item;
  });

  if (!alterado) {
    const mock = mockAgendamentos.find((m) => String(m.id) === String(id));

    if (mock) {
      listaAtualizada.push({ ...mock, status: novoStatus });
      alterado = true;
    }
  }

  if (!alterado) {
    console.warn(
      "Agendamento não encontrado pelo ID. Tentando atualizar pelo estado em memória...",
    );
  }

  localStorage.setItem("agendamentos", JSON.stringify(listaAtualizada));
}
