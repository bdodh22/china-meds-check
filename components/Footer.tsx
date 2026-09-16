import React from 'react';
import Link from 'next/link';
import { Shield, PhoneCall, AlertTriangle, ExternalLink, Heart } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      {/* Emergency Hotlines Callout Bar */}
      <div className="border-b border-slate-800 bg-slate-950 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <PhoneCall className="h-4 w-4 text-rose-400" />
            <span>Emergency Assistance Hotlines in Mainland China:</span>
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center text-slate-200 font-mono text-[11px]">
            <span>Medical Emergency: <strong className="text-white underline">120</strong></span>
            <span>Police / Security: <strong className="text-white underline">110</strong></span>
            <span>China Customs Inquiry Hotline: <strong className="text-white underline">12360</strong></span>
            <span>Consular Protection (MFA): <strong className="text-white underline">+86-10-12308</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4-Tier Internal Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: High-Search Medications */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-3 uppercase">
              High-Risk Medications
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/drugs/adderall-in-china" className="hover:text-white transition">
                  Adderall & Amphetamine (Prohibited)
                </Link>
              </li>
              <li>
                <Link href="/drugs/ritalin-concerta-in-china" className="hover:text-white transition">
                  Concerta & Ritalin (Category 1)
                </Link>
              </li>
              <li>
                <Link href="/drugs/cbd-oil-in-china" className="hover:text-white transition">
                  CBD Oil & Hemp Extract (Banned)
                </Link>
              </li>
              <li>
                <Link href="/drugs/vyvanse-in-china" className="hover:text-white transition">
                  Vyvanse (Lisdexamfetamine)
                </Link>
              </li>
              <li>
                <Link href="/drugs/xanax-in-china" className="hover:text-white transition">
                  Xanax (Alprazolam Controlled)
                </Link>
              </li>
              <li>
                <Link href="/drugs/ambien-in-china" className="hover:text-white transition">
                  Ambien (Zolpidem Sleep Aid)
                </Link>
              </li>
              <li>
                <Link href="/drugs/ozempic-wegovy-in-china" className="hover:text-white transition">
                  Ozempic (Cold-Chain & Needles)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Decision Radar */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-3 uppercase">
              Compliance Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/manifest" className="text-blue-400 font-semibold hover:text-white transition">
                  🎒 Travel Medication Bag Manifest
                </Link>
              </li>
              <li>
                <Link href="/customs-card" className="hover:text-white transition">
                  Bilingual Customs Declaration Card
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition">
                  Carry Allowance Days Calculator
                </Link>
              </li>
              <li>
                <Link href="/" className="hover:text-white transition">
                  Medication Legality Search Radar
                </Link>
              </li>
              <li>
                <Link href="/drugs" className="hover:text-white transition">
                  Complete Medication Directory (31+)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customs & Entry Guides */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-3 uppercase">
              Border & Port Guides
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/guide/port-clearance-walkthrough" className="text-emerald-400 font-semibold hover:text-white transition">
                  ✈️ Airport Customs Guides (PVG, PEK, CAN)
                </Link>
              </li>
              <li>
                <Link href="/guide/bring-medications-to-china" className="hover:text-white transition">
                  Complete China Customs Entry Guide
                </Link>
              </li>
              <li>
                <Link href="/drugs/pseudoephedrine-sudafed-in-china" className="hover:text-white transition">
                  Sudafed Precursor Chemical Limits
                </Link>
              </li>
              <li>
                <Link href="/drugs/fentanyl-patch-in-china" className="hover:text-white transition">
                  Fentanyl Patch Narcotic Regulations
                </Link>
              </li>
              <li>
                <Link href="/drugs/ibuprofen-in-china" className="hover:text-white transition">
                  OTC Pain Relievers (Advil / Tylenol)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Authorities & References */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wide mb-3 uppercase">
              Official Regulations
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="http://www.customs.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  General Administration of Customs (GACC)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.nmpa.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  National Medical Products Admin (NMPA)
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="http://www.nncc626.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition inline-flex items-center gap-1"
                >
                  China National Narcotics Control Commission
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="pt-2 text-slate-500">
                Data updated periodically based on official Chinese State Council catalogues.
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Medical YMYL Disclaimer */}
        <div className="pt-8 border-t border-slate-800 space-y-3">
          <div className="flex items-start gap-2 text-slate-400 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Statutory YMYL Notice</strong>: ChinaMedsCheck.com is an independent public-information technology service designed to aid international travelers in understanding Chinese medication entry regulations. We are not a law firm, hospital, or agency of the Chinese government. Regulations, drug schedules, and border enforcement policies are subject to unilateral revision by Chinese authorities. Always verify your regimen with your licensed healthcare provider and the relevant Chinese diplomatic mission prior to international departure.
            </p>
          </div>

          {/* Multi-Language Quick Selector */}
          <div className="pt-2 pb-1 border-b border-slate-800/80">
            <LanguageSwitcher variant="footer" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] pt-2">
            <div>
              &copy; {new Date().getFullYear()} ChinaMedsCheck.com. All rights reserved. Built for safe international travel to China.
            </div>
            <div className="flex items-center gap-4">
              <span>Privacy-first: Zero health data saved on servers</span>
              <span>•</span>
              <span>Fast Edge SSG Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
