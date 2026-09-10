/**
 * Prepara os assets de public/images para a web.
 *
 * Os arquivos chegam do design grandes demais para o tamanho em que aparecem
 * na tela: logos em 4096x4096 com muita margem transparente, fotos em 1254px
 * para um avatar de ~124px. O script corta a margem, reduz e recomprime.
 *
 * LOGO e FOTO recebem tratamentos diferentes, e misturar os dois estraga a
 * imagem:
 *
 *   - Logo   -> PNG com paleta indexada. São poucas cores chapadas, então
 *               256 cores bastam e o arquivo fica minúsculo.
 *   - Foto   -> WebP em cor real. Quantizar uma foto para 256 cores causa
 *               posterização (faixas visíveis na pele e no céu). WebP guarda
 *               a cor real e ainda pesa menos que o PNG.
 *
 *   node scripts/optimize-images.mjs           # aplica
 *   node scripts/optimize-images.mjs --dry-run # só relatório
 */
import { readdir, readFile, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const dryRun = process.argv.includes("--dry-run");

/** Largura máxima por pasta, em pixels (já com folga para telas 2x/3x). */
const maxWidth = {
  companies: 640, // logo exibido com ~170px de largura
  brand: 640, // rodapé com ~190px; selo com ~48px
  people: 512, // avatar exibido com ~124px (176px no desktop)
};

/** "foto" preserva a cor real; "logo" pode ser reduzido a 256 cores. */
const tipo = (folder) => (folder === "people" ? "foto" : "logo");

/** Só logo tem margem transparente para cortar. */
const shouldTrim = (folder) => tipo(folder) === "logo";

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

    const ehFoto = tipo(folder) === "foto";

    const output = ehFoto
      ? await pipeline.webp({ quality: 85 }).toBuffer()
      : await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();

    const after = await sharp(output).metadata();

    // Foto sempre vira .webp; o .png de origem é removido depois de gravar.
    const destPath = ehFoto
      ? filePath.replace(/\.(png|jpe?g)$/i, ".webp")
      : filePath;
    const mudouExtensao = destPath !== filePath;

    /*
     * Só grava se houver ganho real. Recomprimir um arquivo já processado
     * gera bytes diferentes com a mesma imagem — o que suja o `git status`
     * com diffs binários inúteis a cada execução.
     */
    const mudouDimensao =
      after.width !== before.width || after.height !== before.height;
    const encolheu = output.length < input.length * 0.95;
    const vaiGravar = mudouExtensao || mudouDimensao || encolheu;

    totalBefore += input.length;
    totalAfter += vaiGravar ? output.length : input.length;

    const label = `${folder}/${file}`.padEnd(30);
    console.log(
      vaiGravar
        ? `${label} ${before.width}x${before.height} ${kb(input.length)}` +
            `  ->  ${after.width}x${after.height} ${kb(output.length)}` +
            (mudouExtensao ? `  (${path.basename(destPath)})` : "")
        : `${label} ${before.width}x${before.height} ${kb(input.length)}` +
            `      (já otimizado, mantido)`,
    );

    if (vaiGravar && !dryRun) {
      await writeFile(destPath, output);
      if (mudouExtensao) await unlink(filePath);
    }
  }
}

const saved = totalBefore - totalAfter;
console.log(
  `\ntotal: ${kb(totalBefore)} -> ${kb(totalAfter)} ` +
    `(-${((saved / totalBefore) * 100).toFixed(0)}%)${dryRun ? "  [dry-run]" : ""}`,
);
