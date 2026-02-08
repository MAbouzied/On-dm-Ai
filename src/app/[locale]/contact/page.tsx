import { ContactHero } from '@/components/contact/contact-hero';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  // We need to use useTranslations in a client component or pass translations from here
  // But since this is a server component, we can fetch translations here if we want, 
  // or just pass keys to the client component if it uses useTranslations.
  // However, ContactHero is a client component (marked 'use client'), so we can pass strings.
  
  // Actually, let's use getTranslations for server-side fetching
  const { getTranslations } = await import('next-intl/server');
  const t = await getTranslations('contactPage');

  return (
    <main className="min-h-screen bg-white">
      <ContactHero
        title={t('title')}
        description={t('description')}
        whatsappText={t('whatsapp')}
        callText={t('call')}
        meetingText={t('meeting')}
      />
    </main>
  );
}
