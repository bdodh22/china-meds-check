import React from 'react';
import { ShoppingBag, Globe, Pill, BookOpen } from 'lucide-react';
import { Medication } from '@/lib/types';

interface BilingualPharmacyCardProps {
  med: Medication;
}

/**
 * BilingualPharmacyCard — 双语药品出示卡（可截图离线使用）
 *
 * 承接每月近 4,000 次真实搜索：
 *   · "ibuprofen chinese"      480/mo (+51% YoY)
 *   · "paracetamol chinese"    480/mo (+51% YoY)
 *   · "melatonin chinese"    1,760/mo (+22% YoY)
 *   · "aspirin in chinese"     210/mo
 *   · "adderall in chinese"    110/mo
 *
 * 用户只需截图即可在中国药房/医院/海关出示，无需网络。
 */
export default function BilingualPharmacyCard({ med }: BilingualPharmacyCardProps) {
  const hasBilingualData =
    med.pinyin ||
    med.pharmacyShowName ||
    (med.chinaOtcBrands && med.chinaOtcBrands.length > 0);
  const isOtcOrControlled =
    med.category === 'ALLOWED' || med.category === 'CONTROLLED';

  if (!hasBilingualData && !isOtcOrControlled) return null;

  const displayName = med.pharmacyShowName || med.chineseName;
  const brandEn = med.brandNames[0];
  const genericEn = med.genericName;
  const otcBrands = med.chinaOtcBrands ?? [];

  return (
    <section
      aria-label={`${brandEn} in Chinese — Pharmacy Show Card`}
      className="w-full rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/60 to-white overflow-hidden shadow-sm"
    >
      {/* Header */}
      <div className="px-5 py-3.5 border-b border-teal-100/80 bg-teal-50/70 flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-white border border-teal-100 shadow-xs shrink-0">
          <Globe className="h-3.5 w-3.5 text-teal-600" />
        </div>
        <div>
          <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider font-mono">
            {genericEn} in Chinese — Pharmacy Show Card
          </span>
          <p className="text-[10px] text-teal-600 mt-0.5 leading-tight">
            Screenshot this card to show pharmacists or customs officers in China
          </p>
        </div>
      </div>

      <div className="p-5 space-y-4">

        {/* ── Primary bilingual name block (the SEO-critical text) ── */}
        <div className="rounded-xl border border-teal-100 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Chinese side */}
          <div className="space-y-1 min-w-0">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 whitespace-nowrap">
              中文药名 · Chinese Name
            </p>
            <p
              className="text-3xl sm:text-4xl font-black text-slate-900 leading-none break-words"
              lang="zh-Hans"
            >
              {displayName}
            </p>
            {med.pinyin && (
              <p className="text-sm font-mono text-teal-600 mt-1 break-words">
                {med.pinyin}
              </p>
            )}
          </div>

          {/* English side */}
          <div className="space-y-1 sm:text-right sm:border-l sm:border-teal-100 sm:pl-5 shrink-0">
            <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              English Name
            </p>
            <p className="text-lg font-extrabold text-slate-800 whitespace-nowrap">{brandEn}</p>
            <p className="text-xs text-slate-500 whitespace-nowrap">{genericEn}</p>
          </div>
        </div>

        {/* ── In-China OTC brand equivalents ── */}
        {otcBrands.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Pill className="h-3.5 w-3.5 text-teal-600 shrink-0" />
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider font-mono">
                China Pharmacy Brands · 国内常见品牌
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {otcBrands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-teal-100 text-xs font-semibold text-slate-700 shrink-0 whitespace-nowrap"
                  lang="zh-Hans"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── Bilingual show-to-pharmacist note ── */}
        {(med.chinesePharmacyNote || med.pharmacyInstruction) && (
          <div className="rounded-xl border border-teal-100/80 bg-teal-50/40 p-4 space-y-3">
            <div className="flex items-center gap-2">
              <BookOpen className="h-3.5 w-3.5 text-teal-600 shrink-0" />
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider font-mono shrink-0 whitespace-nowrap">
                Show to Pharmacist · 出示给药剂师
              </span>
            </div>
            {med.chinesePharmacyNote && (
              <p
                className="text-sm text-slate-800 leading-relaxed font-medium border-l-2 border-teal-300 pl-3 break-words"
                lang="zh-Hans"
              >
                {med.chinesePharmacyNote}
              </p>
            )}
            {med.pharmacyInstruction && (
              <p className="text-xs text-slate-500 leading-relaxed italic break-words">
                {med.pharmacyInstruction}
              </p>
            )}
          </div>
        )}

        {/* ── Screenshot tip ── */}
        <div className="flex items-center gap-2 pt-1">
          <ShoppingBag className="h-3.5 w-3.5 text-slate-400 shrink-0" />
          <p className="text-[11px] text-slate-400 leading-tight">
            Tip: Screenshot this card — works offline at Chinese pharmacies, hospitals and airports.
            No internet connection required.
          </p>
        </div>

      </div>
    </section>
  );
}
