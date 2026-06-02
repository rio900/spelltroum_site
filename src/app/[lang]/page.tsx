import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { locales, isValidLocale, type Locale } from '@/i18n/config';
import { getTranslations } from '@/i18n';
import { notFound } from 'next/navigation';

interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const t = await getTranslations(lang);
  const h = t.home;

  const localeMap: Record<Locale, string> = {
    en: 'en_US', fr: 'fr_FR', de: 'de_DE', pt: 'pt_BR', es: 'es_MX', uk: 'uk_UA',
  };

  return {
    title: h.metaTitle,
    description: h.metaDescription,
    keywords: [
      'Spelltroum', 'mobile arena game', 'multiplayer battle arena', 'mobile MOBA',
      'hero game mobile', 'free mobile game', 'arena game iOS Android',
    ],
    alternates: {
      canonical: `https://spelltroum.com/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}`])),
    },
    openGraph: {
      title: h.metaTitle,
      description: h.metaDescription,
      url: `https://spelltroum.com/${lang}`,
      siteName: 'Spelltroum',
      locale: localeMap[lang as Locale],
      type: 'website',
      images: [{ url: '/spelltroum-main.png', width: 1200, height: 630, alt: 'Spelltroum' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: h.metaTitle,
      description: h.metaDescription,
    },
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const t = await getTranslations(lang);
  const h = t.home;

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      { '@type': 'Question', name: h.faqQ1, acceptedAnswer: { '@type': 'Answer', text: h.faqA1 } },
      { '@type': 'Question', name: h.faqQ2, acceptedAnswer: { '@type': 'Answer', text: h.faqA2 } },
      { '@type': 'Question', name: h.faqQ3, acceptedAnswer: { '@type': 'Answer', text: h.faqA3 } },
      { '@type': 'Question', name: h.faqQ4, acceptedAnswer: { '@type': 'Answer', text: h.faqA4 } },
      { '@type': 'Question', name: h.faqQ5, acceptedAnswer: { '@type': 'Answer', text: h.faqA5 } },
    ],
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Spelltroum',
    description: h.metaDescription,
    url: 'https://spelltroum.com',
    applicationCategory: 'Game',
    operatingSystem: 'iOS, Android',
    genre: ['Multiplayer', 'Action', 'Battle Arena'],
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 4 },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', availability: 'https://schema.org/InStock' },
    author: { '@type': 'Person', name: 'Roman Samchuk' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Hero Section */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
        style={{ backgroundImage: "url('/Map2.webp')" }}
      >
        {/* Fireflies */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0,1,2,3,4].map(i => <div key={i} className="firefly" />)}
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 mt-20">
          <div className="max-w-4xl mx-auto text-center flex flex-col items-center space-y-10">

            <Image
              src="/spelltroum-main.png"
              alt="Spelltroum Logo"
              width={1000}
              height={600}
              priority
              sizes="(max-width: 640px) 80vw, 900px"
              className="w-auto h-auto max-w-[80%] sm:max-w-[900px] mx-auto"
            />

            <h1 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
              {h.heroHeadline}
            </h1>

            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed max-w-2xl mx-auto">
              {h.heroSubtitle}
            </p>

            {/* Stats bar */}
            <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center">
              {[
                { label: h.heroCount, icon: '⚔️' },
                { label: h.itemCount, icon: '🛡️' },
                { label: h.freeToPlay, icon: '🎮' },
              ].map(({ label, icon }) => (
                <div key={label} className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-semibold">
                  <span>{icon}</span>
                  <span className="text-[#FFD43A]">{label}</span>
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-row gap-4 items-center justify-center flex-wrap">
              <a
                href="https://orvjl.app.link/reddit"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-80 hover:scale-105"
              >
                <Image
                  src="/store-ios.png"
                  alt="Download on the App Store"
                  width={270}
                  height={90}
                  className="h-[56px] w-auto"
                />
              </a>
              <a
                href="https://orvjl.app.link/reddit"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:opacity-80 hover:scale-105"
              >
                <Image
                  src="/store-android.png"
                  alt="Get it on Google Play"
                  width={270}
                  height={90}
                  className="h-[56px] w-auto"
                />
              </a>
            </div>

            {/* YouTube embed */}
            <div className="w-full bg-black/40 backdrop-blur-sm p-4 rounded-2xl shadow-xl mb-[50px]">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute inset-0 w-full h-full rounded-xl"
                  src={`https://www.youtube-nocookie.com/embed/${h.youtubeId}`}
                  title="Spelltroum gameplay"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Feature 1 — Team Up */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
        style={{ backgroundImage: "url('/Map0.webp')" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0,1,2,3,4].map(i => <div key={i} className="firefly" />)}
        </div>
        <div className="w-full px-4 sm:px-6 md:px-10 py-20">
          <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur-sm px-6 sm:px-10 py-10 rounded-3xl shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 flex justify-center">
                <Image
                  src="/teamup-phone.webp"
                  alt="Spelltroum hero team gameplay"
                  width={900}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto rounded-3xl shadow-xl max-w-md"
                />
              </div>
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 leading-tight">
                  {h.feature1Title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  {h.feature1Desc}
                </p>
                <Link
                  href={`/${lang}/wiki/heroes`}
                  className="inline-flex items-center mt-6 text-[#FFD43A] hover:text-yellow-300 font-semibold transition"
                >
                  {t.heroes.title} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2 — Items */}
      <section
        className="relative w-full min-h-screen flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
        style={{ backgroundImage: "url('/Map3.webp')" }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[0,1,2,3,4].map(i => <div key={i} className="firefly" />)}
        </div>
        <div className="w-full px-4 sm:px-6 md:px-10 py-20">
          <div className="max-w-6xl mx-auto bg-black/50 backdrop-blur-sm px-6 sm:px-10 py-10 rounded-3xl shadow-2xl">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-4 leading-tight">
                  {h.feature2Title}
                </h2>
                <p className="text-lg sm:text-xl text-gray-200 leading-relaxed">
                  {h.feature2Desc}
                </p>
                <Link
                  href={`/${lang}/wiki/items`}
                  className="inline-flex items-center mt-6 text-[#FFD43A] hover:text-yellow-300 font-semibold transition"
                >
                  {t.items.title} →
                </Link>
              </div>
              <div className="w-full lg:w-1/2 flex justify-center">
                <Image
                  src="/spelltroum-items.webp"
                  alt="Spelltroum items and equipment"
                  width={900}
                  height={600}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="w-full h-auto rounded-3xl shadow-xl max-w-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 — Master the Arena */}
      <section
        className="relative w-full min-h-[60vh] flex items-center justify-center text-white bg-cover bg-center overflow-x-hidden"
        style={{ backgroundImage: "url('/Map2.webp')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 py-20">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-lilita text-4xl sm:text-5xl text-[#FFD43A] drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] mb-6">
              {h.feature3Title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-200 leading-relaxed mb-8">
              {h.feature3Desc}
            </p>
            <Link
              href={`/${lang}/wiki/game-mechanics`}
              className="inline-flex items-center justify-center font-semibold text-white/80 hover:text-white border border-white/20 hover:border-white/50 transition px-8 py-4 rounded-2xl"
            >
              {t.wiki.mechanics} →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full bg-black/30 text-gray-200 py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-lilita text-4xl text-[#FFD43A] text-center mb-10">
            {h.faqSectionTitle}
          </h2>
          <div className="flex flex-col gap-4">
            {[
              { q: h.faqQ1, a: h.faqA1 },
              { q: h.faqQ2, a: h.faqA2 },
              { q: h.faqQ3, a: h.faqA3 },
              { q: h.faqQ4, a: h.faqA4 },
              { q: h.faqQ5, a: h.faqA5 },
            ].map(({ q, a }) => (
              <div key={q} className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-5">
                <p className="font-semibold text-white mb-2">{q}</p>
                <p className="text-white/60 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href={`/${lang}/faq`}
              className="inline-flex items-center text-[#FFD43A] hover:text-yellow-300 font-semibold transition"
            >
              {h.faqSeeAll} →
            </Link>
          </div>
        </div>
      </section>

      {/* Discord / Community */}
      <section className="w-full bg-[#1F1728]/80 backdrop-blur-sm text-gray-200 py-20 px-6">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-8">
          <h2 className="font-lilita text-4xl text-[#FFD43A]">
            {h.discordTitle}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed">
            {h.discordDesc}
          </p>
          <div className="flex flex-row gap-4 flex-wrap justify-center">
            <a
              href="https://discord.com/invite/Tk7pxkJBUq"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#5965F2] hover:bg-[#4752C4] transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              <Image src="/white-discord.png" alt="Discord" width={24} height={24} className="mr-3" />
              {h.discordButton}
            </a>
            <a
              href="https://www.tiktok.com/@spelltroum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-black hover:bg-zinc-900 border border-white/20 transition px-6 py-3 rounded-xl text-lg font-semibold shadow-lg"
            >
              <svg className="mr-3" width="22" height="22" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.79 1.52V6.75a4.85 4.85 0 0 1-1.02-.06z"/>
              </svg>
              {h.tiktokButton}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
