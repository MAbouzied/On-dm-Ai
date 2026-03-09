"use client";

import { useEffect, useState } from "react";
import { Span, Text } from "../ui/Text";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Whatsapp from "@/icons/Whatsapp";
import { useSiteConfig } from "@/lib/site-config-context";
import apiClient from "@/lib/api-client";

// TODO:: detect the blog section and reduce the opactty of the div when in view

export default function StickySection() {
  const t = useTranslations("hero");
  const siteConfig = useSiteConfig();
  const [contactConfig, setContactConfig] = useState<Record<string, string>>({});

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
    <>
      {/* Bottom Card */}
      <div className="hidden md:flex justify-between items-center sticky top-[90%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/57  py-6 px-11.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] h-[109px] w-[713px]  z-20">
        <Text variant="B3" className="text-black poppins-font">
          {t("discoveryChat")}
        </Text>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-fit !px-4 flex items-center gap-2"
        >
          <Span variant="B4R">{t("whatsappUs")}</Span>
          <span className="sm:hidden">WhatsApp</span>
          <div className="flex items-center gap-1">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/user1.svg"
                alt="Support"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center relative -translate-x-1/3">
              <Whatsapp />
            </div>
          </div>
        </a>
      </div>
    </>
  );
}
