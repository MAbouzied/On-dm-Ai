import { setRequestLocale } from "next-intl/server";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";
import { getSiteConfig } from "@/lib/api";

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
}

export default async function ServicesPage({ params }: ServicesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  let siteConfig: Record<string, string> = {};
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // Fallback to empty
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center pt-24">
      <ServicesHero config={siteConfig} locale={locale} />
      <ServicesList config={siteConfig} locale={locale} />
    </main>
  );
}
