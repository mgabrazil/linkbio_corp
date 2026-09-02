# LinkBio Corp

Aplicação web construída com **Next.js (App Router)**, **TypeScript** e **Tailwind CSS v4**.

## Stack

| Ferramenta   | Versão |
| ------------ | ------ |
| Next.js      | 16.x   |
| React        | 19.x   |
| TypeScript   | 5.x    |
| Tailwind CSS | 4.x    |
| ESLint       | 9.x    |
| Prettier     | 3.x    |

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev
```

A aplicação sobe em http://localhost:3000.

## Scripts

| Script                 | Descrição                               |
| ---------------------- | --------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento (Turbopack) |
| `npm run build`        | Build de produção                       |
| `npm run start`        | Sobe o build de produção                |
| `npm run lint`         | ESLint                                  |
| `npm run lint:fix`     | ESLint com correção automática          |
| `npm run typecheck`    | Checagem de tipos (`tsc --noEmit`)      |
| `npm run format`       | Formata o projeto com Prettier          |
| `npm run format:check` | Verifica formatação                     |

## Estrutura

```
src/
├── app/                    # App Router: rotas e layouts
│   ├── error.tsx           # Error boundary de rota
│   ├── globals.css         # Tailwind + tokens de tema
│   ├── layout.tsx          # Root layout (fontes, metadata, header/footer)
│   ├── loading.tsx         # Estado de carregamento (Suspense)
│   ├── not-found.tsx       # Página 404
│   └── page.tsx            # Rota /
├── components/
│   ├── layout/             # Header, Footer — estrutura de página
│   └── ui/                 # Componentes base reutilizáveis
├── config/
│   └── site.ts             # Nome, descrição, navegação e links do site
├── hooks/                  # React hooks compartilhados
├── lib/
│   ├── env.ts              # Leitura validada de variáveis de ambiente
│   └── utils.ts            # cn(), formatDate(), slugify()
└── types/
    └── index.ts            # Tipos compartilhados
```

### Convenções

- **Alias de import:** `@/*` aponta para `src/*`.
- **Server Components por padrão.** Use `"use client"` apenas onde houver estado, efeito ou API do browser.
- **Estilo:** Tailwind v4 configurado via CSS (`@import "tailwindcss"` e `@theme` em `src/app/globals.css`) — não existe `tailwind.config.js`.
- **Variáveis de ambiente:** declare em `.env.example`, consuma por `@/lib/env`.

## Variáveis de ambiente

| Nome                  | Obrigatória | Descrição                                        |
| --------------------- | ----------- | ------------------------------------------------ |
| `NEXT_PUBLIC_APP_URL` | Sim         | URL pública, usada em metadata e links absolutos |
