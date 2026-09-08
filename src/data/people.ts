import type { Person } from "@/types";

/**
 * Cada pessoa vira uma página estática em /<slug>.
 * Para adicionar alguém, basta acrescentar um objeto aqui — nada mais muda.
 *
 * Os valores abaixo são EXEMPLO, só para a página renderizar completa.
 * Troque por dados reais e coloque a foto em public/people/<slug>.jpg.
 * Link com value "" some da página, então dá para preencher aos poucos.
 *
 * A ordem dos links é a ordem dos botões na tela.
 */
export const people: Person[] = [
  {
    slug: "rafael",
    name: "Rafael Almeida",
    role: "Sócio",
    organization: "MGA Holding",
    photo: "/people/placeholder.svg",
    links: [
      { platform: "email", value: "exemplo@mga.com.br" },
      { platform: "linkedin", value: "https://www.linkedin.com/in/exemplo" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "phone", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
  {
    slug: "nemola",
    name: "Nemola",
    role: "Diretor Comercial",
    organization: "MGA Holding",
    photo: "/people/placeholder.svg",
    links: [
      { platform: "email", value: "exemplo@mga.com.br" },
      { platform: "linkedin", value: "https://www.linkedin.com/in/exemplo" },
      { platform: "whatsapp", value: "5544999990000" },
      { platform: "phone", value: "5544999990000" },
      { platform: "instagram", value: "https://www.instagram.com/exemplo" },
    ],
  },
];
