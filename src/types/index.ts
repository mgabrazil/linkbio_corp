export type LinkPlatform =
  | "site"
  | "email"
  | "phone"
  | "whatsapp"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "youtube"
  | "x"
  | "tiktok";

export type ContactLink = {
  platform: LinkPlatform;
  /**
   * URL completa para redes e site; e-mail para "email";
   * somente dígitos com DDI para "phone" e "whatsapp".
   * Vazio ("") esconde o link da página.
   */
  value: string;
};

export type Company = {
  id: string;
  name: string;
  /** Arquivo em public/companies. Sem logo, exibe o nome em texto. */
  logo?: string;
  links: ContactLink[];
};

export type Person = {
  /** Vira a URL: slug "rafael" -> /rafael */
  slug: string;
  name: string;
  role: string;
  /** Texto exibido ao lado do cargo. Ex.: "MGA Holding" */
  organization: string;
  /** Arquivo em public/people. Sem foto, exibe as iniciais. */
  photo?: string;
  links: ContactLink[];
};
