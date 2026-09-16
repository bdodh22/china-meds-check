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
  Search,
  Sparkles,
  Luggage,
  Plane,
  Scale
} from 'lucide-react';
import DrugSearchWidget from '@/components/tools/DrugSearchWidget';
import DrugStatusBadge from '@/components/tools/DrugStatusBadge';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
import { getAllMedications } from '@/lib/medications';

import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Bringing Medication to China: 2025 Customs Rules',
  description:
    'Can you bring prescription drugs to China? Instant legality radar for Adderall, Concerta, Xanax and Ozempic. Check GACC rules, carry limits and declarations.',
  alternates: getHreflangAlternates('/'),
};

export default function HomePage() {
  const allMeds = getAllMedications();

  // Featured benchmark drugs
  const benchmarkMeds = [
    allMeds.find((m) => m.slug === 'adderall-in-china')!,
    allMeds.find((m) => m.slug === 'ritalin-concerta-in-china')!,
    allMeds.find((m) => m.slug === 'xanax-in-china')!,
    allMeds.find((m) => m.slug === 'ozempic-in-china')!,
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
            name: 'Can I bring Adderall to China with an official doctor prescription?',
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
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero Section: Focused Single Visual Anchor */}
      <section className="relative pt-12 pb-16 md:pt-16 md:pb-20 bg-gradient-to-b from-white via-slate-50/50 to-slate-50 border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          {/* Trust Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-blue-900 text-xs font-semibold tracking-wide shadow-xs shrink-0 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>2025/2026 GACC Notice 43 & Decree 442 Radar</span>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight max-w-4xl mx-auto leading-[1.12]">
            Can I Bring My Prescription Drugs to China?
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Verify customs legality, entry allowance days, and mandatory Red Channel declaration rules before boarding your flight. Zero registration required.
          </p>

          {/* Core Interactive Search Radar Widget */}
          <div className="pt-2">
            <DrugSearchWidget />
          </div>
        </div>
      </section>

      {/* Bento Grid: 3 Core Workspaces (Clean & Crisp) */}
      <section className="py-12 md:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Border Clearance Tool Suite
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Select a specialized tool below to simulate allowances, inspect your baggage, or generate declaration slips.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tool 1: Allowance Calculator (Blue Theme) */}
          <Link
            href="/calculator"
            className="group p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-blue-400/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-200">
                <Calculator className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-blue-700 uppercase tracking-wider block">
                  Algorithmic Assessment
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors mt-0.5">
                  Allowance Days Calculator
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Select your medication and trip length to calculate exact legal days allowed (7, 15, or 90 days) under China Customs rules.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-700">
              <span>Launch Calculator</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 2: Travel Bag Manifest (Emerald Theme) */}
          <Link
            href="/manifest"
            className="group p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-400/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-200">
                <Luggage className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-emerald-700 uppercase tracking-wider block">
                  Multi-Drug Pre-Screening
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors mt-0.5">
                  Travel Bag Audit & Radar
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Check your luggage for cumulative pseudoephedrine limits, acetaminophen overdoses, and CAAC airline needle/ice security standards.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
              <span>Inspect Travel Bag</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Tool 3: Customs Declaration Slip (Indigo Theme) */}
          <Link
            href="/customs-card"
            className="group p-6 sm:p-7 rounded-3xl bg-white border border-slate-200/80 hover:border-indigo-400/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-200">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-bold text-indigo-700 uppercase tracking-wider block">
                  Bilingual Document Tool
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-700 transition-colors mt-0.5">
                  Customs Declaration Slip
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">
                  Generate an official bilingual (English & Simplified Chinese) declaration dossier to present directly to airport customs inspectors.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-700">
              <span>Generate Official Slip</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* Benchmark Drugs Quick Radar: Parametric Cards */}
      <section className="py-12 bg-white border-y border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                High-Anxiety Medications
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                Border Legality Quick Reference
              </h2>
            </div>

            <Link
              href="/drugs"
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center gap-1 shrink-0"
            >
              <span>View full 31+ catalog</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {benchmarkMeds.map((med) => (
              <Link
                key={med.slug}
                href={`/drugs/${med.slug}`}
                className="p-5 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700">
                      CAS {med.casNumber}
                    </span>
                    <DrugStatusBadge status={med.status} size="sm" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 group-hover:text-blue-700 transition">
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

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-bold text-slate-900">
                  <span>Allowance: {med.allowanceDaysMax > 0 ? `${med.allowanceDaysMax} Days` : '0 Days (Banned)'}</span>
                  <ArrowRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* High-Converting Lead Capture: Offline PDF Checklist */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <LeadCaptureEmailCard locale="en" />
      </section>

      {/* Commercial Traveler Protection Banner */}
      <section className="py-8 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <TravelInsuranceCTA />
      </section>
    </div>
  );
}

