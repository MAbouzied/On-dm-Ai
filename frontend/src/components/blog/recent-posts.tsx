"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import apiClient from "@/lib/api-client";
import { useLocale } from "next-intl";

interface ApiPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  imageUrl?: string;
  imageUrls?: string[];
  imageColor: string;
  tags: string;
  publishedAt: string | null;
}

export function RecentPosts() {
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
    imageUrl: p.imageUrls?.[0] ?? p.imageUrl ?? undefined,
    href: `/blog/${p.slug}`,
  });

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (posts.length === 0) return null;

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-black mb-8">Recent blog posts</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="w-full">
          <BlogCard layout="vertical" {...toCardProps(posts[0])} />
        </div>
        <div className="flex flex-col gap-8">
          {posts[1] && <BlogCard layout="horizontal" {...toCardProps(posts[1])} />}
          {posts[2] && <BlogCard layout="horizontal" {...toCardProps(posts[2])} />}
        </div>
      </div>
    </section>
  );
}
