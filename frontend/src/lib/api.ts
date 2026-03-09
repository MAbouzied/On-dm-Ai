export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

const isDev = process.env.NODE_ENV === "development";
const fetchOpts = isDev ? { cache: "no-store" as RequestCache } : { next: { revalidate: 60 } };

/** Safely parse JSON from response - handles non-JSON (e.g. HTML error pages) */
async function safeJson<T>(res: Response, fallback: T): Promise<T> {
  const text = await res.text();
  try {
    return (text ? JSON.parse(text) : fallback) as T;
  } catch {
    return fallback;
  }
}

export async function getPublicServices() {
  try {
    const res = await fetch(`${API_URL}/api/public/services`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return safeJson(res, []);
  } catch {
    return [];
  }
}

export async function getPublicService(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/public/services/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return safeJson(res, null);
  } catch {
    return null;
  }
}

export async function getPublicBlog() {
  try {
    const res = await fetch(`${API_URL}/api/public/blog`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return safeJson(res, []);
  } catch {
    return [];
  }
}

export async function getPublicBlogPost(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/public/blog/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return safeJson(res, null);
  } catch {
    return null;
  }
}

export async function getPublicHomepage() {
  try {
    const res = await fetch(`${API_URL}/api/public/homepage`, fetchOpts);
    if (!res.ok) return {};
    return safeJson(res, {});
  } catch {
    return {};
  }
}

export async function getPublicTeam() {
  try {
    const res = await fetch(`${API_URL}/api/public/team`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return safeJson(res, []);
  } catch {
    return [];
  }
}

export async function getPublicProjects() {
  try {
    const res = await fetch(`${API_URL}/api/public/projects`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return safeJson(res, []);
  } catch {
    return [];
  }
}

export async function getPublicProject(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/public/projects/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return safeJson(res, null);
  } catch {
    return null;
  }
}

export async function getPublicContactPage(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_URL}/api/public/contact-page`, fetchOpts);
    if (!res.ok) return {};
    return safeJson(res, {});
  } catch {
    return {};
  }
}

/** Full site config (nav, hero, footer, cta, etc.) - used for editable content */
export async function getSiteConfig(): Promise<Record<string, string>> {
  try {
    const res = await fetch(`${API_URL}/api/public/site-config`, fetchOpts);
    if (!res.ok) return {};
    return safeJson(res, {});
  } catch {
    return {};
  }
}
