import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  centered?: boolean;
}

/**
 * Reusable section header with optional badge, title, and description
 * Reduces duplication across multiple section components
 */
export function SectionHeader({
  badge,
  title,
  description,
  className,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex flex-col", centered && "items-center text-center", className)}>
      {badge && (
        <div className="mb-6">
          <span className="px-6 py-2 rounded-full border border-gray-200 text-sm font-medium uppercase tracking-wider text-gray-600">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">{title}</h2>

      {description && (
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
