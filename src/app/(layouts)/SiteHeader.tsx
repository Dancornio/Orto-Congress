"use client";

import { useState } from "react";
import Link from "next/link";

import { ButtonLink } from "@/app/(components)/Button";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinic-600 text-white">
            <span className="text-sm font-semibold">OP</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">
              {site.shortName}
            </p>
            <p className="text-xs text-slate-500">{site.city}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-600 hover:text-clinic-600"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:flex">
          <ButtonLink href="#inscricao" variant="primary">
            Inscreva-se
          </ButtonLink>
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 lg:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          Menu
        </button>
      </div>
      {isOpen ? (
        <div id="mobile-menu" className="border-t border-slate-100 bg-white">
          <div className="section-shell flex flex-col gap-4 py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <ButtonLink href="#inscricao" variant="primary">
              Inscreva-se
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </header>
  );
}
