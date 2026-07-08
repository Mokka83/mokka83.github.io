import { createWriteStream, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import PDFDocument from "pdfkit";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ImageRun,
  Packer,
  PageBreak,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType
} from "docx";
import { cv } from "../src/data/cv-data.mjs";

const outDir = join(process.cwd(), "public", "downloads", "cv");
const headshotPath = join(process.cwd(), "public", "images", "michael-moeller-headshot.png");
mkdirSync(outDir, { recursive: true });

const colors = {
  ink: "#20262D",
  muted: "#68737D",
  line: "#D8DEE4",
  accent: "#274D68",
  soft: "#F5F7F9"
};

function pdfText(doc, text, x, y, options = {}) {
  doc
    .font(options.bold ? "Helvetica-Bold" : options.italic ? "Helvetica-Oblique" : "Helvetica")
    .fontSize(options.size || 8)
    .fillColor(options.color || colors.muted)
    .text(text, x, y, {
      width: options.width,
      lineGap: options.lineGap ?? 1.4,
      continued: false
    });
  return doc.y;
}

function sectionTitle(doc, title, x, y, width) {
  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(colors.accent)
    .text(title.toUpperCase(), x, y, { width });
  return doc.y + 9;
}

function bulletList(doc, items, x, y, width, options = {}) {
  let cursor = y;
  for (const item of items) {
    doc.circle(x + 2, cursor + 4, 1.1).fill(colors.accent);
    cursor = pdfText(doc, item, x + 8, cursor, {
      width: width - 8,
      size: options.size || 7.6,
      color: options.color || colors.muted,
      lineGap: 1
    }) + 2.2;
  }
  return cursor;
}

function sidebarGroup(doc, group, x, y, width) {
  let cursor = pdfText(doc, group.title, x, y, { width, size: 8.2, bold: true, color: colors.ink, lineGap: .8 }) + 2;
  cursor = bulletList(doc, group.items, x, cursor, width, { size: 7.2 });
  return cursor + 5;
}

function engagement(doc, item, x, y, width, showRule = true) {
  let cursor = y;
  if (showRule) {
    doc.moveTo(x, cursor).lineTo(x + width, cursor).strokeColor(colors.line).lineWidth(.7).stroke();
    cursor += 10;
  }
  cursor = pdfText(doc, item.period, x, cursor, { width, size: 7.2, bold: true, color: colors.accent, lineGap: .5 }) + 1;
  cursor = pdfText(doc, item.title, x, cursor, { width, size: 9.2, bold: true, color: colors.ink, lineGap: .8 });
  cursor = pdfText(doc, item.client, x, cursor, { width, size: 8, bold: true, color: colors.ink, lineGap: .8 }) + 2;
  cursor = pdfText(doc, item.summary, x, cursor, { width, size: 7.8, color: colors.muted, lineGap: 1 }) + 2;
  cursor = bulletList(doc, item.focus, x, cursor, width, { size: 7.55 });
  if (item.note) cursor = pdfText(doc, item.note, x, cursor + 1, { width, size: 7.2, italic: true, color: colors.accent });
  return cursor + 8;
}

function drawHeader(doc, data, margin, contentWidth) {
  const imageSize = 88;
  doc.image(headshotPath, margin, margin, { width: imageSize, height: imageSize });
  doc.rect(margin, margin, imageSize, imageSize).strokeColor(colors.line).lineWidth(.8).stroke();
  const x = margin + imageSize + 20;
  let y = margin + 5;
  y = pdfText(doc, data.headline, x, y, { width: contentWidth - imageSize - 20, size: 8.2, bold: true, color: colors.accent, lineGap: .7 }) + 2;
  y = pdfText(doc, data.name, x, y, { width: contentWidth - imageSize - 20, size: 23, bold: true, color: colors.ink, lineGap: .5 }) + 2;
  y = pdfText(doc, data.descriptor, x, y, { width: contentWidth - imageSize - 20, size: 10, color: colors.muted, lineGap: 1 }) + 5;
  pdfText(doc, "LinkedIn", x, y, { width: contentWidth - imageSize - 20, size: 8.4, bold: true, color: colors.accent });
  doc.moveTo(margin, margin + 112).lineTo(margin + contentWidth, margin + 112).strokeColor(colors.line).lineWidth(.8).stroke();
}

function drawSidebar(doc, data, page, x, y, width) {
  let cursor = y;
  if (page === 1) {
    cursor = sectionTitle(doc, data.labels.expertise, x, cursor, width);
    for (const group of data.expertise.slice(0, 4)) cursor = sidebarGroup(doc, group, x, cursor, width);
    cursor += 1;
    cursor = sectionTitle(doc, data.labels.languages, x, cursor, width);
    pdfText(doc, data.languages, x, cursor, { width, size: 7.6, color: colors.muted });
  } else {
    cursor = sectionTitle(doc, data.labels.certifications, x, cursor, width);
    cursor = bulletList(doc, data.certifications, x, cursor, width, { size: 7.15 }) + 7;
    cursor = sectionTitle(doc, data.labels.education, x, cursor, width);
    for (const item of data.education) {
      cursor = pdfText(doc, item.title, x, cursor, { width, size: 7.8, bold: true, color: colors.ink }) + 1;
      cursor = pdfText(doc, `${item.place}, ${item.year}`, x, cursor, { width, size: 7.3, color: colors.muted }) + 4;
    }
    cursor += 3;
    cursor = sectionTitle(doc, data.labels.secondaryCapabilities, x, cursor, width);
    pdfText(doc, data.expertise[4].items[0], x, cursor, { width, size: 7.4, color: colors.muted });
  }
}

