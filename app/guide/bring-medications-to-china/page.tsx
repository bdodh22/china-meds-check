import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
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
  Building,
  Quote,
  CheckSquare,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';

import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Bringing Medications to China Guide: 2025 Customs Rules',
  description:
    'Official China Customs medication entry guide. Learn GACC Decree 43 rules, 7-15 day psychotropic limits, Red Channel declaration & doctor note standards.',
  alternates: getHreflangAlternates('/guide/bring-medications-to-china'),
};

export default function BringMedicationsGuidePage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200 text-xs font-mono font-bold text-slate-700">
            <BookOpen className="h-3.5 w-3.5 text-blue-700" />
            <span>UN INCB & GACC Aligned Traveler Manual</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How to Bring Medications to China: Complete Customs, Legal & INCB Guide (2025/2026)
          </h1>

          <p className="text-base text-slate-600 leading-relaxed">
            An authoritative, practical compliance walkthrough for foreign travelers carrying prescription medications into the People's Republic of China, grounded in official United Nations INCB guidelines and Chinese Customs regulations.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 flex-wrap">
            <span>Reviewed: January 2025</span>
            <span>•</span>
            <span>Based on GACC Decree No. 43 & NMPA Catalogues</span>
            <span>•</span>
            <span>15 min read</span>
          </div>
        </div>

        {/* Quick Action Navigation Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
            Essential Decision Radar & Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <Link
              href="/"
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
            >
              <span className="font-bold text-slate-900">1. Search Drug Radar</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
            <Link
              href="/calculator"
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
            >
              <span className="font-bold text-slate-900">2. Days Allowance Calc</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
            <Link
              href="/customs-card"
              className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
            >
              <span className="font-bold text-slate-900">3. Bilingual Customs Card</span>
              <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
            </Link>
          </div>
        </div>

        {/* Official Foreign Diplomatic Advisories Callout */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
            <Quote className="h-4 w-4 text-blue-600" />
            <span>Official Foreign Embassy Warnings on China Medication Entry</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">U.S. Embassy in Beijing:</span>
              <p className="leading-relaxed">
                "Adderall is considered an illegal drug in China. Travelers carrying it can be detained or arrested for drug trafficking, even with a valid U.S. prescription. Do not attempt to bring it."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">UK FCDO (Foreign Office):</span>
              <p className="leading-relaxed">
                "China has strict laws regarding medication. Any medicine containing codeine, pseudoephedrine, or sleeping aids must be declared upon arrival at the Red Channel with an official doctor's note."
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block">Japan MOFA Overseas Safety:</span>
              <p className="leading-relaxed">
                "Ensure that doctor certifications for psychotropics state the traveler's passport number, hospital stamp, exact daily dosage, and total quantity carried to avoid customs detention."
              </p>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              1. The Legal Foundation: UN INCB Regulations & Chinese Penal Law
            </h2>
            <p>
              Entering China with prescription medication is governed by the <strong>United Nations International Narcotics Control Board (INCB)</strong> Guidelines for Travelers and China's domestic regulatory statutes.
            </p>
            <p>
              In official communications submitted by Chinese health authorities to the UN INCB, China established that travelers carrying narcotic drugs or Category 1 and 2 psychotropic substances:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2 text-slate-600 text-sm">
              <li>May carry only quantities strictly for <strong>personal medical use</strong> during travel;</li>
              <li>Must limit quantities to <strong>one standard treatment course (usually 7 to 15 days maximum)</strong>;</li>
              <li>Must submit an <strong>original physician diagnosis certificate</strong> containing patient passport details, physician license, and clinic stamp;</li>
              <li>Must declare the items via the <strong>Red Channel (Customs Passenger Declaration Form)</strong> upon arrival.</li>
            </ul>
          </section>

          {/* Section 2: GACC Announcement No. 43 */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              2. GACC Announcement No. 43 & Personal Value Limits
            </h2>
            <p>
              Under <strong>General Administration of Customs Announcement No. 43</strong>:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">RMB 5,000 Personal Duty-Free Allowance:</span>
                <p className="text-slate-600 leading-relaxed">
                  Non-resident travelers are permitted to bring personal effects valued up to 5,000 RMB tax-free. Expensive biological therapies (such as Ozempic or specialized biologics) exceeding this value must demonstrate personal medical necessity to prevent commercial import duties.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="font-bold text-slate-900 block">Strict Ceiling on Pseudoephedrine Cold Medicines:</span>
                <p className="text-slate-600 leading-relaxed">
                  Over-the-counter cold formulas containing pseudoephedrine (Sudafed, Claritin-D) are restricted to <strong>maximum 2 retail boxes</strong>. Carrying commercial cartons triggers precursor drug trafficking investigations under Decree No. 445.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: The Three Tiers */}
          <section className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              3. The Three Compliance Tiers at China Customs
            </h2>

            {/* Red Tier */}
            <div className="p-5 rounded-xl border-2 border-rose-200 bg-rose-50/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-rose-900 text-sm">
                <ShieldAlert className="h-4 w-4 text-rose-600" />
                <span>Tier 1: Strictly Prohibited / Illegal (Zero Tolerance)</span>
              </div>
              <p className="text-xs text-rose-950 leading-relaxed">
                <strong>Substances:</strong> Adderall (Amphetamine/Dextroamphetamine), Vyvanse (Lisdexamfetamine), CBD Oils & Gummies, Medical Marijuana (THC).
              </p>
              <p className="text-xs text-rose-900 leading-relaxed">
                <strong>Rule:</strong> Absolute zero tolerance. Foreign prescriptions hold zero legal validity. Criminal penalties under PRC Criminal Law Articles 347 and 357 apply regardless of medical necessity.
              </p>
            </div>

            {/* Yellow Tier */}
            <div className="p-5 rounded-xl border-2 border-amber-200 bg-amber-50/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <span>Tier 2: Controlled Psychotropics & Narcotics (Red Channel Mandatory)</span>
              </div>
              <p className="text-xs text-amber-950 leading-relaxed">
                <strong>Substances:</strong> Concerta & Ritalin (Methylphenidate), Modafinil, Xanax (Alprazolam), Klonopin (Clonazepam), Ambien (Zolpidem), Fentanyl patches, Oxycodone, Tramadol, Codeine.
              </p>
              <p className="text-xs text-amber-900 leading-relaxed">
                <strong>Rule:</strong> Permitted strictly within personal travel needs (7 to 15 days for Category 1 / Narcotics; up to 30 days for Category 2). Must declare at the Red Channel with doctor certification.
              </p>
            </div>

            {/* Green Tier */}
            <div className="p-5 rounded-xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2">
              <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>Tier 3: Standard Maintenance Prescription & OTC Drugs</span>
              </div>
              <p className="text-xs text-emerald-950 leading-relaxed">
                <strong>Substances:</strong> Ibuprofen, Paracetamol/Tylenol, Melatonin, Metformin, Blood Pressure / Statin medications, SSRI Antidepressants (Prozac, Zoloft, Lexapro), Ozempic / Mounjaro.
              </p>
              <p className="text-xs text-emerald-900 leading-relaxed">
                <strong>Rule:</strong> Permitted through the Green Channel in reasonable quantities (typically up to 90 days) in original retail boxes.
              </p>
            </div>
          </section>

          {/* Section 4: Mandatory INCB Doctor's Note Fields */}
          <section id="prescription-rules" className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-700" />
              4. Mandatory Fields for Your Doctor's Certificate (INCB Standard)
            </h2>
            <p>
              To ensure customs officers accept your documents without delay, verify that your physician's letter includes the following 7 essential elements:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Patient Full Legal Name & Passport Number</strong> (must match airline ticket 100%)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Clinical Medical Diagnosis</strong> (e.g. ADHD, Seizure Disorder, Chronic Lumbar Pain)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Trade Name & Chemical INN Name</strong> (e.g. Concerta / Methylphenidate HCl)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Prescribed Dosage & Regimen</strong> (single dose, intake frequency, daily limit)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Total Quantity Carried & Duration</strong> (confirming duration matches travel stay)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 flex items-start gap-2">
                <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Physician License Number & Signature</strong> with clinic phone and physical address</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/customs-card"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 underline"
              >
                <span>Use our Bilingual Declaration Card Generator to assemble these fields automatically</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </section>

          {/* Section 5: In-China Refills & International Clinics */}
          <section id="international-hospitals" className="space-y-4 pt-6 border-t border-slate-100">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Hospital className="h-6 w-6 text-blue-700" />
              5. Refilling Prescriptions in China: Top Expat Clinics
            </h2>
            <p>
              Foreign retail prescriptions cannot be dispensed at Chinese drugstores. If you are staying in China for longer than the allowable carry limits (e.g. &gt;15 days for Concerta or Xanax), book an appointment with an international medical center upon arrival.
            </p>
            <ExpatClinicDirectoryCTA />
          </section>
        </div>

        {/* Travel Health Insurance CTA */}
        <TravelInsuranceCTA />
      </div>
    </div>
  );
}
