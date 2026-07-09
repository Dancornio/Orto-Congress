"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/app/(components)/Button";
import SectionHeader from "@/app/(components)/SectionHeader";

const ticketOptions = [
  "Early Bird",
  "Profissional",
  "Estudante",
  "On-site"
];

export default function RegistrationSection() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    ticket: "Early Bird",
    institution: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const progress = useMemo(() => {
    const fields = [form.name, form.email, form.phone, form.password, form.institution, form.ticket];
    const filled = fields.filter((value) => value.trim().length > 0).length;
    const consent = form.consent ? 1 : 0;
    return Math.round(((filled + consent) / (fields.length + 1)) * 100);
  }, [form]);

  const errors = {
    name: form.name.trim().length === 0,
    email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email),
    phone: form.phone.trim().length === 0,
    password: form.password.length < 6,
    consent: !form.consent
  };

  const isValid = !errors.name && !errors.email && !errors.phone && !errors.password && !errors.consent;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!isValid || loading) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Algo deu errado ao enviar a inscrição.");
      }

      setSubmitted(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        ticket: "Early Bird",
        institution: "",
        consent: false
      });
      
      // Redireciona para a tela de login após 2 segundos
      setTimeout(() => {
        setSubmitted(false);
        router.push("/login?registered=true");
      }, 2000);
    } catch (err: any) {
      setErrorMsg(err.message || "Erro de conexão. Tente novamente.");
      setTimeout(() => setErrorMsg(null), 5000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-shell py-20" id="inscricao">
      <SectionHeader
        eyebrow="Inscricao"
        title="Finalize sua participacao"
        subtitle="Preencha o formulario e defina sua senha para acessar sua area do participante."
      />
      {submitted ? (
        <div
          className="fixed right-6 top-24 z-50 rounded-xl bg-rehab-500 px-4 py-3 text-sm text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          Inscrição enviada com sucesso! Redirecionando para o login...
        </div>
      ) : null}
      {errorMsg ? (
        <div
          className="fixed right-6 top-24 z-50 rounded-xl bg-red-500 px-4 py-3 text-sm text-white shadow-lg"
          role="status"
          aria-live="polite"
        >
          {errorMsg}
        </div>
      ) : null}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.7fr]">
        <form
          onSubmit={handleSubmit}
          className="card-surface space-y-6 p-6"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
              Progresso
            </p>
            <div className="mt-2 h-2 w-full rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-accent-500 transition"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-slate-500">{progress}%</p>
          </div>
          <div>
            <label className="text-sm font-semibold text-slate-900" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              value={form.name}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm ${
                errors.name ? "border-red-300" : "border-slate-200"
              }`}
              placeholder="Seu nome"
            />
            {errors.name ? (
              <p className="mt-1 text-xs text-red-500">
                Informe seu nome.
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-900"
              htmlFor="email"
            >
              Email profissional
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm ${
                errors.email ? "border-red-300" : "border-slate-200"
              }`}
              placeholder="voce@email.com"
            />
            {errors.email ? (
              <p className="mt-1 text-xs text-red-500">
                Email invalido.
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-900"
              htmlFor="phone"
            >
              Telefone / WhatsApp
            </label>
            <input
              id="phone"
              value={form.phone}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, phone: event.target.value }))
              }
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm ${
                errors.phone && form.phone.length > 0 ? "border-red-300" : "border-slate-200"
              }`}
              placeholder="(61) 99999-9999"
            />
            {errors.phone && form.phone.trim().length === 0 ? (
              <p className="mt-1 text-xs text-red-500">
                Informe seu telefone.
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-900"
              htmlFor="password"
            >
              Criar senha (mínimo 6 caracteres)
            </label>
            <input
              id="password"
              type="password"
              value={form.password}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              className={`mt-2 w-full rounded-xl border px-4 py-2 text-sm ${
                errors.password && form.password.length > 0 ? "border-red-300" : "border-slate-200"
              }`}
              placeholder="Sua senha secreta"
            />
            {errors.password && form.password.length > 0 ? (
              <p className="mt-1 text-xs text-red-500">
                A senha deve conter no mínimo 6 caracteres.
              </p>
            ) : null}
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-900"
              htmlFor="institution"
            >
              Instituicao
            </label>
            <input
              id="institution"
              value={form.institution}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, institution: event.target.value }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
              placeholder="Hospital ou universidade"
            />
          </div>
          <div>
            <label
              className="text-sm font-semibold text-slate-900"
              htmlFor="ticket"
            >
              Categoria
            </label>
            <select
              id="ticket"
              value={form.ticket}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, ticket: event.target.value }))
              }
              className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2 text-sm"
            >
              {ticketOptions.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
          </div>
          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              checked={form.consent}
              disabled={loading}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, consent: event.target.checked }))
              }
              className="mt-1"
            />
            Concordo em receber informacoes do evento.
          </label>
          {errors.consent ? (
            <p className="text-xs text-red-500">
              Confirme o consentimento.
            </p>
          ) : null}
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? "Enviando..." : "Enviar inscricao"}
          </Button>
          <p className="text-center text-sm text-slate-600">
            Já possui inscrição?{" "}
            <Link href="/login" className="font-semibold text-clinic-600 hover:underline">
              Acesse sua conta
            </Link>
          </p>
        </form>
        <div className="card-surface p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Duvidas frequentes
          </h3>
          <div className="mt-4 space-y-4 text-sm text-slate-600">
            <div>
              <p className="font-semibold text-slate-900">Pagamento</p>
              <p>
                Nossa equipe envia um link seguro em ate 24 horas.
              </p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Certificados</p>
              <p>Automatico ao final do evento.</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Hospedagem</p>
              <p>Lista de hoteis com desconto em julho.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
