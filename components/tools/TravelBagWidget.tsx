'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Luggage,
  Plus,
  Trash2,
  AlertTriangle,
  ShieldCheck,
  AlertOctagon,
  FileText,
  Printer,
  ChevronRight,
  Plane,
  Scale,
  Stethoscope,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { TravelBagItem, Medication } from '@/lib/types';
import { getAllMedications } from '@/lib/medications';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

const STORAGE_KEY = 'chinameds_travel_bag';

interface TravelBagWidgetProps {
  locale?: Locale;
}

export default function TravelBagWidget({ locale = 'en' }: TravelBagWidgetProps) {
  const dict = getDictionary(locale);
  const [items, setItems] = useState<TravelBagItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [availableMeds, setAvailableMeds] = useState<Medication[]>([]);
  const [selectedMedSlug, setSelectedMedSlug] = useState('');

  useEffect(() => {
    // Load all medications for dropdown
    const all = getAllMedications();
    setAvailableMeds(all);

    // Load bag from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setItems(JSON.parse(stored));
      } else {
        // Initialize with realistic family/travel default preset
        const defaultPreset: TravelBagItem[] = [
          {
            slug: 'paracetamol-tylenol-in-china',
            brandName: 'Tylenol (Paracetamol)',
            genericName: 'Acetaminophen',
            chineseName: '泰诺林 (对乙酰氨基酚)',
            casNumber: '103-90-2',
            status: 'GREEN',
            channel: 'GREEN_CHANNEL',
            allowanceDaysMax: 90,
            userDaysOfSupply: 14,
            userDosage: '500mg as needed for fever/pain',
            activeIngredients: ['acetaminophen', 'antipyretic']
          },
          {
            slug: 'ritalin-concerta-in-china',
            brandName: 'Concerta',
            genericName: 'Methylphenidate Hydrochloride',
            chineseName: '专注达 (盐酸哌甲酯)',
            casNumber: '113-45-1',
            status: 'YELLOW',
            channel: 'RED_CHANNEL',
            allowanceDaysMax: 15,
            userDaysOfSupply: 14,
            userDosage: '36mg once daily in morning',
            activeIngredients: ['methylphenidate']
          }
        ];
        setItems(defaultPreset);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPreset));
      }
    } catch (e) {
      console.error('Failed to load travel bag', e);
    }
    setIsLoaded(true);

    // Listen to global updates
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setItems(JSON.parse(stored));
      } catch (err) {
        console.error(err);
      }
    };
    window.addEventListener('travel_bag_updated', handleStorageChange);
    return () => window.removeEventListener('travel_bag_updated', handleStorageChange);
  }, []);

  const saveItems = (newItems: TravelBagItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
      window.dispatchEvent(new Event('travel_bag_updated'));
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = (slug: string) => {
    if (!slug) return;
    const med = availableMeds.find((m) => m.slug === slug);
    if (!med) return;

    if (items.some((it) => it.slug === slug)) {
      alert(`"${med.brandNames[0]}" is already in your Travel Bag.`);
      return;
    }

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
      userDosage: 'As directed by physician',
      activeIngredients: med.activeIngredients || [],
      redLineWarning: med.redLineWarning,
      clearanceProfiles: med.clearanceProfiles
    };

    saveItems([...items, newItem]);
    setSelectedMedSlug('');
  };

  const handleRemoveItem = (slug: string) => {
    saveItems(items.filter((it) => it.slug !== slug));
  };

  const handleUpdateSupply = (slug: string, days: number) => {
    saveItems(
      items.map((it) => (it.slug === slug ? { ...it, userDaysOfSupply: Math.max(1, days) } : it))
    );
  };

  const handleLoadPreset = (preset: 'family' | 'adhd' | 'diabetes') => {
    if (preset === 'family') {
      const p1 = availableMeds.find((m) => m.slug === 'paracetamol-tylenol-in-china');
      const p2 = availableMeds.find((m) => m.slug === 'ibuprofen-in-china');
      const p3 = availableMeds.find((m) => m.slug === 'pseudoephedrine-sudafed-in-china');
      const p4 = availableMeds.find((m) => m.slug === 'melatonin-in-china');

      const bag: TravelBagItem[] = [
        {
          slug: 'paracetamol-tylenol-in-china',
          brandName: 'Tylenol',
          genericName: 'Acetaminophen',
          chineseName: '泰诺林 (对乙酰氨基酚)',
          status: 'GREEN',
          channel: 'GREEN_CHANNEL',
          allowanceDaysMax: 90,
          userDaysOfSupply: 14,
          userDosage: '500mg as needed',
          activeIngredients: ['acetaminophen', 'antipyretic']
        },
        {
          slug: 'ibuprofen-in-china',
          brandName: 'Advil (Ibuprofen)',
          genericName: 'Ibuprofen',
          chineseName: '芬必得 (布洛芬)',
          status: 'GREEN',
          channel: 'GREEN_CHANNEL',
          allowanceDaysMax: 90,
          userDaysOfSupply: 14,
          userDosage: '200mg as needed',
          activeIngredients: ['ibuprofen', 'nsaid']
        },
        {
          slug: 'pseudoephedrine-sudafed-in-china',
          brandName: 'Sudafed Sinus',
          genericName: 'Pseudoephedrine HCl',
          chineseName: '新康泰克 (盐酸伪麻黄碱)',
          status: 'YELLOW',
          channel: 'RED_CHANNEL',
          allowanceDaysMax: 10,
          userDaysOfSupply: 7,
          userDosage: '30mg every 6 hours',
          activeIngredients: ['pseudoephedrine', 'precursor_chemical']
        }
      ];
      saveItems(bag);
    } else if (preset === 'adhd') {
      const bag: TravelBagItem[] = [
        {
          slug: 'ritalin-concerta-in-china',
          brandName: 'Concerta 36mg',
          genericName: 'Methylphenidate HCl',
          chineseName: '专注达 (哌甲酯)',
          status: 'YELLOW',
          channel: 'RED_CHANNEL',
          allowanceDaysMax: 15,
          userDaysOfSupply: 14,
          userDosage: '36mg every morning',
          activeIngredients: ['methylphenidate']
        },
        {
          slug: 'xanax-in-china',
          brandName: 'Xanax 0.5mg',
          genericName: 'Alprazolam',
          chineseName: '阿普唑仑',
          status: 'YELLOW',
          channel: 'RED_CHANNEL',
          allowanceDaysMax: 30,
          userDaysOfSupply: 14,
          userDosage: '0.5mg PRN for panic',
          activeIngredients: ['alprazolam', 'benzodiazepine']
        }
      ];
      saveItems(bag);
    } else {
      const bag: TravelBagItem[] = [
        {
          slug: 'ozempic-wegovy-in-china',
          brandName: 'Ozempic 1mg/dose',
          genericName: 'Semaglutide Injection',
          chineseName: '诺和泰 (司美格鲁肽)',
          status: 'GREEN',
          channel: 'GREEN_CHANNEL',
          allowanceDaysMax: 90,
          userDaysOfSupply: 30,
          userDosage: '1mg weekly subcutaneous injection',
          activeIngredients: ['semaglutide', 'glp1'],
          clearanceProfiles: availableMeds.find((m) => m.slug === 'ozempic-wegovy-in-china')?.clearanceProfiles
        },
        {
          slug: 'metformin-in-china',
          brandName: 'Glucophage (Metformin)',
          genericName: 'Metformin Hydrochloride',
          chineseName: '格华止 (二甲双胍)',
          status: 'GREEN',
          channel: 'GREEN_CHANNEL',
          allowanceDaysMax: 90,
          userDaysOfSupply: 30,
          userDosage: '500mg twice daily with meals',
          activeIngredients: ['metformin']
        }
      ];
      saveItems(bag);
    }
  };

  // Chemical Stacking & Aviation Analysis
  const hasRedDrug = items.some((it) => it.status === 'RED');
  const hasYellowDrug = items.some((it) => it.status === 'YELLOW');
  const hasOverSupply = items.some((it) => it.allowanceDaysMax > 0 && it.userDaysOfSupply > it.allowanceDaysMax);

  // Overall Baggage Verdict
  let overallRisk: 'RED' | 'YELLOW' | 'GREEN' = 'GREEN';
  let recommendedChannel: 'STRICTLY_FORBIDDEN' | 'RED_CHANNEL' | 'GREEN_CHANNEL' = 'GREEN_CHANNEL';

  if (hasRedDrug) {
    overallRisk = 'RED';
    recommendedChannel = 'STRICTLY_FORBIDDEN';
  } else if (hasYellowDrug || hasOverSupply) {
    overallRisk = 'YELLOW';
    recommendedChannel = 'RED_CHANNEL';
  }

  // Active ingredients aggregation
  const allIngredients: string[] = [];
  items.forEach((it) => {
    if (it.activeIngredients) allIngredients.push(...it.activeIngredients);
  });

  const pseudoephedrineItems = items.filter((it) =>
    it.activeIngredients?.includes('pseudoephedrine')
  );
  const acetaminophenCount = allIngredients.filter((i) => i === 'acetaminophen').length;
  const hasSharpsOrColdChain = items.some(
    (it) => it.clearanceProfiles?.caacAviation?.coldChain || it.clearanceProfiles?.caacAviation?.sharpsInvolved
  );

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header with Baggage Verdict */}
      <div
        className={`p-6 md:p-8 border-b ${
          overallRisk === 'RED'
            ? 'bg-red-50 border-red-200'
            : overallRisk === 'YELLOW'
            ? 'bg-amber-50 border-amber-200'
            : 'bg-emerald-50 border-emerald-200'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-white/80 backdrop-blur shadow-sm shrink-0 whitespace-nowrap">
              <Luggage className="h-4 w-4 text-blue-600" />
              <span>{dict.bagWidget.radarBadge}</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
              {dict.bagWidget.radarTitle}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              {dict.bagWidget.radarSubtitle}
            </p>
          </div>

          {/* Verdict Badge */}
          <div className="flex flex-col items-start lg:items-end gap-2">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              {dict.bagWidget.riskVerdictHeader}
            </div>
            {overallRisk === 'RED' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 text-white font-bold text-sm shadow-md shrink-0 whitespace-nowrap">
                <AlertOctagon className="h-5 w-5" />
                <span>{dict.bagWidget.riskRed}</span>
              </div>
            )}
            {overallRisk === 'YELLOW' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-md shrink-0 whitespace-nowrap">
                <AlertTriangle className="h-5 w-5 text-slate-950" />
                <span>{dict.bagWidget.riskYellow}</span>
              </div>
            )}
            {overallRisk === 'GREEN' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md shrink-0 whitespace-nowrap">
                <CheckCircle2 className="h-5 w-5" />
                <span>{dict.bagWidget.riskGreen}</span>
              </div>
            )}
            <span className="text-xs text-slate-500">
              {items.length} {dict.bagWidget.itemsEvaluated}
            </span>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-2 flex-wrap text-xs">
          <span className="font-semibold text-slate-600 flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            {dict.bagWidget.quickPresets}
          </span>
          <button
            onClick={() => handleLoadPreset('family')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-colors"
          >
            {dict.bagWidget.presetFamily}
          </button>
          <button
            onClick={() => handleLoadPreset('adhd')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-colors"
          >
            {dict.bagWidget.presetAdhd}
          </button>
          <button
            onClick={() => handleLoadPreset('diabetes')}
            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 font-medium transition-colors"
          >
            {dict.bagWidget.presetDiabetes}
          </button>
        </div>
      </div>

      {/* Aggregate Chemical & Security Alerts */}
      <div className="p-6 md:p-8 space-y-4">
        {/* Pseudoephedrine Precursor Warning */}
        {pseudoephedrineItems.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 text-xs flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-950 text-sm block">
                {dict.bagWidget.precursorAlertTitle}
              </span>
              <p className="text-amber-900 leading-relaxed">
                {dict.bagWidget.precursorAlertDesc}
              </p>
            </div>
          </div>
        )}

        {/* Acetaminophen Stacking Warning */}
        {acetaminophenCount > 1 && (
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-xs flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-blue-950 text-sm block">
                {dict.bagWidget.acetaminophenTitle}
              </span>
              <p className="text-blue-900 leading-relaxed">
                {dict.bagWidget.acetaminophenDesc}
              </p>
            </div>
          </div>
        )}

        {/* Aviation Security Notice */}
        {hasSharpsOrColdChain && (
          <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-200 text-xs flex items-start gap-3">
            <Plane className="h-5 w-5 text-indigo-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-indigo-950 text-sm block">
                {dict.bagWidget.aviationNoticeTitle}
              </span>
              <p className="text-indigo-900 leading-relaxed">
                {dict.bagWidget.aviationNoticeDesc}
              </p>
            </div>
          </div>
        )}

        {/* Add Medication Bar */}
        <div className="pt-2 pb-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <select
              value={selectedMedSlug}
              onChange={(e) => setSelectedMedSlug(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-slate-300 bg-slate-50 text-sm text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">{dict.bagWidget.selectMedicinePrompt}</option>
              {availableMeds.map((med) => (
                <option key={med.slug} value={med.slug}>
                  {med.brandNames[0]} ({med.genericName}) - [{med.chineseName}]
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => handleAddItem(selectedMedSlug)}
            disabled={!selectedMedSlug}
            className="w-full sm:w-auto h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors shrink-0 whitespace-nowrap"
          >
            <Plus className="h-4 w-4" />
            <span>{dict.bagWidget.addButton}</span>
          </button>
        </div>

        {/* Medication Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100/75 border-b border-slate-200 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">{dict.bagWidget.colMedAndChemical}</th>
                  <th className="py-3.5 px-4">{dict.bagWidget.colStatus}</th>
                  <th className="py-3.5 px-4">{dict.bagWidget.colPlannedSupply}</th>
                  <th className="py-3.5 px-4">{dict.bagWidget.colAllowanceLimit}</th>
                  <th className="py-3.5 px-4 text-right">{dict.bagWidget.colActions}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-12 px-4 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <div className="h-12 w-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                          <Luggage className="h-6 w-6" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          Your Travel Bag is Currently Empty
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Add medications above, or load a verified 1-click traveler preset below to test pseudoephedrine stacking and customs allowance checks:
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => handleLoadPreset('family')}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition"
                          >
                            💼 Business Travel Pack
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLoadPreset('adhd')}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition"
                          >
                            🧠 ADHD Treatment Pack
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLoadPreset('diabetes')}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs transition"
                          >
                            🩺 Chronic Rx Pack
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const isExceeded = item.allowanceDaysMax > 0 && item.userDaysOfSupply > item.allowanceDaysMax;
                    return (
                      <tr key={item.slug} className="hover:bg-slate-50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-900">{item.brandName}</div>
                          <div className="text-xs text-slate-500 font-mono">
                            {item.genericName} • {item.chineseName}
                          </div>
                          {item.casNumber && (
                            <span className="inline-block mt-0.5 text-[10px] text-slate-400 font-mono">
                              CAS: {item.casNumber}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          {item.status === 'RED' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 shrink-0 whitespace-nowrap">
                              <AlertOctagon className="h-3.5 w-3.5" />
                              {dict.bagWidget.banned0Days}
                            </span>
                          )}
                          {item.status === 'YELLOW' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 shrink-0 whitespace-nowrap">
                              <AlertTriangle className="h-3.5 w-3.5" />
                              {dict.bagWidget.controlledRed}
                            </span>
                          )}
                          {item.status === 'GREEN' && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 shrink-0 whitespace-nowrap">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {dict.bagWidget.allowedGreen}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              min={1}
                              max={180}
                              value={item.userDaysOfSupply}
                              onChange={(e) => handleUpdateSupply(item.slug, parseInt(e.target.value) || 1)}
                              className="w-16 h-8 px-2 text-center rounded-lg border border-slate-300 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                            <span className="text-xs text-slate-500">{dict.calcWidget.daysUnit}</span>
                          </div>
                          {isExceeded && (
                            <span className="text-[11px] text-red-600 font-semibold block mt-1">
                              {dict.bagWidget.exceedsLimit}
                            </span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-xs font-medium text-slate-600">
                          {item.allowanceDaysMax > 0 ? dict.bagWidget.maxDays.replace('{max}', String(item.allowanceDaysMax)) : dict.bagWidget.zeroDaysBanned}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleRemoveItem(item.slug)}
                            className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            title="Remove from bag"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <Scale className="h-4 w-4 text-slate-400 shrink-0" />
            <span>{dict.bagWidget.bagLegalNotice}</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              href={getLocalizedPath('/customs-card', locale)}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold shadow-sm transition-colors shrink-0 whitespace-nowrap"
            >
              <FileText className="h-4 w-4 text-blue-400" />
              <span>{dict.bagWidget.generateCustomsCard}</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
