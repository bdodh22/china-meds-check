export type Locale = 'en' | 'ja' | 'ko' | 'ru' | 'vi';

export const BASE_URL = 'https://chinamedscheck.com';

// Locales that use subpaths (/ja, /ko, /ru, /vi). English remains at the root /
export const SUBPATH_LOCALES: Locale[] = ['ja', 'ko', 'ru', 'vi'];

export const ALL_LOCALES: Locale[] = ['en', 'ja', 'ko', 'ru', 'vi'];

export interface LocaleMeta {
  code: Locale;
  name: string;
  nativeName: string;
  flag: string;
  langTag: string;
  dir: 'ltr' | 'rtl';
}

export const LOCALE_METADATA: Record<Locale, LocaleMeta> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    langTag: 'en-US',
    dir: 'ltr',
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    flag: '🇯🇵',
    langTag: 'ja-JP',
    dir: 'ltr',
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    flag: '🇰🇷',
    langTag: 'ko-KR',
    dir: 'ltr',
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    flag: '🇷🇺',
    langTag: 'ru-RU',
    dir: 'ltr',
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
    langTag: 'vi-VN',
    dir: 'ltr',
  },
};

/**
 * Return the localized path for a given subpath and target locale.
 * Example:
 *   getLocalizedPath('/calculator', 'en') -> '/calculator'
 *   getLocalizedPath('/calculator', 'ja') -> '/ja/calculator'
 *   getLocalizedPath('/ja/calculator', 'ko') -> '/ko/calculator'
 */
export function getLocalizedPath(pathname: string, targetLocale: Locale): string {
  // Strip any existing locale prefix
  let cleanPath = pathname;
  for (const loc of SUBPATH_LOCALES) {
    if (cleanPath === `/${loc}` || cleanPath === `/${loc}/`) {
      cleanPath = '/';
      break;
    } else if (cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.slice(loc.length + 1);
      break;
    }
  }

  if (targetLocale === 'en') {
    return cleanPath === '' ? '/' : cleanPath;
  }

  if (cleanPath === '/' || cleanPath === '') {
    return `/${targetLocale}`;
  }

  return `/${targetLocale}${cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`}`;
}

/**
 * Generate full Google-compliant hreflang alternate links and canonical for any route.
 */
export function getHreflangAlternates(subpath: string, currentLocale: Locale = 'en') {
  // Normalize subpath to ensure no existing locale prefix
  let cleanPath = subpath;
  for (const loc of SUBPATH_LOCALES) {
    if (cleanPath === `/${loc}` || cleanPath === `/${loc}/`) {
      cleanPath = '/';
      break;
    } else if (cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.slice(loc.length + 1);
      break;
    }
  }
  if (!cleanPath.startsWith('/')) {
    cleanPath = `/${cleanPath}`;
  }

  const enUrl = cleanPath === '/' ? BASE_URL : `${BASE_URL}${cleanPath}`;
  const canonicalUrl =
    currentLocale === 'en'
      ? enUrl
      : cleanPath === '/'
      ? `${BASE_URL}/${currentLocale}`
      : `${BASE_URL}/${currentLocale}${cleanPath}`;

  const languages: Record<string, string> = {
    en: enUrl,
    ja: cleanPath === '/' ? `${BASE_URL}/ja` : `${BASE_URL}/ja${cleanPath}`,
    ko: cleanPath === '/' ? `${BASE_URL}/ko` : `${BASE_URL}/ko${cleanPath}`,
    ru: cleanPath === '/' ? `${BASE_URL}/ru` : `${BASE_URL}/ru${cleanPath}`,
    vi: cleanPath === '/' ? `${BASE_URL}/vi` : `${BASE_URL}/vi${cleanPath}`,
    'x-default': enUrl,
  };

  return {
    canonical: canonicalUrl,
    languages,
  };
}
