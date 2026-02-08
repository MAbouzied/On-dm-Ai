"use client";

import { useTranslations } from "next-intl";
import { LocalizedLink } from "./localized-link";
import {
  Facebook,
  Instagram,
  Twitter,
  ChevronUp,
  ArrowUpRight,
} from "lucide-react";
import { FOOTER_LINKS, SOCIAL_LINKS } from "@/lib/constants";
import Button from "./ui/Button";
import ArrowUp from "@/icons/ArrowUp";

export function Footer() {
  const t = useTranslations("footer");
  const tCta = useTranslations("cta");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (icon: string) => {
    switch (icon) {
      case "facebook":
        return <Facebook className="w-4 h-4 text-black" />;
      case "instagram":
        return <Instagram className="w-4 h-4 text-black" />;
      case "twitter":
        return <Twitter className="w-4 h-4 text-black" />;
      default:
        return null;
    }
  };

  return (
    <footer className="w-full flex flex-col relative">
      {/* Band 1: CTA Section (Black) */}
      <div className="w-full bg-black text-white py-24 px-4 md:px-8 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl leading-tight">
          {tCta("title")}
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl">
          {tCta("description")}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <LocalizedLink
            href="/whatsapp"
            className="flex items-center gap-2 bg-[#A8E5E0] text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8FDbd6] transition-colors w-full sm:w-auto justify-center"
          >
            {tCta("whatsapp")}
            <ArrowUpRight className="w-5 h-5" />
          </LocalizedLink>

          <LocalizedLink
            href="/call"
            className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
          >
            {tCta("callUs")}
            <ArrowUpRight className="w-5 h-5" />
          </LocalizedLink>

          <LocalizedLink
            href="/book-meeting"
            className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
          >
            {tCta("bookMeeting")}
            <ArrowUpRight className="w-5 h-5" />
          </LocalizedLink>
        </div>
      </div>

      {/* Band 2: Contact Info (White) */}
      <div className="w-full py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4 max-w-md">
            <span className="text-gray-600 font-medium">
              {t("contactInfo.label")}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              {t("contactInfo.title")}
            </h2>
            <p className="text-gray-500 mt-4 max-w-sm">
              {t("newsletter.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {t("contactInfo.emailLabel")}
              </span>
              <a
                href="mailto:help@info.com"
                className="text-black font-semibold hover:text-gray-600 transition-colors"
              >
                help@info.com
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {t("contactInfo.phoneLabel")}
              </span>
              <a
                href="tel:+80899834256"
                className="text-black font-semibold hover:text-gray-600 transition-colors"
              >
                (808) 998-34256
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {t("contactInfo.locationLabel")}
              </span>
              <p className="text-black font-semibold max-w-50">
                {t("contactInfo.address1")}
              </p>
              <p className="text-black font-semibold max-w-50">
                {t("contactInfo.address2")}
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-gray-500 text-sm">
                {t("contactInfo.followUsLabel")}
              </span>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    aria-label={social.name}
                  >
                    {getSocialIcon(social.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Band 3: Newsletter (White) */}

      <div className=" bg-white py-20 px-4 md:px-8 relative">
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="text-xl font-bold text-black">
                {t("newsletter.title")}
              </h3>
              <p className="text-gray-500">{t("newsletter.description")}</p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  className="px-6 py-3 rounded-full border border-gray-200 w-full sm:w-80 focus:outline-none focus:border-black transition-colors"
                />
                <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  {t("newsletter.subscribe")}
                </button>
              </div>
              <p className="text-gray-400 text-xs underline cursor-pointer">
                {t("newsletter.privacy")}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll to top button positioned absolutely */}
        <div
          className="hidden md:block absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 border-[#303030] border-[6px] size-24 bg-white rounded-full"
          title="Scroll to top"
        >
          <Button
            onClick={scrollToTop}
            className="p-0! bg-transparent! hover:bg-gray-50 transition-colors z-10 flex items-center justify-center w-full h-full"
            aria-label="Scroll to top"
          >
            <ArrowUp />
          </Button>
        </div>
      </div>

      {/* Band 4: Bottom Footer (Black) */}
      <div className="w-full bg-[#1A1A1A] text-white pt-20 pb-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-6">
            <span className="text-2xl font-bold tracking-tighter">ON DM</span>

            <nav className="flex flex-wrap justify-center gap-6 md:gap-8">
              {FOOTER_LINKS.map((link) => (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {t(`nav.${link.labelKey}`)}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          <div className="w-full h-px bg-white/10 mt-8" />

          <div className="text-sm text-white">
            {t.rich("copyright", {
              span: (chunks) => <span className="font-bold">{chunks}</span>,
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
