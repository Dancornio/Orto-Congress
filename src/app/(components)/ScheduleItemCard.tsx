"use client";

import { cn } from "@/lib/cn";
import type { ScheduleItem } from "@/lib/schedule";

export default function ScheduleItemCard({
  item,
  onOpen
}: {
  item: ScheduleItem;
  onOpen: (item: ScheduleItem) => void;
}) {
  return (
    <div
      onClick={() => onOpen(item)}
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm transition-all duration-300 cursor-pointer select-none",
        "hover:border-clinic-500 hover:ring-1 hover:ring-clinic-500 hover:shadow-md"
      )}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
        <span>{item.time}</span>
        <span>{item.room}</span>
      </div>
      
      <h3 className="text-base font-semibold text-slate-900 mt-1">
        {item.title}
      </h3>
      
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-slate-600 font-medium">{item.type}</p>
        <span className="text-xs text-clinic-600 font-semibold hover:underline">
          Ver detalhes ▼
        </span>
      </div>
    </div>
  );
}
