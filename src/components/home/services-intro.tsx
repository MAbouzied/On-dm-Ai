import { useTranslations } from "next-intl";
import { LocalizedLink } from "../localized-link";
import Badge from "../ui/Badge";

export function ServicesIntro() {
  const t = useTranslations("servicesIntro");

  return (
    <section className="w-full py-20 px-4 md:px-8 max-w-4xl mx-auto text-center flex flex-col items-center">
      <Badge>{t("badge")}</Badge>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
        {t("title")}
      </h2>

      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
        {t("description")}
      </p>

      <LocalizedLink
        href="/services"
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
      >
        {t("knowMore")}
      </LocalizedLink>
    </section>
  );
}
