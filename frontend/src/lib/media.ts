/**
 * Returns the URL for a media asset (image, etc.) safe for use in Next.js <Image> src.
 *
 * Rules:
 * - External URLs (freeimage.host, etc.) → returned as-is (bypasses Next.js optimization)
 * - Our own API domain absolute URLs → strips the domain, keeps relative path
 * - Relative /uploads/... paths → returned as-is (Nginx proxies /uploads → backend)
 * - Everything else → as-is
 */
export function getMediaUrl(url: string | null | undefined): string {
  if (!url) return "";

  // Already absolute — check if it's our own domain
  if (url.startsWith("http://") || url.startsWith("https://")) {
    // Strip known API domains and return relative path so Nginx can proxy it
    const ownDomains = [
      "https://api.on-dm.com",
      "http://api.on-dm.com",
      "https://staging.on-dm.com",
      "http://staging.on-dm.com",
      "http://ondm-backend:4000",
      "http://localhost:4000",
    ];
    for (const domain of ownDomains) {
      if (url.startsWith(domain)) {
        const path = url.slice(domain.length);
        return path.startsWith("/") ? path : `/${path}`;
      }
    }
    // External URL — return as-is (unoptimized images will render directly)
    return url;
  }

  // Already relative
  return url;
}
