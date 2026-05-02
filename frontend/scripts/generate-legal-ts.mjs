/**
 * Parses ON_DM_Terms_Privacy_Refund_AR_EN.md into LegalDoc TS exports.
 * Run: node scripts/generate-legal-ts.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const mdPath = path.join(root, "src/lib/legal-documents/ON_DM_Terms_Privacy_Refund_AR_EN.md");

function escapeTs(str) {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/`/g, "\\`")
    .replace(/\$\{/g, "\\${");
}

function parseSections(block) {
  const lines = block.split("\n");
  const sections = [];
  let currentTitle = null;
  let currentBody = [];

  function flush() {
    if (currentTitle !== null) {
      const body = currentBody.join("\n").trim();
      sections.push({ title: currentTitle, body });
    }
    currentBody = [];
  }

  for (const line of lines) {
    const m = line.match(/^####\s+(.+)$/);
    if (m) {
      flush();
      currentTitle = m[1].trim();
    } else if (currentTitle !== null) {
      currentBody.push(line);
    }
  }
  flush();
  return sections.filter((s) => s.title && s.body);
}

function sliceBetween(md, startNeedle, endNeedle) {
  const s = md.indexOf(startNeedle);
  if (s === -1) throw new Error("Missing start: " + startNeedle);
  const start = s + startNeedle.length;
  const e = md.indexOf(endNeedle, start);
  if (e === -1) throw new Error("Missing end: " + endNeedle);
  return md.slice(start, e);
}

const md = fs.readFileSync(mdPath, "utf8");

const markers = {
  termsEn: ["### 1.1 English Version", "### 1.2"],
  termsAr: ["### 1.2 النسخة العربية", "## 2. Privacy Policy"],
  privacyEn: ["### 2.1 English Version", "### 2.2"],
  privacyAr: ["### 2.2 النسخة العربية", "## 3. Refund Policy"],
  refundEn: ["### 3.1 English Version", "### 3.2"],
  refundAr: ["### 3.2 النسخة العربية", "## Suggested Website Footer"],
};

function buildDoc(name, sections, metaTitle, metaDescription, pageTitle, lastUpdatedLine) {
  const secStr = sections
    .map(
      (s) =>
        `    {\n      title: \`${escapeTs(s.title)}\`,\n      body: \`${escapeTs(s.body)}\`,\n    }`
    )
    .join(",\n");
  const lu = lastUpdatedLine ?? "Last updated: 2 May 2026";
  return `  ${name}: {\n    metaTitle: ${JSON.stringify(metaTitle)},\n    metaDescription: ${JSON.stringify(metaDescription)},\n    title: ${JSON.stringify(pageTitle)},\n    lastUpdated: ${JSON.stringify(lu)},\n    sections: [\n${secStr},\n    ],\n  }`;
}

let termsEn, termsAr, privacyEn, privacyAr, refundEn, refundAr;
try {
  termsEn = parseSections(sliceBetween(md, markers.termsEn[0], markers.termsEn[1]));
  termsAr = parseSections(sliceBetween(md, markers.termsAr[0], markers.termsAr[1]));
  privacyEn = parseSections(sliceBetween(md, markers.privacyEn[0], markers.privacyEn[1]));
  privacyAr = parseSections(sliceBetween(md, markers.privacyAr[0], markers.privacyAr[1]));
  refundEn = parseSections(sliceBetween(md, markers.refundEn[0], markers.refundEn[1]));
  refundAr = parseSections(sliceBetween(md, markers.refundAr[0], markers.refundAr[1]));
} catch (e) {
  console.error(e);
  process.exit(1);
}

const header = `import type { LegalDoc, LegalDocKey } from "./types";

/** Generated from ON_DM_Terms_Privacy_Refund_AR_EN.md — run scripts/generate-legal-ts.mjs after editing the markdown. */
`;

const enFile =
  header +
  `export const legalDocsEn: Record<LegalDocKey, LegalDoc> = {\n` +
  buildDoc(
    "terms",
    termsEn,
    "Terms & Conditions",
    "Terms governing use of ON DM websites, proposals, quotations, and digital services.",
    "Terms & Conditions"
  ) +
  ",\n" +
  buildDoc(
    "privacy",
    privacyEn,
    "Privacy Policy",
    "How ON DM collects, uses, stores, shares, and protects personal information.",
    "Privacy Policy"
  ) +
  ",\n" +
  buildDoc(
    "refund",
    refundEn,
    "Refund Policy",
    "Refunds, cancellations, deposits, and payments for ON DM services.",
    "Refund Policy"
  ) +
  ",\n};\n";

const arFile =
  header +
  `export const legalDocsAr: Record<LegalDocKey, LegalDoc> = {\n` +
  buildDoc(
    "terms",
    termsAr,
    "الشروط والأحكام",
    "الشروط التي تحكم استخدام موقع ON DM والعروض والخدمات الرقمية.",
    "الشروط والأحكام",
    "آخر تحديث: ٢ مايو ٢٠٢٦"
  ) +
  ",\n" +
  buildDoc(
    "privacy",
    privacyAr,
    "سياسة الخصوصية",
    "كيف تجمع ON DM المعلومات الشخصية وتستخدمها وتخزنها وتشاركها وتحميها.",
    "سياسة الخصوصية",
    "آخر تحديث: ٢ مايو ٢٠٢٦"
  ) +
  ",\n" +
  buildDoc(
    "refund",
    refundAr,
    "سياسة الاسترداد",
    "الاسترداد والإلغاء والدفعات المقدمة ومدفوعات المشروعات لخدمات ON DM.",
    "سياسة الاسترداد",
    "آخر تحديث: ٢ مايو ٢٠٢٦"
  ) +
  ",\n};\n";

fs.writeFileSync(path.join(root, "src/lib/legal-documents/en.ts"), enFile);
fs.writeFileSync(path.join(root, "src/lib/legal-documents/ar.ts"), arFile);

console.log(
  "Wrote en.ts + ar.ts:",
  termsEn.length,
  termsAr.length,
  privacyEn.length,
  privacyAr.length,
  refundEn.length,
  refundAr.length,
  "sections"
);
