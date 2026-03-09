"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SiteConfigContext } from "@/lib/site-config-context";

export function LayoutWrapper({
  children,
  siteConfig = {},
}: {
  children: React.ReactNode;
  siteConfig?: Record<string, string>;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/dashboard");

  if (isDashboard) {
    return <>{children}</>;
  }

  return (
    <SiteConfigContext.Provider value={siteConfig}>
      <Header />
      <main className="pb-40">{children}</main>
      <Footer />
    </SiteConfigContext.Provider>
  );
}
