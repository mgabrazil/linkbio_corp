import { env } from "@/lib/env";

export const siteConfig = {
  name: "LinkBio Corp",
  description: "Plataforma corporativa de links na bio.",
  url: env.APP_URL,
  locale: "pt-BR",
  nav: [{ title: "Início", href: "/" }],
  links: {
    github: "https://github.com",
  },
} as const;

export type SiteConfig = typeof siteConfig;
