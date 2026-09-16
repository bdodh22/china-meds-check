import React from 'react';
import { Shield, Plane, ArrowUpRight, Check } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface TravelInsuranceCTAProps {
  medicationName?: string;
  source?: string;
  locale?: Locale;
}

export default function TravelInsuranceCTA({
  medicationName,
  source = 'general',
  locale = 'en',
}: TravelInsuranceCTAProps) {
  const dict = getDictionary(locale);

  return (
    <div className="w-full bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold border border-emerald-500/30 shrink-0 whitespace-nowrap">
            <Shield className="h-3.5 w-3.5" />
            <span>{dict.cta.insuranceBadge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
            {medicationName ? `${medicationName} • ${dict.cta.insuranceTitle}` : dict.cta.insuranceTitle}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {dict.cta.insuranceDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{dict.cta.insuranceFeature1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{dict.cta.insuranceFeature2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{dict.cta.insuranceFeature3}</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>{dict.cta.insuranceFeature4}</span>
            </div>
          </div>
        </div>

        {/* CTA Card Button */}
        <div className="shrink-0 flex flex-col sm:items-end gap-3">
          <a
            href="https://safetywing.com/nomad-insurance?reference=chinamedscheck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm transition-all shadow-lg hover:shadow-emerald-500/25 cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Plane className="h-4 w-4" />
            <span>{dict.cta.insuranceButton}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] text-slate-400 text-right">
            {dict.cta.insuranceBadgeUnderButton}
          </span>
        </div>
      </div>
    </div>
  );
}
