import { cn } from "@/lib/cn";

export default function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "rounded-full bg-clinic-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-clinic-700",
        className
      )}
    >
      {children}
    </span>
  );
}
