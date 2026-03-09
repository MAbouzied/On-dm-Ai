"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";

interface Service {
  id: string;
  slug: string;
  category: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  contentEn?: string;
  contentAr?: string;
  tags: string;
  backgroundColor: string;
  isDark: boolean;
  sortOrder: number;
}

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    slug: "",
    category: "software",
    titleEn: "",
    titleAr: "",
    descriptionEn: "",
    descriptionAr: "",
    contentEn: "",
    contentAr: "",
    tags: "[]",
    backgroundColor: "#D6EADF",
    isDark: false,
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      apiClient
        .get<Service>(`/api/services/${id}`)
        .then((res) => {
          const s = res.data;
          setForm({
            slug: s.slug,
            category: s.category,
            titleEn: s.titleEn,
            titleAr: s.titleAr,
            descriptionEn: s.descriptionEn,
            descriptionAr: s.descriptionAr,
            contentEn: s.contentEn ?? "",
            contentAr: s.contentAr ?? "",
            tags: s.tags,
            backgroundColor: s.backgroundColor,
            isDark: s.isDark,
            sortOrder: s.sortOrder,
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
      if (isNew) {
        await apiClient.post("/api/services", form);
      } else {
        await apiClient.put(`/api/services/${id}`, form);
      }
      router.push(`/${locale}/dashboard/services`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{isNew ? "Add Service" : "Edit Service"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
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
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            >
              <option value="software">Software</option>
              <option value="marketing">Marketing</option>
              <option value="design">Design</option>
            </select>
          </div>
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
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Body Content (EN) – HTML</label>
            <textarea
              value={form.contentEn}
              onChange={(e) => setForm((f) => ({ ...f, contentEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
              rows={8}
              placeholder="<p>Optional rich content...</p>"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Body Content (AR) – HTML</label>
            <textarea
              value={form.contentAr}
              onChange={(e) => setForm((f) => ({ ...f, contentAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
              rows={8}
              placeholder="<p>محتوى اختياري...</p>"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tags (JSON array)</label>
          <input
            value={form.tags}
            onChange={(e) => setForm((f) => ({ ...f, tags: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder='["Tag1","Tag2"]'
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <input
              type="color"
              value={form.backgroundColor}
              onChange={(e) => setForm((f) => ({ ...f, backgroundColor: e.target.value }))}
              className="mt-1 h-10 w-full rounded border border-gray-300"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDark"
              checked={form.isDark}
              onChange={(e) => setForm((f) => ({ ...f, isDark: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="isDark">Dark text</label>
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
