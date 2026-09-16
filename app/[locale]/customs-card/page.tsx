import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CustomsDeclarationCard from '@/components/tools/CustomsDeclarationCard';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  Plane,
  Sparkles,
  HelpCircle,
  Scale,
} from 'lucide-react';
import { Locale, SUBPATH_LOCALES, getHreflangAlternates } from '@/lib/i18n/config';
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
  const alternates = getHreflangAlternates('/customs-card', locale);

  return {
    title: dict.meta.customsCardTitle,
    description: dict.meta.customsCardDesc,
    alternates,
    openGraph: {
      title: dict.meta.customsCardTitle,
      description: dict.meta.customsCardDesc,
      url: alternates.canonical,
      type: 'website',
    },
  };
}

export default function LocalizedCustomsCardPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/customs-card', locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: dict.meta.customsCardTitle,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All',
    url: alternates.canonical,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: dict.meta.customsCardDesc,
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shrink-0 whitespace-nowrap">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{dict.customsSlip.dossierBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {dict.customsCard.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {dict.customsCard.subtitle}
          </p>
        </div>

        {/* Declaration Card Widget */}
        <CustomsDeclarationCard locale={locale} />

        {/* 3 Step Guidance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <FileText className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {locale === 'ja' ? '1. 情報を入力' : locale === 'ko' ? '1. 정보 입력' : locale === 'ru' ? '1. Заполните данные' : '1. Điền thông tin'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'ja' ? 'パスポート記載の英字氏名、搭乗便名、持参する薬品の処方情報を入力します。' : locale === 'ko' ? '여권 영문 성명, 도착 편명 및 휴대할 처방약 정보를 입력합니다.' : locale === 'ru' ? 'Укажите ФИО по паспорту, номер рейса и список рецептурных препаратов.' : 'Điền tên theo hộ chiếu, số hiệu chuyến bay và thông tin thuốc kê đơn mang theo.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {locale === 'ja' ? '2. A4印刷または保存' : locale === 'ko' ? '2. A4 인쇄 또는 보관' : locale === 'ru' ? '2. Распечатайте на A4' : '2. In khổ A4'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'ja' ? 'A4用紙に印刷するか、スマートフォンの画面に保存して持参します。' : locale === 'ko' ? 'A4 용지에 인쇄하거나 스마트폰 전체화면으로 저장하여 준비합니다.' : locale === 'ru' ? 'Распечатайте на листе А4 или сохраните на телефоне для предъявления.' : 'In ra giấy A4 hoặc lưu trên điện thoại để sẵn sàng xuất trình.'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {locale === 'ja' ? '3. 赤色通路で提示' : locale === 'ko' ? '3. 적색통로에서 제시' : locale === 'ru' ? '3. Предъявите на таможне' : '3. Xuất trình tại Luồng Đỏ'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {locale === 'ja' ? '手荷物受取後、税関の赤色通路検査官に原本処方箋とともに提示します。' : locale === 'ko' ? '수하물 수취 후 세관 적색통로 검사관에게 원본 처방전과 함께 즉시 제시합니다.' : locale === 'ru' ? 'Предъявите бланк и оригиналы рецептов офицеру Красного коридора.' : 'Sau khi lấy hành lý, xuất trình giấy kèm đơn thuốc gốc cho cán bộ Luồng Đỏ.'}
            </p>
          </div>
        </div>

        {/* Travel Insurance CTA */}
        <TravelInsuranceCTA locale={locale} />
      </div>
    </div>
  );
}
