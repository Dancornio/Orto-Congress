import SectionHeader from "@/app/(components)/SectionHeader";

export default function AboutSection() {
  return (
    <section id="sobre" className="section-shell py-20">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeader
          eyebrow="Missao"
          title="Conectar conhecimento, tecnologia e reabilitacao"
          subtitle="Um congresso focado em inovacao clinica, pesquisa aplicada e colaboracao multidisciplinar."
        />
        <div className="card-surface p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Para quem / Audience
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Cirurgioes ortopedistas e especialistas em protese</li>
            <li>Fisioterapeutas e equipes de reabilitacao</li>
            <li>Engenheiros biomedicos e pesquisadores</li>
            <li>Gestores de hospitais e industria</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-clinic-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Temas-chave 2026</p>
            <p className="mt-2">
              Protese inteligente, biomecanica avancada, reabilitacao digital e
              cuidados centrados no paciente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
