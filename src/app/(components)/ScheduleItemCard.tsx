import { cn } from "@/lib/cn";
import type { ScheduleItem } from "@/lib/schedule";

export default function ScheduleItemCard({
  item
}: {
  item: ScheduleItem;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-slate-100 bg-white/90 p-5 shadow-sm",
        item.type === "Keynote" ? "ring-1 ring-accent-200" : ""
      )}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-slate-500">
        <span>{item.time}</span>
        <span>{item.room}</span>
      </div>
      <h3 className="text-base font-semibold text-slate-900">
        {item.title}
      </h3>
      <p className="text-sm text-slate-600">{item.type}</p>
    </div>
  );
}
