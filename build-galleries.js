aconst fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const WORKS_DIR = path.join(ROOT, "works");
const OUT_FILE = path.join(ROOT, "galleries.json");

const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);
const categories = ["thw", "feuerwehr", "polizei", "zoll", "behoerden"];

function safeReadDir(dir) {
  try { return fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return []; }
}

function isImage(fileName) {
  return allowedExt.has(path.extname(fileName).toLowerCase());
}

// "natürliche" Sortierung: 1,2,10 statt 1,10,2
function naturalCompare(a, b) {
  return a.localeCompare(b, "de", { numeric: true, sensitivity: "base" });
}

function titleFromFilename(name) {
  const base = name.replace(path.extname(name), "");
  return base
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

const galleries = {};

for (const cat of categories) {
  const dir = path.join(WORKS_DIR, cat);
  const entries = safeReadDir(dir);

  const files = entries
    .filter(d => d.isFile())
    .map(d => d.name)
    .filter(isImage)
    .sort(naturalCompare);

  galleries[cat] = files.map(f => ({
    src: `works/${cat}/${f}`,
    alt: `Count of Patches – ${cat} – ${f}`,
    title: titleFromFilename(f)
  }));
}

fs.writeFileSync(OUT_FILE, JSON.stringify(galleries, null, 2), "utf8");
console.log(`✅ galleries.json erstellt (${Object.keys(galleries).length} Kategorien)`);