import { existsSync, statSync } from "node:fs";
import { join } from "node:path";

const required = ["en", "de", "da"].flatMap((locale) => [
  `michael-moeller-cv-${locale}.pdf`,
  `michael-moeller-cv-${locale}.docx`
]);

const missing = required.filter((file) => {
  const path = join(process.cwd(), "public", "downloads", "cv", file);
  return !existsSync(path) || statSync(path).size < 1024;
});

if (missing.length) {
  console.error("Missing or too-small CV downloads:");
  for (const file of missing) console.error(`- ${file}`);
  process.exit(1);
}

console.log("All CV downloads exist and are non-empty.");
