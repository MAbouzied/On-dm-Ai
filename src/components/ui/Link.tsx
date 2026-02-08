import Link from "next/link";
import React from "react";
import { BorderType, ButtonBaseStyle, buttonVariants } from "./Button";
import { cn } from "@/lib/utils";

export type LinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof buttonVariants;
  borderType?: keyof typeof BorderType;
};

export function LinkComponent({
  href,
  variant = "primary",
  className,
  borderType = "None",
  children,
  ...props
}: LinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        ButtonBaseStyle,
        buttonVariants[variant],
        BorderType[borderType],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
