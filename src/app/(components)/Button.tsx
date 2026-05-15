import Link from "next/link";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-accent-500 text-white shadow hover:bg-accent-600",
  secondary:
    "bg-clinic-600 text-white shadow hover:bg-clinic-700",
  ghost:
    "bg-white/80 text-slate-700 ring-1 ring-slate-200 hover:bg-white"
};

export function Button({
  variant = "primary",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(baseClasses, variants[variant], className)} {...props} />
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={cn(baseClasses, variants[variant], className)}>
      {children}
    </Link>
  );
}
