import { notFound } from "next/navigation";

import { Avatar } from "@/components/avatar";
import { BrandMark } from "@/components/brand-mark";
import { CompanyCard } from "@/components/company-card";
import { ContactButtons } from "@/components/contact-buttons";
import { siteConfig } from "@/config/site";
import { companies } from "@/data/companies";
import { people } from "@/data/people";
import { getPerson } from "@/lib/people";

/** Gera uma página estática por pessoa; slug fora da lista vira 404. */
export function generateStaticParams() {
  return people.map((person) => ({ slug: person.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const person = getPerson(slug);

  if (!person) return {};

  const subtitle = `${person.role} • ${person.organization}`;

  return {
    title: person.name,
    description: subtitle,
    openGraph: {
      title: `${person.name} | ${siteConfig.name}`,
      description: subtitle,
      images: person.photo ? [person.photo] : undefined,
    },
  };
}

export default async function PersonPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const person = getPerson(slug);

  if (!person) notFound();

  return (
    <div className="page-backdrop flex min-h-dvh justify-center sm:px-6 sm:py-10">
      {/*
       * Mobile: o cartão é a própria tela.
       * sm: vira um objeto flutuante, arredondado nos quatro lados.
       * lg: alarga e as empresas viram grade 2x2, fechando um formato quadrado
       *     — daí todo o conteúdo crescer junto (foto, tipos, ícones e logos).
       */}
      <div className="bg-brand flex w-full max-w-110 flex-col sm:min-h-0 sm:overflow-hidden sm:rounded-[2rem] sm:shadow-2xl sm:shadow-black/60 lg:max-w-4xl lg:rounded-[2.5rem]">
        {/* Faixa da marca: a foto se apoia na emenda com o cartão escuro. */}
        <div className="h-21.5 shrink-0 lg:h-30" />

        <div className="relative flex flex-1 flex-col rounded-t-[2.5rem] bg-[linear-gradient(180deg,var(--card-from),var(--card-to))] px-5 pb-8 sm:px-6 lg:rounded-t-[3rem] lg:px-10 lg:pb-10">
          <Avatar
            name={person.name}
            photo={person.photo}
            className="absolute -top-15.5 left-1/2 size-31 -translate-x-1/2 lg:-top-22 lg:size-44"
          />

          <header className="pt-19 text-center lg:pt-26">
            <h1 className="text-[22px] leading-tight font-extrabold tracking-wide text-white uppercase lg:text-[34px]">
              {person.name}
            </h1>
            <p className="mt-2 text-[12px] font-medium tracking-[0.14em] text-white/70 uppercase lg:mt-3 lg:text-[15px]">
              {person.role}
              <span className="mx-1.5">•</span>
              {person.organization}
            </p>
          </header>

          <div className="mt-7 lg:mt-9">
            <ContactButtons links={person.links} />
          </div>

          <section
            className="relative mt-12 mb-14 lg:mt-16 lg:mb-16"
            aria-label="Empresas do grupo"
          >
            {/* Selo do grupo: um ressalto do próprio painel, sobre o cartão. */}
            <div className="bg-panel absolute -top-8 left-1/2 z-10 flex size-17 -translate-x-1/2 items-center justify-center rounded-full lg:-top-10 lg:size-22">
              <BrandMark variant="badge" className="h-9 lg:h-12" />
            </div>

            <ul className="bg-panel flex flex-col gap-4 rounded-[28px] p-4 pt-12 lg:grid lg:grid-cols-2 lg:gap-6 lg:rounded-[36px] lg:p-6 lg:pt-16">
              {companies.map((company) => (
                <li key={company.id}>
                  <CompanyCard company={company} />
                </li>
              ))}
            </ul>
          </section>

          <footer className="mt-auto flex flex-col items-center border-t border-white/15 pt-8 lg:pt-10">
            <BrandMark variant="footer" className="h-12 lg:h-16" />
          </footer>
        </div>
      </div>
    </div>
  );
}
