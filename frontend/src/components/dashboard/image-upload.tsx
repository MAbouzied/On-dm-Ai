"use client";

import { useCallback, useState } from "react";
import { X, Upload, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import apiClient from "@/lib/api-client";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 10;

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  disabled?: boolean;
  className?: string;
  /** Base URL for previewing relative paths (e.g. /uploads/...) - prepended when url does not start with http */
  baseUrlForPreviews?: string;
}

function resolvePreviewUrl(url: string, baseUrl?: string): string {
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  if (baseUrl) {
    const base = baseUrl.replace(/\/$/, "");
    return url.startsWith("/") ? `${base}${url}` : `${base}/${url}`;
  }
  return url;
}

export function ImageUpload({ value, onChange, disabled = false, className, baseUrlForPreviews }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<number, number>>({});
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const validateFile = (file: File): string | null => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return `Invalid type: ${file.name}. Allowed: JPEG, PNG, WebP`;
    }
    if (file.size > MAX_SIZE) {
      return `Too large: ${file.name}. Max 5MB per file`;
    }
    return null;
  };

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      if (fileArray.length === 0) return;

      const total = value.length + fileArray.length;
      if (total > MAX_FILES) {
        setError(`Maximum ${MAX_FILES} images allowed. You have ${value.length} and tried to add ${fileArray.length}.`);
        return;
      }

      const invalid = fileArray.find((f) => validateFile(f));
      if (invalid) {
        const msg = validateFile(invalid);
        setError(msg || "Invalid file");
        return;
      }

      setError(null);
      setUploading(true);

      const formData = new FormData();
      fileArray.forEach((f) => formData.append("images", f));

      try {
        const res = await apiClient.post<{ urls: string[] }>("/api/upload", formData);

        const newUrls = res.data.urls;
        onChange([...value, ...newUrls]);
      } catch (err: unknown) {
        const msg = err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error
          : "Upload failed";
        setError(typeof msg === "string" ? msg : "Upload failed");
      } finally {
        setUploading(false);
        setUploadProgress({});
      }
    },
    [value, onChange]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (disabled || uploading) return;
      uploadFiles(e.dataTransfer.files);
    },
    [disabled, uploading, uploadFiles]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files?.length) uploadFiles(files);
      e.target.value = "";
    },
    [uploadFiles]
  );

  const remove = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const move = (from: number, to: number) => {
    const arr = [...value];
    const [removed] = arr.splice(from, 1);
    arr.splice(to, 0, removed);
    onChange(arr);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={cn(
          "flex flex-col items-center justify-center rounded-md border-2 border-dashed px-4 py-8 transition-colors",
          dragOver ? "border-gray-900 bg-gray-50" : "border-gray-300 bg-gray-50/50",
          disabled || uploading ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:border-gray-400"
        )}
        onClick={() => {
          if (disabled || uploading) return;
          document.getElementById("image-upload-input")?.click();
        }}
      >
        <input
          id="image-upload-input"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFileSelect}
          disabled={disabled || uploading}
        />
        {uploading ? (
          <p className="text-sm text-gray-600">Uploading...</p>
        ) : (
          <>
            <Upload className="mb-2 h-10 w-10 text-gray-400" />
            <p className="text-sm font-medium text-gray-600">
              Drag and drop images, or click to select
            </p>
            <p className="mt-1 text-xs text-gray-500">
              JPEG, PNG, WebP • Max 5MB each • Up to {MAX_FILES} images
            </p>
          </>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Images ({value.length}) — first image is used as hero
          </p>
          <div className="flex flex-wrap gap-3">
            {value.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="group relative flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2"
              >
                <div className="h-16 w-20 shrink-0 overflow-hidden rounded bg-gray-100">
                  <img
                    src={resolvePreviewUrl(url, baseUrlForPreviews)}
                    alt={`Preview ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="rounded p-1 text-gray-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => move(index, index - 1)}
                      className="rounded p-1 text-gray-500 hover:bg-gray-100"
                      aria-label="Move left"
                    >
                      <GripVertical className="h-4 w-4 rotate-90" />
                    </button>
                  )}
                  {index < value.length - 1 && (
                    <button
                      type="button"
                      onClick={() => move(index, index + 1)}
                      className="rounded p-1 text-gray-500 hover:bg-gray-100"
                      aria-label="Move right"
                    >
                      <GripVertical className="h-4 w-4 -rotate-90" />
                    </button>
                  )}
                </div>
                {index === 0 && (
                  <span className="absolute -top-1 -right-1 rounded bg-gray-900 px-1.5 py-0.5 text-xs text-white">
                    Hero
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
