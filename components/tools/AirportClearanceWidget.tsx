'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Luggage,
  Sparkles,
  Plane,
  Building,
  Info
} from 'lucide-react';
import { PortWalkthrough } from '@/lib/types';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface AirportClearanceWidgetProps {
  ports: PortWalkthrough[];
  locale?: Locale;
}

export default function AirportClearanceWidget({ ports, locale = 'en' }: AirportClearanceWidgetProps) {
  const [activePortId, setActivePortId] = useState<string>(ports[0]?.id || 'pvg-t2');
  const dict = getDictionary(locale);

  const activePort = ports.find((p) => p.id === activePortId) || ports[0];

  return (
    <div className="space-y-8 font-sans">
      {/* Airport Quick Selector Tabs (No Vertical Endless Scroll) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80 no-scrollbar">
        {ports.map((port) => {
          const isActive = port.id === activePortId;
          return (
            <button
              key={port.id}
              type="button"
              onClick={() => setActivePortId(port.id)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-2 shrink-0 whitespace-nowrap ${
                isActive
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Plane className={`h-3.5 w-3.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{port.city} ({port.iataCode})</span>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                isActive ? 'bg-slate-800 text-slate-300' : 'bg-slate-100 text-slate-500'
              }`}>
                {port.terminal.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Airport Clean White Card (No Heavy Black Block) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] overflow-hidden">
        {/* Refined Airport Identity Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50/90 via-white to-white border-b border-slate-100">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-blue-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                <MapPin className="h-3.5 w-3.5" />
                <span>{activePort.city}, China • IATA: {activePort.iataCode}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {activePort.airportName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-mono mt-1">
                {activePort.chineseName} • {activePort.terminal}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-center gap-1.5 font-medium">
                <Clock className="h-3.5 w-3.5 text-blue-600" />
                <span>Desk: <strong>24/7 Red Channel Manned</strong></span>
              </span>
            </div>
          </div>

          {/* Port Tech Highlight */}
          <div className="mt-5 p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-slate-700 flex items-start gap-2.5">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 block font-bold mb-0.5">Automated Inspection Protocol:</strong>
              <p className="text-slate-600 leading-relaxed">{activePort.inspectionCharacteristics}</p>
            </div>
          </div>
        </div>

        {/* 5-Step Arrival & Customs Clearance Timeline */}
        <div className="p-6 sm:p-8 space-y-6">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Luggage className="h-4 w-4 text-blue-600" />
            <span>Passenger Arrival & Border Clearance Path:</span>
          </h3>

          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
            {activePort.walkthroughSteps.map((step) => (
              <div key={step.stepNumber} className="relative space-y-1.5">
                {/* Step Circle Pin */}
                <div className="absolute -left-6 sm:-left-8 top-0.5 h-6 w-6 rounded-full bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center border-2 border-white shadow-xs">
                  {step.stepNumber}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {step.stepTitle}
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {step.locationNote}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {step.instruction}
                </p>

                {/* Customs Tip Box */}
                {step.customsOfficerTip && (
                  <div className="p-2.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 leading-normal flex items-start gap-2 mt-2">
                    <AlertTriangle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <span><strong>Customs Note:</strong> {step.customsOfficerTip}</span>
                  </div>
                )}

                {/* Direct Commercial Conversion Hook at Red Channel Steps */}
                {step.stepNumber === 4 && (
                  <div className="mt-3 p-3.5 rounded-xl bg-gradient-to-r from-blue-50/80 to-white border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider block">
                        Prepare Before Landing at {activePort.iataCode}
                      </span>
                      <p className="text-xs text-slate-700 font-semibold">
                        Generate official bilingual declaration slip to hand to duty customs officers.
                      </p>
                    </div>

                    <Link
                      href={getLocalizedPath('/customs-card', locale)}
                      className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs hover:shadow-sm transition shrink-0 whitespace-nowrap flex items-center gap-1.5"
                    >
                      <span>Create Declaration Slip</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Excess Medication & Depot Storage Info */}
          <div className="mt-8 p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-1.5">
            <strong className="text-slate-900 block font-bold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Official Protocol for Excess Medication at {activePort.iataCode}:</span>
            </strong>
            <p className="leading-relaxed text-slate-600">{activePort.handlingOfExcessMedication}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
