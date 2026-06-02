import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/config';
import { heroes } from '@/data/heroes';
import { items } from '@/data/items';
import { articles } from '@/data/articles';

const BASE = 'https://spelltroum.com';

type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';

function entry(
  path: string,
  changeFrequency: ChangeFreq = 'weekly',
  priority = 0.7,
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((l) => [l, `${BASE}/${l}${path.replace(/^\/[a-z]{2}/, '')}`])
      ),
    },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const urls: MetadataRoute.Sitemap = [];

  for (const lang of locales) {
    // Home
    urls.push({
      url: `${BASE}/${lang}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: lang === 'en' ? 1.0 : 0.9,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}`])),
      },
    });

    // Static pages
    for (const page of ['wiki', 'faq', 'articles']) {
      urls.push({
        url: `${BASE}/${lang}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFreq,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/${page}`])),
        },
      });
    }

    // Wiki sub-pages
    for (const page of ['heroes', 'items', 'game-mechanics']) {
      urls.push({
        url: `${BASE}/${lang}/wiki/${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as ChangeFreq,
        priority: 0.8,
        alternates: {
          languages: Object.fromEntries(locales.map((l) => [l, `${BASE}/${l}/wiki/${page}`])),
        },
      });
    }

    // Hero pages
    for (const hero of heroes) {
      urls.push({
        url: `${BASE}/${lang}/wiki/heroes/${hero.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFreq,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/wiki/heroes/${hero.id}`])
          ),
        },
      });
    }

    // Item pages
    for (const item of items) {
      urls.push({
        url: `${BASE}/${lang}/wiki/items/${item.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as ChangeFreq,
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/wiki/items/${item.id}`])
          ),
        },
      });
    }

    // Article pages
    for (const article of articles) {
      urls.push({
        url: `${BASE}/${lang}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt ?? article.publishedAt),
        changeFrequency: 'monthly' as ChangeFreq,
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE}/${l}/articles/${article.slug}`])
          ),
        },
      });
    }
  }

  return urls;
}
