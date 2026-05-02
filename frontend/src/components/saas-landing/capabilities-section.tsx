import { getTranslations } from "next-intl/server";
import {
  BarChart2,
  BookOpen,
  CreditCard,
  Globe2,
  Shield,
  Users,
} from "lucide-react";

const CARD_ICONS = [
  BookOpen,
  CreditCard,
  Shield,
  Users,
  Globe2,
  BarChart2,
];

export async function CapabilitiesSection() {
  const t = await getTranslations("lmsPlatform.capabilities");

  const keys = [
    "multiFormat",
    "saudiPayment",
    "nelc",
    "cohort",
    "arabicFirst",
    "analytics",
  ] as const;

  return (
    <section
      id="features"
      className="relative overflow-hidden border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(2,68,230,0.06)_0%,transparent_45%)]"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-[1280px]">
        <h2 className="font-display text-center text-3xl font-bold text-[#181d27] md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#535862] md:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((key, i) => {
            const Icon = CARD_ICONS[i]!;
            return (
              <article
                key={key}
                className="flex flex-col rounded-2xl border border-[#e9eaeb] bg-white p-6 shadow-[0px_1px_2px_rgba(10,13,18,0.06)] ring-1 ring-black/[0.03]"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#e9eaeb] bg-[#fafafa] text-[#024bff] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-lg font-bold text-[#181d27]">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#535862]">
                  {t(`${key}.body`)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
