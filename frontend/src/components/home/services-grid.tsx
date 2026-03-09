import DesignTool from "@/icons/DesignTool";
import ServiceMonitor from "@/icons/Monitor";
import Phone from "@/icons/Phone";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPublicServices } from "@/lib/api";
import { LocalizedLink } from "@/components/localized-link";

const SLUG_CONFIG: Record<
  string,
  { icon: LucideIcon; roundedCorner: string; colSpan?: number; textColor?: string; iconColor?: string }
> = {
  "digital-marketing": {
    icon: DesignTool,
    roundedCorner: "rounded-tl-4 rounded-tr-[100px] rounded-br-[32px] rounded-bl-[32px]",
  },
  "social-media": { icon: DesignTool, roundedCorner: "rounded-bl-[5rem]" },
  "ux-design": { icon: DesignTool, roundedCorner: "rounded-bl-[5rem]", colSpan: 2 },
  "web-development": { icon: ServiceMonitor, roundedCorner: "rounded-tr-[5rem]" },
  "app-development": { icon: Phone, roundedCorner: "rounded-tl-[5rem]" },
  "it-business": {
    icon: DesignTool,
    roundedCorner: "rounded-br-[5rem]",
    colSpan: 2,
    textColor: "text-white",
    iconColor: "text-white",
  },
  branding: { icon: DesignTool, roundedCorner: "rounded-bl-[5rem]" },
};

export async function ServicesGrid({ locale = "en" }: { locale?: string }) {
  let services: Array<{ id: string; slug: string; titleEn: string; titleAr: string; backgroundColor: string; isDark?: boolean }> = [];
  try {
    services = await getPublicServices();
  } catch {
    // API unavailable during build - use empty
  }

  return (
    <section className="w-full pb-20 mx-auto container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {services.map((service: { id: string; slug: string; titleEn: string; titleAr: string; backgroundColor: string; isDark?: boolean }) => {
          const config = SLUG_CONFIG[service.slug] || {
            icon: DesignTool,
            roundedCorner: "rounded-3xl",
          };
          const Icon = config.icon;
          return (
            <div
              key={service.id}
              className={cn(config.colSpan === 2 && "md:col-span-2")}
              style={
                {
                  "--bg-color": service.backgroundColor,
                } as React.CSSProperties
              }
            >
              <LocalizedLink href={`/services/${service.slug}`} className="block h-full">
                <div
                  className={cn(
                    "relative p-14 rounded-3xl h-52.5 gap-0.75 lg:h-145.75 flex flex-col justify-center lg:gap-8 group border border-transparent hover:border-black hover:bg-white transition-all duration-200 bg-(--bg-color)",
                    config.roundedCorner
                  )}
                >
                <div
                  className={cn(
                    "absolute -z-1 inset-0 rounded-3xl translate-0 group-hover:translate-3 opacity-0 group-hover:opacity-100 transition-all ease-linear duration-200 pointer-events-none",
                    config.roundedCorner
                  )}
                  style={{
                    backgroundColor: service.backgroundColor,
                  }}
                />
                <div className="stroke-white">
                  <Icon
                    className={cn(
                      "group-hover:text-black transition-colors duration-100",
                      config.iconColor || (service.isDark ? "text-white" : "")
                    )}
                    strokeWidth={1.5}
                    stroke="white"
                  />
                </div>
                <h2
                  className={cn(
                    "text-[32px] font-semibold leading-tight relative z-10 group-hover:text-black transition-colors duration-100",
                    config.textColor || (service.isDark ? "text-white" : "text-gray-900")
                  )}
                >
                  {locale === "ar" ? service.titleAr : service.titleEn}
                </h2>
              </div>
              </LocalizedLink>
            </div>
          );
        })}
      </div>
    </section>
  );
}
