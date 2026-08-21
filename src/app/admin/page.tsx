"use client";

import { useEffect, useState } from "react";
import { ADMIN_STORAGE_KEY } from "@/lib/adminAuth";
import AdminLogin from "@/components/AdminLogin";

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
    <main className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
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
    </main>
  );
}
