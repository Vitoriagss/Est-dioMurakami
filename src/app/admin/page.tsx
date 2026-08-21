"use client";

import { useEffect, useState } from "react";
import { ADMIN_STORAGE_KEY } from "@/lib/adminAuth";
import AdminLogin from "@/components/AdminLogin";
import { Calendar } from "lucide-react";
import ListaAgendamentosAdmin from "@/components/ListaAgendamentosAdmin";
import Header from "@/components/HEADER";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const authStatus = sessionStorage.getItem(ADMIN_STORAGE_KEY);
    setIsAuthenticated(authStatus === "true");
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
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <main className="flex flex-col w-full justify-center min-h-screen p-8 bg-branco gap-8">
      <Header />
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

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-bege">
          <h2 className="text-xl font-semibold mb-4">
            Bem-vindo, Administrador!
          </h2>
          <p className="text-gray-600">
            Você está autenticado e com acesso a todas as funções de
            gerenciamento.
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-12">
        <section className="flex gap-2 w-full justify-around">
          <div className="flex flex-col gap-6 bg-white px-6 py-4 w-full rounded-lg drop-shadow-xl">
            <div className="flex justify-between text-lg">
              <h3>Hoje</h3>
              <Calendar
                size={30}
                className="px-1 py-1 bg-slate-100 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl">21</h1>
              <p>
                <span className="text-green-500">+ 3 hoje</span> consultas
                agendadas
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white px-6 py-4 w-full rounded-lg drop-shadow-xl">
            <div className="flex justify-between text-lg">
              <h3>Hoje</h3>
              <Calendar
                size={30}
                className="px-1 py-1 bg-slate-100 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl">21</h1>
              <p>
                <span className="text-red-500">+ 3 hoje</span> consultas
                agendadas
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white px-6 py-4 w-full rounded-lg drop-shadow-xl">
            <div className="flex justify-between text-lg">
              <h3>Hoje</h3>
              <Calendar
                size={30}
                className="px-1 py-1 bg-slate-100 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl">21</h1>
              <p>
                <span className="text-green-700">+ 3 hoje</span> consultas
                agendadas
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white px-4 py-4 w-full rounded-lg drop-shadow-xl">
            <div className="flex justify-between text-lg">
              <h3>Hoje</h3>
              <Calendar
                size={30}
                className="px-1 py-1 bg-slate-100 rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl">21</h1>
              <p>
                <span className="text-green-700">+ 3 hoje</span> consultas
                agendadas
              </p>
            </div>
          </div>
        </section>
        <section>
          <ListaAgendamentosAdmin agendamentos={[]} />
        </section>
      </div>
    </main>
  );
}
