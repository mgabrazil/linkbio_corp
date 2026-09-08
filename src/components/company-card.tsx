import Image from "next/image";

import { platformIcon } from "@/components/contact-icon";
import { linkHref, platformLabel } from "@/lib/contact";
import { visibleLinks } from "@/lib/people";
import type { Company } from "@/types";

export function CompanyCard({ company }: { company: Company }) {
  const links = visibleLinks(company.links);

  return (
    <article className="rounded-2xl bg-white px-4 py-4 shadow-sm">
      <div className="flex h-8 items-center justify-center">
        {company.logo ? (
          <Image
            src={company.logo}
            alt={company.name}
            width={200}
            height={40}
            unoptimized
            className="h-7 w-auto object-contain"
          />
        ) : (
          <span className="text-base font-bold text-neutral-900">
            {company.name}
          </span>
        )}
      </div>

      {links.length > 0 && (
        <ul className="mt-3 flex items-center justify-center gap-5">
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
                  className="block text-neutral-700 transition-colors hover:text-neutral-950 focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </article>
  );
}
