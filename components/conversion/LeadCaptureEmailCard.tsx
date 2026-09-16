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
    <div className="w-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl border border-blue-500/30 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        {/* Left Column: Value Proposition */}
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 shrink-0 whitespace-nowrap">
            <FileText className="h-3.5 w-3.5 text-blue-400" />
            <span>{t.badge}</span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white leading-snug">
            {medicationName ? `${medicationName} • ${t.title}` : t.title}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed">
            {t.subtitle}
          </p>

          <ul className="space-y-2 pt-1 text-xs sm:text-sm text-slate-200">
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>{t.bullet1}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>{t.bullet2}</span>
            </li>
            <li className="flex items-center gap-2.5">
              <span className="h-5 w-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-400/30">
                <CheckCircle2 className="h-3.5 w-3.5" />
              </span>
              <span>{t.bullet3}</span>
            </li>
          </ul>
        </div>

        {/* Right Column: Interaction Form / Success View */}
        <div className="w-full lg:max-w-md bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 shadow-inner">
          {status === 'success' ? (
            <div className="space-y-4 py-3 text-center sm:text-left">
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-400/30">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-white">
                  {t.successTitle}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {t.successDesc}
                </p>
                <p className="text-xs font-mono text-blue-300 pt-1 break-all">
                  {email}
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-semibold shadow transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
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
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium transition-all"
                >
                  {t.reset}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1.5">
                <label htmlFor="lead-email-input" className="block text-xs font-medium text-slate-300">
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
                    className={`w-full pl-10 pr-4 py-3 bg-slate-950/70 border ${
                      status === 'error' ? 'border-red-400 focus:ring-red-400/50' : 'border-slate-700/80 focus:border-blue-400 focus:ring-blue-400/40'
                    } rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all`}
                  />
                </div>
                {status === 'error' && errorMessage && (
                  <p className="text-xs text-red-400 pl-1">{errorMessage}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-semibold shadow-lg shadow-blue-900/30 transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
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

              <div className="flex items-center gap-1.5 pt-1 text-[11px] text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                <span className="leading-tight">{t.privacy}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
