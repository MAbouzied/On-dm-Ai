'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { Tag } from '@/components/ui/tag';

interface WorkPostHeroProps {
  date: string;
  title: string;
  description: string;
  tags: Array<{ label: string; color: 'yellow' | 'outline' }>;
  images: string[];
}

export function WorkPostHero({
  date,
  title,
  description,
  tags,
  images,
}: WorkPostHeroProps) {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Date */}
        <p className="mb-4 text-sm font-medium text-blue-400">
          Published {date}
        </p>

        {/* Title */}
        <h1 className="mb-6 text-4xl font-bold uppercase tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          {title}
        </h1>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 leading-relaxed">
          {description}
        </p>

        {/* Tags */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              color={tag.color}
              className="rounded-full px-6 py-2 text-sm"
            >
              {tag.label}
            </Tag>
          ))}
        </div>
      </div>

      {/* Image Gallery / Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative h-[400px] min-w-[300px] flex-shrink-0 overflow-hidden rounded-[32px] sm:h-[500px] sm:min-w-[400px] md:min-w-[600px]"
              style={{ backgroundColor: index === 0 ? '#F3E5F5' : index === 1 ? '#F5F5DC' : '#F5F5F5' }} // Placeholder colors from screenshot
            >
              {/* Using placeholder colors if image fails or is empty, but Image component is here */}
              {image && (
                <Image
                  src={image}
                  alt={`${title} screenshot ${index + 1}`}
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-8 flex gap-4">
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900">
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
