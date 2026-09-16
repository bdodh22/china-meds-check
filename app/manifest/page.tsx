import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Luggage,
  ShieldCheck,
  AlertTriangle,
  Scale,
  Plane,
  FileText,
  CheckCircle2,
  AlertOctagon,
  Stethoscope,
  Building,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';
import TravelBagWidget from '@/components/tools/TravelBagWidget';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'China Travel Medication Packing Manifest and Bag Radar',
  description:
    'Check multiple medications for China travel. Multi-drug baggage radar for customs allowance, chemical ingredient stacking and aviation liquid rules.',
  alternates: getHreflangAlternates('/manifest'),
  openGraph: {
    title: 'China Travel Medication Packing Manifest and Bag Radar',
    description:
      'Check multiple medications for China travel. Multi-drug baggage radar for customs allowance, chemical ingredient stacking and aviation liquid rules.',
    url: 'https://chinamedscheck.com/manifest',
    siteName: 'ChinaMedsCheck',
    locale: 'en_US',
    type: 'website',
  },
};

export default function ManifestPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'China Travel Medication Baggage Manifest Auditor',
    operatingSystem: 'Any',
    applicationCategory: 'TravelApplication, HealthApplication',
    description:
      'Multi-medication travel manifest auditor evaluating GACC customs allowances, active ingredient stacking, and CAAC civil aviation security rules.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I bring multiple different prescription medications to China in one bag?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, international travelers may bring multiple different medications for personal therapy into China, provided each medication has an original prescription matching your passport, is kept in original packaging, and stays within the personal reasonable supply limits (7 to 15 days for controlled psychotropics, up to 90 days for standard chronic medicines).',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the precursor chemical limit for cold medicines like Sudafed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under State Council Decree 445 on Precursor Chemicals, oral cold medications containing Pseudoephedrine are limited to a reasonable personal quantity, strictly defined as no more than 2 retail packs (7-10 days). Bulk quantities can trigger anti-smuggling criminal charges.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I pass airport security with cold-chain insulin or Ozempic ice packs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Civil Aviation Administration of China (CAAC) security checkpoints restrict liquids over 100ml. Gel cooling packs and ice packs require an official stamped doctor certificate explaining the biological cold-chain requirement. Injection pen needles must be carried in cabin baggage alongside the pens.',
        },
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Luggage className="h-4 w-4" />
            <span>Polypharmacy & Multi-Drug Travel Radar</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            China Travel Medication Packing Manifest & Bag Auditor
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Traveling with a family first-aid kit, multiple chronic therapies, or psychiatric prescriptions? Audit your complete luggage manifest for aggregate customs allowances, chemical ingredient stacking, and civil aviation checkpoint compliance.
          </p>
        </div>

        {/* The Interactive Travel Bag Widget */}
        <div className="mb-14">
          <TravelBagWidget />
        </div>

        {/* Static In-Depth Authority Content (Pre-rendered for SEO & no-JS readers) */}
        <div className="space-y-12">
          {/* Section 1: The Three Pillars of Multi-Med Travel Baggage */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              Understanding China's Three-Tier Baggage Assessment Framework
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base mb-6">
              When international travelers arrive at Shanghai Pudong (PVG), Beijing Capital (PEK), or Guangzhou Baiyun (CAN), customs enforcement evaluates your luggage as an integrated whole rather than inspecting pills in isolation. The General Administration of Customs of China (GACC) enforces three distinct legal benchmarks:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold mb-3">
                  <AlertOctagon className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  1. Zero-Tolerance Contraband
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Substances classified under PRC Criminal Law Article 347 (Amphetamines, Vyvanse, CBD oil, THC gummies, Codeine syrups) trigger immediate border detention. Even a single capsule in a toiletry bag taints your entire luggage.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-3">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  2. Controlled Psychotropics
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Methylphenidate (Concerta) and Benzodiazepines (Xanax, Klonopin) are legally permitted but strictly capped at <strong>7 to 15 days supply</strong>. Mandatory Red Channel declaration with matching doctor certificates is legally required.
                </p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold mb-3">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  3. Standard Maintenance Rx
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Antihypertensives, Metformin, SSRI antidepressants, and standard OTC pain relievers (Ibuprofen, Paracetamol) fall under the <strong>90-day personal reasonable use exemption</strong>. They can clear the Green Channel safely.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2: Chemical Stacking & Precursor Chemicals */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              Precursor Chemicals & Chemical Stacking: Why Single-Drug Searches Fail
            </h2>
            <div className="prose prose-slate max-w-none text-sm md:text-base leading-relaxed text-slate-600 space-y-4">
              <p>
                A primary reason travelers face unexpected questioning at Chinese ports of entry is <strong>combination drug stacking</strong>. In western retail pharmacies, multiple over-the-counter flu formulas (such as Sudafed PE, DayQuil, Advil Cold & Sinus, and Contac) combine multiple active ingredients:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700">
                <li>
                  <strong>Pseudoephedrine Hydrochloride (盐酸伪麻黄碱):</strong> Classified as a Category 1 Precursor Chemical in China. While one or two standard packs for travel colds are accepted under personal use, carrying more than 2 boxes or multiple brands containing pseudoephedrine triggers anti-smuggling inspection for methamphetamine precursor synthesis.
                </li>
                <li>
                  <strong>Acetaminophen (对乙酰氨基酚):</strong> Common in both daytime and nighttime cold remedies. Carrying multiple boxes of different brands is scrutinized for commercial resale intent and clinical overdose hazards.
                </li>
                <li>
                  <strong>Opioid Derivatives (Codeine / Dextromethorphan):</strong> Liquid syrups containing codeine are strictly banned from casual entry. Solid forms require formal red channel declaration.
                </li>
              </ul>
            </div>
          </section>

          {/* Section 3: Civil Aviation Security (CAAC) vs Customs (GACC) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-4">
              Civil Aviation (CAAC) vs Customs (GACC): The Dual Clearance Gauntlet
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-6">
              Travelers often confuse airport security screening with customs import inspection. They operate under completely different ministerial jurisdictions with separate criteria:
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse border border-slate-200 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-800 text-xs uppercase font-bold">
                  <tr>
                    <th className="py-3 px-4 border-b border-slate-200">Dimension</th>
                    <th className="py-3 px-4 border-b border-slate-200">GACC China Customs (海关)</th>
                    <th className="py-3 px-4 border-b border-slate-200">CAAC Aviation Security (安检)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs md:text-sm">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Regulatory Focus</td>
                    <td className="py-3 px-4 text-slate-700">Import legality, narcotics control, tax compliance, quantity quotas (7-90 days).</td>
                    <td className="py-3 px-4 text-slate-700">Flight safety, liquid limits (&lt;100ml), sharps, flammable materials, lithium batteries.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Physical Checkpoint</td>
                    <td className="py-3 px-4 text-slate-700">Arrival hall, after baggage claim at the Red/Green Channel exit.</td>
                    <td className="py-3 px-4 text-slate-700">Departure boarding security checkpoint & transit security gates.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Cold-Chain Gel Ice Packs</td>
                    <td className="py-3 px-4 text-slate-700">Permitted freely if the biological medicine is legitimate personal use.</td>
                    <td className="py-3 px-4 text-slate-700"><strong>CONFISCATED</strong> if liquid &gt;100ml unless accompanied by a stamped physician cooling certificate.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Pen Needles & Sharps</td>
                    <td className="py-3 px-4 text-slate-700">Exempt with diabetes / GLP-1 prescription.</td>
                    <td className="py-3 px-4 text-slate-700">Allowed in cabin <strong>only</strong> when accompanied by matching injection pen and prescription label.</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Luggage Placement</td>
                    <td className="py-3 px-4 text-slate-700">Inspects both checked bags (via pre-screening CT) and carry-on bags.</td>
                    <td className="py-3 px-4 text-slate-700">Strongly mandates controlled and emergency meds stay in <strong>cabin carry-on</strong>.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Verified Port Walkthrough Link */}
          <section className="bg-gradient-to-r from-slate-900 to-blue-950 text-white rounded-2xl p-8 md:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">
                Physical Airport Navigation
              </span>
              <h3 className="text-2xl font-bold tracking-tight">
                Read the Official China Airport Customs Walkthrough
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Step-by-step physical terminal walkthroughs for Shanghai Pudong (PVG), Beijing Capital (PEK), Guangzhou Baiyun (CAN), and Beijing Daxing (PKX). Know where the Red Channel desk is and what to say.
              </p>
            </div>
            <Link
              href="/guide/port-clearance-walkthrough"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shrink-0 flex items-center gap-2 shadow-md transition-all hover:translate-x-1"
            >
              <span>View Airport Walkthroughs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          {/* Section 5: FAQs */}
          <section className="bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-sm">
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-6 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-blue-600" />
              Frequently Asked Questions About Multi-Med Baggage in China
            </h2>

            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  Can I bring multiple different prescription medications to China in one bag?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Yes, international travelers may bring multiple different medications for personal therapy into China, provided each medication has an original prescription matching your passport, is kept in original packaging, and stays within the personal reasonable supply limits (7 to 15 days for controlled psychotropics, up to 90 days for standard chronic medicines).
                </p>
              </div>

              <div className="border-b border-slate-100 pb-5">
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  What is the precursor chemical limit for cold medicines like Sudafed?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Under State Council Decree 445 on Precursor Chemicals, oral cold medications containing Pseudoephedrine are limited to a reasonable personal quantity, strictly defined as no more than 2 retail packs (7-10 days). Bulk quantities can trigger anti-smuggling criminal charges.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 text-base mb-2">
                  How do I pass airport security with cold-chain insulin or Ozempic ice packs?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Civil Aviation Administration of China (CAAC) security checkpoints restrict liquids over 100ml. Gel cooling packs and ice packs require an official stamped doctor certificate explaining the biological cold-chain requirement. Injection pen needles must be carried in cabin baggage alongside the pens.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
