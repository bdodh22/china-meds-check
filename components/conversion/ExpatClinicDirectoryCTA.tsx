import React from 'react';
import Link from 'next/link';
import { Hospital, MapPin, Phone, FileCheck, ArrowRight, ShieldAlert } from 'lucide-react';

import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

const CLINICS = [
  {
    name: 'United Family Healthcare (和睦家医疗)',
    cities: 'Beijing, Shanghai, Guangzhou, Shenzhen, Tianjin',
    specialties: 'English-speaking psychiatrists, pediatrics, full pharmacy, emergency ER',
    phone: '4008-919191',
    note: 'Authorized to prescribe Category 1 & 2 psychotropics with dedicated red prescriptions.',
  },
  {
    name: 'Jiahui Health (嘉会医疗)',
    cities: 'Shanghai, Beijing, Suzhou',
    specialties: 'Affiliated with Massachusetts General Hospital; multidisciplinary psychiatric outpatient',
    phone: '400-868-3000',
    note: 'Full in-house pharmacy stocking Concerta, Zolpidem, and metabolic chronic drugs.',
  },
  {
    name: 'Parkway Health (百汇医疗)',
    cities: 'Shanghai, Chengdu, Suzhou',
    specialties: 'Singapore-managed healthcare group; expat internal medicine and neurology',
    phone: '400-819-6622',
    note: 'Direct billing with international expat medical insurances.',
  },
  {
    name: 'Grade 3A Public Hospitals (三甲医院特需/国际部)',
    cities: 'All Chinese Cities (Peking Union, Huashan, Ruijin, Zhongshan, etc.)',
    specialties: 'Top-tier academic medical centers with international patient wings',
    phone: 'Local hospital hotline or 114',
    note: 'Cost-effective consultation; requires on-site registration with passport.',
  },
];

interface ExpatClinicDirectoryCTAProps {
  locale?: Locale;
}

export default function ExpatClinicDirectoryCTA({ locale = 'en' }: ExpatClinicDirectoryCTAProps) {
  const dict = getDictionary(locale);

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-2 shrink-0 whitespace-nowrap">
        <Hospital className="h-4 w-4" />
        <span>{dict.cta.clinicBadge}</span>
      </div>

      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
        {dict.cta.clinicTitle}
      </h3>

      <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
        {dict.cta.clinicDesc}
      </p>

      {/* Checklist for Consultation */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
        <div className="font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wide">
          <FileCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          {dict.cta.clinicRequiredDocs}
        </div>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 list-disc list-inside">
          <li>{dict.cta.docPassport}</li>
          <li>{dict.cta.docSummary}</li>
          <li>{dict.cta.docPrescription}</li>
          <li>{dict.cta.docPackage}</li>
        </ul>
      </div>

      {/* Directory Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLINICS.map((clinic) => (
          <div
            key={clinic.name}
            className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition flex flex-col justify-between"
          >
            <div>
              <h4 className="font-bold text-sm text-slate-900">{clinic.name}</h4>
              <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
                <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
                <span>{clinic.cities}</span>
              </div>
              <p className="mt-2 text-xs text-slate-600 leading-normal">
                {clinic.specialties}
              </p>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-500 font-medium">{clinic.note}</span>
              <div className="flex items-center gap-1 text-blue-700 font-mono font-bold shrink-0 whitespace-nowrap">
                <Phone className="h-3 w-3" />
                <span>{clinic.phone}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <span>{dict.cta.clinicScheduleNotice}</span>
        <Link
          href={getLocalizedPath('/guide/bring-medications-to-china#doctor-refills', locale)}
          className="inline-flex items-center gap-1 font-bold text-slate-900 hover:text-blue-700 shrink-0 whitespace-nowrap"
        >
          <span>{dict.cta.clinicGuideLink}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
