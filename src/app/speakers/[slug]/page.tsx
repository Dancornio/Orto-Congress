import Image from "next/image";
import { notFound } from "next/navigation";

import SiteFooter from "@/app/(layouts)/SiteFooter";
import SiteHeader from "@/app/(layouts)/SiteHeader";
import { getSpeaker, speakers } from "@/lib/speakers";

export function generateStaticParams() {
  return speakers.map((speaker) => ({ slug: speaker.slug }));
}

export default function SpeakerDetailPage({
  params
}: {
  params: { slug: string };
}) {
  const speaker = getSpeaker(params.slug);

  if (!speaker) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SiteHeader />
      <main className="pt-24">
        <section className="section-shell py-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="card-surface p-8">
              <div className="relative h-56 w-56 overflow-hidden rounded-full bg-slate-100">
                <Image
                  src={speaker.image}
                  alt={`Foto de ${speaker.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6">
                <p className="text-xs uppercase tracking-[0.2em] text-clinic-600">
                  {speaker.keynote ? "Keynote" : speaker.track}
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                  {speaker.name}
                </h1>
                <p className="mt-2 text-slate-600">{speaker.title}</p>
                <p className="text-slate-500">{speaker.affiliation}</p>
              </div>
            </div>
            <div className="card-surface p-8">
              <h2 className="text-2xl font-semibold text-slate-900">
                Bio / Bio
              </h2>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {speaker.bio}
              </p>
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-slate-900">
                  Temas / Topics
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {speaker.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full bg-clinic-50 px-3 py-1 text-xs font-semibold text-clinic-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
