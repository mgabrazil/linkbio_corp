import { platformColor, platformIcon } from "@/components/contact-icon";
import { linkHref, platformLabel } from "@/lib/contact";
import { visibleLinks } from "@/lib/people";
import type { ContactLink } from "@/types";

/** Botões circulares coloridos — contatos da pessoa. */
export function ContactButtons({ links }: { links: ContactLink[] }) {
  const visible = visibleLinks(links);

  if (visible.length === 0) return null;

  return (
    <ul className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
      {visible.map((link) => {
        const Icon = platformIcon[link.platform];
        const label = platformLabel[link.platform];

        return (
          <li key={link.platform}>
            <a
              href={linkHref(link)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              style={{ backgroundColor: platformColor[link.platform] }}
              className="flex size-11 items-center justify-center rounded-full text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white lg:size-15"
            >
              <Icon className="size-5 lg:size-7" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
