"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";

interface SuccessPartnerRow {
  id: string;
  logoUrl: string;
  websiteUrl: string | null;
  label: string | null;
  sortOrder: number;
}

export default function EditSuccessPartnerPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    logoUrl: "",
    websiteUrl: "",
    label: "",
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!isNew) {
      apiClient
        .get<SuccessPartnerRow>(`/api/success-partners/${id}`)
        .then((res) => {
          const r = res.data;
          setForm({
            logoUrl: r.logoUrl,
            websiteUrl: r.websiteUrl || "",
            label: r.label || "",
            sortOrder: r.sortOrder,
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const res = await apiClient.post<{ urls: string[] }>("/api/upload", fd);
      const url = res.data.urls[0];
      if (url) setForm((f) => ({ ...f, logoUrl: url }));
    } catch (err) {
      console.error(err);
      alert("Upload failed. Check file type (JPEG, PNG, WebP, SVG) and size (max 5MB).");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.logoUrl.trim()) {
      alert("Please upload a logo or enter a logo URL.");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        logoUrl: form.logoUrl.trim(),
        websiteUrl: form.websiteUrl.trim() || undefined,
        label: form.label.trim() || undefined,
        sortOrder: form.sortOrder,
      };
      if (isNew) {
        await apiClient.post("/api/success-partners", payload);
      } else {
        await apiClient.put(`/api/success-partners/${id}`, payload);
      }
      router.push(`/${locale}/dashboard/success-partners`);
    } catch (err) {
      console.error(err);
      alert("Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this partner?")) return;
    try {
      await apiClient.delete(`/api/success-partners/${id}`);
      router.push(`/${locale}/dashboard/success-partners`);
    } catch (err) {
      console.error(err);
      alert("Delete failed.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{isNew ? "Add success partner" : "Edit success partner"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo file</label>
          <input type="file" accept="image/jpeg,image/png,image/webp,image/svg+xml" onChange={handleUpload} className="mt-1 block w-full text-sm" />
          {uploading ? <p className="mt-1 text-sm text-gray-500">Uploading…</p> : null}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Logo URL (set automatically after upload)</label>
          <input
            value={form.logoUrl}
            onChange={(e) => setForm((f) => ({ ...f, logoUrl: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
            required
            placeholder="https://… or /path-from-site"
          />
        </div>
        {form.logoUrl ? (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">Preview</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={form.logoUrl} alt="" className="max-h-20 w-auto max-w-full object-contain" />
          </div>
        ) : null}
        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL (optional)</label>
          <input
            type="url"
            value={form.websiteUrl}
            onChange={(e) => setForm((f) => ({ ...f, websiteUrl: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="https://example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Label / alt text (optional)</label>
          <input
            value={form.label}
            onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Company name for accessibility"
          />
          <p className="mt-1 text-xs text-gray-500">Not shown on the homepage; used for image alt text and admin list.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value, 10) || 0 }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div className="flex flex-wrap gap-4">
          <button type="submit" disabled={saving} className="rounded-md bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50">
            {saving ? "Saving…" : "Save"}
          </button>
          <button type="button" onClick={() => router.back()} className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50">
            Cancel
          </button>
          {!isNew ? (
            <button type="button" onClick={handleDelete} className="rounded-md border border-red-300 px-4 py-2 text-red-700 hover:bg-red-50">
              Delete
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}
