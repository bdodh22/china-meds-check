import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AllowanceCalculatorWidget from '@/components/tools/AllowanceCalculatorWidget';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import {
  ShieldCheck,
  Scale,
  AlertCircle,
  FileText,
  Hospital,
  HelpCircle,
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
  const alternates = getHreflangAlternates('/calculator', locale);

  return {
    title: dict.meta.calculatorTitle,
    description: dict.meta.calculatorDesc,
    alternates,
    openGraph: {
      title: dict.meta.calculatorTitle,
      description: dict.meta.calculatorDesc,
      url: alternates.canonical,
      type: 'website',
    },
  };
}

export default function LocalizedCalculatorPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale as Locale;
  if (!SUBPATH_LOCALES.includes(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/calculator', locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: dict.meta.calculatorTitle,
        applicationCategory: 'HealthApplication',
        operatingSystem: 'All',
        url: alternates.canonical,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description: dict.meta.calculatorDesc,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: dict.home.faq2Q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.home.faq2A,
            },
          },
          {
            '@type': 'Question',
            name: dict.home.faq3Q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.home.faq3A,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold shrink-0 whitespace-nowrap">
            <Scale className="h-3.5 w-3.5 shrink-0" />
            <span>{dict.calculator.radarBadge}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {dict.calculator.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {dict.calculator.subtitle}
          </p>
        </div>

        {/* Interactive Calculator Widget */}
        <AllowanceCalculatorWidget locale={locale} />

        {/* Legal Allowance Explanatory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-3 shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.calculator.cat1RuleTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.calculator.cat1RuleDesc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 shrink-0">
              <Scale className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.calculator.cat2RuleTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.calculator.cat2RuleDesc}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              {dict.calculator.maintenanceRuleTitle}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {dict.calculator.maintenanceRuleDesc}
            </p>
          </div>
        </div>

        {/* Insurance CTA */}
        <TravelInsuranceCTA locale={locale} />
      </div>
    </div>
  );
}
