/**
 * Public API origin for browser (axios) and server fetch().
 * Treats empty / whitespace env the same as unset — avoids axios baseURL ""
 * sending /api/* to the Next dev server (404, broken saves).
 */
export function getPublicApiBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_API_URL?.trim();
  // Fallback to production domain — never use localhost in case env var is missing
  if (!raw) return "https://api.on-dm.com";
  return raw.replace(/\/$/, "");
}
