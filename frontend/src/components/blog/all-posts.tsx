"use client";

import { useEffect, useState } from "react";
import { BlogCard } from "./blog-card";
import { ArrowLeft, ArrowRight } from "lucide-react";
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

export function AllPosts() {
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

  return (
    <section className="w-full py-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col gap-8 items-center">
        <h2 className="text-2xl font-bold text-black">All blog posts</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} layout="vertical" {...toCardProps(post)} />
        ))}
      </div>
    </section>
  );
}
