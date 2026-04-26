import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const proxy = createMiddleware(routing);

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  // Include `/` explicitly so the root always runs next-intl (some setups omit it from the catch-all alone).
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
