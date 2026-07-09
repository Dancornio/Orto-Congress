"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { ButtonLink } from "@/app/(components)/Button";
import { navLinks, site } from "@/lib/site";

export default function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<{ name: string } | null>(null);

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        setUser(null);
      }
    }
    checkUser();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="section-shell flex h-16 lg:h-20 items-center justify-between transition-all duration-300">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-clinic-600 text-white">
            <span className="text-sm font-semibold">PT</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-slate-900">
              {site.shortName}
            </p>
            <p className="text-xs text-slate-500">{site.city}</p>
          </div>
        </Link>
        <nav className="hidden items-center gap-2 xl:gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs xl:text-sm font-medium text-slate-600 hover:text-clinic-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden xl:flex">
          {user ? (
            <ButtonLink href="/dashboard" variant="primary">
              Participante
            </ButtonLink>
          ) : (
            <ButtonLink href="/#inscricao" variant="primary">
              Login
            </ButtonLink>
          )}
        </div>
        <button
          type="button"
          className="flex items-center justify-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 xl:hidden"
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
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <ButtonLink href="/dashboard" variant="primary">
                Área do Participante
              </ButtonLink>
            ) : (
              <ButtonLink href="/#inscricao" variant="primary">
                Inscreva-se
              </ButtonLink>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
