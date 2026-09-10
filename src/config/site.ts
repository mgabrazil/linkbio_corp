export const siteConfig = {
  name: "MGA Holding",
  description: "Cartões digitais da equipe.",
  /**
   * Endereço público do site. Só afeta o preview de compartilhamento
   * (WhatsApp, LinkedIn) — o site funciona normalmente sem ele.
   *
   * Vazio, a imagem do preview aponta para localhost e não carrega fora da
   * sua máquina. Preencha com o endereço da Vercel enquanto não houver
   * domínio, e troque depois:
   *
   *   url: "https://seu-projeto.vercel.app"
   *   url: "https://mga.com.br"
   *
   * Não é variável de ambiente de propósito: uma variável faltando derrubava
   * o build inteiro na Vercel.
   */
  url: "",
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
