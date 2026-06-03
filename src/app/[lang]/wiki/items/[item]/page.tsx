import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import Image from 'next/image';
import { items, getItemById, categoryColors, frameColors, frameLabels } from '@/data/items';
import { heroes } from '@/data/heroes';
import ItemIcon from '@/components/wiki/ItemIcon';
import { getItemContent } from '@/data/content';

interface ItemPageProps {
  params: Promise<{ lang: string; item: string }>;
}

export async function generateStaticParams() {
  return items.map((i) => ({ item: i.id }));
}

export async function generateMetadata({ params }: ItemPageProps): Promise<Metadata> {
  const { lang, item: itemId } = await params;
  const item = getItemById(itemId);
  if (!item) return {};
  const t = await getTranslations(lang as Locale);
  const tItems = t.items as Record<string, string>;
  const content = await getItemContent(itemId, lang as Locale);
  const description = content.description ?? item.description;
  const bestHeroNames = item.bestHeroes.slice(0, 3).map((h) => h.name).join(', ');
  const metaDescription = description?.slice(0, 155)
    ?? `${item.name} — ${item.frame} ${item.category.toLowerCase()}. Best for: ${bestHeroNames}. Stats by level, build tips and strategies.`;
  const metaTitle = (tItems.metaDetailTitle ?? '{name} — Spelltroum Item Guide | Stats, Best Heroes & Tips').replace('{name}', item.name);
  const metaOgTitle = (tItems.metaDetailOgTitle ?? '{name} — Spelltroum Item Guide').replace('{name}', item.name);
  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `https://spelltroum.com/${lang}/wiki/items/${item.id}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/wiki/items/${item.id}`])),
    },
    openGraph: {
      title: metaOgTitle,
      description: metaDescription,
      url: `https://spelltroum.com/${lang}/wiki/items/${item.id}`,
      type: 'article',
    },
  };
}

const LEVELS = [1, 2, 3, 4] as const;

const levelColors: Record<1 | 2 | 3 | 4, string> = {
  1: 'rgba(255,255,255,0.6)',
  2: '#4ade80',
  3: '#60a5fa',
  4: '#c084fc',
};

