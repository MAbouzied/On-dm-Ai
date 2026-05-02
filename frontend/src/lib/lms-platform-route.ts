/**
 * True only for the LMS product landing and nested routes under /[locale]/lms-platform.
 * Used to bypass agency Header/Footer — must not match unrelated paths.
 */
export function isLmsPlatformPublicPath(pathname: string): boolean {
  return /^\/(en|ar)\/lms-platform(\/.*)?$/.test(pathname);
}
