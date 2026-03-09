import { WorkList } from '@/components/work/work-list';
import { getPublicProjects, getSiteConfig } from '@/lib/api';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function WorkPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const projects = await getPublicProjects();

  let siteConfig: Record<string, string> = {};
  try {
    siteConfig = await getSiteConfig();
  } catch {
    // Fallback to empty
  }

  return (
    <main className="min-h-screen bg-white pt-24">
      <WorkList projects={projects} locale={locale} config={siteConfig} />
    </main>
  );
}
