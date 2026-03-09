export function trackEvent(name: string, props?: Record<string, string | number | boolean>) {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", name, props);
  }
}

export const EVENTS = {
  CONTACT_SUBMIT: "contact_form_submit",
  WHATSAPP_CLICK: "whatsapp_click",
  CTA_CLICK: "cta_click",
} as const;
