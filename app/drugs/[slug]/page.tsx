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
  ArrowRight
} from 'lucide-react';
import DrugSpecSheet from '@/components/tools/DrugSpecSheet';
import DrugInlineCalculator from '@/components/tools/DrugInlineCalculator';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import { getAllMedications, getMedicationBySlug } from '@/lib/medications';
import { getHreflangAlternates } from '@/lib/i18n/config';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate static parameters for all medications
export async function generateStaticParams() {
  const meds = getAllMedications();
  return meds.map((med) => ({
    slug: med.slug,
  }));
}

// Dynamic SEO metadata adhering strictly to Title <= 60 chars & Description <= 160 chars
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const med = getMedicationBySlug(params.slug);

  if (!med) {
    return {
      title: 'Medication Not Found | ChinaMedsCheck',
    };
  }

  const primaryBrand = med.brandNames[0];
  const title = `Can I Bring ${primaryBrand} to China? 2026 Rules`;
  const cnPart = med.chineseName ? ` (${med.chineseName})` : '';
  const description = `Can you bring ${primaryBrand}${cnPart} to China? Official customs limits, Red Channel declaration, Chinese pharmacy name, and in-country rules.`;

  return {
    title,
    description,
    keywords: [
      `bring ${primaryBrand} to china`,
      `${primaryBrand} in china`,
      `${primaryBrand} in chinese`,
      `${primaryBrand} chinese name`,
      `can i bring ${med.genericName} to china`,
      `${primaryBrand} china customs`,
      `how to buy ${primaryBrand} in china`,
      `china customs medication ${med.slug}`,
    ],
    alternates: getHreflangAlternates(`/drugs/${med.slug}`),
    openGraph: {
      title,
      description,
      url: `https://chinamedscheck.com/drugs/${med.slug}`,
      siteName: 'ChinaMedsCheck',
      type: 'article',
    },
  };
}

