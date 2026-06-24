import sharp from "sharp";
import { readdirSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

const files = readdirSync(PUBLIC).filter(
  (f) => /^play\d+\.(jpg|png)$/i.test(f) || f === "zain-card.png",
);

const results = [];

for (const file of files) {
  const input = join(PUBLIC, file);
  const name = file.replace(/\.(jpg|png)$/i, "");
  const output = join(PUBLIC, `${name}.webp`);

  const { size: inSize } = await sharp(input).stats();
  await sharp(input).webp({ quality: 82 }).toFile(output);
  const { size: outSize } = await sharp(output).stats();

  const saved = ((1 - outSize / inSize) * 100).toFixed(1);
  results.push(
    `${file.padEnd(18)} → ${name}.webp  (${(inSize / 1024).toFixed(0)}K → ${(outSize / 1024).toFixed(0)}K, −${saved}%)`,
  );
}

console.log(`\nConverted ${results.length} file(s) to WebP (quality 82):\n`);
console.log(results.join("\n"));
