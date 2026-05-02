"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Whatsapp from "@/icons/Whatsapp";
import { useSiteConfig } from "@/lib/site-config-context";
import apiClient from "@/lib/api-client";

export function LmsStickyCta() {
  const t = useTranslations("lmsPlatform.stickyCta");
  const siteConfig = useSiteConfig();
  const [contactConfig, setContactConfig] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    apiClient
      .get<Record<string, string>>("/api/public/contact-page")
      .then((res) => setContactConfig(res.data))
      .catch(() => {});
  }, []);

  const whatsappUrl =
    siteConfig["cta.whatsappHref"] ||
    contactConfig["contact.whatsappUrl"] ||
    "https://wa.me/201234567890";

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-30 flex justify-center px-6 md:bottom-8 md:px-8">
      <div className="pointer-events-auto hidden h-[109px] w-full max-w-[713px] items-center justify-between gap-6 rounded-full border border-white/40 bg-white/70 px-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-md md:flex md:px-11">
        <p className="text-pretty text-center font-medium text-[#181d27] md:text-start">
          {t("prompt")}
        </p>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex max-w-fit shrink-0 items-center gap-2 rounded-full bg-[#0244e6] px-5 py-3 text-sm font-semibold text-white shadow-[0px_1px_2px_rgba(10,13,18,0.08)] transition hover:bg-[#0238c4]"
        >
          <span>{t("whatsapp")}</span>
          <span className="flex items-center gap-1">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/30">
              <Image
                src="/user1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </span>
            <span className="relative flex h-12 w-12 -translate-x-1/4 items-center justify-center rounded-full bg-white">
              <Whatsapp />
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
