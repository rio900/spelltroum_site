import { Locale, isValidLocale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { heroes, rarityColors, rarityLabels, roleLabels } from '@/data/heroes';

interface HeroesPageProps {
  params: Promise<{ lang: string }>;
}

export default async function HeroesPage({ params }: HeroesPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const t = await getTranslations(lang as Locale);

  return (
    <div className="min-h-screen px-4 sm:px-6 py-16">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-4">
          <Link
            href={`/${lang}/wiki`}
            className="text-white/40 hover:text-white/70 text-sm transition-colors inline-flex items-center gap-1"
          >
            ← Wiki
          </Link>
        </div>
        <div className="text-center mb-12">
          <h1 className="font-lilita text-5xl sm:text-6xl text-[#FFD43A] drop-shadow-[0_2px_8px_rgba(255,212,58,0.4)] mb-3">
            {t.heroes.title}
          </h1>
          <p className="text-white/50 text-lg">{t.heroes.subtitle}</p>
        </div>

        {/* Hero grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {heroes.map((hero) => (
            <Link
              key={hero.id}
              href={`/${lang}/wiki/heroes/${hero.id}`}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:border-white/30 flex flex-col"
              style={{ '--hero-color': hero.color } as React.CSSProperties}
            >
              {/* Avatar area */}
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: `radial-gradient(ellipse at center, ${hero.color}18 0%, transparent 70%)` }}
              >
                <div
                  className="relative w-24 h-24 rounded-full flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${hero.color}55, ${hero.color}22)`,
                    border: `2px solid ${hero.color}55`,
                    boxShadow: `0 0 20px ${hero.color}33`,
                  }}
                >
                  {hero.avatar ? (
                    <Image
                      src={hero.avatar}
                      alt={hero.name}
                      width={96}
                      height={96}
                      className="object-cover w-full h-full scale-110"
                    />
                  ) : (
                    <span className="text-3xl font-bold" style={{ color: hero.color }}>
                      {hero.name.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              {/* Info */}
              <div className="p-3 flex flex-col gap-1.5">
                <h3
                  className="font-lilita text-base leading-tight"
                  style={{ color: hero.color }}
                >
                  {hero.name}
                </h3>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{ background: `${rarityColors[hero.rarity]}22`, color: rarityColors[hero.rarity], border: `1px solid ${rarityColors[hero.rarity]}44` }}
                  >
                    {t.heroes[`rarity${hero.rarity.charAt(0).toUpperCase() + hero.rarity.slice(1)}` as keyof typeof t.heroes] ?? rarityLabels[hero.rarity]}
                  </span>
                  <span className="text-xs text-white/40">{t.heroes[`role${hero.role.charAt(0).toUpperCase() + hero.role.slice(1)}` as keyof typeof t.heroes] ?? roleLabels[hero.role]}</span>
                </div>
              </div>

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: `linear-gradient(to top, ${hero.color}18, transparent)` }}
              />
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
