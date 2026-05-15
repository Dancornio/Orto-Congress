"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { ButtonLink } from "@/app/(components)/Button";
import { site } from "@/lib/site";

export default function HeroSection() {
  return (
    <section className="hero-grid relative overflow-hidden pt-24">
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />
      <div className="section-shell relative grid gap-10 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Congresso 2026</p>
          <h1 className="mt-4 text-4xl font-semibold text-slate-900 sm:text-5xl lg:text-6xl font-display">
            Congresso Internacional de Ortopedia & Proteses 2026
          </h1>
          <p className="mt-5 text-lg text-slate-600">
            {site.dateRange} · {site.city}
          </p>
          <p className="mt-6 max-w-xl text-base text-slate-600">
            Experiencias clinicas, tecnologia e reabilitacao avancada em um
            encontro que conecta ciencia, industria e cuidado humano.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href="#inscricao" variant="primary">
              {site.heroCtas.primary}
            </ButtonLink>
            <ButtonLink href="/schedule" variant="ghost">
              {site.heroCtas.secondary}
            </ButtonLink>
          </div>
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-600">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Publico
              </p>
              <p>Cirurgioes, fisioterapeutas e pesquisadores</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                Tema
              </p>
              <p>{site.theme}</p>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent-400/30 blur-2xl" />
          <div className="absolute -bottom-8 right-0 h-40 w-40 rounded-full bg-rehab-300/40 blur-3xl" />
          <div className="card-surface relative overflow-hidden p-6">
            <Image
              src="/illustrations/hero-prosthetics.svg"
              alt="Ilustracao de protese e reabilitacao"
              width={520}
              height={480}
              className="h-auto w-full"
              priority
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
