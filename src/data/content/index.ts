import { type Locale } from '@/i18n/config';
import { type ArticleSection } from '@/data/articles';

export interface HeroContent {
  overview?: string;
  playstyle?: string;
  playstyleHighlights?: string[];
  strengths?: string[];
  weaknesses?: string[];
  tips?: string[];
  recommendedBuilds?: { name: string; description: string }[];
  synergies?: Record<string, string>;   // heroId → description
  counters?: Record<string, string>;    // heroId → description
  faq?: { q: string; a: string }[];
  abilities?: Record<string, string>;   // key → translated string
}

export interface ItemContent {
  description?: string;
  whyUse?: string;
  uniqueEffect?: string;
  strengths?: string[];
  weaknesses?: string[];
  tips?: string[];
  bestHeroes?: Record<string, string>;    // heroId → reason
  counterHeroes?: Record<string, string>; // heroId → reason
  faq?: { q: string; a: string }[];
}

async function loadContent<T>(type: 'heroes' | 'items' | 'articles', lang: Locale): Promise<Record<string, T>> {
  try {
    const mod = await import(`./${type}/${lang}.json`);
    return mod.default as Record<string, T>;
  } catch {
    // Fallback to English
    try {
      const mod = await import(`./${type}/en.json`);
      return mod.default as Record<string, T>;
    } catch {
      return {};
    }
  }
}

export async function getHeroContent(heroId: string, lang: Locale): Promise<HeroContent> {
  const all = await loadContent<HeroContent>('heroes', lang);
  const en = await loadContent<HeroContent>('heroes', 'en');
  // Merge: use translated content where available, fall back to en
  return { ...en[heroId], ...all[heroId] };
}

export async function getItemContent(itemId: string, lang: Locale): Promise<ItemContent> {
  const all = await loadContent<ItemContent>('items', lang);
  const en = await loadContent<ItemContent>('items', 'en');
  return { ...en[itemId], ...all[itemId] };
}

export interface FaqSection {
  heading: string;
  items: { q: string; a: string }[];
}

export interface FaqContent {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string };
  heading: string;
  subheading: string;
  ctaText: string;
  ctaButton: string;
  sections: FaqSection[];
}

export async function getFaqContent(lang: Locale): Promise<FaqContent> {
  try {
    const mod = await import(`./faq/${lang}.json`);
    return mod.default as FaqContent;
  } catch {
    const mod = await import('./faq/en.json');
    return mod.default as FaqContent;
  }
}

export interface ArticleContent {
  title?: string;
  description?: string;
  category?: string;
  sections?: ArticleSection[];
}

export async function getArticleContent(slug: string, lang: Locale): Promise<ArticleContent> {
  const all = await loadContent<ArticleContent>('articles', lang);
  const en = await loadContent<ArticleContent>('articles', 'en');
  return { ...en[slug], ...all[slug] };
}
