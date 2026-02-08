import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function AboutTestimonial() {
  const t = await getTranslations("about");

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1280px] mx-auto px-8">
        <div className="flex flex-col items-center">
          {/* Company Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="relative w-[30px] h-[31px]">
              <Image
                src="/logo-icon.svg"
                alt="ON DM Logo Icon"
                width={30}
                height={31}
                className="object-contain"
              />
            </div>
            <div className="relative w-[65px] h-[16px]">
              <Image
                src="/logo-text.svg"
                alt="ON DM Logo Text"
                width={65}
                height={16}
                className="object-contain"
              />
            </div>
          </div>

          {/* Quote */}
          <blockquote className="font-['Wix_Madefor_Display'] font-semibold text-[2.25rem] leading-[3.5rem] tracking-[-0.0225rem] text-[#181D27] text-center max-w-[968px] mb-8">
            {t("testimonial.quote")}
          </blockquote>

          {/* Avatar and Attribution */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-[158px] h-[158px] rounded-full border-[2.469px] border-[rgba(0,0,0,0.08)] overflow-hidden">
              <Image
                src="/team/ceo-avatar.jpg"
                alt={t("testimonial.name")}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col items-center font-poppins">
              <p className="font-semibold text-lg leading-7 text-[#181D27]">
                {t("testimonial.name")}
              </p>
              <p className="text-base leading-6 text-[#535862]">
                {t("testimonial.role")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
