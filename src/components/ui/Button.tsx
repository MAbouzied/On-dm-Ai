// Primary button interaction:
// hover:
// While hovering
// Change to: "Hover";
// Animate: Smart animate;
// animation-timing-function: cubic-bezier(0.7, -0.4, 0.4, 1.4);
// animation-duration: 400ms;

export const buttonVariants = {
  primary: "bg-primary",
  light: "bg-white text-black border-black",
  dark: "bg-black text-white",
  cyan: "bg-[#C3FFFF]",
};

export const ButtonBaseStyle =
  "relative  cursor-pointer z-10 flex items-center justify-center gap-2 whitespace-nowrap hover:font-medium transition-all duration-300 font-medium text-lg leading-tight tracking-normal py-2.5 px-14 rounded-[39px] h-[72px] text-center text-black shadow-[0px_1px_2px_0px_#0A0D120D] border border-transparent";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  BorderType?: keyof typeof BorderType;
  children: React.ReactNode;
};

export const BorderType = {
  None: "border-transparent",
  full: "border border-black",
  rotating: "border-gradient border-transparent",
};

export default function Button({
  variant = "primary",
  BorderType = "None",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${ButtonBaseStyle} ${buttonVariants[variant]} ${
        className || ""
      } ${BorderType[BorderType]}`}
      {...props}
    >
      {children}
    </button>
  );
}
