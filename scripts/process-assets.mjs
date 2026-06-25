import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

const SRC = path.resolve("..", "nolei_portal_assets");
const OUT_PORTAL = path.resolve("public", "assets", "portal");
const OUT_SCROLL = path.resolve("public", "assets", "scroll");

mkdirSync(OUT_PORTAL, { recursive: true });
mkdirSync(OUT_SCROLL, { recursive: true });

const jobs = [
  // trimmed, transparent foreground elements
  { file: "portal_luz.png", out: `${OUT_PORTAL}/portal_luz.webp`, width: 760, trim: true },
  { file: "portal_trevas.png", out: `${OUT_PORTAL}/portal_trevas.webp`, width: 760, trim: true },
  { file: "pedras_luz.png", out: `${OUT_PORTAL}/pedras_luz.webp`, width: 1000, trim: true },
  { file: "pedras_trevas.png", out: `${OUT_PORTAL}/pedras_trevas.webp`, width: 1000, trim: true },
  // full-bleed side panels
  { file: "lado_luz_painel.png", out: `${OUT_PORTAL}/lado_luz_painel.webp`, width: 960, trim: false },
  { file: "lado_trevas_painel.png", out: `${OUT_PORTAL}/lado_trevas_painel.webp`, width: 960, trim: false },
  // tall scroll backdrops
  { file: "bg_scroll_luz.png", out: `${OUT_SCROLL}/bg_scroll_luz.webp`, width: 960, trim: false },
  { file: "bg_scroll_trevas.png", out: `${OUT_SCROLL}/bg_scroll_trevas.webp`, width: 960, trim: false },
];

for (const job of jobs) {
  const input = path.join(SRC, job.file);
  let pipeline = sharp(input);
  if (job.trim) pipeline = pipeline.trim({ threshold: 8 });
  pipeline = pipeline.resize({ width: job.width, withoutEnlargement: true });
  await pipeline.webp({ quality: 84 }).toFile(job.out);
  console.log("✓", job.file, "->", job.out);
}

console.log("done");
