export default function SectionHeader({
  eyebrow,
  title,
  subtitle
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="section-label">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl font-display">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-slate-600 sm:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
