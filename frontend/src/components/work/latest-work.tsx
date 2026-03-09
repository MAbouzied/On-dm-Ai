'use client';

import { Link } from '@/i18n/navigation';
import { ArrowUpRight } from 'lucide-react';
import { WorkCard } from './work-card';
import { API_URL } from '@/lib/api';

type ProjectTag = { label: string; color: 'purple' | 'orange' | 'blue' };

function parseTags(tagsStr: string | null | undefined): ProjectTag[] {
  if (!tagsStr) return [];
  try {
    const parsed = JSON.parse(tagsStr) as Array<{ label?: string; color?: string }>;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.label === 'string')
      .map((t) => ({
        label: t.label!,
        color: (t.color === 'purple' || t.color === 'orange' || t.color === 'blue'
          ? t.color
          : 'purple') as ProjectTag['color'],
      }));
  } catch {
    return [];
  }
}

function resolveImageUrl(
  imageUrl: string | null | undefined,
  imageUrls: string | string[] | null | undefined
): string {
  let path = '';
  if (imageUrls) {
    const urls = Array.isArray(imageUrls)
      ? imageUrls
      : (() => {
          try {
            return JSON.parse(imageUrls || '[]') || [];
          } catch {
            return [];
          }
        })();
    path = Array.isArray(urls) && urls[0] ? urls[0] : '';
  }
  if (!path && imageUrl) path = imageUrl;
  if (!path) return 'https://placehold.co/800x600/e5e7eb/9ca3af?text=Project';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  const base = API_URL.replace(/\/$/, '');
  return path.startsWith('/') ? `${base}${path}` : `${base}/${path}`;
}

interface ApiProject {
  id: string;
  slug: string;
  type: string;
  category?: string | null;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl?: string | null;
  imageUrls?: string | string[] | null;
  tags: string;
  liveUrl?: string | null;
}

interface LatestWorkProps {
  projects: ApiProject[];
  locale: string;
}

export function LatestWork({ projects, locale }: LatestWorkProps) {
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

      {projects.length === 0 ? (
        <div className="rounded-[32px] border-2 border-dashed border-gray-200 bg-gray-50 py-16 text-center">
          <p className="text-gray-500">No other projects yet.</p>
          <Link
            href="/work"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:underline"
          >
            View all work
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const title = locale === 'ar' ? project.titleAr : project.titleEn;
            const description =
              locale === 'ar' ? project.descriptionAr : project.descriptionEn;
            return (
              <WorkCard
                key={project.id}
                title={title}
                category={project.category ?? ''}
                description={description}
                image={resolveImageUrl(project.imageUrl, project.imageUrls)}
                tags={parseTags(project.tags)}
                slug={project.slug}
                liveUrl={project.liveUrl ?? undefined}
                showImage={false}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}
