import Image from "next/image";

import SectionHeader from "@/app/(components)/SectionHeader";
import sponsors from "@/data/sponsors.json";

export default function SponsorsSection() {
  return (
    <section id="patrocinadores" className="section-shell py-20">
      <SectionHeader
        eyebrow="Parceiros"
        title="Patrocinadores e apoiadores"
        subtitle="Marcas que impulsionam pesquisa, tecnologia e reabilitacao."
      />
      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {sponsors.map((sponsor) => (
          <div
            key={sponsor.name}
            className="flex flex-col items-center justify-center rounded-2xl bg-white p-6 text-center shadow-sm"
          >
            <Image
              src={sponsor.logo}
              alt={`Logo ${sponsor.name}`}
              width={120}
              height={80}
              className="h-16 w-auto"
            />
            <p className="mt-4 text-sm font-semibold text-slate-900">
              {sponsor.name}
            </p>
            <p className="text-xs text-slate-500">{sponsor.tier}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
