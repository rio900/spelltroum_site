import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, locales, type Locale } from '@/i18n/config';
import { getFaqContent } from '@/data/content';
import FaqAccordion from '@/components/faq/FaqAccordion';
import Image from 'next/image';

interface FaqPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: FaqPageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!isValidLocale(lang)) return {};
  const content = await getFaqContent(lang as Locale);
  return {
    title: content.meta.title,
    description: content.meta.description,
    keywords: [
      'Spelltroum FAQ',
      'Spelltroum free to play',
      'mobile MOBA game',
      'is Spelltroum pay to win',
      'Spelltroum heroes unlock',
      'Spelltroum items',
      'fast mobile multiplayer game',
      'Spelltroum gameplay',
    ],
    alternates: {
      canonical: `https://spelltroum.com/${lang}/faq`,
      languages: Object.fromEntries(locales.map((l) => [l, `https://spelltroum.com/${l}/faq`])),
    },
    openGraph: {
      title: content.meta.ogTitle,
      description: content.meta.ogDescription,
      url: `https://spelltroum.com/${lang}/faq`,
    },
  };
}

export default async function FaqPage({ params }: FaqPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const content = await getFaqContent(lang as Locale);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.sections.flatMap((s) =>
      s.items.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      }))
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="min-h-screen px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="font-lilita text-5xl sm:text-6xl text-[#FFD43A] drop-shadow-[0_2px_8px_rgba(255,212,58,0.4)] mb-3">
              {content.heading}
            </h1>
            <p className="text-white/50 text-lg max-w-xl mx-auto">
              {content.subheading}
            </p>
          </div>

          {/* Sections */}
          <div className="flex flex-col gap-12">
            {content.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-lilita text-2xl text-white/80 mb-4 pb-2 border-b border-white/10">
                  {section.heading}
                </h2>
                <FaqAccordion items={section.items} />
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-14 p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-sm text-center">
            <p className="text-white/50 text-sm mb-4">{content.ctaText}</p>
            <a
              href="https://discord.gg/spelltroum"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold text-sm transition-colors"
            >
              <Image src="/white-discord.png" alt="Discord" width={20} height={20} />
              {content.ctaButton}
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
