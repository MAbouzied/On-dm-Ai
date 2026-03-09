"use client";

import { ArrowUpRight } from "lucide-react";
// import { Whatsapp } from "@/icons/Whatsapp";
import Button from "../ui/Button";
import { LinkComponent } from "../ui/Link";
import { ContactMap } from "./contact-map";

interface ContactHeroProps {
  title: string;
  description: string;
  whatsappText: string;
  callText: string;
  meetingText: string;
  whatsappUrl?: string;
  phoneNumber?: string;
  meetingUrl?: string;
  mapLatitude?: string;
  mapLongitude?: string;
  mapZoom?: string;
  mapMarkerLatitude?: string;
  mapMarkerLongitude?: string;
  loadingText?: string;
}

export function ContactHero({
  title,
  description,
  whatsappText,
  callText,
  meetingText,
  whatsappUrl,
  phoneNumber,
  meetingUrl,
  mapLatitude,
  mapLongitude,
  mapZoom,
  mapMarkerLatitude,
  mapMarkerLongitude,
  loadingText,
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
                href={whatsappUrl || "#"}
                variant="primary"
                borderType="full"
                className="w-full max-w-xs rounded-full flex items-center justify-center gap-2"
              >
                {whatsappText} <ArrowUpRight />
              </LinkComponent>

              <LinkComponent
                href={phoneNumber ? `tel:${phoneNumber.replace(/\s/g, "")}` : "#"}
                variant="light"
                borderType="full"
                className="w-full max-w-xs rounded-full flex items-center justify-center gap-2"
              >
                {callText} <ArrowUpRight />
              </LinkComponent>

              <LinkComponent
                href={meetingUrl || "#"}
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

      {/* Map Section */}
      <section className="relative w-full overflow-hidden">
        <ContactMap
          centerLat={mapLatitude}
          centerLng={mapLongitude}
          zoom={mapZoom}
          markerLat={mapMarkerLatitude}
          markerLng={mapMarkerLongitude}
          loadingText={loadingText}
        />
      </section>
    </>
  );
}
