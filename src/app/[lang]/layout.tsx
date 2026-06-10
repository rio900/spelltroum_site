import type { Metadata } from 'next';
import { locales, Locale, isValidLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const BASE = 'https://spelltroum.com';

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  return {
    metadataBase: new URL(BASE),
    alternates: {
      canonical: `${BASE}/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}`])),
    },
  };
}

interface LangLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LangLayout({ children, params }: LangLayoutProps) {
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    notFound();
  }

  const t = await getTranslations(lang as Locale);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: "url('/Map2.png')", backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-black/50 pointer-events-none fixed" />
      <Navbar lang={lang as Locale} t={t.nav} />
      <main className="relative z-10 flex-1 pt-16">
        {children}
      </main>
      <Footer lang={lang as Locale} t={t.footer} />
    </div>
  );
}
