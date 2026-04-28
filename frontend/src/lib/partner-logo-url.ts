import { getPublicApiBaseUrl } from "./public-api-base";

/** Absolute URL for a success-partner logo (server or client). */
export function resolvePartnerLogoSrc(logoUrl: string): string {
  if (!logoUrl) return "";
  const base = getPublicApiBaseUrl().replace(/\/$/, "");
  if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) return logoUrl;
  if (logoUrl.startsWith("/")) {
    if (logoUrl.startsWith("/uploads/")) return `${base}${logoUrl}`;
    return logoUrl;
  }
  return `${base}/${logoUrl}`;
}
