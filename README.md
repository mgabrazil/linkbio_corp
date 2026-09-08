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
  photo: "/images/people/rafael.jpg", // arquivo em public/images/people/
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
com os logos em `public/images/companies/`.

> As imagens já são as reais. Os **links e contatos ainda são de exemplo**
> (`exemplo@mga.com.br`, `5544999990000`, `instagram.com/exemplo`), só para a
> página renderizar completa — troque antes de publicar.

## Deploy

| Cenário                                         | Comando                | O que sobe                       |
| ----------------------------------------------- | ---------------------- | -------------------------------- |
| **Vercel** (teste)                              | `npm run build`        | Deploy direto do repositório     |
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

| Script                    | Descrição                                   |
| ------------------------- | ------------------------------------------- |
| `npm run dev`             | Servidor de desenvolvimento (Turbopack)     |
| `npm run build`           | Build de produção                           |
| `npm run build:static`    | Build estático em `out/`                    |
| `npm run start`           | Sobe o build de produção                    |
| `npm run lint`            | ESLint                                      |
| `npm run typecheck`       | `tsc --noEmit`                              |
| `npm run format`          | Prettier                                    |
| `npm run optimize:images` | Corta e reduz as imagens de `public/images` |

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

## Imagens

Todas ficam em `public/images/`, e o caminho na URL espelha a pasta:

```
public/images/
├── people/                  # Fotos -> photo: "/images/people/Foto-Rafael.png"
│   └── Foto-Rafael.png
├── companies/               # Logos -> logo: "/images/companies/Logo-Uni.png"
│   ├── Logo-Uni.png
│   ├── Logo-Usports.png
│   ├── Logo-MgaT.png
│   └── Logo-Factory.png
└── brand/                   # Marca do grupo (config em src/config/site.ts)
    ├── logo-topocard.png    # selo redondo no topo do painel
    └── Logo-footer.png      # assinatura do rodapé, já com o texto
```

### Sempre rode o otimizador ao trocar uma imagem

```bash
npm run optimize:images
```

Os arquivos que vêm do design costumam ser 4096×4096 com muita margem
transparente e ~500 KB cada, enquanto na tela aparecem com ~50 px. O script
corta a margem, reduz para o tamanho de exibição (2× para telas retina) e
recomprime **no lugar**. Na primeira passagem: **3.160 KB → 224 KB (−93%)**.

É idempotente — rodar de novo num arquivo já processado não degrada a imagem.
Use `node scripts/optimize-images.mjs --dry-run` para só ver o relatório.

> O corte da margem transparente é o que faz os logos aparecerem grandes e
> alinhados nos cartões. Sem ele, um logo quadrado com margem renderiza
> minúsculo ao lado de um logo já recortado.

### Ajustes visuais rápidos

- **Cor da faixa superior:** `--brand` em [`src/app/globals.css`](src/app/globals.css).
- **Cores dos botões:** `platformColor` em [`src/components/contact-icon.tsx`](src/components/contact-icon.tsx).
- **Logos do grupo:** troque os arquivos em `public/images/brand/` (caminhos em [`src/config/site.ts`](src/config/site.ts)).
- **Cores do tema:** `--brand`, `--card-from`, `--card-to`, `--panel` e `--company-icon` em [`src/app/globals.css`](src/app/globals.css).

## Variáveis de ambiente

| Nome                  | Obrigatória | Descrição                                                         |
| --------------------- | ----------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL` | Sim         | URL pública, usada no metadata e nos previews de compartilhamento |
