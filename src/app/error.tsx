"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Algo deu errado</h1>
      <p className="text-black/60 dark:text-white/60">
        Tente novamente. Se o erro persistir, entre em contato com o suporte.
      </p>
      <Button onClick={reset}>Tentar novamente</Button>
    </Container>
  );
}
