"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { RichTextEditor } from "@/components/dashboard/rich-text-editor";
import { ImageUpload } from "@/components/dashboard/image-upload";

interface BlogPost {
  id: string;
  slug: string;
  titleEn: string;
  titleAr: string;
  excerptEn: string;
  excerptAr: string;
  contentEn: string;
  contentAr: string;
  imageUrl: string | null;
  imageUrls?: string[];
  imageColor: string;
  tags: string;
  published: boolean;
}

export function EditBlogForm() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    slug: "",
    titleEn: "",
    titleAr: "",
    excerptEn: "",
    excerptAr: "",
    contentEn: "",
    contentAr: "",
    imageUrls: [] as string[],
    imageColor: "#F3E5F5",
    tags: "[]",
    published: false,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      apiClient
        .get<BlogPost>(`/api/blog/${id}`)
        .then((res) => {
          const p = res.data;
          const urls =
            p.imageUrls && Array.isArray(p.imageUrls)
              ? p.imageUrls
              : p.imageUrl
                ? [p.imageUrl]
                : [];
          setForm({
            slug: p.slug ?? "",
            titleEn: p.titleEn ?? "",
            titleAr: p.titleAr ?? "",
            excerptEn: p.excerptEn ?? "",
            excerptAr: p.excerptAr ?? "",
            contentEn: p.contentEn ?? "",
            contentAr: p.contentAr ?? "",
            imageUrls: urls,
            imageColor: p.imageColor ?? "#F3E5F5",
            tags: p.tags ?? "[]",
            published: p.published,
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
        ...form,
        imageUrls: form.imageUrls.length > 0 ? form.imageUrls : undefined,
      };
      if (isNew) {
        await apiClient.post("/api/blog", payload);
      } else {
        await apiClient.put(`/api/blog/${id}`, payload);
      }
      router.push(`/${locale}/dashboard/blog`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  const editorShell = "min-h-[min(58vh,720px)] w-full flex-1";
  const editorContentClass = "min-h-[min(52vh,640px)] md:prose-base";

  return (
    <div className="flex w-full min-w-0 flex-col gap-6 pb-12 min-h-[calc(100dvh-5.5rem)]">
      <h1 className="text-2xl font-bold shrink-0">{isNew ? "Add Blog Post" : "Edit Blog Post"}</h1>
      <form onSubmit={handleSubmit} className="flex w-full max-w-full min-w-0 flex-col space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Slug</label>
          <input
            value={form.slug}
            onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            required
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
            <label className="block text-sm font-medium text-gray-700">Excerpt (EN)</label>
            <textarea
              value={form.excerptEn}
              onChange={(e) => setForm((f) => ({ ...f, excerptEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={2}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Excerpt (AR)</label>
            <textarea
              value={form.excerptAr}
              onChange={(e) => setForm((f) => ({ ...f, excerptAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={2}
            />
          </div>
        </div>
        <div className="grid min-h-0 w-full grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="flex min-h-0 min-w-0 flex-col">
            <label className="mb-1 block shrink-0 text-sm font-medium text-gray-700">Content (EN)</label>
            <div className="mt-1 flex min-h-0 min-w-0 flex-1 flex-col">
              <RichTextEditor
                value={form.contentEn}
                onChange={(html) => setForm((f) => ({ ...f, contentEn: html }))}
                dir="ltr"
                className={editorShell}
                contentClassName={editorContentClass}
              />
            </div>
          </div>
          <div className="flex min-h-0 min-w-0 flex-col">
            <label className="mb-1 block shrink-0 text-sm font-medium text-gray-700">Content (AR)</label>
            <div className="mt-1 flex min-h-0 min-w-0 flex-1 flex-col">
              <RichTextEditor
                value={form.contentAr}
                onChange={(html) => setForm((f) => ({ ...f, contentAr: html }))}
                dir="rtl"
                className={editorShell}
                contentClassName={editorContentClass}
              />
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Images</label>
          <div className="mt-1">
            <ImageUpload
              value={form.imageUrls}
              onChange={(urls) => setForm((f) => ({ ...f, imageUrls: urls }))}
              disabled={saving}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image Color</label>
          <input
            type="color"
            value={form.imageColor}
            onChange={(e) => setForm((f) => ({ ...f, imageColor: e.target.value }))}
            className="mt-1 h-10 w-full rounded border border-gray-300"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (JSON array)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder='["Design","Marketing"]'
          />
        </div>
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
