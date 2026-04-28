import { setRequestLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { BlogPostHero } from "@/components/blog/blog-post-hero";
import { BlogPostContent, ContentBlock } from "@/components/blog/blog-post-content";
import { BlogPostAuthor } from "@/components/blog/blog-post-author";
import { LatestPosts } from "@/components/blog/latest-posts";
import { getPublicBlogPost } from "@/lib/api";
import { blogTagDisplayLabel } from "@/lib/blog-tag-labels";

interface BlogPostPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  const post = await getPublicBlogPost(slug);
  if (!post) notFound();

  const title = locale === "ar" ? post.titleAr : post.titleEn;
  const excerpt = locale === "ar" ? post.excerptAr : post.excerptEn;
  const content = locale === "ar" ? post.contentAr : post.contentEn;

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString()
    : "";

  const tags: { label: string; color: "purple" | "orange" | "blue" }[] = (() => {
    try {
      const arr = JSON.parse(post.tags) as string[];
      const colors: ("purple" | "orange" | "blue")[] = ["purple", "orange", "blue"];
      return arr.map((rawLabel, i) => ({
        label: blogTagDisplayLabel(rawLabel, locale),
        color: colors[i % 3],
      }));
    } catch {
      return [];
    }
  })();

  const contentBlocks: ContentBlock[] = [
    {
      type: "paragraph",
      content,
    },
  ];

  const imageUrls =
    post.imageUrls && Array.isArray(post.imageUrls)
      ? post.imageUrls
      : post.imageUrl
        ? [post.imageUrl]
        : [];

  return (
    <main className="w-full min-h-screen bg-white pt-24">
      <BlogPostHero
        date={dateStr}
        title={title}
        description={excerpt}
        publishedLabel={t("published")}
        imageUrls={imageUrls}
        imageColor={post.imageColor}
      />
      <BlogPostContent
        blocks={contentBlocks}
        dir={locale === "ar" ? "rtl" : "ltr"}
      />
      <BlogPostAuthor
        author={{ name: "ON-DM", role: "" }}
        tags={tags}
      />
      <LatestPosts excludeSlug={slug} />
    </main>
  );
}
