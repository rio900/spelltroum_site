export const locales = ['en', 'fr', 'de', 'pt', 'es', 'uk'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeLabels: Record<Locale, string> = {
  'en': 'English',
  'fr': 'Français',
  'de': 'Deutsch',
  'pt': 'Português',
  'es': 'Español',
  'uk': 'Українська',
};

export const localeFlags: Record<Locale, string> = {
  'en': '🇬🇧',
  'fr': '🇫🇷',
  'de': '🇩🇪',
  'pt': '🇧🇷',
  'es': '🇲🇽',
  'uk': '🇺🇦',
};

export function isValidLocale(lang: string): lang is Locale {
  return locales.includes(lang as Locale);
}
