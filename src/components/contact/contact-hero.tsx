"use client";

import { ArrowUpRight } from "lucide-react";
// import { Whatsapp } from "@/icons/Whatsapp";
import Button from "../ui/Button";
import { LinkComponent } from "../ui/Link";

interface ContactHeroProps {
  title: string;
  description: string;
  whatsappText: string;
  callText: string;
  meetingText: string;
}

export function ContactHero({
  title,
  description,
  whatsappText,
  callText,
  meetingText,
}: ContactHeroProps) {
  return (
    <>
      <section className="pt-24 pb-16 sm:pb-20 lg:pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl md:text-7xl">
              {title}
            </h1>
            <p className="mb-12 text-lg text-gray-600">{description}</p>

            <div className="flex flex-col items-center gap-4">
              <LinkComponent
                href="#"
                variant="primary"
                borderType="full"
                className="w-full max-w-xs rounded-full flex items-center justify-center gap-2"
              >
                {whatsappText} <ArrowUpRight />
              </LinkComponent>

              <LinkComponent
                href="#"
                variant="light"
                borderType="full"
                className="w-full max-w-xs rounded-full flex items-center justify-center gap-2"
              >
                {callText} <ArrowUpRight />
              </LinkComponent>

              <LinkComponent
                href="#"
                variant="light"
                borderType="full"
                className="w-full max-w-xs rounded-full flex items-center justify-center gap-2"
              >
                {meetingText} <ArrowUpRight />
              </LinkComponent>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder Section */}
      <section className="relative w-full h-[400px] sm:h-[500px] lg:h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4 text-6xl text-gray-300">📍</div>
            <p className="text-gray-400 text-lg font-medium">Map Placeholder</p>
          </div>
        </div>
      </section>
    </>
  );
}
