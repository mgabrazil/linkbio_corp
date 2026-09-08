import Link from "next/link";

import { Avatar } from "@/components/avatar";
import { BrandMark } from "@/components/brand-mark";
import { siteConfig } from "@/config/site";
import { people } from "@/data/people";

export default function HomePage() {
  return (
    <div className="page-backdrop flex min-h-dvh justify-center px-5 py-12 sm:px-6">
      <div className="flex w-full max-w-110 flex-col">
        <header className="flex flex-col items-center gap-3 text-center">
          <BrandMark variant="footer" className="h-10" />
          <p className="text-sm text-white/50">{siteConfig.description}</p>
        </header>

        <ul className="mt-10 space-y-3">
          {people.map((person) => (
            <li key={person.slug}>
              <Link
                href={`/${person.slug}`}
                className="flex items-center gap-4 rounded-2xl bg-white/5 p-3 transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <Avatar
                  name={person.name}
                  photo={person.photo}
                  className="size-14 shrink-0 ring-2 ring-white/10"
                />
                <span className="min-w-0">
                  <span className="block truncate font-semibold text-white">
                    {person.name}
                  </span>
                  <span className="block truncate text-xs tracking-wide text-white/50 uppercase">
                    {person.role} • {person.organization}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
