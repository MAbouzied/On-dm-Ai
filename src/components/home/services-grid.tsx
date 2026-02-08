import { useTranslations } from "next-intl";
import { SERVICES_GRID } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function ServicesGrid() {
  const t = useTranslations("services");

  return (
    <section className="w-full pb-20 mx-auto container">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {SERVICES_GRID.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className={cn(service.colSpan === 2 && "md:col-span-2")}
              style={
                {
                  "--bg-color": service.bgColor,
                } as React.CSSProperties
              }
            >
              <div
                className={cn(
                  "relative p-14 rounded-3xl h-52.5 gap-0.75 lg:h-145.75 flex flex-col justify-center lg:gap-8 group border border-transparent hover:border-black hover:bg-white transition-all duration-200 bg-(--bg-color)",
                  service.roundedCorner
                )}
              >
                <div
                  className={cn(
                    "absolute -z-1 inset-0 rounded-3xl translate-0 group-hover:translate-3 opacity-0 group-hover:opacity-100 transition-all ease-linear duration-200 pointer-events-none",
                    service.roundedCorner
                  )}
                  style={{
                    backgroundColor: service.bgColor,
                  }}
                />
                <div className={`stroke-white`}>
                  <Icon
                    className={cn(
                      "group-hover:text-black transition-colors duration-100",
                      service?.iconColor
                    )}
                    strokeWidth={1.5}
                    stroke="white"
                  />
                </div>
                <h2
                  className={cn(
                    "text-[32px] font-semibold leading-tight relative z-10 group-hover:text-black transition-colors duration-100",
                    service.textColor || "text-gray-900"
                  )}
                >
                  {t(service.translationKey)}
                </h2>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
