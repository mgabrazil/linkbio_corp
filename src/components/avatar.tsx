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
        "relative overflow-hidden rounded-full bg-neutral-800",
        "ring-4 ring-[var(--brand)]",
        className,
      )}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="128px"
          unoptimized={photo.endsWith(".svg")}
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
