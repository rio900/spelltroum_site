import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import ItemsGrid from '@/components/wiki/ItemsGrid';
import { items } from '@/data/items';
import type { Metadata } from 'next';

interface ItemsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ItemsPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const t = await getTranslations(lang as Locale);
  const ti = t.items as Record<string, string>;
  return {
    title: ti.metaTitle,
    description: ti.metaDescription,
    alternates: {
      canonical: `https://spelltroum.com/${lang}/wiki/items`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/wiki/items`])),
    },
    openGraph: {
      title: ti.metaOgTitle,
      description: ti.metaOgDescription,
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

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Spelltroum Items',
    description: 'All items in Spelltroum — weapons, armor, boots, and artifacts.',
    url: `https://spelltroum.com/${lang}/wiki/items`,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      url: `https://spelltroum.com/${lang}/wiki/items/${item.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Spelltroum', item: `https://spelltroum.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `https://spelltroum.com/${lang}/wiki` },
      { '@type': 'ListItem', position: 3, name: 'Items', item: `https://spelltroum.com/${lang}/wiki/items` },
    ],
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
