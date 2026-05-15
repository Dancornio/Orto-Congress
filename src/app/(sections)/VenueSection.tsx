import SectionHeader from "@/app/(components)/SectionHeader";
import { site } from "@/lib/site";

export default function VenueSection() {
  return (
    <section id="local" className="bg-slate-900 py-20 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeader
            eyebrow="Local"
            title="Brasilias hub de convencoes"
            subtitle="Infraestrutura moderna, acesso facil e hospitalidade planejada."
          />
          <div className="mt-6 text-sm text-slate-200">
            <p className="font-semibold">{site.venue}</p>
            <p>{site.address}</p>
            <p className="mt-4">Transporte: aeroporto a 20 minutos.</p>
            <p>Hoteis proximos com tarifas especiais.</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl bg-white">
          <iframe
            title="Mapa do congresso"
            src="https://www.google.com/maps?q=Brasilia%20DF&output=embed"
            className="h-80 w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
