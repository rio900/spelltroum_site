import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import ItemsGrid from '@/components/wiki/ItemsGrid';

interface ItemsPageProps {
  params: Promise<{ lang: string }>;
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