export default function DrugDetailPage({ params }: PageProps) {
  const med = getMedicationBySlug(params.slug);

  if (!med) {
    notFound();
  }

  const primaryBrand = med.brandNames[0];
  const gacc = med.clearanceProfiles?.gaccCustoms;
  const caac = med.clearanceProfiles?.caacAviation;
  const refill = med.clearanceProfiles?.localRefill;

  // Dynamic bilingual FAQ item capturing "What is X called in Chinese" (4,000+/mo search intent)
  const bilingualFaq = {
    question: `What is ${primaryBrand} called in Chinese and can I buy it in China?`,
    answer: `${primaryBrand} (${med.genericName}) is officially known in Chinese as ${med.chineseName}${med.pinyin ? ` (Pinyin: ${med.pinyin})` : ''}. ${med.localAlternative || ''}`,
  };
  const allFaqs = [bilingualFaq, ...med.faqItems];

  // Structured Data (Schema.org)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MedicalWebPage',
        '@id': `https://chinamedscheck.com/drugs/${med.slug}#webpage`,
        url: `https://chinamedscheck.com/drugs/${med.slug}`,
        name: `Can I Bring ${primaryBrand} to China? 2026 Rules`,
        description: med.summary,
        about: {
          '@type': 'Drug',
          name: primaryBrand,
          nonProprietaryName: med.genericName,
          alternateName: med.brandNames,
          legalStatus: med.category,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `https://chinamedscheck.com/drugs/${med.slug}#faq`,
        mainEntity: allFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {/* Breadcrumb Bar */}
          <nav className="flex items-center gap-2 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900 transition">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <Link href="/drugs" className="hover:text-slate-900 transition">
              Medication Directory
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{primaryBrand}</span>
          </nav>

          {/* 1. HIGH-DENSITY PARAMETER HUD (Spec Sheet) */}
          <DrugSpecSheet med={med} />

          {/* 2. ON-PAGE INLINE TRAVEL SIMULATOR */}
          <DrugInlineCalculator med={med} />

          {/* 3. PROGRESSIVE DISCLOSURE COLLAPSIBLE ACCORDION DRAWERS */}
          <div className="space-y-4 pt-2">
            {/* Drawer 1: Dual Compliance Radar (GACC vs CAAC) */}
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
              <summary className="p-5 font-extrabold text-sm text-slate-900 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-blue-600" />
                  <span>Dual Border Jurisdictions: GACC Customs vs CAAC Aviation Security</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-1 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Scale className="h-4 w-4 text-slate-700" />
                    <span>GACC Customs Clearance (海关通关)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {med.customsRule}
                  </p>
                  <div className="pt-1 text-slate-500 font-mono text-[11px]">
                    Basis: {gacc?.legalBasis || med.legalBasis}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Plane className="h-4 w-4 text-indigo-600" />
                    <span>CAAC Aviation Security (飞行安检)</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {caac?.securityAdvisory || 'Standard oral medication permitted in carry-on cabin baggage with original prescription.'}
                  </p>
                  <div className="pt-1 text-slate-500 text-[11px]">
                    Placement: <strong>{caac?.carryOn === 'ALLOWED' ? 'Cabin or Checked OK' : 'Cabin Carry-on ONLY with Doctor Rx'}</strong>
                  </div>
                </div>
              </div>
            </details>

            {/* Drawer 2: In-China Refill Reality & Local Alternatives */}
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" open>
              <summary className="p-5 font-extrabold text-sm text-slate-900 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none">
                <div className="flex items-center gap-2">
                  <Hospital className="h-4 w-4 text-emerald-600" />
                  <span>In-China Local Refill Protocol & Approved Alternatives</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-1 border-t border-slate-100 space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Facility Tier:</span>
                    <span className="text-slate-600">{refill?.hospitalTier || 'Tier-3 Public Hospital Outpatient'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Doctor Qualification:</span>
                    <span className="text-slate-600">{refill?.specialistRequired || 'Licensed Specialist'}</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="font-bold text-slate-900 block mb-1">Outpatient Cap:</span>
                    <span className="text-slate-600">{refill?.maxRefillDays ? `Max ${refill.maxRefillDays} Days` : 'Not prescribable'}</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">China Domestic Medical Alternatives:</span>
                  <p className="text-slate-700 leading-relaxed">{med.localAlternative}</p>
                </div>
              </div>
            </details>

            {/* Drawer 3: Before-Packing Traveler Checklist */}
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <summary className="p-5 font-extrabold text-sm text-slate-900 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none">
                <div className="flex items-center gap-2">
                  <PackageCheck className="h-4 w-4 text-slate-700" />
                  <span>Before-Packing Traveler Checklist (Packaging & Documents)</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-1 border-t border-slate-100 space-y-3 text-xs text-slate-600">
                <ul className="list-disc pl-5 space-y-1.5 leading-relaxed">
                  <li>Keep medication in original dispensing pharmacy packaging with clear prescription label.</li>
                  <li>Carry original physical doctor prescription certificate matching the traveler's passport name 100%.</li>
                  <li>Never combine loose tablets in unmarked plastic pill organizers or zip-lock bags.</li>
                  {med.beforePackingTips?.map((tip, idx) => (
                    <li key={idx} className="text-slate-800 font-medium">{tip}</li>
                  ))}
                </ul>
              </div>
            </details>

            {/* Drawer 4: Statutory Legal Basis & Consular Advisories */}
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <summary className="p-5 font-extrabold text-sm text-slate-900 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none">
                <div className="flex items-center gap-2">
                  <Quote className="h-4 w-4 text-slate-700" />
                  <span>Statutory Legal Basis & Consular Advisories</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-1 border-t border-slate-100 space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
                  {med.legalBasis}
                </div>
                {med.authorityNotes && (
                  <p className="p-3 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
                    <strong>Official Advisory:</strong> {med.authorityNotes}
                  </p>
                )}
              </div>
            </details>

            {/* Drawer 5: Frequently Asked Questions */}
            <details className="group bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <summary className="p-5 font-extrabold text-sm text-slate-900 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition select-none">
                <div className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600" />
                  <span>Frequently Asked Questions About {primaryBrand} in China</span>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400 group-open:rotate-180 transition-transform" />
              </summary>
              <div className="p-5 pt-1 border-t border-slate-100 space-y-3 text-xs">
                {allFaqs.map((faq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      {faq.question}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>

          {/* Quick Terminal Guide Bar */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Plane className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-slate-900 block text-sm">Need airport terminal walkthrough?</span>
                <span className="text-slate-500">
                  Read official customs declaration desk locations at PVG, PEK, CAN, and PKX.
                </span>
              </div>
            </div>
            <Link
              href="/guide/port-clearance-walkthrough"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold shrink-0 flex items-center gap-1.5 transition shadow-xs"
            >
              <span>View Airport Walkthrough</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* Contextual CTA */}
          {med.affiliateCategory === 'clinic' ? (
            <ExpatClinicDirectoryCTA />
          ) : (
            <TravelInsuranceCTA medicationName={primaryBrand} />
          )}
        </div>
      </div>
    </>
  );
}
