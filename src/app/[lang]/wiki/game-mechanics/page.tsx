import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { isValidLocale } from '@/i18n/config';
import { getArticleBySlug } from '@/data/articles';
import { type ArticleSection } from '@/data/articles';

interface MechanicsPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const article = getArticleBySlug('game-mechanics');
  if (!article) return {};
  return {
    title: `${article.title} | Spelltroum`,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  };
}

function renderSection(section: ArticleSection, idx: number) {
  switch (section.type) {
    case 'h2':
      return (
        <h2 key={idx} className="font-lilita text-2xl sm:text-3xl text-white mt-10 mb-4">
          {section.content}
        </h2>
      );
    case 'h3':
      return (
        <h3 key={idx} className="font-lilita text-xl text-white/90 mt-6 mb-3">
          {section.content}
        </h3>
      );
    case 'p':
      return (
        <p key={idx} className="text-white/65 leading-relaxed mb-4">
          {section.content}
        </p>
      );
    case 'ul':
      return (
        <ul key={idx} className="flex flex-col gap-1.5 mb-4 pl-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-white/65 text-sm leading-relaxed">
              <span className="text-[#FFD43A] mt-0.5 shrink-0">•</span>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'image':
      return (
        <figure key={idx} className="my-8 rounded-2xl overflow-hidden border border-white/10">
          <Image
            src={section.src!}
            alt={section.alt!}
            width={1200}
            height={555}
            className="w-full object-cover"
            priority={idx < 4}
          />
          {section.caption && (
            <figcaption className="px-4 py-2.5 text-white/40 text-xs text-center bg-black/40">
              {section.caption}
            </figcaption>
          )}
        </figure>
      );
    case 'faq':
      return (
        <div key={idx} className="flex flex-col gap-4 mt-2">
          {section.faqItems?.map((item, i) => (
            <div key={i} className="rounded-2xl bg-black/40 border border-white/10 p-5">
              <p className="text-white font-semibold text-sm mb-2">{item.q}</p>
              <p className="text-white/55 text-sm leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      );
    default:
      return null;
  }
}

export default async function MechanicsPage({ params }: MechanicsPageProps) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const article = getArticleBySlug('game-mechanics');
  if (!article) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    author: { '@type': 'Organization', name: 'Spelltroum' },
    publisher: { '@type': 'Organization', name: 'Spelltroum' },
    image: `https://spelltroum.com/articles/game-mechanics/roundpreviw.jpg`,
    mainEntity: article.sections
      .filter((s) => s.type === 'faq')
      .flatMap((s) =>
        (s.faqItems ?? []).map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        }))
      ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen px-4 sm:px-6 py-16">
        <div className="max-w-3xl mx-auto">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-white/40 mb-8">
            <Link href={`/${lang}/wiki`} className="hover:text-white/70 transition-colors">Wiki</Link>
            <span>/</span>
            <span className="text-white/60">Game Mechanics</span>
          </div>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#c084fc]/15 text-[#c084fc] border border-[#c084fc]/30 font-semibold">
                Guide
              </span>
              <span className="text-white/30 text-xs">{article.readingTimeMin} min read</span>
              <span className="text-white/30 text-xs">·</span>
              <time className="text-white/30 text-xs" dateTime={article.publishedAt}>
                {new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h1 className="font-lilita text-4xl sm:text-5xl text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              {article.description}
            </p>
          </header>

          {/* Article body */}
          <article>
            {article.sections.map((section, idx) => renderSection(section, idx))}
          </article>

          {/* Back link */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <Link
              href={`/${lang}/wiki`}
              className="inline-flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm"
            >
              ← Back to Wiki
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
