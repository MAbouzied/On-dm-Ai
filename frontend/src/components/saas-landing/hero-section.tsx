import { getTranslations } from "next-intl/server";
import { Award } from "lucide-react";
import { cn } from "@/lib/utils";

export async function HeroSection({ locale }: { locale: string }) {
  const t = await getTranslations("lmsPlatform.hero");
  const isRtl = locale === "ar";

  return (
    <section
      id="platform"
      className="relative isolate overflow-hidden border-b border-[#e9eaeb] bg-[#fff2e0] px-6 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14"
    >
      {/* Figma-style layered glows + radial washes */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -right-48 top-[-120px] h-[600px] w-[600px] rounded-full bg-[rgba(191,219,254,0.33)] blur-[60px] md:-right-40" />
        <div className="absolute -bottom-28 -left-56 h-[500px] w-[500px] rounded-full bg-[rgba(255,219,208,0.38)] blur-[50px]" />
        <div className="absolute left-1/2 top-1/3 h-[720px] w-[120%] max-w-[1392px] -translate-x-1/2 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgba(179,197,255,0.28)_0%,transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_0%,rgba(255,181,157,0.22)_0%,transparent_52%),radial-gradient(ellipse_65%_55%_at_0%_100%,rgba(255,219,208,0.18)_0%,transparent_55%)]" />
      </div>

      <div className="relative z-[1] mx-auto flex w-full max-w-[1280px] flex-col gap-10 lg:flex-row lg:items-center lg:gap-12">
        <div
          className={cn("flex-1 text-center lg:text-start", isRtl && "lg:text-right")}
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e9eaeb] bg-white px-4 py-2 text-sm font-medium tracking-tight text-[#001849] shadow-[0px_1px_1px_rgba(0,0,0,0.05)]">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[rgba(255,139,55,0.17)] text-[#0067ff]"
              aria-hidden
            >
              <Award className="h-4 w-4" strokeWidth={2} />
            </span>
            {t("badge")}
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-[#181d27] md:text-4xl lg:text-5xl">
            {t("title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-[#535862] md:text-xl lg:mx-0 mx-auto">
            {t("subtitle")}
          </p>
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3 lg:flex-nowrap lg:justify-start">
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.12)] bg-[#0244e6] px-8 py-3.5 text-base font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)] ring-1 ring-black/[0.04] transition hover:bg-[#0238c4]"
            >
              {t("primaryCta")}
            </a>
            <a
              href="#features"
              className="inline-flex items-center justify-center rounded-full border border-[#d5d7da] bg-white px-8 py-3.5 text-base font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition hover:border-[#c4c7cc]"
            >
              {t("secondaryCta")}
            </a>
          </div>
        </div>

        <div className="relative z-[1] flex flex-1 justify-center lg:justify-end">
          <div className="relative w-full max-w-lg rounded-2xl border border-[#e9eaeb] bg-white/95 p-3 shadow-[0px_10px_40px_-12px_rgba(0,80,203,0.12)] backdrop-blur-[2px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gradient-to-br from-[rgba(179,197,255,0.35)] via-white to-[rgba(255,219,208,0.35)]">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(2,68,230,0.06)_0%,transparent_45%)]" />
              <div className="flex h-full flex-col p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <div className="h-2 w-24 rounded bg-[#e9eaeb]" />
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#079455]" />
                    <span className="h-2 w-2 rounded-full bg-[#ef6820]" />
                    <span className="h-2 w-2 rounded-full bg-[#e11d48]" />
                  </div>
                </div>
                <div className="grid flex-1 grid-cols-3 gap-2">
                  <div className="col-span-2 rounded-lg border border-[#e9eaeb] bg-white p-3 shadow-[0px_1px_2px_rgba(10,13,18,0.05)]">
                    <div className="mb-2 h-2 w-20 rounded bg-[#024bff]/25" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded bg-[#e9eaeb]" />
                      <div className="h-2 w-[80%] rounded bg-[#e9eaeb]" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex-1 rounded-lg bg-[rgba(0,132,255,0.08)] p-2" />
                    <div className="flex-1 rounded-lg bg-[#fafafa] p-2" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-14 rounded-lg border border-[#e9eaeb] bg-[#fdfdfd] shadow-[0px_1px_2px_rgba(10,13,18,0.05)]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
