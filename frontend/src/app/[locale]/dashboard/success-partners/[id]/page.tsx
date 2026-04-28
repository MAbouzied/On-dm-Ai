"use client";

import { useEffect, useId, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import apiClient from "@/lib/api-client";
import { ImageUpload } from "@/components/dashboard/image-upload";
import { getPublicApiBaseUrl } from "@/lib/public-api-base";

const PREVIEW_API_BASE = getPublicApiBaseUrl();

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
  const logoFileInputId = useId();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.logoUrl.trim()) {
      alert("Please upload a logo.");
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
    } catch (err: unknown) {
      console.error(err);
      const ax = err as {
        message?: string;
        response?: { status?: number; data?: unknown };
      };
      let msg = "Save failed.";
      if (ax.response?.data && typeof ax.response.data === "object" && "error" in ax.response.data) {
        const e = (ax.response.data as { error: unknown }).error;
        if (typeof e === "string") msg = e;
        else if (e && typeof e === "object") {
          const flat = e as { formErrors?: string[]; fieldErrors?: Record<string, string[] | undefined> };
          if (flat.fieldErrors && Object.keys(flat.fieldErrors).length > 0) {
            msg = Object.entries(flat.fieldErrors)
              .map(([k, v]) => `${k}: ${(v ?? []).join(", ")}`)
              .join("\n");
          } else if (flat.formErrors?.length) msg = flat.formErrors.join("\n");
          else msg = JSON.stringify(e);
        }
      } else if (ax.response?.status === 401 || ax.response?.status === 403) {
        msg = "Session expired or not authorized. Log in again from the dashboard.";
      } else if (ax.message) {
        msg = ax.message.includes("Network Error")
          ? "Cannot reach API. Check NEXT_PUBLIC_API_URL and that the backend is running."
          : ax.message;
      }
      alert(msg);
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
      <form noValidate onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor={logoFileInputId} className="block text-sm font-medium text-gray-700">
            Logo
          </label>
          <p className="mt-0.5 mb-1 text-xs text-gray-500">
            PNG, WebP, JPEG, or SVG. Shown in the homepage marquee.
          </p>
          <div className="mt-1">
            <ImageUpload
              fileInputId={logoFileInputId}
              fileInputName="successPartnerLogo"
              value={form.logoUrl ? [form.logoUrl] : []}
              onChange={(urls) => setForm((f) => ({ ...f, logoUrl: urls[0] ?? "" }))}
              disabled={saving}
              maxFiles={1}
              baseUrlForPreviews={PREVIEW_API_BASE}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL (optional)</label>
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
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