export default async function ItemPage({ params }: ItemPageProps) {
  const { lang, item: itemId } = await params;
  if (!isValidLocale(lang)) notFound();

  const item = getItemById(itemId);
  if (!item) notFound();

  const t = await getTranslations(lang);
  const tItems = t.items as Record<string, string>;
  const content = await getItemContent(item.id, lang);

  const description = content.description ?? item.description;
  const whyUse = content.whyUse ?? item.whyUse;
  const uniqueEffect = content.uniqueEffect ?? item.uniqueEffect;
  const strengths = content.strengths ?? item.strengths;
  const weaknesses = content.weaknesses ?? item.weaknesses;
  const tips = content.tips ?? item.tips;
  const faq = content.faq ?? item.faq;

  const catColor = categoryColors[item.category];
  const frameColor = frameColors[item.frame];
  const related = items.filter((i) => i.category === item.category && i.id !== item.id).slice(0, 8);

  const bestHeroNames = item.bestHeroes.slice(0, 3).map((h) => h.name).join(', ');
  const itemJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: item.name,
    description: description?.slice(0, 300) ?? `${item.name} is a ${item.frame} ${item.category.toLowerCase()} item in Spelltroum. Best for: ${bestHeroNames}.`,
    url: `https://spelltroum.com/${lang}/wiki/items/${item.id}`,
    image: item.image ? `https://spelltroum.com/items/${item.image}` : undefined,
    applicationCategory: 'Game',
    isPartOf: {
      '@type': 'VideoGame',
      name: 'Spelltroum',
      url: 'https://spelltroum.com',
    },
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Spelltroum', item: `https://spelltroum.com/${lang}` },
      { '@type': 'ListItem', position: 2, name: 'Wiki', item: `https://spelltroum.com/${lang}/wiki` },
      { '@type': 'ListItem', position: 3, name: 'Items', item: `https://spelltroum.com/${lang}/wiki/items` },
      { '@type': 'ListItem', position: 4, name: item.name, item: `https://spelltroum.com/${lang}/wiki/items/${item.id}` },
    ],
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
          <Link href={`/${lang}/wiki`} className="hover:text-white/70 transition-colors">Wiki</Link>
          <span>/</span>
          <Link href={`/${lang}/wiki/items`} className="hover:text-white/70 transition-colors">{tItems.title}</Link>
          <span>/</span>
          <span className="text-white/70">{item.name}</span>
        </div>

        {/* Hero card */}
        <div
          className="relative rounded-3xl overflow-hidden mb-10 p-8 flex flex-col sm:flex-row items-center gap-8 border border-white/10"
          style={{ background: `linear-gradient(135deg, ${frameColor}18 0%, #00000088 70%)` }}
        >
          <div className="absolute top-0 left-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none" style={{ background: frameColor }} />
          <div className="relative shrink-0">
            <ItemIcon image={item.image} frame={item.frame} level={1} size={112} />
          </div>
          <div className="relative z-10 text-center sm:text-left">
            <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold border" style={{ background: `${catColor}22`, color: catColor, borderColor: `${catColor}44` }}>
                {tItems[`category${item.category}`] ?? item.category}
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold border" style={{ background: `${frameColor}22`, color: frameColor, borderColor: `${frameColor}44` }}>
                {tItems[`frame${item.frame.charAt(0).toUpperCase() + item.frame.slice(1)}`] ?? frameLabels[item.frame]}
              </span>
            </div>
            <h1 className="font-lilita text-4xl sm:text-5xl text-white mb-3 drop-shadow-lg">{item.name}</h1>
            <p className="text-white/40 text-xs uppercase tracking-wider mb-1">{tItems.overview}</p>
            <p className="text-white/60 text-base leading-relaxed max-w-md">{description}</p>
            {item.runeImage && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-white/30 text-xs uppercase tracking-wider">{tItems.rune}</span>
                <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/20 bg-white/5">
                  <Image src={`/spells/${item.runeImage}`} alt="Rune" width={32} height={32} className="object-cover w-full h-full" />
                </div>
              </div>
            )}
            <p className="mt-3 text-white/30 text-sm">
              {tItems.pricePerLevel}: <span className="text-[#FFD43A] font-semibold">{item.price} 🪙</span>
              &nbsp;·&nbsp; {tItems.totalMax}: <span className="text-[#FFD43A] font-semibold">{item.price * 4} 🪙</span>
            </p>
          </div>
        </div>

        {/* Stats — level blocks */}
        <section className="mb-10">
          <h2 className="font-lilita text-2xl text-white mb-4">{tItems.stats}</h2>
          <div className="flex flex-col gap-4">
            {LEVELS.map((lvl) => {
              const lvlColor = levelColors[lvl];
              return (
                <div
                  key={lvl}
                  className="rounded-2xl border bg-black/40 backdrop-blur-sm overflow-hidden"
                  style={{ borderColor: `${lvlColor}33` }}
                >
                  <div className="px-5 py-2 text-sm font-bold tracking-wide border-b border-white/5" style={{ color: lvlColor, background: `${lvlColor}11` }}>
                    {tItems.level} {lvl}
                  </div>
                  <div className="flex items-center gap-6 p-5">
                    <div className="shrink-0">
                      <ItemIcon image={item.image} frame={item.frame} level={lvl} size={80} />
                    </div>
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1.5">
                      {item.stats.map((stat) => {
                        const val = stat.values[lvl - 1];
                        const isEmpty = val === 0 || val === '0' || val === '' || val == null;
                        const prevVal = lvl > 1 ? stat.values[lvl - 2] : null;
                        const isNew = lvl > 1 && !isEmpty && (prevVal === 0 || prevVal === '0' || prevVal === '' || prevVal == null);
                        return (
                          <div key={stat.label} className="flex items-center justify-between gap-2">
                            <span className="text-white/40 text-sm">{stat.label}</span>
                            <span className="font-mono font-semibold text-sm" style={{ color: isEmpty ? 'rgba(255,255,255,0.15)' : isNew ? '#4ade80' : lvl === 4 ? '#FFD43A' : 'rgba(255,255,255,0.85)' }}>
                              {isEmpty ? '—' : val}
                              {isNew && <span className="ml-1 text-xs text-green-400/70">{tItems.newStat}</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Why Use */}
        {whyUse && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-3">{tItems.whyUse.replace('{name}', item.name)}</h2>
            <p className="text-white/60 leading-relaxed">{whyUse}</p>
          </section>
        )}

        {/* Unique Effect */}
        {uniqueEffect && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-3">{tItems.uniqueEffect}</h2>
            <div className="rounded-2xl bg-black/40 border border-[#FFD43A]/20 p-5">
              <p className="text-white/60 leading-relaxed">{uniqueEffect}</p>
            </div>
          </section>
        )}

        {/* Best Heroes */}
        {item.bestHeroes.length > 0 && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-4">{tItems.bestHeroes.replace('{name}', item.name)}</h2>
            <div className="flex flex-col gap-3">
              {item.bestHeroes.map((h) => {
                const heroData = heroes.find((hero) => hero.id === h.heroId);
                const reason = content.bestHeroes?.[h.heroId] ?? h.reason;
                return (
                  <Link
                    key={h.heroId}
                    href={`/${lang}/wiki/heroes/${h.heroId}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                  >
                    <div
                      className="shrink-0 w-12 h-12 rounded-full overflow-hidden"
                      style={{
                        background: heroData ? `radial-gradient(circle, ${heroData.color}44, ${heroData.color}11)` : '#ffffff11',
                        border: heroData ? `2px solid ${heroData.color}55` : '2px solid #ffffff22',
                      }}
                    >
                      {heroData?.avatar ? (
                        <Image src={heroData.avatar} alt={h.name} width={48} height={48} className="object-cover w-full h-full scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white/40">
                          {h.name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-0.5 group-hover:brightness-125 transition-all" style={{ color: heroData?.color ?? '#FFD43A' }}>
                        {h.name}
                      </div>
                      <div className="text-white/50 text-sm leading-relaxed">{reason}</div>
                    </div>
                    <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Counter Heroes */}
        {item.counterHeroes.length > 0 && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-4">{tItems.counterHeroes}</h2>
            <div className="flex flex-col gap-3">
              {item.counterHeroes.map((h) => {
                const heroData = heroes.find((hero) => hero.id === h.heroId);
                const reason = content.counterHeroes?.[h.heroId] ?? h.reason;
                return (
                  <Link
                    key={h.heroId}
                    href={`/${lang}/wiki/heroes/${h.heroId}`}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 transition-colors group"
                  >
                    <div
                      className="shrink-0 w-12 h-12 rounded-full overflow-hidden"
                      style={{
                        background: heroData ? `radial-gradient(circle, ${heroData.color}44, ${heroData.color}11)` : '#ffffff11',
                        border: heroData ? `2px solid ${heroData.color}55` : '2px solid #ffffff22',
                      }}
                    >
                      {heroData?.avatar ? (
                        <Image src={heroData.avatar} alt={h.name} width={48} height={48} className="object-cover w-full h-full scale-110" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg font-bold text-white/40">{h.name.charAt(0)}</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm mb-0.5 text-red-400 group-hover:brightness-125 transition-all">{h.name}</div>
                      <div className="text-white/50 text-sm leading-relaxed">{reason}</div>
                    </div>
                    <span className="text-white/20 group-hover:text-white/50 transition-colors text-lg">→</span>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {/* Strengths & Weaknesses */}
        {(strengths.length > 0 || weaknesses.length > 0) && (
          <section className="mb-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {strengths.length > 0 && (
                <div className="rounded-2xl bg-black/40 border border-green-500/20 p-5">
                  <h2 className="font-lilita text-xl text-green-400 mb-3">{tItems.strengths}</h2>
                  <ul className="flex flex-col gap-2">
                    {strengths.map((s, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-green-400 mt-0.5">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {weaknesses.length > 0 && (
                <div className="rounded-2xl bg-black/40 border border-red-500/20 p-5">
                  <h2 className="font-lilita text-xl text-red-400 mb-3">{tItems.weaknesses}</h2>
                  <ul className="flex flex-col gap-2">
                    {weaknesses.map((w, i) => (
                      <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                        <span className="text-red-400 mt-0.5">✗</span>
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Tips & Tricks */}
        {tips.length > 0 && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-4">{tItems.tipsAndTricks}</h2>
            <ul className="flex flex-col gap-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60 text-sm leading-relaxed">
                  <span className="text-[#FFD43A] font-bold mt-0.5">{i + 1}.</span>
                  {tip}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        {faq.length > 0 && (
          <section className="mb-10">
            <h2 className="font-lilita text-2xl text-white mb-4">{tItems.faq}</h2>
            <div className="flex flex-col gap-4">
              {faq.map((entry, i) => (
                <div key={i} className="rounded-2xl bg-black/40 border border-white/10 p-5">
                  <p className="text-white font-semibold text-sm mb-2">{entry.q}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{entry.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Related items */}
        {related.length > 0 && (
          <section>
            <h2 className="font-lilita text-xl text-white/50 mb-4">
              {tItems.moreItems.replace('{category}', item.category)}
            </h2>
            <div className="flex flex-wrap gap-4">
              {related.map((rel) => (
                <Link key={rel.id} href={`/${lang}/wiki/items/${rel.id}`} className="group flex flex-col items-center gap-1.5" title={rel.name}>
                  <div className="transition-transform group-hover:scale-110">
                    <ItemIcon image={rel.image} frame={rel.frame} level={1} size={48} />
                  </div>
                  <span className="text-xs text-white/40 group-hover:text-white/70 transition-colors text-center w-16 leading-tight line-clamp-2">
                    {rel.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
