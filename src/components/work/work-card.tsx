import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { cn } from '@/lib/utils';

interface WorkCardProps {
  title: string;
  category: string;
  description: string;
  image: string;
  tags: Array<{ label: string; color: 'purple' | 'orange' | 'blue' }>;
  slug: string;
  liveUrl?: string;
}

export function WorkCard({
  title,
  category,
  description,
  image,
  tags,
  slug,
  liveUrl,
}: WorkCardProps) {
  return (
    <div className="group flex flex-col gap-6">
      {/* Image Container */}
      <div className="relative h-[300px] w-full overflow-hidden rounded-[32px] bg-gray-100 sm:h-[400px] lg:h-[500px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content Card */}
      <div className="relative rounded-[32px] border-2 border-black bg-white p-8 shadow-[12px_12px_0px_0px_#000] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[8px_8px_0px_0px_#000]">
        {/* Shadow effect decoration if needed, but standard shadow is usually cleaner */}
        
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-4xl font-bold text-gray-900">{title}</h3>
            <p className="mt-1 text-lg font-medium text-gray-600">{category}</p>
          </div>

          <p className="max-w-2xl text-gray-600">
            {description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Tag key={index} color={tag.color}>
                {tag.label}
              </Tag>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href={`/work/${slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800"
            >
              See full project
              <ArrowUpRight className="h-4 w-4" />
            </Link>
            
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50"
              >
                See Live Channels
                <ChevronDown className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
