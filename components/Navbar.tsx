'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
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
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Slogan */}
          <div className="flex items-center gap-3">
            <Link href={localizedHref('/')} className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white shadow-sm group-hover:bg-slate-800 transition">
                <Shield className="h-5 w-5 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-900 text-lg tracking-tight">
                    ChinaMedsCheck
                  </span>
                  <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    .com
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium -mt-1 hidden sm:block">
                  {dict.nav.brandSubtitle}
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-600">
            <Link
              href={localizedHref('/')}
              className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition"
            >
              {dict.nav.radar}
            </Link>
            <Link
              href={localizedHref('/manifest')}
              className="px-2.5 py-1.5 rounded-lg hover:text-blue-700 hover:bg-blue-50 text-blue-900 font-bold transition flex items-center gap-1"
            >
              <Luggage className="h-3.5 w-3.5 text-blue-600" />
              <span>{dict.nav.bag}</span>
            </Link>
            <Link
              href={localizedHref('/calculator')}
              className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-1"
            >
              <Calculator className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.allowance}</span>
            </Link>
            <Link
              href={localizedHref('/customs-card')}
              className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-1"
            >
              <FileText className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.customsCard}</span>
            </Link>
            <Link
              href={localizedHref('/guide/port-clearance-walkthrough')}
              className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-1"
            >
              <Plane className="h-3.5 w-3.5 text-slate-500" />
              <span>{dict.nav.airports}</span>
            </Link>
            <Link
              href={localizedHref('/drugs')}
              className="px-2.5 py-1.5 rounded-lg hover:text-slate-900 hover:bg-slate-50 transition"
            >
              {dict.nav.directory}
            </Link>
          </nav>

          {/* Quick Action Button & Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-2">
            <LanguageSwitcher variant="navbar" />

            <Link
              href={localizedHref('/manifest')}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition shadow-sm"
            >
              <Luggage className="h-3.5 w-3.5" />
              <span>{dict.nav.auditBag}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
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
