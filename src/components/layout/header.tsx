import Link from "next/link";

import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="border-b border-black/5 dark:border-white/10">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground text-black/60 transition-colors dark:text-white/60"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
