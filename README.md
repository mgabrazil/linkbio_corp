# LinkBio Corp

Cartões digitais (link na bio) da equipe comercial e da diretoria, para uso em
tags **NFC**. Um repositório, um deploy, uma página estática por pessoa.

Stack: **Next.js 16** (App Router) · **TypeScript** · **Tailwind CSS v4** · fonte **Plus Jakarta Sans**.

## Como rodar

```bash
npm install
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
│   ├── people.ts
│   └── utils.ts            # cn()
└── types/index.ts
```

## Imagens

Todas ficam em `public/images/`, e o caminho na URL espelha a pasta:

```
public/images/
├── people/                  # Fotos (.webp) -> "/images/people/Foto-Rafael.webp"
│   └── Foto-Rafael.webp
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

Os arquivos que vêm do design são grandes demais para o tamanho em que
aparecem: logos em 4096×4096 com muita margem transparente, fotos em 1254px
para um avatar de 124px. O script corta a margem, reduz e recomprime **no
lugar**. Na última passagem: **7.150 KB → 243 KB (−97%)**.

Logo e foto recebem tratamentos diferentes, e é importante não misturar:

|                        | Formato                     | Por quê                                                                             |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------------------- |
| `companies/`, `brand/` | PNG com paleta de 256 cores | São cores chapadas; 256 bastam e o arquivo fica minúsculo                           |
| `people/`              | **WebP** em cor real        | Quantizar foto para 256 cores causa posterização — faixas visíveis na pele e no céu |

Fotos em `.png` são **convertidas para `.webp`** e o `.png` de origem é
apagado. Depois disso, ajuste o caminho em `src/data/people.ts`.

Rodar de novo é seguro: o script só grava quando a dimensão muda ou o arquivo
encolhe pelo menos 5%, então não suja o `git status` com diffs binários
inúteis. Use `node scripts/optimize-images.mjs --dry-run` para só ver o
relatório.

> O corte da margem transparente é o que faz os logos aparecerem grandes e
> alinhados nos cartões. Sem ele, um logo quadrado com margem renderiza
> minúsculo ao lado de um logo já recortado.

### Ajustes visuais rápidos

- **Cor da faixa superior:** `--brand` em [`src/app/globals.css`](src/app/globals.css).
- **Cores dos botões:** `platformColor` em [`src/components/contact-icon.tsx`](src/components/contact-icon.tsx).
- **Logos do grupo:** troque os arquivos em `public/images/brand/` (caminhos em [`src/config/site.ts`](src/config/site.ts)).
- **Cores do tema:** `--brand`, `--card-from`, `--card-to`, `--panel` e `--company-icon` em [`src/app/globals.css`](src/app/globals.css).

## Domínio

O projeto **não usa variáveis de ambiente** — não há nada para configurar na
Vercel ou na Hostinger. O endereço do site fica em `url` no
[`src/config/site.ts`](src/config/site.ts):

```ts
url: "https://seu-projeto.vercel.app",  // ou "https://mga.com.br"
```

Ele afeta **apenas o preview de compartilhamento** (WhatsApp, LinkedIn). O
site funciona normalmente com o campo vazio, mas aí a imagem do preview aponta
para `localhost` e não carrega para quem recebe o link. Vale preencher com o
endereço da Vercel enquanto o domínio não existe.
