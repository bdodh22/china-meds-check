import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import AllowanceCalculatorWidget from '@/components/tools/AllowanceCalculatorWidget';
import TravelInsuranceCTA from '@/components/conversion/TravelInsuranceCTA';
import {
  ShieldCheck,
  Scale,
  AlertCircle,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Hospital,
  Clock,
  HelpCircle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'Medication Allowance Calculator: China Customs Limits',
  description:
    'Calculate legal prescription supply days allowed at China Customs. Check 7-15 day limits for controlled psychotropics & 90-day maintenance rules.',
  alternates: getHreflangAlternates('/calculator'),
};

export default function CalculatorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'China Customs Medication Allowance Days Calculator',
        applicationCategory: 'HealthApplication',
        operatingSystem: 'All',
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        url: 'https://chinamedscheck.com/calculator',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        description:
          'Interactive border compliance calculator determining legal days of prescription medication allowed into mainland China under GACC Notice 43 and State Council Decree 442.',
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'How does China Customs calculate the reasonable personal use quantity for medication?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'China Customs applies the "Reasonable Quantity for Personal Use" doctrine (合理自用原则). For Category 1 psychotropics, allowance is strictly limited to a single treatment course (7-15 days). For Category 2 psychotropics, up to 15-30 days is allowed. For non-controlled chronic maintenance medications (hypertension, diabetes), travelers may bring up to 90 days (3 months) in original packaging matching their flight itinerary.',
            },
          },
          {
            '@type': 'Question',
            name: 'What happens if my prescription days of supply exceed my planned stay in China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If the supply carried significantly exceeds your visa duration or planned travel itinerary, customs officers may suspect commercial distribution or illegal importation. Always ensure your carried supply is proportionate to your length of stay, and carry a physician letter explaining the continuous treatment necessity.',
            },
          },
          {
            '@type': 'Question',
            name: 'Can I bring a 6-month or 1-year supply of chronic prescription drugs into China?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Carrying more than 90 days of prescription medication is heavily scrutinized at Chinese border ports. Under GACC rules, personal baggage Western medicine should generally not exceed 3 months of therapy or RMB 5,000 in personal value. Travelers needing long-term supplies should carry a 30-day starter pack and obtain local refills through international medical clinics in China.',
            },
          },
          {
            '@type': 'Question',
            name: 'How do customs officers verify my medication at the airport?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'All checked and carry-on luggage passes through high-speed dual-energy CT scanners. When controlled psychotropic tablets or large liquid volumes are identified, customs officers verify the physical bottles against the passenger passport, written doctor prescription, and Red Channel declaration slip.',
            },
          },
          {
            '@type': 'Question',
            name: 'What is the penalty if China Customs deems my carried medication over the limit?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'If declared voluntarily at the Red Channel, excess non-controlled medications may simply be ordered for commercial customs duty declaration, bonded storage, or return shipping (退运). However, undeclared controlled psychotropics or opioids carried through the Green Channel risk immediate confiscation and administrative detention under anti-smuggling statutes.',
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Clean Page Title Header */}
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              China Customs Medication Allowance Calculator
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
              Select your medication and trip duration to verify legal entry days and mandatory customs declaration channels under GACC Notice 43.
            </p>
          </div>

          {/* Interactive Calculator Component */}
          <AllowanceCalculatorWidget />

          {/* Section 1: In-Depth Breakdown of What This Calculator Solves */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 1: The Problem & Regulatory Dilemma
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Why Carry Days Matter: The "Reasonable Personal Quantity" Doctrine
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                One of the most persistent sources of anxiety for travelers flying into mainland China is understanding the legal boundary between <strong>legitimate personal medical therapy</strong> and <strong>suspected pharmaceutical smuggling</strong>. Chinese customs regulations do not operate on open-ended discretionary allowances; instead, border officers enforce strict mathematical quantity ceilings derived from national health administrative directives.
              </p>
              <p>
                Under the regulatory framework administered by the <strong>General Administration of Customs of China (GACC)</strong> and the <strong>National Medical Products Administration (NMPA)</strong>, personal baggage must comply with the statutory doctrine of <em>"Reasonable Quantity for Personal Use"</em> (合理自用原则).
              </p>
              <p>
                When a passenger lands at an international airport such as Beijing Capital (PEK), Shanghai Pudong (PVG), or Guangzhou Baiyun (CAN), all baggage is screened by automated computed tomography (CT) scanners. If an officer observes multiple unsealed boxes of psychotropic sedatives or hundreds of pain management tablets, the passenger is directed to secondary inspection. Without a mathematical match between the carried supply, the doctor's prescribed daily regimen, and the traveler's visa length, the passenger risks immediate confiscation, administrative penalties, or detention.
              </p>
            </div>
          </section>

          {/* Section 2: Step-by-Step Instructions */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 2: Practical Usage Guide
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                How to Use This Calculator Before Packing Your Bags
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-700">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">1</span>
                  Select Classification
                </span>
                <p className="leading-relaxed text-slate-600">
                  Choose your medicine's legal schedule in China. For example, Concerta or Ritalin is Category 1 Psychotropic; Xanax or Ambien is Category 2; blood pressure medications are Standard Chronic Rx.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">2</span>
                  Input Travel Duration
                </span>
                <p className="leading-relaxed text-slate-600">
                  Set your total planned stay in China. The algorithm cross-references your flight itinerary with your daily dosage to identify over-allowance risks before you pack.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  <span className="h-5 w-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px]">3</span>
                  Review Protocol
                </span>
                <p className="leading-relaxed text-slate-600">
                  The calculator outputs your customs channel directive (Red vs Green Channel), exact paperwork requirements, and a localized hospital refill strategy if staying longer than allowed.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Progressive Enhancement - Static Allowance Matrix Table (100% Readable Without JS) */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Section 3: Full Static Reference Matrix
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                China Customs Medication Carry Allowance Quick-Reference Matrix
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Static reference table readable in all browsers, assistive readers, and offline modes.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-200">
                    <th className="p-3 border-r border-slate-200">Regulatory Classification</th>
                    <th className="p-3 border-r border-slate-200">Representative Medications</th>
                    <th className="p-3 border-r border-slate-200">Maximum Allowance</th>
                    <th className="p-3 border-r border-slate-200">Customs Channel</th>
                    <th className="p-3">Mandatory Documentation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr className="hover:bg-rose-50/40">
                    <td className="p-3 font-bold text-rose-800 border-r border-slate-200">
                      Banned Narcotics / Amphetamines
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Adderall, Vyvanse, Dexedrine, CBD Oils, Medical Cannabis (THC)
                    </td>
                    <td className="p-3 font-bold text-rose-700 border-r border-slate-200">
                      0 Days (Strictly Prohibited)
                    </td>
                    <td className="p-3 border-r border-slate-200 text-rose-800 font-semibold">
                      DO NOT PACK (Prohibited)
                    </td>
                    <td className="p-3 text-slate-600">
                      No foreign prescription or consular note provides legal exemption.
                    </td>
                  </tr>

                  <tr className="hover:bg-amber-50/40">
                    <td className="p-3 font-bold text-amber-900 border-r border-slate-200">
                      Category 1 Psychotropics
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Concerta, Ritalin (Methylphenidate), Modafinil (Provigil)
                    </td>
                    <td className="p-3 font-bold text-amber-800 border-r border-slate-200">
                      Max 7 to 15 Days (Single Course)
                    </td>
                    <td className="p-3 border-r border-slate-200 text-amber-900 font-semibold">
                      Red Channel (Mandatory Declaration)
                    </td>
                    <td className="p-3 text-slate-600">
                      Original doctor's prescription, diagnosis note with doctor title, passport matching.
                    </td>
                  </tr>

                  <tr className="hover:bg-amber-50/40">
                    <td className="p-3 font-bold text-amber-900 border-r border-slate-200">
                      Category 2 Psychotropics
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Xanax (Alprazolam), Klonopin, Valium, Ambien (Zolpidem), Lunesta, Lyrica
                    </td>
                    <td className="p-3 font-bold text-amber-800 border-r border-slate-200">
                      Max 15 to 30 Days
                    </td>
                    <td className="p-3 border-r border-slate-200 text-amber-900 font-semibold">
                      Red Channel (Declaration)
                    </td>
                    <td className="p-3 text-slate-600">
                      Original labeled packaging, official medical summary justifying continuous therapy.
                    </td>
                  </tr>

                  <tr className="hover:bg-amber-50/40">
                    <td className="p-3 font-bold text-amber-900 border-r border-slate-200">
                      Narcotic Analgesics
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Fentanyl Patches, Oxycodone (OxyContin), Tramadol, Codeine solutions
                    </td>
                    <td className="p-3 font-bold text-amber-800 border-r border-slate-200">
                      Max 7 Days (Severe Scrutiny)
                    </td>
                    <td className="p-3 border-r border-slate-200 text-amber-900 font-semibold">
                      Red Channel (Mandatory Declaration)
                    </td>
                    <td className="p-3 text-slate-600">
                      Formal hospital diagnosis, oncologist/physician stamp, exact serial numbers.
                    </td>
                  </tr>

                  <tr className="hover:bg-amber-50/40">
                    <td className="p-3 font-bold text-amber-900 border-r border-slate-200">
                      Chemical Precursors (Cold Meds)
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Sudafed, Claritin-D (Pseudoephedrine formulations)
                    </td>
                    <td className="p-3 font-bold text-amber-800 border-r border-slate-200">
                      Max 1 to 2 Retail Boxes
                    </td>
                    <td className="p-3 border-r border-slate-200 text-slate-800 font-semibold">
                      Red Channel if &gt;1 box
                    </td>
                    <td className="p-3 text-slate-600">
                      Under GACC No. 43, carrying bulk boxes is prosecuted under precursor drug laws.
                    </td>
                  </tr>

                  <tr className="hover:bg-emerald-50/40">
                    <td className="p-3 font-bold text-emerald-900 border-r border-slate-200">
                      Standard Chronic Maintenance Rx
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Ozempic, Metformin, Blood Pressure, Statins, SSRIs (Prozac, Zoloft)
                    </td>
                    <td className="p-3 font-bold text-emerald-800 border-r border-slate-200">
                      Up to 90 Days (3 Months)
                    </td>
                    <td className="p-3 border-r border-slate-200 text-emerald-800 font-semibold">
                      Green Channel (Nothing to Declare)
                    </td>
                    <td className="p-3 text-slate-600">
                      Prescription copy recommended; must remain in original retail packaging.
                    </td>
                  </tr>

                  <tr className="hover:bg-emerald-50/40">
                    <td className="p-3 font-bold text-emerald-900 border-r border-slate-200">
                      General OTC & Health Supplements
                    </td>
                    <td className="p-3 border-r border-slate-200">
                      Ibuprofen (Advil), Paracetamol (Tylenol), Melatonin, Vitamins
                    </td>
                    <td className="p-3 font-bold text-emerald-800 border-r border-slate-200">
                      Up to 90 to 180 Days
                    </td>
                    <td className="p-3 border-r border-slate-200 text-emerald-800 font-semibold">
                      Green Channel (Nothing to Declare)
                    </td>
                    <td className="p-3 text-slate-600">
                      Keep in original sealed retail boxes within personal reasonable quantity.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Deep Dive into Calculation Logic & Legal Formulas */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-blue-700 uppercase tracking-wider">
                Section 4: Regulatory Citations
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Legal Basis: State Council Decrees & GACC Announcement No. 43
              </h2>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                The mathematical logic implemented in this calculator reflects the explicit provisions of:
              </p>
              <ul className="list-disc list-inside space-y-2 text-xs sm:text-sm pl-2 text-slate-600">
                <li>
                  <strong>State Council Decree No. 442 (Regulations on the Administration of Narcotic Drugs and Psychotropic Substances)</strong>: Article 44 stipulates that individuals carrying narcotic drugs or psychotropics across borders for personal medical therapy must possess certifications issued by authorized medical institutions and are restricted strictly to single treatment regimens.
                </li>
                <li>
                  <strong>General Administration of Customs Announcement No. 43 (2010)</strong>: Establishes the regulatory duty-free valuation threshold of RMB 5,000 for personal luggage brought into China by non-resident passengers, and codifies the requirement for bona fide traveler quantities.
                </li>
                <li>
                  <strong>United Nations International Narcotics Control Board (INCB) National Guidelines for China</strong>: Specifies that foreign travelers carrying controlled substances must ensure their doctor's note includes patient passport identity, chemical formulation, dosage, and duration matching travel dates.
                </li>
              </ul>

              <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs text-blue-950 space-y-2 mt-4">
                <span className="font-bold block text-blue-900">
                  The Expat Medical Solution: Splitting Supplies for Long Stays in China
                </span>
                <p className="leading-relaxed">
                  If your stay in China exceeds 15 to 30 days (for example, a semester of study or a multi-month corporate relocation), <strong>never attempt to pack 6 months of controlled psychotropics in your luggage</strong>. The standardized, legal compliance protocol is:
                </p>
                <ol className="list-decimal list-inside space-y-1 text-blue-900 font-medium">
                  <li>Pack a 15-day allowable starter supply in your carry-on luggage with your home doctor's note;</li>
                  <li>Declare the starter pack at the Red Channel upon landing at Chinese customs;</li>
                  <li>Book an outpatient appointment at an accredited international medical center (such as United Family Healthcare or Jiahui Health) in your destination city;</li>
                  <li>Present your comprehensive home diagnosis and translated clinical summary to obtain a legitimate Chinese domestic prescription.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 5: Calculator FAQ */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Section 5: Clarifications & Border Inquiries
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                Frequently Asked Questions on Medication Allowance Calculations
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>How does China Customs calculate the reasonable personal use quantity for medication?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  China Customs applies the "Reasonable Quantity for Personal Use" doctrine (合理自用原则). For Category 1 psychotropics, allowance is strictly limited to a single treatment course (7-15 days). For Category 2 psychotropics, up to 15-30 days is allowed. For non-controlled chronic maintenance medications (hypertension, diabetes), travelers may bring up to 90 days (3 months) in original packaging matching their flight itinerary.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>What happens if my prescription days of supply exceed my planned stay in China?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  If the supply carried significantly exceeds your visa duration or planned travel itinerary, customs officers may suspect commercial distribution or illegal importation. Always ensure your carried supply is proportionate to your length of stay, and carry a physician letter explaining the continuous treatment necessity.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>Can I bring a 6-month or 1-year supply of chronic prescription drugs into China?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  Carrying more than 90 days of prescription medication is heavily scrutinized at Chinese border ports. Under GACC rules, personal baggage Western medicine should generally not exceed 3 months of therapy or RMB 5,000 in personal value. Travelers needing long-term supplies should carry a 30-day starter pack and obtain local refills through international medical clinics in China.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>How do customs officers verify my medication at the airport?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  All checked and carry-on luggage passes through high-speed dual-energy CT scanners. When controlled psychotropic tablets or large liquid volumes are identified, customs officers verify the physical bottles against the passenger passport, written doctor prescription, and Red Channel declaration slip.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <h3 className="text-sm font-bold text-slate-900 flex items-start gap-2">
                  <HelpCircle className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>What is the penalty if China Customs deems my carried medication over the limit?</span>
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  If declared voluntarily at the Red Channel, excess non-controlled medications may simply be ordered for commercial customs duty declaration, bonded storage, or return shipping (退运). However, undeclared controlled psychotropics or opioids carried through the Green Channel risk immediate confiscation and administrative detention under anti-smuggling statutes.
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
