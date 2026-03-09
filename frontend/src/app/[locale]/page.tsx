import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { OurStory } from "@/components/home/our-story";
import { ServicesIntro } from "@/components/home/services-intro";
import { ServicesGrid } from "@/components/home/services-grid";
import { WorkIntro } from "@/components/home/work-intro";
import { ClientsSection } from "@/components/home/clients-section";
import { BlogSection } from "@/components/home/blog-section";
import StickySection from "@/components/home/StickySection";
import WorkContent from "@/components/home/work-content";
import { getPublicHomepage, getPublicProjects } from "@/lib/api";

export const dynamic = "force-dynamic";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  let homepageConfig: Record<string, string> = {};
  try {
    homepageConfig = await getPublicHomepage();
  } catch {
    // Fallback to empty - components will use translations
  }

  let projects: Array<{ slug: string; titleEn: string; titleAr: string; descriptionEn?: string; descriptionAr?: string }> = [];
  try {
    projects = await getPublicProjects();
  } catch {
    // Fallback to empty
  }

  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <Hero config={homepageConfig} locale={locale} />
      <StickySection />
      <OurStory config={homepageConfig} locale={locale} />
      <ServicesIntro config={homepageConfig} locale={locale} />
      <ServicesGrid locale={locale} />
      <WorkIntro config={homepageConfig} locale={locale} />
      <WorkContent projects={projects} locale={locale} />
      <ClientsSection config={homepageConfig} locale={locale} />
      <BlogSection config={homepageConfig} locale={locale} />
    </main>
  );
}
