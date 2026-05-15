# Congresso de Ortopedia & Proteses 2026

Landing page para o Congresso Internacional de Ortopedia & Proteses 2026, com Next.js (App Router) e Tailwind CSS.

## Requisitos

- Node.js 18+ e npm

## Como rodar

```bash
npm install
npm run dev
```

## Conteudo e dados

- Ajuste dados do evento em `src/lib/site.ts`.
- Edite palestrantes em `src/data/speakers.json`.
- Edite programacao em `src/data/schedule.json`.
- Substitua imagens em `public/` (placeholders).
- Substitua o PDF em `public/docs/programacao.pdf`.

## Estrutura

- `src/app/(components)` componentes reutilizaveis.
- `src/app/(layouts)` layout e navegacao.
- `src/app/(sections)` secoes da landing page.
- `src/app/(styles)` estilos adicionais.

## Deploy

Pronto para deploy na Vercel.
