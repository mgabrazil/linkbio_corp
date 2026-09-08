"use client";

import { useEffect } from "react";

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
    <div className="bg-card mx-auto flex min-h-dvh w-full max-w-[440px] flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="text-lg font-bold text-white">Algo deu errado</h1>
      <p className="text-sm text-white/50">
        Tente novamente. Se o erro persistir, avise o suporte.
      </p>
      <button
        onClick={reset}
        className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-opacity hover:opacity-90"
      >
        Tentar novamente
      </button>
    </div>
  );
}
