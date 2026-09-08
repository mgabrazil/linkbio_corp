import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Marca do grupo. Troque public/brand/mark.svg pelo logo real. */
export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src="/brand/mark.svg"
      alt={siteConfig.name}
      width={40}
      height={40}
      unoptimized
      className={cn("size-10", className)}
    />
  );
}
