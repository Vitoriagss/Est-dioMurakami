"use client";

import { useEffect, useState } from "react";
import { ADMIN_STORAGE_KEY } from "@/lib/adminAuth";
import AdminLogin from "@/components/AdminLogin";
import ListaAgendamentosAdmin from "@/components/ListaAgendamentosAdmin";
import { Agendamento } from "@/lib/types";
import { mockAgendamentos } from "@/lib/mockAgendamentos";
import { Calendar, CheckCircle2, XCircle, Clock } from "lucide-react";
import Header from "@/components/HEADER";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const carregarAgendamentos = () => {
    if (typeof window === "undefined") return;

    const dadosSalvos = localStorage.getItem("agendamentos");
    let listaLocal: Agendamento[] = [];

    if (dadosSalvos) {
      try {
        const parsed = JSON.parse(dadosSalvos);
        const listaBruta = Array.isArray(parsed) ? parsed : [parsed];

        listaLocal = listaBruta.map((item: any) => {
          const raw = item.formData || item;
          const horarios = Array.isArray(raw.horario) ? raw.horario : [];

          return {
            id: String(raw.id || Math.random()),
            nomeCliente: raw.nomeCliente || raw.nome || "Cliente",
            email: raw.email || "",
            telefone: raw.telefone || "",
            servico: raw.servico || { nome: raw.tipo || "Atendimento" },
            data: raw.data
              ? new Date(raw.data).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  timeZone: "America/Sao_Paulo",
                })
              : new Date().toLocaleDateString("pt-BR"),
            horaInicio: raw.horaInicio || horarios[0] || "08:00",
            horaFim: raw.horaFim || horarios[horarios.length - 1] || "09:00",
            descricao: raw.descricao || raw.assunto || "",
            status: raw.status || "pendente",
          };
        });
      } catch (e) {
        console.error("Erro ao carregar agendamentos:", e);
      }
    }

    // Mescla dados do LocalStorage com Mocks sem duplicar IDs
    const idsLocais = new Set(listaLocal.map((i) => i.id));
    const mocksFiltrados = mockAgendamentos.filter((m) => !idsLocais.has(m.id));

    setAgendamentos([...listaLocal, ...mocksFiltrados]);
  };

  useEffect(() => {
    const authStatus = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(authStatus === "true");

    if (authStatus === "true") {
      carregarAgendamentos();
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div>
        <Header />
        <AdminLogin
          onLoginSuccess={() => {
            setIsAuthenticated(true);
            carregarAgendamentos();
          }}
        />
      </div>
    );
  }

  // Estatísticas calculadas dinamicamente
  const totalGeral = agendamentos.length;
  const totalConfirmados = agendamentos.filter(
    (a) => a.status === "confirmado",
  ).length;
  const totalCancelados = agendamentos.filter(
    (a) => a.status === "cancelado",
  ).length;
  const totalPendentes = agendamentos.filter(
    (a) => !a.status || a.status === "pendente",
  ).length;

  return (
    <main className="flex flex-col w-full min-h-screen p-8 bg-branco gap-8">
      <div className="max-w-6xl container mx-auto">
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div>
            <h1 className="text-3xl font-bold text-primaria">
              Painel de Administração
            </h1>
            <p className="text-gray-600">
              Gerencie os agendamentos salvos no sistema.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors text-sm font-medium cursor-pointer"
          >
            Sair (Logout)
          </button>
        </header>

        {/* Cards de Métricas */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full mb-8">
          <div className="flex flex-col gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-bege">
            <div className="flex justify-between items-center text-lg">
              <h3 className="font-medium text-gray-600 text-sm">Total</h3>
              <Calendar
                size={24}
                className="p-1 bg-slate-100 rounded-md text-gray-600"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{totalGeral}</h1>
              <p className="text-xs text-gray-500">Agendamentos no sistema</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-bege">
            <div className="flex justify-between items-center text-lg">
              <h3 className="font-medium text-gray-600 text-sm">Pendentes</h3>
              <Clock
                size={24}
                className="p-1 bg-yellow-50 rounded-md text-yellow-600"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-yellow-600">
                {totalPendentes}
              </h1>
              <p className="text-xs text-gray-500">Aguardando atendimento</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-bege">
            <div className="flex justify-between items-center text-lg">
              <h3 className="font-medium text-gray-600 text-sm">Confirmados</h3>
              <CheckCircle2
                size={24}
                className="p-1 bg-green-50 rounded-md text-green-600"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-green-600">
                {totalConfirmados}
              </h1>
              <p className="text-xs text-gray-500">Agendamentos ativos</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 bg-white px-6 py-4 rounded-xl shadow-sm border border-bege">
            <div className="flex justify-between items-center text-lg">
              <h3 className="font-medium text-gray-600 text-sm">Cancelados</h3>
              <XCircle
                size={24}
                className="p-1 bg-red-50 rounded-md text-red-600"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-red-600">
                {totalCancelados}
              </h1>
              <p className="text-xs text-gray-500">Agendamentos cancelados</p>
            </div>
          </div>
        </section>

        {/* Tabela com o Painel Lateral Integrado */}
        <ListaAgendamentosAdmin
          agendamentos={agendamentos}
          onAtualizarStatus={carregarAgendamentos}
        />
      </div>
    </main>
  );
}
