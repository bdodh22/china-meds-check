import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Syringe,
  Plane,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  Clock,
  CheckCircle2,
  ThermometerSnowflake,
  AlertTriangle,
  Hospital,
  Scale,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Insulin and Injectables in China: 2026 Customs Guide',
  description:
    'China Customs and CAAC rules for traveling with insulin, Ozempic, syringes, and cold-pack medicine. Learn 90-day quotas and hospital refill steps.',
  alternates: getHreflangAlternates('/guide/insulin-injectables-china-customs'),
  openGraph: {
    title: 'Insulin and Injectables in China: 2026 Customs Guide',
    description:
      'China Customs and CAAC rules for traveling with insulin, Ozempic, syringes, and cold-pack medicine. Learn 90-day quotas and hospital refill steps.',
    url: 'https://chinamedscheck.com/guide/insulin-injectables-china-customs',
    siteName: 'ChinaMedsCheck',
    type: 'article',
  },
};

export default function InsulinInjectablesGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://chinamedscheck.com/guide/insulin-injectables-china-customs#article',
        headline: 'Insulin & Injectables in China: Customs, CAAC & Travel Guide',
        description:
          'Authoritative guide on flying into China with insulin pens, GLP-1 injectables (Ozempic/Mounjaro), sharps/needles, cold-chain temperature monitoring, and Chinese customs 90-day allowance rules.',
        datePublished: '2026-02-20T08:00:00+08:00',
        dateModified: '2026-09-18T08:00:00+08:00',
        author: {
          '@type': 'Organization',
          name: 'ChinaMedsCheck Aviation & Chronic Disease Desk',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://chinamedscheck.com/guide/insulin-injectables-china-customs#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can I bring insulin and injection needles onto the plane flying to China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Under Civil Aviation Administration of China (CAAC) security regulations, travelers with diabetes or chronic endocrine conditions may carry insulin pens, vials, and sterile disposable needles in their cabin carry-on baggage, provided they possess an official medical certificate or doctor prescription stating their passport name and medical necessity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Are cold packs or insulated medical cooler bags allowed through Chinese airport security?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Medically required ice packs, frozen gel coolers, and specialized battery-powered insulin refrigeration flasks are exempt from the standard 100ml liquid restriction when presented alongside the medication and a doctor note during airport security screening.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I bring Ozempic (Semaglutide) or Mounjaro into China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Ozempic (诺和泰) and Mounjaro (穆峰达) are fully legal in China and not controlled as narcotics. Travelers may carry up to a 3-month (90-day) personal supply in their luggage through the Green Channel. Retain the pharmacy packaging and doctor prescription.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do I refill insulin or Ozempic inside China if I run out?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Insulin and Ozempic cannot be bought over the counter; they require a doctor prescription. You can visit the endocrinology outpatient department of a Tier-3 public hospital (三甲医院内分泌科) or an expat clinic (United Family, Jiahui Health) with your passport and previous prescription history.',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-xs font-mono font-bold text-blue-800">
              <Syringe className="h-3.5 w-3.5 text-blue-600" />
              <span>CAAC Aviation &amp; GACC Customs Dual Protocol</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Insulin &amp; Injectables in China: Customs, CAAC &amp; Travel Guide
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              Essential guidance for travelers carrying insulin pens, Ozempic, Wegovy, Mounjaro, disposable syringes, and temperature-sensitive cold-chain medicine into the People’s Republic of China.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 flex-wrap">
              <span>Updated: September 2026</span>
              <span>•</span>
              <span>CAAC Aviation Security &amp; GACC Decree 43 Aligned</span>
              <span>•</span>
              <span>12 min read</span>
            </div>
          </div>

          {/* Quick Summary Bento Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
              At A Glance: Injectables &amp; Cold-Chain Checklist (2026)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-900 text-sm">Aviation Security (CAAC)</span>
                  <Plane className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-xl font-black text-blue-900">Cabin Carry-On ONLY</div>
                <p className="text-slate-700 leading-relaxed">
                  Never put insulin or Ozempic in checked luggage (cargo hold freezing risks). Needles and gel cold-packs are permitted in cabin with a doctor letter.
                </p>
                <div className="text-blue-800 font-bold pt-1">Exempt from 100ml Rule</div>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-900 text-sm">China Customs Quota</span>
                  <Scale className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-xl font-black text-emerald-900">Up to 90 Days</div>
                <p className="text-slate-700 leading-relaxed">
                  Chronic disease maintenance medications carry a generous 90-day (3-month) personal allowance under GACC Notice 43. Walk Green Channel.
                </p>
                <div className="text-emerald-800 font-bold pt-1">Green Channel Clearance</div>
              </div>

              <div className="p-4 rounded-xl bg-teal-50/80 border border-teal-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-teal-900 text-sm">In-China Refill</span>
                  <Hospital className="h-4 w-4 text-teal-600" />
                </div>
                <div className="text-xl font-black text-teal-900">Tier-3 Endocrine</div>
                <p className="text-slate-700 leading-relaxed">
                  Lantus, Humalog, NovoRapid, and Ozempic (诺和泰) are stocked at hospital outpatient pharmacies. Passport required for prescription.
                </p>
                <div className="text-teal-800 font-bold pt-1">Hospital Prescription Required</div>
              </div>
            </div>
          </div>

          {/* Core Guide Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                1. CAAC Aviation Security: Needles, Syringes &amp; Cold Packs
              </h2>
              <p>
                Under <strong>Civil Aviation Administration of China (CAAC) Order No. 6</strong> and international IATA aviation security conventions, biological injectables and associated injection devices are subject to clear screening protocols:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Carry-On Rule (Do Not Check In):</strong>
                  <p className="text-slate-700 leading-relaxed">
                    Insulin and peptide hormones (like Ozempic or Wegovy) must be carried in your <strong>cabin carry-on bag</strong>. Aircraft cargo holds regularly reach sub-zero temperatures during long-haul flights across Siberia or the Pacific, which can freeze and permanently denature the protein structure, rendering your medication ineffective.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Disposable Sharps &amp; Needles:</strong>
                  <p className="text-slate-700 leading-relaxed">
                    Airport security checkpoints at Chinese entry hubs (PVG, PEK, CAN, SZX) permit sterile injection pen needles and lancets in cabin baggage, provided you show an official doctor prescription or diabetes identity card matching your passport. Carry an empty hard plastic travel sharps container to store used needles during transit.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                  <strong className="text-slate-900 block text-sm">Gel Ice Packs &amp; Cooling Flasks:</strong>
                  <p className="text-slate-700 leading-relaxed">
                    Cooler bags containing frozen gel packs (such as Frio pouches or Dison mini-refrigerators) are legally exempt from the 100ml liquid limitation when accompanying necessary biological medication.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                2. China Customs (GACC) 90-Day Chronic Disease Quota
              </h2>
              <p>
                While psychiatric stimulants are capped at 7 to 15 days, non-controlled chronic disease therapies like insulin and GLP-1 receptor agonists enjoy a substantially larger personal allowance:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>90-Day Statutory Cap:</strong> Travelers with diabetes may bring up to a <strong>3-month personal maintenance supply</strong> (e.g. 6 to 12 insulin pens depending on daily unit dosage).</li>
                <li><strong>Green Channel Clearance:</strong> Because insulin and semaglutide contain zero psychotropic or narcotic substances, travelers with under 90 days supply can walk straight through the Green Channel without formal declaration.</li>
                <li><strong>Documentation Requirement:</strong> Keep your doctor’s letter in your travel folder. If luggage x-ray inspection flags the syringes, simply present the doctor note and the officer will waive you through.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                3. Chinese Brand Names for Common Insulins &amp; GLP-1 Drugs
              </h2>
              <p>
                If your medication cooler fails or you need an emergency refill in a Chinese city, use these official Chinese drug names when speaking to doctors or hospital pharmacists:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">Ozempic (Semaglutide)</div>
                  <div className="text-base font-black text-blue-900" lang="zh-Hans">诺和泰（司美格鲁肽注射液）</div>
                  <p className="text-slate-500 font-mono text-[11px]">Pinyin: Nuò hé tài (Sī měi gé lǔ tài)</p>
                  <p className="text-slate-600">Available at Tier-3 endocrinology clinics.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">Lantus (Insulin Glargine)</div>
                  <div className="text-base font-black text-blue-900" lang="zh-Hans">来得时（甘精胰岛素注射液）</div>
                  <p className="text-slate-500 font-mono text-[11px]">Pinyin: Lái de shí</p>
                  <p className="text-slate-600">Long-acting basal insulin widely stocked in China.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">Humalog (Insulin Lispro)</div>
                  <div className="text-base font-black text-blue-900" lang="zh-Hans">优泌乐（赖脯胰岛素注射液）</div>
                  <p className="text-slate-500 font-mono text-[11px]">Pinyin: Yōu mì lè</p>
                  <p className="text-slate-600">Rapid-acting mealtime insulin pen.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-900 text-sm">Mounjaro (Tirzepatide)</div>
                  <div className="text-base font-black text-blue-900" lang="zh-Hans">穆峰达（替尔泊肽注射液）</div>
                  <p className="text-slate-500 font-mono text-[11px]">Pinyin: Mù fēng dá</p>
                  <p className="text-slate-600">Approved for Type 2 diabetes in China.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                4. Refilling Injections at Chinese Hospitals
              </h2>
              <p>
                Because all injectable insulins and peptides are prescription-only in China, they cannot be purchased at retail street pharmacies. Follow these steps for an in-hospital refill:
              </p>
              <ol className="list-decimal list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>Select a Facility:</strong> Go to the Endocrinology Outpatient Department (内分泌科门诊) of any Tier-3 Hospital (三甲医院) or an international expat hospital (such as United Family Healthcare or Jiahui Health).</li>
                <li><strong>Bring Medical History:</strong> Present your current empty pen carton, passport, and home country prescription slip.</li>
                <li><strong>Cold Chain Transport:</strong> Bring your insulated cooler bag to the pharmacy window so the dispensed pens are immediately kept at 2°C to 8°C.</li>
              </ol>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                5. Emergency Replacement &amp; Hotel Refrigeration Practices
              </h2>
              <p>
                In warm climates or during domestic high-speed rail travel across China, maintaining the 2°C to 8°C cold chain is critical:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Hotel Mini-Fridge Calibration:</strong>
                  <p className="text-slate-600 leading-relaxed">
                    Many hotel mini-bars shut down automatically when the key-card is removed from the master power switch upon leaving the room. Request the front desk for a continuous power outlet or store your medication cooler in the hotel central refrigeration facility.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Emergency Room Access (急诊 / Jízhěn):</strong>
                  <p className="text-slate-600 leading-relaxed">
                    If an insulin pen is dropped or damaged late at night, visit the 24-hour emergency department (急诊) of the nearest public hospital. Emergency doctors can dispense rapid-acting insulin pens immediately upon verification of clinical vitals and blood glucose levels.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Explore Injectable Drug Dossiers &amp; Tools:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <Link
                  href="/drugs/ozempic-wegovy-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Ozempic in China Dossier</span>
                    <span className="text-slate-500 text-[11px]">Semaglutide customs rules &amp; hospital refills</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/manifest"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Multi-Med Travel Bag Auditor</span>
                    <span className="text-slate-500 text-[11px]">Audit cold-chain and sharps compliance</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>
              </div>
            </section>
          </div>

          {/* Expat Clinic Lead Magnet */}
          <ExpatClinicDirectoryCTA />

          {/* Email Checklist Card */}
          <LeadCaptureEmailCard />
        </div>
      </div>
    </>
  );
}
