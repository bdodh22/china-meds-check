import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Luggage,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Plane,
  FileText,
  CheckCircle2,
  AlertOctagon,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import TravelBagWidget from '@/components/tools/TravelBagWidget';
import { Locale, SUBPATH_LOCALES, getHreflangAlternates, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export function generateStaticParams() {
  return SUBPATH_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) return {};

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/manifest', locale);

  return {
    title: dict.meta.manifestTitle,
    description: dict.meta.manifestDesc,
    alternates,
    openGraph: {
      title: dict.meta.manifestTitle,
      description: dict.meta.manifestDesc,
      url: alternates.canonical,
      type: 'website',
    },
  };
}

export default function LocalizedManifestPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/manifest', locale);
  const locHref = (path: string) => getLocalizedPath(path, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.meta.manifestTitle,
    operatingSystem: 'Any',
    applicationCategory: 'TravelApplication, HealthApplication',
    url: alternates.canonical,
    description: dict.meta.manifestDesc,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shrink-0 whitespace-nowrap">
            <Luggage className="h-3.5 w-3.5" />
            <span>{dict.bagWidget.radarBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {dict.manifest.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {dict.manifest.subtitle}
          </p>
        </div>

        {/* Baggage Manifest Interactive Widget */}
        <TravelBagWidget locale={locale} />

        {/* 3 Baggage Clearance Rules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.manifest.alertPrecursor}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.manifest.alertPrecursorText}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Plane className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.manifest.alertSyringe}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.manifest.alertSyringeText}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {locale === 'ja' && '税関提出用申告カード'}
              {locale === 'ko' && '세관 제출용 신고 카드'}
              {locale === 'ru' && 'Таможенная карта пассажира'}
              {locale === 'vi' && 'Thẻ khai báo hải quan'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              {locale === 'ja' && '登録した手荷物薬品をそのまま日中二言語の税関申告カードとして出力可能。'}
              {locale === 'ko' && '점검표에 등록된 약품을 한중 이중언어 공식 세관신고서로 즉시 출력할 수 있습니다.'}
              {locale === 'ru' && 'Экспорт перечня лекарств в официальный двуязычный бланк для таможенников.'}
              {locale === 'vi' && 'Xuất danh mục thuốc trực tiếp sang phiếu khai báo song ngữ cho hải quan.'}
            </p>
            <Link
              href={locHref('/customs-card')}
              className="text-xs font-semibold text-purple-600 hover:text-purple-700 inline-flex items-center gap-1"
            >
              <span>{locale === 'ja' ? '申告カードを作成' : locale === 'ko' ? '신고서 생성' : locale === 'ru' ? 'Перейти к карте' : 'Tạo thẻ ngay'}</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
