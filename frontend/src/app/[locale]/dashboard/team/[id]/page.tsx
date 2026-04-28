"use client";

import { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/dashboard/image-upload";

const PREVIEW_API_BASE =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:4000";

interface TeamMember {
  id: string;
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  photoUrl: string | null;
  sortOrder: number;
}

export default function EditTeamPage() {
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const locale = pathname?.split("/")[1] || "en";
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState({
    nameEn: "",
    nameAr: "",
    roleEn: "",
    roleAr: "",
    bioEn: "",
    bioAr: "",
    photoUrl: "",
    sortOrder: 0,
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      apiClient
        .get<TeamMember>(`/api/team/${id}`)
        .then((res) => {
          const m = res.data;
          setForm({
            nameEn: m.nameEn,
            nameAr: m.nameAr,
            roleEn: m.roleEn,
            roleAr: m.roleAr,
            bioEn: m.bioEn,
            bioAr: m.bioAr,
            photoUrl: m.photoUrl || "",
            sortOrder: m.sortOrder,
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
      const payload = { ...form, photoUrl: form.photoUrl || undefined };
      if (isNew) {
        await apiClient.post("/api/team", payload);
      } else {
        await apiClient.put(`/api/team/${id}`, payload);
      }
      router.push(`/${locale}/dashboard/team`);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">{isNew ? "Add Team Member" : "Edit Team Member"}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name (EN)</label>
            <input
              value={form.nameEn}
              onChange={(e) => setForm((f) => ({ ...f, nameEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name (AR)</label>
            <input
              value={form.nameAr}
              onChange={(e) => setForm((f) => ({ ...f, nameAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Role (EN)</label>
            <input
              value={form.roleEn}
              onChange={(e) => setForm((f) => ({ ...f, roleEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Role (AR)</label>
            <input
              value={form.roleAr}
              onChange={(e) => setForm((f) => ({ ...f, roleAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (EN)</label>
            <textarea
              value={form.bioEn}
              onChange={(e) => setForm((f) => ({ ...f, bioEn: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bio (AR)</label>
            <textarea
              value={form.bioAr}
              onChange={(e) => setForm((f) => ({ ...f, bioAr: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
              rows={3}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Photo</label>
          <p className="mt-0.5 mb-1 text-xs text-gray-500">Upload a headshot (optional).</p>
          <div className="mt-1">
            <ImageUpload
              value={form.photoUrl ? [form.photoUrl] : []}
              onChange={(urls) => setForm((f) => ({ ...f, photoUrl: urls[0] ?? "" }))}
              disabled={saving}
              maxFiles={1}
              baseUrlForPreviews={PREVIEW_API_BASE}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Sort Order</label>
          <input
            type="number"
            value={form.sortOrder}
            onChange={(e) => setForm((f) => ({ ...f, sortOrder: parseInt(e.target.value, 10) || 0 }))}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
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
