import { setRequestLocale } from "next-intl/server";
import { HeroSection } from "@/components/saas-landing/hero-section";
import { FeatureLeadSection } from "@/components/saas-landing/feature-lead-section";
import { CapabilitiesSection } from "@/components/saas-landing/capabilities-section";
import { SaudiSection } from "@/components/saas-landing/saudi-section";
import { PersonasSection } from "@/components/saas-landing/personas-section";
import { MetricsSection } from "@/components/saas-landing/metrics-section";
import { FaqSection } from "@/components/saas-landing/faq-section";
import { FinalCtaSection } from "@/components/saas-landing/final-cta-section";
import { LmsStickyCta } from "@/components/saas-landing/lms-sticky-cta";

type Props = { params: Promise<{ locale: string }> };

export default async function LmsPlatformPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative bg-[#fff2e0] pb-32 md:pb-40">
      <HeroSection locale={locale} />
      <FeatureLeadSection />
      <CapabilitiesSection />
      <SaudiSection />
      <PersonasSection />
      <MetricsSection />
      <FaqSection />
      <FinalCtaSection locale={locale} />
      <LmsStickyCta />
    </main>
  );
}
