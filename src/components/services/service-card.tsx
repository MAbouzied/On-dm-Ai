import { ArrowUpRight } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import { cn } from "@/lib/utils";
import { LinkComponent } from "../ui/Link";

interface ServiceCardProps {
  category: string;
  title: string;
  description: string;
  tags: string[];
  backgroundColor: string;
  isDark?: boolean;
  pricingHref?: string;
  samplesHref?: string;
}

export function ServiceCard({
  category,
  title,
  description,
  tags,
  backgroundColor,
  isDark = false,
  pricingHref = "/contact",
  samplesHref = "/work",
}: ServiceCardProps) {
  return (
    <div
      className="w-full rounded-4xl p-8 md:p-12 flex flex-col gap-6"
      style={{ backgroundColor }}
    >
      <span
        className={cn(
          "text-sm md:text-base font-medium opacity-80",
          isDark ? "text-gray-200" : "text-gray-700"
        )}
      >
        {category}
      </span>

      <h2
        className={cn(
          "text-3xl md:text-5xl font-bold leading-tight",
          isDark ? "text-white" : "text-black"
        )}
      >
        {title}
      </h2>

      <p
        className={cn(
          "text-lg md:text-xl max-w-3xl leading-relaxed opacity-90",
          isDark ? "text-gray-100" : "text-gray-800"
        )}
      >
        {description}
      </p>

      <div className="flex flex-wrap gap-3 mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm",
              isDark ? "bg-white/20 text-white" : "bg-white/60 text-gray-900"
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4 mt-8">
        <LinkComponent variant="dark" href={pricingHref}>
          Request pricing
          <ArrowUpRight className="w-4 h-4" />
        </LinkComponent>

        <LinkComponent href={samplesHref} variant="light">
          View work samples
          <ArrowUpRight className="w-4 h-4" />
        </LinkComponent>
      </div>
    </div>
  );
}
