const variants = {
  B1: "font-normal text-[32px] leading-[140%] tracking-[0em]",
  B2: "font-medium text-[28px] leading-[140%] tracking-[-4%]",
  B3: "font-normal text-[24px] leading-[140%] tracking-[0em]",
  B4: "font-medium  text-[10px] md:text-[20px] leading-[140%] tracking-[0em]",
  B4R: "font-normal text-[20px] leading-[140%] tracking-[0em]",
  B5: "font-normal text-[18px] leading-[140%] tracking-[0em]",
};

export type TextProps = React.HTMLAttributes<HTMLParagraphElement> & {
  variant: keyof typeof variants;
  children: React.ReactNode;
};

export function Text({
  variant = "B1",
  children,
  className,
  ...props
}: TextProps) {
  return (
    <p className={`${variants[variant]} ${className || ""} `} {...props}>
      {children}
    </p>
  );
}

export function Span({
  variant = "B1",
  className,
  children,
  ...props
}: TextProps) {
  return (
    <span className={`${variants[variant]} ${className || ""}`} {...props}>
      {children}
    </span>
  );
}
