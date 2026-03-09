"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { LocalizedLink } from "../localized-link";
import { ArrowUpRight } from "lucide-react";

interface ServiceDetailHeroProps {
  category: string;
  title: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  isDark: boolean;
}

export function ServiceDetailHero({
  category,
  title,
  description,
  tags,
  backgroundColor,
  isDark,
}: ServiceDetailHeroProps) {
  const t = useTranslations("serviceCard");
  return (
    <section
      className="w-full rounded-4xl p-8 md:p-12 lg:p-16 flex flex-col gap-6"
      style={{ backgroundColor }}
    >
      <span
        className={cn(
          "text-sm md:text-base font-medium opacity-80",
          isDark ? "text-gray-200" : "text-gray-700"
        )}
      >
        {category}
      </span>

      <h1
        className={cn(
          "text-3xl md:text-5xl lg:text-6xl font-bold leading-tight",
          isDark ? "text-white" : "text-black"
        )}
      >
        {title}
      </h1>

      <p
        className={cn(
          "text-lg md:text-xl max-w-3xl leading-relaxed opacity-90",
          isDark ? "text-gray-100" : "text-gray-800"
        )}
      >
        {description}
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm",
              isDark ? "bg-white/20 text-white" : "bg-white/60 text-gray-900"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <LocalizedLink
          href="/contact"
          className={`inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white hover:bg-gray-800 transition-colors ${isDark ? "text-white" : "text-white"}`}
        >
          {t("requestPricing")}
          <ArrowUpRight className="w-4 h-4" />
        </LocalizedLink>
        <LocalizedLink
          href="/work"
          className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
        >
          {t("viewWorkSamples")}
          <ArrowUpRight className="w-4 h-4" />
        </LocalizedLink>
      </div>
    </section>
  );
}
