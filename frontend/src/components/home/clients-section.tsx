import { getTranslations } from "next-intl/server";
import type { SuccessPartnerPublic } from "@/lib/api";
import { PartnersMarquee } from "./partners-marquee";

export async function ClientsSection({
  config = {},
  locale = "en",
  partners,
}: {
  config?: Record<string, string>;
  locale?: string;
  partners: SuccessPartnerPublic[];
}) {
  const t = await getTranslations("clients");
  const badge = locale === "ar" ? (config["clients.badgeAr"] ?? t("badge")) : (config["clients.badgeEn"] ?? t("badge"));
  const title = locale === "ar" ? (config["clients.titleAr"] ?? t("title")) : (config["clients.titleEn"] ?? t("title"));
  const description = locale === "ar" ? (config["clients.descriptionAr"] ?? t("description")) : (config["clients.descriptionEn"] ?? t("description"));

  const list = partners.filter((p) => p.logoUrl);

  return (
    <section className="w-full py-20 px-4 md:px-8 max-w-6xl mx-auto text-center flex flex-col items-center">
      <div className="mb-6">
        <span className="px-6 py-2 rounded-full border border-gray-200 text-sm font-medium uppercase tracking-wider text-gray-600">
          {badge}
        </span>
      </div>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
        {title}
      </h2>

      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl leading-relaxed">
        {description}
      </p>

      {list.length > 0 ? <PartnersMarquee list={list} /> : null}
    </section>
  );
}
