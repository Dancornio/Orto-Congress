"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import Modal from "@/app/(components)/Modal";
import SearchInput from "@/app/(components)/SearchInput";
import SectionHeader from "@/app/(components)/SectionHeader";
import SpeakerCard from "@/app/(components)/SpeakerCard";
import { speakers, type Speaker } from "@/lib/speakers";

export default function SpeakersSection({ showAll = false }: { showAll?: boolean }) {
  const [search, setSearch] = useState("");
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);

  const filtered = useMemo(() => {
    const term = search.toLowerCase();
    return speakers.filter((speaker) =>
      [speaker.name, speaker.track, ...speaker.topics]
        .join(" ")
        .toLowerCase()
        .includes(term)
    );
  }, [search]);

  const list = showAll ? filtered : filtered.slice(0, 3);

  return (
    <section id="palestrantes" className="section-shell py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Keynotes"
          title="Especialistas e lideres da inovação"
          subtitle="Palestras internacionais com foco em tecnologia, reabilitação e novos materiais."
        />
        <div className="w-full max-w-xs">
          <SearchInput
            value={search}
            onChange={setSearch}
            placeholder="Buscar por tema ou palestrante"
          />
        </div>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {list.map((speaker) => (
          <SpeakerCard
            key={speaker.slug}
            speaker={speaker}
            onOpen={setActiveSpeaker}
          />
        ))}
      </div>
      {!showAll ? (
        <div className="mt-8">
          <Link
            href="/speakers"
            className="text-sm font-semibold text-clinic-600"
          >
            Ver todos os palestrantes
          </Link>
        </div>
      ) : null}
      <Modal
        isOpen={!!activeSpeaker}
        title={activeSpeaker?.name ?? "Detalhes"}
        onClose={() => setActiveSpeaker(null)}
      >
        <p className="text-sm text-slate-600">
          {activeSpeaker?.bio}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {activeSpeaker?.topics.map((topic) => (
            <span
              key={topic}
              className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600"
            >
              {topic}
            </span>
          ))}
        </div>
      </Modal>
    </section>
  );
}
