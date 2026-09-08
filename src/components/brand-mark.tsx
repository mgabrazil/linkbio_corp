import Image from "next/image";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  /** "badge" é só o globo; "footer" já traz o texto "MGA Holding". */
  variant: "badge" | "footer";
  className?: string;
};

/** Marca do grupo. Troque os arquivos em public/images/brand. */
export function BrandMark({ variant, className }: BrandMarkProps) {
  const isBadge = variant === "badge";

  return (
    <Image
      src={isBadge ? siteConfig.brand.badge : siteConfig.brand.footer}
      alt={siteConfig.name}
      width={640}
      height={isBadge ? 613 : 213}
      className={cn("w-auto object-contain", className)}
      priority={!isBadge}
    />
  );
}