function exportPdf(locale, data) {
  const path = join(outDir, `michael-moeller-cv-${locale}.pdf`);
  const doc = new PDFDocument({
    size: "A4",
    margin: 0,
    info: { Title: `Michael Moeller CV ${locale}` },
    bufferPages: false
  });
  doc.pipe(createWriteStream(path));

  const margin = 50;
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const contentWidth = pageWidth - margin * 2;
  const sidebarWidth = 122;
  const gap = 24;
  const mainX = margin + sidebarWidth + gap;
  const mainWidth = contentWidth - sidebarWidth - gap;

  drawHeader(doc, data, margin, contentWidth);
  doc.moveTo(margin + sidebarWidth + gap / 2, margin + 137).lineTo(margin + sidebarWidth + gap / 2, pageHeight - 52).strokeColor(colors.line).lineWidth(.8).stroke();
  drawSidebar(doc, data, 1, margin, margin + 137, sidebarWidth);

  let cursor = sectionTitle(doc, data.labels.profile, mainX, margin + 137, mainWidth);
  for (const line of data.profile) {
    cursor = pdfText(doc, line, mainX, cursor, { width: mainWidth, size: 8.7, color: colors.ink, lineGap: 1.2 }) + 2;
  }
  cursor += 9;
  cursor = sectionTitle(doc, data.labels.selectedEngagements, mainX, cursor, mainWidth);
  data.engagements.slice(0, 3).forEach((item, index) => {
    cursor = engagement(doc, item, mainX, cursor, mainWidth, index !== 0);
  });
  pdfText(doc, "1 / 2", pageWidth - margin - 22, pageHeight - 32, { width: 24, size: 6.8, color: "#87919A" });

  doc.addPage();
  doc.moveTo(margin + sidebarWidth + gap / 2, margin).lineTo(margin + sidebarWidth + gap / 2, pageHeight - 52).strokeColor(colors.line).lineWidth(.8).stroke();
  drawSidebar(doc, data, 2, margin, margin, sidebarWidth);
  cursor = sectionTitle(doc, data.labels.selectedEngagements, mainX, margin, mainWidth);
  data.engagements.slice(3).forEach((item, index) => {
    cursor = engagement(doc, item, mainX, cursor, mainWidth, index !== 0);
  });
  cursor += 3;
  cursor = sectionTitle(doc, data.labels.earlierExperience, mainX, cursor, mainWidth);
  const colWidth = (mainWidth - 20) / 2;
  data.earlierCareer.forEach((item, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = mainX + col * (colWidth + 20);
    const y = cursor + row * 64;
    doc.moveTo(x, y).lineTo(x + colWidth, y).strokeColor(colors.line).lineWidth(.7).stroke();
    pdfText(doc, item.period, x, y + 6, { width: 44, size: 7, bold: true, color: colors.accent });
    pdfText(doc, item.client, x + 47, y + 6, { width: colWidth - 47, size: 7.4, bold: true, color: colors.ink, lineGap: .8 });
    pdfText(doc, item.role, x + 47, y + 28, { width: colWidth - 47, size: 6.9, color: colors.muted, lineGap: .8 });
  });
  pdfText(doc, "2 / 2", pageWidth - margin - 22, pageHeight - 32, { width: 24, size: 6.8, color: "#87919A" });
  doc.end();
}

const noBorder = {
  top: { style: BorderStyle.NONE },
  bottom: { style: BorderStyle.NONE },
  left: { style: BorderStyle.NONE },
  right: { style: BorderStyle.NONE }
};

function run(text, options = {}) {
  return new TextRun({
    text,
    bold: options.bold,
    italics: options.italic,
    color: (options.color || colors.muted).replace("#", ""),
    size: options.size || 16,
    font: "Aptos"
  });
}

function paragraph(children, options = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    heading: options.heading,
    spacing: { before: options.before || 0, after: options.after ?? 90, line: options.line || 230 },
    alignment: options.alignment
  });
}

function docxSectionTitle(text) {
  return paragraph(run(text.toUpperCase(), { bold: true, color: colors.accent, size: 16 }), { after: 100 });
}

function docxBullets(items) {
  return items.map((item) => new Paragraph({
    children: [run(item, { size: 15 })],
    bullet: { level: 0 },
    spacing: { after: 45, line: 210 }
  }));
}

