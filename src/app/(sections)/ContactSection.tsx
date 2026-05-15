import SectionHeader from "@/app/(components)/SectionHeader";
import { site } from "@/lib/site";

export default function ContactSection() {
  return (
    <section id="contato" className="section-shell py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeader
          eyebrow="Contato"
          title="Fale com nossa equipe"
          subtitle="Respondemos em ate 48 horas com orientacoes e suporte."
        />
        <div className="card-surface p-6">
          <p className="text-sm text-slate-600">Email</p>
          <p className="text-lg font-semibold text-slate-900">
            {site.contactEmail}
          </p>
          <p className="mt-4 text-sm text-slate-600">Telefone</p>
          <p className="text-lg font-semibold text-slate-900">
            {site.contactPhone}
          </p>
          <p className="mt-6 text-sm text-slate-600">
            Atendimento: seg a sex, 9h-18h.
          </p>
        </div>
      </div>
    </section>
  );
}
