import { env } from "@/lib/env";

export const siteConfig = {
  name: "MGA Holding",
  description: "Cartões digitais da equipe.",
  url: env.APP_URL,
  locale: "pt-BR",
  /** Imagens da marca do grupo, em public/images/brand. */
  brand: {
    /** Selo redondo sobreposto ao topo do painel de empresas. */
    badge: "/images/brand/logo-topocard.png",
    /** Assinatura do rodapé (já contém o texto "MGA Holding"). */
    footer: "/images/brand/Logo-footer.png",
  },
} as const;

export type SiteConfig = typeof siteConfig;
