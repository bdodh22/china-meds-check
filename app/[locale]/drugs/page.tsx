import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Database, Luggage, FileText, ArrowRight, ShieldAlert } from 'lucide-react';
import DrugFilterConsole from '@/components/tools/DrugFilterConsole';
import { getAllMedications } from '@/lib/medications';
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
  const alternates = getHreflangAlternates('/drugs', locale);

  return {
    title: dict.meta.drugsTitle,
    description: dict.meta.drugsDesc,
    alternates,
    openGraph: {
      title: dict.meta.drugsTitle,
      description: dict.meta.drugsDesc,
      url: alternates.canonical,
      type: 'website',
    },
  };
}

export default function LocalizedDrugsDirectoryPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const allMeds = getAllMedications();
  const alternates = getHreflangAlternates('/drugs', locale);
  const locHref = (path: string) => getLocalizedPath(path, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: dict.meta.drugsTitle,
    description: dict.meta.drugsDesc,
    numberOfItems: allMeds.length,
    itemListElement: allMeds.map((med, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${med.brandNames[0]} (${med.chineseName})`,
      url: `https://chinamedscheck.com/${locale}/drugs/${med.slug}`,
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Database className="h-3.5 w-3.5 text-blue-600" />
            <span>Port Control Console & Drug Database</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            {dict.drugs.catalogTitle}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {dict.drugs.catalogSubtitle}
          </p>
        </div>

        {/* Console & Filter Component */}
        <DrugFilterConsole initialMedications={allMeds} />

        {/* Quick Action Navigation */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-200">
          <Link
            href={locHref('/manifest')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Luggage className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{dict.nav.bag}</h4>
                <p className="text-xs text-slate-500">
                  {locale === 'ja' && '複数薬品の重複・限度額を一括点検'}
                  {locale === 'ko' && '복수 약품의 중복 및 허용량 일괄 점검'}
                  {locale === 'ru' && 'Проверка суммарных лимитов всех лекарств'}
                  {locale === 'vi' && 'Kiểm tra tổng định mức thuốc trong hành lý'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
          </Link>

          <Link
            href={locHref('/customs-card')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 shadow-sm transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{dict.nav.customsCard}</h4>
                <p className="text-xs text-slate-500">
                  {locale === 'ja' && '赤色通路検査官への日中二言語申告書'}
                  {locale === 'ko' && '세관 적색통로 제출용 한중 이중언어 신고서'}
                  {locale === 'ru' && 'Двуязычная декларация для таможни'}
                  {locale === 'vi' && 'Phiếu khai báo song ngữ nộp cho hải quan'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
          </Link>
        </div>
      </div>
    </div>
  );
}
