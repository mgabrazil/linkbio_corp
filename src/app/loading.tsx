import { Container } from "@/components/ui/container";

export default function Loading() {
  return (
    <Container className="flex flex-1 items-center justify-center py-24">
      <div
        role="status"
        aria-label="Carregando"
        className="border-t-foreground size-6 animate-spin rounded-full border-2 border-black/10 dark:border-white/15"
      />
    </Container>
  );
}
