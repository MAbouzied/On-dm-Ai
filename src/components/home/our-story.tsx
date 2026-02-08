"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import Badge from "../ui/Badge";

export function OurStory() {
  const t = useTranslations("ourStory");
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
        <Badge>{t("badge")}</Badge>
      </div>

      {/* Main Text */}
      <div
        className="text-lg md:text-4xl leading-relaxed md:leading-tight font-normal mb-8 max-w-5xl"
        ref={targetRef}
      >
        <h3 className="text-black inline">{t("mainTextPart1")} </h3>
        <h3
          className={`transition-colors duration-500 inline ${
            currentVisiblePercent > 40 ? "text-black " : "text-gray-400"
          }`}
        >
          {t("mainTextPart2")}
        </h3>
        <h3
          className={`transition-colors duration-500 inline ${
            currentVisiblePercent > 80 ? "text-black " : "text-gray-400"
          }`}
        >
          {t("mainTextPart3")}
        </h3>
      </div>
      {/* Tagline */}
      <p className="text-[#535862] text-[16px] md:text-xl mb-16 poppins-font">
        {t("tagline")}
      </p>

      {/* Stats */}
      <div className="w-full grid grid-cols-1 px-9 md:grid-cols-3 gap-8 md:gap-12">
        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200 first:border-0 first:pl-0">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {t("stats.years.value")}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {t("stats.years.label")}
          </span>
        </div>

        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {t("stats.employees.value")}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {t("stats.employees.label")}
          </span>
        </div>

        <div className="flex flex-col gap-2 md:border-l md:pl-8 border-gray-200">
          <span className="text-5xl md:text-6xl font-bold text-[#00CFCF] wix-font">
            {t("stats.products.value")}
          </span>
          <span className="text-gray-900 font-medium text-lg">
            {t("stats.products.label")}
          </span>
        </div>
      </div>
    </section>
  );
}
