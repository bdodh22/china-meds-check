import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Luggage,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import DrugSearchWidget from '@/components/tools/DrugSearchWidget';
import DrugStatusBadge from '@/components/tools/DrugStatusBadge';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
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
  if (!SUBPATH_LOCALES.includes(locale)) {
    return {};
  }

  const dict = getDictionary(locale);
  const alternates = getHreflangAlternates('/', locale);

  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDesc,
    alternates,
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDesc,
      url: alternates.canonical,
      type: 'website',
    },
  };
}

export default function LocalizedHomePage({
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
  const locHref = (path: string) => getLocalizedPath(path, locale);

  // Featured benchmark drugs
  const benchmarkMeds = [
    allMeds.find((m) => m.slug === 'adderall-in-china')!,
    allMeds.find((m) => m.slug === 'ritalin-concerta-in-china')!,
    allMeds.find((m) => m.slug === 'xanax-in-china')!,
    allMeds.find((m) => m.slug === 'ozempic-wegovy-in-china')!,
  ].filter(Boolean);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://chinamedscheck.com/' + locale + '/#website',
        url: 'https://chinamedscheck.com/' + locale,
        name: 'ChinaMedsCheck',
        description: dict.meta.homeDesc,
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: dict.home.faq1Q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.home.faq1A,
            },
          },
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
          {
            '@type': 'Question',
            name: dict.home.faq4Q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.home.faq4A,
            },
          },
          {
            '@type': 'Question',
            name: dict.home.faq5Q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: dict.home.faq5A,
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-slate-800 relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Ambient Light Orbs (Stitch V4 Atmospheric Glow) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[420px] bg-gradient-to-tr from-teal-200/35 via-sky-200/25 to-transparent blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-96 -right-28 w-96 h-96 bg-amber-100/30 blur-3xl rounded-full pointer-events-none -z-10" />
      <div className="absolute top-[880px] -left-28 w-96 h-96 bg-teal-100/30 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Hero Section: Focused Single Visual Anchor (Stitch V4 Kinetic Elevation) */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 border-b border-slate-200/60 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-9 relative z-10">
          
          {/* Trust Pill */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-teal-200/90 text-teal-950 text-xs font-semibold tracking-wide shadow-2xs shrink-0 whitespace-nowrap">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{dict.home.heroTag}</span>
            </div>
          </div>

          {/* Main H1 Title: 呼吸舒展，层次从容 */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              {dict.home.heroTitle}
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
              {dict.home.heroDesc}
            </p>
          </div>

          {/* Primary Action Hero: Drug Search Widget */}
          <div className="pt-2 pb-1 max-w-3xl mx-auto">
            <DrugSearchWidget placeholder={dict.home.searchPlaceholder} locale={locale} />
          </div>

          {/* Quick Metrics Bar: Lightweight Clean Trust Chips */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span>{dict.home.statMedCount}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>{dict.home.statChannels}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>{dict.home.statAirport}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Three Regulatory Clearance Tiers (Stitch V4 Bento Grid) */}
      <section className="py-14 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>{dict.badges.allowed} · {dict.badges.controlled} · {dict.badges.banned}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {dict.home.statusGridTitle}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {dict.home.statusGridDesc}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Green Channel (Allowed) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-emerald-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-300 hover:shadow-[0_16px_40px_rgba(5,150,105,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {dict.badges.allowed}
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50/60 px-2.5 py-0.5 rounded-md border border-emerald-100 shrink-0 whitespace-nowrap">
                  ≤ 90 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  {dict.home.catAllowedTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {dict.home.catAllowedDesc}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  {dict.home.typicalDrugsLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Acetaminophen', 'Ibuprofen', 'Metformin', 'Melatonin'].map((med) => (
                    <span
                      key={med}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-emerald-50/70 border border-emerald-100/90 text-emerald-900"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-100/70 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>{dict.specSheet.greenChannelPass}</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Tier 2: Yellow Channel (Controlled Psychotropics) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-amber-300 hover:shadow-[0_16px_40px_rgba(217,119,6,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {dict.badges.controlled}
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50/60 px-2.5 py-0.5 rounded-md border border-amber-200 shrink-0 whitespace-nowrap">
                  7 – 15 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                  {dict.home.catControlledTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {dict.home.catControlledDesc}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  {dict.home.typicalDrugsLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Concerta', 'Xanax', 'Ambien', 'Valium'].map((med) => (
                    <span
                      key={med}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-amber-50/70 border border-amber-200/80 text-amber-900"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-100/70 flex items-center justify-between text-xs font-bold text-amber-800">
              <span>{dict.specSheet.redChannelMust}</span>
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            </div>
          </div>

          {/* Tier 3: Red Line (Prohibited & Banned) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-rose-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-rose-300 hover:shadow-[0_16px_40px_rgba(220,38,38,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-300 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                  {dict.badges.banned}
                </span>
                <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50/60 px-2.5 py-0.5 rounded-md border border-rose-200 shrink-0 whitespace-nowrap">
                  0 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                  {dict.home.catBannedTitle}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  {dict.home.catBannedDesc}
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  {dict.home.typicalDrugsLabel}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Adderall', 'Codeine Syrup', 'CBD / THC'].map((med) => (
                    <span
                      key={med}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-rose-50/70 border border-rose-200/80 text-rose-900"
                    >
                      {med}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-100/70 flex items-center justify-between text-xs font-bold text-rose-700">
              <span>{dict.badges.redLine}</span>
              <ShieldAlert className="h-4 w-4 text-rose-600 shrink-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Border Clearance Tool Suite (High Tactility Workspaces) */}
      <section className="py-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-50/95 to-white/90 backdrop-blur-xl border border-slate-200/80 shadow-[0_8px_40px_rgba(0,0,0,0.06)] space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                {dict.home.exploreTools}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                {dict.home.exploreTools}
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tool 1: Allowance Calculator */}
            <Link
              href={locHref('/calculator')}
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-400 shadow-sm hover:shadow-[0_12px_32px_rgba(13,148,136,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mt-1">
                    {dict.home.toolCalcTitle}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {dict.home.toolCalcDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>{dict.home.toolCalcTitle}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 2: Travel Bag Manifest */}
            <Link
              href={locHref('/manifest')}
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-[0_12px_32px_rgba(5,150,105,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                  <Luggage className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1">
                    {dict.home.toolBagTitle}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {dict.home.toolBagDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>{dict.home.toolBagTitle}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 3: Customs Declaration Slip */}
            <Link
              href={locHref('/customs-card')}
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 shadow-sm hover:shadow-[0_12px_32px_rgba(2,132,199,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all duration-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors mt-1">
                    {dict.home.toolCardTitle}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    {dict.home.toolCardDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>{dict.home.toolCardTitle}</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Section 3: Benchmark High-Anxiety Drugs Quick Radar */}
      <section className="py-14 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
              {dict.nav.directory}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              {dict.drugs.catalogTitle}
            </h2>
          </div>

          <Link
            href={locHref('/drugs')}
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 shrink-0 group"
          >
            <span>{dict.drugs.catalogTitle}</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {benchmarkMeds.map((med) => (
            <Link
              key={med.slug}
              href={locHref('/drugs/' + med.slug)}
              className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-teal-400 shadow-sm hover:shadow-[0_12px_32px_rgba(13,148,136,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col group h-full"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100/90 border border-slate-200 text-slate-700">
                    CAS {med.casNumber}
                  </span>
                  <DrugStatusBadge status={med.status} size="sm" locale={locale} />
                </div>

                <div>
                  <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-teal-700 transition-colors min-h-[2.5rem] flex items-start">
                    {med.brandNames[0]}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                    {med.genericName}
                  </p>
                  <p className="text-[11px] text-slate-700 font-semibold mt-1">
                    CHN: {med.chineseName.split(' ')[0]}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-900">
                <span>{dict.drugs.allowance}: {med.allowanceDaysMax > 0 ? dict.bagWidget.maxDays.replace('{max}', String(med.allowanceDaysMax)) : dict.bagWidget.zeroDaysBanned}</span>
                <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-transform shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Section 4: Accordion FAQ (Stitch V4 Modern Split-Panel Layout - max-w-6xl) */}
      <section className="py-16 bg-slate-50/70 border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Fixed Context Header & Customs Advisory Box (4 cols) */}
            <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                <span>FAQ</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {dict.home.faqSectionTitle}
              </h2>

              <div className="pt-2 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wide block">
                    GACC 12360
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed font-mono">
                    24/7 Hotline: 12360
                  </p>
                </div>

                {/* Pre-Flight Checklist Card */}
                <div className="p-4 rounded-2xl bg-teal-900 text-white shadow-sm space-y-2">
                  <span className="text-[11px] font-mono font-bold text-teal-300 uppercase tracking-wider block">
                    GACC Rules
                  </span>
                  <ul className="text-xs text-teal-100/90 space-y-1.5 leading-relaxed font-sans">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">1.</span>
                      <span>{dict.specSheet.carryOnOnly}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">2.</span>
                      <span>{dict.specSheet.personalCarry}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">3.</span>
                      <span>{dict.specSheet.redChannelMust}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Accordion Stack (8 cols) */}
            <div className="lg:col-span-8 space-y-3.5">
              {/* FAQ 1 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                      {dict.badges.banned}
                    </span>
                    <span>{dict.home.faq1Q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {dict.home.faq1A}
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                      {dict.badges.controlled}
                    </span>
                    <span>{dict.home.faq2Q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {dict.home.faq2A}
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      {dict.badges.allowed}
                    </span>
                    <span>{dict.home.faq3Q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {dict.home.faq3A}
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                      CAAC
                    </span>
                    <span>{dict.home.faq4Q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {dict.home.faq4A}
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                      12360
                    </span>
                    <span>{dict.home.faq5Q}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  {dict.home.faq5A}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Lead Capture: Offline PDF Checklist (max-w-6xl) */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadCaptureEmailCard locale={locale} />
      </section>

      {/* Commercial Traveler Protection Banner (max-w-6xl) */}
      <section className="py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TravelInsuranceCTA locale={locale} />
      </section>
    </div>
  );
}
