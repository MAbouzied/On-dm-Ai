"use client";

import { createContext, useContext, ReactNode } from "react";

export const SiteConfigContext = createContext<Record<string, string>>({});

export function useSiteConfig() {
  return useContext(SiteConfigContext);
}

/** Get config value for locale: uses key for EN, keyAr for AR when using baseAr pattern */
export function getConfigForLocale(
  config: Record<string, string>,
  keyBase: string,
  locale: string,
  fallback: string
): string {
  const k = locale === "ar" ? `${keyBase}Ar` : keyBase;
  return config[k] ?? fallback;
}

/** Get config value for En/Ar keys: keyEn for EN, keyAr for AR */
export function getConfigEnAr(
  config: Record<string, string>,
  keyBase: string,
  locale: string,
  fallback: string
): string {
  const k = locale === "ar" ? `${keyBase}Ar` : `${keyBase}En`;
  return config[k] ?? fallback;
}
