import { people } from "@/data/people";
import type { ContactLink } from "@/types";

export function getPerson(slug: string) {
  return people.find((person) => person.slug === slug);
}

/** Descarta links ainda não preenchidos, para não renderizar botão vazio. */
export function visibleLinks(links: ContactLink[]) {
  return links.filter((link) => link.value.trim() !== "");
}

/** Iniciais usadas no avatar quando não há foto. */
export function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts.at(0)?.[0] ?? "";
  const last = parts.length > 1 ? (parts.at(-1)?.[0] ?? "") : "";
  return (first + last).toUpperCase();
}
