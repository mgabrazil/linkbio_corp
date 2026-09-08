import type { NextConfig } from "next";

/**
 * Build padrão (Vercel): servidor Node, imagens otimizadas.
 * `npm run build:static`: gera HTML puro em out/, para hospedagem
 * compartilhada (Hostinger). Nesse modo o Next não otimiza imagens
 * e as URLs terminam em barra, como o Apache espera.
 */
const isStaticExport = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = isStaticExport
  ? { output: "export", trailingSlash: true, images: { unoptimized: true } }
  : {};

export default nextConfig;
