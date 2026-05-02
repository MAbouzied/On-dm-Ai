import { getTranslations } from "next-intl/server";

const ROWS = [
  {
    labelKey: "bar1Label" as const,
    bg: "bg-[#f3e8ff]",
    border: "border-[rgba(255,255,255,0.5)]",
    titleClass: "text-[#581c87]",
    widthClass: "max-w-[min(100%,42rem)]",
  },
  {
    labelKey: "bar2Label" as const,
    bg: "bg-[#e0f2fe]",
    border: "border-[rgba(255,255,255,0.5)]",
    titleClass: "text-[#1e3a8a]",
    widthClass: "max-w-[min(100%,51rem)]",
  },
  {
    labelKey: "bar3Label" as const,
    bg: "bg-[#ffd9a6]",
    border: "border-[rgba(255,255,255,0.5)]",
    titleClass: "text-[#7c2d12]",
    widthClass: "max-w-[min(100%,62.5rem)]",
  },
];

export async function MetricsSection() {
  const t = await getTranslations("lmsPlatform.metrics");

  return (
    <section className="relative overflow-hidden border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-20">
      <div className="relative mx-auto w-full max-w-[1280px]">
        <h2 className="font-display text-center text-3xl font-bold text-[#155dfc] md:text-4xl md:tracking-tight">
          {t("title")}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-[#535862] md:text-lg">
          {t("subtitle")}
        </p>

        <div className="mx-auto mt-14 flex w-full max-w-5xl flex-col items-start gap-0">
          {ROWS.map((row) => (
            <div
              key={row.labelKey}
              className={`relative flex min-h-[96px] w-full items-center rounded-e-[9999px] rounded-s-none border ${row.border} px-6 py-5 shadow-[0px_10px_40px_-12px_rgba(0,80,203,0.08)] md:min-h-[120px] md:px-12 md:py-7 ${row.bg} ${row.widthClass}`}
            >
              <p
                className={`font-display text-xl font-bold leading-snug md:text-2xl ${row.titleClass}`}
              >
                {t(row.labelKey)}
              </p>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-xs text-[#717680]">
          {t("disclaimer")}
        </p>
      </div>
    </section>
  );
}
