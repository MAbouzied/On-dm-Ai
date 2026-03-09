"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { RichTextEditor } from "@/components/dashboard/rich-text-editor";
import { ImageUpload } from "@/components/dashboard/image-upload";

interface Project {
  id: string;
  slug: string;
  type: string;
  category: string | null;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string | null;
  imageUrls: string | string[] | null;
  tags: string;
  liveUrl: string | null;
  contentEn: string;
  contentAr: string;
  published: boolean;
  sortOrder: number;
}

export function EditProjectForm() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    slug: "",
    type: "software" as "design" | "marketing" | "software",
    category: "",
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    imageUrls: [] as string[],
    tags: "[]",
    liveUrl: "",
    contentEn: "",
    contentAr: "",
    published: false,
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      apiClient
        .get<Project>(`/api/projects/${id}`)
        .then((res) => {
          const p = res.data;
          let urls: string[] = [];
          if (p.imageUrls) {
            urls = Array.isArray(p.imageUrls)
              ? p.imageUrls
              : (() => {
                  try {
                    return JSON.parse(p.imageUrls as string) || [];
                  } catch {
                    return [];
                  }
                })();
          } else if (p.imageUrl) {
            urls = [p.imageUrl];
          }
          setForm({
            slug: p.slug ?? "",
            type: (p.type as "design" | "marketing" | "software") || "software",
            category: p.category ?? "",
            titleEn: p.titleEn ?? "",
            titleAr: p.titleAr ?? "",
            descriptionEn: p.descriptionEn ?? "",
            descriptionAr: p.descriptionAr ?? "",
            imageUrls: urls,
            tags: p.tags ?? "[]",
            liveUrl: p.liveUrl ?? "",
            contentEn: p.contentEn ?? "",
            contentAr: p.contentAr ?? "",
            published: p.published ?? false,
            sortOrder: p.sortOrder ?? 0,
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        slug: form.slug,
        type: form.type,
        category: form.category || null,
        titleEn: form.titleEn,
        titleAr: form.titleAr,
        descriptionEn: form.descriptionEn,
        descriptionAr: form.descriptionAr,
        imageUrls: form.imageUrls.length > 0 ? JSON.stringify(form.imageUrls) : null,
        imageUrl: form.imageUrls.length > 0 ? null : null,
        tags: form.tags,
        liveUrl: form.liveUrl || null,
        contentEn: form.contentEn,
        contentAr: form.contentAr,
        published: form.published,
        sortOrder: form.sortOrder,
      };
      if (isNew) {
        await apiClient.post("/api/projects", payload);
      } else {
        await apiClient.put(`/api/projects/${id}`, payload);
      }
      router.push(`/${locale}/dashboard/projects`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">
        {isNew ? "Add Project" : "Edit Project"}
      </h1>
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Type</label>
          <select
            value={form.type}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                type: e.target.value as "design" | "marketing" | "software",
              }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="software">Software</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="e.g. Learning Management System"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (EN)</label>
            <input
              value={form.titleEn}
              onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title (AR)</label>
            <input
              value={form.titleAr}
              onChange={(e) => setForm((f) => ({ ...f, titleAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Description (EN)</label>
            <textarea
              value={form.descriptionEn}
              onChange={(e) => setForm((f) => ({ ...f, descriptionEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description (AR)</label>
            <textarea
              value={form.descriptionAr}
              onChange={(e) => setForm((f) => ({ ...f, descriptionAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <p className="mt-0.5 mb-1 text-xs text-gray-500">
            First image is used in the Work dropdown and on project pages.
          </p>
          <div className="mt-1">
            <ImageUpload
              value={form.imageUrls}
              onChange={(urls) => setForm((f) => ({ ...f, imageUrls: urls }))}
              disabled={saving}
              baseUrlForPreviews={process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (JSON array)
          </label>
          <input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder='[{"label":"Design","color":"purple"}]'
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Live URL</label>
          <input
            type="url"
            value={form.liveUrl}
            onChange={(e) => setForm((f) => ({ ...f, liveUrl: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Content (EN)</label>
            <div className="mt-1">
              <RichTextEditor
                value={form.contentEn}
                onChange={(html) => setForm((f) => ({ ...f, contentEn: html }))}
                dir="ltr"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Content (AR)</label>
            <div className="mt-1">
              <RichTextEditor
                value={form.contentAr}
                onChange={(html) => setForm((f) => ({ ...f, contentAr: html }))}
                dir="rtl"
              />
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="published"
              checked={form.published}
              onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="published">Published</label>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sort Order</label>
            <input
              type="number"
              value={form.sortOrder}
              onChange={(e) =>
                setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value, 10) || 0 }))
              }
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
