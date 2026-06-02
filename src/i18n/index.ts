import { Locale } from './config';

export async function getTranslations(lang: Locale) {
  const translations = await import(`./translations/${lang}.json`);
  return translations.default as Record<string, Record<string, string>>;
}

export type Translations = Awaited<ReturnType<typeof getTranslations>>;
