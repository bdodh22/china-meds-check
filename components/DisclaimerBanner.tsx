import React from 'react';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface DisclaimerBannerProps {
  variant?: 'top' | 'card';
}

export default function DisclaimerBanner({ variant = 'top' }: DisclaimerBannerProps) {
  if (variant === 'card') {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 shadow-sm">
        <div className="flex items-start gap-2.5">
          <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              Official Legal & Medical Disclaimer (YMYL Compliance)
            </p>
            <p className="leading-relaxed text-slate-600">
              ChinaMedsCheck is an independent informational compliance radar based on public regulations published by the General Administration of Customs of China (GACC) and the National Medical Products Administration (NMPA). This platform does not provide legal counsel or clinical medical diagnosis. Final clearance decisions rest exclusively with Chinese customs inspection officers at border ports.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Official Disclaimer" className="w-full border-b border-slate-200 bg-slate-100/90 py-2 px-4 text-xs text-slate-600">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700 tracking-wide uppercase">
            Notice
          </span>
          <p className="leading-tight">
            <strong>ChinaMedsCheck</strong> is an informational reference tool and does not constitute medical or legal advice. Final entry decisions rest solely with China Customs (GACC) officers.
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 text-[11px] whitespace-nowrap">
          <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
          <span>Updated for 2026/2027 Entry Regulations</span>
        </div>
      </div>
    </aside>
  );
}
