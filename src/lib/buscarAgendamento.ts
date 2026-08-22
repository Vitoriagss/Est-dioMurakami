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

const parseDataAgendamento = (dataStr: string, horaStr?: string) => {
  if (!dataStr) return new Date(0);

  const hora = horaStr || "00:00";
  let ano = 0,
    mes = 0,
    dia = 0;

  if (dataStr.includes("-")) {
    const dataLimpa = dataStr.split("T")[0];
    const partes = dataLimpa.split("-");
    ano = parseInt(partes[0], 10);
    mes = parseInt(partes[1], 10) - 1;
    dia = parseInt(partes[2], 10);
  } else if (dataStr.includes("/")) {
    const partes = dataStr.split("/");
    dia = parseInt(partes[0], 10);
    mes = parseInt(partes[1], 10) - 1;
    ano = parseInt(partes[2], 10);
  } else {
    return new Date(0);
  }

  const [horas, minutos] = hora.split(":").map((n) => parseInt(n, 10) || 0);

  return new Date(ano, mes, dia, horas, minutos);
};

export async function buscarAgendamentoPorContato(
  contato: string,
): Promise<Agendamento[]> {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const termo = contato.trim().toLowerCase();
  const apenasNumeros = termo.replace(/\D/g, "");
  const agendamentos = getAgendamentosSalvos();
  const agora = new Date();

  const encontrados = agendamentos.filter((item: any) => {
    const ag = item.formData || item;

    if (ag.status === "cancelado") {
      return false;
    }

    // Converte a data do item atual dentro do loop
    const dataDoAgendamento = parseDataAgendamento(
      ag.data,
      ag.horaInicio || ag.horaFim,
    );

    // Ignora se a reunião já passou
    if (dataDoAgendamento < agora) {
      return false;
    }

    const emailMatch = ag.email?.toLowerCase() === termo;
    const telMatch =
      apenasNumeros.length > 0 &&
      ag.telefone?.replace(/\D/g, "").includes(apenasNumeros);

    return emailMatch || telMatch;
  });

  if (encontrados.length === 0) return [];

  const listaMapeada = encontrados.map(
    (item: any) => item.formData || item,
  ) as Agendamento[];

  // Ordena utilizando a função parseDataAgendamento para evitar NaN
  listaMapeada.sort((a, b) => {
    const dataA = parseDataAgendamento(a.data, a.horaInicio).getTime();
    const dataB = parseDataAgendamento(b.data, b.horaInicio).getTime();

    return dataA - dataB;
  });

  return listaMapeada;
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