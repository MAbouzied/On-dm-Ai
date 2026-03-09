import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { getPublicService, getPublicServices } from "@/lib/api";
import { ServiceDetailHero } from "@/components/services/service-detail-hero";
import { SafeHtml } from "@/components/blog/safe-html";
import { LocalizedLink } from "@/components/localized-link";
import { ArrowUpRight } from "lucide-react";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};


function parseTags(tagsStr: string | null | undefined): string[] {
  if (!tagsStr) return [];
  try {
    const parsed = JSON.parse(tagsStr);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((t): t is string => typeof t === "string");
  } catch {
    return [];
  }
}

export default async function ServiceDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("serviceDetail");
  const tNav = await getTranslations("nav");

  const service = await getPublicService(slug);
  if (!service) notFound();

  const title = locale === "ar" ? service.titleAr : service.titleEn;
  const description = locale === "ar" ? service.descriptionAr : service.descriptionEn;
  const bodyContent = locale === "ar" ? (service.contentAr ?? "") : (service.contentEn ?? "");
  const categoryLabels: Record<string, string> = {
    software: tNav("megaMenu.categories.software"),
    marketing: tNav("megaMenu.categories.marketing"),
    design: tNav("megaMenu.categories.design"),
  };
  const category = categoryLabels[service.category] || service.category;
  const tags = parseTags(service.tags);

  const allServices = await getPublicServices();
  const otherServices = allServices.filter((s: { slug: string }) => s.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white pt-24">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ServiceDetailHero
          category={category}
          title={title}
          description={description}
          tags={tags}
          backgroundColor={service.backgroundColor}
          isDark={service.isDark ?? false}
        />

        {bodyContent.trim() && (
          <section className="mt-12">
            <SafeHtml
              html={bodyContent}
              className="prose prose-lg max-w-none"
              dir={locale === "ar" ? "rtl" : "ltr"}
            />
          </section>
        )}

        {otherServices.length > 0 && (
          <section className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-medium text-gray-900">
                {t("otherServices")}
              </h2>
              <LocalizedLink
                href="/services"
                className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
              >
                {t("viewAllServices")}
                <ArrowUpRight className="h-4 w-4" />
              </LocalizedLink>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {otherServices.map((s: { id: string; slug: string; titleEn: string; titleAr: string }) => (
                <LocalizedLink
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="block rounded-2xl border border-gray-200 bg-white p-6 transition-colors hover:border-gray-300 hover:bg-gray-50"
                >
                  <h3 className="font-semibold text-gray-900">
                    {locale === "ar" ? s.titleAr : s.titleEn}
                  </h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm text-teal-600">
                    {t("learnMore")}
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </LocalizedLink>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
