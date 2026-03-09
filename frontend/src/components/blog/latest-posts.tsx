"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { CTAButton } from "@/components/ui/cta-button";
import { useTranslations, useLocale } from "next-intl";
import apiClient from "@/lib/api-client";

interface ApiPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  imageColor: string;
  tags: string;
  publishedAt: string | null;
}

interface LatestPostsProps {
  excludeSlug?: string;
}

export function LatestPosts({ excludeSlug }: LatestPostsProps) {
  const t = useTranslations("blog");
  const locale = useLocale();
  const [posts, setPosts] = useState<ApiPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<ApiPost[]>("/api/public/blog")
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const toCardProps = (p: ApiPost) => ({
    title: locale === "ar" ? p.titleAr : p.titleEn,
    excerpt: locale === "ar" ? p.excerptAr : p.excerptEn,
    author: "",
    date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString() : "",
    tags: (() => {
      try {
        return JSON.parse(p.tags) as string[];
      } catch {
        return [];
      }
    })(),
    imageColor: p.imageColor,
    href: `/blog/${p.slug}`,
  });

  if (loading || posts.length === 0) return null;

  const filtered = excludeSlug
    ? posts.filter((p) => p.slug !== excludeSlug)
    : posts;
  const displayPosts = filtered.slice(0, 3);

  if (displayPosts.length === 0) return null;

  return (
    <section className="w-full py-8 md:py-12 px-4 md:px-8 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl font-bold text-black">Latest blog posts</h2>
        <CTAButton href="/blog" variant="secondary" showArrow>
          View all posts
        </CTAButton>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          <BlogCard layout="vertical" {...toCardProps(displayPosts[0])} />
        </div>
        <div className="flex flex-col gap-6">
          {displayPosts[1] && <BlogCard layout="horizontal" {...toCardProps(displayPosts[1])} />}
          {displayPosts[2] && <BlogCard layout="horizontal" {...toCardProps(displayPosts[2])} />}
        </div>
      </div>
    </section>
  );
}
