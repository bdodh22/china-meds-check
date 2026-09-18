import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ChevronRight,
  Plane,
  Scale,
  Hospital,
  PackageCheck,
  Quote,
  HelpCircle,
  FileText,
  Luggage,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import DrugSpecSheet from '@/components/tools/DrugSpecSheet';
import DrugInlineCalculator from '@/components/tools/DrugInlineCalculator';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import { getAllMedications, getMedicationBySlug } from '@/lib/medications';
import { Locale, SUBPATH_LOCALES, getHreflangAlternates, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface PageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  const meds = getAllMedications();
  const params: Array<{ locale: string; slug: string }> = [];

  for (const locale of SUBPATH_LOCALES) {
    for (const med of meds) {
      params.push({
        locale,
        slug: med.slug,
      });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) return {};

  const med = getMedicationBySlug(params.slug);
  if (!med) return { title: 'Medication Not Found | ChinaMedsCheck' };

  const primaryBrand = med.brandNames[0];
  let title = `Can I Bring ${primaryBrand} to China? 2026 Rules`;
  let description = `Is ${primaryBrand} legal in China? Customs carry limits, Red Channel rules, penalty risks, and approved in-country prescription alternatives.`;

  if (locale === 'ja') {
    title = `【中国税関】${primaryBrand}の持ち込み規制と許可日数`;
    description = `中国入国時の${primaryBrand}（${med.chineseName}）の税関規制、赤色・緑色通路の申告基準、携行可能日数および現地処方の代替薬を完全解説。`;
  } else if (locale === 'ko') {
    title = `중국 입국 시 ${primaryBrand} 반입 규정 및 허용 일수`;
    description = `중국 세관의 ${primaryBrand}（${med.chineseName}） 반입 규정, 적색통로 세관신고 기준 및 합리적 휴대 일수를 완벽 정리했습니다.`;
  } else if (locale === 'ru') {
    title = `Ввоз ${primaryBrand} в Китай: правила таможни 2026`;
    description = `Можно ли ввозить ${primaryBrand} в Китай? Правила таможни, допустимые лимиты, декларирование в Красном коридоре и аналоги в больницах КНР.`;
  } else if (locale === 'vi') {
    title = `Mang ${primaryBrand} vào Trung Quốc: Quy định hải quan`;
    description = `Quy định hải quan Trung Quốc về ${primaryBrand} (${med.chineseName}): định mức mang theo, thủ tục khai báo Luồng Đỏ và thuốc thay thế.`;
  }

  const alternates = getHreflangAlternates(`/drugs/${med.slug}`, locale);

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: alternates.canonical,
      siteName: 'ChinaMedsCheck',
      type: 'article',
    },
  };
}

export default function LocalizedDrugDetailPage({ params }: PageProps) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const med = getMedicationBySlug(params.slug);
  if (!med) {
    notFound();
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates(`/drugs/${med.slug}`, locale);
  const locHref = (path: string) => getLocalizedPath(path, locale);

  const primaryBrand = med.brandNames[0];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MedicalWebPage',
    name: `${primaryBrand} (${med.genericName}) China Customs Entry Dossier`,
    description: med.summary,
    url: alternates.canonical,
    about: {
      '@type': 'Drug',
      name: primaryBrand,
      nonProprietaryName: med.genericName,
      alternateName: med.chineseName,
      code: med.casNumber
        ? {
            '@type': 'MedicalCode',
            code: med.casNumber,
            codingSystem: 'CAS',
          }
        : undefined,
    },
  };

  return (
    <article className="min-h-screen bg-slate-50 py-8 md:py-12">
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
          <Link href={locHref('/drugs')} className="hover:text-slate-900 transition">
            {dict.nav.directory}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">{primaryBrand}</span>
        </nav>

        {/* H1 Heading */}
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-slate-200 text-slate-800">
              CAS: {med.casNumber || 'N/A'}
            </span>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-blue-100 text-blue-800">
              {med.chineseName}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {locale === 'ja' && `${primaryBrand}（${med.chineseName}）の中国税関持ち込み規制`}
            {locale === 'ko' && `${primaryBrand}（${med.chineseName}） 중국 세관 반입 규정`}
            {locale === 'ru' && `Правила ввоза ${primaryBrand} (${med.chineseName}) в Китай`}
            {locale === 'vi' && `Quy định mang ${primaryBrand} (${med.chineseName}) vào Trung Quốc`}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
            {med.summary}
          </p>
        </div>

        {/* Dark HUD Spec Sheet */}
        <DrugSpecSheet med={med} asH1={false} locale={locale} />

        {/* Inline Itinerary Calculator */}
        <DrugInlineCalculator med={med} locale={locale} />

        {/* Customs Regulation & Legal Basis */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            <span>
              {locale === 'ja' && '中国税関の法的根拠および通関規定'}
              {locale === 'ko' && '중국 세관 법적 근거 및 통관 기준'}
              {locale === 'ru' && 'Правовые основания и таможенные правила КНР'}
              {locale === 'vi' && 'Cơ sở pháp lý và quy định thông quan hải quan'}
            </span>
          </h2>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-mono">
            {med.legalBasis}
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {med.customsRule}
          </p>
        </div>

        {/* In-China Refill & Hospital Directory */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Hospital className="h-5 w-5 text-emerald-600" />
            <span>
              {locale === 'ja' && '中国国内での医療処方・合法代替薬'}
              {locale === 'ko' && '중국 현지 병원 처방 및 대체 의약품'}
              {locale === 'ru' && 'Получение рецепта и аналоги в больницах КНР'}
              {locale === 'vi' && 'Khám kê đơn và thuốc thay thế tại Trung Quốc'}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {med.localAlternative}
          </p>
          <ExpatClinicDirectoryCTA locale={locale} />
        </div>

        {/* Quick Tools Jump */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  {locale === 'ja' ? `${primaryBrand}の申告カードを出力` : locale === 'ko' ? `${primaryBrand} 세관신고서 출력` : locale === 'ru' ? `Создать декларацию на ${primaryBrand}` : `In thẻ khai báo ${primaryBrand}`}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
          </Link>

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
                  {locale === 'ja' ? '手荷物薬バッグに追加して監査' : locale === 'ko' ? '여행 가방에 추가하여 점검' : locale === 'ru' ? 'Добавить в аптечку для проверки' : 'Thêm vào túi thuốc kiểm tra'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* Insurance CTA */}
        <TravelInsuranceCTA medicationName={primaryBrand} locale={locale} />
      </div>
    </article>
  );
}
