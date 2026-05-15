import { ButtonLink } from "@/app/(components)/Button";
import { cn } from "@/lib/cn";

export default function PricingCard({
  title,
  price,
  description,
  features,
  highlight
}: {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-card",
        highlight ? "ring-2 ring-accent-400" : ""
      )}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-clinic-600">
          {title}
        </p>
        <h3 className="mt-4 text-3xl font-semibold text-slate-900">
          {price}
        </h3>
        <p className="mt-3 text-sm text-slate-600">{description}</p>
      </div>
      <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-600">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-rehab-400" />
            {feature}
          </li>
        ))}
      </ul>
      <ButtonLink href="/register" className="mt-6" variant="primary">
        Garantir vaga
      </ButtonLink>
    </div>
  );
}
