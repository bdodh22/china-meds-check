import React from 'react';
import { notFound } from 'next/navigation';
import { SUBPATH_LOCALES, Locale } from '@/lib/i18n/config';

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

  return (
    <div data-locale={locale} className="w-full">
      {children}
    </div>
  );
}


