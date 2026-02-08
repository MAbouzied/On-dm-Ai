import { cn } from "@/lib/utils";

interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable badge component for section headers
 * Used across hero sections, service intros, etc.
 */
export function SectionBadge({ children, className }: SectionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block px-6 py-2 rounded-full border border-gray-200 text-sm font-medium uppercase tracking-wider text-gray-600 bg-white",
        className
      )}
    >
      {children}
    </span>
  );
}
