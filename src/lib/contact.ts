import type { ContactLink, LinkPlatform } from "@/types";

/** Mantém apenas dígitos — os dados podem vir formatados. */
function digits(value: string) {
  return value.replace(/\D/g, "");
}

/** Monta o href final a partir do tipo do link. */
export function linkHref(link: ContactLink) {
  switch (link.platform) {
    case "email":
      return `mailto:${link.value}`;
    case "phone":
      return `tel:+${digits(link.value)}`;
    case "whatsapp":
      return `https://wa.me/${digits(link.value)}`;
    default:
      return link.value;
  }
}

export const platformLabel: Record<LinkPlatform, string> = {
  site: "Site",
  email: "E-mail",
  phone: "Telefone",
  whatsapp: "WhatsApp",
  linkedin: "LinkedIn",
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  x: "X",
  tiktok: "TikTok",
};
