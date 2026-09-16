'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PhoneCall, AlertTriangle, ExternalLink } from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Locale, SUBPATH_LOCALES, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

// Detect current locale from pathname (mirrors LanguageSwitcher logic)
function useCurrentLocale(): Locale {
  const pathname = usePathname() || '/';
  for (const loc of SUBPATH_LOCALES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return loc;
    }
  }
  return 'en';
}

export default function Footer() {
  const locale = useCurrentLocale();
  const dict = getDictionary(locale);

  // Helper — locale-aware internal links
  const lp = (path: string) => getLocalizedPath(path, locale);

  return (
    <footer className="bg-slate-50/80 text-slate-600 text-xs border-t border-slate-200">
      {/* Emergency Hotlines Callout Bar */}
      <div className="border-b border-rose-100 bg-rose-50/60 py-3.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-rose-900 font-bold text-xs uppercase tracking-wide">
            <PhoneCall className="h-4 w-4 text-rose-600" />
            <span>{dict.footer.hotlinesTitle}</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center text-slate-700 font-mono text-[11px]">
            <span>{dict.footer.medicalEmergency}: <strong className="text-rose-700 font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200">120</strong></span>
            <span>{dict.footer.police}: <strong className="text-rose-700 font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200">110</strong></span>
            <span>{dict.footer.customsHotline}: <strong className="text-rose-700 font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200">12360</strong></span>
            <span>{dict.footer.consularProtection}: <strong className="text-rose-700 font-bold bg-white px-1.5 py-0.5 rounded border border-rose-200">+86-10-12308</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4-Tier Internal Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: High-Search Medications */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider mb-3.5 uppercase">
              {dict.footer.colRisk}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={lp('/drugs/adderall-in-china')} className="hover:text-blue-600 transition">
                  Adderall &amp; Amphetamine (Prohibited)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/ritalin-concerta-in-china')} className="hover:text-blue-600 transition">
                  Concerta &amp; Ritalin (Category 1)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/cbd-oil-in-china')} className="hover:text-blue-600 transition">
                  CBD Oil &amp; Hemp Extract (Banned)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/vyvanse-in-china')} className="hover:text-blue-600 transition">
                  Vyvanse (Lisdexamfetamine)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/xanax-in-china')} className="hover:text-blue-600 transition">
                  Xanax (Alprazolam Controlled)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/ambien-in-china')} className="hover:text-blue-600 transition">
                  Ambien (Zolpidem Sleep Aid)
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/ozempic-wegovy-in-china')} className="hover:text-blue-600 transition">
                  Ozempic (Cold-Chain &amp; Needles)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Tools & Decision Radar */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider mb-3.5 uppercase">
              {dict.footer.colTools}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={lp('/manifest')} className="text-blue-600 font-semibold hover:text-blue-800 transition">
                  🎒 {dict.nav.auditBag}
                </Link>
              </li>
              <li>
                <Link href={lp('/customs-card')} className="hover:text-blue-600 transition">
                  {dict.nav.customsCard}
                </Link>
              </li>
              <li>
                <Link href={lp('/calculator')} className="hover:text-blue-600 transition">
                  {dict.nav.allowance}
                </Link>
              </li>
              <li>
                <Link href={lp('/')} className="hover:text-blue-600 transition">
                  {dict.nav.radar}
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs')} className="hover:text-blue-600 transition">
                  {dict.nav.directory}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customs & Entry Guides */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider mb-3.5 uppercase">
              {dict.footer.colBorder}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href={lp('/guide/port-clearance-walkthrough')} className="text-emerald-700 font-semibold hover:text-emerald-900 transition">
                  ✈️ {dict.nav.airports}
                </Link>
              </li>
              <li>
                <Link href={lp('/guide/bring-medications-to-china')} className="hover:text-blue-600 transition">
                  {dict.nav.radar}
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/pseudoephedrine-sudafed-in-china')} className="hover:text-blue-600 transition">
                  Sudafed Precursor Chemical Limits
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/fentanyl-patch-in-china')} className="hover:text-blue-600 transition">
                  Fentanyl Patch Narcotic Regulations
                </Link>
              </li>
              <li>
                <Link href={lp('/drugs/ibuprofen-in-china')} className="hover:text-blue-600 transition">
                  OTC Pain Relievers (Advil / Tylenol)
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Authorities & References */}
          <div>
            <h4 className="text-slate-900 font-bold text-xs tracking-wider mb-3.5 uppercase">
              {dict.footer.colAuthorities}
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a
                  href="http://www.customs.gov.cn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition inline-flex items-center gap-1 text-slate-600"
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
                  className="hover:text-blue-600 transition inline-flex items-center gap-1 text-slate-600"
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
                  className="hover:text-blue-600 transition inline-flex items-center gap-1 text-slate-600"
                >
                  China Narcotics Control Commission
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="pt-2 text-slate-400">
                Data updated periodically based on official Chinese State Council catalogues.
              </li>
            </ul>
          </div>
        </div>

        {/* Legal & Medical YMYL Disclaimer */}
        <div className="pt-8 border-t border-slate-200 space-y-3">
          <div className="flex items-start gap-2 text-slate-600 bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong className="text-slate-800">{dict.footer.disclaimerTitle}</strong>: {dict.footer.disclaimerText}
            </p>
          </div>

          {/* Multi-Language Quick Selector */}
          <div className="pt-2 pb-1 border-b border-slate-200/80">
            <LanguageSwitcher variant="footer" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px] pt-2">
            <div>
              &copy; {new Date().getFullYear()} {dict.footer.rights}
            </div>
            <div className="flex items-center gap-4">
              <span>{dict.footer.privacy}</span>
              <span>•</span>
              <span>{dict.footer.ssg}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
