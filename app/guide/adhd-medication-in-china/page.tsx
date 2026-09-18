import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  Scale,
  Hospital,
  Quote,
  HelpCircle,
  FileCheck2,
  XCircle,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'ADHD Medication in China: 2026 Customs and Legal Guide',
  description:
    'Can you bring Adderall, Vyvanse or Concerta to China? Learn GACC narcotic rules, penalty risks, doctor note standards, and approved in-country alternatives.',
  alternates: getHreflangAlternates('/guide/adhd-medication-in-china'),
  openGraph: {
    title: 'ADHD Medication in China: 2026 Customs and Legal Guide',
    description:
      'Can you bring Adderall, Vyvanse or Concerta to China? Learn GACC narcotic rules, penalty risks, doctor note standards, and approved in-country alternatives.',
    url: 'https://chinamedscheck.com/guide/adhd-medication-in-china',
    siteName: 'ChinaMedsCheck',
    type: 'article',
  },
};

export default function AdhdMedicationGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://chinamedscheck.com/guide/adhd-medication-in-china#article',
        headline: 'ADHD Medication in China: 2026 Customs Rules, Legality & Alternatives',
        description:
          'Comprehensive legal guide on bringing ADHD stimulant and non-stimulant medications into China, covering Adderall, Vyvanse, Concerta, and local psychiatric hospital refills.',
        datePublished: '2026-01-15T08:00:00+08:00',
        dateModified: '2026-09-18T08:00:00+08:00',
        author: {
          '@type': 'Organization',
          name: 'ChinaMedsCheck Regulatory Editorial Board',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://chinamedscheck.com/guide/adhd-medication-in-china#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I bring Adderall to China with an official doctor prescription?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Adderall contains Amphetamine salts, which are classified as illegal Schedule I narcotics under Article 357 of the Criminal Law of the People’s Republic of China. Foreign prescriptions provide zero legal protection. Carrying Adderall into China can result in baggage seizure, administrative detention, or criminal drug smuggling charges.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Vyvanse legal in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Vyvanse (Lisdexamfetamine) is a prodrug of dextroamphetamine. It is strictly controlled and not approved for sale or prescription within mainland China. Attempting to bring Vyvanse through customs is treated as carrying unauthorized controlled stimulants.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I bring Concerta or Ritalin into China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Concerta and Ritalin (Methylphenidate) are classified as Category I Psychotropic Substances in China. Travelers may carry up to a 7-day to 15-day personal supply ONLY if they declare at the Red Channel with an original doctor prescription certificate clearly stating their passport number, exact dosage, and diagnosis.',
            },
          },
          {
            '@type': 'Question',
            name: 'What legal ADHD medications can I get inside China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'In mainland China, licensed psychiatrists at Tier-3 public hospitals and select international clinics can legally prescribe Concerta (extended-release Methylphenidate / 专注达) and Strattera (Atomoxetine / 择思达, a non-stimulant alternative). Adderall is completely unavailable legally.',
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-slate-50 min-h-screen py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 text-xs font-mono font-bold text-rose-800">
              <ShieldAlert className="h-3.5 w-3.5 text-rose-600" />
              <span>GACC &amp; PRC Criminal Law High-Risk Category</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              ADHD Medication in China: 2026 Customs Rules, Legality &amp; Alternatives
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              An authoritative compliance walkthrough for international travelers, exchange students, and expatriates prescribed ADHD medications (Adderall, Vyvanse, Concerta, Ritalin, and Strattera) entering the People’s Republic of China.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 flex-wrap">
              <span>Updated: September 2026</span>
              <span>•</span>
              <span>Statutory Compliance Review: Verified for 2026/2027 Entry</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </div>

          {/* Critical Risk Breakdown Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
              ADHD Stimulant Legal Status Matrix in China (2026)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-rose-50/80 border border-rose-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-rose-900 text-sm">Adderall / Mydayis</span>
                  <XCircle className="h-4 w-4 text-rose-600" />
                </div>
                <p className="text-rose-700 font-mono text-[11px]">Amphetamine Salts</p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>ZERO TOLERANCE (Banned).</strong> Classified as an illicit narcotic under Article 357. Foreign doctor notes hold no legal weight.
                </p>
                <div className="pt-1 text-rose-800 font-bold">Allowance: 0 Days</div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-amber-900 text-sm">Vyvanse / Elvanse</span>
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                </div>
                <p className="text-amber-800 font-mono text-[11px]">Lisdexamfetamine</p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>STRICTLY CONTROLLED.</strong> Prodrug of amphetamine. Not approved in China. Severe customs detention risk if undeclared.
                </p>
                <div className="pt-1 text-amber-900 font-bold">Allowance: 0-7 Days (Max Risk)</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-900 text-sm">Concerta / Ritalin</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <p className="text-emerald-800 font-mono text-[11px]">Methylphenidate (专注达)</p>
                <p className="text-slate-700 leading-relaxed">
                  <strong>RESTRICTED / DECLARATION.</strong> Class I Psychotropic. Permitted up to 7-15 days supply with original Rx at Red Channel.
                </p>
                <div className="pt-1 text-emerald-900 font-bold">Allowance: Max 7-15 Days</div>
              </div>
            </div>
          </div>

          {/* Core Guide Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                1. Why Adderall Is Strictly Banned in China
              </h2>
              <p>
                In the United States and Canada, Adderall (mixed amphetamine salts) is one of the most widely prescribed medications for Attention Deficit Hyperactivity Disorder (ADHD). However, under the <strong>Criminal Law of the People’s Republic of China (Articles 347 and 357)</strong> and the State Council Narcotic Drugs Catalogue, amphetamine compounds are categorized alongside methamphetamine and heroin as prohibited narcotics.
              </p>
              <p>
                China enforces a strict statutory definition of narcotics based on chemical structure rather than clinical intent. Even if you possess a valid written prescription from a licensed American or European psychiatrist, Chinese customs and border police (GACC) do not recognize foreign medical exemptions for amphetamine salts. Carrying Adderall across the border can result in immediate confiscation, administrative detention up to 15 days, deportation, or criminal prosecution for drug smuggling.
              </p>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                <strong>Diplomatic Advisory:</strong> The U.S. Embassy and Consulates in China explicitly publish:
                <em className="block mt-1">"Adderall is considered an illegal drug in China. Travelers carrying it can be detained or arrested for drug trafficking, even with a valid U.S. prescription. Do not attempt to bring it into China."</em>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                2. Bringing Concerta and Ritalin (Methylphenidate)
              </h2>
              <p>
                Unlike amphetamines, <strong>Methylphenidate</strong> (marketed as Concerta / 专注达 and Ritalin / 利他林) is legally recognized in China as a Category I Psychotropic Substance. It is prescribable within China under strict hospital red-prescription protocols.
              </p>
              <p>
                If you must travel to China with Concerta or Ritalin, you must adhere strictly to GACC Notice No. 43 and the UN INCB Traveler Regulations:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>Quantity Limit:</strong> Carry no more than a <strong>7-day to 15-day personal travel supply</strong>. Bringing a 90-day supply will result in customs seizure of the excess quantity.</li>
                <li><strong>Red Channel Declaration:</strong> You must declare the medication upon landing at the Customs Red Channel (Goods to Declare) desk. Never walk through the Green Channel.</li>
                <li><strong>Original Doctor Certificate:</strong> Bring a formal doctor's note on hospital letterhead stating: your full passport name, passport number, formal ADHD diagnosis, exact daily dose, and total quantity carried.</li>
                <li><strong>Original Packaging:</strong> All tablets must remain in their original pharmacy-dispensed bottles with the manufacturer label intact.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                3. Transitioning to Approved In-Country Alternatives
              </h2>
              <p>
                For travelers staying in China for longer than two weeks (such as semester exchange students, university faculty, or corporate assignees), carrying enough medication from abroad is legally impossible. You must prepare a medical transition plan 4 to 8 weeks before departing:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Option A: Concerta (专注达)</div>
                  <p className="text-slate-600">
                    Methylphenidate ER is available in China. You must visit a psychiatric outpatient clinic at a Chinese Tier-3 public hospital (三甲医院精神科) or an accredited international clinic (e.g., United Family Healthcare, Jiahui Health).
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">Maximum refill: 7 to 15 days per hospital visit.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="font-bold text-slate-900 text-sm">Option B: Strattera (择思达 / 托莫西汀)</div>
                  <p className="text-slate-600">
                    Atomoxetine is a non-stimulant selective norepinephrine reuptake inhibitor. Because it has zero abuse potential, it is an unrestricted prescription drug in China and can be prescribed for up to 30 days per visit.
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">Widely available across public and private hospitals.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                4. Step-by-Step Guide: Seeing a Psychiatrist in China
              </h2>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>Bring Historical Records:</strong> Prepare an official medical summary letter from your home doctor detailing your psychiatric history, previous EEG or neuropsychological testing, and current dosage.</li>
                <li><strong>Choose the Right Facility:</strong> For English-speaking consultations, choose an international hospital or the International Medical Wing (特需门诊) of a top public psychiatric hospital (such as Beijing Anding Hospital, Shanghai Mental Health Center, or Guangzhou Huiai Hospital).</li>
                <li><strong>Bring Identification:</strong> You must present your original passport for real-name electronic registration.</li>
                <li><strong>Undergo Clinical Evaluation:</strong> Chinese law requires an in-person diagnostic evaluation prior to dispensing any Category I psychotropic medication.</li>
              </ol>
            </section>

            {/* Quick Links to Medication Dossiers */}
            <section className="space-y-4 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Check Specific ADHD Medication Details &amp; Pharmacy Cards:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <Link
                  href="/drugs/adderall-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Adderall in China</span>
                    <span className="text-slate-500 text-[11px]">Banned narcotic rules &amp; penalties</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/drugs/vyvanse-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Vyvanse in China</span>
                    <span className="text-slate-500 text-[11px]">Lisdexamfetamine customs regulations</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/drugs/ritalin-concerta-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Concerta &amp; Ritalin in China</span>
                    <span className="text-slate-500 text-[11px]">7-15 day declaration limits</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/drugs/strattera-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Strattera (Atomoxetine)</span>
                    <span className="text-slate-500 text-[11px]">Approved non-stimulant alternative</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>
            </section>
          </div>

          {/* Interactive Tools Callout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Essential Tools for ADHD Medication Travel
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href="/calculator"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white transition flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 block group-hover:text-blue-600">Personal Allowance Calculator</span>
                  <span className="text-slate-500">Calculate exact 7, 15 or 30-day compliance caps</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
              </Link>

              <Link
                href="/customs-card"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white transition flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 block group-hover:text-blue-600">Bilingual Customs Declaration Card</span>
                  <span className="text-slate-500">Generate printed Chinese-English paperwork</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600" />
              </Link>
            </div>
          </div>

          {/* Expat Clinic Lead Magnet */}
          <ExpatClinicDirectoryCTA />

          {/* Email Newsletter */}
          <LeadCaptureEmailCard />
        </div>
      </div>
    </>
  );
}
