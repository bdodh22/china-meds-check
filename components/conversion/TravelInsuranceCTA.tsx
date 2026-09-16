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
    <div className="w-full bg-gradient-to-br from-white via-slate-50/60 to-emerald-50/40 text-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-200/70">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200/80 shrink-0 whitespace-nowrap">
            <Shield className="h-3.5 w-3.5 text-emerald-600" />
            <span>{dict.cta.insuranceBadge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            {medicationName ? `${medicationName} • ${dict.cta.insuranceTitle}` : dict.cta.insuranceTitle}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed">
            {dict.cta.insuranceDesc}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>{dict.cta.insuranceFeature1}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>{dict.cta.insuranceFeature2}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>{dict.cta.insuranceFeature3}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-4 w-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Check className="h-2.5 w-2.5 stroke-[3]" />
              </span>
              <span>{dict.cta.insuranceFeature4}</span>
            </div>
          </div>
        </div>

        {/* CTA Card Button */}
        <div className="shrink-0 flex flex-col sm:items-end gap-2.5">
          <a
            href="https://safetywing.com/nomad-insurance?reference=chinamedscheck"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold text-sm transition-all shadow-sm hover:shadow-md cursor-pointer shrink-0 whitespace-nowrap"
          >
            <Plane className="h-4 w-4" />
            <span>{dict.cta.insuranceButton}</span>
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="text-[11px] text-slate-500 text-right">
            {dict.cta.insuranceBadgeUnderButton}
          </span>
        </div>
      </div>
    </div>
  );
}
