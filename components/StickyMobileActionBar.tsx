'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Luggage,
  Calculator,
  FileText,
  Search,
  ArrowRight
} from 'lucide-react';
import { Locale, SUBPATH_LOCALES, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

function useCurrentLocale(): Locale {
  const pathname = usePathname() || '/';
  for (const loc of SUBPATH_LOCALES) {
    if (pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)) {
      return loc;
    }
  }
  return 'en';
}

export default function StickyMobileActionBar() {
  const pathname = usePathname() || '/';
  const locale = useCurrentLocale();
  const dict = getDictionary(locale);

  const lp = (path: string) => getLocalizedPath(path, locale);

  // Normalize path by stripping locale prefix for matching active tab
  let cleanPath = pathname;
  for (const loc of SUBPATH_LOCALES) {
    if (cleanPath === `/${loc}` || cleanPath === `/${loc}/`) {
      cleanPath = '/';
      break;
    } else if (cleanPath.startsWith(`/${loc}/`)) {
      cleanPath = cleanPath.slice(loc.length + 1);
      break;
    }
  }

  const navItems = [
    {
      href: lp('/'),
      isActive: cleanPath === '/' || cleanPath === '',
      label: dict.nav.radar,
      icon: Search,
      badge: null,
    },
    {
      href: lp('/manifest'),
      isActive: cleanPath === '/manifest' || cleanPath.startsWith('/manifest/'),
      label: dict.nav.bag,
      icon: Luggage,
      badge: 'PRO',
    },
    {
      href: lp('/calculator'),
      isActive: cleanPath === '/calculator' || cleanPath.startsWith('/calculator/'),
      label: dict.nav.allowance,
      icon: Calculator,
      badge: null,
    },
    {
      href: lp('/customs-card'),
      isActive: cleanPath === '/customs-card' || cleanPath.startsWith('/customs-card/'),
      label: dict.nav.customsCard,
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_20px_-2px_rgba(0,0,0,0.06)] px-2 py-1.5 safe-area-pb">
      <nav className="grid grid-cols-4 gap-1 items-center max-w-md mx-auto" aria-label="Mobile Quick Access">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 relative ${
                item.isActive
                  ? 'text-blue-700 font-bold bg-blue-50/80'
                  : 'text-slate-600 hover:text-slate-900 active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon className={`h-5 w-5 ${item.isActive ? 'text-blue-700' : 'text-slate-500'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-3 text-[9px] font-mono font-black bg-blue-600 text-white px-1 rounded-full leading-tight shrink-0 whitespace-nowrap scale-90">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-1 tracking-tight truncate max-w-[72px] text-center shrink-0 whitespace-nowrap">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
