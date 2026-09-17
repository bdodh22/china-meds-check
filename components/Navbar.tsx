'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Calculator,
  FileText,
  Luggage,
  Plane,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname() || '/';

  // Determine current locale
  let currentLocale: Locale = 'en';
  for (const loc of ['ja', 'ko', 'ru', 'vi'] as Locale[]) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      currentLocale = loc;
      break;
    }
  }

  const dict = getDictionary(currentLocale);

  const localizedHref = (path: string) => getLocalizedPath(path, currentLocale);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Slogan (Stitch V4 Mint Leaf Medical Cross) */}
          <div className="flex items-center gap-3">
            <Link href={localizedHref('/')} className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 border border-teal-400/30 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:scale-105 group-hover:shadow-glow-teal transition-all duration-200">
                <svg
                  className="h-5 w-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer Mint Health Badge */}
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="6"
                    fill="#0F766E"
                    fillOpacity="0.4"
                    stroke="#5EEAD4"
                    strokeWidth="1.6"
                  />
                  {/* Clean White Cross */}
                  <path
                    d="M12 6.5V17.5M6.5 12H17.5"
                    stroke="#FFFFFF"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                    ChinaMedsCheck
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-teal-50 text-teal-800 border border-teal-200/80 font-bold">
                    .com
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  {dict.nav.brandSubtitle}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Teal Accented) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href={localizedHref('/')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150"
            >
              {dict.nav.radar}
            </Link>
            <Link
              href={localizedHref('/manifest')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 text-teal-900 font-bold transition-all duration-150 flex items-center gap-1.5 bg-teal-50/50 border border-teal-100/60"
            >
              <Luggage className="h-3.5 w-3.5 text-teal-600" />
              <span>{dict.nav.bag}</span>
            </Link>
            <Link
              href={localizedHref('/calculator')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150 flex items-center gap-1.5"
            >
              <Calculator className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.allowance}</span>
            </Link>
            <Link
              href={localizedHref('/customs-card')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150 flex items-center gap-1.5"
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.customsCard}</span>
            </Link>
            <Link
              href={localizedHref('/guide/port-clearance-walkthrough')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150 flex items-center gap-1.5"
            >
              <Plane className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.airports}</span>
            </Link>
            <Link
              href={localizedHref('/drugs')}
              className="px-3 py-1.5 rounded-xl hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150"
            >
              {dict.nav.directory}
            </Link>
          </nav>

          {/* Quick Action Button & Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <LanguageSwitcher variant="navbar" />

            <Link
              href={localizedHref('/manifest')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150"
            >
              <Luggage className="h-3.5 w-3.5" />
              <span>{dict.nav.auditBag}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-teal-50 hover:text-teal-800 focus:outline-none transition"
              aria-label="Toggle Navigation Menu"

            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 text-sm font-medium">
          <Link
            href={localizedHref('/')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            {dict.nav.radar}
          </Link>
          <Link
            href={localizedHref('/manifest')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-blue-700 font-bold bg-blue-50"
          >
            🎒 {dict.nav.bag}
          </Link>
          <Link
            href={localizedHref('/calculator')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            {dict.nav.allowance}
          </Link>
          <Link
            href={localizedHref('/customs-card')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            {dict.nav.customsCard}
          </Link>
          <Link
            href={localizedHref('/guide/port-clearance-walkthrough')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            {dict.nav.airports}
          </Link>
          <Link
            href={localizedHref('/drugs')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-slate-700 hover:bg-slate-50"
          >
            {dict.nav.directory}
          </Link>

          {/* Mobile Language Selection */}
          <LanguageSwitcher variant="mobile" />
        </div>
      )}
    </header>
  );
}
