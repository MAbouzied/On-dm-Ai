import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LocalizedLink } from "../localized-link";
import { ButtonBaseStyle, buttonVariants, BorderType } from "../ui/Button";
import { getTranslations } from "next-intl/server";
import Star from "@/icons/Star";
import Home from "@/icons/Home";
import { Span } from "../ui/Text";

export async function Hero({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = await getTranslations("hero");
  const title = config[locale === "ar" ? "hero.titleAr" : "hero.titleEn"] || t("title");
  const subtitle = config[locale === "ar" ? "hero.subtitleAr" : "hero.subtitleEn"] || t("subtitle");
  const badge1 = config["hero.badge1En"] || t("badge1");
  const badge2 = config["hero.badge2En"] || t("badge2");
  const startProject = locale === "ar" ? (config["hero.startProjectAr"] ?? t("startProject")) : (config["hero.startProjectEn"] ?? t("startProject"));
  const exploreServices = locale === "ar" ? (config["hero.exploreServicesAr"] ?? t("exploreServices")) : (config["hero.exploreServicesEn"] ?? t("exploreServices"));
  const startProjectHref = config["hero.startProjectHref"] || "/contact";
  const exploreServicesHref = config["hero.exploreServicesHref"] || "/services";
  return (
    <section className="container w-full flex flex-col items-center justify-center text-center px-4 md:px-8 mx-auto mt-32">
      <h1>{title}</h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl">
        {subtitle}
      </p>

      <div className="flex flex-col w-full sm:w-auto sm:flex-row items-center gap-4 mb-12">
        <LocalizedLink
          href={startProjectHref}
          className={`w-full flex-1 ${ButtonBaseStyle} ${buttonVariants.primary} ${BorderType.None}`}
        >
          <Span variant="B4" className="text-xl! flex items-center justify-center gap-2 text-nowrap">
            {startProject}
            <ArrowUpRight className="w-5 h-5" />
          </Span>
        </LocalizedLink>

        <LocalizedLink
          href={exploreServicesHref}
          className={`w-full flex-1 ${ButtonBaseStyle} ${buttonVariants.light} ${BorderType.full}`}
        >
          <Span variant="B4R">{exploreServices}</Span>
        </LocalizedLink>
      </div>

      <div className="relative w-full mt-8">
        <div className="relative h-53.5 md:h-191.25 rounded-tl-4xl rounded-tr-4xl rounded-bl-xl rounded-br-[5rem] md:rounded-[2.5rem] overflow-hidden">
          <Image
            src="/home.svg"
            alt="Digital Business Growth"
            width={1200}
            height={0}
            className="w-full h-auto object-cover"
            priority
          />
        </div>

        {/* Badge 1 */}
        <div className="absolute top-3 -left-2 py-0 md:top-30 md:-left-12 bg-white px-1.25 md:py-3 md:px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-1 md:gap-3 z-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
          <Star className="w-4 md:w-10" />
          <Span variant="B4">{badge1}</Span>
        </div>

        {/* Badge 2 */}
        <div className="absolute top-16 -left-2 py-0 md:top-57 md:-left-7.5 bg-white px-1.25 md:py-3 md:px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-1 md:gap-3 z-10 animate-in fade-in slide-in-from-left-4 duration-700 delay-300">
          <Home className="w-4 md:w-10" />
          <Span variant="B4">{badge2}</Span>
        </div>
      </div>
    </section>
  );
}
