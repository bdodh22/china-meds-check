'use client';

import React, { useState } from 'react';
import {
  ShoppingBag,
  Globe,
  Pill,
  BookOpen,
  Download,
  Copy,
  Check,
  Maximize2,
  X,
  Smartphone,
} from 'lucide-react';
import { Medication } from '@/lib/types';

interface BilingualPharmacyCardProps {
  med: Medication;
}

/**
 * BilingualPharmacyCard — 双语药品出示卡（离线出示、一键保存卡片图片与大字展示）
 *
 * 专门优化离线与无网环境：
 * 1. 一键下载高清出示卡图片（Canvas 原生生成，无第三方依赖，存入相册随开随用）
 * 2. 一键复制中文药名与药剂师沟通语（便于粘贴至微信、美团或翻译软件）
 * 3. 柜台大字全屏出示模式（专为近视老药师或隔着玻璃柜台沟通设计）
 */
export default function BilingualPharmacyCard({ med }: BilingualPharmacyCardProps) {
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);

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

  // 1. Copy Chinese text to clipboard
  const handleCopyChinese = async () => {
    const textToCopy = `${displayName}${med.pinyin ? ` (${med.pinyin})` : ''}\n${med.chinesePharmacyNote || ''}`.trim();
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 2. Client-side Canvas generator to save high-res offline card image
  const handleSaveCardImage = () => {
    setIsGenerating(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 800 x 1000 standard mobile card ratio
      const width = 800;
      const height = 960;
      canvas.width = width;
      canvas.height = height;

      // Background gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#f0fdfa'); // teal-50
      bgGrad.addColorStop(1, '#ffffff');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Card outer border
      ctx.strokeStyle = '#99f6e4'; // teal-200
      ctx.lineWidth = 4;
      ctx.strokeRect(16, 16, width - 32, height - 32);

      // Top banner
      ctx.fillStyle = '#0f766e'; // teal-700
      ctx.fillRect(20, 20, width - 40, 70);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillText('ChinaMedsCheck · Pharmacy & Customs Show Card', 40, 64);

      // Subhead / Year
      ctx.fillStyle = '#64748b'; // slate-500
      ctx.font = '16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('Verified In-Country Bilingual Medical Radar · 2026/2027', 40, 130);

      // White inner main box
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#cbd5e1';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(40, 150, width - 80, 260, 16);
      ctx.fill();
      ctx.stroke();

      // Chinese Name Tag
      ctx.fillStyle = '#94a3b8';
      ctx.font = 'bold 16px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('中文药名 · CHINESE MEDICINE NAME', 60, 190);

      // Chinese Name Main Text
      ctx.fillStyle = '#0f172a'; // slate-900
      ctx.font = 'bold 44px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';
      ctx.fillText(displayName.substring(0, 18), 60, 255);

      // Pinyin
      if (med.pinyin) {
        ctx.fillStyle = '#0d9488'; // teal-600
        ctx.font = 'bold 24px monospace';
        ctx.fillText(`Pinyin: ${med.pinyin}`, 60, 305);
      }

      // English Reference
      ctx.fillStyle = '#64748b';
      ctx.font = '20px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText(`English: ${brandEn} (${genericEn})`, 60, 370);

      let currentY = 450;

      // In-China OTC Brands
      if (otcBrands.length > 0) {
        ctx.fillStyle = '#334155';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('国内常见品牌 · CHINA PHARMACY BRANDS:', 40, currentY);
        currentY += 35;

        ctx.fillStyle = '#0f766e';
        ctx.font = 'bold 20px -apple-system, BlinkMacSystemFont, "PingFang SC", sans-serif';
        const brandText = otcBrands.slice(0, 4).join('  ·  ');
        ctx.fillText(brandText, 40, currentY);
        currentY += 60;
      }

      // Show to Pharmacist Box
      if (med.chinesePharmacyNote) {
        ctx.fillStyle = '#f0fdfa';
        ctx.strokeStyle = '#5eead4';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(40, currentY, width - 80, 220, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#115e59';
        ctx.font = 'bold 18px -apple-system, BlinkMacSystemFont, sans-serif';
        ctx.fillText('SHOW TO PHARMACIST · 出示给药剂师:', 60, currentY + 40);

        ctx.fillStyle = '#0f172a';
        ctx.font = 'bold 24px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif';

        // Word wrap for Chinese note
        const note = med.chinesePharmacyNote;
        const line1 = note.substring(0, 24);
        const line2 = note.substring(24, 52);
        ctx.fillText(line1, 60, currentY + 85);
        if (line2) {
          ctx.fillText(line2, 60, currentY + 125);
        }

        if (med.pharmacyInstruction) {
          ctx.fillStyle = '#64748b';
          ctx.font = 'italic 16px -apple-system, BlinkMacSystemFont, sans-serif';
          ctx.fillText(med.pharmacyInstruction.substring(0, 70), 60, currentY + 175);
        }

        currentY += 250;
      }

      // Footer
      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.fillText('Saved from ChinaMedsCheck.com · 100% Free Public Travel Health Utility', 40, height - 40);

      // Trigger instant PNG download
      const imageUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `${brandEn.replace(/[^a-zA-Z0-9]/g, '_')}_China_Pharmacy_Card.png`;
      link.href = imageUri;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error('Failed to generate image:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <section
        aria-label={`${brandEn} in Chinese — Pharmacy Show Card`}
        className="w-full rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50/60 to-white overflow-hidden shadow-sm"
      >
        {/* Header with Quick Offline Action Buttons */}
        <div className="px-5 py-3.5 border-b border-teal-100/80 bg-teal-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-white border border-teal-100 shadow-xs shrink-0">
              <Globe className="h-3.5 w-3.5 text-teal-600" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wider font-mono">
                {genericEn} in Chinese — Pharmacy Show Card
              </span>
              <p className="text-[10px] text-teal-600 mt-0.5 leading-tight">
                Works 100% offline at Chinese pharmacies, hospitals, and customs
              </p>
            </div>
          </div>

          {/* Practical Action Toolbar */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* 1. Save Image Button */}
            <button
              onClick={handleSaveCardImage}
              disabled={isGenerating}
              className="h-8 px-3 rounded-lg bg-white hover:bg-teal-50 active:scale-[0.98] border border-teal-200 text-teal-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs hover:shadow-xs shrink-0 whitespace-nowrap"
              title="Download high-resolution image to your photo gallery for offline use"
            >
              <Download className="h-3.5 w-3.5 text-teal-600" />
              <span>{isGenerating ? 'Generating...' : 'Save Card Image'}</span>
            </button>

            {/* 2. Copy Chinese Text */}
            <button
              onClick={handleCopyChinese}
              className={`h-8 px-3 rounded-lg border font-bold text-xs flex items-center gap-1.5 transition-all shadow-2xs active:scale-[0.98] shrink-0 whitespace-nowrap ${
                copied
                  ? 'bg-emerald-600 border-emerald-600 text-white'
                  : 'bg-white hover:bg-teal-50 border-teal-200 text-teal-800'
              }`}
              title="Copy Chinese text to clipboard for WeChat or food delivery apps"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-teal-600" />
                  <span>Copy Chinese</span>
                </>
              )}
            </button>

            {/* 3. Fullscreen Show Button */}
            <button
              onClick={() => setShowFullscreen(true)}
              className="h-8 px-2.5 rounded-lg bg-white hover:bg-teal-50 active:scale-[0.98] border border-teal-200 text-teal-800 font-bold text-xs flex items-center gap-1 transition-all shadow-2xs shrink-0 whitespace-nowrap"
              title="Fullscreen large font mode for counters and pharmacy glass windows"
            >
              <Maximize2 className="h-3.5 w-3.5 text-teal-600" />
              <span className="hidden sm:inline">Big Screen</span>
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* ── Primary bilingual name block ── */}
          <div className="rounded-xl border border-teal-100 bg-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
            {/* Chinese side */}
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider shrink-0 whitespace-nowrap">
                  中文药名 · Chinese Name
                </p>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-50 text-teal-700 font-mono font-bold border border-teal-100">
                  Ready to Show
                </span>
              </div>
              <p
                className="text-3xl sm:text-4xl font-black text-slate-900 leading-none break-words"
                lang="zh-Hans"
              >
                {displayName}
              </p>
              {med.pinyin && (
                <p className="text-sm font-mono text-teal-600 mt-1 break-words">
                  Pinyin: {med.pinyin}
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
                    className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white border border-teal-100 text-xs font-semibold text-slate-700 shadow-2xs shrink-0 whitespace-nowrap"
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
                  className="text-sm text-slate-800 leading-relaxed font-medium border-l-2 border-teal-400 pl-3 break-words"
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

          {/* ── Offline Hint ── */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
            <Smartphone className="h-3.5 w-3.5 text-teal-600 shrink-0" />
            <span>
              Tip: Click <strong>Save Card Image</strong> to keep this in your phone gallery. Zero Wi-Fi or cellular roaming required inside Chinese drugstores.
            </span>
          </div>
        </div>
      </section>

      {/* ── Fullscreen Big Font Show Modal (大字全屏出示模式) ── */}
      {showFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowFullscreen(false)}
        >
          <div
            className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowFullscreen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition"
              aria-label="Close fullscreen view"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-teal-700 uppercase tracking-wider">
                Please Show This to Pharmacy Staff · 请向药师出示
              </span>
              <p
                className="text-4xl sm:text-5xl font-black text-slate-950 leading-tight pt-2 break-words"
                lang="zh-Hans"
              >
                {displayName}
              </p>
              {med.pinyin && (
                <p className="text-lg sm:text-xl font-mono text-teal-600 font-bold">
                  {med.pinyin}
                </p>
              )}
            </div>

            {med.chinesePharmacyNote && (
              <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200">
                <p
                  className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed"
                  lang="zh-Hans"
                >
                  {med.chinesePharmacyNote}
                </p>
              </div>
            )}

            {otcBrands.length > 0 && (
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-400 font-bold uppercase font-mono">国内等效品牌参考：</span>
                <p className="text-slate-700 font-medium">{otcBrands.join(' / ')}</p>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>English: {brandEn} ({genericEn})</span>
              <button
                onClick={() => setShowFullscreen(false)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold"
              >
                Done / 关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
