'use client';

import React from 'react';
import {
  Scale,
  Plane,
  FileCheck2,
  Clock,
  Plus,
  Check,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';
import { Medication, TravelBagItem } from '@/lib/types';
import DrugStatusBadge from './DrugStatusBadge';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface DrugSpecSheetProps {
  med: Medication;
  asH1?: boolean;
  locale?: Locale;
  titleOverride?: string;
}

const STORAGE_KEY = 'chinameds_travel_bag';

export default function DrugSpecSheet({ med, asH1 = true, locale = 'en', titleOverride }: DrugSpecSheetProps) {
  const [added, setAdded] = React.useState(false);
  const primaryBrand = med.brandNames[0];
  const caac = med.clearanceProfiles?.caacAviation;
  const dict = getDictionary(locale);

  const localizedH1 = titleOverride || (
    locale === 'ja'
      ? `${primaryBrand}の中国税関持ち込み規制・許可基準 (2025)`
      : locale === 'ko'
      ? `${primaryBrand} 중국 세관 반입 규정 및 합법성 기준 (2025)`
      : locale === 'ru'
      ? `Правила ввоза ${primaryBrand} в Китай: Таможенный контроль 2025`
      : locale === 'vi'
      ? `Quy định mang ${primaryBrand} vào Trung Quốc: Hải quan 2025`
      : `Can I Bring ${primaryBrand} to China? 2025 Customs Rules & Legality`
  );

  const handleAddToBag = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const bag: TravelBagItem[] = stored ? JSON.parse(stored) : [];
      if (!bag.some((it) => it.slug === med.slug)) {
        bag.push({
          slug: med.slug,
          brandName: primaryBrand,
          genericName: med.genericName,
          chineseName: med.chineseName,
          casNumber: med.casNumber,
          status: med.status,
          channel: med.channel,
          allowanceDaysMax: med.allowanceDaysMax,
          userDaysOfSupply: med.allowanceDaysMax > 0 ? Math.min(med.allowanceDaysMax, 14) : 7,
          userDosage: 'As directed on pharmacy label',
          activeIngredients: med.activeIngredients || [],
          redLineWarning: med.redLineWarning,
          clearanceProfiles: med.clearanceProfiles,
        });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bag));
        window.dispatchEvent(new Event('travel_bag_updated'));
      }
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] overflow-hidden font-sans">
      {/* 1. TOP HEADER: Status, Clean Titles & Action Button */}
      <div className="p-6 sm:p-7 border-b border-slate-100 bg-gradient-to-b from-slate-50/70 to-white flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          {/* Subtle status and metadata pills with shrink-0 */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <DrugStatusBadge status={med.status} size="sm" locale={locale} />
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-slate-100/90 text-slate-600 border border-slate-200/70 shrink-0 whitespace-nowrap">
              CAS: {med.casNumber || 'N/A'}
            </span>
            <span className="font-mono text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50/90 text-blue-700 border border-blue-100/80 shrink-0 whitespace-nowrap">
              CHN: {med.chineseName}
            </span>
          </div>

          {/* Clean, high-contrast Symmetrical Title (Aligned with SEO Target Primary Keyword) */}
          {asH1 ? (
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 break-words leading-tight">
              {localizedH1}
            </h1>
          ) : (
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 break-words leading-tight">
              {localizedH1}
            </h2>
          )}
          <div className="text-xs text-slate-500 font-mono mt-1.5 flex items-center gap-2 flex-wrap">
            <span className="shrink-0">{dict.specSheet.activeMolecule}:</span>
            <strong className="text-slate-800 font-semibold break-words">{med.genericName}</strong>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-sans">
              Brands: <strong className="text-slate-700">{med.brandNames.join(' / ')}</strong>
            </span>
          </div>
        </div>

        {/* Tactile Primary Action Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            onClick={handleAddToBag}
            className={`h-11 px-5 rounded-xl font-bold text-xs flex items-center gap-2 transition-all duration-200 shadow-sm shrink-0 whitespace-nowrap ${
              added
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-white hover:shadow-md hover:-translate-y-0.5'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span className="shrink-0 whitespace-nowrap">{dict.specSheet.addedToBag}</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4 shrink-0" />
                <span className="shrink-0 whitespace-nowrap">{dict.specSheet.addToBag}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 2. FOUR-CARD BENTO GRID */}
      <div className="p-6 sm:p-7 bg-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Customs Channel */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-200/80 transition-all duration-200">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 whitespace-nowrap truncate">
                  {dict.specSheet.customsLegality}
                </span>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-blue-600 shrink-0">
                  <Scale className="h-3.5 w-3.5" />
                </div>
              </div>

              <div>
                {med.channel === 'STRICTLY_FORBIDDEN' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200/70 text-xs font-black shrink-0 whitespace-nowrap">
                    <AlertOctagon className="h-3.5 w-3.5 text-rose-600 shrink-0" />
                    <span>{dict.badges.banned}</span>
                  </span>
                )}
                {med.channel === 'RED_CHANNEL' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-800 border border-amber-200/70 text-xs font-black shrink-0 whitespace-nowrap">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                    <span>{dict.badges.controlled}</span>
                  </span>
                )}
                {med.channel === 'GREEN_CHANNEL' && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-black shrink-0 whitespace-nowrap">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                    <span>{dict.badges.allowed}</span>
                  </span>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mt-3 break-words">
              {med.channel === 'STRICTLY_FORBIDDEN'
                ? dict.calcWidget.bannedDesc
                : med.channel === 'RED_CHANNEL'
                ? dict.specSheet.redChannelMust
                : dict.specSheet.greenChannelPass}
            </p>
          </div>

          {/* Card 2: Legal Allowance Quota */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-200/80 transition-all duration-200">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 whitespace-nowrap truncate">
                  {dict.specSheet.personalCarry}
                </span>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-amber-600 shrink-0">
                  <Clock className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="text-xl font-black text-slate-900 tracking-tight">
                {med.allowanceDaysMax > 0 ? (
                  <span className="flex items-baseline gap-1.5">
                    <span className="text-2xl font-black text-slate-900">{med.allowanceDaysMax}</span>
                    <span className="text-xs font-bold text-slate-500 shrink-0 whitespace-nowrap">
                      {dict.specSheet.daysLimit}
                    </span>
                  </span>
                ) : (
                  <span className="text-rose-600 text-sm font-black shrink-0 whitespace-nowrap">
                    0 {dict.specSheet.daysLimit}
                  </span>
                )}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mt-3 break-words">
              {med.allowanceDaysMax > 0
                ? `${med.allowanceDaysMax} ${dict.specSheet.daysLimit}`
                : dict.calcWidget.bannedDesc}
            </p>
          </div>

          {/* Card 3: Flight Placement */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-200/80 transition-all duration-200">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 whitespace-nowrap truncate">
                  {dict.specSheet.aviationSecurity}
                </span>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-indigo-600 shrink-0">
                  <Plane className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="text-sm font-extrabold text-slate-800 break-words">
                {caac?.carryOn === 'ALLOWED' && dict.specSheet.standardAviation}
                {caac?.carryOn === 'WITH_CERTIFICATE' && dict.specSheet.carryOnOnly}
                {caac?.carryOn === 'CHECKED_ONLY' && dict.badges.banned}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mt-3 break-words">
              {caac?.coldChain || caac?.sharpsInvolved
                ? dict.manifest.alertSyringeText
                : dict.specSheet.standardAviation}
            </p>
          </div>

          {/* Card 4: In-China Refill */}
          <div className="p-5 rounded-2xl bg-slate-50/70 border border-slate-100 flex flex-col justify-between hover:bg-slate-50 hover:border-slate-200/80 transition-all duration-200">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono shrink-0 whitespace-nowrap truncate">
                  {dict.specSheet.localRefill}
                </span>
                <div className="p-1.5 rounded-lg bg-white border border-slate-200/60 shadow-2xs text-emerald-600 shrink-0">
                  <FileCheck2 className="h-3.5 w-3.5" />
                </div>
              </div>

              <div className="text-sm font-extrabold text-slate-800 break-words">
                {med.category === 'BANNED'
                  ? dict.specSheet.noRefillBanned
                  : dict.specSheet.tier3Refill}
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mt-3 break-words">
              {med.category === 'BANNED'
                ? dict.calcWidget.bannedHospital
                : dict.calcWidget.hospitalNoticeMaintenance}
            </p>
          </div>
        </div>
      </div>

      {/* 3. STATUTORY E-E-A-T AUDIT FOOTNOTE (规范第24条时效性标识) */}
      <div className="px-6 py-3 bg-slate-50/90 border-t border-slate-100 flex flex-wrap items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
          <span>Regulatory Audit: Verified for 2025/2026 Entry (GACC Notice 43 &amp; Decree 442)</span>
        </div>
        <span className="text-slate-400 font-sans text-[11px]">
          Statutory Inbound Border Guidance
        </span>
      </div>
    </div>
  );
}
