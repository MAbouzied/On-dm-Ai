import { getTranslations } from "next-intl/server";
import {
  Award,
  BarChart3,
  MessageCircle,
  Zap,
} from "lucide-react";

export async function FeatureLeadSection() {
  const t = await getTranslations("lmsPlatform.featureLead");

  const icons = [Award, BarChart3, MessageCircle, Zap];

  const leadPoints = ["leadPoint1", "leadPoint2", "leadPoint3"] as const;

  return (
    <section className="border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-20">
      <div className="mx-auto grid w-full max-w-[1280px] gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="rounded-2xl border-2 border-[rgba(255,255,255,0.12)] bg-[#0244e6] p-8 text-white shadow-[0px_8px_24px_-8px_rgba(2,68,230,0.35)] md:p-10">
          <h2 className="font-display text-right text-2xl font-bold leading-snug md:text-3xl">
            {t("leadTitle")}
          </h2>
          <ul className="mt-6 list-none space-y-4 text-[15px] leading-relaxed md:text-base">
            {leadPoints.map((key) => (
              <li key={key} className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#ff8b37] shadow-[0_0_0_4px_rgba(255,139,55,0.2)]"
                  aria-hidden
                />
                <span className="text-white/95">{t(key)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col justify-center gap-5">
          {(
            [
              { titleKey: "pillar1Title", descKey: "pillar1Desc" },
              { titleKey: "pillar2Title", descKey: "pillar2Desc" },
              { titleKey: "pillar3Title", descKey: "pillar3Desc" },
              { titleKey: "pillar4Title", descKey: "pillar4Desc" },
            ] as const
          ).map((keys, i) => {
            const Icon = icons[i]!;
            return (
              <div
                key={keys.titleKey}
                className="flex gap-4 rounded-xl border border-[#e9eaeb] bg-white p-4 shadow-[0px_1px_2px_rgba(10,13,18,0.05)]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[rgba(0,132,255,0.08)] text-[#024bff]">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <h3 className="font-semibold text-[#181d27]">
                    {t(keys.titleKey)}
                  </h3>
                  <p className="mt-1 text-sm text-[#535862]">{t(keys.descKey)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
