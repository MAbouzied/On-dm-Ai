import { getTagColor } from "@/lib/constants";
import { blogTagDisplayLabel } from "@/lib/blog-tag-labels";
import { cn } from "@/lib/utils";

const COLOR_VARIANTS: Record<string, string> = {
  purple: "bg-[#F3E5F5] text-[#9C27B0]",
  orange: "bg-[#FFF8E1] text-[#FF8F00]",
  blue: "bg-[#E1F5FE] text-[#0288D1]",
  yellow: "bg-[#FFE082] text-[#000000]", // Match the "Application" tag style
  green: "bg-[#E8F5E9] text-[#2E7D32]", // Match "Web development" tag
  outline: "bg-white border border-gray-200 text-gray-600", // Match the other tags
};

interface TagProps {
  tag?: string;
  children?: React.ReactNode;
  color?: "purple" | "orange" | "blue" | "yellow" | "green" | "outline" | string;
  className?: string;
}

/**
 * Reusable tag component with consistent color mapping
 */
export function Tag({ tag, children, color, className }: TagProps) {
  const content = children || tag;
  
  // Determine color classes:
  // 1. If explicit color prop matches a variant, use that
  // 2. If tag prop is provided, use getTagColor lookup
  // 3. Fallback to default via getTagColor
  let colorClasses = "";
  
  if (color && COLOR_VARIANTS[color]) {
    colorClasses = COLOR_VARIANTS[color];
  } else if (tag) {
    colorClasses = getTagColor(tag);
  } else {
    colorClasses = getTagColor("default");
  }

  return (
    <span className={cn("px-3 py-1 rounded-full text-sm font-medium", colorClasses, className)}>
      {content}
    </span>
  );
}

interface TagListProps {
  tags: string[];
  className?: string;
  /** When `ar`, tag text uses Arabic labels; English keys stay for colors. */
  locale?: string;
}

/**
 * Reusable tag list component
 */
export function TagList({ tags, className, locale = "en" }: TagListProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, index) => (
        <Tag key={index} tag={tag}>
          {blogTagDisplayLabel(tag, locale)}
        </Tag>
      ))}
    </div>
  );
}
