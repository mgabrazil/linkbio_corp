import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <Container className="flex h-16 items-center justify-between text-sm text-black/60 dark:text-white/60">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}
        </p>
      </Container>
    </footer>
  );
}
