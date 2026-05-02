"use client";

import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { LocalizedLink } from "./localized-link";
import apiClient from "@/lib/api-client";
import {
  Facebook,
  Instagram,
  Youtube,
  ArrowUpRight,
} from "lucide-react";
import { FOOTER_LEGAL_LINKS, FOOTER_LINKS, SOCIAL_LINKS, type SocialLink, type SocialIconId } from "@/lib/constants";
import { SnapchatBrandIcon, TikTokBrandIcon, XBrandIcon } from "@/components/social-brand-icons";
import Button from "./ui/Button";
import ArrowUp from "@/icons/ArrowUp";
import { useSiteConfig, getConfigEnAr } from "@/lib/site-config-context";

const FOOTER_SOCIAL_FIELDS: { configKey: string; name: string; icon: SocialIconId }[] = [
  { configKey: "footer.social.facebook", name: "Facebook", icon: "facebook" },
  { configKey: "footer.social.tiktok", name: "TikTok", icon: "tiktok" },
  { configKey: "footer.social.snapchat", name: "Snapchat", icon: "snapchat" },
  { configKey: "footer.social.instagram", name: "Instagram", icon: "instagram" },
  { configKey: "footer.social.youtube", name: "YouTube", icon: "youtube" },
  { configKey: "footer.social.x", name: "X", icon: "x" },
];

function parseLegacySocialJson(raw: string | undefined): SocialLink[] | null {
  if (!raw?.trim()) return null;
  try {
    const parsed = JSON.parse(raw) as Array<{ name: string; href: string; icon: string }>;
    if (!Array.isArray(parsed) || parsed.length === 0) return null;
    return parsed.map((s) => {
      const icon = (s.icon === "twitter" ? "x" : s.icon) as SocialIconId;
      return {
        name: s.icon === "twitter" ? "X" : s.name,
        href: s.href,
        icon,
      };
    });
  } catch {
    return null;
  }
}

function resolveFooterSocialLinks(
  siteConfig: Record<string, string>,
  contactConfig: Record<string, string>
): SocialLink[] {
  const structured: SocialLink[] = [];
  for (const row of FOOTER_SOCIAL_FIELDS) {
    const href = (siteConfig[row.configKey] ?? "").trim();
    if (href) structured.push({ name: row.name, href, icon: row.icon });
  }
  if (structured.length > 0) return structured;
  return (
    parseLegacySocialJson(siteConfig["footer.socialLinks"]) ??
    parseLegacySocialJson(contactConfig["contact.socialLinks"]) ??
    SOCIAL_LINKS
  );
}

