import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function AboutTestimonial({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = await getTranslations("about");
  const quote = locale === "ar" ? (config["about.testimonial.quoteAr"] ?? t("testimonial.quote")) : (config["about.testimonial.quoteEn"] ?? t("testimonial.quote"));
  const name = locale === "ar" ? (config["about.testimonial.nameAr"] ?? t("testimonial.name")) : (config["about.testimonial.nameEn"] ?? t("testimonial.name"));
  const role = locale === "ar" ? (config["about.testimonial.roleAr"] ?? t("testimonial.role")) : (config["about.testimonial.roleEn"] ?? t("testimonial.role"));

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col items-center">
          {/* Company Logo */}
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/logo.svg"
              alt="ON DM"
              width={1602}
              height={392}
              className="h-10 md:h-12 w-auto max-w-[min(100%,280px)] object-contain"
            />
          </div>

          {/* Quote */}
          <blockquote className="font-['Wix_Madefor_Display'] font-semibold text-[2.25rem] leading-[3.5rem] tracking-[-0.0225rem] text-[#181D27] text-center max-w-[968px] mb-8">
            {quote}
          </blockquote>

          {/* Avatar and Attribution */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-[158px] h-[158px] rounded-full border-[2.469px] border-[rgba(0,0,0,0.08)] overflow-hidden">
              <Image
                src={config["about.testimonial.avatarUrl"] || "/about/testimonial-avatar.png"}
                alt={name}
                fill
                sizes="158px"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col items-center font-poppins">
              <p className="font-semibold text-lg leading-7 text-[#181D27]">
                {name}
              </p>
              <p className="text-base leading-6 text-[#535862]">
                {role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
