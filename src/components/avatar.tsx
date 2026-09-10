import Image from "next/image";

import { initials } from "@/lib/people";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  photo?: string;
  className?: string;
};

export function Avatar({ name, photo, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full bg-neutral-700",
        // Sombra do design: X 0, Y -5, desfoque 10, distribuição 2,
        // #222222 a 10%. Sobe em vez de descer, porque a foto se apoia
        // na emenda entre a faixa da marca e o cartão escuro.
        "shadow-[0_-5px_10px_2px_rgba(34,34,34,0.1)]",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="128px"
          className="object-cover"
          priority
        />
      ) : (
        <span className="flex size-full items-center justify-center text-2xl font-semibold text-white/70">
          {initials(name)}
        </span>
      )}
    </div>
  );
}
