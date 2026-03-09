import { getTranslations } from "next-intl/server";
import { SectionBadge } from "@/components/ui/section-badge";

export async function AboutHero({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = await getTranslations("about");
  const badge = locale === "ar" ? (config["about.hero.badgeAr"] ?? t("hero.badge")) : (config["about.hero.badgeEn"] ?? t("hero.badge"));
  const title = locale === "ar" ? (config["about.hero.titleAr"] ?? t("hero.title")) : (config["about.hero.titleEn"] ?? t("hero.title"));
  const description = locale === "ar" ? (config["about.hero.descriptionAr"] ?? t("hero.description")) : (config["about.hero.descriptionEn"] ?? t("hero.description"));

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-[1228px] w-full flex flex-col items-center text-center">
        {/* Badge */}
        <SectionBadge className="mb-4">{badge}</SectionBadge>

        {/* Main Heading */}
        <h1 className="font-['Wix_Madefor_Display'] font-bold text-[3.5rem] md:text-[5.625rem] leading-tight md:leading-[6.9375rem] tracking-[-0.225rem] text-black mb-11">
          {title}
        </h1>

        {/* Supporting Text */}
        <p className="font-poppins text-xl md:text-2xl leading-[1.875rem] text-[#535862] max-w-[786px]">
          {description}
        </p>
      </div>
    </section>
  );
}
