import type { ContactLink, LinkPlatform } from "@/types";

/** Mantém apenas dígitos — os dados podem vir formatados. */
function digits(value: string) {
  return value.replace(/\D/g, "");
}

/**
 * Monta o href final a partir do tipo do link.
 *
 * Aceita o valor puro ("fulano@mga.com", "5544999990000") ou já no formato
 * final ("mailto:fulano@mga.com", "tel:+5544...", "https://wa.me/5544..."),
 * porque os dados são preenchidos à mão e as duas formas aparecem. Sem essa
 * tolerância, um "mailto:" digitado junto virava "mailto:mailto:...".
 */
export function linkHref(link: ContactLink) {
  const value = link.value.trim();

  if (/^(https?|mailto|tel):/i.test(value)) return value;

  switch (link.platform) {
    case "email":
      return `mailto:${value}`;
    case "phone":
      return `tel:+${digits(value)}`;
    case "whatsapp":
      return `https://wa.me/${digits(value)}`;
    default:
      return value;
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
