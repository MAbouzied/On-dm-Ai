import { setRequestLocale } from "next-intl/server";
import {
  AboutHero,
  AboutTestimonial,
  AboutFeatures,
  AboutTeam,
} from "@/components/about";
import { getSiteConfig } from "@/lib/api";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  let siteConfig: Record<string, string> = {};
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // Fallback to empty
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-[#FDFDFD]">
      <AboutHero config={siteConfig} locale={locale} />
      <AboutTestimonial config={siteConfig} locale={locale} />
      <AboutFeatures config={siteConfig} locale={locale} />
      <AboutTeam locale={locale} config={siteConfig} />
    </main>
  );
}
