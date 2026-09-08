/**
 * Prepara os assets de public/images para a web.
 *
 * Os logos chegam do design em 4096x4096 com muita margem transparente em volta,
 * pesando ~500 KB cada — enquanto na tela aparecem com ~50px. Este script:
 *   1. corta a margem transparente (trim), para o logo ocupar todo o quadro;
 *   2. reduz para um tamanho compatível com a exibição (2x para telas retina);
 *   3. recomprime.
 *
 * É idempotente: rodar de novo em arquivo já processado não degrada a imagem,
 * porque a etapa de resize só age quando a origem é maior que o alvo.
 *
 *   node scripts/optimize-images.mjs           # aplica
 *   node scripts/optimize-images.mjs --dry-run # só relatório
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const dryRun = process.argv.includes("--dry-run");

/** Largura máxima por pasta, em pixels (já com folga para telas 2x/3x). */
const maxWidth = {
  companies: 640, // logo exibido com ~170px de largura
  brand: 640, // rodapé com ~190px; selo com ~48px
  people: 512, // avatar exibido com 112px
};

/** Fotos de pessoa não têm transparência para cortar. */
const shouldTrim = (folder) => folder !== "people";

const kb = (bytes) => (bytes / 1024).toFixed(0).padStart(4) + " KB";

const root = path.join(process.cwd(), "public", "images");
let totalBefore = 0;
let totalAfter = 0;

for (const folder of Object.keys(maxWidth)) {
  const dir = path.join(root, folder);
  let files;

  try {
    files = await readdir(dir);
  } catch {
    continue; // pasta ainda não existe
  }

  for (const file of files) {
    if (!/\.(png|jpe?g|webp)$/i.test(file)) continue;

    const filePath = path.join(dir, file);
    const input = await readFile(filePath);
    const before = await sharp(input).metadata();

    let pipeline = sharp(input);
    if (shouldTrim(folder)) {
      // threshold baixo: corta só o que é de fato transparente
      pipeline = pipeline.trim({ threshold: 1 });
    }
    pipeline = pipeline.resize({
      width: maxWidth[folder],
      withoutEnlargement: true,
      fit: "inside",
    });

    const output = await pipeline
      .png({ compressionLevel: 9, palette: true })
      .toBuffer();

    const after = await sharp(output).metadata();

    totalBefore += input.length;
    totalAfter += output.length;

    const label = `${folder}/${file}`.padEnd(30);
    console.log(
      `${label} ${before.width}x${before.height} ${kb(input.length)}` +
        `  ->  ${after.width}x${after.height} ${kb(output.length)}`,
    );

    if (!dryRun) await writeFile(filePath, output);
  }
}

const saved = totalBefore - totalAfter;
console.log(
  `\ntotal: ${kb(totalBefore)} -> ${kb(totalAfter)} ` +
    `(-${((saved / totalBefore) * 100).toFixed(0)}%)${dryRun ? "  [dry-run]" : ""}`,
);
