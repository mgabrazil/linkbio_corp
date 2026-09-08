import { env } from "@/lib/env";

export const siteConfig = {
  name: "MGA",
  description: "Cartões digitais da equipe.",
  url: env.APP_URL,
  locale: "pt-BR",
} as const;

export type SiteConfig = typeof siteConfig;
