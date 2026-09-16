import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import CustomsDeclarationCard from '@/components/tools/CustomsDeclarationCard';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  Plane,
  Sparkles,
  HelpCircle,
  Building,
  CheckSquare,
  Scale,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Customs Medication Declaration Card: Bilingual Generator',
  description:
    'Generate an official bilingual (English-Chinese) prescription declaration letter for China Customs airport inspection. Mobile fullscreen mode & printable.',
  alternates: getHreflangAlternates('/customs-card'),
};

export default function CustomsCardPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'China Customs Bilingual Medication Declaration Card Generator',
        applicationCategory: 'TravelApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        url: 'https://chinamedscheck.com/customs-card',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Free web utility generating official bilingual (English and Simplified Chinese) prescription declarations to present to China Customs officers at airport Red Channel inspection counters.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Why do I need a bilingual declaration card when entering China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'While senior customs officers at major Chinese international airports (PEK, PVG, CAN) understand basic English, frontline inspection officers must verify complex medical terms quickly. A bilingual declaration letter immediately communicates the legitimate therapeutic purpose in official Simplified Chinese legal terminology, eliminating misunderstandings and avoiding prolonged anti-smuggling questioning.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does presenting this declaration letter guarantee customs clearance in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No tool or document guarantees clearance, as final discretionary authority rests solely with the inspecting China Customs (GACC) officer. However, presenting a formal bilingual declaration alongside an authentic doctor prescription, stamped medical certificate, and original factory packaging demonstrates total transparency and eliminates suspicion of intentional smuggling.',
            },
          },
          {
            '@type': 'Question',
            name: 'Should I carry my prescription medication in carry-on or checked baggage?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Always pack controlled prescription medications and daily chronic medicines in your carry-on baggage. Checked baggage is subjected to automated X-ray screening and sniffer dogs before arriving at the carousel, and lost luggage could disrupt your treatment. Furthermore, you must have the medication immediately accessible when declaring at the Red Channel.',
            },
          },
          {
            '@type': 'Question',
            name: 'What if my doctor prescription is only written in English or my native language?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Under UN INCB traveler standards, foreign prescriptions in English are accepted for personal travel supplies. However, carrying an accurate Chinese translation or a standardized bilingual declaration card ensures that border officers can immediately confirm the drug INN name, dosage, and patient passport match without having to summon specialized translation personnel.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is the data I enter into this generator stored on your servers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Zero data is stored on our servers. All personal details (passenger name, passport number, medication dosages) are processed 100% locally within your web browser. Nothing is transmitted to or retained in any external database.',
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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Clean Page Title Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              China Customs Bilingual Declaration Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Fill in your traveler details and medications to generate an official bilingual declaration slip to show customs officers at the airport Red Channel.
            </p>
          </div>

          {/* Core Interactive Card Component */}
          <CustomsDeclarationCard />

          {/* Section 1: The Rationale - Overcoming the Border Language Barrier */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 1: Border Inspection Psychology
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Why International Travelers Need an Official Bilingual Declaration
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                When international travelers land in China carrying controlled medications (such as Concerta for ADHD, Xanax for anxiety, or Tramadol for chronic pain), the single greatest friction point at the border is the <strong>language barrier surrounding pharmaceutical terminology</strong>.
              </p>
              <p>
                Frontline Chinese customs officers at airport inspection lanes handle thousands of passengers per shift. When baggage scanners flag unidentified pill bottles, officers are trained to evaluate whether the substance represents an unauthorized importation of illegal psychoactive drugs. Handing an officer an illegible English doctor's scrawl or an unfamiliar overseas prescription brand name (e.g. <em>Daytrana, Stilnox, Suboxone</em>) often causes confusion, triggering supervisor consultations, luggage unpacking, and extended delays.
              </p>
              <p>
                Presenting a clear, formal statement rendered in standardized <strong>Simplified Chinese administrative prose</strong>—explicitly referencing the United Nations INCB traveler protocol and Chinese personal use regulations—instantly recontextualizes the encounter. It demonstrates that you are an informed, compliant passenger who has proactively declared a legitimate medical necessity.
              </p>
            </div>
          </section>

          {/* Section 2: Step-by-Step SOP at the Airport */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 2: Airport Operational Walkthrough
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Step-by-Step Customs Clearance SOP (Beijing, Shanghai, Guangzhou)
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  Deplane & Baggage Claim
                </span>
                <p className="leading-relaxed text-slate-600">
                  Retrieve all checked baggage from the carousel. Ensure your declared medications, doctor's note, and passport are easily accessible in your personal carry-on bag.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  Approach the Red Channel
                </span>
                <p className="leading-relaxed text-slate-600">
                  Follow signs to the <strong>Red Channel (申报通道 - Goods to Declare)</strong>. Never walk into the Green Channel if carrying Category 1 or 2 psychotropics or controlled analgesics.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  Present Card & Verification
                </span>
                <p className="leading-relaxed text-slate-600">
                  Switch this tool to <strong>"Show to Officer (Full Screen)"</strong> or hand over your printed letter. Place your doctor's certificate, prescription, and original packaging on the counter.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Progressive Enhancement - Static Bilingual Template in HTML (No-JS Fallback) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Section 3: Standard Static Declaration Template
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Standard Official Declaration Template (Full Static Text)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                The verbatim text generated by this tool, formatted for instant copying, printing, or offline review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans space-y-2">
                <span className="font-bold text-slate-900 block text-sm border-b border-slate-200 pb-1">
                  中文官方申明格式 (Chinese Text):
                </span>
                <p className="text-slate-800 leading-relaxed whitespace-pre-line">
                  尊敬的中国海关关员：{'\n\n'}
                  本人持合法有效护照入境中国。本人随身行李中携带的处方药品，系执业医师因本人确诊患有相关医学病症而开具的正规治疗药品。{'\n\n'}
                  随身携带药量严格符合联合国国际麻醉品管制局（INCB）公约及中国海关“合理自用”原则，纯属个人旅途医疗自用，绝无商业流通或非法转让意图。{'\n\n'}
                  随附以下原件备查：{'\n'}
                  1. 执业医师正式诊断证明书原件；{'\n'}
                  2. 医院正式处方笺原件（姓名与护照一致）；{'\n'}
                  3. 药品原厂包装盒及完整说明书。{'\n\n'}
                  感谢您的依法监管与通关协助！
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans space-y-2">
                <span className="font-bold text-slate-900 block text-sm border-b border-slate-200 pb-1">
                  English Reference Notice:
                </span>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                  Dear China Customs Officer:{'\n\n'}
                  I am entering the People's Republic of China with a valid passport. The prescription medication in my baggage is an authentic pharmaceutical treatment prescribed by a licensed physician for my verified medical condition.{'\n\n'}
                  The carried supply complies with UN International Narcotics Control Board (INCB) traveler guidelines and China Customs 'Personal Reasonable Quantity' regulations, intended exclusively for personal medical maintenance during travel.{'\n\n'}
                  Attached documentation:{'\n'}
                  1. Original Physician Medical Certificate / Diagnosis Report;{'\n'}
                  2. Original Hospital Prescription (matching passport identity);{'\n'}
                  3. Original intact manufacturer pharmacy packaging with labels.{'\n\n'}
                  Thank you for your inspection and assistance.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: United Nations INCB & Doctor Note Standards */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 4: Legal Rigor & Doctor Certifications
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                The 7 Mandatory Fields for Your Doctor's Certificate (UN INCB Standard)
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                In international diplomatic filings submitted to the <strong>United Nations International Narcotics Control Board</strong>, Chinese health and border authorities detailed the precise criteria evaluated when foreign medical documents are presented.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1. Patient Full Legal Name & Passport Number:</strong> Must match the traveler's passport letter-for-letter.</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>2. Clinical Diagnosis:</strong> Clearly state the medical condition (e.g. Attention Deficit Hyperactivity Disorder, Chronic Pain).</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>3. INN Generic Chemical Name:</strong> Trade brands alone are insufficient; include the chemical entity (e.g. Methylphenidate HCl).</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>4. Daily Dosage & Intake Regimen:</strong> Exact mg per dose, daily frequency, and maximum daily limit.</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>5. Quantity Carried & Duration:</strong> Proving the number of pills corresponds to the travel stay.</span>
                </div>
                <div className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2">
                  <CheckSquare className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>6. Doctor License & Official Stamp:</strong> Physician registration number, hospital contact phone, and physical clinic address.</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Customs Card FAQ */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Section 5: Clarifications & Border Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Frequently Asked Questions on Customs Declaration Cards
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Why do I need a bilingual declaration card when entering China?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  While senior customs officers at major Chinese international airports (PEK, PVG, CAN) understand basic English, frontline inspection officers must verify complex medical terms quickly. A bilingual declaration letter immediately communicates the legitimate therapeutic purpose in official Simplified Chinese legal terminology, eliminating misunderstandings and avoiding prolonged anti-smuggling questioning.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Does presenting this declaration letter guarantee customs clearance in China?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  No tool or document guarantees clearance, as final discretionary authority rests solely with the inspecting China Customs (GACC) officer. However, presenting a formal bilingual declaration alongside an authentic doctor prescription, stamped medical certificate, and original factory packaging demonstrates total transparency and eliminates suspicion of intentional smuggling.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Should I carry my prescription medication in carry-on or checked baggage?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Always pack controlled prescription medications and daily chronic medicines in your carry-on baggage. Checked baggage is subjected to automated X-ray screening and sniffer dogs before arriving at the carousel, and lost luggage could disrupt your treatment. Furthermore, you must have the medication immediately accessible when declaring at the Red Channel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>What if my doctor prescription is only written in English or my native language?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Under UN INCB traveler standards, foreign prescriptions in English are accepted for personal travel supplies. However, carrying an accurate Chinese translation or a standardized bilingual declaration card ensures that border officers can immediately confirm the drug INN name, dosage, and patient passport match without having to summon specialized translation personnel.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Is the data I enter into this generator stored on your servers?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Zero data is stored on our servers. All personal details (passenger name, passport number, medication dosages) are processed 100% locally within your web browser. Nothing is transmitted to or retained in any external database.
                </p>
              </div>
            </div>
          </section>

          {/* Travel Insurance CTA */}
          <TravelInsuranceCTA />
        </div>
      </div>
    </>
  );
}
