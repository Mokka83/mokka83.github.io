import { copyFileSync, existsSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";

const sourceDir = join(process.cwd(), "node_modules", "decap-cms-app", "dist");
const source = join(sourceDir, "decap-cms-app.js");
const target = join(process.cwd(), "public", "admin", "decap-cms-app.js");

if (!existsSync(source)) {
  throw new Error("Decap CMS bundle not found. Run npm ci before building.");
}

mkdirSync(dirname(target), { recursive: true });
for (const entry of readdirSync(sourceDir)) {
  if (entry.endsWith(".js")) {
    copyFileSync(join(sourceDir, entry), join(dirname(target), entry));
  }
}
