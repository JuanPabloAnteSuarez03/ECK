/**
 * Convierte fotos HEIC (iPhone) a JPEG + WebP para web y revisión.
 * heic-convert decodifica HEIC; sharp redimensiona (no requiere HEIC en libvips).
 *
 * Uso: node scripts/convert-heic-to-web.js [carpetaEntrada] [carpetaSalida]
 * Por defecto: Img-.../Img -> public/eck-photos
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const convert = require("heic-convert");

const INPUT =
  process.argv[2] ||
  path.join(__dirname, "..", "Img-20260323T053936Z-1-001", "Img");
const OUT =
  process.argv[3] || path.join(__dirname, "..", "public", "eck-photos");

const MAX_WIDTH = 1920;
const JPEG_QUALITY = 85;
const WEBP_QUALITY = 82;

async function heicToJpegBuffer(heicPath) {
  const buffer = fs.readFileSync(heicPath);
  return convert({
    buffer,
    format: "JPEG",
    quality: 0.92,
  });
}

async function main() {
  if (!fs.existsSync(INPUT)) {
    console.error("No existe la carpeta:", INPUT);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  const files = fs
    .readdirSync(INPUT)
    .filter((f) => /\.heic$/i.test(f))
    .sort();

  if (files.length === 0) {
    console.error("No hay archivos .heic en", INPUT);
    process.exit(1);
  }

  const report = [];
  let ok = 0;
  let fail = 0;

  for (const name of files) {
    const base = path.basename(name, path.extname(name));
    const src = path.join(INPUT, name);
    const jpegPath = path.join(OUT, `${base}.jpg`);
    const webpPath = path.join(OUT, `${base}.webp`);

    try {
      const jpegBuffer = await heicToJpegBuffer(src);
      const meta = await sharp(jpegBuffer).metadata();

      const resizeOpts = {
        width: MAX_WIDTH,
        height: MAX_WIDTH,
        fit: "inside",
        withoutEnlargement: true,
      };

      await sharp(jpegBuffer)
        .resize(resizeOpts)
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(jpegPath);

      await sharp(jpegBuffer)
        .resize(resizeOpts)
        .webp({ quality: WEBP_QUALITY })
        .toFile(webpPath);

      const jStat = fs.statSync(jpegPath);
      const wStat = fs.statSync(webpPath);
      report.push({
        base,
        width: meta.width,
        height: meta.height,
        jpegKb: Math.round(jStat.size / 1024),
        webpKb: Math.round(wStat.size / 1024),
      });
      ok++;
      process.stdout.write(".");
    } catch (e) {
      fail++;
      console.error(`\nFAIL ${name}:`, e.message);
    }
  }

  const summaryPath = path.join(OUT, "_conversion-report.json");
  fs.writeFileSync(
    summaryPath,
    JSON.stringify({ input: INPUT, output: OUT, ok, fail, files: report }, null, 2)
  );

  console.log(`\n\nListo. OK: ${ok}, fallidos: ${fail}`);
  console.log("Informe:", summaryPath);
  console.log("Archivos en:", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
