import type { Person } from "@/types";

export const people: Person[] = [
  {
    slug: "rafael",
    name: "Rafael Almeida",
    role: "Sócio",
    organization: "MGA Holding",
    photo: "/images/people/Foto-Rafael.webp",
    links: [
      { platform: "email", value: "mailto:rafaelalmeida@mgabrazil.com" },
      { platform: "whatsapp", value: "https://wa.me/556183772719" },
      { platform: "phone", value: "tel:+556183772719" },
      {
        platform: "instagram",
        value: "https://www.instagram.com/rafaelalmeidaofc_/",
      },
    ],
  },
  {
    slug: "gabriel",
    name: "Gabriel Almeida",
    role: "Sócio",
    organization: "MGA Holding",
    photo: "/images/people/Foto-Gabriel.webp",
    links: [
      { platform: "email", value: "mailto:gabrielalmeida@mgabrazil.com" },
      { platform: "whatsapp", value: "https://wa.me/5511914836445" },
      { platform: "phone", value: "tel:+5511914836445" },
      {
        platform: "instagram",
        value: "https://www.instagram.com/tourpelomundo/",
      },
    ],
  },
  {
    slug: "matheus",
    name: "Matheus Gouveia",
    role: "Sócio",
    organization: "MGA Holding",
    photo: "/images/people/Foto-Matheus.webp",
    links: [
      { platform: "email", value: "mailto:matheusgouveia@mgabrazil.com" },
      { platform: "whatsapp", value: "https://wa.me/556181506250" },
      { platform: "phone", value: "tel:+556181506250" },
      {
        platform: "instagram",
        value: "https://www.instagram.com/matheusgouveiia/",
      },
    ],
  },
];
