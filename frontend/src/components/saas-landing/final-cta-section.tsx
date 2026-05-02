import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type Props = { locale: string };

export async function FinalCtaSection({ locale }: Props) {
  const t = await getTranslations("lmsPlatform.finalCta");
  const secondaryHref = locale === "ar" ? "/contact" : "#features";

  return (
    <section
      id="book-demo"
      className="border-b border-[#e9eaeb] bg-[#fff2e0] py-3 md:py-4"
    >
      {/* Figma: container-max-width-desktop 1280px + container-padding-desktop 32px */}
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-8">
        <div className="w-full rounded-[var(--radius-4xl,24px)] border border-[#e9eaeb]/80 bg-[linear-gradient(163.7deg,#ffdfd0_0%,#f2f3ff_100%)] py-6 text-center shadow-[0px_8px_32px_-12px_rgba(0,80,203,0.12)] md:py-7">
          <div className="mx-auto max-w-[768px] px-5 md:px-8">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-[#181d27] md:text-4xl md:leading-[44px] md:tracking-[-0.02em]">
              {t("title")}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#252b37] md:mt-4 md:text-xl md:leading-[30px]">
              {t("body")}
            </p>
            <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:justify-center md:mt-6 md:gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#0244e6] px-8 py-3 text-base font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition hover:bg-[#0238c4] md:px-10 md:py-3.5"
              >
                {t("primaryCta")}
              </Link>
              {secondaryHref === "/contact" ? (
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-[#d5d7da] bg-white px-8 py-3 text-base font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition hover:bg-[#fafafa] md:px-10 md:py-3.5"
                >
                  {t("secondaryCta")}
                </Link>
              ) : (
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-full border border-[#d5d7da] bg-white px-8 py-3 text-base font-semibold text-[#414651] shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition hover:bg-[#fafafa] md:px-10 md:py-3.5"
                >
                  {t("secondaryCta")}
                </a>
              )}
            </div>
            {t("contactHint").trim() !== "" && (
              <p className="mt-4 text-sm leading-snug text-[#535862] md:mt-5">
                {t("contactHint")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
