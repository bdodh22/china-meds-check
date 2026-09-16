'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  Filter,
  LayoutGrid,
  Table as TableIcon,
  X,
  Plus,
  Check,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Plane,
  Scale,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { Medication, TravelBagItem } from '@/lib/types';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import DrugStatusBadge from './DrugStatusBadge';

interface DrugFilterConsoleProps {
  initialMedications: Medication[];
  locale?: Locale;
}

const STORAGE_KEY = 'chinameds_travel_bag';

export default function DrugFilterConsole({ initialMedications, locale = 'en' }: DrugFilterConsoleProps) {
  const dict = getDictionary(locale);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndication, setSelectedIndication] = useState('ALL');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedAllowance, setSelectedAllowance] = useState('ALL');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [addedSlug, setAddedSlug] = useState<string | null>(null);

  // Filter computation (0ms client latency)
  const filteredMeds = useMemo(() => {
    return initialMedications.filter((med) => {
      // 1. Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase().trim();
        const brandMatch = med.brandNames.some((b) => b.toLowerCase().includes(q));
        const genericMatch = med.genericName.toLowerCase().includes(q);
        const chineseMatch = med.chineseName.toLowerCase().includes(q);
        const indicationMatch = med.indications.some((ind) => ind.toLowerCase().includes(q));
        const casMatch = med.casNumber?.toLowerCase().includes(q);

        if (!brandMatch && !genericMatch && !chineseMatch && !indicationMatch && !casMatch) {
          return false;
        }
      }

      // 2. Indication / Category
      if (selectedIndication !== 'ALL') {
        const indMap: Record<string, string[]> = {
          ADHD: ['ADHD', 'Narcolepsy', 'Stimulants'],
          ANXIETY: ['Anxiety', 'Panic Disorder', 'Insomnia', 'Sleep Aid'],
          DIABETES: ['Diabetes', 'Type 2 Diabetes', 'Weight Management'],
          PAIN: ['Severe Pain', 'Chronic Pain', 'Pain Relief', 'Neuropathic Pain', 'Opioids'],
          DEPRESSION: ['Depression', 'Major Depressive Disorder', 'Mood Disorder'],
          OTC: ['Fever', 'Headache', 'Cold', 'Sinus Congestion', 'Jet Lag']
        };

        const targetKeywords = indMap[selectedIndication] || [];
        const matchesIndication = med.indications.some((ind) =>
          targetKeywords.some((target) => ind.toLowerCase().includes(target.toLowerCase()))
        );
        if (!matchesIndication) return false;
      }

      // 3. Channel
      if (selectedChannel !== 'ALL') {
        if (med.channel !== selectedChannel) return false;
      }

      // 4. Allowance
      if (selectedAllowance !== 'ALL') {
        if (selectedAllowance === '0_DAYS' && med.allowanceDaysMax !== 0) return false;
        if (selectedAllowance === '7_15_DAYS' && (med.allowanceDaysMax <= 0 || med.allowanceDaysMax > 15)) return false;
        if (selectedAllowance === '30_DAYS' && med.allowanceDaysMax !== 30) return false;
        if (selectedAllowance === '90_DAYS' && med.allowanceDaysMax !== 90) return false;
      }

      return true;
    });
  }, [initialMedications, searchQuery, selectedIndication, selectedChannel, selectedAllowance]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedIndication('ALL');
    setSelectedChannel('ALL');
    setSelectedAllowance('ALL');
  };

  const handleAddToBag = (med: Medication) => {
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

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedIndication !== 'ALL' ||
    selectedChannel !== 'ALL' ||
    selectedAllowance !== 'ALL';

  return (
    <div className="space-y-6">
      {/* PROFESSIONAL MULTI-DIMENSIONAL FILTER BAR */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5 space-y-4">
        {/* Search Row */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={dict.drugs.searchPrompt}
              className="w-full h-11 pl-10 pr-10 rounded-xl border border-slate-300 bg-slate-50 text-sm font-medium text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl shrink-0 self-end md:self-center">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Compact Table Mode (High Density)"
            >
              <TableIcon className="h-3.5 w-3.5" />
              <span>{dict.drugs.tableMode}</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid Card Mode"
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{dict.drugs.cardsMode}</span>
            </button>
          </div>
        </div>

        {/* 3 Linked Dropdown Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Dropdown 1: Indication */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">
              {dict.drugs.filterClassLabel}
            </label>
            <select
              value={selectedIndication}
              onChange={(e) => setSelectedIndication(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="ALL">{dict.drugs.classAll}</option>
              <option value="ADHD">{dict.drugs.classAdhd}</option>
              <option value="ANXIETY">{dict.drugs.classAnxiety}</option>
              <option value="DIABETES">{dict.drugs.classDiabetes}</option>
              <option value="PAIN">{dict.drugs.classPain}</option>
              <option value="DEPRESSION">{dict.drugs.classDepression}</option>
              <option value="OTC">{dict.drugs.classOtc}</option>
            </select>
          </div>

          {/* Dropdown 2: Customs Channel */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">
              {dict.drugs.filterChannelLabel}
            </label>
            <select
              value={selectedChannel}
              onChange={(e) => setSelectedChannel(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="ALL">{dict.drugs.channelAll}</option>
              <option value="RED_CHANNEL">{dict.drugs.channelRed}</option>
              <option value="GREEN_CHANNEL">{dict.drugs.channelGreen}</option>
              <option value="STRICTLY_FORBIDDEN">{dict.drugs.channelBanned}</option>
            </select>
          </div>

          {/* Dropdown 3: Carry Allowance Days */}
          <div>
            <label className="block font-bold text-slate-600 mb-1">
              {dict.drugs.filterQuotaLabel}
            </label>
            <select
              value={selectedAllowance}
              onChange={(e) => setSelectedAllowance(e.target.value)}
              className="w-full h-10 px-3 rounded-xl border border-slate-300 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
            >
              <option value="ALL">{dict.drugs.quotaAll}</option>
              <option value="0_DAYS">{dict.drugs.quota0d}</option>
              <option value="7_15_DAYS">{dict.drugs.quota7_15d}</option>
              <option value="30_DAYS">{dict.drugs.quota30d}</option>
              <option value="90_DAYS">{dict.drugs.quota90d}</option>
            </select>
          </div>
        </div>

        {/* Filter Stats & Reset */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900 font-bold">{filteredMeds.length}</strong> of{' '}
            {initialMedications.length} medications
          </div>

          {hasActiveFilters && (
            <button
              onClick={handleResetFilters}
              className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{dict.drugs.resetFilters}</span>
            </button>

          )}
        </div>
      </div>

      {/* =========================================================
          VIEW MODE 1: COMPACT TABLE HUD (High Information Density)
          ========================================================= */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-900 text-white font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Brand & INN Generic</th>
                  <th className="py-3 px-4">Chinese Name</th>
                  <th className="py-3 px-4">CAS #</th>
                  <th className="py-3 px-4">Allowance Limit</th>
                  <th className="py-3 px-4">Customs Channel</th>
                  <th className="py-3 px-4">Aviation Placement</th>
                  <th className="py-3 px-4 text-right">Quick Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredMeds.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400 text-sm">
                      {dict.drugs.noMatch}
                    </td>
                  </tr>
                ) : (
                  filteredMeds.map((med) => {
                    const primaryBrand = med.brandNames[0];
                    const isColdChain = med.clearanceProfiles?.caacAviation?.coldChain;
                    const isSharps = med.clearanceProfiles?.caacAviation?.sharpsInvolved;

                    return (
                      <tr key={med.slug} className="hover:bg-slate-50 transition-colors group">
                        <td className="py-3 px-4 whitespace-nowrap">
                          <DrugStatusBadge status={med.status} size="sm" />
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/drugs/${med.slug}`}
                            className="font-bold text-slate-900 group-hover:text-blue-600 transition block text-sm"
                          >
                            {primaryBrand}
                          </Link>
                          <div className="text-[11px] text-slate-500 font-mono">
                            {med.genericName}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800 whitespace-nowrap">
                          {med.chineseName}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500 whitespace-nowrap">
                          {med.casNumber || '-'}
                        </td>
                        <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                          {med.allowance}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap">
                          {med.channel === 'STRICTLY_FORBIDDEN' && (
                            <span className="inline-flex items-center gap-1 font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded">
                              <AlertOctagon className="h-3 w-3" /> Forbidden
                            </span>
                          )}
                          {med.channel === 'RED_CHANNEL' && (
                            <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                              <AlertTriangle className="h-3 w-3" /> Red Channel
                            </span>
                          )}
                          {med.channel === 'GREEN_CHANNEL' && (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              <CheckCircle2 className="h-3 w-3" /> Green Channel
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 whitespace-nowrap text-slate-600">
                          {isColdChain ? (
                            <span className="text-indigo-700 font-medium">Ice Pack Cert</span>
                          ) : isSharps ? (
                            <span className="text-purple-700 font-medium">Needles in Cabin</span>
                          ) : (
                            med.clearanceProfiles?.caacAviation?.carryOn === 'ALLOWED' ? 'Cabin/Checked' : 'Cabin with Rx'
                          )}
                        </td>
                        <td className="py-3 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleAddToBag(med)}
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

                            <Link
                              href={`/drugs/${med.slug}`}
                              className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition"
                              title="View Full Drug Profile"
                            >
                              <ArrowRight className="h-4 w-4" />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* =========================================================
           VIEW MODE 2: GRID CARDS (Structured Compact Cards)
           ========================================================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMeds.map((med) => {
            const primaryBrand = med.brandNames[0];
            return (
              <div
                key={med.slug}
                className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col justify-between hover:shadow-md transition group space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <DrugStatusBadge status={med.status} size="sm" />
                    {med.casNumber && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                        CAS: {med.casNumber}
                      </span>
                    )}
                  </div>

                  <Link href={`/drugs/${med.slug}`} className="block">
                    <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition text-base">
                      {primaryBrand}
                    </h3>
                    <p className="text-xs font-mono text-slate-500 line-clamp-1">
                      {med.genericName}
                    </p>
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      {med.chineseName}
                    </p>
                  </Link>

                  <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                    {med.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-slate-900 block">{med.allowance}</span>
                    <span className="text-[11px] text-slate-500">
                      {med.channel === 'RED_CHANNEL' ? 'Red Channel' : med.channel === 'GREEN_CHANNEL' ? 'Green Channel' : 'Banned'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleAddToBag(med)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs flex items-center gap-1"
                    >
                      {addedSlug === med.slug ? '✓ Added' : '+ Bag'}
                    </button>
                    <Link
                      href={`/drugs/${med.slug}`}
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-900"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
