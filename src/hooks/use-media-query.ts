"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * Observa uma media query do CSS a partir do React.
 * Durante o SSR retorna `false` e sincroniza na hidratação.
 *
 * Ex.: const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const mediaQueryList = window.matchMedia(query);
      mediaQueryList.addEventListener("change", onStoreChange);
      return () => mediaQueryList.removeEventListener("change", onStoreChange);
    },
    [query],
  );

  const getSnapshot = useCallback(
    () => window.matchMedia(query).matches,
    [query],
  );

  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
