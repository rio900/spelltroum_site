import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import ItemsGrid from '@/components/wiki/ItemsGrid';
import type { Metadata } from 'next';

interface ItemsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ItemsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const t = await getTranslations(lang as Locale);
  const ti = t.items;
  return {
    title: `${ti.title} — ${ti.subtitle} | Spelltroum`,
    description: `${ti.subtitle}. Spelltroum features 48 items including weapons, boots, and artifacts. Browse all items with stats, best heroes and tips.`,
    keywords: ['Spelltroum items', 'Spelltroum item list', 'Spelltroum item guide', 'Spelltroum builds', 'mobile arena items'],
    alternates: {
      canonical: `https://spelltroum.com/${lang}/wiki/items`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/wiki/items`])),
    },
    openGraph: {
      title: `${ti.title} | Spelltroum`,
      description: `${ti.subtitle}. Browse all 48 Spelltroum items.`,
      url: `https://spelltroum.com/${lang}/wiki/items`,
      siteName: 'Spelltroum',
      type: 'website',
    },
  };
}

export default async function ItemsPage({ params }: ItemsPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const t = await getTranslations(lang);
  const tItems = t.items as Record<string, string>;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Breadcrumb */}
        <div className="mb-4">
          <Link href={`/${lang}/wiki`} className="text-white/40 hover:text-white/70 text-sm transition-colors">
            ← Wiki
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-lilita text-5xl sm:text-6xl text-[#60a5fa] drop-shadow-[0_2px_8px_rgba(96,165,250,0.4)] mb-3">
            {tItems.title}
          </h1>
          <p className="text-white/50 text-lg">{tItems.subtitle}</p>
        </div>

        <ItemsGrid lang={lang} t={{ filterAll: tItems.filterAll }} />

      </div>
    </div>
  );
}
