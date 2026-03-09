"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import apiClient from "@/lib/api-client";

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function BlogPage() {
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient
      .get<BlogPost[]>("/api/blog")
      .then((res) => setPosts(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog</h1>
        <Link
          href={`/${locale}/dashboard/blog/new`}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          Add Post
        </Link>
      </div>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Title (EN)</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Slug</th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {posts.map((p) => (
              <tr key={p.id}>
                <td className="px-6 py-4 text-sm text-gray-900">{p.titleEn}</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">{p.slug}</td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className={`rounded-full px-2 py-1 text-xs ${p.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                  <Link href={`/${locale}/dashboard/blog/${p.id}`} className="text-gray-600 hover:text-gray-900">
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
