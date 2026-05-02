import type { LegalDoc, LegalDocKey } from "./types";
import { legalDocsAr } from "./ar";
import { legalDocsEn } from "./en";

export type { LegalDoc, LegalDocKey, LegalSection } from "./types";

export function getLegalDocument(locale: string, doc: LegalDocKey): LegalDoc {
  return locale === "ar" ? legalDocsAr[doc] : legalDocsEn[doc];
}
