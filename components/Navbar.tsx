'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Calculator,
  FileText,
  Luggage,
  Plane,
  ChevronDown,
  BookOpen,
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
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

  // Close "More" dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinkClass =
    'px-3 py-1.5 rounded-xl text-sm font-medium text-slate-600 hover:text-teal-800 hover:bg-teal-50/80 transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap';

  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/60 shadow-[0_2px_16px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">

          {/* ── Logo ───────────────────────────────────────────── */}
          <div className="flex items-center shrink-0">
            <Link href={localizedHref('/')} className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-500 to-teal-700 border border-teal-400/30 flex items-center justify-center text-white shadow-sm shadow-teal-700/20 group-hover:scale-105 group-hover:shadow-glow-teal transition-all duration-200 shrink-0">
                <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="2" width="20" height="20" rx="6" fill="#0F766E" fillOpacity="0.4" stroke="#5EEAD4" strokeWidth="1.6" />
                  <path d="M12 6.5V17.5M6.5 12H17.5" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-slate-900 text-base tracking-tight whitespace-nowrap">
                    ChinaMedsCheck
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-teal-50 text-teal-800 border border-teal-200/80 font-bold shrink-0">
                    .com
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium -mt-0.5 hidden lg:block whitespace-nowrap">
                  {dict.nav.brandSubtitle}
                </span>
              </div>
            </Link>
          </div>

          {/* ── Desktop Nav (Primary — high-frequency) ───────── */}
          <nav className="hidden md:flex items-center gap-1 flex-1 justify-center">
            <Link href={localizedHref('/')} className={navLinkClass}>
              {dict.nav.radar}
            </Link>

            <Link
              href={localizedHref('/manifest')}
              className="px-3 py-1.5 rounded-xl text-sm font-bold text-teal-900 hover:text-teal-800 hover:bg-teal-50 bg-teal-50/60 border border-teal-100/80 transition-all duration-150 flex items-center gap-1.5 whitespace-nowrap"
            >
              <Luggage className="h-3.5 w-3.5 text-teal-600 shrink-0" />
              <span>{dict.nav.bag}</span>
            </Link>

            <Link href={localizedHref('/calculator')} className={navLinkClass}>
              <Calculator className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{dict.nav.allowance}</span>
            </Link>

            <Link href={localizedHref('/drugs')} className={navLinkClass}>
              <BookOpen className="h-3.5 w-3.5 text-slate-400 shrink-0" />
              <span>{dict.nav.directory}</span>
            </Link>

            {/* ─ More dropdown (low-frequency) ─ */}
            <div className="relative" ref={moreRef}>
              <button
                type="button"
                onClick={() => setMoreOpen(!moreOpen)}
                aria-expanded={moreOpen}
                className={`${navLinkClass} select-none`}
              >
                <span>More</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-150 ${moreOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {moreOpen && (
                <div className="absolute left-0 top-full mt-2 w-52 rounded-xl bg-white border border-slate-200/80 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <Link
                    href={localizedHref('/customs-card')}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                  >
                    <FileText className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{dict.nav.customsCard}</span>
                  </Link>
                  <Link
                    href={localizedHref('/guide/port-clearance-walkthrough')}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-900 transition-colors"
                  >
                    <Plane className="h-4 w-4 text-slate-400 shrink-0" />
                    <span>{dict.nav.airports}</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* ── Right: Language + CTA + Mobile Toggle ────────── */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageSwitcher variant="navbar" />

            <Link
              href={localizedHref('/manifest')}
              className="hidden xl:inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-500 hover:to-teal-600 text-white shadow-xs hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150 whitespace-nowrap"
            >
              <Luggage className="h-3.5 w-3.5 shrink-0" />
              <span>{dict.nav.auditBag}</span>
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-600 hover:bg-teal-50 hover:text-teal-800 focus:outline-none transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 pt-3 pb-6 space-y-1 text-sm font-medium">
          <Link
            href={localizedHref('/')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-teal-800 transition-colors"
          >
            {dict.nav.radar}
          </Link>
          <Link
            href={localizedHref('/manifest')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-teal-800 font-bold bg-teal-50/80 border border-teal-100"
          >
            🎒 {dict.nav.bag}
          </Link>
          <Link
            href={localizedHref('/calculator')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {dict.nav.allowance}
          </Link>
          <Link
            href={localizedHref('/drugs')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {dict.nav.directory}
          </Link>
          <Link
            href={localizedHref('/customs-card')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {dict.nav.customsCard}
          </Link>
          <Link
            href={localizedHref('/guide/port-clearance-walkthrough')}
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2.5 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
          >
            {dict.nav.airports}
          </Link>

          {/* Mobile Language Selection */}
          <LanguageSwitcher variant="mobile" />
        </div>
      )}
    </header>
  );
}
