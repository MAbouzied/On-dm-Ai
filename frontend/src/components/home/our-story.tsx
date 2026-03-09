"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Badge from "../ui/Badge";

export function OurStory({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = useTranslations("ourStory");
  const mainTextEn = config["ourStory.mainTextEn"] || t("mainTextPart1") + " " + t("mainTextPart2") + " " + t("mainTextPart3");
  const mainTextAr = config["ourStory.mainTextAr"] || mainTextEn;
  const mainText = locale === "ar" ? mainTextAr : mainTextEn;
  const badge = locale === "ar" ? (config["ourStory.badgeAr"] ?? t("badge")) : (config["ourStory.badgeEn"] ?? t("badge"));
  const tagline = locale === "ar" ? (config["ourStory.taglineAr"] ?? t("tagline")) : (config["ourStory.taglineEn"] ?? t("tagline"));
  const yearsVal = config["ourStory.stats.years"] || t("stats.years.value");
  const yearsLabel = locale === "ar" ? (config["ourStory.stats.years.labelAr"] ?? t("stats.years.label")) : (config["ourStory.stats.years.labelEn"] ?? t("stats.years.label"));
  const employeesVal = config["ourStory.stats.employees"] || t("stats.employees.value");
  const employeesLabel = locale === "ar" ? (config["ourStory.stats.employees.labelAr"] ?? t("stats.employees.label")) : (config["ourStory.stats.employees.labelEn"] ?? t("stats.employees.label"));
  const productsVal = config["ourStory.stats.products"] || t("stats.products.value");
  const productsLabel = locale === "ar" ? (config["ourStory.stats.products.labelAr"] ?? t("stats.products.label")) : (config["ourStory.stats.products.labelEn"] ?? t("stats.products.label"));
  const targetRef = useRef(null);

  const [isOurStoryViewed, setIsOurStoryViewed] = useState(false);
  const [currentVisiblePercent, setCurrentVisiblePercent] = useState(0);

  useEffect(() => {
    if (isOurStoryViewed) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const percentVisible = entry.intersectionRatio * 100;
        setCurrentVisiblePercent(percentVisible);

        if (percentVisible === 100) {
          setIsOurStoryViewed(true);
          observer.disconnect();
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
        rootMargin: "0px 0px -300px 0px",
      }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => observer.disconnect();
  }, [isOurStoryViewed]);

  return (
    <section className="py-20 px-4 md:px-8">
      {/* Badge */}
      <div className="md:text-center mb-8">
        <Badge>{badge}</Badge>
      </div>

      {/* Main Text */}
      <div
        className="text-lg md:text-4xl leading-relaxed md:leading-tight font-normal mb-8 max-w-5xl"
        ref={targetRef}
      >
        <h3 className="text-black inline">{mainText}</h3>
      </div>
      {/* Tagline */}
      <p className="text-[#535862] text-[16px] md:text-xl mb-16 poppins-font">
        {tagline}
      </p>

      {/* Stats */}
      <div className="w-full grid grid-cols-1 px-9 md:grid-cols-3 gap-8 md:gap-12">
        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200 first:border-0 first:pl-0">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {yearsVal}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {yearsLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {employeesVal}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {employeesLabel}
          </span>
        </div>

        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {productsVal}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {productsLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
