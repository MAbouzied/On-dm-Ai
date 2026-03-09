import { useTranslations } from "next-intl";
import { LocalizedLink } from "../localized-link";
import { ArrowUpRight } from "lucide-react";

export function CtaSection() {
  const t = useTranslations("cta");

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-black text-white text-center flex flex-col items-center">
      <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight max-w-4xl leading-tight">
        {t("title")}
      </h2>
      
      <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl">
        {t("description")}
      </p>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <LocalizedLink
          href="/whatsapp"
          className="flex items-center gap-2 bg-[#A8E5E0] text-black px-8 py-4 rounded-full text-lg font-medium hover:bg-[#8FDbd6] transition-colors w-full sm:w-auto justify-center"
        >
          {t("whatsapp")}
          <ArrowUpRight className="w-5 h-5" />
        </LocalizedLink>
        
        <LocalizedLink
          href="/call"
          className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
        >
          {t("callUs")}
        </LocalizedLink>

        <LocalizedLink
          href="/book-meeting"
          className="flex items-center gap-2 bg-transparent border border-white/20 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
        >
          {t("bookMeeting")}
        </LocalizedLink>
      </div>
    </section>
  );
}
