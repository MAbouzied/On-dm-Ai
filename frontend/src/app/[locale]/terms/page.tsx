import { setRequestLocale } from "next-intl/server";
import { LegalDocument } from "@/components/legal/legal-document";
import { getLegalDocument } from "@/lib/legal-documents";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const doc = getLegalDocument(locale, "terms");
  return {
    title: doc.metaTitle,
    description: doc.metaDescription,
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalDocument doc="terms" />;
}
