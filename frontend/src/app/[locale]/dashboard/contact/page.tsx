"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import apiClient from "@/lib/api-client";

const CONTACT_KEYS = [
  { key: "contact.titleEn", label: "Title (EN)" },
  { key: "contact.titleAr", label: "Title (AR)" },
  { key: "contact.descriptionEn", label: "Description (EN)" },
  { key: "contact.descriptionAr", label: "Description (AR)" },
  { key: "contact.whatsappUrl", label: "WhatsApp URL" },
  { key: "contact.phoneNumber", label: "Phone Number" },
  { key: "contact.meetingUrl", label: "Meeting URL (e.g. Calendly)" },
  { key: "contact.whatsappTextEn", label: "WhatsApp Button (EN)" },
  { key: "contact.whatsappTextAr", label: "WhatsApp Button (AR)" },
  { key: "contact.callTextEn", label: "Call Button (EN)" },
  { key: "contact.callTextAr", label: "Call Button (AR)" },
  { key: "contact.meetingTextEn", label: "Meeting Button (EN)" },
  { key: "contact.meetingTextAr", label: "Meeting Button (AR)" },
  { key: "contact.formHeadingEn", label: "Form Heading (EN)" },
  { key: "contact.formHeadingAr", label: "Form Heading (AR)" },
  { key: "contact.email", label: "Email" },
  { key: "contact.address1En", label: "Address 1 (EN)" },
  { key: "contact.address1Ar", label: "Address 1 (AR)" },
  { key: "contact.address2En", label: "Address 2 (EN)" },
  { key: "contact.address2Ar", label: "Address 2 (AR)" },
];

export default function ContactPage() {
  const locale = useLocale();
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchConfig = useCallback(() => {
    setLoadError(null);
    setLoading(true);
    apiClient
      .get<Record<string, string>>("/api/contact-page")
      .then((res) => setConfig(res.data ?? {}))
      .catch((err) => {
        console.error(err);
        const status = err.response?.status;
        if (status === 401) {
          setLoadError("Session expired. Please log in again.");
        } else {
          setLoadError("Failed to load. Please ensure you are logged in and the backend is running.");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const payload: Record<string, string> = {};
      for (const { key } of CONTACT_KEYS) {
        payload[key] = config[key] ?? "";
      }
      payload["contact.socialLinks"] = config["contact.socialLinks"] ?? "[]";
      await apiClient.put("/api/contact-page", payload);
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading && !loadError) return <div>Loading...</div>;

  if (loadError) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">Contact Page</h1>
        <p className="mb-4 text-red-600">{loadError}</p>
        {loadError.includes("Session expired") ? (
          <Link
            href={`/${locale}/dashboard/login`}
            className="inline-block rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Log in
          </Link>
        ) : (
          <button
            onClick={fetchConfig}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Contact Page</h1>
          <p className="mt-1 text-sm text-gray-500">
            Map pin and zoom are fixed in{" "}
            <code className="rounded bg-gray-100 px-1 text-xs">src/lib/contact-map-location.ts</code>{" "}
            (deploys with the build).
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveStatus === "success" && (
            <span className="text-sm font-medium text-green-600">Saved successfully</span>
          )}
          {saveStatus === "error" && (
            <span className="text-sm font-medium text-red-600">Failed to save. Please try again.</span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <div className="space-y-6 max-w-2xl">
        {CONTACT_KEYS.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={config[key] ?? ""}
              onChange={(e) => setConfig((c) => ({ ...c, [key]: e.target.value }))}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Social Links (JSON array)
          </label>
          <textarea
            value={config["contact.socialLinks"] ?? "[]"}
            onChange={(e) =>
              setConfig((c) => ({ ...c, "contact.socialLinks": e.target.value }))
            }
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
            rows={6}
          />
          <p className="mt-1 text-xs text-gray-500">
            Format: [{`{ "name": "Facebook", "href": "https://...", "icon": "facebook" }`}]
          </p>
        </div>
      </div>
    </div>
  );
}
