import { routing } from "@/i18n/routing";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ondm.com";

  const routes = [
    "",
    "/services",
    "/work",
    "/blog",
    "/about",
    "/contact",
    "/lms-platform",
    "/terms",
    "/privacy",
    "/refund-policy",
  ];

  const entries = routing.locales.flatMap((locale) =>
    routes.map((route) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
    }))
  );

  return entries;
}
