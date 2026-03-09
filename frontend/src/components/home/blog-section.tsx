import Image from "next/image";
import { LocalizedLink } from "../localized-link";
import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Badge from "../ui/Badge";
import { Span } from "../ui/Text";
import { getPublicBlog, API_URL } from "@/lib/api";

function resolveBlogImageUrl(
  imageUrl: string | null | undefined,
  imageUrls?: string[] | null
): string | null {
  const raw = imageUrls?.[0] ?? imageUrl ?? null;
  if (!raw) return null;
  if (raw.startsWith("http://") || raw.startsWith("https://")) return raw;
  const base = API_URL.replace(/\/$/, "");
  return raw.startsWith("/") ? `${base}${raw}` : `${base}/${raw}`;
}

export async function BlogSection({
  config = {},
  locale = "en",
}: {
  config?: Record<string, string>;
  locale?: string;
}) {
  const t = await getTranslations("blog");

  const badge = locale === "ar" ? (config["blog.badgeAr"] ?? t("badge")) : (config["blog.badgeEn"] ?? t("badge"));
  const title = locale === "ar" ? (config["blog.titleAr"] ?? t("title")) : (config["blog.titleEn"] ?? t("title"));
  const description = locale === "ar" ? (config["blog.descriptionAr"] ?? t("description")) : (config["blog.descriptionEn"] ?? t("description"));
  const exploreBlog = locale === "ar" ? (config["blog.exploreBlogAr"] ?? t("exploreBlog")) : (config["blog.exploreBlogEn"] ?? t("exploreBlog"));
  const readMore = locale === "ar" ? (config["blog.readMoreAr"] ?? t("readMore")) : (config["blog.readMoreEn"] ?? t("readMore"));
  const exploreBlogHref = config["blog.exploreBlogHref"] || "/blog";

  let posts: Array<{
    id: string;
    slug: string;
    titleEn: string;
    titleAr: string;
    excerptEn: string;
    excerptAr: string;
    imageUrl: string | null;
    imageUrls?: string[];
    imageColor: string;
  }> = [];
  try {
    posts = await getPublicBlog();
  } catch {
    // Fallback to empty
  }

  const displayPosts = posts.slice(0, 2);

  return (
    <section className="container w-full bg-[#F8F8F8] z-20 py-4 px-4 md:px-8  mx-auto flex flex-col items-center">
      <Badge>{t("badge")}</Badge>

      <h2 className="text-4xl md:text-5xl font-bold mb-6 text-black tracking-tight text-center">
        {t("title")}
      </h2>

      <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl leading-relaxed text-center">
        {t("description")}
      </p>

      <LocalizedLink
        href="/blog"
        className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors mb-16"
      >
        {t("exploreBlog")}
      </LocalizedLink>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayPosts.map((post) => (
          <LocalizedLink
            key={post.id}
            href={`/blog/${post.slug}`}
            className="flex flex-col gap-4 group cursor-pointer rounded-2xl border p-6 pb-8 bg-white border-[#EAEAEA]"
          >
            <div
              className="relative w-full h-64 rounded-xl overflow-hidden"
              style={{ backgroundColor: post.imageColor }}
            >
              {resolveBlogImageUrl(post.imageUrl, post.imageUrls) ? (
                <Image
                  src={resolveBlogImageUrl(post.imageUrl, post.imageUrls)!}
                  alt={locale === "ar" ? post.titleAr : post.titleEn}
                  fill
                  unoptimized
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No image
                </div>
              )}
            </div>

            <div className="flex flex-col items-start gap-3 mt-2">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-[#EBF7FF] text-secondary">
                Blog
              </span>

              <h3>
                <Span variant="B2">{locale === "ar" ? post.titleAr : post.titleEn}</Span>
              </h3>

              <p className="text-gray-600 line-clamp-2">
                {locale === "ar" ? post.excerptAr : post.excerptEn}
              </p>

              <div className="flex items-center gap-2 text-gray-900 font-medium mt-2">
                <Span variant="B4" className="text-gray-900 poppins-font">
                  {readMore}
                </Span>
                <ArrowUpRight className="size-6" />
              </div>
            </div>
          </LocalizedLink>
        ))}
      </div>
    </section>
  );
}
