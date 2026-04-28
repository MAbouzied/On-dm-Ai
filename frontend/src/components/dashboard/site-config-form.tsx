"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useLocale } from "next-intl";
import apiClient from "@/lib/api-client";
import type { ConfigSection } from "@/lib/config-keys";
import { ImageUpload } from "@/components/dashboard/image-upload";

const PREVIEW_API_BASE =
  process.env.NEXT_PUBLIC_API_URL !== undefined
    ? process.env.NEXT_PUBLIC_API_URL
    : "http://localhost:4000";

interface SiteConfigFormProps {
  sections: ConfigSection[];
  title: string;
}

export function SiteConfigForm({ sections, title }: SiteConfigFormProps) {
  const locale = useLocale();
  const [config, setConfig] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchConfig = useCallback(() => {
    setLoadError(null);
    setLoading(true);
    apiClient
      .get<Record<string, string>>("/api/site-config")
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
    try {
      const payload: Record<string, string> = {};
      for (const section of sections) {
        for (const field of section.fields) {
          payload[field.key] = config[field.key] ?? "";
        }
      }
      await apiClient.put("/api/site-config", payload);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const updateConfig = (key: string, value: string) => {
    setConfig((c) => ({ ...c, [key]: value }));
  };

  if (loading && !loadError) return <div className="text-gray-500">Loading...</div>;

  if (loadError) {
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
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
        <h1 className="text-2xl font-bold">{title}</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
      <div className="space-y-10 max-w-2xl">
        {sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-gray-200 bg-white p-6">
            <h2 className="mb-4 text-lg font-semibold text-gray-900">{section.title}</h2>
            <div className="space-y-4">
              {section.fields.map((field) => (
                <div key={field.key}>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={field.type === "checkbox" ? `cfg-${field.key}` : undefined}
                  >
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={config[field.key] ?? ""}
                      onChange={(e) => updateConfig(field.key, e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
                      rows={4}
                    />
                  ) : field.type === "color" ? (
                    <div className="mt-1 flex gap-2">
                      <input
                        type="color"
                        value={config[field.key]?.startsWith("#") ? config[field.key] : "#000000"}
                        onChange={(e) => updateConfig(field.key, e.target.value)}
                        className="h-10 w-14 cursor-pointer rounded border border-gray-300"
                      />
                      <input
                        type="text"
                        value={config[field.key] ?? ""}
                        onChange={(e) => updateConfig(field.key, e.target.value)}
                        placeholder="#000000"
                        className="flex-1 rounded-md border border-gray-300 px-3 py-2 font-mono text-sm"
                      />
                    </div>
                  ) : field.type === "image" ? (
                    <div className="mt-1">
                      <ImageUpload
                        value={config[field.key] ? [config[field.key]] : []}
                        onChange={(urls) => updateConfig(field.key, urls[0] ?? "")}
                        disabled={saving}
                        maxFiles={1}
                        baseUrlForPreviews={PREVIEW_API_BASE}
                      />
                    </div>
                  ) : field.type === "checkbox" ? (
                    <input
                      id={`cfg-${field.key}`}
                      type="checkbox"
                      checked={config[field.key] !== "false"}
                      onChange={(e) => updateConfig(field.key, e.target.checked ? "true" : "false")}
                      className="mt-2 h-4 w-4 cursor-pointer rounded border-gray-300 text-gray-900"
                    />
                  ) : (
                    <input
                      type="text"
                      value={config[field.key] ?? ""}
                      onChange={(e) => updateConfig(field.key, e.target.value)}
                      className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
                      placeholder={field.type === "url" ? "/contact or https://..." : ""}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
