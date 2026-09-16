import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  Plane,
  ShieldCheck,
  AlertTriangle,
  ChevronRight,
  Lock,
} from 'lucide-react';
import { getAllPortWalkthroughs } from '@/lib/ports';
import { Locale, SUBPATH_LOCALES, getHreflangAlternates, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import AirportClearanceWidget from '@/components/tools/AirportClearanceWidget';

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
  const alternates = getHreflangAlternates('/guide/port-clearance-walkthrough', locale);

  return {
    title: dict.meta.airportsTitle,
    description: dict.meta.airportsDesc,
    alternates,
    openGraph: {
      title: dict.meta.airportsTitle,
      description: dict.meta.airportsDesc,
      url: alternates.canonical,
      siteName: 'ChinaMedsCheck',
      type: 'article',
    },
  };
}

export default function LocalizedPortClearanceWalkthroughPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const ports = getAllPortWalkthroughs();
  const alternates = getHreflangAlternates('/guide/port-clearance-walkthrough', locale);
  const locHref = (path: string) => getLocalizedPath(path, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: dict.meta.airportsTitle,
    description: dict.meta.airportsDesc,
    url: alternates.canonical,
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={locHref('/')} className="hover:text-slate-900 transition">
            {dict.nav.radar}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">{dict.nav.airports}</span>
        </nav>

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1 shrink-0 whitespace-nowrap">
            <Plane className="h-3.5 w-3.5 text-blue-600" />
            <span>{dict.nav.airportGuideBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {dict.meta.airportsTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {dict.meta.airportsDesc}
          </p>
        </div>

        {/* Critical Yellow Seal Alert */}
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-300 text-amber-950 flex flex-col sm:flex-row items-start gap-4 shadow-xs">
          <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800 shrink-0">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-amber-900 mb-0.5">
              {locale === 'ja' && '手荷物の「黄色い税関電子ロック」にご注意ください'}
              {locale === 'ko' && '수하물에 부착된 「황색 세관 전자 자물쇠」 주의'}
              {locale === 'ru' && 'Внимание: желтые электронные пломбы на багаже'}
              {locale === 'vi' && 'Cảnh báo khóa niêm phong điện tử màu vàng của hải quan'}
            </h3>
            <p className="text-xs text-amber-800 leading-relaxed">
              {locale === 'ja' && '上海浦東や北京首都空港では、ターンテーブル前のCT検査で疑わしい荷物に黄色い税关ロックが装着されます。破断せずにそのまま赤色通路へ進んでください。'}
              {locale === 'ko' && '상하이 푸둥, 베이징 공항은 위탁수하물 자동 사전검사에서 의심 품목 발견 시 전자 자물쇠를 부착합니다. 훼손하지 말고 즉시 적색통로로 이동하세요.'}
              {locale === 'ru' && 'В аэропортах Шанхая и Пекина подозрительный багаж пломбируется желтыми замками еще до выдачи. Не вскрывайте пломбу, сразу идите в Красный коридор.'}
              {locale === 'vi' && 'Tại Phố Đông và Bắc Kinh, hành lý nghi vấn sẽ bị gắn khóa niêm phong điện tử màu vàng. Không được tự ý phá khóa, hãy đi thẳng vào Luồng Đỏ.'}
            </p>
          </div>
        </div>

        {/* Interactive Airport Tabs & Timeline Component */}
        <AirportClearanceWidget ports={ports} locale={locale} />
      </div>
    </div>
  );
}
