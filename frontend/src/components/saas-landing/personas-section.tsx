import { getTranslations } from "next-intl/server";
import { Check } from "lucide-react";

export async function PersonasSection() {
  const t = await getTranslations("lmsPlatform.personas");

  return (
    <section className="relative overflow-hidden border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-20">
      <div
        className="pointer-events-none absolute -right-24 top-10 h-[380px] w-[380px] rounded-full bg-[rgba(191,219,254,0.45)] blur-[64px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[280px] w-[280px] rounded-full bg-[rgba(2,68,230,0.14)] blur-[56px]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-[1280px]">
        <h2 className="font-display text-center text-3xl font-bold text-[#181d27] md:text-4xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#535862] md:text-lg">
          {t("subtitle")}
        </p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="relative overflow-hidden rounded-2xl border border-[#e9eaeb] bg-white p-8 shadow-[0px_10px_40px_-16px_rgba(0,80,203,0.12)]">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[rgba(219,234,254,0.85)] via-[rgba(255,255,255,0.65)] to-[rgba(255,243,230,0.9)]"
              aria-hidden
            />
            <div className="relative">
              <h3 className="font-display text-xl font-bold text-[#181d27]">
                {t("operationsTitle")}
              </h3>
              <p className="mt-2 text-[#535862]">{t("operationsIntro")}</p>
              <ul className="mt-6 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="flex gap-3 text-[#414651]">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#079455]"
                      aria-hidden
                    />
                    <span>
                      {t(
                        `operationsItem${n}` as
                          | "operationsItem1"
                          | "operationsItem2"
                          | "operationsItem3"
                          | "operationsItem4"
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <article className="relative overflow-hidden rounded-2xl border border-[#e9eaeb] bg-white p-8 shadow-[0px_8px_30px_-12px_rgba(10,13,18,0.08)]">
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#fafafa] via-white to-[#f8fafc]"
              aria-hidden
            />
            <div className="relative">
              <h3 className="font-display text-xl font-bold text-[#181d27]">
                {t("revenueTitle")}
              </h3>
              <p className="mt-2 text-[#535862]">{t("revenueIntro")}</p>
              <ul className="mt-6 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <li key={n} className="flex gap-3 text-[#414651]">
                    <Check
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#079455]"
                      aria-hidden
                    />
                    <span>
                      {t(
                        `revenueItem${n}` as
                          | "revenueItem1"
                          | "revenueItem2"
                          | "revenueItem3"
                          | "revenueItem4"
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
