/**
 * Base URL for API (used for image URLs).
 * Same logic as upload.ts: API_BASE_URL or http://localhost:PORT
 */
export function getBaseUrl() {
    return process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 4000}`;
}
/**
 * Convert a relative image path to a full URL.
 * - Full URLs (http/https) are returned as-is.
 * - Paths starting with / get base URL prepended (e.g. /uploads/foo.jpg).
 * - Bare filenames are treated as /uploads/filename.
 */
export function resolveImageUrl(url) {
    if (!url || typeof url !== "string")
        return null;
    if (url.startsWith("http://") || url.startsWith("https://"))
        return url;
    const base = getBaseUrl();
    if (url.startsWith("/"))
        return `${base}${url}`;
    return `${base}/uploads/${url}`;
}
/**
 * Resolve an array of image URLs to full URLs.
 */
export function resolveImageUrls(urls) {
    return urls.map((u) => resolveImageUrl(u)).filter((u) => u !== null);
}
