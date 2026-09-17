'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  X,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  AlertOctagon,
  HelpCircle,
  Sparkles,
  Database,
  Plus,
  Check,
  Plane,
  Luggage
} from 'lucide-react';
import { Medication, TravelBagItem } from '@/lib/types';
import DrugStatusBadge from './DrugStatusBadge';
import { searchMedsWithTypoTolerance } from '@/lib/searchIndex';
import { resolveBrandViaRxNorm, RxNormResolution } from '@/lib/rxnorm';
import RedLineBlocker, { checkIsBannedTerm } from './RedLineBlocker';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';

interface PopularSearchItem {
  term: string;
  status: 'RED' | 'YELLOW' | 'GREEN';
  badge: string;
}

const POPULAR_SEARCHES: PopularSearchItem[] = [
  { term: 'Adderall', status: 'RED', badge: 'Banned' },
  { term: 'Concerta', status: 'YELLOW', badge: 'Controlled' },
  { term: 'Xanax', status: 'YELLOW', badge: 'Rx Required' },
  { term: 'CBD Oil', status: 'RED', badge: 'Prohibited' },
  { term: 'Ozempic', status: 'GREEN', badge: 'Allowed' },
];

const STORAGE_KEY = 'chinameds_travel_bag';

interface DrugSearchWidgetProps {
  placeholder?: string;
  locale?: Locale;
}

