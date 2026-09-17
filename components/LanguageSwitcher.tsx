'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { Locale, ALL_LOCALES, LOCALE_METADATA, getLocalizedPath } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  variant?: 'navbar' | 'footer' | 'mobile';
}

export default function LanguageSwitcher({ variant = 'navbar' }: LanguageSwitcherProps) {
  const pathname = usePathname() || '/';
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Determine current locale from pathname
  let currentLocale: Locale = 'en';
  for (const loc of ['ja', 'ko', 'ru', 'vi'] as Locale[]) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      currentLocale = loc;
      break;
    }
  }

  // Synchronize document.documentElement.lang attribute
  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLocale;
    }
  }, [currentLocale]);

  // Handle outside click to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectLanguage = (targetLocale: Locale) => {
    setIsOpen(false);
    if (targetLocale === currentLocale) return;
    const targetPath = getLocalizedPath(pathname, targetLocale);
    router.push(targetPath);
  };

  const currentMeta = LOCALE_METADATA[currentLocale];

  if (variant === 'mobile') {
    return (
      <div className="pt-3 pb-2 border-t border-slate-100">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-1 flex items-center gap-1.5">
          <Globe className="h-3.5 w-3.5 text-slate-400" />
          <span>Language / 言語 / 언어 / Язык / Ngôn ngữ</span>
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {ALL_LOCALES.map((loc) => {
            const meta = LOCALE_METADATA[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLanguage(loc)}
                className={`flex items-center justify-between px-2.5 py-2 text-xs rounded-lg border transition text-left ${
                  isSelected
                    ? 'bg-blue-50 border-blue-200 text-blue-800 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="flex items-center gap-1.5">
                  <span>{meta.flag}</span>
                  <span>{meta.nativeName}</span>
                </span>
                {isSelected && <Check className="h-3.5 w-3.5 text-blue-600" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500 flex items-center gap-1 font-medium">
          <Globe className="h-3.5 w-3.5 text-slate-400" />
          <span>Language:</span>
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {ALL_LOCALES.map((loc) => {
            const meta = LOCALE_METADATA[loc];
            const isSelected = loc === currentLocale;
            return (
              <button
                key={loc}
                type="button"
                onClick={() => handleSelectLanguage(loc)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition inline-flex items-center gap-1 ${
                  isSelected
                    ? 'bg-blue-600 text-white font-semibold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200 shadow-2xs'
                }`}
              >
                <span>{meta.flag}</span>
                <span>{meta.nativeName}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-teal-50 hover:text-teal-800 border border-slate-200 hover:border-teal-200 rounded-lg transition-all shadow-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
        title="Change Language"
      >
        <Globe className="h-3.5 w-3.5 text-slate-400" />
        <span className="hidden sm:inline">{currentMeta.flag}</span>
        <span className="font-bold text-slate-700 tracking-wide">{currentLocale.toUpperCase()}</span>
        <ChevronDown
          className={`h-3 w-3 text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1.5 border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          <div className="py-1">
            {ALL_LOCALES.map((loc) => {
              const meta = LOCALE_METADATA[loc];
              const isSelected = loc === currentLocale;
              return (
                <button
                  key={loc}
                  type="button"
                  onClick={() => handleSelectLanguage(loc)}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition ${
                    isSelected
                      ? 'bg-blue-50 text-blue-800 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">{meta.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium leading-tight">{meta.nativeName}</span>
                      <span className="text-[10px] text-slate-400">{meta.name}</span>
                    </div>
                  </div>
                  {isSelected && <Check className="h-4 w-4 text-blue-600" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
