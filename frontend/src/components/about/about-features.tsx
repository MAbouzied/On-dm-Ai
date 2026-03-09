import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MessageCircle, Zap, BarChart3 } from "lucide-react";

interface FeatureItem {
  text: string;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  items: FeatureItem[];
  imageColor: string;
  imageUrl?: string;
  reverse?: boolean;
}

function FeatureSection({
  icon,
  title,
  description,
  items,
  imageColor,
  imageUrl,
  reverse = false,
}: FeatureProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-center gap-16 ${reverse ? "md:flex-row-reverse" : ""}`}
    >
      {/* Content */}
      <div className="flex-1 max-w-[550px]">
        <div className="px-8">
          {/* Icon */}
          <div className="w-12 h-12 rounded-full bg-[#F4EBFF] flex items-center justify-center mb-5">
            {icon}
          </div>

          {/* Title & Description */}
          <h3 className="font-poppins font-semibold text-[1.875rem] leading-[2.375rem] text-[#181D27] mb-4">
            {title}
          </h3>
          <p className="font-poppins text-lg leading-7 text-[#535862] mb-8">
            {description}
          </p>

          {/* Check Items */}
          <ul className="space-y-5 pl-4">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-[#F9F5FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    width="13"
                    height="10"
                    viewBox="0 0 13 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 5L5 9L12 1"
                      stroke="#7F56D9"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className="font-poppins text-lg leading-7 text-[#535862]">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Image Placeholder or Image */}
      <div
        className="flex-1 w-full h-[560px] rounded-2xl relative overflow-hidden"
        style={{ backgroundColor: imageColor }}
      >
        {imageUrl ? (
          <Image src={imageUrl} alt="" fill className="object-cover" />
        ) : null}
      </div>
    </div>
  );
}

export async function AboutFeatures({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = await getTranslations("about");
  const heading = locale === "ar" ? (config["about.features.headingAr"] ?? t("features.heading")) : (config["about.features.headingEn"] ?? t("features.heading"));
  const subheading = locale === "ar" ? (config["about.features.subheadingAr"] ?? t("features.subheading")) : (config["about.features.subheadingEn"] ?? t("features.subheading"));
  const getItem = (base: string, suffix: string) =>
    locale === "ar" ? (config[`${base}Ar`] ?? t(suffix)) : (config[`${base}En`] ?? t(suffix));

  const f1Title = getItem("about.features.feature1.title", "features.feature1.title");
  const f1Desc = getItem("about.features.feature1.description", "features.feature1.description");
  const f1Item1 = getItem("about.features.feature1.item1", "features.feature1.item1");
  const f1Item2 = getItem("about.features.feature1.item2", "features.feature1.item2");
  const f1Item3 = getItem("about.features.feature1.item3", "features.feature1.item3");

  const f2Title = getItem("about.features.feature2.title", "features.feature2.title");
  const f2Desc = getItem("about.features.feature2.description", "features.feature2.description");
  const f2Item1 = getItem("about.features.feature2.item1", "features.feature2.item1");
  const f2Item2 = getItem("about.features.feature2.item2", "features.feature2.item2");
  const f2Item3 = getItem("about.features.feature2.item3", "features.feature2.item3");

  const f3Title = getItem("about.features.feature3.title", "features.feature3.title");
  const f3Desc = getItem("about.features.feature3.description", "features.feature3.description");
  const f3Item1 = getItem("about.features.feature3.item1", "features.feature3.item1");
  const f3Item2 = getItem("about.features.feature3.item2", "features.feature3.item2");
  const f3Item3 = getItem("about.features.feature3.item3", "features.feature3.item3");

  const features = [
    {
      icon: <MessageCircle className="w-6 h-6 text-[#7F56D9]" />,
      title: f1Title,
      description: f1Desc,
      items: [{ text: f1Item1 }, { text: f1Item2 }, { text: f1Item3 }],
      imageColor: "#F5E6FE",
      imageUrl: config["about.features.feature1.imageUrl"] || undefined,
      reverse: false,
    },
    {
      icon: <Zap className="w-6 h-6 text-[#7F56D9]" />,
      title: f2Title,
      description: f2Desc,
      items: [{ text: f2Item1 }, { text: f2Item2 }, { text: f2Item3 }],
      imageColor: "#DDEAC8",
      imageUrl: config["about.features.feature2.imageUrl"] || undefined,
      reverse: true,
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#7F56D9]" />,
      title: f3Title,
      description: f3Desc,
      items: [{ text: f3Item1 }, { text: f3Item2 }, { text: f3Item3 }],
      imageColor: "#F8EACD",
      imageUrl: config["about.features.feature3.imageUrl"] || undefined,
      reverse: false,
    },
  ];

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-[1228px] mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-['Wix_Madefor_Display'] font-semibold text-[3rem] leading-[2.75rem] tracking-[-0.03rem] text-[#181D27] mb-5">
            {heading}
          </h2>
          <p className="font-poppins text-xl leading-[1.875rem] text-[#535862] max-w-[768px] mx-auto">
            {subheading}
          </p>
        </div>

        {/* Features */}
        <div className="space-y-24">
          {features.map((feature, index) => (
            <FeatureSection key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
