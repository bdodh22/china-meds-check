import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  BookOpen,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calculator,
  Scale,
  Hospital,
  Plane,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
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
  const alternates = getHreflangAlternates('/guide/bring-medications-to-china', locale);

  return {
    title: dict.meta.guideTitle,
    description: dict.meta.guideDesc,
    alternates,
    openGraph: {
      title: dict.meta.guideTitle,
      description: dict.meta.guideDesc,
      url: alternates.canonical,
      siteName: 'ChinaMedsCheck',
      type: 'article',
    },
  };
}

export default function LocalizedBringMedicationsGuidePage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/guide/bring-medications-to-china', locale);
  const locHref = (path: string) => getLocalizedPath(path, locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: dict.meta.guideTitle,
    description: dict.meta.guideDesc,
    url: alternates.canonical,
  };

  return (
    <article className="bg-slate-50 min-h-screen py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <Link href={locHref('/')} className="hover:text-slate-900 transition">
            {dict.nav.radar}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-900">
            {locale === 'ja' ? '通関完全ガイド' : locale === 'ko' ? '세관 법규 가이드' : locale === 'ru' ? 'Таможенный гид' : 'Cẩm nang hải quan'}
          </span>
        </nav>

        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-xs font-mono font-bold text-slate-700">
            <BookOpen className="h-3.5 w-3.5 text-blue-700" />
            <span>UN INCB & GACC Aligned Traveler Manual</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {dict.meta.guideTitle}
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            {dict.meta.guideDesc}
          </p>
        </div>

        {/* Core Principles */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Scale className="h-5 w-5 text-blue-600" />
            <span>
              {locale === 'ja' ? '中国海関総署（GACC）第43号公告の3大原則' : locale === 'ko' ? '중국 해관총서 제43호 공고의 3대 기본 원칙' : locale === 'ru' ? '3 ключевых принципа Уведомления GACC № 43' : '3 nguyên tắc cốt lõi của Thông báo số 43 GACC'}
            </span>
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="font-bold text-slate-900 block mb-1">
                {locale === 'ja' ? '1. 合理的な個人使用量（合理自用原則）' : locale === 'ko' ? '1. 합리적 자가사용 원칙 (合理自用)' : locale === 'ru' ? '1. Принцип разумного личного использования' : '1. Nguyên tắc định mức sử dụng cá nhân hợp lý'}
              </strong>
              {locale === 'ja' ? '携行できる医薬品は、旅客本人が旅行期間中に自ら使用する正当な数量に限られます。他者への譲渡や転売目的の持ち込みは固く禁じられています。' : locale === 'ko' ? '휴대 약품은 여행자 본인이 체류 기간 중 사용할 정당한 수량으로 엄격히 제한되며, 타인 양도나 상업적 목적의 반입은 금지됩니다.' : locale === 'ru' ? 'Количество медикаментов строго ограничено потребностями самого пассажира на период поездки. Передача или продажа категорически запрещены.' : 'Lượng thuốc mang theo bị giới hạn nghiêm ngặt theo nhu cầu cá nhân trong chuyến đi, cấm chuyển nhượng hay mục đích thương mại.'}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="font-bold text-slate-900 block mb-1">
                {locale === 'ja' ? '2. 原本処方箋・医師の診断書の携行' : locale === 'ko' ? '2. 정식 처방전 및 진단서 원본 지참 의무' : locale === 'ru' ? '2. Наличие оригиналов рецептов и справок' : '2. Nghĩa vụ mang theo đơn thuốc và bệnh án gốc'}
              </strong>
              {locale === 'ja' ? '処方薬を所持して入国する場合、パスポートの氏名と一致する医師の診断書（英文または中国語）および未開封の薬局調剤包装を持参する必要があります。' : locale === 'ko' ? '처방약을 소지하고 입국할 경우, 여권 성명과 일치하는 영문 의사 소견서와 정식 조제 라벨이 부착된 원포장을 유지해야 합니다.' : locale === 'ru' ? 'При ввозе рецептурных лекарств обязательно наличие справки от врача на английском/китайском языке с указанием ФИО по паспорту и оригинальной упаковки.' : 'Bắt buộc mang theo đơn thuốc gốc khớp tên hộ chiếu (tiếng Anh/Trung) và giữ nguyên bao bì nhãn mác của nhà sản xuất.'}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <strong className="font-bold text-slate-900 block mb-1">
                {locale === 'ja' ? '3. 赤色通路での確実な書面申告' : locale === 'ko' ? '3. 세관 적색통로를 통한 성실 서면 신고' : locale === 'ru' ? '3. Письменное декларирование в Красном коридоре' : '3. Khai báo trung thực tại Luồng Đỏ hải quan'}
              </strong>
              {locale === 'ja' ? '第1類・第2類向精神薬を所持している場合は、ターンテーブルで荷物をピックアップ後、迷わず赤色通路（申告要）へ進んで申告を行ってください。' : locale === 'ko' ? '향정신성 의약품을 소지한 경우 수하물을 찾은 후 주저하지 말고 즉시 적색통로(신고)로 이동하여 세관에 자진 신고해야 합니다.' : locale === 'ru' ? 'При наличии контролируемых психотропных веществ после получения багажа сразу проходите в Красный коридор для декларирования.' : 'Nếu mang theo thuốc hướng thần, sau khi lấy hành lý cần chủ động đi vào Luồng Đỏ để xuất trình khai báo.'}
            </div>
          </div>
        </div>

        {/* Quick Tools Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href={locHref('/calculator')}
            className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm transition flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
                <Calculator className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{dict.nav.allowance}</h4>
                <p className="text-xs text-slate-500">
                  {locale === 'ja' ? '税関許容日数を自動シミュレーション' : locale === 'ko' ? '세관 허용 일수 자동 시뮬레이션' : locale === 'ru' ? 'Калькулятор допустимых норм ввоза' : 'Tính số ngày thuốc được phép mang'}
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
                  {locale === 'ja' ? '検査官へ提示する日中二言語申告票' : locale === 'ko' ? '세관 제출용 한중 이중언어 신고서' : locale === 'ru' ? 'Двуязычный бланк декларации для таможни' : 'Thẻ khai báo song ngữ cho hải quan'}
                </p>
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 group-hover:translate-x-1 transition" />
          </Link>
        </div>

        {/* CTA Blocks: Triple-Funnel (Lead Magnet -> Medical Care -> Travel Insurance) */}
        <LeadCaptureEmailCard locale={locale} />
        <ExpatClinicDirectoryCTA locale={locale} />
        <TravelInsuranceCTA locale={locale} />
      </div>
    </article>
  );
}