export function Footer() {
  const t = useTranslations("footer");
  const tCta = useTranslations("cta");
  const locale = useLocale();
  const siteConfig = useSiteConfig();
  const [contactConfig, setContactConfig] = useState<Record<string, string>>({});

  useEffect(() => {
    apiClient
      .get<Record<string, string>>("/api/public/contact-page")
      .then((res) => setContactConfig(res.data))
      .catch(() => {});
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getSocialIcon = (icon: SocialIconId) => {
    const cls = "w-4 h-4 text-black shrink-0";
    switch (icon) {
      case "facebook":
        return <Facebook className={cls} />;
      case "instagram":
        return <Instagram className={cls} />;
      case "youtube":
        return <Youtube className={cls} />;
      case "tiktok":
        return <TikTokBrandIcon className={cls} />;
      case "snapchat":
        return <SnapchatBrandIcon className={cls} />;
      case "x":
      case "twitter":
        return <XBrandIcon className={cls} />;
      default:
        return null;
    }
  };

  const socialShow = siteConfig["footer.social.show"] !== "false";
  const socialLinks = resolveFooterSocialLinks(siteConfig, contactConfig);

  const ctaTitle = getConfigEnAr(siteConfig, "cta.title", locale, tCta("title"));
  const ctaDescription = getConfigEnAr(siteConfig, "cta.description", locale, tCta("description"));
  const ctaWhatsapp = getConfigEnAr(siteConfig, "cta.whatsapp", locale, tCta("whatsapp"));
  const ctaCallUs = getConfigEnAr(siteConfig, "cta.callUs", locale, tCta("callUs"));
  const ctaBookMeeting = getConfigEnAr(siteConfig, "cta.bookMeeting", locale, tCta("bookMeeting"));
  const ctaWhatsappHref = siteConfig["cta.whatsappHref"] || contactConfig["contact.whatsappUrl"] || "https://wa.me/201234567890";
  const ctaCallHref = siteConfig["cta.callHref"] || (contactConfig["contact.phoneNumber"] ? `tel:${contactConfig["contact.phoneNumber"].replace(/\s/g, "")}` : "tel:201234567890");
  const ctaMeetingHref = siteConfig["cta.meetingHref"] || contactConfig["contact.meetingUrl"] || "https://calendly.com";

  const contactLabel = getConfigEnAr(siteConfig, "footer.contactInfo.label", locale, t("contactInfo.label"));
  const contactTitle = getConfigEnAr(siteConfig, "footer.contactInfo.title", locale, t("contactInfo.title"));
  const emailLabel = getConfigEnAr(siteConfig, "footer.contactInfo.emailLabel", locale, t("contactInfo.emailLabel"));
  const phoneLabel = getConfigEnAr(siteConfig, "footer.contactInfo.phoneLabel", locale, t("contactInfo.phoneLabel"));
  const locationLabel = getConfigEnAr(siteConfig, "footer.contactInfo.locationLabel", locale, t("contactInfo.locationLabel"));
  const followUsLabel = getConfigEnAr(siteConfig, "footer.contactInfo.followUsLabel", locale, t("contactInfo.followUsLabel"));
  const newsletterTitle = getConfigEnAr(siteConfig, "footer.newsletter.title", locale, t("newsletter.title"));
  const newsletterDescription = getConfigEnAr(siteConfig, "footer.newsletter.description", locale, t("newsletter.description"));
  const newsletterPlaceholder = getConfigEnAr(siteConfig, "footer.newsletter.placeholder", locale, t("newsletter.placeholder"));
  const newsletterSubscribe = getConfigEnAr(siteConfig, "footer.newsletter.subscribe", locale, t("newsletter.subscribe"));
  const newsletterPrivacy = getConfigEnAr(siteConfig, "footer.newsletter.privacy", locale, t("newsletter.privacy"));
  const copyright = siteConfig["footer.copyright"] ?? null;

  const getFooterNavLabel = (labelKey: string) =>
    getConfigEnAr(siteConfig, `footer.nav.${labelKey}`, locale, t(`nav.${labelKey}`));

  return (
    <footer className="w-full flex flex-col relative">
      {/* Band 1: CTA Section (Black) */}
      <div className="w-full bg-black text-white py-24 px-4 md:px-8 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl leading-tight">
          {ctaTitle}
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl">
          {ctaDescription}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <a
            href={ctaWhatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#A8E5E0] text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8FDbd6] transition-colors w-full sm:w-auto justify-center"
          >
            {ctaWhatsapp}
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a
            href={ctaCallHref}
            className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
          >
            {ctaCallUs}
            <ArrowUpRight className="w-5 h-5" />
          </a>
          <a
            href={ctaMeetingHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
          >
            {ctaBookMeeting}
            <ArrowUpRight className="w-5 h-5" />
          </a>
        </div>
      </div>

      {/* Band 2: Contact Info (White) */}
      <div className="w-full py-20 px-4 md:px-8 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="flex flex-col gap-4 max-w-md">
            <span className="text-gray-600 font-medium">
              {contactLabel}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              {contactTitle}
            </h2>
            <p className="text-gray-500 mt-4 max-w-sm">
              {newsletterDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-5">
            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {emailLabel}
              </span>
              <a
                href={`mailto:${contactConfig["contact.email"] || "help@info.com"}`}
                className="text-black font-semibold hover:text-gray-600 transition-colors"
              >
                {contactConfig["contact.email"] || "help@info.com"}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {phoneLabel}
              </span>
              <a
                href={`tel:${(contactConfig["contact.phoneNumber"] || "80899834256").replace(/\s/g, "")}`}
                dir="ltr"
                className="block w-full text-right text-black font-semibold hover:text-gray-600 transition-colors"
              >
                {contactConfig["contact.phoneNumber"] || "(808) 998-34256"}
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-gray-500 text-sm">
                {locationLabel}
              </span>
              <p className="text-black font-semibold max-w-50">
                {t("contactInfo.address")}
              </p>
            </div>

            {socialShow && socialLinks.length > 0 ? (
              <div className="flex flex-col gap-4">
                <span className="text-gray-500 text-sm">
                  {followUsLabel}
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  {socialLinks.map((social) => {
                    const href = social.href || "#";
                    const external = /^https?:\/\//i.test(href);
                    return (
                      <a
                        key={`${social.icon}-${href}`}
                        href={href}
                        {...(external
                          ? { target: "_blank" as const, rel: "noopener noreferrer" }
                          : {})}
                        className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        aria-label={social.name}
                      >
                        {getSocialIcon(social.icon)}
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {/* Band 3: Newsletter (White) */}

      <div className=" bg-white py-20 px-4 md:px-8 relative">
        <div className="container mx-auto ">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
            <div className="flex flex-col gap-2 max-w-md">
              <h3 className="text-xl font-bold text-black">
                {newsletterTitle}
              </h3>
              <p className="text-gray-500">{newsletterDescription}</p>
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder={newsletterPlaceholder}
                  className="px-6 py-3 rounded-full border border-gray-200 w-full sm:w-80 focus:outline-none focus:border-black transition-colors"
                />
                <button className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors">
                  {newsletterSubscribe}
                </button>
              </div>
              <p className="text-gray-400 text-xs underline cursor-pointer">
                {newsletterPrivacy}
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
                  {getFooterNavLabel(link.labelKey)}
                </LocalizedLink>
              ))}
            </nav>

            <nav
              aria-label={locale === "ar" ? "قانوني" : "Legal"}
              className="flex flex-wrap justify-center gap-4 md:gap-6"
            >
              {FOOTER_LEGAL_LINKS.map((link) => (
                <LocalizedLink
                  key={link.href}
                  href={link.href}
                  className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {getFooterNavLabel(link.labelKey)}
                </LocalizedLink>
              ))}
            </nav>
          </div>

          <div className="w-full h-px bg-white/10 mt-8" />

          <div className="text-sm text-white">
            {copyright ? (
              <span dangerouslySetInnerHTML={{ __html: copyright.replace(/<span>/g, '<span class="font-bold">') }} />
            ) : (
              t.rich("copyright", {
                span: (chunks) => <span className="font-bold">{chunks}</span>,
              })
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
