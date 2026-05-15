"use client";

import { cn } from "@/lib/cn";

export default function SearchInput({
  value,
  onChange,
  placeholder,
  className
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-full border border-slate-200 bg-white/90 px-4 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-clinic-400 focus:ring-2 focus:ring-clinic-200"
        aria-label={placeholder}
      />
    </div>
  );
}
