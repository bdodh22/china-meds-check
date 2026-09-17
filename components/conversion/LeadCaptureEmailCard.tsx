'use client';

import React, { useState } from 'react';
import { FileText, CheckCircle2, Download, Mail, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';

interface LeadCaptureEmailCardProps {
  locale?: Locale;
  medicationName?: string;
  sourceContext?: string;
}

export default function LeadCaptureEmailCard({
  locale = 'en',
  medicationName,
  sourceContext = 'general',
}: LeadCaptureEmailCardProps) {
  const dict = getDictionary(locale);
  const t = dict.leadCapture;

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) {
      setStatus('error');
      setErrorMessage(t.invalidEmail);
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    setTimeout(() => {
      setStatus('success');
      try {
        localStorage.setItem('cmc_lead_email', email.trim());
      } catch {
        // Ignore localStorage error
      }
    }, 700);
  };

  return (
    <div className="w-full bg-gradient-to-br from-white via-teal-50/20 to-slate-50/70 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-teal-200/60 relative overflow-hidden">
      {/* Subtle Ambient Light */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Value Proposition */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200/80 shrink-0 whitespace-nowrap font-mono">
            <FileText className="h-3.5 w-3.5 text-teal-600" />
            <span>{t.badge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900 leading-snug">
            {medicationName ? `${medicationName} • ${t.title}` : t.title}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {t.subtitle}
          </p>

          <ul className="space-y-2.5 pt-1 text-xs sm:text-sm text-slate-700">
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/70">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{t.bullet1}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/70">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{t.bullet2}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-200/70">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span className="font-medium">{t.bullet3}</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Interaction Form / Success View */}
        <div className="w-full lg:max-w-md bg-white rounded-2xl p-5 sm:p-7 border border-slate-200/90 shadow-sm">
          {status === 'success' ? (
            <div className="space-y-4 py-2 text-center sm:text-left">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-slate-900">
                  {t.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {t.successDesc}
                </p>
                <p className="text-xs font-mono font-bold text-teal-700 pt-1 break-all">
                  {email}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>{t.printChecklist}</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setEmail('');
                  }}
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-all"
                >
                  {t.reset}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label htmlFor="lead-email-input" className="block text-xs font-bold text-slate-700">
                  {t.button}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    id="lead-email-input"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={t.placeholder}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50/70 border ${
                      status === 'error' ? 'border-rose-400 focus:ring-rose-400/30' : 'border-slate-200 focus:border-teal-600 focus:ring-teal-500/20'
                    } rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 transition-all`}
                  />
                </div>
                {status === 'error' && errorMessage && (
                  <p className="text-xs text-rose-600 pl-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-sm hover:shadow-[0_8px_20px_rgba(13,148,136,0.2)] transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>{t.submitting}</span>
                  </>
                ) : (
                  <>
                    <span>{t.button}</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                <span className="leading-tight">{t.privacy}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
