import Link from "next/link";

import { socialLinks, site } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            {site.shortName}
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            {site.theme}. {site.dateRange} - {site.city}.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contato</h4>
          <p className="mt-3 text-sm text-slate-600">{site.contactEmail}</p>
          <p className="text-sm text-slate-600">{site.contactPhone}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Redes</h4>
          <div className="mt-3 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 hover:text-clinic-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 py-6 text-center text-xs text-slate-500">
        <p>Politica de Privacidade | Creditos e realizacao</p>
      </div>
    </footer>
  );
}
