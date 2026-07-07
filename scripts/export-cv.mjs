import { mkdirSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import { createWriteStream } from "node:fs";
import { Document, Packer, Paragraph, HeadingLevel, TextRun } from "docx";
import { writeFileSync } from "node:fs";
import { cv } from "../src/data/cv-data.mjs";

const outDir = join(process.cwd(), "public", "downloads", "cv");
mkdirSync(outDir, { recursive: true });

function addPdfText(doc, text, options = {}) {
  doc.font(options.bold ? "Helvetica-Bold" : "Helvetica").fontSize(options.size || 10).fillColor(options.color || "#111111").text(text, { continued: false });
}

function exportPdf(locale, data) {
  const path = join(outDir, `michael-moeller-cv-${locale}.pdf`);
  const doc = new PDFDocument({ size: "A4", margin: 48, info: { Title: `Michael Moeller CV ${locale}` } });
  doc.pipe(createWriteStream(path));
  addPdfText(doc, data.name, { size: 22, bold: true });
  addPdfText(doc, `${data.headline} | ${data.descriptor}`, { size: 11, color: "#334455" });
  addPdfText(doc, data.linkedin, { size: 9, color: "#334455" });
  doc.moveDown();
  addPdfText(doc, "Profile", { size: 14, bold: true });
  data.profile.forEach((p) => { addPdfText(doc, p); doc.moveDown(.3); });
  addPdfText(doc, data.engagementTitle, { size: 14, bold: true });
  data.engagements.forEach((item) => {
    doc.moveDown(.4);
    addPdfText(doc, `${item.title} - ${item.client}`, { bold: true });
    addPdfText(doc, `${item.period} | ${item.role}`, { color: "#334455" });
    addPdfText(doc, item.summary);
    item.focus?.slice(0, 4).forEach((focus) => addPdfText(doc, `• ${focus}`));
  });
  doc.addPage();
  addPdfText(doc, "Expertise", { size: 14, bold: true });
  data.expertise.forEach((group) => {
    doc.moveDown(.4);
    addPdfText(doc, group.title, { bold: true });
    group.items.forEach((item) => addPdfText(doc, `• ${item}`));
  });
  doc.moveDown();
  addPdfText(doc, "Education", { size: 14, bold: true });
  data.education.forEach((item) => addPdfText(doc, `${item.title}, ${item.place}, ${item.year}`));
  doc.moveDown();
  addPdfText(doc, "Selected Certifications and Training", { size: 14, bold: true });
  data.certifications.forEach((item) => addPdfText(doc, `• ${item}`));
  doc.end();
}

function para(text, options = {}) {
  return new Paragraph({
    text,
    heading: options.heading,
    spacing: { after: options.after ?? 140 }
  });
}

async function exportDocx(locale, data) {
  const children = [
    para(data.name, { heading: HeadingLevel.TITLE }),
    para(`${data.headline} | ${data.descriptor}`),
    para(data.linkedin),
    para("Profile", { heading: HeadingLevel.HEADING_1 }),
    ...data.profile.map((p) => para(p)),
    para(data.engagementTitle, { heading: HeadingLevel.HEADING_1 })
  ];
  for (const item of data.engagements) {
    children.push(para(`${item.title} - ${item.client}`, { heading: HeadingLevel.HEADING_2 }));
    children.push(para(`${item.period} | ${item.role}`));
    children.push(para(item.summary));
    for (const focus of item.focus || []) children.push(new Paragraph({ children: [new TextRun(focus)], bullet: { level: 0 } }));
  }
  children.push(para("Expertise", { heading: HeadingLevel.HEADING_1 }));
  for (const group of data.expertise) {
    children.push(para(group.title, { heading: HeadingLevel.HEADING_2 }));
    for (const item of group.items) children.push(new Paragraph({ children: [new TextRun(item)], bullet: { level: 0 } }));
  }
  children.push(para("Education", { heading: HeadingLevel.HEADING_1 }));
  for (const item of data.education) children.push(para(`${item.title}, ${item.place}, ${item.year}`));
  children.push(para("Selected Certifications and Training", { heading: HeadingLevel.HEADING_1 }));
  for (const item of data.certifications) children.push(new Paragraph({ children: [new TextRun(item)], bullet: { level: 0 } }));

  const doc = new Document({ sections: [{ properties: {}, children }] });
  writeFileSync(join(outDir, `michael-moeller-cv-${locale}.docx`), await Packer.toBuffer(doc));
}

for (const [locale, data] of Object.entries(cv)) {
  exportPdf(locale, data);
  await exportDocx(locale, data);
}

console.log("CV downloads generated.");
