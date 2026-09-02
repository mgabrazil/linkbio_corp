import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";

export default function HomePage() {
  return (
    <Container className="flex flex-1 flex-col justify-center gap-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        {siteConfig.name}
      </h1>
      <p className="max-w-prose text-lg text-black/60 dark:text-white/60">
        {siteConfig.description}
      </p>
      <div className="flex flex-wrap gap-3">
        <Button>Começar</Button>
        <Button variant="outline">Documentação</Button>
      </div>
    </Container>
  );
}
