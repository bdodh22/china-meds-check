import enDict from '@/messages/en.json';
import jaDict from '@/messages/ja.json';
import koDict from '@/messages/ko.json';
import ruDict from '@/messages/ru.json';
import viDict from '@/messages/vi.json';
import { Locale } from './config';

export type Dictionary = typeof enDict;

// 静态字典映射表（保障现有客户端组件与 SSG 预渲染同步调用 100% 兼容）
const staticDictionaries: Record<Locale, Dictionary> = {
  en: enDict,
  ja: jaDict,
  ko: koDict,
  ru: ruDict,
  vi: viDict,
};

// 内存单例缓存
const dictionaryCache = new Map<Locale, Dictionary>();

/**
 * 同步获取指定语言字典（带单例缓存）
 */
export function getDictionary(locale: Locale): Dictionary {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }
  const dict = staticDictionaries[locale] || staticDictionaries.en;
  dictionaryCache.set(locale, dict);
  return dict;
}

/**
 * 动态按需加载字典映射（支持代码分割，避免在独立路由加载无关语言包）
 */
const dynamicLoaders: Record<Locale, () => Promise<{ default: Dictionary }>> = {
  en: () => import('@/messages/en.json'),
  ja: () => import('@/messages/ja.json'),
  ko: () => import('@/messages/ko.json'),
  ru: () => import('@/messages/ru.json'),
  vi: () => import('@/messages/vi.json'),
};

/**
 * 异步动态按需获取指定语言字典
 * 用于服务端组件 (RSC) 或 API 路由，仅加载目标语言，杜绝无关语言包常驻
 */
export async function getDictionaryAsync(locale: Locale): Promise<Dictionary> {
  if (dictionaryCache.has(locale)) {
    return dictionaryCache.get(locale)!;
  }
  const loader = dynamicLoaders[locale] || dynamicLoaders.en;
  const mod = await loader();
  const dict = mod.default;
  dictionaryCache.set(locale, dict);
  return dict;
}

