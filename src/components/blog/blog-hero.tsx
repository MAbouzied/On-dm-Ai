"use client";

import { useTranslations } from "next-intl";

export function BlogHero() {
  const t = useTranslations("blogPage");

  return (
    <section className="w-full flex flex-col items-center justify-center text-center py-20 px-4 md:px-8 max-w-4xl mx-auto mt-32">
      <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 text-xs font-medium text-gray-500 mb-8 uppercase tracking-wider bg-white">
        {t("badge")}
      </div>
      
      <h1 className="text-5xl md:text-7xl font-bold text-black mb-8 tracking-tight">
        {t("title")}
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed">
        {t("description")}
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
        <input
          type="email"
          placeholder={t("placeholder")}
          className="w-full px-6 py-3.5 rounded-full border border-gray-200 focus:outline-none focus:border-black transition-colors bg-white"
        />
        <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#A8E5E0] text-black font-medium hover:bg-[#8FDbd6] transition-colors whitespace-nowrap">
          {t("subscribe")}
        </button>
      </div>
    </section>
  );
}
