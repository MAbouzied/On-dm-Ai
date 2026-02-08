import { ArrowUpRight } from "lucide-react";
import { LocalizedLink } from "@/components/localized-link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-[#A8E5E0] text-black hover:bg-[#8FDbd6]",
  secondary: "bg-black text-white hover:bg-gray-800",
  outline: "bg-transparent border border-white/20 text-white hover:bg-white/10",
  ghost: "bg-white border border-gray-300 text-black hover:bg-gray-50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

interface CTAButtonProps extends Omit<ComponentProps<typeof LocalizedLink>, "className"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  showArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

/**
 * Reusable CTA button component with consistent styling
 * Supports multiple variants and sizes
 */
export function CTAButton({
  variant = "primary",
  size = "md",
  showArrow = true,
  className,
  children,
  ...props
}: CTAButtonProps) {
  return (
    <LocalizedLink
      className={cn(
        "flex items-center justify-center gap-2 rounded-full font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
      {showArrow && <ArrowUpRight className="w-5 h-5" />}
    </LocalizedLink>
  );
}
