'use client';

import React from 'react';
import { AlertOctagon, ShieldAlert, X, ExternalLink } from 'lucide-react';

interface RedLineBlockerProps {
  blockedTerm: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function RedLineBlocker({ blockedTerm, isOpen, onClose }: RedLineBlockerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border-2 border-red-600 overflow-hidden">
        {/* Top Warning Banner */}
        <div className="bg-red-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertOctagon className="h-7 w-7 text-yellow-300 animate-pulse" />
            <div>
              <h3 className="font-extrabold text-lg uppercase tracking-wider">
                Critical Border Law Interception
              </h3>
              <p className="text-xs text-red-100 font-medium">
                中华人民共和国刑法刑事红线拦截警示
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white transition-colors"
            aria-label="Close warning"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Matched term callout */}
          <div className="rounded-xl bg-red-50 border border-red-200 p-4">
            <p className="text-sm font-semibold text-red-900">
              Triggered Term: <span className="underline decoration-red-500 underline-offset-2 uppercase tracking-wide font-black">"{blockedTerm}"</span>
            </p>
            <p className="text-xs text-red-700 mt-1">
              All forms of Cannabis, CBD, THC, Khat, and illicit narcotics are subject to <span className="font-bold">ZERO TOLERANCE</span> under PRC Criminal Statutes.
            </p>
          </div>

          {/* Dual Language Legal Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs leading-relaxed">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">
                🇨🇳 中国海关与公安部法定警示
              </span>
              <p className="text-slate-700">
                依据《中华人民共和国刑法》第三百四十七条、《中华人民共和国禁毒法》及国家药监局公告：大麻及其衍生品（含 CBD 软糖、CBD 电子烟油、大麻提取物）在中国均属于<strong>毒品管制范畴</strong>。
              </p>
              <p className="text-red-700 font-semibold">
                走私毒品无论数量多少，均应追究刑事责任，予以刑事处罚！海外处方、零 THC 宣传或药用卡在中国海关均不具备任何法律豁免权。
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="font-bold text-slate-900 block text-sm">
                🌐 International Traveler Alert
              </span>
              <p className="text-slate-700">
                Under Article 347 of the PRC Criminal Law, transporting any cannabinoid substance into Chinese territory constitutes <strong>narcotic smuggling</strong>.
              </p>
              <p className="text-red-700 font-semibold">
                Penalties range from administrative detention up to severe criminal imprisonment. Never attempt to declare, conceal, or pack products containing "{blockedTerm}".
              </p>
            </div>
          </div>

          {/* Consular Advisory References */}
          <div className="border-t border-slate-200 pt-4">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-red-600" />
              Verified Official Consular Advisories
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-600">
              <li className="flex items-start gap-1.5">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>U.S. Embassy in China:</strong> "Chinese authorities have zero tolerance for drugs, including medical marijuana and CBD products. Travelers may be subject to detention."</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>UK Foreign Office (FCDO):</strong> "China applies severe penalties for drug offences, including the death penalty. Do not bring any cannabis or CBD products."</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-600 font-bold">•</span>
                <span><strong>Government of Canada:</strong> "Cannabis is illegal in China. Possession or importation of cannabis in any form can result in deportation or long prison sentences."</span>
              </li>
            </ul>
          </div>

          {/* Action Footer */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-slate-400">
              Statutory Basis: PRC Criminal Law Art. 347 & 357
            </span>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-sm shadow-md transition-colors"
            >
              I Understand & Acknowledge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Banned search keywords array
export const BANNED_INTERCEPTION_TERMS = [
  'cbd',
  'thc',
  'weed',
  'cannabis',
  'marijuana',
  'hashish',
  'khat',
  'betel nut',
  'poppers',
  'magic mushroom',
  'psilocybin',
  'methamphetamine',
  'heroin',
  'cocaine'
];

export function checkIsBannedTerm(query: string): string | null {
  if (!query) return null;
  const clean = query.toLowerCase().trim();
  for (const term of BANNED_INTERCEPTION_TERMS) {
    // Exact word or partial match
    if (clean === term || clean.includes(term)) {
      return term;
    }
  }
  return null;
}
