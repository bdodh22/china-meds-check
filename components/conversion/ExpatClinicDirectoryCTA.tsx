import React from 'react';
import Link from 'next/link';
import { Hospital, MapPin, Phone, FileCheck, ArrowRight } from 'lucide-react';

import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface ExpatClinicDirectoryCTAProps {
  locale?: Locale;
}

export default function ExpatClinicDirectoryCTA({ locale = 'en' }: ExpatClinicDirectoryCTAProps) {
  const dict = getDictionary(locale);

  // All clinic data driven from the locale dictionary — zero hardcoded English
  const CLINICS = [
    {
      name: dict.cta.clinic1Name,
      cities: dict.cta.clinic1Cities,
      specialties: dict.cta.clinic1Specialties,
      phone: dict.cta.clinic1Phone,
      note: dict.cta.clinic1Note,
    },
    {
      name: dict.cta.clinic2Name,
      cities: dict.cta.clinic2Cities,
      specialties: dict.cta.clinic2Specialties,
      phone: dict.cta.clinic2Phone,
      note: dict.cta.clinic2Note,
    },
    {
      name: dict.cta.clinic3Name,
      cities: dict.cta.clinic3Cities,
      specialties: dict.cta.clinic3Specialties,
      phone: dict.cta.clinic3Phone,
      note: dict.cta.clinic3Note,
    },
    {
      name: dict.cta.clinic4Name,
      cities: dict.cta.clinic4Cities,
      specialties: dict.cta.clinic4Specialties,
      phone: dict.cta.clinic4Phone,
      note: dict.cta.clinic4Note,
    },
  ];

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
