import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const roots = ["dist", "public"].map((root) => join(process.cwd(), root)).filter(existsSync);
const textExtensions = new Set([".html", ".js", ".css", ".json", ".xml", ".txt", ".svg", ".yml", ".yaml", ".md"]);
const allowed = [
  "https://www.linkedin.com/in/mokka83/",
  "form@notify.michaelmoeller.io"
];

const allowedVendorFiles = [
  "public\\admin\\decap-cms-app.js",
  "dist\\admin\\decap-cms-app.js"
];

const patterns = [
  { name: "mailto link", regex: /mailto:/i },
  { name: "unreviewed marker", regex: /TODO\(MICHAEL-REVIEW\)/i },
  { name: "date of birth label", regex: /\b(date of birth|geburtsdatum|fødselsdato)\b/i },
  { name: "marital status or nationality", regex: /\b(marital status|nationality|familienstand|staatsangehörigkeit|civilstand|nationalitet)\b/i },
  { name: "local absolute path", regex: /[A-Z]:\\[A-Za-z0-9_ .\\-]+/ },
  { name: "secret-like token", regex: /\b(?:sk|pk|key|token|secret)_[A-Za-z0-9]{20,}\b/ },
  { name: "raw email", regex: /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i },
  { name: "telephone-like number", regex: /(?:\+|00)\d[\d\s().-]{7,}\d/ }
];

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

const failures = [];
for (const root of roots) {
  for (const file of walk(root)) {
    const relative = file.replace(process.cwd() + "\\", "");
    if (allowedVendorFiles.includes(relative)) continue;
    if (file.endsWith(".map")) failures.push({ file, issue: "source map present" });
    if (statSync(file).size > 5_000_000 || !textExtensions.has(extname(file))) continue;
    let text = readFileSync(file, "utf8");
    for (const value of allowed) text = text.split(value).join("");
    for (const pattern of patterns) {
      if (pattern.regex.test(text)) failures.push({ file, issue: pattern.name });
    }
  }
}

if (failures.length) {
  console.error("Public safety verification failed:");
  for (const failure of failures) console.error(`- ${failure.issue}: ${failure.file}`);
  process.exit(1);
}

console.log("Public safety verification passed.");
