import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
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
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Bringing Medication to China: 2025 Customs Rules & Legality',
  description:
    'Can you bring prescription drugs to China? Instant customs legality radar for Adderall, Concerta, Xanax and Ozempic. Check GACC rules, carry limits and declarations.',
  alternates: getHreflangAlternates('/'),
};

export default function HomePage() {
  const allMeds = getAllMedications();

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
        '@id': 'https://chinamedscheck.com/#website',
        url: 'https://chinamedscheck.com',
        name: 'ChinaMedsCheck',
        description: 'Bringing Medication to China: Customs Prescription Compliance Radar',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://chinamedscheck.com/drugs?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'MedicalWebPage',
        '@id': 'https://chinamedscheck.com/#webpage',
        url: 'https://chinamedscheck.com',
        name: 'China Customs Medication Entry Compliance System',
        about: [
          { '@type': 'MedicalCondition', name: 'ADHD' },
          { '@type': 'MedicalCondition', name: 'Anxiety' },
          { '@type': 'MedicalCondition', name: 'Type 2 Diabetes' },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I bring Adderall into China with an official doctor prescription?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Under Chinese Criminal Law, amphetamines are classified as illicit narcotic drugs. Foreign prescriptions are not recognized for prohibited substances, and bringing Adderall into China risks confiscation, detention, or criminal smuggling charges.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many days of prescription medication can I bring to China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'For strictly controlled Category 1 psychotropics (like Concerta/Methylphenidate), Chinese Customs limits allowance to a single travel course of 7 to 15 days with mandatory Red Channel declaration. For standard maintenance prescription drugs, up to 90 days personal supply is generally permitted in original packaging.',
            },
          },
          {
            '@type': 'Question',
            name: 'Do I need to declare ordinary blood pressure or diabetes medication at the Red Channel?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Ordinary non-controlled maintenance medications within a reasonable 90-day personal supply can pass through the Green Channel without declaration.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I bring Ozempic or Wegovy pens on flights to China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. GLP-1 medications are legal for personal use. Keep them in carry-on baggage with portable cold packs, carry your prescription for the needles, and follow CAAC aviation safety rules.',
            },
          },
          {
            '@type': 'Question',
            name: 'What should I do if I run out of prescription medication while in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Controlled medicines cannot be mailed via international courier into China. Visit a licensed Tier-3 public hospital or international medical center with your foreign prescription and passport for an in-person refill.',
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
              <span>Official GACC Notice 43 & Decree 442 Clearance Radar</span>
            </div>
          </div>

          {/* Main H1 Title: 呼吸舒展，层次从容 */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.18]">
              Bringing Medication to China? <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-700 via-teal-600 to-emerald-600 bg-clip-text text-transparent">
                Check Customs Legality Instantly
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed font-normal">
              Instant verification for prescription drugs, carry limits, and Red Channel declaration requirements before your flight.
            </p>
          </div>

          {/* Primary Action Hero: Drug Search Widget (充足呼吸留白) */}
          <div className="pt-2 pb-1 max-w-3xl mx-auto">
            <DrugSearchWidget />
          </div>

          {/* Quick Metrics Bar: Lightweight Clean Trust Chips */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              <span>31+ Controlled Drugs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span>Red/Green Channels Mapped</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
              <span>PVG · PEK · CAN Hubs</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section 1: Three Regulatory Clearance Tiers (Stitch V4 Bento Grid) */}
      <section className="py-14 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 uppercase tracking-wider font-mono bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
            <Sparkles className="h-3.5 w-3.5 text-teal-600" />
            <span>Official Customs Protocols</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Three Border Clearance Tiers for Inbound Travelers
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Inspection procedures and carry limits strictly depend on your medication active chemical classification under GACC Notice 43.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {/* Tier 1: Green Channel (Allowed) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-emerald-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-emerald-300 hover:shadow-[0_16px_40px_rgba(5,150,105,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Green Channel
                </span>
                <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50/60 px-2.5 py-0.5 rounded-md border border-emerald-100 shrink-0 whitespace-nowrap">
                  ≤ 90 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                  Allowed Maintenance &amp; OTC
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Permitted for personal use up to reasonable travel duration (typically up to 90 days for maintenance prescriptions in original packaging). Walk directly through the Green Channel without declaration.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  Common Examples:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Acetaminophen', 'Ibuprofen', 'Metformin', 'Melatonin', 'Vitamins'].map((med) => (
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
              <span>No Declaration Required</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            </div>
          </div>

          {/* Tier 2: Yellow Channel (Controlled Psychotropics) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-amber-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-amber-300 hover:shadow-[0_16px_40px_rgba(217,119,6,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  Red Channel · Declare
                </span>
                <span className="text-[11px] font-mono font-bold text-amber-800 bg-amber-50/60 px-2.5 py-0.5 rounded-md border border-amber-200 shrink-0 whitespace-nowrap">
                  7 – 15 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-900 transition-colors">
                  Controlled Psychotropics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Category 1 &amp; 2 psychotropics are permitted solely with official physician prescription and medical records. You must declare at the Red Channel upon arrival and stay strictly within single travel course limits.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  Common Examples:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Concerta (Ritalin)', 'Xanax (Alprazolam)', 'Ambien (Zolpidem)', 'Valium', 'Zopiclone'].map((med) => (
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
              <span>Doctor Rx &amp; Declaration Slip</span>
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
            </div>
          </div>

          {/* Tier 3: Red Line (Prohibited & Banned) */}
          <div className="group p-6 sm:p-7 rounded-3xl bg-white/85 backdrop-blur-xl border border-rose-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-rose-300 hover:shadow-[0_16px_40px_rgba(220,38,38,0.08)] hover:-translate-y-1.5 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-900 border border-rose-300 text-xs font-bold shrink-0 whitespace-nowrap">
                  <span className="h-2 w-2 rounded-full bg-rose-600 animate-pulse" />
                  Prohibited · Red Line
                </span>
                <span className="text-[11px] font-mono font-bold text-rose-700 bg-rose-50/60 px-2.5 py-0.5 rounded-md border border-rose-200 shrink-0 whitespace-nowrap">
                  0 Days
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-rose-800 transition-colors">
                  Banned Narcotics &amp; Precursors
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Zero tolerance. Under Chinese Criminal Law Article 347, carrying these illicit substances constitutes criminal drug smuggling. Foreign prescriptions provide zero legal immunity at the border.
                </p>
              </div>

              <div className="pt-2 space-y-2">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
                  Strictly Prohibited:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Adderall (Amphetamine)', 'Codeine Cough Syrup', 'CBD & THC Oils', 'Methadone', 'Vyvanse'].map((med) => (
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
              <span>Criminal Smuggling Risk</span>
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
                Passenger Self-Service Intelligence
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Border Clearance Tool Suite
              </h2>
            </div>
            <p className="text-xs text-slate-500 max-w-md">
              Simulate customs allowances, audit multi-drug carry-ons, and generate dual-language declaration dossiers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Tool 1: Allowance Calculator */}
            <Link
              href="/calculator"
              className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-teal-300 hover:shadow-[0_12px_32px_rgba(13,148,136,0.10)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-teal-600 group-hover:text-white transition-all duration-200">
                  <Calculator className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-teal-700 uppercase tracking-wider block">
                    Duration Assessment
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors mt-1">
                    Carry Allowance Calculator
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Enter your trip length and dosage to calculate exact legal days allowed (7, 15, or 90 days) under GACC Notice 43.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-700">
                <span>Launch Calculator</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 2: Travel Bag Manifest */}
            <Link
              href="/manifest"
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-emerald-400 shadow-sm hover:shadow-[0_12px_32px_rgba(5,150,105,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                  <Luggage className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                    Baggage Audit
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-1">
                    Travel Bag Audit & Radar
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Audit your complete baggage for cumulative pseudoephedrine limits, acetaminophen overdoses, and CAAC airline needle compliance.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                <span>Inspect Travel Bag</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Tool 3: Customs Declaration Slip */}
            <Link
              href="/customs-card"
              className="group p-6 rounded-2xl bg-white border border-slate-200/80 hover:border-sky-400 shadow-sm hover:shadow-[0_12px_32px_rgba(2,132,199,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="h-11 w-11 rounded-xl bg-sky-50 text-sky-600 border border-sky-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-sky-600 group-hover:text-white transition-all duration-200">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-bold text-sky-700 uppercase tracking-wider block">
                    Bilingual Dossier
                  </span>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-700 transition-colors mt-1">
                    Customs Declaration Slip
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2">
                    Generate an official bilingual (English & Chinese) declaration dossier to present directly to airport customs inspectors.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-700">
                <span>Generate Official Slip</span>
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
              High-Anxiety Medications
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
              Border Legality Quick Reference
            </h2>
          </div>

          <Link
            href="/drugs"
            className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 shrink-0 group"
          >
            <span>View all 31+ evaluated drugs</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {benchmarkMeds.map((med) => (
            <Link
              key={med.slug}
              href={'/drugs/' + med.slug}
              className="p-5 sm:p-6 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200/80 hover:border-teal-400 shadow-sm hover:shadow-[0_12px_32px_rgba(13,148,136,0.08)] hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 flex flex-col group h-full"
            >
              <div className="space-y-3 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100/90 border border-slate-200 text-slate-700">
                    CAS {med.casNumber}
                  </span>
                  <DrugStatusBadge status={med.status} size="sm" />
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
                <span>Allowance: {med.allowanceDaysMax > 0 ? (med.allowanceDaysMax + ' Days') : '0 Days (Banned)'}</span>
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
                <span>Customs FAQs</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Essential Customs Compliance Advice
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Clear legal guidance on high-risk medications, doctor prescription proof requirements, and airport baggage inspections.
              </p>

              <div className="pt-2 space-y-3">
                {/* Hotlines Card */}
                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
                  <span className="text-[11px] font-mono font-bold text-teal-800 uppercase tracking-wide block">
                    GACC Hotline 12360
                  </span>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Have an unlisted substance? Call the 24/7 China Customs inquiry hotline at <strong className="text-slate-800 font-mono">12360</strong> upon border arrival.
                  </p>
                </div>

                {/* Pre-Flight Checklist Card (Perfect Height Balance) */}
                <div className="p-4 rounded-2xl bg-teal-900 text-white shadow-sm space-y-2">
                  <span className="text-[11px] font-mono font-bold text-teal-300 uppercase tracking-wider block">
                    3-Point Border Rule
                  </span>
                  <ul className="text-xs text-teal-100/90 space-y-1.5 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">1.</span>
                      <span>Always keep drugs in original pharmacy packaging with patient labels.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">2.</span>
                      <span>Carry physician prescription &amp; diagnosis notes in English or Chinese.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-400 font-bold">3.</span>
                      <span>Declare controlled substances explicitly at Customs Red Channel.</span>
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
                      Legal Red Line
                    </span>
                    <span>Can I bring Adderall into China with an official doctor prescription?</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  No. Under Chinese Criminal Law, amphetamines are classified as illicit narcotic drugs. Foreign prescriptions hold zero legal weight at Chinese customs for prohibited substances. Carrying Adderall risks confiscation, administrative detention, or criminal smuggling prosecution.
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                      Prescription Rules
                    </span>
                    <span>What is the maximum supply of medication I can legally carry?</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  Under GACC Notice 43, travelers may carry a reasonable quantity for personal use during their travel duration. For Category 1 psychotropics (like Concerta), maximum is a single travel course of 7 to 15 days. For chronic maintenance drugs, up to 90 days in original packaging is standard.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
                      Green Channel
                    </span>
                    <span>Do I need to declare ordinary blood pressure or diabetes medication?</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  No. Standard non-controlled maintenance medications (hypertension, diabetes, cholesterol) within a reasonable 90-day personal supply can pass directly through the Green Channel without formal declaration. Keep medications in original packaging with doctor notes available upon request.
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200 shrink-0">
                      Aviation &amp; Needles
                    </span>
                    <span>Can I bring Ozempic or Wegovy pens on flights into China?</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  Yes. GLP-1 medications are legal for personal use in China. Keep pens in carry-on baggage with compliant ice packs (never checked baggage where they may freeze). Always carry the original prescription to prove medical necessity for the disposable needles at airport security.
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/80 shadow-2xs hover:border-slate-300 transition-all [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-slate-900 text-sm sm:text-base select-none gap-4">
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 border border-slate-200 shrink-0">
                      In-Country Refills
                    </span>
                    <span>What should I do if I run out of prescription medication while in China?</span>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                </summary>
                <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed pl-1">
                  Prescription medications cannot be shipped to you via international courier (customs will detain them). Instead, visit an international clinic (e.g., United Family, Jiahui Health) or the VIP / International department of a licensed Tier-3 public hospital with your passport and home medical summary to receive an official domestic prescription.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      {/* High-Converting Lead Capture: Offline PDF Checklist (max-w-6xl) */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadCaptureEmailCard locale="en" />
      </section>

      {/* Commercial Traveler Protection Banner (max-w-6xl) */}
      <section className="py-6 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TravelInsuranceCTA locale="en" />
      </section>
    </div>
  );
}
