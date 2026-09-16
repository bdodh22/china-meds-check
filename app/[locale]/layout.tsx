import React from 'react';
import { notFound } from 'next/navigation';
import { SUBPATH_LOCALES, Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { DictionaryProvider } from '@/lib/i18n/DictionaryContext';

export function generateStaticParams() {
  return SUBPATH_LOCALES.map((locale) => ({ locale }));
}

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;

  if (!SUBPATH_LOCALES.includes(locale as Locale)) {
    notFound();
  }

  const validLocale = locale as Locale;
  const dict = getDictionary(validLocale);

  return (
    <DictionaryProvider locale={validLocale} dict={dict}>
      <div data-locale={locale} className="w-full">
        {children}
      </div>
    </DictionaryProvider>
  );
}

