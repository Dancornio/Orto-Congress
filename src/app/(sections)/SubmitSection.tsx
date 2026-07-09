"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SectionHeader from "@/app/(components)/SectionHeader";
import { Button, ButtonLink } from "@/app/(components)/Button";

export default function SubmitSection({ showAll = false }: { showAll?: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);
  
  const [title, setTitle] = useState("");
  const [authors, setAuthors] = useState("");
  const [fileName, setFileName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setLoadingAuth(false);
      }
    }
    
    if (showAll) {
      checkUser();
    } else {
      setLoadingAuth(false);
    }
  }, [showAll]);

  const handleSubmitPaper = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !authors.trim() || !fileName || isSubmitting) return;

    setIsSubmitting(true);

    // Simulação do envio (campo ficcional de upload de documento)
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

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
          {!showAll && (
            <div className="mt-6">
              <ButtonLink href="/submit" variant="secondary">
                Submeter trabalho
              </ButtonLink>
            </div>
          )}
        </div>
      </div>
      
      {showAll ? (
        <div className="mt-12 space-y-8">
          {/* Regras */}
          <div className="card-surface p-6 bg-white border border-slate-100 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">
              Regras de submissao
            </h3>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              Envie um resumo de ate 500 palavras, com objetivo, metodo, resultados
              e conclusoes. Inclua ate 5 palavras-chave e informe conflitos de
              interesse. O arquivo deve ser enviado em formato PDF ou DOCX.
            </p>
          </div>

          {/* Formulário com validação de Login */}
          <div className="card-surface p-8 bg-white border border-slate-100 shadow-md">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
              Envio de Trabalho Acadêmico
            </h3>

            {loadingAuth ? (
              <div className="py-8 text-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-clinic-600 mx-auto"></div>
                <p className="mt-3 text-sm text-slate-500">Verificando autorização...</p>
              </div>
            ) : !isLoggedIn ? (
              // Mensagem bloqueada se não estiver logado
              <div className="mt-6 p-6 rounded-2xl bg-amber-50 border border-amber-200 text-center space-y-4">
                <div className="h-12 w-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto text-lg font-bold">
                  🔒
                </div>
                <div>
                  <h4 className="font-bold text-amber-900 text-base">Acesso Restrito</h4>
                  <p className="text-sm text-amber-700 mt-1 max-w-md mx-auto">
                    Você deve estar inscrito no evento e logado no site para poder submeter arquivos e trabalhos científicos.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <Link
                    href="/login"
                    className="bg-clinic-600 hover:bg-clinic-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Fazer Login
                  </Link>
                  <Link
                    href="/#inscricao"
                    className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-5 py-2.5 rounded-lg text-sm font-semibold transition"
                  >
                    Fazer Inscrição
                  </Link>
                </div>
              </div>
            ) : submitSuccess ? (
              // Mensagem de sucesso
              <div className="mt-6 p-6 rounded-2xl bg-rehab-50 border border-rehab-200 text-center space-y-3">
                <div className="h-12 w-12 rounded-full bg-rehab-100 text-rehab-700 flex items-center justify-center mx-auto text-lg font-bold">
                  ✓
                </div>
                <h4 className="font-bold text-rehab-900 text-base">Trabalho Enviado!</h4>
                <p className="text-sm text-rehab-700 max-w-md mx-auto">
                  O arquivo <strong>"{fileName}"</strong> foi enviado com sucesso para a nossa banca de avaliação técnica.
                </p>
                <div className="pt-2">
                  <Button
                    onClick={() => {
                      setSubmitSuccess(false);
                      setTitle("");
                      setAuthors("");
                      setFileName("");
                    }}
                    variant="primary"
                  >
                    Enviar Outro Trabalho
                  </Button>
                </div>
              </div>
            ) : (
              // Formulário de envio liberado para logados
              <form onSubmit={handleSubmitPaper} className="mt-6 space-y-6">
                <div>
                  <label className="text-sm font-semibold text-slate-800" htmlFor="title">
                    Título do Trabalho
                  </label>
                  <input
                    id="title"
                    type="text"
                    required
                    value={title}
                    disabled={isSubmitting}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-clinic-500 focus:ring-1 focus:ring-clinic-500"
                    placeholder="Ex: Análise Biomecânica de Próteses de Titânio"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-800" htmlFor="authors">
                    Autores (separados por vírgula)
                  </label>
                  <input
                    id="authors"
                    type="text"
                    required
                    value={authors}
                    disabled={isSubmitting}
                    onChange={(e) => setAuthors(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-clinic-500 focus:ring-1 focus:ring-clinic-500"
                    placeholder="Ex: João Silva, Dra. Maria Oliveira"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold text-slate-800 block">
                    Documento Científico (PDF ou DOCX)
                  </label>
                  <div className="mt-2 border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-clinic-500 transition-colors relative cursor-pointer">
                    <input
                      type="file"
                      required
                      accept=".pdf,.docx,.doc"
                      disabled={isSubmitting}
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setFileName(file.name);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-2">
                      <p className="text-2xl">📄</p>
                      <p className="text-sm text-slate-600">
                        {fileName ? (
                          <span>Arquivo selecionado: <strong className="text-slate-900">{fileName}</strong></span>
                        ) : (
                          "Arraste seu arquivo aqui ou clique para selecionar"
                        )}
                      </p>
                      <p className="text-xs text-slate-400">PDF, DOC ou DOCX até 10MB</p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3"
                  disabled={!title || !authors || !fileName || isSubmitting}
                >
                  {isSubmitting ? "Enviando Trabalho..." : "Submeter Trabalho"}
                </Button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
