"use client";

import Image from "next/image";

import Badge from "@/app/(components)/Badge";
import { Button } from "@/app/(components)/Button";
import type { Speaker } from "@/lib/speakers";

export default function SpeakerCard({
  speaker,
  onOpen
}: {
  speaker: Speaker;
  onOpen: (speaker: Speaker) => void;
}) {
  return (
    <div className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-card ring-1 ring-slate-100 transition hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between">
        <Badge className={speaker.keynote ? "bg-accent-100 text-accent-600" : undefined}>
          {speaker.keynote ? "Keynote" : speaker.track}
        </Badge>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-slate-100">
          <Image
            src={speaker.image}
            alt={`Foto de ${speaker.name}`}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {speaker.name}
          </h3>
          <p className="text-sm text-slate-600">{speaker.title}</p>
          <p className="text-xs text-slate-500">{speaker.affiliation}</p>
        </div>
      </div>
      <p className="mt-5 text-sm text-slate-600 leading-relaxed">
        {speaker.bio}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {speaker.topics.map((topic) => (
          <span
            key={topic}
            className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-600"
          >
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-6">
        <Button variant="ghost" onClick={() => onOpen(speaker)}>
          Ver detalhes
        </Button>
      </div>
    </div>
  );
}
