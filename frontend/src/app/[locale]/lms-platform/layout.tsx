import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ProductHeader } from "@/components/saas-landing/product-header";
import { ProductFooter } from "@/components/saas-landing/product-footer";

type LayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

/** Cache-bust favicon so Chrome picks up icon changes after prior visits. */
const LMS_ICON_PATH = "/lms-platform/icon.png?v=lms1";

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "lmsPlatform" });
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000";

  return {
    metadataBase: new URL(base),
    title: t("meta.title"),
    description: t("meta.description"),
    icons: {
      icon: [
        {
          url: LMS_ICON_PATH,
          type: "image/png",
          sizes: "any",
        },
      ],
      apple: [{ url: LMS_ICON_PATH, sizes: "180x180" }],
      shortcut: LMS_ICON_PATH,
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
    },
  };
}

export default async function LmsPlatformLayout({
  children,
  params,
}: LayoutProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <ProductHeader />
      {children}
      <ProductFooter />
    </>
  );
}
