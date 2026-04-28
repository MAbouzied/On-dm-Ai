/**
 * Blog post tags are stored as English strings in JSON (e.g. ["Design","Branding"]).
 * For Arabic locale, display Arabic labels while keeping English keys for styling (getTagColor).
 */

const BLOG_TAG_LABEL_AR: Record<string, string> = {
  Design: "تصميم",
  Marketing: "تسويق",
  Software: "برمجيات",
  Branding: "الهوية التجارية",
  Ads: "إعلانات",
  Campaigns: "الحملات",
  Strategy: "الاستراتيجية",
  Performance: "الأداء",
  Content: "المحتوى",
  Analytics: "التحليلات",
  Frontend: "الواجهات الأمامية",
  Backend: "الخلفية",
  CMS: "نظام إدارة المحتوى",
  Optimization: "التحسين",
  iOS: "iOS",
  Android: "أندرويد",
  Automation: "الأتمتة",
  Cloud: "السحابة",
  Integration: "التكامل",
  "Brand Identity": "هوية العلامة",
  "Visual Design": "التصميم البصري",
  Guidelines: "الإرشادات",
  Rebranding: "إعادة العلامة",
  Education: "التعليم",
  "UX Design": "تصميم تجربة المستخدم",
  "Digital Marketing": "التسويق الرقمي",
  "Social Media": "وسائل التواصل الاجتماعي",
  "Web development": "تطوير الويب",
  "App development": "تطوير التطبيقات",
  Technology: "التكنولوجيا",
  Innovation: "الابتكار",
  Business: "الأعمال",
  SEO: "تحسين محركات البحث",
  Advertising: "الإعلان",
};

export function blogTagDisplayLabel(raw: string, locale: string): string {
  if (!raw || locale !== "ar") return raw;
  return BLOG_TAG_LABEL_AR[raw] ?? raw;
}
