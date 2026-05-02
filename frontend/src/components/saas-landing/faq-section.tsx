"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

const FAQ_KEYS = [1, 2, 3, 4, 5] as const;

/** Decorative avatar chips matching Figma pastel placeholders */
function SupportAvatarCluster() {
  return (
    <div
      className="relative mx-auto mb-8 flex h-14 w-[120px] shrink-0 justify-center"
      dir="ltr"
    >
      <span
        className="absolute left-0 top-2 size-12 rounded-full border-[1.5px] border-white bg-[#e3c6d1] shadow-sm ring-1 ring-black/[0.04]"
        aria-hidden
      />
      <span
        className="absolute left-8 top-0 z-[1] size-14 rounded-full border-[1.5px] border-white bg-[#ddc0ce] shadow-sm ring-1 ring-black/[0.04]"
        aria-hidden
      />
      <span
        className="absolute left-[72px] top-2 size-12 rounded-full border-[1.5px] border-white bg-[#c6d0cb] shadow-sm ring-1 ring-black/[0.04]"
        aria-hidden
      />
    </div>
  );
}

export function FaqSection() {
  const t = useTranslations("lmsPlatform.faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="border-b border-[#e9eaeb] bg-[#fff2e0] px-6 py-16 md:px-8 md:py-24"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Heading — display scale like Figma */}
        <div className="mx-auto max-w-[768px] text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-[#181d27] md:text-4xl md:leading-tight">
            {t("title")}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#535862] md:text-xl">
            {t("subtitle")}
          </p>
        </div>

        {/* Two-column: support gradient card | FAQ list */}
        <div className="mt-14 flex flex-col gap-12 lg:mt-16 lg:flex-row lg:items-stretch lg:gap-10 xl:gap-14">
          {/* FAQ first on mobile; desktop: support left, FAQ right */}
          <div className="order-1 min-w-0 flex-1 lg:order-2 lg:max-w-[768px]">
            <div className="rounded-2xl border border-[#e9eaeb] bg-white p-2 shadow-[0px_1px_3px_rgba(10,13,18,0.08)] md:p-3">
              <div className="divide-y divide-[#e9eaeb] px-2 md:px-4">
                {FAQ_KEYS.map((n, i) => {
                  const isOpen = openIndex === i;
                  const q = t(`q${n}` as "q1");
                  const a = t(`a${n}` as "a1");
                  const panelId = `faq-panel-${i}`;
                  const buttonId = `faq-button-${i}`;

                  return (
                    <div key={n} className="py-1">
                      <h3 className="text-base font-semibold leading-snug text-[#181d27] md:text-[17px]">
                        <button
                          id={buttonId}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={panelId}
                          className="flex w-full items-start justify-between gap-4 py-5 text-start md:gap-5 md:py-6"
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                        >
                          <span className="min-w-0 flex-1">{q}</span>
                          <span className="flex shrink-0 items-start pt-0.5">
                            <span className="sr-only">
                              {isOpen ? t("collapse") : t("expand")}
                            </span>
                            {isOpen ? (
                              <MinusCircle
                                className="size-6 text-[#717680]"
                                strokeWidth={1.75}
                                aria-hidden
                              />
                            ) : (
                              <PlusCircle
                                className="size-6 text-[#717680]"
                                strokeWidth={1.75}
                                aria-hidden
                              />
                            )}
                          </span>
                        </button>
                      </h3>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        className={cn(!isOpen && "hidden")}
                      >
                        <p className="pb-5 text-sm leading-relaxed text-[#535862] md:pb-6 md:text-base">
                          {a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Support card — Figma gradient panel */}
          <aside className="order-2 w-full shrink-0 lg:order-1 lg:w-[min(100%,420px)]">
            <div className="relative overflow-hidden rounded-2xl shadow-[0px_12px_40px_-16px_rgba(0,80,203,0.15)]">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(106deg, #c2daf5 0%, #e4e0fa 50%, #ffffff 100%)",
                }}
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -right-20 top-0 size-[360px] rounded-full bg-white/50 blur-[50px]"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute -left-16 bottom-0 size-[280px] rounded-full bg-[#bce4ff]/80 blur-[45px]"
                aria-hidden
              />

              <div className="relative z-[1] flex flex-col items-center px-6 py-12 text-center md:px-8 md:py-14">
                <SupportAvatarCluster />
                <p className="font-display text-lg font-semibold text-[#181d27] md:text-xl">
                  {t("supportTitle")}
                </p>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-[#535862] md:text-[18px] md:leading-7">
                  {t("supportBody")}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full border-2 border-[rgba(255,255,255,0.12)] bg-[#024bff] px-5 py-3 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)] ring-1 ring-black/[0.04] transition hover:bg-[#0238e0]"
                >
                  {t("supportCta")}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
