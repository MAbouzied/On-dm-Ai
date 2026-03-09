import { useTranslations } from "next-intl";
import Image from "next/image";
import { CLIENTS, type Client } from "@/lib/constants";

export function ClientsSection({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = useTranslations("clients");
  let clients: Client[] = CLIENTS;
  try {
    if (config["clients"]) {
      clients = JSON.parse(config["clients"]) as Client[];
    }
  } catch {
    // Use default
  }

  const badge = locale === "ar" ? (config["clients.badgeAr"] ?? t("badge")) : (config["clients.badgeEn"] ?? t("badge"));
  const title = locale === "ar" ? (config["clients.titleAr"] ?? t("title")) : (config["clients.titleEn"] ?? t("title"));
  const description = locale === "ar" ? (config["clients.descriptionAr"] ?? t("description")) : (config["clients.descriptionEn"] ?? t("description"));

  return (
    <section className="w-full py-20 px-4 md:px-8 max-w-6xl mx-auto text-center flex flex-col items-center">
      <div className="mb-6">
        <span className="px-6 py-2 rounded-full border border-gray-200 text-sm font-medium uppercase tracking-wider text-gray-600">
          {badge}
        </span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
        {title}
      </h2>
      
      <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
        {description}
      </p>
      
      <div className="w-full flex flex-nowrap justify-center items-center gap-6 md:gap-12">
        {clients.map((client, index) => {
          const content = (
            <>
              <div className="relative w-20 h-20 md:w-28 md:h-28 shrink-0">
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl md:text-2xl font-semibold text-gray-600 group-hover:text-black transition-colors">
                {client.name}
              </span>
            </>
          );
          return client.url ? (
            <a
              key={index}
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group shrink-0"
            >
              {content}
            </a>
          ) : (
            <div key={index} className="flex items-center gap-3 group shrink-0">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