export default function DrugSearchWidget({
  placeholder = 'Search medication, brand name, condition or CAS number...',
  locale = 'en',
}: DrugSearchWidgetProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [rxNormResult, setRxNormResult] = useState<RxNormResolution | null>(null);
  const [isResolvingRxNorm, setIsResolvingRxNorm] = useState(false);
  const [blockedTerm, setBlockedTerm] = useState<string | null>(null);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Intercept banned keywords immediately
  useEffect(() => {
    const intercepted = checkIsBannedTerm(query);
    if (intercepted) {
      setBlockedTerm(intercepted);
    }
  }, [query]);

  // Primary in-browser typo-tolerant search (0ms latency)
  const results = useMemo(() => {
    return searchMedsWithTypoTolerance(query);
  }, [query]);

  // Fallback: When 0 local results and query >= 3 chars, query NLM RxNorm
  useEffect(() => {
    let active = true;
    const cleanQ = query.trim();

    if (results.length === 0 && cleanQ.length >= 3) {
      setIsResolvingRxNorm(true);
      const timer = setTimeout(() => {
        resolveBrandViaRxNorm(cleanQ).then((res) => {
          if (active) {
            setRxNormResult(res);
            setIsResolvingRxNorm(false);
          }
        });
      }, 350);

      return () => {
        active = false;
        clearTimeout(timer);
      };
    } else {
      setRxNormResult(null);
      setIsResolvingRxNorm(false);
    }
  }, [query, results.length]);

  const handleSelectPopular = (term: string) => {
    const intercepted = checkIsBannedTerm(term);
    if (intercepted) {
      setBlockedTerm(intercepted);
    }
    setQuery(term);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setRxNormResult(null);
    setIsOpen(false);
  };

  const handleAddToBag = (e: React.MouseEvent, med: Medication) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const currentBag: TravelBagItem[] = stored ? JSON.parse(stored) : [];

      if (!currentBag.some((it) => it.slug === med.slug)) {
        const newItem: TravelBagItem = {
          slug: med.slug,
          brandName: med.brandNames[0],
          genericName: med.genericName,
          chineseName: med.chineseName,
          casNumber: med.casNumber,
          status: med.status,
          channel: med.channel,
          allowanceDaysMax: med.allowanceDaysMax,
          userDaysOfSupply: med.allowanceDaysMax > 0 ? Math.min(med.allowanceDaysMax, 14) : 7,
          userDosage: 'As prescribed',
          activeIngredients: med.activeIngredients || [],
          redLineWarning: med.redLineWarning,
          clearanceProfiles: med.clearanceProfiles
        };
        currentBag.push(newItem);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentBag));
        window.dispatchEvent(new Event('travel_bag_updated'));
      }
      setAddedSlug(med.slug);
      setTimeout(() => setAddedSlug(null), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div ref={containerRef} className="w-full max-w-3xl mx-auto relative z-30">
      {/* Red Line Blocker Modal */}
      <RedLineBlocker
        isOpen={!!blockedTerm}
        blockedTerm={blockedTerm || ''}
        onClose={() => setBlockedTerm(null)}
      />

      {/* Search Bar Input Container: High-Contrast Crisp Entity */}
      <div className="relative flex items-center bg-white rounded-2xl border-2 border-slate-300 hover:border-teal-600 focus-within:border-teal-600 focus-within:ring-4 focus-within:ring-teal-500/15 shadow-[0_10px_30px_rgba(15,23,42,0.08)] transition-all duration-200 group p-1.5">
        <div className="pl-3.5 pr-1 text-slate-400 group-focus-within:text-teal-600 transition-colors">
          <Search className="h-5 w-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full px-3 py-3 text-base sm:text-lg text-slate-900 bg-transparent placeholder-slate-400 focus:outline-none"
          aria-label="Search medication legality in China"
        />

        {/* Keyboard Shortcut & Action Cluster */}
        <div className="flex items-center gap-1.5 pr-1 shrink-0">
          <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-[11px] font-mono font-medium text-slate-500 border border-slate-200">
            ⌘K
          </span>

          {query && (
            <button
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-150 cursor-pointer active:scale-95"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white text-sm font-bold shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-150 cursor-pointer"
          >
            <span>Check</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Popular Fast-Lookup Chips: Single Unified Row (Zero Awkward Wraps) */}
      <div className="mt-4 flex items-center justify-center gap-2.5 text-xs py-1">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden sm:inline-flex items-center gap-1.5 font-mono">
          <Sparkles className="h-3 w-3 text-teal-600" />
          <span>Quick Radar:</span>
        </span>
        <div className="flex flex-wrap sm:flex-nowrap items-center justify-center gap-2">
          {POPULAR_SEARCHES.map(({ term, status }) => (
            <button
              key={term}
              type="button"
              onClick={() => handleSelectPopular(term)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-teal-900 border border-slate-200/90 hover:border-teal-400 shadow-2xs hover:shadow-xs hover:-translate-y-0.5 active:scale-[0.97] transition-all duration-150 cursor-pointer text-xs font-semibold shrink-0 whitespace-nowrap"
            >
              <span
                className={`h-2 w-2 rounded-full shrink-0 ${
                  status === 'RED'
                    ? 'bg-rose-500 ring-2 ring-rose-100'
                    : status === 'YELLOW'
                    ? 'bg-amber-400 ring-2 ring-amber-100'
                    : 'bg-emerald-500 ring-2 ring-emerald-100'
                }`}
              />
              <span>{term}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Autocomplete & Results Dropdown (Stitch V4 Elevated Frosted Surface) */}
      {isOpen && query.trim() !== '' && (
        <div className="absolute left-0 right-0 top-full mt-2.5 bg-white/95 backdrop-blur-xl rounded-2xl border border-white/90 shadow-[0_20px_50px_rgba(15,23,42,0.10)] overflow-hidden divide-y divide-slate-100/80 max-h-[480px] overflow-y-auto z-50">


          {/* Local Matches */}
          {results.length > 0 ? (
            results.map((med) => {
              const statusColor =
                med.status === 'RED'
                  ? 'border-l-rose-600'
                  : med.status === 'YELLOW'
                  ? 'border-l-amber-500'
                  : 'border-l-emerald-600';

              const isColdChain = med.clearanceProfiles?.caacAviation?.coldChain;
              const isSharps = med.clearanceProfiles?.caacAviation?.sharpsInvolved;

              return (
                <div
                  key={med.slug}
                  className={`py-2.5 px-3.5 hover:bg-slate-50 transition border-l-4 ${statusColor} group relative flex items-center justify-between gap-3`}
                >
                  <Link
                    href={getLocalizedPath(`/drugs/${med.slug}`, locale)}
                    onClick={() => setIsOpen(false)}
                    className="flex-1 min-w-0"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                        {med.brandNames[0]}
                      </span>
                      <span className="text-xs text-slate-500 font-mono truncate">
                        ({med.genericName})
                      </span>
                      <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                        {med.chineseName}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-2.5 text-[11px] text-slate-500 flex-wrap">
                      <span className="font-bold text-slate-800">
                        {med.allowance}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>
                        {med.channel === 'STRICTLY_FORBIDDEN' ? '⛔ Prohibited' : med.channel === 'RED_CHANNEL' ? '🔴 Red Channel' : '🟢 Green Channel'}
                      </span>
                      {med.casNumber && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span className="font-mono text-slate-400">CAS: {med.casNumber}</span>
                        </>
                      )}
                    </div>
                  </Link>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => handleAddToBag(e, med)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
                        addedSlug === med.slug
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                      }`}
                      title="Add to Travel Bag"
                    >
                      {addedSlug === med.slug ? (
                        <>
                          <Check className="h-3 w-3" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-3 w-3" />
                          <span>Bag</span>
                        </>
                      )}
                    </button>

                    <DrugStatusBadge status={med.status} size="sm" locale={locale} />

                    <Link
                      href={getLocalizedPath(`/drugs/${med.slug}`, locale)}
                      onClick={() => setIsOpen(false)}
                      className="p-1 text-slate-400 hover:text-slate-900"
                    >
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              );
            })
          ) : rxNormResult?.matchedMedication ? (
            /* Live RxNorm Matched Brand Resolution Card */
            <div className="p-4 bg-blue-50/60 border-l-4 border-l-blue-600">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 mb-1">
                <Database className="h-3.5 w-3.5 text-blue-700" />
                <span>Resolved via US NLM RxNorm Open Database</span>
              </div>
              <p className="text-xs text-blue-800">
                Found brand <strong>"{query}"</strong> containing active chemical ingredient{' '}
                <strong>"{rxNormResult.matchedMedication.genericName}"</strong>.
              </p>

              <Link
                href={getLocalizedPath(`/drugs/${rxNormResult.matchedMedication.slug}`, locale)}
                onClick={() => setIsOpen(false)}
                className="mt-3 block p-3 rounded-lg bg-white border border-blue-200 hover:border-blue-400 transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm text-slate-900">
                      {rxNormResult.matchedMedication.brandNames.join(' / ')} ({rxNormResult.matchedMedication.genericName})
                    </div>
                    <div className="text-xs text-slate-600 mt-0.5">
                      China Status: {rxNormResult.matchedMedication.chineseName}
                    </div>
                  </div>
                  <DrugStatusBadge status={rxNormResult.matchedMedication.status} size="sm" locale={locale} />
                </div>
              </Link>
            </div>
          ) : isResolvingRxNorm ? (
            <div className="p-6 text-center text-slate-500">
              <Sparkles className="h-5 w-5 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-xs font-medium text-slate-700">
                Searching US NLM RxNorm repository for active chemical formulation...
              </p>
            </div>
          ) : (
            <div className="p-6 text-center text-slate-500">
              <AlertCircle className="h-8 w-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-800">
                No match found for "{query}"
              </p>
              <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
                Try searching by the <strong>INN generic chemical name</strong> (e.g. <em>Amphetamine, Methylphenidate, Alprazolam, Clonazepam</em>) or explore the{' '}
                <Link
                  href="/drugs"
                  className="text-blue-600 underline hover:text-blue-800 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  complete directory of restricted medications
                </Link>
                .
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
