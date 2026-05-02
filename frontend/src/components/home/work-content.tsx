import Image from "next/image";
import Button from "../ui/Button";
import { Link } from "@/i18n/navigation";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { API_URL } from "@/lib/api";

/** Per-card defaults when CMS has no images — distinct assets per sticky card */
const FALLBACK_STYLES = [
  {
    badge: "Web and App development",
    bgColor: "bg-white",
    textColor: "text-black",
    top: "top-24 md:top-32",
    shadow: "shadow-[0px_10px_30px_rgba(0,0,0,0.1)]",
    buttonColor: "bg-transparent",
    image: "/work-card-dashboard.png",
  },
  {
    badge: "Social media marketing",
    bgColor: "bg-[#D9F9F9]",
    textColor: "text-black",
    top: "top-28 md:top-36",
    shadow: "",
    buttonColor: "bg-transparent",
    image: "/work-card-collaboration.png",
  },
  {
    badge: "Operation management",
    bgColor: "bg-black",
    textColor: "text-white",
    top: "top-32 md:top-40",
    shadow: "",
    buttonColor: "bg-[#EBF7FF]!",
    image: "/work-card-operations.png",
  },
];

function resolveImageUrl(
  project: { imageUrl?: string | null; imageUrls?: string | string[] | null },
  fallbackStatic: string
): string {
  if (project.imageUrls) {
    const urls = Array.isArray(project.imageUrls)
      ? project.imageUrls
      : (() => {
          try {
            return JSON.parse(project.imageUrls || "[]") || [];
          } catch {
            return [];
          }
        })();
    const path = Array.isArray(urls) && urls[0] ? urls[0] : "";
    if (path) {
      const base = API_URL.replace(/\/$/, "");
      return path.startsWith("http") ? path : path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
    }
  }
  if (project.imageUrl) {
    const base = API_URL.replace(/\/$/, "");
    const path = project.imageUrl;
    return path.startsWith("http") ? path : path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
  }
  return fallbackStatic;
}

interface WorkContentProps {
  projects: Array<{ slug: string; titleEn: string; titleAr: string; descriptionEn?: string; descriptionAr?: string; imageUrl?: string | null; imageUrls?: string | string[] | null }>;
  locale: string;
}

export default async function WorkContent({ projects, locale }: WorkContentProps) {
  const t = await getTranslations("workContent");
  const cards = FALLBACK_STYLES.map((style, i) => {
    const p = projects[i];
    return {
      projectName: p ? (locale === "ar" ? p.titleAr : p.titleEn) : "ABAQ LEARNING",
      badge: p ? (p.descriptionEn || p.descriptionAr || style.badge) : style.badge,
      slug: p?.slug || "",
      image: p ? resolveImageUrl(p, style.image) : style.image,
      ...style,
    };
  });

  return (
    <div className="relative w-full pb-[50px]">
      <div className="container relative flex w-full flex-col gap-10 px-4 md:px-8">
        {cards.map((item, index) => (
          <div
            key={index}
            className={`sticky ${item.top} py-6.5 px-4 md:px-15 flex flex-col gap-10 rounded-[26px] ${item.bgColor} h-68.75 md:h-186.25 overflow-hidden`}
          >
            <div className={`space-y-6 ${item.textColor}`}>
              <Button className={`capitalize text-[15px] leading-6 py-0.5! px-2.5! h-fit! font-light! ${item.buttonColor}`}>
                {item.projectName}
              </Button>
              <div className="flex items-center justify-between">
                <p className={`text-sm md:text-4xl ${item.textColor}`}>{item.badge}</p>
                <Link
                  href={item.slug ? `/work/${item.slug}` : "/work"}
                  className={`shadow-none bg-transparent ${item.textColor} group inline-flex items-center gap-1`}
                >
                  {t("viewFullProject")}
                  <span><ArrowUpRight className="size-6 group-hover:rotate-45 transition-transform duration-150" /></span>
                </Link>
              </div>
            </div>
            <div className={`relative w-full bg-white aspect-video rounded-t-[54px] ${item.shadow}`}>
              <Image
                src={item.image?.startsWith("http") || item.image?.startsWith("/") ? item.image : `/${item.image}`}
                alt={item.projectName}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
