'use client';

import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';

export function LatestWork() {
  return (
    <section className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-xl font-medium text-gray-900">Latest work</h2>
        <Link
          href="/work"
          className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
        >
          View all work
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[32px] bg-[#B388FF]">
        <Image
          src="/syntho.png"
          alt="Syntho Project"
          fill
          className="object-cover"
        />
      </div>
    </section>
  );
}
