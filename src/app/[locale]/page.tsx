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

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="w-full min-h-screen flex flex-col items-center">
      <Hero />
      <StickySection />
      <OurStory />
      <ServicesIntro />
      <ServicesGrid />
      <WorkIntro />
      <WorkContent />
      <ClientsSection />
      <BlogSection />
    </main>
  );
}
