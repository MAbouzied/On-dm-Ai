import { notFound } from "next/navigation";
import { WorkPostHero } from "@/components/work/work-post-hero";
import { WorkPostContent, WorkContentBlock } from "@/components/work/work-post-content";
import { LatestWork } from "@/components/work/latest-work";
import { getPublicProject, getPublicProjects } from "@/lib/api";
import { API_URL } from "@/lib/api";
import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

function parseTags(tagsStr: string | null | undefined): Array<{ label: string; color: "yellow" | "outline" }> {
  if (!tagsStr) return [];
  try {
    const parsed = JSON.parse(tagsStr) as Array<{ label?: string; color?: string }>;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((t) => t && typeof t.label === "string")
      .map((t) => ({
        label: t.label!,
        color: (t.color === "yellow" ? "yellow" : "outline") as "yellow" | "outline",
      }));
  } catch {
    return [];
  }
}

function resolveImageUrls(
  imageUrl: string | null | undefined,
  imageUrls: string | string[] | null | undefined
): string[] {
  if (imageUrls) {
    const urls = Array.isArray(imageUrls)
      ? imageUrls
      : (() => {
          try {
            return JSON.parse(imageUrls || "[]") || [];
          } catch {
            return [];
          }
        })();
    if (Array.isArray(urls) && urls.length > 0) {
      const base = API_URL.replace(/\/$/, "");
      return urls.map((p) =>
        p.startsWith("http") ? p : p.startsWith("/") ? `${base}${p}` : `${base}/${p}`
      );
    }
  }
  if (imageUrl) {
    const base = API_URL.replace(/\/$/, "");
    const path = imageUrl.startsWith("http") ? imageUrl : imageUrl.startsWith("/") ? `${base}${imageUrl}` : `${base}/${imageUrl}`;
    return [path];
  }
  return [];
}

function htmlToContentBlocks(contentEn: string, contentAr: string, locale: string): WorkContentBlock[] {
  const html = locale === "ar" ? contentAr : contentEn;
  if (!html || !html.trim()) return [];
  return [{ type: "paragraph", content: html }];
}

export default async function WorkDetailsPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = await getPublicProject(slug);
  if (!project) notFound();

  const title = locale === "ar" ? project.titleAr : project.titleEn;
  const description = locale === "ar" ? project.descriptionAr : project.descriptionEn;
  const date = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
  const tags = parseTags(project.tags);
  let images = resolveImageUrls(project.imageUrl, project.imageUrls);
  if (images.length === 0) {
    images = ["https://placehold.co/800x600/e5e7eb/9ca3af?text=Project"];
  }
  const content = htmlToContentBlocks(
    project.contentEn ?? "",
    project.contentAr ?? "",
    locale
  );

  const allProjects = await getPublicProjects();
  const otherProjects = allProjects.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main className="min-h-screen bg-white pt-24">
      <WorkPostHero
        date={date}
        title={title}
        description={description}
        tags={tags}
        images={images}
      />
      <WorkPostContent blocks={content} />
      <LatestWork projects={otherProjects} locale={locale} />
    </main>
  );
}
