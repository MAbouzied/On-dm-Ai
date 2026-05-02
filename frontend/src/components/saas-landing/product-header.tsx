"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const NAV_ANCHORS = [
  { key: "platform" as const, hash: "#platform" },
  { key: "features" as const, hash: "#features" },
  { key: "faq" as const, hash: "#faq" },
  { key: "bookDemo" as const, hash: "#book-demo" },
];

export function ProductHeader() {
  const t = useTranslations("lmsPlatform.nav");
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9eaeb] bg-[#fff2e0]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between gap-4 px-6 md:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.svg"
            alt="ON DM"
            width={1602}
            height={392}
            className="h-7 w-auto object-contain md:h-8"
            priority
          />
          <span className="hidden font-display text-sm font-semibold text-[#181d27] sm:inline md:text-base">
            {t("productName")}
          </span>
        </Link>

        <nav
          aria-label={t("ariaMain")}
          className="hidden items-center gap-6 md:flex"
        >
          {NAV_ANCHORS.map(({ key, hash }) => (
            <a
              key={key}
              href={hash}
              className="text-sm font-medium text-[#414651] transition hover:text-[#181d27]"
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#book-demo"
            className="hidden rounded-full bg-[#0244e6] px-4 py-2.5 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)] transition hover:bg-[#0238c4] md:inline-flex"
          >
            {t("bookDemo")}
          </a>

          <button
            type="button"
            className="inline-flex rounded-lg p-2 text-[#414651] md:hidden"
            aria-expanded={open}
            aria-controls="lms-mobile-nav"
            aria-label={open ? t("ariaCloseMenu") : t("ariaOpenMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <X className="h-6 w-6" aria-hidden />
            ) : (
              <Menu className="h-6 w-6" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <div
        id="lms-mobile-nav"
        className={cn(
          "border-t border-[#e9eaeb] bg-[#fff2e0] px-6 py-4 md:hidden",
          open ? "block" : "hidden"
        )}
      >
        <nav className="flex flex-col gap-3" aria-label={t("ariaMobile")}>
          {NAV_ANCHORS.map(({ key, hash }) => (
            <a
              key={key}
              href={hash}
              className="text-base font-medium text-[#181d27]"
              onClick={() => setOpen(false)}
            >
              {t(key)}
            </a>
          ))}
          <a
            href="#book-demo"
            className="mt-2 inline-flex w-full justify-center rounded-full bg-[#0244e6] px-4 py-3 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.05)] hover:bg-[#0238c4]"
            onClick={() => setOpen(false)}
          >
            {t("bookDemo")}
          </a>
        </nav>
      </div>
    </header>
  );
}
