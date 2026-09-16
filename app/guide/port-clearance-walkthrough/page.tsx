import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Plane,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { getAllPortWalkthroughs } from '@/lib/ports';
import { getHreflangAlternates } from '@/lib/i18n/config';
import AirportClearanceWidget from '@/components/tools/AirportClearanceWidget';
import LeadCaptureEmailCard from '@/components/conversion/LeadCaptureEmailCard';



export const metadata: Metadata = {
  title: 'China Airport Customs Clearance Guide: PEK, PVG, CAN',
  description:
    'Official China airport customs clearance guide. Step-by-step terminal walkthrough for PVG, PEK, CAN, PKX. Learn Red Channel declaration procedures.',
  alternates: getHreflangAlternates('/guide/port-clearance-walkthrough'),
  openGraph: {
    title: 'China Airport Customs Clearance Guide: PEK, PVG, CAN',
    description:
      'Official China airport customs clearance guide. Step-by-step terminal walkthrough for PVG, PEK, CAN, PKX. Learn Red Channel declaration procedures.',
    url: 'https://chinamedscheck.com/guide/port-clearance-walkthrough',
    siteName: 'ChinaMedsCheck',
    locale: 'en_US',
    type: 'article',
  },
};

export default function PortClearanceWalkthroughPage() {
  const ports = getAllPortWalkthroughs();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to Clear China Customs with Prescription Medication',
    description:
      'Step-by-step procedure for declaring controlled prescription drugs at major Chinese international airport border crossings.',
    step: [
      {
        '@type': 'HowToStep',
        name: 'Check Baggage for Yellow Electronic Customs Seals',
        text: 'At baggage claim, verify that your suitcases do not have a yellow tamper-evident customs lock installed during automated CT pre-screening.',
      },
      {
        '@type': 'HowToStep',
        name: 'Select the Red Channel (Goods to Declare)',
        text: 'If carrying Category 1 or 2 psychotropics (Concerta, Xanax) or medications exceeding personal limits, walk to the Red Channel on the right side of the exit.',
      },
      {
        '@type': 'HowToStep',
        name: 'Present Doctor Prescription and Passport',
        text: 'Present your official stamped medical diagnosis, hospital prescription slip, passport, and bilingual customs declaration card to the duty customs officer.',
      },
      {
        '@type': 'HowToStep',
        name: 'Receive Clearance or Temporary Custody Receipt',
        text: 'Compliant personal quantities under 7-15 days are logged and cleared. If carrying excess supply, request an official Customs Temporary Custody Slip for deposit.',
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Clean Page Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-1 shrink-0 whitespace-nowrap">
            <Plane className="h-3.5 w-3.5 text-blue-600" />
            <span>Port Logistics & Terminal Navigation</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            China Airport Customs Clearance Guide: PEK, PVG, CAN & PKX
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            Step-by-step terminal guides for PVG, PEK, CAN, and PKX. Check CT pre-screening rules, carousel locations, and Red Channel customs counters.
          </p>
        </div>

        {/* 2 Golden Rules Box (Crisp & Clean) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <ShieldCheck className="h-4 w-4 text-blue-600" />
              <span>1. The Red Channel is Your Shield</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Voluntarily declaring at the Red Channel protects you from criminal accusations. Declaring genuine prescription medicines cannot be classified as smuggling under GACC rules.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wider">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span>2. Yellow Electronic Seal Warning</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Checked bags are scanned by CT machines before reaching carousels. If your suitcase arrives with a yellow electronic seal, proceed directly to the customs desk. Never tamper with the seal.
            </p>
          </div>
        </div>

        {/* Interactive Airport Tabs & Timeline Component */}
        <AirportClearanceWidget ports={ports} locale="en" />

        {/* Departure Checklist Lead Magnet */}
        <div className="pt-4">
          <LeadCaptureEmailCard locale="en" />
        </div>
      </div>
    </div>
  );
}

