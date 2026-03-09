import React from "react";
import { Span } from "./Text";
import { text } from "stream/consumers";

import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className }: BadgeProps) {
  return (
    <div
      className={`md:text-center mb-8  gap-4 flex justify-center items-center capitalize `}
    >
      <div
        className={`border border-[#C5C5C5] max-w-fit rounded-full  py-2 px-4 `}
      >
        <Span
          variant="B5"
          className={`text-gray-600 ${className} whitespace-nowrap`}
        >
          {children}
        </Span>
      </div>
    </div>
  );
}
