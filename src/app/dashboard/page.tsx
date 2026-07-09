"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { Button } from "@/app/(components)/Button";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SiteFooter from "@/app/(layouts)/SiteFooter";

interface UserProfile {
  id: number;
  name: string;
  email: string;
  ticket: string;
  institution: string;
  created_at: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        
        if (!response.ok) {
          throw new Error("Não autorizado");
        }
        
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        // Se falhar a validação ou expirar a sessão, redirecionar para o login
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Erro ao deslogar:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <SiteHeader />
        <main className="flex-grow flex items-center justify-center pt-24">
          <div className="text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-clinic-600 mx-auto"></div>
            <p className="mt-4 text-sm text-slate-500 font-medium">Carregando painel...</p>
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  if (!user) return null;

  const registrationDate = new Date(user.created_at).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />

      <main className="pt-32 pb-20 flex-grow section-shell">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Cabeçalho de Boas-vindas */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6 mb-8">
            <div>
              <p className="text-sm font-semibold text-clinic-600 uppercase tracking-wider">
                Painel do Participante
              </p>
              <h1 className="text-3xl font-bold text-slate-900 mt-1 font-display">
                Olá, {user.name.split(" ")[0]}!
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="sm:self-center border-red-200 text-red-600 hover:bg-red-50 focus-visible:ring-red-400"
            >
              Sair da Conta
            </Button>
          </div>

          <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
            {/* Bloco de Informações do Ticket */}
            <div className="space-y-6">
              <div className="card-surface p-6 bg-white shadow-md border border-slate-100 relative overflow-hidden">
                <div className="absolute right-0 top-0 h-24 w-24 bg-clinic-600/5 rounded-full blur-2xl" />
                
                <h2 className="text-xl font-semibold text-slate-900">
                  Status da sua Inscrição
                </h2>
                
                <div className="mt-6 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-xl bg-rehab-100 text-rehab-700 flex items-center justify-center flex-shrink-0 text-xl font-bold">
                    ✓
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">
                      Pré-inscrição Confirmada
                    </h3>
                    <p className="text-sm text-slate-600 mt-1">
                      Sua vaga para o **Congresso Internacional de Ortopedia & Próteses 2026** está reservada!
                    </p>
                    <p className="text-sm text-slate-600 mt-2">
                      Nossa equipe financeira enviará o link para pagamento via e-mail nas próximas 24 horas. Após o pagamento, o seu ticket estará ativo.
                    </p>
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-100 pt-6 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Tipo de Ingresso
                    </p>
                    <p className="text-lg font-bold text-clinic-600 mt-1">
                      {user.ticket}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                      Inscrição Realizada em
                    </p>
                    <p className="text-sm font-medium text-slate-700 mt-1.5">
                      {registrationDate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informações Pessoais Cadastradas */}
              <div className="card-surface p-6 bg-white shadow-md border border-slate-100">
                <h2 className="text-lg font-semibold text-slate-900 border-b border-slate-100 pb-3">
                  Seus Dados Cadastrados
                </h2>
                <dl className="mt-4 space-y-4 text-sm">
                  <div className="grid grid-cols-[100px_1fr]">
                    <dt className="font-medium text-slate-400">Nome:</dt>
                    <dd className="font-semibold text-slate-800">{user.name}</dd>
                  </div>
                  <div className="grid grid-cols-[100px_1fr]">
                    <dt className="font-medium text-slate-400">E-mail:</dt>
                    <dd className="font-semibold text-slate-800">{user.email}</dd>
                  </div>
                  {user.institution ? (
                    <div className="grid grid-cols-[100px_1fr]">
                      <dt className="font-medium text-slate-400">Instituição:</dt>
                      <dd className="font-semibold text-slate-800">{user.institution}</dd>
                    </div>
                  ) : null}
                </dl>
              </div>
            </div>

            {/* Guia de Próximos Passos */}
            <div className="card-surface p-6 bg-slate-900 text-white shadow-md border-0 self-start">
              <h2 className="text-lg font-semibold font-display">
                O que fazer agora?
              </h2>
              
              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="flex gap-3">
                  <span className="text-clinic-400 font-bold">1.</span>
                  <p>Mantenha atenção à sua caixa de entrada e ao lixo eletrônico (spam) para receber o link de pagamento.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-clinic-400 font-bold">2.</span>
                  <p>Consulte a programação completa do evento para escolher as palestras de seu interesse.</p>
                </li>
                <li className="flex gap-3">
                  <span className="text-clinic-400 font-bold">3.</span>
                  <p>Caso tenha submetido trabalhos acadêmicos, acompanhe os prazos de avaliação diretamente no site.</p>
                </li>
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <p className="text-xs text-slate-400">
                  Dúvidas sobre sua inscrição? Fale com a organização pelo e-mail:
                </p>
                <p className="text-sm font-semibold text-clinic-400 mt-2">
                  inscricoes@ortopedia2026.org.br
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}
