import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";

export default function NotFound() {
  return (
    <div className="page-backdrop mx-auto flex min-h-dvh w-full max-w-110 flex-col items-center justify-center gap-4 px-6 text-center">
      <BrandMark variant="footer" className="h-10" />
      <p className="font-mono text-xs tracking-widest text-white/40">404</p>
      <h1 className="text-lg font-bold text-white">Página não encontrada</h1>
      <Link
        href="/"
        className="text-sm text-white/60 underline underline-offset-4 hover:text-white"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
