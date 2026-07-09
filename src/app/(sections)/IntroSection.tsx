"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { ButtonLink } from "@/app/(components)/Button";
import SectionHeader from "@/app/(components)/SectionHeader";

export default function IntroSection() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch("/api/registrations/count");
        if (response.ok) {
          const data = await response.json();
          setCount(data.count);
        }
      } catch (err) {
        console.error("Erro ao buscar contador:", err);
      }
    }
    fetchCount();
  }, []);

  return (
    <section id="apresentacao" className="bg-slate-100/50 py-20 border-y border-slate-200/50">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">

          {/* Apresentação do Congresso e Botões */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeader
              eyebrow="Sobre o Evento"
              title="Por Dentro do Corpo, Sem Medo do Implante"
              subtitle="Desmistificando a engenharia de próteses e implantes ortopédicos para toda a comunidade."
            />

            <div className="mt-6 space-y-4 text-slate-600 text-base leading-relaxed">
              <p>
                Milhares de pessoas convivem diariamente com implantes ortopédicos como pinos, placas, parafusos e próteses. No entanto, é muito comum que a falta de informação clara gere medo e insegurança sobre esses materiais e os procedimentos de reabilitação.
              </p>
              <p>
                Nosso congresso de extensão conecta a engenharia biomédica e a medicina à sociedade. Aqui você aprenderá, de maneira simples e acessível, como a tecnologia ortopédica devolve a mobilidade com total segurança, qualidade e biocompatibilidade.
              </p>
            </div>

            {/* Contador de Inscritos em Tempo Real */}
            {count !== null ? (
              <div className="mt-8 inline-flex items-center gap-3 rounded-full bg-clinic-50 border border-clinic-100 px-4 py-2 text-sm text-clinic-800 font-semibold shadow-sm">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-clinic-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-clinic-500"></span>
                </span>
                <span>Junte-se a <strong className="text-lg text-clinic-900">{count}</strong> participantes já inscritos no evento!</span>
              </div>
            ) : null}

            {/* Botões Principais Requeridos */}
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/#inscricao" variant="primary">
                Inscrever-se no Evento
              </ButtonLink>
              <ButtonLink href="/minicursos" variant="secondary">
                Minicursos
              </ButtonLink>
              <ButtonLink href="/certificados" variant="ghost">
                Certificados
              </ButtonLink>
            </div>
          </motion.div>

          {/* Vídeo Incorporado (YouTube) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="w-full"
          >
            <div className="card-surface overflow-hidden p-0 border border-slate-200 shadow-xl bg-white aspect-video relative group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/-M2SVoH2yRg?si=XFzfgshR2jJtNOFz"
                title="Vídeo de Apresentação do Congresso Ortopedia e Próteses"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <p className="mt-3 text-center text-xs text-slate-400 italic">
              Vídeo educativo: Entenda como funcionam os implantes ortopédicos modernos.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
