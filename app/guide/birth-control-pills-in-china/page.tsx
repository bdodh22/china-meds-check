import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Heart,
  Pill,
  ShieldCheck,
  ArrowRight,
  HelpCircle,
  PackageCheck,
  CheckCircle2,
  Store,
  Calendar,
  AlertCircle,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Birth Control in China: 2026 Customs Rules and Guide',
  description:
    'Can you bring birth control pills to China? Learn customs carry limits for Yasmin and Yaz, pharmacy availability, and emergency morning-after contraception.',
  alternates: getHreflangAlternates('/guide/birth-control-pills-in-china'),
  openGraph: {
    title: 'Birth Control in China: 2026 Customs Rules and Guide',
    description:
      'Can you bring birth control pills to China? Learn customs carry limits for Yasmin and Yaz, pharmacy availability, and emergency morning-after contraception.',
    url: 'https://chinamedscheck.com/guide/birth-control-pills-in-china',
    siteName: 'ChinaMedsCheck',
    type: 'article',
  },
};

export default function BirthControlGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://chinamedscheck.com/guide/birth-control-pills-in-china#article',
        headline: 'Birth Control in China: Customs Rules, Packing & Pharmacy Guide',
        description:
          'Authoritative women’s health guide on carrying oral contraceptive pills through China customs, legal carry allowances, buying Yasmin and Yaz at Chinese retail pharmacies, and accessing emergency morning-after contraception.',
        datePublished: '2026-02-15T08:00:00+08:00',
        dateModified: '2026-09-18T08:00:00+08:00',
        author: {
          '@type': 'Organization',
          name: 'ChinaMedsCheck Women’s Health Compliance Desk',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://chinamedscheck.com/guide/birth-control-pills-in-china#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Is birth control legal to bring into China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Daily combined oral contraceptive pills (such as Yasmin, Yaz, and Marvelon) and progestin-only pills are 100% legal to bring into China for personal use. They do not contain controlled narcotic or psychotropic substances, so you can walk directly through the Green Channel at airport customs.',
            },
          },
          {
            '@type': 'Question',
            name: 'How many packs of birth control pills can I bring through China Customs?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'China Customs (GACC Notice No. 43) allows a reasonable quantity for personal use corresponding to your travel duration. Bringing a 3 to 6 months supply (3 to 6 blister packs) in personal luggage is standard and fully permitted. Bringing dozens of boxes may trigger commercial duty inquiries.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I buy Yasmin or birth control pills at a pharmacy in China without a prescription?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. In most Chinese cities, popular international birth control brands such as Yasmin (优思明) and Marvelon (妈富隆) are sold over the counter or via basic real-name registration at retail drugstores and online delivery apps like Meituan without an advance hospital appointment.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Plan B (emergency contraception) available in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Emergency morning-after pills containing Levonorgestrel (most commonly sold under the domestic brand Yuting / 毓婷) are sold over the counter at retail pharmacies across China without a prescription.',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-xs font-mono font-bold text-purple-800">
              <Heart className="h-3.5 w-3.5 text-purple-600" />
              <span>Women’s Travel Health &amp; Customs Manual</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Birth Control in China: Customs Rules, Packing &amp; Pharmacy Guide
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              Everything international travelers, female backpackers, study-abroad students, and expats need to know about bringing oral contraceptive pills into China, customs allowances, and buying local brands in Chinese cities.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 flex-wrap">
              <span>Updated: September 2026</span>
              <span>•</span>
              <span>GACC &amp; NMPA Regulatory Audit</span>
              <span>•</span>
              <span>11 min read</span>
            </div>
          </div>

          {/* Quick Summary Bento Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
              At A Glance: Contraceptive Regulations in China (2026)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-900 text-sm">Customs Channel</span>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-xl font-black text-emerald-900">Green Channel</div>
                <p className="text-slate-700 leading-relaxed">
                  Nothing to declare for standard travel quantities. Daily birth control carries zero narcotic or psychotropic restrictions.
                </p>
                <div className="text-emerald-800 font-bold pt-1">Safe for Personal Carry</div>
              </div>

              <div className="p-4 rounded-xl bg-purple-50/80 border border-purple-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-purple-900 text-sm">Personal Quota</span>
                  <Calendar className="h-4 w-4 text-purple-600" />
                </div>
                <div className="text-xl font-black text-purple-900">3 - 6 Months</div>
                <p className="text-slate-700 leading-relaxed">
                  Carrying 3 to 6 blister packs (matching your visa duration) is standard. Keep pills in original manufacturer packaging.
                </p>
                <div className="text-purple-800 font-bold pt-1">3-6 Blister Packs OK</div>
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-900 text-sm">Local In-China Refill</span>
                  <Store className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-xl font-black text-blue-900">Retail Pharmacies</div>
                <p className="text-slate-700 leading-relaxed">
                  Yasmin (优思明) and Marvelon (妈富隆) are widely stocked in pharmacies and deliverable via Meituan within 30 minutes.
                </p>
                <div className="text-blue-800 font-bold pt-1">No Advance Appt Needed</div>
              </div>
            </div>
          </div>

          {/* Core Guide Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                1. China Customs Legality: Green Channel Clearance
              </h2>
              <p>
                A frequent anxiety among female travelers heading to China is whether oral contraceptive pills are monitored or restricted by customs inspectors. Under the <strong>General Administration of Customs of China (GACC Notice No. 43)</strong> and the official Catalogue of Narcotic Drugs and Psychotropic Substances:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>No Controlled Chemicals:</strong> Standard daily birth control pills (combining synthetic estrogen like ethinylestradiol and progestin like drospirenone or desogestrel) contain zero controlled or addictive substances.</li>
                <li><strong>Walk the Green Channel:</strong> Travelers carrying personal supplies do not need to fill out a customs declaration form or queue at the Red Channel inspection desk.</li>
                <li><strong>Retain Original Blister Packs:</strong> Keep pills in their original manufacturer packaging with visible dosage days. Avoid popping pills out into generic unlabeled pill organizer boxes.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                2. How Much Birth Control Can You Bring?
              </h2>
              <p>
                China Customs enforces the principle of <em>"reasonable personal traveler quantity" (合理个人自用数量)</em>:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <span className="font-bold text-slate-900 text-sm block">Recommended Packing Guideline:</span>
                <p className="text-slate-700">
                  • <strong>Short-term tourists (under 30 days):</strong> 1 to 2 packs.
                </p>
                <p className="text-slate-700">
                  • <strong>Study abroad / Long-term employment (6 months to 1 year):</strong> 3 to 6 packs in your carry-on luggage.
                </p>
                <p className="text-slate-500 italic">
                  Note: Attempting to pack 12+ packs (a full year or more) in your luggage may lead customs officers to inspect whether the goods are intended for commercial resale, potentially subjecting you to baggage duties. If staying for a year, bring 3-6 packs and purchase local refills afterwards.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                3. Buying Birth Control at Chinese Pharmacies: Major Brands &amp; Chinese Names
              </h2>
              <p>
                If you run out of pills or misplace your supply in China, purchasing oral contraceptives is straightforward. Major international brands manufactured by Bayer and Organon are widely licensed by the National Medical Products Administration (NMPA):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">Yasmin (优思明)</strong>
                    <span className="font-mono text-purple-700 font-bold">Drospirenone / Ethinylestradiol</span>
                  </div>
                  <div className="text-lg font-black text-slate-900" lang="zh-Hans">优思明（屈螺酮炔雌醇片）</div>
                  <p className="text-slate-600">Pinyin: Yōu sī míng. The single most popular combined contraceptive pill in China, identical to Western Yasmin (21 tablets per pack). Price: ~120-140 RMB.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 text-sm">Marvelon (妈富隆)</strong>
                    <span className="font-mono text-purple-700 font-bold">Desogestrel / Ethinylestradiol</span>
                  </div>
                  <div className="text-lg font-black text-slate-900" lang="zh-Hans">妈富隆（去氧孕烯炔雌醇片）</div>
                  <p className="text-slate-600">Pinyin: Mā fù lóng. Standard low-dose combined pill widely available at community drugstores. Price: ~60-80 RMB.</p>
                </div>
              </div>

              {/* Show to Pharmacist Box */}
              <div className="rounded-xl border border-purple-200 bg-purple-50/60 p-5 space-y-2">
                <span className="text-xs font-bold text-purple-900 uppercase font-mono tracking-wider block">
                  Show This to the Pharmacy Clerk · 药店出示卡
                </span>
                <p className="text-base font-black text-slate-900" lang="zh-Hans">
                  您好，我想买一盒短效口服避孕药【优思明】或【妈富隆】，请问有现货吗？
                </p>
                <p className="text-xs text-slate-600 italic">
                  "Hello, I would like to buy a box of oral contraceptive pills (Yasmin or Marvelon), do you have it in stock?"
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                4. Emergency Morning-After Contraception (Plan B in China)
              </h2>
              <p>
                Emergency contraception (Levonorgestrel 1.5mg or 0.75mg×2) is legally sold over the counter across China without age restrictions or prescription requirements:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900 text-sm">Domestic Emergency Brand: Yuting (毓婷 / 金毓婷)</div>
                <p className="text-slate-700">
                  • <strong>Chinese Name:</strong> 毓婷（左炔诺孕酮片 / Yù tíng）or 金毓婷 (Single-dose 1.5mg tablet).
                </p>
                <p className="text-slate-700">
                  • <strong>Where to buy:</strong> Available 24/7 at nearly every chain drugstore or deliverable via Meituan / Ele.me within 30 minutes. Price: ~20-50 RMB.
                </p>
                <p className="text-slate-600 font-medium">
                  • <strong>Effectiveness:</strong> Must be taken as soon as possible within 72 hours of unprotected intercourse.
                </p>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                5. Frequently Asked Questions by Female Travelers
              </h2>
              <p>
                To help travelers prepare before flying into Shanghai, Beijing, or Guangzhou, here are essential tips verified under PRC border customs policies:
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Will airport x-ray machines damage birth control pills?</strong>
                  <p className="text-slate-600 leading-relaxed">
                    No. Standard passenger baggage x-ray scanners emit diagnostic radiation levels that do not affect the molecular chemical stability of hormone tablets.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Are IUDs or contraceptive implants subject to border checks?</strong>
                  <p className="text-slate-600 leading-relaxed">
                    No. Non-medicinal devices like intrauterine devices (IUDs) or progestin subdermal implants (such as Nexplanon) require zero customs declaration upon arrival in China.
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Links */}
            <section className="space-y-3 pt-4 border-t border-slate-100">
              <h3 className="font-bold text-slate-900 text-base">
                Check Specific Drug Specifications &amp; Tools:
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <Link
                  href="/drugs/birth-control-pills-in-china"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Birth Control Dossier &amp; Show Card</span>
                    <span className="text-slate-500 text-[11px]">Full regulatory breakdown &amp; pinyin card</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400" />
                </Link>

                <Link
                  href="/calculator"
                  className="p-3.5 rounded-xl border border-slate-200 hover:border-purple-400 bg-slate-50 hover:bg-white transition flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">Days Allowance Calculator</span>
                    <span className="text-slate-500 text-[11px]">Verify your trip length compliance</span>
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
