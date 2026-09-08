import Image from "next/image";

import { platformIcon } from "@/components/contact-icon";
import { linkHref, platformLabel } from "@/lib/contact";
import { visibleLinks } from "@/lib/people";
import type { Company } from "@/types";

export function CompanyCard({ company }: { company: Company }) {
  const links = visibleLinks(company.links);

  return (
    <article className="rounded-2xl bg-white px-5 py-5 shadow-sm lg:rounded-3xl lg:px-6 lg:py-7">
      {/* Altura fixa para todos os logos ficarem alinhados entre os cartões. */}
      <div className="flex h-9 items-center justify-center lg:h-13">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={640}
            height={160}
            className="max-h-9 w-auto max-w-[72%] object-contain lg:max-h-13"
          />
        ) : (
          <span className="text-lg font-bold text-neutral-900">
            {company.name}
          </span>
        )}
      </div>

      {links.length > 0 && (
        <ul className="mt-4 flex items-center justify-center gap-6 lg:mt-6 lg:gap-8">
          {links.map((link) => {
            const Icon = platformIcon[link.platform];
            const label = `${platformLabel[link.platform]} — ${company.name}`;

            return (
              <li key={link.platform}>
                <a
                  href={linkHref(link)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="text-company-icon block transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="size-6 lg:size-7" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
