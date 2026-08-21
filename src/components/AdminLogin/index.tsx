"use client";

import { SubmitEvent, useState } from "react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({
  onLoginSuccess,
}: AdminLoginProps): React.JSX.Element {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault;

    import("@/lib/adminAuth").then(
      ({ ADMIN_CREDENTIALS, ADMIN_STORAGE_KEY }) => {
        if (
          email === ADMIN_CREDENTIALS.email &&
          senha === ADMIN_CREDENTIALS.senha
        ) {
          // Salva a sessão no sessionStorage (expira ao fechar a aba do navegador)
          sessionStorage.setItem(ADMIN_STORAGE_KEY, "true");
          setErro("");
          onLoginSuccess();
        } else {
          setErro("E-mail ou senha incorretos.");
        }
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-bege">
        <h2 className="text-2xl font-bold text-center text-primaria mb-6">
          Acesso Restrito - Admin
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-mail
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@exemplo.com"
              className="w-full p-3 border border-bege rounded-xl focus:outline-none focus:ring-2 focus:ring-vermelho"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Senha
            </label>
            <input
              type="password"
              required
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="••••••••"
              className="w-full p-3 border border-bege rounded-xl focus:outline-none focus:ring-2 focus:ring-vermelho"
            />
          </div>

          {erro && (
            <p className="text-red-500 text-sm text-center font-medium">
              {erro}
            </p>
          )}

          <button
            type="submit"
            className="w-full mt-2 bg-primaria text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-semibold cursor-pointer"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
