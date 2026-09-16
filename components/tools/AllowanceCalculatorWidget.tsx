'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Pill,
  Hospital,
  ArrowRight,
  Info,
  Clock,
  Sparkles,
  FileText,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getAllMedications } from '@/lib/medications';
import { Medication } from '@/lib/types';

type DrugClassification = 'BANNED' | 'CONTROLLED_CAT1' | 'CONTROLLED_CAT2' | 'MAINTENANCE_RX' | 'OTC';

interface AllowanceCalculatorWidgetProps {
  locale?: Locale;
}

export default function AllowanceCalculatorWidget({ locale = 'en' }: AllowanceCalculatorWidgetProps) {
  const dict = getDictionary(locale);
  const allMeds = useMemo(() => getAllMedications(), []);

  // Preset popular drugs for 1-click quick selection
  const POPULAR_PRESETS = [
    { slug: 'adderall-in-china', label: 'Adderall', type: 'BANNED' as DrugClassification },
    { slug: 'ritalin-concerta-in-china', label: 'Concerta / Ritalin', type: 'CONTROLLED_CAT1' as DrugClassification },
    { slug: 'xanax-in-china', label: 'Xanax', type: 'CONTROLLED_CAT2' as DrugClassification },
    { slug: 'ozempic-in-china', label: 'Ozempic', type: 'MAINTENANCE_RX' as DrugClassification },
  ];

  // Selected drug identifier: either a medication slug or a generic category string
  const [selectedDrugSlug, setSelectedDrugSlug] = useState<string>('ritalin-concerta-in-china');
  const [stayDuration, setStayDuration] = useState<number>(14);
  const [supplyDays, setSupplyDays] = useState<number>(14);

  // Derived current drug object (if matching a known slug)
  const currentMed: Medication | undefined = useMemo(() => {
    return allMeds.find((m) => m.slug === selectedDrugSlug);
  }, [allMeds, selectedDrugSlug]);

  // Derived classification — strictly driven by structured data fields (status & statutory allowance limits)
  const drugType: DrugClassification = useMemo(() => {
    if (currentMed) {
      if (currentMed.status === 'RED' || currentMed.channel === 'STRICTLY_FORBIDDEN' || currentMed.allowanceDaysMax === 0) {
        return 'BANNED';
      }
      if (currentMed.status === 'YELLOW') {
        // Controlled Category 1 is legally capped at 7-15 days single travel course
        if (currentMed.allowanceDaysMax <= 15 || currentMed.incbCategory?.includes('Category 1')) {
          return 'CONTROLLED_CAT1';
        }
        return 'CONTROLLED_CAT2';
      }
      if (currentMed.status === 'GREEN') {
        return currentMed.allowanceDaysMax >= 90 ? 'MAINTENANCE_RX' : 'OTC';
      }
      return 'OTC';
    }

    if (selectedDrugSlug === 'GENERIC_BANNED') return 'BANNED';
    if (selectedDrugSlug === 'GENERIC_CAT1') return 'CONTROLLED_CAT1';
    if (selectedDrugSlug === 'GENERIC_CAT2') return 'CONTROLLED_CAT2';
    if (selectedDrugSlug === 'GENERIC_OTC') return 'OTC';
    return 'MAINTENANCE_RX';
  }, [currentMed, selectedDrugSlug]);

  // Grouped medications for <select> options
  const groupedMeds = useMemo(() => {
    const banned = allMeds.filter((m) => m.status === 'RED');
    const controlled = allMeds.filter((m) => m.status === 'YELLOW');
    const allowed = allMeds.filter((m) => m.status === 'GREEN');
    return { banned, controlled, allowed };
  }, [allMeds]);

  // Evaluation computation
  const evaluation = useMemo(() => {
    switch (drugType) {
      case 'BANNED':
        return {
          status: 'CRITICAL',
          title: dict.calcWidget.bannedTitle,
          badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
          icon: ShieldAlert,
          iconColor: 'text-rose-600',
          channel: dict.calcWidget.channelForbidden,
          description: dict.calcWidget.bannedDesc,
          recommendedAction: dict.calcWidget.bannedAction,
          hospitalNotice: dict.calcWidget.bannedHospital,
        };

      case 'CONTROLLED_CAT1':
        if (supplyDays <= 7) {
          return {
            status: 'COMPLIANT',
            title: dict.calcWidget.cat1CompliantTitle,
            badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
            channel: dict.calcWidget.channelRedMandatory,
            description: dict.calcWidget.cat1CompliantDesc,
            recommendedAction: dict.calcWidget.cat1CompliantAction,
            hospitalNotice: stayDuration > 7 ? dict.calcWidget.hospitalNoticeRefill : null,
          };
        } else if (supplyDays <= 15) {
          return {
            status: 'WARNING',
            title: dict.calcWidget.cat1WarningTitle,
            badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
            icon: AlertTriangle,
            iconColor: 'text-amber-600',
            channel: dict.calcWidget.channelRedMandatory,
            description: dict.calcWidget.cat1WarningDesc,
            recommendedAction: dict.calcWidget.cat1WarningAction,
            hospitalNotice: stayDuration > 15 ? dict.calcWidget.hospitalNoticeRefill : null,
          };
        } else {
          return {
            status: 'HIGH_RISK',
            title: dict.calcWidget.cat1ExceededTitle,
            badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
            icon: ShieldAlert,
            iconColor: 'text-rose-600',
            channel: dict.calcWidget.channelRedHighRisk,
            description: dict.calcWidget.cat1ExceededDesc,
            recommendedAction: dict.calcWidget.cat1ExceededAction,
            hospitalNotice: dict.calcWidget.hospitalNoticeRefill,
          };
        }

      case 'CONTROLLED_CAT2':
        if (supplyDays <= 15) {
          return {
            status: 'COMPLIANT',
            title: dict.calcWidget.cat2CompliantTitle,
            badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
            channel: dict.calcWidget.channelRedMandatory,
            description: dict.calcWidget.cat2CompliantDesc,
            recommendedAction: dict.calcWidget.cat1CompliantAction,
            hospitalNotice: stayDuration > 15 ? dict.calcWidget.hospitalNoticeRefill : null,
          };
        } else if (supplyDays <= 30) {
          return {
            status: 'WARNING',
            title: dict.calcWidget.cat2WarningTitle,
            badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
            icon: AlertTriangle,
            iconColor: 'text-amber-600',
            channel: dict.calcWidget.channelRedMandatory,
            description: dict.calcWidget.cat2WarningDesc,
            recommendedAction: dict.calcWidget.cat1WarningAction,
            hospitalNotice: stayDuration > 30 ? dict.calcWidget.hospitalNoticeRefill : null,
          };
        } else {
          return {
            status: 'HIGH_RISK',
            title: dict.calcWidget.cat2ExceededTitle,
            badgeColor: 'bg-rose-50 text-rose-900 border-rose-300',
            icon: ShieldAlert,
            iconColor: 'text-rose-600',
            channel: dict.calcWidget.channelRedHighRisk,
            description: dict.calcWidget.cat2ExceededDesc,
            recommendedAction: dict.calcWidget.cat1ExceededAction,
            hospitalNotice: dict.calcWidget.hospitalNoticeRefill,
          };
        }

      case 'MAINTENANCE_RX':
        if (supplyDays <= 90) {
          return {
            status: 'COMPLIANT',
            title: dict.calcWidget.maintenanceCompliantTitle,
            badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
            channel: dict.calcWidget.channelGreenPass,
            description: dict.calcWidget.maintenanceCompliantDesc,
            recommendedAction: dict.calcWidget.cat1CompliantAction,
            hospitalNotice: stayDuration > 90 ? dict.calcWidget.hospitalNoticeMaintenance : null,
          };
        } else {
          return {
            status: 'WARNING',
            title: dict.calcWidget.maintenanceExceededTitle,
            badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
            icon: AlertTriangle,
            iconColor: 'text-amber-600',
            channel: dict.calcWidget.channelTariff,
            description: dict.calcWidget.maintenanceExceededDesc,
            recommendedAction: dict.calcWidget.cat1WarningAction,
            hospitalNotice: dict.calcWidget.hospitalNoticeMaintenance,
          };
        }

      case 'OTC':
      default:
        if (supplyDays <= 180) {
          return {
            status: 'COMPLIANT',
            title: dict.calcWidget.otcCompliantTitle,
            badgeColor: 'bg-emerald-50 text-emerald-900 border-emerald-300',
            icon: CheckCircle2,
            iconColor: 'text-emerald-600',
            channel: dict.calcWidget.channelGreenPass,
            description: dict.calcWidget.otcCompliantDesc,
            recommendedAction: dict.calcWidget.cat1CompliantAction,
            hospitalNotice: null,
          };
        } else {
          return {
            status: 'WARNING',
            title: dict.calcWidget.maintenanceExceededTitle,
            badgeColor: 'bg-amber-50 text-amber-900 border-amber-300',
            icon: AlertTriangle,
            iconColor: 'text-amber-600',
            channel: dict.calcWidget.channelTariff,
            description: dict.calcWidget.maintenanceExceededDesc,
            recommendedAction: dict.calcWidget.cat1WarningAction,
            hospitalNotice: null,
          };
        }
    }
  }, [drugType, stayDuration, supplyDays, dict]);

  const StatusIcon = evaluation.icon;
  const currentMedName = currentMed ? currentMed.brandNames[0] : selectedDrugSlug.replace('GENERIC_', '');

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] overflow-hidden font-sans">
      {/* Refined Header - No Heavy Black Block */}
      <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50/90 via-white to-white border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-semibold text-blue-900 shrink-0 whitespace-nowrap">
            <Clock className="h-3.5 w-3.5 text-blue-600" />
            <span>{dict.calcWidget.evaluatorBadge}</span>
          </div>

          <div className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5 shrink-0 whitespace-nowrap">
            <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
            <span>GACC Decree 442 Aligned</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {dict.calculator.title}
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
          {dict.calculator.subtitle}
        </p>
      </div>

      {/* Two-Step Form: Select Medication + Stay Duration */}
      <div className="p-6 sm:p-8 space-y-7">
        {/* Step 1: Medication Selection with Quick Chips and Clean Select */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="medication-select" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Pill className="h-4 w-4 text-blue-600" />
              <span>Step 1: {dict.calculator.drugTypeLabel}</span>
            </label>

            {currentMed && (
              <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">
                CAS: {currentMed.casNumber} • CHN: {currentMed.chineseName.split(' ')[0]}
              </span>
            )}
          </div>

          {/* Quick-Pick Popular Chips */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Quick Pick:</span>
            {POPULAR_PRESETS.map((p) => {
              const isSelected = selectedDrugSlug === p.slug;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setSelectedDrugSlug(p.slug)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg border transition-all duration-150 shrink-0 whitespace-nowrap ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Standard Select Dropdown for All 31+ Medications */}
          <div className="relative">
            <select
              id="medication-select"
              value={selectedDrugSlug}
              onChange={(e) => setSelectedDrugSlug(e.target.value)}
              className="w-full h-12 pl-4 pr-10 text-sm font-semibold text-slate-900 bg-slate-50 hover:bg-white focus:bg-white border border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 rounded-xl transition-all duration-150 appearance-none cursor-pointer"
            >
              <optgroup label="🚨 Banned Narcotics / Zero Tolerance (严禁携带品类)">
                {groupedMeds.banned.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    [BANNED] {m.brandNames[0]} ({m.genericName}) - {m.chineseName}
                  </option>
                ))}
                <option value="GENERIC_BANNED">[BANNED] Other Prohibited Narcotic / Cannabis Derivative</option>
              </optgroup>

              <optgroup label="⚠️ Controlled Psychotropics Cat 1 & 2 (第一/二类精神药品)">
                {groupedMeds.controlled.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    [CONTROLLED] {m.brandNames[0]} ({m.genericName}) - {m.chineseName}
                  </option>
                ))}
                <option value="GENERIC_CAT1">[CONTROLLED] Other Category 1 Psychotropic (Max 7-15 Days)</option>
                <option value="GENERIC_CAT2">[CONTROLLED] Other Category 2 Psychotropic (Max 15-30 Days)</option>
              </optgroup>

              <optgroup label="🟢 Standard Maintenance & OTC (常规慢性病处方药与OTC)">
                {groupedMeds.allowed.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    [ALLOWED] {m.brandNames[0]} ({m.genericName}) - {m.chineseName}
                  </option>
                ))}
                <option value="GENERIC_RX">[ALLOWED] Other Chronic Prescription Medication (Max 90 Days)</option>
                <option value="GENERIC_OTC">[ALLOWED] Other Over-The-Counter Medication (OTC)</option>
              </optgroup>
            </select>
            <ChevronDown className="h-4 w-4 text-slate-500 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Active Context Card */}
          {currentMed && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium text-slate-800">
                <Info className="h-4 w-4 text-blue-600 shrink-0" />
                <span>
                  <strong>{currentMed.brandNames[0]}</strong>: {currentMed.genericName}
                </span>
              </span>
              <span className="font-mono text-[11px] text-slate-500">
                Chinese Customs Name: <strong className="text-slate-700">{currentMed.chineseName}</strong>
              </span>
            </div>
          )}
        </div>

        {/* Step 2: Duration & Supply Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-slate-100">
          {/* Stay Duration */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="stay-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-slate-600" />
                <span>Stay Duration in China</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="stay-input"
                  type="number"
                  min="1"
                  max="180"
                  value={stayDuration}
                  onChange={(e) => setStayDuration(Math.max(1, Math.min(180, Number(e.target.value))))}
                  className="w-16 h-8 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
                <span className="text-xs text-slate-500 font-medium">days</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {[7, 14, 30, 90].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => {
                    setStayDuration(d);
                    setSupplyDays(d);
                  }}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-md border transition ${
                    stayDuration === d
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>

          {/* Supply Days */}
          <div className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="supply-input" className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Pill className="h-4 w-4 text-slate-600" />
                <span>Carried Supply</span>
              </label>
              <div className="flex items-center gap-1">
                <input
                  id="supply-input"
                  type="number"
                  min="1"
                  max="180"
                  value={supplyDays}
                  onChange={(e) => setSupplyDays(Math.max(1, Math.min(180, Number(e.target.value))))}
                  className="w-16 h-8 text-center font-mono font-bold text-sm bg-white border border-slate-300 rounded-lg text-slate-900"
                />
                <span className="text-xs text-slate-500 font-medium">days</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {[7, 15, 30, 60].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSupplyDays(d)}
                  className={`flex-1 py-1 text-[11px] font-semibold rounded-md border transition ${
                    supplyDays === d
                      ? 'bg-blue-50 text-blue-800 border-blue-300'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {d}d
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Evaluation Output Dashboard */}
        <div className={`p-5 sm:p-7 rounded-2xl border transition-all duration-200 ${
          evaluation.status === 'CRITICAL' || evaluation.status === 'HIGH_RISK'
            ? 'bg-rose-50/40 border-rose-200'
            : evaluation.status === 'WARNING'
            ? 'bg-amber-50/40 border-amber-200'
            : 'bg-emerald-50/40 border-emerald-200'
        }`}>
          {/* Header of Verdict */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl ${
                evaluation.status === 'CRITICAL' || evaluation.status === 'HIGH_RISK'
                  ? 'bg-rose-100 text-rose-700'
                  : evaluation.status === 'WARNING'
                  ? 'bg-amber-100 text-amber-800'
                  : 'bg-emerald-100 text-emerald-700'
              }`}>
                <StatusIcon className="h-6 w-6 shrink-0" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Customs Border Verdict
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  {evaluation.title}
                </h3>
              </div>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs font-bold shrink-0 whitespace-nowrap bg-white border border-slate-200 shadow-xs text-slate-800">
              <span>Channel:</span>
              <strong className={
                evaluation.status === 'CRITICAL' || evaluation.status === 'HIGH_RISK'
                  ? 'text-rose-700'
                  : evaluation.status === 'WARNING'
                  ? 'text-amber-700'
                  : 'text-emerald-700'
              }>
                {evaluation.channel}
              </strong>
            </div>
          </div>

          {/* Description & Action */}
          <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p>{evaluation.description}</p>
            <div className="p-3.5 rounded-xl bg-white/80 border border-slate-200/80 space-y-1">
              <strong className="text-slate-900 block font-bold text-xs uppercase tracking-wider">
                Required Customs Action:
              </strong>
              <p className="text-slate-600">{evaluation.recommendedAction}</p>
            </div>
          </div>

          {/* Direct Commercial Conversion Hook (紧扣订单) */}
          <div className="mt-2 pt-4 border-t border-slate-200/70">
            {evaluation.status === 'CRITICAL' ? (
              // Banned Drug Order Hook: Expat Clinic Refill Directory & Consultation
              <div className="p-4 rounded-xl bg-white border border-rose-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
                    <Hospital className="h-4 w-4 text-rose-600" />
                    <span>Legal Treatment in China Alternative</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Do not risk border detention for {currentMedName}. Tier-3 international hospitals (United Family, Jiahui) in Shanghai & Beijing can legally evaluate and prescribe approved Chinese alternatives.
                  </p>
                </div>

                <Link
                  href={getLocalizedPath('/drugs/adderall-in-china', locale)}
                  className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-[0.98] text-white font-bold text-xs shadow-sm hover:shadow-md transition-all duration-200 shrink-0 whitespace-nowrap flex items-center justify-center gap-1.5"
                >
                  <span>View Clinic Protocol</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ) : evaluation.status === 'HIGH_RISK' || evaluation.status === 'WARNING' ? (
              // Controlled Drug Order Hook: Generate Bilingual Slip + Evacuation Insurance
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={getLocalizedPath('/customs-card', locale)}
                  className="p-3.5 rounded-xl bg-white border border-blue-200 hover:border-blue-400 shadow-xs hover:shadow-sm transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
                      Customs Document
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition">
                      Generate Bilingual Declaration Slip
                    </h4>
                    <p className="text-[11px] text-slate-500">Auto-fill {currentMedName} for Red Channel</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition" />
                </Link>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
                      {dict.cta.insuranceBadge}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900">
                      {dict.cta.insuranceTitle}
                    </h4>
                    <p className="text-[11px] text-slate-500">{dict.cta.insuranceDesc}</p>
                  </div>
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                </div>
              </div>
            ) : (
              // Compliant Green Pass Order Hook
              <div className="p-3.5 rounded-xl bg-white border border-emerald-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900 font-bold">Compliant Allowance:</strong> You may pass through the Green Channel with up to {supplyDays} days of supply in original packaging.
                </div>
                <Link
                  href={getLocalizedPath('/manifest', locale)}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs shrink-0 whitespace-nowrap flex items-center gap-1 transition"
                >
                  <span>Add to Baggage Manifest</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
