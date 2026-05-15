"use client";

import { useMemo, useState } from "react";

import ScheduleItemCard from "@/app/(components)/ScheduleItemCard";
import SectionHeader from "@/app/(components)/SectionHeader";
import { schedule, scheduleDays, scheduleRooms } from "@/lib/schedule";

export default function ProgramSection({ showAll = false }: { showAll?: boolean }) {
  const [day, setDay] = useState(scheduleDays[0]);
  const [room, setRoom] = useState("Todas");

  const filtered = useMemo(() => {
    return schedule.filter((item) => {
      const matchesDay = item.day === day;
      const matchesRoom = room === "Todas" || item.room === room;
      return matchesDay && matchesRoom;
    });
  }, [day, room]);

  const list = showAll ? filtered : filtered.slice(0, 4);

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
            <ScheduleItemCard key={`${item.day}-${item.time}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
