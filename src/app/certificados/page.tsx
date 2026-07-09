"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/app/(components)/Button";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SiteFooter from "@/app/(layouts)/SiteFooter";

interface CertificateData {
  name: string;
  email: string;
  ticket: string;
  minicursos: string[];
}

export default function CertificadosPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [certData, setCertData] = useState<CertificateData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!email.trim() || loading) return;

    setLoading(true);
    setErrorMsg(null);
    setCertData(null);

    try {
      const response = await fetch(`/api/certificados?email=${encodeURIComponent(email.trim())}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erro ao buscar certificados.");
      }

      setCertData(data);
    } catch (err: any) {
      setErrorMsg(err.message || "Erro de conexão. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
      <SiteHeader />

      <main className="pt-32 pb-20 flex-grow section-shell">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 font-display">
              Portal de Certificados
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Consulte seu certificado de participação no congresso e nos minicursos informando seu e-mail cadastrado.
            </p>
          </div>

          {/* Form de busca */}
          <div className="card-surface p-6 bg-white border border-slate-100 shadow-md">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-grow w-full">
                <label className="text-sm font-semibold text-slate-700" htmlFor="email-search">
                  E-mail de Inscrição
                </label>
                <input
                  id="email-search"
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-clinic-500 focus:ring-1 focus:ring-clinic-500"
                  placeholder="seu-email@dominio.com"
                />
              </div>
              <Button type="submit" variant="primary" className="w-full sm:w-auto py-2.5 px-6" disabled={loading}>
                {loading ? "Buscando..." : "Buscar Certificados"}
              </Button>
            </form>
          </div>

          {/* Exibição dos Certificados */}
          <AnimatePresence mode="wait">
            {errorMsg ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-6 p-4 rounded-xl bg-red-500 text-sm text-white shadow-md text-center"
              >
                {errorMsg}
              </motion.div>
            ) : null}

            {certData ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-12 space-y-12"
              >
                <h2 className="text-2xl font-bold text-slate-800 text-center font-display border-b border-slate-200 pb-3">
                  Certificados Disponíveis para {certData.name}
                </h2>

                {/* 1. Certificado Geral */}
                <div className="bg-white border-8 border-double border-slate-300 p-8 sm:p-12 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[400px]">
                  {/* Badge de Destaque / Selo */}
                  <div className="absolute right-6 top-6 h-20 w-20 flex items-center justify-center opacity-85">
                    <svg viewBox="0 0 100 100" className="h-full w-full fill-clinic-600">
                      <polygon points="50,0 63,35 100,50 63,65 50,100 37,65 0,50 37,35" />
                      <circle cx="50" cy="50" r="20" className="fill-white" />
                      <circle cx="50" cy="50" r="16" className="fill-accent-500" />
                    </svg>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-xs uppercase tracking-[0.3em] font-bold text-clinic-600 text-center">
                      Certificado de Participação
                    </p>
                    <h3 className="text-3xl font-bold text-slate-900 text-center font-display">
                      Congresso Internacional de Ortopedia & Próteses 2026
                    </h3>
                  </div>

                  <div className="my-8 text-center text-slate-700 leading-relaxed text-base max-w-2xl mx-auto space-y-4">
                    <p>
                      Certificamos que
                    </p>
                    <p className="text-2xl font-extrabold text-slate-900 border-b-2 border-slate-100 pb-2 inline-block px-4">
                      {certData.name}
                    </p>
                    <p>
                      participou do Congresso de Extensão, com foco em desmistificar o uso de implantes no corpo humano, no período de 16 a 18 de Agosto de 2026, na categoria <strong className="text-clinic-600 font-semibold">{certData.ticket}</strong>.
                    </p>
                  </div>

                  <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
                    <div>
                      <p className="font-semibold text-slate-500 uppercase tracking-wider">Carga Horária</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">24 Horas</p>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="font-semibold text-slate-500 uppercase tracking-wider">Organização</p>
                      <p className="text-sm font-bold text-slate-700 mt-1">Comissão de Extensão e Engenharia Biomédica</p>
                    </div>
                  </div>
                </div>

                {/* 2. Certificados de Minicursos */}
                {certData.minicursos.length > 0 ? (
                  <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-800 text-center font-display">
                      Certificados de Minicursos
                    </h3>

                    {certData.minicursos.map((minicurso, index) => (
                      <div
                        key={index}
                        className="bg-white border-8 border-double border-slate-300 p-8 sm:p-10 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[350px]"
                      >
                        {/* Selo menor */}
                        <div className="absolute right-6 top-6 h-16 w-16 flex items-center justify-center opacity-85">
                          <svg viewBox="0 0 100 100" className="h-full w-full fill-rehab-500">
                            <polygon points="50,0 63,35 100,50 63,65 50,100 37,65 0,50 37,35" />
                            <circle cx="50" cy="50" r="20" className="fill-white" />
                            <circle cx="50" cy="50" r="16" className="fill-clinic-600" />
                          </svg>
                        </div>

                        <div className="space-y-4">
                          <p className="text-xs uppercase tracking-[0.3em] font-bold text-rehab-600 text-center">
                            Certificado de Conclusão de Minicurso
                          </p>
                          <h4 className="text-2xl font-bold text-slate-900 text-center font-display">
                            {minicurso}
                          </h4>
                        </div>

                        <div className="my-6 text-center text-slate-700 leading-relaxed text-base max-w-2xl mx-auto space-y-4">
                          <p>
                            Certificamos que
                          </p>
                          <p className="text-xl font-extrabold text-slate-900 border-b-2 border-slate-100 pb-2 inline-block px-4">
                            {certData.name}
                          </p>
                          <p>
                            concluiu com aproveitamento o minicurso promovido como parte das atividades de extensão acadêmica do Congresso Internacional de Ortopedia & Próteses 2026.
                          </p>
                        </div>

                        <div className="border-t border-slate-200 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-4">
                          <div>
                            <p className="font-semibold text-slate-500 uppercase tracking-wider">Carga Horária</p>
                            <p className="text-sm font-bold text-slate-700 mt-1">2 Horas</p>
                          </div>
                          <div className="text-center sm:text-right">
                            <p className="font-semibold text-slate-500 uppercase tracking-wider">Organização</p>
                            <p className="text-sm font-bold text-slate-700 mt-1">Coordenação de Minicursos e Eventos de Extensão</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
