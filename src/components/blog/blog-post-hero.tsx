"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlogPostHeroProps {
  date: string;
  title: string;
  description: string;
  publishedLabel: string;
  images: {
    src?: string;
    color: string;
    aspect: "vertical" | "horizontal";
  }[];
}

export function BlogPostHero({ date, title, description, publishedLabel, images }: BlogPostHeroProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full py-6 md:py-10 px-4 md:px-6 max-w-4xl mx-auto flex flex-col items-center mt-8">
      {/* Header Content */}
      <div className="flex flex-col items-center text-center max-w-xl mx-auto mb-8">
        <span className="text-[#00A99D] font-medium mb-2 text-xs md:text-sm">
          {publishedLabel} {date}
        </span>
        <h1 className="text-2xl md:text-4xl font-bold text-black mb-3 tracking-tight">
          {title}
        </h1>
        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Image Carousel */}
      <div className="w-full relative group">
        <div
          ref={scrollContainerRef}
          className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "shrink-0 rounded-xl snap-center",
                image.aspect === "vertical"
                  ? "w-[180px] md:w-[240px] aspect-[3/4]"
                  : "w-[280px] md:w-[380px] aspect-[4/3] md:aspect-[16/10]"
              )}
              style={{ backgroundColor: image.color }}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => scroll("left")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ArrowRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
}
