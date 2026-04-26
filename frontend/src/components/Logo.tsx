import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="ON DM"
      width={1602}
      height={392}
      className="h-8 w-auto object-contain"
      priority
    />
  );
}
