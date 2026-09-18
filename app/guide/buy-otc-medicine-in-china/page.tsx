import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  ShoppingBag,
  Pill,
  Globe,
  ArrowRight,
  HelpCircle,
  Clock,
  Sparkles,
  Store,
  CheckCircle2,
  Smartphone,
  Hospital,
} from 'lucide-react';
import ExpatClinicDirectoryCTA from '@/components/conversion/ExpatClinicDirectoryCTA';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Buying Medicine in China: 2026 Pharmacy and Drug Guide',
  description:
    'How to buy medicine in China. Chinese names and pharmacy show-cards for Melatonin, Ibuprofen, Panadol, and Tylenol, plus hospital prescription rules.',
  alternates: getHreflangAlternates('/guide/buy-otc-medicine-in-china'),
  openGraph: {
    title: 'Buying Medicine in China: 2026 Pharmacy and Drug Guide',
    description:
      'How to buy medicine in China. Chinese names and pharmacy show-cards for Melatonin, Ibuprofen, Panadol, and Tylenol, plus hospital prescription rules.',
    url: 'https://chinamedscheck.com/guide/buy-otc-medicine-in-china',
    siteName: 'ChinaMedsCheck',
    type: 'article',
  },
};

export default function BuyMedicineGuidePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': 'https://chinamedscheck.com/guide/buy-otc-medicine-in-china#article',
        headline: 'Buying Medicine in China: Pharmacy Guide & Bilingual Drug Names',
        description:
          'Practical expat and traveler handbook for finding retail drugstores in China, understanding OTC red vs green labels, using bilingual show-cards, and ordering emergency medicine on delivery apps.',
        datePublished: '2026-02-10T08:00:00+08:00',
        dateModified: '2026-09-18T08:00:00+08:00',
        author: {
          '@type': 'Organization',
          name: 'ChinaMedsCheck Healthcare Advisory Team',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://chinamedscheck.com/guide/buy-otc-medicine-in-china#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Can foreigners buy over-the-counter (OTC) medication at Chinese pharmacies without a prescription?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Standard OTC remedies (such as ibuprofen, paracetamol, sore throat lozenges, and anti-diarrheal pills) can be purchased freely at any licensed retail drugstore (大药房) across China without a doctor prescription or appointment.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is Melatonin called in Chinese and where can I buy it?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Melatonin is called 褪黑素 (Pinyin: Tuì hēi sù). In China, it is classified as a dietary supplement or health food. You can purchase it at retail pharmacies, Watson’s (屈臣氏), or order it online via Meituan and Ele.me delivery apps.',
            },
          },
          {
            '@type': 'Question',
            name: 'Why does the pharmacy ask for my passport when buying cold medicine?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Cold and allergy medications containing pseudoephedrine (such as Tylenol Cold or White & Black / 白加黑) or high-dose antipyretics require real-name identification registration under Chinese precursor chemical and public health tracking laws. Presenting a foreign passport is standard procedure.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I get prescription antibiotics over the counter in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. Since strict national anti-microbial stewardship policies were implemented, systemic oral antibiotics (like Amoxicillin, Azithromycin, or Cephalexin) require an official prescription from an accredited clinic or hospital outpatient department.',
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-xs font-mono font-bold text-teal-800">
              <Store className="h-3.5 w-3.5 text-teal-700" />
              <span>In-Country Pharmacy &amp; Bilingual Survival Manual</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Buying Medicine in China: Pharmacy Guide &amp; Bilingual Drug Names
            </h1>

            <p className="text-base text-slate-600 leading-relaxed">
              A comprehensive traveler and expat guide to navigating Chinese retail pharmacies (大药房), identifying Green vs Red OTC packaging, presenting bilingual show-cards, and ordering medicine through food delivery apps.
            </p>

            <div className="flex items-center gap-4 text-xs text-slate-500 pt-2 border-t border-slate-200 flex-wrap">
              <span>Updated: September 2026</span>
              <span>•</span>
              <span>In-Country Healthcare Practical Protocol</span>
              <span>•</span>
              <span>10 min read</span>
            </div>
          </div>

          {/* Quick Bilingual Search Card Matrix */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider font-mono">
                Top 6 Essential Travel Drugs in Chinese (Ready to Show)
              </h2>
              <span className="text-[11px] font-mono text-teal-600 font-bold">Screenshot-Friendly</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <Link
                href="/drugs/melatonin-in-china"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition space-y-2 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Melatonin</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-mono font-bold">Jet Lag</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">褪黑素</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Tuì hēi sù</p>
                <p className="text-slate-600 text-[11px]">OTC Supplement. Sold at drugstores &amp; Watsons.</p>
              </Link>

              <Link
                href="/drugs/ibuprofen-in-china"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition space-y-2 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Ibuprofen (Advil)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">Pain / Fever</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">布洛芬（芬必得）</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Bù luò fēn</p>
                <p className="text-slate-600 text-[11px]">OTC Green Label. Fenbid sustained-release widely available.</p>
              </Link>

              <Link
                href="/drugs/paracetamol-tylenol-in-china"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition space-y-2 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Paracetamol / Tylenol</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono font-bold">Panadol</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">对乙酰氨基酚 / 泰诺林</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Duì yǐ xiān jī bèn fēn</p>
                <p className="text-slate-600 text-[11px]">Standard fever reducer. Sold as Tylenol (泰诺林) or Panadol (必理痛).</p>
              </Link>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Imodium (Loperamide)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-mono font-bold">Diarrhea</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">盐酸洛哌丁胺（易蒙停）</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Yì méng tíng</p>
                <p className="text-slate-600 text-[11px]">Travelers' diarrhea remedy. Sold OTC at hospital or retail pharmacy.</p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Cetirizine (Zyrtec)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold">Allergies</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">盐酸西替利嗪（仙特明）</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Xī tì lì qín</p>
                <p className="text-slate-600 text-[11px]">Antihistamine for seasonal pollen and food allergies. OTC Green.</p>
              </div>

              <Link
                href="/drugs/birth-control-pills-in-china"
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-teal-400 transition space-y-2 block"
              >
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Birth Control (Yasmin)</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-mono font-bold">Daily Pill</span>
                </div>
                <div className="text-xl font-black text-teal-800" lang="zh-Hans">优思明 / 短效避孕药</div>
                <p className="text-slate-500 font-mono text-[11px]">Pinyin: Yōu sī míng</p>
                <p className="text-slate-600 text-[11px]">Widely available at retail pharmacies without complex appointment.</p>
              </Link>
            </div>
          </div>

          {/* Guide Content Body */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                1. How to Spot a Pharmacy in China
              </h2>
              <p>
                In Chinese cities, pharmacies are extremely common, typically located every few blocks in residential and commercial districts. Look for storefront signs containing the characters:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-sm">药房 (Yàofáng) or 药店 (Yàodiàn)</strong>
                  <span className="text-slate-500">General pharmacy / medicine shop</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <strong className="text-slate-900 block text-sm">大药房 (Dà Yàofáng)</strong>
                  <span className="text-slate-500">Large licensed pharmacy chain (e.g. LBX 老百姓, Nepstar 海王星辰, Yifeng 益丰)</span>
                </div>
              </div>
              <p>
                Most pharmacies display a stylized green or red cross symbol. In major metropolitan areas like Shanghai, Beijing, Guangzhou, and Shenzhen, 24-hour pharmacies (24小时药店) operate night-window dispensing.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                2. Understanding China's OTC Labels: Green vs Red
              </h2>
              <p>
                Chinese non-prescription pharmaceuticals bear an oval "OTC" logo printed clearly on the outer carton. This logo is color-coded into two distinct legal tiers:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1.5">
                  <span className="font-extrabold text-emerald-900 text-sm">Green OTC (Class B / 乙类)</span>
                  <p className="text-slate-700">
                    Highest safety profile. Can be purchased without pharmacist consultation and is even sold at qualified convenience stores (such as 7-Eleven or FamilyMart) and airport shops.
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">Examples: Cooling throat lozenges, basic motion sickness patches, saline nasal spray.</p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-1.5">
                  <span className="font-extrabold text-rose-900 text-sm">Red OTC (Class A / 甲类)</span>
                  <p className="text-slate-700">
                    Standard over-the-counter medicine. Can only be sold inside licensed pharmacies under the supervision of a licensed on-duty pharmacist (执业药师).
                  </p>
                  <p className="text-slate-500 font-mono text-[11px]">Examples: Fenbid Ibuprofen, Tylenol tablets, cetirizine allergy pills.</p>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                3. Instant Delivery: Ordering Medicine to Your Hotel in 30 Minutes
              </h2>
              <p>
                One of the most convenient healthcare features in urban China is on-demand pharmacy delivery via mobile apps. If you are sick in bed with fever or jet lag, you do not need to leave your hotel room:
              </p>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
                <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                  <Smartphone className="h-4 w-4 text-teal-600" />
                  <span>How to Order via Meituan (美团) or Ele.me (饿了么)</span>
                </div>
                <ol className="list-decimal list-inside space-y-1.5 pl-1 text-slate-600">
                  <li>Open Alipay (支付宝) or WeChat, which both feature built-in English translations.</li>
                  <li>Search for <strong>"Meituan Delivery" (美团外卖)</strong> or tap the "Medication" (看病买药) mini-program icon.</li>
                  <li>Copy and paste the Chinese drug name from our bilingual show-cards (e.g. <code>布洛芬</code> for ibuprofen or <code>褪黑素</code> for melatonin) into the search bar.</li>
                  <li>Set your delivery location as your hotel front desk or room address.</li>
                  <li>Delivery riders usually arrive sealed within 25 to 45 minutes, 24/7.</li>
                </ol>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                4. When You Need a Doctor: Prescription-Only Rules
              </h2>
              <p>
                If your illness requires systemic antibiotics, psychiatric maintenance drugs, or specialized injections (such as insulin or Ozempic), retail pharmacies will not dispense them without an official electronic or physical Chinese hospital prescription.
              </p>
              <p>
                Foreign travelers can easily access medical care in China:
              </p>
              <ul className="list-disc list-inside space-y-2 pl-2 text-slate-600 text-sm">
                <li><strong>Public Hospital VIP / International Clinics (特需门诊):</strong> Located at top Tier-3 public hospitals, providing English-speaking attending doctors with consultations ranging from 100 to 400 RMB.</li>
                <li><strong>Joint-Venture Hospitals:</strong> Such as United Family (和睦家), ParkwayHealth (百汇), or Jiahui Health (嘉会医疗), accepting international direct-billing travel insurance.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                5. Payment Methods &amp; Insurance Reimbursement Receipts
              </h2>
              <p>
                Almost all pharmacies in China operate on cashless transactions. Foreign credit cards (Visa and Mastercard) linked to Alipay or WeChat Pay are accepted seamlessly across all pharmacy chains.
              </p>
              <div className="space-y-3 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Getting a Tax Receipt (发票 / Fāpiào):</strong>
                  <p className="text-slate-600 leading-relaxed">
                    If you intend to claim reimbursement through your international travel health insurance, ask the cashier for a formal tax invoice: <em>"Qǐng kāi fāpiào" (请开发票)</em>. The store will print an electronic invoice itemizing the medication name, quantity, and unit price.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <strong className="text-slate-900 text-sm block">Cash Acceptance:</strong>
                  <p className="text-slate-600 leading-relaxed">
                    By law, all Chinese businesses must accept Renminbi cash (RMB). If you do not have digital payments set up, carry small bank notes (10, 20, or 50 RMB) as smaller neighbourhood pharmacies may have limited change for 100 RMB notes.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Interactive Tools Callout */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
              Helpful Tools for Navigating Chinese Pharmacies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <Link
                href="/drugs"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white transition flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 block group-hover:text-teal-600">Medication Directory &amp; Show-Cards</span>
                  <span className="text-slate-500">Access 32+ bilingual cards for customs &amp; pharmacy</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
              </Link>

              <Link
                href="/customs-card"
                className="p-3.5 rounded-xl border border-slate-200 hover:border-teal-400 bg-slate-50 hover:bg-white transition flex items-center justify-between group"
              >
                <div>
                  <span className="font-bold text-slate-900 block group-hover:text-teal-600">Bilingual Medical Declaration Card</span>
                  <span className="text-slate-500">Print bilingual paperwork for customs officers</span>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-teal-600" />
              </Link>
            </div>
          </div>

          {/* Clinic Directory CTA */}
          <ExpatClinicDirectoryCTA />

          {/* Email Checklist Card */}
          <LeadCaptureEmailCard />
        </div>
      </div>
    </>
  );
}
