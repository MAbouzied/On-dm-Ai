import { getTranslations } from "next-intl/server";
import { Building2, Palette, Sparkles } from "lucide-react";

export async function SaudiSection() {
  const t = await getTranslations("lmsPlatform.saudiSection");

  const points = [
    { icon: Palette, titleKey: "point1Title" as const, bodyKey: "point1Body" as const },
    { icon: Building2, titleKey: "point2Title" as const, bodyKey: "point2Body" as const },
    { icon: Sparkles, titleKey: "point3Title" as const, bodyKey: "point3Body" as const },
  ];

  return (
    <section
      className="relative overflow-hidden border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-20"
      aria-labelledby="saudi-section-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_80%_20%,rgba(2,68,230,0.06)_0%,transparent_55%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <p className="text-center text-sm font-semibold uppercase tracking-wide text-[#024bff]">
          {t("eyebrow")}
        </p>
        <h2
          id="saudi-section-heading"
          className="font-display mt-3 text-center text-3xl font-bold text-[#181d27] md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-[#535862] md:text-xl">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {points.map(({ icon: Icon, titleKey, bodyKey }) => (
            <article
              key={titleKey}
              className="rounded-2xl border border-[#e9eaeb] bg-white p-6 shadow-[0px_1px_3px_rgba(10,13,18,0.06)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[rgba(0,132,255,0.08)] text-[#024bff]">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="font-display text-lg font-bold text-[#181d27]">
                {t(titleKey)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#535862]">
                {t(bodyKey)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
