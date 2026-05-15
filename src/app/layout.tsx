import "./globals.css";
import "./(styles)/theme.css";

import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";

import { site } from "@/lib/site";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

export const metadata: Metadata = {
  title: `${site.shortName} — ${site.city}`,
  description: `Congresso de ortopedia e proteses em ${site.city}, ${site.dateRange}. Cirurgioes, fisioterapeutas e pesquisadores em um encontro sobre tecnologia e reabilitacao.`,
  openGraph: {
    title: `${site.shortName} — ${site.city}`,
    description: `Encontro internacional sobre ortopedia, proteses e reabilitacao. ${site.dateRange} em ${site.city}.`,
    type: "website",
    images: ["/og.svg"]
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} font-sans text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
