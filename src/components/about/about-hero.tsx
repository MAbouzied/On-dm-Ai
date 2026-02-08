import { getTranslations } from "next-intl/server";
import { SectionBadge } from "@/components/ui/section-badge";

export async function AboutHero() {
  const t = await getTranslations("about");

  return (
    <section className="w-full flex flex-col items-center justify-center px-4 md:px-8 py-24 md:py-32">
      <div className="max-w-[1228px] w-full flex flex-col items-center text-center">
        {/* Badge */}
        <SectionBadge className="mb-4">{t("hero.badge")}</SectionBadge>

        {/* Main Heading */}
        <h1 className="font-['Wix_Madefor_Display'] font-bold text-[3.5rem] md:text-[5.625rem] leading-tight md:leading-[6.9375rem] tracking-[-0.225rem] text-black mb-11">
          {t("hero.title")}
        </h1>

        {/* Supporting Text */}
        <p className="font-poppins text-xl md:text-2xl leading-[1.875rem] text-[#535862] max-w-[786px]">
          {t("hero.description")}
        </p>
      </div>
    </section>
  );
}
