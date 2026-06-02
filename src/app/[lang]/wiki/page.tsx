import { Locale, isValidLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface WikiPageProps {
  params: Promise<{ lang: string }>;
}

const wikiSections = [
  {
    key: 'heroes',
    href: (lang: string) => `/${lang}/wiki/heroes`,
    icon: '⚔️',
    image: '/avatars/GrizzlyDark.png',
    color: 'from-yellow-500/20 to-orange-500/10',
    border: 'border-yellow-500/30',
    accentColor: '#FFD43A',
  },
  {
    key: 'items',
    href: (lang: string) => `/${lang}/wiki/items`,
    icon: '🛡️',
    image: '/spelltroum-items.png',
    color: 'from-blue-500/20 to-cyan-500/10',
    border: 'border-blue-500/30',
    accentColor: '#60a5fa',
  },
  {
    key: 'mechanics',
    href: (lang: string) => `/${lang}/wiki/game-mechanics`,
    icon: '📖',
    image: null,
    color: 'from-purple-500/20 to-pink-500/10',
    border: 'border-purple-500/30',
    accentColor: '#c084fc',
  },
];

export default async function WikiPage({ params }: WikiPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const t = await getTranslations(lang as Locale);
  const tw = t.wiki;

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="font-lilita text-5xl sm:text-6xl text-[#FFD43A] drop-shadow-[0_2px_8px_rgba(255,212,58,0.4)] mb-4">
            {tw.title}
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            {tw.subtitle}
          </p>
        </div>

        {/* Section cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {wikiSections.map((section) => (
            <Link
              key={section.key}
              href={section.href(lang)}
              className={`group relative overflow-hidden rounded-2xl border ${section.border} bg-gradient-to-br ${section.color} bg-black/40 backdrop-blur-sm p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
              style={{ boxShadow: `0 0 0 0 ${section.accentColor}` }}
            >
              {/* Background image */}
              {section.image && (
                <div className="absolute inset-0 opacity-10 group-hover:opacity-15 transition-opacity">
                  <Image
                    src={section.image}
                    alt=""
                    fill
                    className="object-cover object-center"
                  />
                </div>
              )}

              <div className="relative z-10 flex flex-col gap-3">
                <span className="text-4xl">{section.icon}</span>
                <h2
                  className="font-lilita text-2xl"
                  style={{ color: section.accentColor }}
                >
                  {tw[section.key as keyof typeof tw]}
                </h2>
                <p className="text-white/60 text-sm leading-relaxed">
                  {tw[`${section.key}Desc` as keyof typeof tw]}
                </p>
              </div>

              {/* Arrow */}
              <div className="relative z-10 mt-auto flex justify-end">
                <span className="text-white/30 group-hover:text-white/70 transition-colors text-xl">→</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-16 p-6 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/10">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-4 font-semibold">Popular Heroes</p>
          <div className="flex flex-wrap gap-2">
            {['spitfire','grizzly','faerie','death-slayer','flameweaver','freezi','viverna','mortifier','druid','shadow-fury','spiritmonger','volcarn','stonewarden'].map((hero) => (
              <Link
                key={hero}
                href={`/${lang}/wiki/heroes/${hero}`}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#FFD43A]/10 border border-white/10 hover:border-[#FFD43A]/30 text-white/60 hover:text-[#FFD43A] text-sm transition-all capitalize"
              >
                {hero.replace(/-/g, ' ')}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
