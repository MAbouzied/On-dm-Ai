import { useTranslations } from "next-intl";
import Image from "next/image";
import { CLIENTS } from "@/lib/constants";

export function ClientsSection() {
  const t = useTranslations("clients");

  return (
    <section className="w-full py-20 px-4 md:px-8 max-w-6xl mx-auto text-center flex flex-col items-center">
      <div className="mb-6">
        <span className="px-6 py-2 rounded-full border border-gray-200 text-sm font-medium uppercase tracking-wider text-gray-600">
          {t("badge")}
        </span>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight">
        {t("title")}
      </h2>
      
      <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-3xl leading-relaxed">
        {t("description")}
      </p>
      
      <div className="w-full flex flex-wrap justify-center items-center gap-8 md:gap-16">
        {CLIENTS.map((client, index) => (
          <div key={index} className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 md:w-10 md:h-10">
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
          </div>
        ))}
      </div>
    </section>
  );
}
