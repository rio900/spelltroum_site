import { Locale, isValidLocale, locales } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleContent } from '@/data/content';
import type { Metadata } from 'next';

interface ArticlesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const t = await getTranslations(lang as Locale);
  const ta = t.articles as Record<string, string>;
  return {
    title: `${ta.title} | Spelltroum`,
    description: ta.metaDescription ?? ta.subtitle,
    alternates: {
      canonical: `https://spelltroum.com/${lang}/articles`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/articles`])),
    },
    openGraph: {
      title: `${ta.title} | Spelltroum`,
      description: ta.metaDescription ?? ta.subtitle,
      url: `https://spelltroum.com/${lang}/articles`,
      siteName: 'Spelltroum',
      type: 'website',
    },
  };
}

const articlesMeta = [
  {
    slug: 'game-mechanics',
    href: (lang: string) => `/${lang}/articles/game-mechanics`,
    fallbackTitle: 'Spelltroum Game Mechanics — Complete Guide',
    fallbackExcerpt: 'Learn how matches work, how to farm gold, upgrade abilities, collect Crowns, fight bosses, and build a winning strategy in Spelltroum.',
    fallbackCategory: 'Guide',
    readTime: '8 min',
    color: '#c084fc',
    icon: '📖',
  },
  {
    slug: 'spelltroum-vs-brawl-stars',
    href: (lang: string) => `/${lang}/articles/spelltroum-vs-brawl-stars`,
    fallbackTitle: 'Spelltroum vs Brawl Stars: Which Game Is Right for You?',
    fallbackExcerpt: 'Spelltroum and Brawl Stars look similar at first glance, but offer completely different experiences. Compare gameplay, strategy, hero builds, and progression.',
    fallbackCategory: 'vs',
    readTime: '7 min',
    color: '#f97316',
    icon: '⚔️',
  },
  {
    slug: 'spelltroum-vs-mobile-legends',
    href: (lang: string) => `/${lang}/articles/spelltroum-vs-mobile-legends`,
    fallbackTitle: 'Spelltroum vs Mobile Legends: Which Game Is Right for You?',
    fallbackExcerpt: 'If you love Mobile Legends but want faster matches without losing MOBA depth, Spelltroum offers farming, item builds, and team strategy in just 2–3 minutes.',
    fallbackCategory: 'vs',
    readTime: '6 min',
    color: '#06b6d4',
    icon: '🗡️',
  },
  {
    slug: 'doorkeeper-mode-guide',
    href: (lang: string) => `/${lang}/articles/doorkeeper-mode-guide`,
    fallbackTitle: 'DoorKeeper Mode Guide: Everything You Need to Know',
    fallbackExcerpt: 'DoorKeeper Mode is Spelltroum\'s unique idle battle mode. Learn how builds, rune items, armor, and ability timing determine every fight.',
    fallbackCategory: 'Guides',
    readTime: '7 min',
    color: '#a78bfa',
    icon: '🚪',
  },
];

const categoryColors: Record<string, string> = {
  Guide: '#60a5fa',
  Guides: '#60a5fa',
  'Tier List': '#f59e0b',
  'Hero Guide': '#a78bfa',
  Strategy: '#4ade80',
  vs: '#f97316',
};

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const t = await getTranslations(lang as Locale);

  // Load localized content for each article
  const articles = await Promise.all(
    articlesMeta.map(async (meta) => {
      const content = await getArticleContent(meta.slug, lang as Locale);
      return {
        ...meta,
        title: content.title ?? meta.fallbackTitle,
        excerpt: content.description ?? meta.fallbackExcerpt,
        category: content.category ?? meta.fallbackCategory,
      };
    })
  );

  const featured = articles[0];
  const rest = articles.slice(1);

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Spelltroum', item: `https://spelltroum.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: `https://spelltroum.com/${lang}/articles` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-lilita text-5xl sm:text-6xl text-[#FFD43A] drop-shadow-[0_2px_8px_rgba(255,212,58,0.4)] mb-3">
            {t.articles.title}
          </h1>
          <p className="text-white/50 text-lg">{t.articles.subtitle}</p>
        </div>

        {/* Intro text */}
        <p className="text-white/60 text-base leading-relaxed max-w-3xl mx-auto text-center mb-12">
          {(t.articles as Record<string, string>).intro}
        </p>

        {/* Featured article */}
        <Link
          href={featured.href(lang)}
          className="group block relative overflow-hidden rounded-3xl border border-[#c084fc]/30 bg-black/40 backdrop-blur-sm mb-8 p-8 transition-all hover:border-[#c084fc]/60 hover:scale-[1.01]"
          style={{ background: 'linear-gradient(135deg, #c084fc11 0%, #00000066 60%)' }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: '#c084fc' }} />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{featured.icon}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-[#60a5fa]/20 text-[#60a5fa] border border-[#60a5fa]/30 font-semibold">
                {featured.category}
              </span>
              <span className="text-white/30 text-xs ml-auto">{featured.readTime} read</span>
            </div>
            <h2 className="font-lilita text-3xl sm:text-4xl text-[#c084fc] mb-3 group-hover:drop-shadow-[0_0_12px_rgba(192,132,252,0.4)] transition-all">
              {featured.title}
            </h2>
            <p className="text-white/60 text-base max-w-2xl">{featured.excerpt}</p>
            <div className="mt-6 inline-flex items-center gap-2 text-[#c084fc] text-sm font-semibold group-hover:gap-3 transition-all">
              {t.articles.readMore} <span>→</span>
            </div>
          </div>
        </Link>

        {/* Article grid — will populate as more articles are added */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((article) => (
              <Link
                key={article.title}
                href={article.href(lang)}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm p-5 flex flex-col gap-3 transition-all hover:scale-[1.02] hover:border-white/20"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{article.icon}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: `${categoryColors[article.category] ?? '#9ca3af'}22`,
                      color: categoryColors[article.category] ?? '#9ca3af',
                      border: `1px solid ${categoryColors[article.category] ?? '#9ca3af'}44`,
                    }}
                  >
                    {article.category}
                  </span>
                </div>
                <h3 className="font-lilita text-lg leading-snug" style={{ color: article.color }}>
                  {article.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                  <span className="text-white/30 text-xs">{article.readTime} read</span>
                  <span className="text-white/40 group-hover:text-white/70 transition-colors text-sm">→</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 text-center text-white/30 text-sm">
          {t.articles.comingSoon}
        </div>

        {/* FAQ */}
        {(() => {
          const ta = t.articles as Record<string, string>;
          const faqJsonLd = {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: ta.faqQ1, acceptedAnswer: { '@type': 'Answer', text: ta.faqA1 } },
              { '@type': 'Question', name: ta.faqQ2, acceptedAnswer: { '@type': 'Answer', text: ta.faqA2 } },
            ],
          };
          return (
            <>
              <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
              <div className="mt-16 max-w-3xl mx-auto">
                <h2 className="font-lilita text-2xl text-[#FFD43A] mb-6">FAQ</h2>
                <div className="flex flex-col gap-4">
                  {[{ q: ta.faqQ1, a: ta.faqA1 }, { q: ta.faqQ2, a: ta.faqA2 }].map(({ q, a }) => (
                    <div key={q} className="rounded-xl border border-white/10 bg-black/30 p-5">
                      <h3 className="text-white font-semibold mb-2">{q}</h3>
                      <p className="text-white/60 text-sm leading-relaxed">{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          );
        })()}

      </div>
    </div>
    </>
  );
}
