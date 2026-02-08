import { getTranslations } from "next-intl/server";
import Badge from "../ui/Badge";

export async function ServicesHero() {
  const t = await getTranslations("servicesPage");

  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 max-w-7xl mx-auto mt-32">
      <Badge>{t("badge")}</Badge>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-black mb-6 max-w-5xl leading-[1.1] tracking-tight">
        {t("title")}
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl">
        {t("description")}
      </p>
    </section>
  );
}
