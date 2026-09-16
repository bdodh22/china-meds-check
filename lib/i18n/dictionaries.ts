import enDict from '@/messages/en.json';
import jaDict from '@/messages/ja.json';
import koDict from '@/messages/ko.json';
import ruDict from '@/messages/ru.json';
import viDict from '@/messages/vi.json';
import { Locale } from './config';

export type Dictionary = typeof enDict;

const dictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  ja: jaDict,
  ko: koDict,
  ru: ruDict,
  vi: viDict,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries.en;
}
