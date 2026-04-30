/**
 * Backend URL utilities.
 *
 * We intentionally return RELATIVE paths (/uploads/...) so that:
 * 1. The application is domain-agnostic — no hardcoded domains/ports in the DB.
 * 2. Nginx routes /uploads/ requests to the backend container transparently.
 * 3. No SSL certificate issues when the frontend fetches images server-side.
 */

/**
 * Convert a stored image path/URL to a clean relative path.
 * - Already-relative paths (/uploads/...) → returned as-is
 * - Absolute URLs that contain /uploads/ → strips the domain prefix
 * - Bare filenames → /uploads/filename
 * - External URLs (freeimage.host etc.) → returned as-is
 */
export function resolveImageUrl(url: string | null | undefined): string | null {
  if (!url || typeof url !== "string") return null;

  // External URL → keep as-is (frontend will render directly, unoptimized)
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // If it's our own domain, strip it to a relative path
    if (url.includes("/uploads/")) {
      const idx = url.indexOf("/uploads/");
      return url.slice(idx);
    }
    return url;
  }

  // Already relative
  if (url.startsWith("/")) return url;

  // Bare filename — assume it lives in /uploads/
  return `/uploads/${url}`;
}

/**
 * Resolve an array of image URLs.
 */
export function resolveImageUrls(urls: string[]): string[] {
  return urls.map((u) => resolveImageUrl(u)).filter((u): u is string => u !== null);
}
