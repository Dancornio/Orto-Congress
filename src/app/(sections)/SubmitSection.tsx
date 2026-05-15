import SectionHeader from "@/app/(components)/SectionHeader";
import { ButtonLink } from "@/app/(components)/Button";

export default function SubmitSection({ showAll = false }: { showAll?: boolean }) {
  return (
    <section id="submissoes" className="section-shell py-20">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <SectionHeader
          eyebrow="Submissoes"
          title="Envie pesquisas e casos clinicos"
          subtitle="Aceitamos resumos para apresentacoes orais, paineis e posters." 
        />
        <div className="card-surface p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Prazos importantes
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-600">
            <li>Envio de abstracts: ate 30/04/2026</li>
            <li>Resultado: 15/06/2026</li>
            <li>Versao final: 20/07/2026</li>
          </ul>
          <div className="mt-6 rounded-2xl bg-rehab-50 p-4 text-sm text-slate-700">
            <p className="font-semibold">Formatos aceitos</p>
            <p className="mt-2">Painel, poster ou comunicacao oral.</p>
          </div>
          <div className="mt-6">
            <ButtonLink href="/submit" variant="secondary">
              Submeter trabalho
            </ButtonLink>
          </div>
        </div>
      </div>
      {showAll ? (
        <div className="mt-10 card-surface p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Regras de submissao
          </h3>
          <p className="mt-3 text-sm text-slate-600">
            Envie um resumo de ate 500 palavras, com objetivo, metodo, resultados
            e conclusoes. Inclua ate 5 palavras-chave e informe conflitos de
            interesse.
          </p>
        </div>
      ) : null}
    </section>
  );
}
