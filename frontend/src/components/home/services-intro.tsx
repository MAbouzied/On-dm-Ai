"use client";

import { useTranslations } from "next-intl";
import { LocalizedLink } from "../localized-link";
import Badge from "../ui/Badge";
import { getConfigEnAr } from "@/lib/site-config-context";

export function ServicesIntro({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = useTranslations("servicesIntro");
  const badge = getConfigEnAr(config, "servicesIntro.badge", locale, t("badge"));
  const title = getConfigEnAr(config, "servicesIntro.title", locale, t("title"));
  const description = getConfigEnAr(config, "servicesIntro.description", locale, t("description"));
  const knowMore = getConfigEnAr(config, "servicesIntro.knowMore", locale, t("knowMore"));
  const knowMoreHref = config["servicesIntro.knowMoreHref"] || "/services";

  return (
    <section className="w-full py-20 px-4 md:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">
      <Badge>{badge}</Badge>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
        {title}
      </h2>

      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
        {description}
      </p>

      <LocalizedLink
        href={knowMoreHref}
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        {knowMore}
      </LocalizedLink>
    </section>
  );
}