function cell(children, width, options = {}) {
  return new TableCell({
    children,
    width: { size: width, type: WidthType.PERCENTAGE },
    borders: noBorder,
    margins: { top: 70, bottom: 70, left: options.left || 70, right: options.right || 70 },
    shading: options.shading ? { fill: options.shading } : undefined
  });
}

function engagementDocx(item) {
  return [
    paragraph(run(item.period, { bold: true, color: colors.accent, size: 15 }), { after: 45 }),
    paragraph(run(item.title, { bold: true, color: colors.ink, size: 18 }), { after: 25 }),
    paragraph(run(item.client, { bold: true, color: colors.ink, size: 16 }), { after: 50 }),
    paragraph(run(item.summary, { size: 15 }), { after: 55 }),
    ...docxBullets(item.focus),
    ...(item.note ? [paragraph(run(item.note, { italic: true, color: colors.accent, size: 15 }), { after: 110 })] : [paragraph(run("", { size: 2 }), { after: 65 })])
  ];
}

function pageTable(data, page) {
  const sidebarChildren = [];
  const mainChildren = [];

  if (page === 1) {
    sidebarChildren.push(docxSectionTitle(data.labels.expertise));
    for (const group of data.expertise.slice(0, 4)) {
      sidebarChildren.push(paragraph(run(group.title, { bold: true, color: colors.ink, size: 16 }), { after: 45 }));
      sidebarChildren.push(...docxBullets(group.items));
    }
    sidebarChildren.push(docxSectionTitle(data.labels.languages), paragraph(run(data.languages, { size: 15 })));
    mainChildren.push(docxSectionTitle(data.labels.profile));
    for (const line of data.profile) mainChildren.push(paragraph(run(line, { color: colors.ink, size: 17 }), { after: 70 }));
    mainChildren.push(docxSectionTitle(data.labels.selectedEngagements));
    for (const item of data.engagements.slice(0, 3)) mainChildren.push(...engagementDocx(item));
  } else {
    sidebarChildren.push(docxSectionTitle(data.labels.certifications), ...docxBullets(data.certifications));
    sidebarChildren.push(docxSectionTitle(data.labels.education));
    for (const item of data.education) sidebarChildren.push(paragraph([run(item.title, { bold: true, color: colors.ink, size: 16 }), run(`\n${item.place}, ${item.year}`, { size: 15 })]));
    sidebarChildren.push(docxSectionTitle(data.labels.secondaryCapabilities), paragraph(run(data.expertise[4].items[0], { size: 15 })));
    mainChildren.push(docxSectionTitle(data.labels.selectedEngagements));
    for (const item of data.engagements.slice(3)) mainChildren.push(...engagementDocx(item));
    mainChildren.push(docxSectionTitle(data.labels.earlierExperience));
    for (const item of data.earlierCareer) {
      mainChildren.push(paragraph([
        run(`${item.period}  `, { bold: true, color: colors.accent, size: 15 }),
        run(`${item.client} - `, { bold: true, color: colors.ink, size: 15 }),
        run(item.role, { size: 15 })
      ], { after: 50 }));
    }
  }

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [new TableRow({ children: [cell(sidebarChildren, 28, { right: 170 }), cell(mainChildren, 72, { left: 170 })] })]
  });
}

async function exportDocx(locale, data) {
  const header = new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: noBorder,
    rows: [new TableRow({
      children: [
        cell([
          new Paragraph({
            children: [new ImageRun({ data: readFileSync(headshotPath), transformation: { width: 110, height: 110 } })],
            alignment: AlignmentType.LEFT
          })
        ], 24),
        cell([
          paragraph(run(data.headline, { bold: true, color: colors.accent, size: 17 }), { after: 40 }),
          paragraph(run(data.name, { bold: true, color: colors.ink, size: 42 }), { after: 45 }),
          paragraph(run(data.descriptor, { size: 20 }), { after: 80 }),
          paragraph(run("LinkedIn", { bold: true, color: colors.accent, size: 17 }))
        ], 76)
      ]
    })]
  });

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: { font: "Aptos", color: colors.muted.replace("#", "") },
          paragraph: { spacing: { line: 230 } }
        },
        heading1: {
          run: { font: "Aptos", color: colors.accent.replace("#", ""), bold: true, size: 18 }
        }
      }
    },
    sections: [{
      properties: {
        page: {
          margin: { top: 720, right: 720, bottom: 720, left: 720 },
          size: { width: 11906, height: 16838 }
        }
      },
      children: [
        header,
        paragraph(run("", { size: 2 }), { after: 150 }),
        pageTable(data, 1),
        new Paragraph({ children: [new PageBreak()] }),
        pageTable(data, 2)
      ]
    }]
  });

  writeFileSync(join(outDir, `michael-moeller-cv-${locale}.docx`), await Packer.toBuffer(doc));
}

for (const [locale, data] of Object.entries(cv)) {
  exportPdf(locale, data);
  await exportDocx(locale, data);
}

console.log("CV downloads generated.");
