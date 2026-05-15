import { ButtonLink } from "@/app/(components)/Button";

export default function CTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-100 bg-white/95 p-3 shadow-lg lg:hidden">
      <div className="section-shell flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
            Inscricoes abertas
          </p>
          <p className="text-sm font-semibold text-slate-900">
            Garanta sua vaga
          </p>
        </div>
        <ButtonLink href="/register" variant="primary" className="px-4 py-2">
          Inscreva-se
        </ButtonLink>
      </div>
    </div>
  );
}
