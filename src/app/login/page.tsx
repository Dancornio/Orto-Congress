"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/app/(components)/Button";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SiteFooter from "@/app/(layouts)/SiteFooter";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMsg("Inscrição realizada com sucesso! Use suas credenciais para acessar o painel.");
    }
  }, [searchParams]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || !password || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "E-mail ou senha incorretos.");
      }

      setSuccessMsg("Login realizado com sucesso! Redirecionando...");
      
      // Forçar atualização do estado do header e redirecionar
      setTimeout(() => {
        router.push("/dashboard");
        router.refresh();
      }, 1500);

    } catch (err: any) {
      setErrorMsg(err.message || "Falha na conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />
      
      <main className="pt-32 pb-20 flex-grow flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {successMsg ? (
            <div
              className="mb-4 rounded-xl bg-rehab-500 p-4 text-sm text-white shadow-md"
              role="alert"
            >
              {successMsg}
            </div>
          ) : null}

          {errorMsg ? (
            <div
              className="mb-4 rounded-xl bg-red-500 p-4 text-sm text-white shadow-md"
              role="alert"
            >
              {errorMsg}
            </div>
          ) : null}

          <div className="card-surface p-8 shadow-xl border border-slate-100 bg-white/90 backdrop-blur-sm">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-slate-900 font-display">
                Área do Participante
              </h1>
              <p className="mt-2 text-sm text-slate-500">
                Acesse seu painel do Ortopedia & Próteses 2026
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              <div>
                <label className="text-sm font-semibold text-slate-900" htmlFor="email">
                  E-mail profissional
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  disabled={loading}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-clinic-500 focus:ring-1 focus:ring-clinic-500"
                  placeholder="voce@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-900" htmlFor="password">
                  Sua senha
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  disabled={loading}
                  onChange={(event) => setPassword(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-clinic-500 focus:ring-1 focus:ring-clinic-500"
                  placeholder="••••••••"
                />
              </div>

              <Button
                type="submit"
                variant="primary"
                className="w-full py-3"
                disabled={loading}
              >
                {loading ? "Entrando..." : "Acessar Conta"}
              </Button>

              <div className="text-center text-sm text-slate-600 mt-4">
                Não tem uma inscrição?{" "}
                <Link
                  href="/#inscricao"
                  className="font-semibold text-clinic-600 hover:underline"
                >
                  Inscreva-se aqui
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}
