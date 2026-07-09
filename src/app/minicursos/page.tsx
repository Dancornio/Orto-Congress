"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/app/(components)/Button";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import SiteFooter from "@/app/(layouts)/SiteFooter";

interface Minicurso {
  id: number;
  title: string;
  speaker: string;
  time: string;
  room: string;
  description: string;
}

const minicursosList: Minicurso[] = [
  {
    id: 1,
    title: "Minicurso 1: Introdução aos Implantes",
    speaker: "Prof. Dr. Ricardo Silva",
    time: "16 Ago - 14:00 às 16:00",
    room: "Sala Multiuso A",
    description: "Compreenda os princípios básicos de engenharia mecânica por trás da fixação de pinos, placas e parafusos ortopédicos, entendendo como o osso se integra a esses materiais."
  },
  {
    id: 2,
    title: "Minicurso 2: Materiais Biocompatíveis",
    speaker: "Dra. Helena Souza (Eng. de Materiais)",
    time: "17 Ago - 10:00 às 12:00",
    room: "Auditório Principal",
    description: "Conheça as propriedades químicas e físicas de ligas metálicas (como o titânio), polímeros avançados e cerâmicas bioativas aplicadas em próteses modernas para evitar a rejeição pelo corpo."
  }
];

export default function MinicursosPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredIds, setRegisteredIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  
  const [toastMsg, setToastMsg] = useState<{ text: string; type: "success" | "error" | "warning" } | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const meRes = await fetch("/api/auth/me");
        if (meRes.ok) {
          setIsLoggedIn(true);
          // Buscar minicursos já inscritos
          const miniRes = await fetch("/api/minicursos");
          if (miniRes.ok) {
            const data = await miniRes.json();
            setRegisteredIds(data.minicursos || []);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar dados de autenticação:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleEnroll = async (minicursoId: number) => {
    if (!isLoggedIn) {
      setToastMsg({
        text: "Você precisa estar inscrito no evento e logado para fazer inscrição nos minicursos.",
        type: "warning"
      });
      return;
    }

    setActionLoading(minicursoId);
    setToastMsg(null);

    try {
      const res = await fetch("/api/minicursos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minicursoId })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erro ao realizar inscrição.");
      }

      setRegisteredIds((prev) => [...prev, minicursoId]);
      setToastMsg({
        text: "Inscrição no minicurso realizada com sucesso!",
        type: "success"
      });
    } catch (err: any) {
      setToastMsg({
        text: err.message || "Erro de conexão. Tente novamente.",
        type: "error"
      });
    } finally {
      setActionLoading(null);
    }
  };

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
          <div className="border-b border-slate-200 pb-6 mb-8 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 font-display">
              Oficinas & Minicursos
            </h1>
            <p className="text-sm text-slate-500 mt-2">
              Inscrições exclusivas e gratuitas para participantes inscritos no evento principal.
            </p>
          </div>

          {/* Toast Notification */}
          {toastMsg ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-6 p-4 rounded-xl text-sm shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-white ${
                toastMsg.type === "success"
                  ? "bg-rehab-500"
                  : toastMsg.type === "warning"
                  ? "bg-amber-500"
                  : "bg-red-500"
              }`}
            >
              <span>{toastMsg.text}</span>
              {toastMsg.type === "warning" ? (
                <div className="flex gap-2">
                  <Link
                    href="/login"
                    className="bg-white/20 hover:bg-white/35 px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap"
                  >
                    Fazer Login
                  </Link>
                  <Link
                    href="/#inscricao"
                    className="bg-white text-slate-900 hover:bg-slate-100 px-3 py-1 rounded-lg text-xs font-bold transition whitespace-nowrap"
                  >
                    Criar Cadastro
                  </Link>
                </div>
              ) : null}
            </motion.div>
          ) : null}

          {loading ? (
            <div className="text-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-clinic-600 mx-auto"></div>
              <p className="mt-3 text-sm text-slate-500">Buscando minicursos...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {minicursosList.map((curso) => {
                const isInscrito = registeredIds.includes(curso.id);
                const isLoadingBtn = actionLoading === curso.id;

                return (
                  <div
                    key={curso.id}
                    className="card-surface p-6 bg-white border border-slate-100 shadow-sm flex flex-col justify-between sm:flex-row gap-6 items-start sm:items-center relative overflow-hidden"
                  >
                    {isInscrito ? (
                      <div className="absolute top-0 right-0 bg-rehab-500 text-white text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-bl-lg">
                        Inscrito ✓
                      </div>
                    ) : null}
                    
                    <div className="space-y-2 flex-grow max-w-2xl">
                      <span className="inline-block text-xs font-semibold text-clinic-600 bg-clinic-50 border border-clinic-100 px-2 py-0.5 rounded">
                        Minicurso
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">
                        {curso.title}
                      </h2>
                      <p className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                        <span>🎙️ {curso.speaker}</span>
                        <span>📅 {curso.time}</span>
                        <span>📍 {curso.room}</span>
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mt-2">
                        {curso.description}
                      </p>
                    </div>

                    <div className="flex-shrink-0 self-stretch sm:self-center flex items-center">
                      <Button
                        onClick={() => handleEnroll(curso.id)}
                        disabled={isInscrito || isLoadingBtn}
                        variant={isInscrito ? "secondary" : "primary"}
                        className={`w-full sm:w-auto px-6 py-2.5 ${
                          isInscrito ? "bg-slate-100 text-slate-400 hover:bg-slate-100 cursor-not-allowed shadow-none" : ""
                        }`}
                      >
                        {isLoadingBtn ? "Processando..." : isInscrito ? "Inscrito" : "Inscrever-se"}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      <SiteFooter />
    </div>
  );
}
