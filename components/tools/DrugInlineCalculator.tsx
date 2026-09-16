'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calculator,
  AlertTriangle,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  FileText,
  Hospital,
  Luggage,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Medication, TravelBagItem } from '@/lib/types';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface DrugInlineCalculatorProps {
  med: Medication;
  locale?: Locale;
}

const STORAGE_KEY = 'chinameds_travel_bag';

export default function DrugInlineCalculator({ med, locale = 'en' }: DrugInlineCalculatorProps) {
  const dict = getDictionary(locale);
  const [stayDays, setStayDays] = useState<number>(med.allowanceDaysMax > 0 ? med.allowanceDaysMax : 14);
  const [dailyDose, setDailyDose] = useState<number>(1);
  const [added, setAdded] = useState(false);

  const primaryBrand = med.brandNames[0];
  const maxDays = med.allowanceDaysMax;
  const isBanned = maxDays === 0;
  const isOver = !isBanned && stayDays > maxDays;
  const isCompliant = !isBanned && stayDays <= maxDays;

  const totalTabletsNeeded = stayDays * dailyDose;
  const allowedTablets = maxDays * dailyDose;
  const excessTablets = Math.max(0, totalTabletsNeeded - allowedTablets);

  const handleAddToBag = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const bag: TravelBagItem[] = stored ? JSON.parse(stored) : [];
      const existingIdx = bag.findIndex((it) => it.slug === med.slug);

      const newItem: TravelBagItem = {
        slug: med.slug,
        brandName: primaryBrand,
        genericName: med.genericName,
        chineseName: med.chineseName,
        casNumber: med.casNumber,
        status: med.status,
        channel: med.channel,
        allowanceDaysMax: med.allowanceDaysMax,
        userDaysOfSupply: stayDays,
        userDosage: `${dailyDose} dose(s) per day`,
        activeIngredients: med.activeIngredients || [],
        redLineWarning: med.redLineWarning,
        clearanceProfiles: med.clearanceProfiles
      };

      if (existingIdx >= 0) {
        bag[existingIdx] = newItem;
      } else {
        bag.push(newItem);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
      window.dispatchEvent(new Event('travel_bag_updated'));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-5">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold shrink-0">
            <Calculator className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              {dict.inlineCalc.title} ({primaryBrand})
            </h2>
            <p className="text-xs text-slate-500">
              {dict.inlineCalc.subtitle}
            </p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-slate-400 self-start sm:self-center shrink-0 whitespace-nowrap">
          {dict.inlineCalc.quotaLabel}: {maxDays > 0 ? dict.inlineCalc.quotaDays.replace('{days}', String(maxDays)) : dict.inlineCalc.quotaBanned}
        </span>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <label className="block font-bold text-slate-700">
            {dict.inlineCalc.stayLabel}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={180}
              value={stayDays}
              onChange={(e) => setStayDays(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span className="text-slate-500 font-medium shrink-0 whitespace-nowrap">{dict.inlineCalc.daysUnit}</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <label className="block font-bold text-slate-700">
            {dict.inlineCalc.doseLabel}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={20}
              value={dailyDose}
              onChange={(e) => setDailyDose(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full h-10 px-3 rounded-lg border border-slate-300 bg-white font-bold text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <span className="text-slate-500 font-medium shrink-0 whitespace-nowrap">{dict.inlineCalc.unitsPerDay}</span>
          </div>
        </div>
      </div>

      {/* Dynamic Results Card */}
      <div className="pt-1">
        {isBanned && (
          <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-2">
            <div className="font-bold text-sm flex items-center gap-1.5 text-red-700">
              <AlertOctagon className="h-4 w-4 shrink-0" />
              <span>{dict.inlineCalc.bannedTitle}</span>
            </div>
            <p className="leading-relaxed">
              {dict.inlineCalc.bannedDesc
                .replace('{tablets}', String(totalTabletsNeeded))
                .replace('{brand}', primaryBrand)
                .replace('{generic}', med.genericName)}
            </p>
          </div>
        )}

        {isCompliant && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-2">
            <div className="font-bold text-sm flex items-center gap-1.5 text-emerald-800">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>{dict.inlineCalc.compliantTitle}</span>
            </div>
            <p className="leading-relaxed text-emerald-900">
              {dict.inlineCalc.compliantDesc
                .replace('{days}', String(stayDays))
                .replace('{tablets}', String(totalTabletsNeeded))
                .replace('{max}', String(maxDays))
                .replace('{brand}', primaryBrand)}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-emerald-200">
              <Link
                href={getLocalizedPath('/customs-card', locale)}
                className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs flex items-center gap-1 transition shrink-0 whitespace-nowrap"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>{dict.inlineCalc.genCustomsCard}</span>
              </Link>
              <button
                onClick={handleAddToBag}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-900 hover:bg-emerald-100 font-semibold text-xs transition shrink-0 whitespace-nowrap"
              >
                {added ? dict.inlineCalc.addedToBag : dict.inlineCalc.saveToBag}
              </button>
            </div>
          </div>
        )}

        {isOver && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-3">
            <div className="font-bold text-sm flex items-center gap-1.5 text-amber-800">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                {dict.inlineCalc.exceededTitle
                  .replace('{diff}', String(stayDays - maxDays))
                  .replace('{excess}', String(excessTablets))}
              </span>
            </div>
            <p className="leading-relaxed text-amber-900">
              {dict.inlineCalc.exceededDesc
                .replace('{max}', String(maxDays))
                .replace('{allowed}', String(allowedTablets))
                .replace('{brand}', primaryBrand)
                .replace('{total}', String(totalTabletsNeeded))}
            </p>

            {/* Split Refill Strategy */}
            <div className="p-3 rounded-lg bg-white border border-amber-200 space-y-1.5">
              <span className="font-bold text-slate-900 flex items-center gap-1">
                <Hospital className="h-3.5 w-3.5 text-blue-600 shrink-0" />
                {dict.inlineCalc.splitTitle}
              </span>
              <ul className="list-disc list-inside space-y-1 text-slate-700 text-[11px]">
                <li>
                  {dict.inlineCalc.splitLuggage
                    .replace('{allowed}', String(allowedTablets))
                    .replace('{max}', String(maxDays))}
                </li>
                <li>
                  {dict.inlineCalc.splitRefill
                    .replace('{tier}', med.clearanceProfiles?.localRefill?.hospitalTier || 'Tier-3 Public Hospital')
                    .replace('{excess}', String(excessTablets))}
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <Link
                href={getLocalizedPath('/customs-card', locale)}
                className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition shrink-0 whitespace-nowrap"
              >
                <span>{dict.inlineCalc.genCardDays.replace('{days}', String(maxDays))}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
              <button
                onClick={handleAddToBag}
                className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 hover:bg-slate-100 font-semibold text-xs transition shrink-0 whitespace-nowrap"
              >
                {added ? dict.inlineCalc.addedToBag : dict.inlineCalc.saveToBag}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
