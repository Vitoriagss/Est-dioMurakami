import { Agendamento } from "./types";

// Função utilitária para pegar os dados do LocalStorage de forma segura
const getAgendamentosLocais = (): any[] => {
  if (typeof window === "undefined") return [];
  const dados = localStorage.getItem("agendamentos");
  if (!dados) return [];
  try {
    const parsed = JSON.parse(dados);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (e) {
    return [];
  }
};

export async function buscarAgendamentoPorContato(
  contato: string
): Promise<Agendamento[]> { 
  await new Promise((resolve) => setTimeout(resolve, 400));

  const termo = contato.trim().toLowerCase();
  const apenasNumeros = termo.replace(/\D/g, "");
  const agendamentos = getAgendamentosLocais();

  const encontrados = agendamentos.filter((item: any) => {
    const ag = item.formData || item;

    if (ag.status === "cancelado") return false;

    const emailMatch = ag.email?.toLowerCase() === termo;
    const telMatch =
      apenasNumeros.length > 0 &&
      ag.telefone?.replace(/\D/g, "").includes(apenasNumeros);

    return emailMatch || telMatch;
  });

  // Retorna a lista completa mapeada, ou um array vazio se não achar nada
  if (encontrados.length === 0) return [];

  const listaMapeada = encontrados.map((item: any) => item.formData || item) as Agendamento[];

  listaMapeada.sort((a, b) => { // função para ordenar cronologicamente os agendamentos na página de status
    const dataA = new Date(a.data).setHours(0, 0, 0, 0);
    const dataB = new Date(b.data).setHours(0, 0, 0, 0);

    if (dataA !== dataB) {
      return dataA - dataB;
    }

    const horaA = a.horaInicio || "00:00";
    const horaB = b.horaInicio || "00:00";
    
    return horaA.localeCompare(horaB);
  });

  return listaMapeada;
}

export async function cancelarAgendamento(id: string): Promise<void> {
  await atualizarStatus(id, "cancelado");
}

export async function confirmarAgendamento(id: string): Promise<void> {
  await atualizarStatus(id, "confirmado");
}

// Função centralizada para atualizar qualquer status
async function atualizarStatus(
  id: string,
  novoStatus: "cancelado" | "confirmado"
): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const agendamentos = getAgendamentosLocais();

  const novaLista = agendamentos.map((item) => {
    const obj = item.formData || item;
    
    // Se achou o ID correto, atualiza o status
    if (String(obj.id) === String(id)) {
      if (item.formData) {
        return { ...item, formData: { ...item.formData, status: novoStatus } };
      }
      return { ...item, status: novoStatus };
    }
    return item; // Se não for o ID, devolve intacto
  });

  localStorage.setItem("agendamentos", JSON.stringify(novaLista));
}