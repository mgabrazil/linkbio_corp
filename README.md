# LinkBio Corp

Cartões digitais (link na bio) da equipe comercial e da diretoria, para uso em
tags **NFC**. Um repositório, um deploy, uma página estática por pessoa.

Stack: **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · fonte **Plus Jakarta Sans**.

## Como rodar

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Como adicionar ou editar uma pessoa

Tudo vive em [`src/data/people.ts`](src/data/people.ts). Acrescente um objeto:

```ts
{
  slug: "rafael",                 // vira a URL /rafael
  name: "Rafael Almeida",
  role: "Sócio",
  organization: "MGA Holding",    // aparece ao lado do cargo
  photo: "/people/rafael.jpg",    // arquivo em public/people/
  links: [
    { platform: "email",     value: "rafael@mga.com.br" },
    { platform: "linkedin",  value: "https://linkedin.com/in/..." },
    { platform: "whatsapp",  value: "5544999990000" },  // só dígitos, com DDI
    { platform: "phone",     value: "5544999990000" },
    { platform: "instagram", value: "https://instagram.com/..." },
  ],
}
```

Nada além disso muda: a rota, o HTML estático e o `<title>` saem automaticamente.

- **A ordem dos links é a ordem dos botões** na tela.
- **`value: ""` esconde o link**, então dá para preencher aos poucos.
- **Sem `photo`**, o avatar mostra as iniciais.

As 4 empresas do rodapé ficam em [`src/data/companies.ts`](src/data/companies.ts),
com os logos em `public/companies/`.

> Os dados hoje são **exemplo**, só para a página renderizar completa.
> Troque por reais antes de publicar. O mesmo vale para os logos e o avatar,
> que são placeholders gerados.

## Deploy

| Cenário                                         | Comando                | O que sobe                    |
| ----------------------------------------------- | ---------------------- | ----------------------------- |
| **Vercel** (teste)                              | `npm run build`        | Deploy direto do repositório  |
| **Hostinger** ou outra hospedagem compartilhada | `npm run build:static` | Conteúdo da pasta `out/` via FTP |

O `build:static` liga `output: "export"` e gera HTML puro (`out/rafael/index.html`),
sem depender de Node no servidor. Também ativa `trailingSlash`, que é o que o
Apache da Hostinger espera, e desliga a otimização de imagem — que exige servidor.

### Sobre a tag NFC

A tag guarda a **URL inteira**, então ninguém digita nada: basta gravar
`https://SEUDOMINIO/rafael`. Se um dia quiserem `rafael.seudominio.com.br`,
dá para acrescentar um `proxy.ts` que lê o subdomínio e reescreve para a mesma
página — **mas só funciona com servidor Node** (Vercel/VPS), não em hospedagem
estática.

## Scripts

| Script                 | Descrição                             |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento (Turbopack) |
| `npm run build`        | Build de produção                     |
| `npm run build:static` | Build estático em `out/`              |
| `npm run start`        | Sobe o build de produção              |
| `npm run lint`         | ESLint                                |
| `npm run typecheck`    | `tsc --noEmit`                        |
| `npm run format`       | Prettier                              |

## Estrutura

```
src/
├── app/
│   ├── [slug]/page.tsx     # A página da pessoa (uma estática por slug)
│   ├── page.tsx            # Índice com todas as pessoas
│   ├── error.tsx           # Error boundary
│   ├── not-found.tsx       # 404
│   ├── globals.css         # Tokens de tema (cor da marca em --brand)
│   └── layout.tsx          # Fonte, metadata e OG
├── components/
│   ├── avatar.tsx          # Foto ou iniciais
│   ├── brand-icons.tsx     # Glifos de marca (gerados do simple-icons)
│   ├── brand-mark.tsx      # Logo do grupo
│   ├── company-card.tsx    # Cartão branco de cada empresa
│   ├── contact-buttons.tsx # Botões circulares coloridos
│   └── contact-icon.tsx    # Mapa plataforma -> ícone e cor
├── config/site.ts
├── data/
│   ├── companies.ts        # ← as 4 empresas
│   └── people.ts           # ← as pessoas
├── lib/
│   ├── contact.ts          # Monta mailto:, tel: e wa.me
│   ├── env.ts
│   ├── people.ts
│   └── utils.ts            # cn()
└── types/index.ts
```

### Ajustes visuais rápidos

- **Cor da faixa superior:** `--brand` em [`src/app/globals.css`](src/app/globals.css).
- **Cores dos botões:** `platformColor` em [`src/components/contact-icon.tsx`](src/components/contact-icon.tsx).
- **Logo do grupo:** troque `public/brand/mark.svg`.

## Variáveis de ambiente

| Nome                  | Obrigatória | Descrição                                                       |
| --------------------- | ----------- | --------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Sim         | URL pública, usada no metadata e nos previews de compartilhamento |
