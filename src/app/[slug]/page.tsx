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

  return {
    title: person.name,
    description: `${person.role} • ${person.organization}`,
    openGraph: {
      title: `${person.name} | ${siteConfig.name}`,
      description: `${person.role} • ${person.organization}`,
      images: person.photo ? [person.photo] : undefined,
    },
  };
}

export default async function PersonPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const person = getPerson(slug);

  if (!person) notFound();

  return (
    <div className="bg-brand mx-auto flex min-h-dvh w-full max-w-[440px] flex-col">
      {/* Faixa da marca: a foto se apoia na emenda com o cartão preto. */}
      <div className="h-24 shrink-0" />

      <div className="bg-card relative flex flex-1 flex-col rounded-t-[2.5rem] px-5 pb-8 sm:px-6">
        <Avatar
          name={person.name}
          photo={person.photo}
          className="absolute -top-14 left-1/2 size-28 -translate-x-1/2"
        />

        <header className="pt-[4.5rem] text-center">
          <h1 className="text-xl font-extrabold tracking-wide text-white uppercase">
            {person.name}
          </h1>
          <p className="mt-1.5 text-[11px] font-medium tracking-[0.18em] text-white/55 uppercase">
            {person.role}
            <span className="mx-1.5">•</span>
            {person.organization}
          </p>
        </header>

        <div className="mt-6">
          <ContactButtons links={person.links} />
        </div>

        <section
          className="relative mt-14 mb-10"
          aria-label="Empresas do grupo"
        >
          {/* Selo da marca sobreposto ao topo do painel. */}
          <div className="bg-card absolute -top-6 left-1/2 z-10 -translate-x-1/2 rounded-full p-2.5">
            <BrandMark className="size-9" />
          </div>

          <ul className="space-y-3 rounded-3xl bg-neutral-200 p-3 pt-10">
            {companies.map((company) => (
              <li key={company.id}>
                <CompanyCard company={company} />
              </li>
            ))}
          </ul>
        </section>

        <footer className="mt-auto flex flex-col items-center gap-2 border-t border-white/10 pt-8 pb-1">
          <BrandMark className="size-9" />
          <p className="text-xs font-bold tracking-[0.3em] text-white/80 uppercase">
            {siteConfig.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
