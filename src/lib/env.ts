/**
 * Acesso centralizado às variáveis de ambiente.
 * Falha no boot (e não em runtime) quando algo obrigatório está faltando.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Variável de ambiente obrigatória ausente: ${name}`);
  }
  return value;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  /** URL pública da aplicação, usada em metadata e links absolutos. */
  APP_URL: required(
    "NEXT_PUBLIC_APP_URL",
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  ),
} as const;

export const isProduction = env.NODE_ENV === "production";
