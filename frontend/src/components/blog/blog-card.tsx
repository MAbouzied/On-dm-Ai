import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import { TagList } from "@/components/ui";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  excerpt: string;
  author?: string;
  date: string;
  tags: string[];
  imageColor: string;
  imageUrl?: string;
  layout?: "vertical" | "horizontal";
  href?: string;
}

export function BlogCard({
  title,
  excerpt,
  author,
  date,
  tags,
  imageColor,
  imageUrl,
  layout = "vertical",
  href = "/blog/post-slug",
}: BlogCardProps) {
  const isVertical = layout === "vertical";

  return (
    <LocalizedLink 
      href={href}
      className={cn(
        "group flex gap-4 p-4 bg-white rounded-xl transition-shadow hover:shadow-md border border-gray-100 h-full",
        isVertical ? "flex-col" : "flex-col sm:flex-row"
      )}
    >
      {/* Image or Placeholder */}
      <div 
        className={cn(
          "w-full rounded-lg overflow-hidden relative",
          isVertical ? "aspect-4/3" : "sm:w-1/2 aspect-4/3 sm:aspect-auto"
        )}
        style={{ backgroundColor: imageColor }}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            unoptimized
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col gap-3">
          <div className="text-xs font-semibold text-[#00A99D]">
            {author ? `${author} • ` : ""}{date}
          </div>

          <div className="flex justify-between items-start gap-3">
            <h3 className="text-xl font-bold text-black group-hover:text-gray-700 transition-colors">
              {title}
            </h3>
            <ArrowUpRight className="w-5 h-5 text-black shrink-0 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>

          <p className="text-sm text-gray-500 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>

        <TagList tags={tags} className="mt-4" />
      </div>
    </LocalizedLink>
  );
}
