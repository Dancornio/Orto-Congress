"use client";

import { useMemo, useState } from "react";

import ScheduleItemCard from "@/app/(components)/ScheduleItemCard";
import SectionHeader from "@/app/(components)/SectionHeader";
import Modal from "@/app/(components)/Modal";
import { schedule, scheduleDays, scheduleRooms, type ScheduleItem } from "@/lib/schedule";
import { speakers } from "@/lib/speakers";

export default function ProgramSection({ showAll = false }: { showAll?: boolean }) {
  const [day, setDay] = useState(scheduleDays[0]);
  const [room, setRoom] = useState("Todas");
  const [activeEvent, setActiveEvent] = useState<ScheduleItem | null>(null);

  const filtered = useMemo(() => {
    return schedule.filter((item) => {
      const matchesDay = item.day === day;
      const matchesRoom = room === "Todas" || item.room === room;
      return matchesDay && matchesRoom;
    });
  }, [day, room]);

  const list = showAll ? filtered : filtered.slice(0, 4);

  // Encontrar o palestrante se houver speakerSlug associado ao evento ativo
  const speaker = speakers.find((s) => s.slug === activeEvent?.speakerSlug);

  return (
    <section id="programacao" className="bg-white/70 py-20">
      <div className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Agenda"
            title="Programacao estrategica por trilhas"
            subtitle="Filtre por dia e sala para encontrar temas prioritarios."
          />
          <a
            href="/docs/programacao.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
          >
            Baixar PDF
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          {scheduleDays.map((itemDay) => (
            <button
              key={itemDay}
              onClick={() => setDay(itemDay)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                day === itemDay
                  ? "bg-clinic-600 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {itemDay}
            </button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          {["Todas", ...scheduleRooms].map((itemRoom) => (
            <button
              key={itemRoom}
              onClick={() => setRoom(itemRoom)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                room === itemRoom
                  ? "bg-rehab-500 text-white"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {itemRoom}
            </button>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {list.map((item) => (
            <ScheduleItemCard 
              key={`${item.day}-${item.time}`} 
              item={item} 
              onOpen={setActiveEvent}
            />
          ))}
        </div>
      </div>

      {/* Modal de Detalhes do Evento da Agenda */}
      <Modal
        isOpen={!!activeEvent}
        title={activeEvent?.title ?? "Detalhes do Evento"}
        onClose={() => setActiveEvent(null)}
      >
        {activeEvent && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-100 pb-3">
              <span>📅 {activeEvent.dateLabel}</span>
              <span>•</span>
              <span>⏰ {activeEvent.time}</span>
              <span>•</span>
              <span>📍 {activeEvent.room}</span>
              <span>•</span>
              <span className="text-clinic-600 font-bold">{activeEvent.type}</span>
            </div>

            {speaker ? (
              <div className="space-y-4 mt-4 text-slate-700">
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Palestrante Confirmado</h4>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="h-12 w-12 rounded-full bg-clinic-50 border border-clinic-200 overflow-hidden flex items-center justify-center font-bold text-clinic-600 text-lg">
                      {speaker.name[0]}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-base">{speaker.name}</p>
                      <p className="text-xs text-slate-500">{speaker.title} · {speaker.affiliation}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Biografia</h4>
                  <p className="text-sm text-slate-600 leading-relaxed mt-2 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                    "{speaker.bio}"
                  </p>
                </div>

                {speaker.topics && (
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Tópicos Abordados</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {speaker.topics.map((topic) => (
                        <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3 mt-4 text-slate-700">
                <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Sobre esta Sessão</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Esta é uma sessão integrada do tipo <strong>{activeEvent.type.toLowerCase()}</strong> da programação oficial do congresso. Ela ocorrerá na <strong>{activeEvent.room}</strong> no horário de <strong>{activeEvent.time}</strong>. O evento incentiva debates abertos e a interação dos participantes com perguntas ao final.
                </p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
