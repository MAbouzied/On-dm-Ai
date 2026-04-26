import Image from "next/image";
import { getTranslations } from "next-intl/server";
import type { SuccessPartnerPublic } from "@/lib/api";
import { API_URL } from "@/lib/api";

function resolveLogoSrc(logoUrl: string): string {
  if (!logoUrl) return "";
  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) return logoUrl;
  if (logoUrl.startsWith("/")) {
    if (logoUrl.startsWith("/uploads/")) {
      const base = API_URL.replace(/\/$/, "");
      return `${base}${logoUrl}`;
    }
    return logoUrl;
  }
  const base = API_URL.replace(/\/$/, "");
  return `${base}/${logoUrl}`;
}

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
  const loop = list.length > 0 ? [...list, ...list] : [];

  const logoSlide = (p: SuccessPartnerPublic, i: number) => {
    const src = resolveLogoSrc(p.logoUrl);
    const alt = p.label?.trim() || "Partner logo";
    const inner = (
      <div className="relative h-14 w-32 md:h-16 md:w-40 shrink-0 flex items-center justify-center px-2">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 128px, 160px"
          unoptimized={src.includes(".svg")}
        />
      </div>
    );
    return p.websiteUrl ? (
      <a
        key={`${p.id}-${i}`}
        href={p.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 opacity-80 hover:opacity-100 transition-opacity"
      >
        {inner}
      </a>
    ) : (
      <div key={`${p.id}-${i}`} className="shrink-0">
        {inner}
      </div>
    );
  };

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

      {loop.length > 0 ? (
        <div className="w-full max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex w-max flex-nowrap items-center gap-10 md:gap-16 animate-clients-marquee hover:[animation-play-state:paused]">
            {loop.map((p, i) => logoSlide(p, i))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
