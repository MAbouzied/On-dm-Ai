export type LegalDocKey = "terms" | "privacy" | "refund";

export interface LegalSection {
  title: string;
  body: string;
}

export interface LegalDoc {
  metaTitle: string;
  metaDescription: string;
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
}
