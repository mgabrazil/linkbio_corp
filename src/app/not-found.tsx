import Link from "next/link";

import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <p className="font-mono text-sm text-black/50 dark:text-white/50">404</p>
      <h1 className="text-3xl font-semibold tracking-tight">
        Página não encontrada
      </h1>
      <Link href="/" className="text-sm underline underline-offset-4">
        Voltar para o início
      </Link>
    </Container>
  );
}
