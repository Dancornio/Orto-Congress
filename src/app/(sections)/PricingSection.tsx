import PricingCard from "@/app/(components)/PricingCard";
import SectionHeader from "@/app/(components)/SectionHeader";

const pricing = [
  {
    title: "Early Bird",
    price: "R$ 890",
    description: "Para inscricoes antecipadas ate 15/05.",
    features: [
      "Acesso completo",
      "Workshops praticos",
      "Certificado digital"
    ],
    highlight: true
  },
  {
    title: "Profissional",
    price: "R$ 1.150",
    description: "Acesso integral e networking premium.",
    features: [
      "Acesso a salas simultaneas",
      "Sessao com especialistas",
      "Kit do participante"
    ]
  },
  {
    title: "Estudante",
    price: "R$ 620",
    description: "Para graduandos e residentes.",
    features: [
      "Acesso ao congresso",
      "Mentoria de carreira",
      "Certificado digital"
    ]
  }
];

export default function PricingSection() {
  return (
    <section id="inscricao" className="section-shell py-20">
      <SectionHeader
        eyebrow="Inscricao"
        title="Planos e tarifas"
        subtitle="Garanta a melhor experiencia e escolha a categoria ideal."
      />
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {pricing.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {[
          {
            q: "Pagamento parcelado?",
            a: "Sim, em ate 6x no cartao."
          },
          {
            q: "Politica de cancelamento",
            a: "Reembolso integral ate 30 dias antes do evento."
          },
          {
            q: "Certificado",
            a: "Disponivel em ate 7 dias apos o evento."
          }
        ].map((faq) => (
          <div key={faq.q} className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">{faq.q}</p>
            <p className="mt-2 text-sm text-slate-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
