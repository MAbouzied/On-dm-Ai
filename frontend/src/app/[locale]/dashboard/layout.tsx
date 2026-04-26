"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/lib/auth";
import Link from "next/link";

const SIDEBAR_LINKS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/dashboard/homepage", label: "Homepage" },
  { href: "/dashboard/success-partners", label: "Success partners" },
  { href: "/dashboard/navigation", label: "Navigation" },
  { href: "/dashboard/footer", label: "Footer" },
  { href: "/dashboard/cta", label: "CTA" },
  { href: "/dashboard/about-page", label: "About Page" },
  { href: "/dashboard/services", label: "Services" },
  { href: "/dashboard/services-page", label: "Services Page" },
  { href: "/dashboard/projects", label: "Projects" },
  { href: "/dashboard/work-page", label: "Work Page" },
  { href: "/dashboard/blog", label: "Blog" },
  { href: "/dashboard/blog-page", label: "Blog Page" },
  { href: "/dashboard/contact", label: "Contact" },
  { href: "/dashboard/team", label: "Team" },
  { href: "/dashboard/submissions", label: "Submissions" },
  { href: "/dashboard/global", label: "Global" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const token = getToken();
  const isLoginPage = pathname?.endsWith("/dashboard/login");

  useEffect(() => {
    if (!isLoginPage && !token) {
      const locale = pathname?.split("/")[1] || "en";
      router.replace(`/${locale}/dashboard/login`);
    }
  }, [token, isLoginPage, pathname, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 flex-shrink-0 border-r border-gray-200 bg-white">
        <div className="flex h-16 items-center border-b border-gray-200 px-6">
          <span className="text-lg font-semibold">ON-DM Admin</span>
        </div>
        <nav className="space-y-1 p-4">
          {SIDEBAR_LINKS.map((link) => {
            const fullHref = pathname?.startsWith("/ar") ? `/ar${link.href}` : `/en${link.href}`;
            const isActive = pathname === fullHref || (link.href !== "/dashboard" && pathname?.startsWith(fullHref));
            return (
              <Link
                key={link.href}
                href={fullHref}
                className={`block rounded-lg px-4 py-2 text-sm font-medium ${
                  isActive ? "bg-gray-100 text-gray-900" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              import("@/lib/auth").then(({ clearToken }) => {
                clearToken();
                const locale = pathname?.split("/")[1] || "en";
                window.location.href = `/${locale}/dashboard/login`;
              });
            }}
            className="mt-4 block w-full rounded-lg px-4 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  );
}
