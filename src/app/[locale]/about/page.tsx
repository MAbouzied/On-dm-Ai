import { setRequestLocale } from "next-intl/server";
import {
  AboutHero,
  AboutTestimonial,
  AboutFeatures,
  AboutTeam,
} from "@/components/about";

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="w-full min-h-screen flex flex-col items-center bg-[#FDFDFD]">
      <AboutHero />
      <AboutTestimonial />
      <AboutFeatures />
      <AboutTeam />
    </main>
  );
}
