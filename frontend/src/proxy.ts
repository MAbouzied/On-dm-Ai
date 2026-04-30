import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Strip the port from the Host header — when Next.js sits behind Nginx on port 80/443,
  // the internal container port (:3000) leaks into redirect/prefetch URLs.
  const host =
    request.headers.get("x-forwarded-host") ||
    request.headers.get("host") ||
    "";

  if (host.includes(":")) {
    const cleanHost = host.split(":")[0];
    const newHeaders = new Headers(request.headers);
    newHeaders.set("x-forwarded-host", cleanHost);
    newHeaders.set("host", cleanHost);
    request = new NextRequest(request.url, { headers: newHeaders });
  }

  // Also strip port from the nextUrl so next-intl generates clean absolute URLs
  request.nextUrl.port = "";

  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Include `/` explicitly so the root always runs next-intl
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)" ],
};
