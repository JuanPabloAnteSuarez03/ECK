/**
 * Reemplaza el morado de plantilla (Remix icon default) en los SVG de iconos
 * por el color primary.500 definido en src/tailwind.config.js.
 *
 * Uso: node scripts/sync-icon-colors-to-primary.js
 * Opcional: PRIMARY_HEX=#be0e10 node scripts/sync-icon-colors-to-primary.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "..");
const TAILWIND_CONFIG = path.join(ROOT, "src", "tailwind.config.js");
const IMAGES_DIR = path.join(ROOT, "src", "images");

/** Solo iconos de UI; no toca decoradores blob u otros assets */
const ICON_GLOBS = [
  "*-icon.svg",
  "star-icon.svg",
];

function extractPrimary500Hex() {
  const env = process.env.PRIMARY_HEX;
  if (env && /^#[0-9a-fA-F]{6}$/.test(env)) return env;

  const raw = fs.readFileSync(TAILWIND_CONFIG, "utf8");
  const block = raw.match(/primary:\s*\{([^}]+)\}/s);
  if (!block) {
    console.warn("No se encontró theme.colors.primary en tailwind.config.js; uso #d41012");
    return "#d41012";
  }
  const m500 = block[1].match(/500:\s*['"](#[0-9a-fA-F]{6})['"]/);
  return m500 ? m500[1] : "#d41012";
}

function listIconFiles() {
  const names = fs.readdirSync(IMAGES_DIR);
  const out = new Set();
  for (const pattern of ICON_GLOBS) {
    if (pattern.includes("*")) {
      const prefix = pattern.replace("*", "");
      names
        .filter((n) => n.endsWith(prefix))
        .forEach((n) => out.add(n));
    } else if (names.includes(pattern)) {
      out.add(pattern);
    }
  }
  return [...out].sort();
}

function tintSvgContent(content, hex) {
  let next = content;
  const replacements = [
    [/fill="rgba\(100,21,255,1\)"/g, `fill="${hex}"`],
    [/fill='rgba\(100,21,255,1\)'/g, `fill='${hex}'`],
    [/fill="#6415ff"/gi, `fill="${hex}"`],
    [/fill='#6415ff'/gi, `fill='${hex}'`],
  ];
  for (const [re, rep] of replacements) {
    next = next.replace(re, rep);
  }
  return next;
}

function main() {
  const hex = extractPrimary500Hex();
  console.log(`Color primary: ${hex}`);

  const files = listIconFiles();
  let changed = 0;

  for (const name of files) {
    const filePath = path.join(IMAGES_DIR, name);
    let content = fs.readFileSync(filePath, "utf8");
    const before = content;

    content = tintSvgContent(content, hex);
    /* star-icon.svg venía sin fill → el navegador lo pintaba mal / negro */
    if (name === "star-icon.svg" && !/<path[^>]*\bfill=/.test(content)) {
      content = content.replace(/<path\s+d=/, `<path fill="${hex}" d=`);
    }

    if (content !== before) {
      fs.writeFileSync(filePath, content, "utf8");
      changed++;
      console.log(`  actualizado: ${name}`);
    } else {
      console.log(`  sin cambios: ${name}`);
    }
  }

  console.log(`\nListo. ${changed} archivo(s) modificado(s).`);
}

main();
