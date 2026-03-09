import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { LayoutWrapper } from "@/components/dashboard/layout-wrapper";
import { getSiteConfig } from "@/lib/api";
import { Analytics } from "@/components/analytics";
import { ErrorBoundary } from "@/components/error-boundary";
import { getOrganizationSchema } from "@/lib/structured-data";
import { Wix_Madefor_Display, Poppins } from "next/font/google";
import "../globals.css";

const wixMadeforDisplay = Wix_Madefor_Display({
  subsets: ["latin"],
  variable: "--font-wix",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

type Locale = (typeof routing.locales)[number];

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "ON DM | Digital Solutions Agency",
    template: "%s | ON DM",
  },
  description:
    "ON DM - Digital solutions agency serving Egypt, Saudi Arabia, UAE. Web development, apps, digital marketing, and design.",
  openGraph: {
    title: "ON DM | Digital Solutions Agency",
    description:
      "ON DM - Digital solutions agency serving Egypt, Saudi Arabia, UAE.",
    type: "website",
  },
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side
  const messages = await getMessages();

  let siteConfig: Record<string, string> = {};
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // Fallback to empty
  }

  const dir = locale === "ar" ? "rtl" : "ltr";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ondm.com";
  const orgSchema = getOrganizationSchema(siteUrl);

  return (
    <html lang={locale} dir={dir} className="h-full">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body
        className={`${wixMadeforDisplay.variable} ${poppins.variable} bg-[#F8F8F8] h-full w-full antialiased`}
      >
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <Analytics />
            <ErrorBoundary>
              <LayoutWrapper siteConfig={siteConfig}>{children}</LayoutWrapper>
            </ErrorBoundary>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
