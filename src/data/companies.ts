import type { Company } from "@/types";

/**
 * As 4 empresas do grupo, exibidas em todas as páginas.
 * PREENCHER: coloque os logos em public/companies/ e cole as URLs.
 * Os valores abaixo são EXEMPLO. Link com value "" não é renderizado,
 * então dá para preencher aos poucos.
 */
export const companies: Company[] = [
  {
    id: "unipaper",
    name: "Unipaper",
    logo: "/companies/unipaper.svg",
    links: [
      { platform: "site", value: "https://exemplo.com.br" },
      { platform: "email", value: "contato@exemplo.com.br" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
  {
    id: "usports",
    name: "Usports",
    logo: "/companies/usports.svg",
    links: [
      { platform: "site", value: "https://exemplo.com.br" },
      { platform: "email", value: "contato@exemplo.com.br" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
  {
    id: "mga",
    name: "MGA",
    logo: "/companies/mga.svg",
    links: [
      { platform: "site", value: "https://exemplo.com.br" },
      { platform: "email", value: "contato@exemplo.com.br" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
  {
    id: "usfactory",
    name: "Us.factory",
    logo: "/companies/usfactory.svg",
    links: [
      { platform: "site", value: "https://exemplo.com.br" },
      { platform: "email", value: "contato@exemplo.com.br" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
];
