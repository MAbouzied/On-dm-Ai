import { getLocale } from "next-intl/server";
import { getLegalDocument, type LegalDocKey } from "@/lib/legal-documents";
import { Fragment } from "react";

/** Renders `**bold**` from source markdown as <strong> */
function BodyWithBold({ text }: { text: string }) {
  const parts = text.split(/\*\*/);
  return (
    <div className="mt-3 whitespace-pre-line text-sm leading-relaxed text-gray-600">
      {parts.map((part, i) => (
        <Fragment key={i}>{i % 2 === 1 ? <strong className="font-semibold text-[#414651]">{part}</strong> : part}</Fragment>
      ))}
    </div>
  );
}

export async function LegalDocument({ doc }: { doc: LegalDocKey }) {
  const locale = await getLocale();
  const content = getLegalDocument(locale, doc);

  return (
    <main className="min-h-screen bg-[#FDFDFD]">
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <h1 className="text-3xl font-bold tracking-tight text-[#181d27] md:text-4xl">{content.title}</h1>
        <p className="mt-2 text-sm text-gray-500">{content.lastUpdated}</p>
        <div className="mt-10 space-y-10">
          {content.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-lg font-semibold text-[#181d27]">{section.title}</h2>
              <BodyWithBold text={section.body} />
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
