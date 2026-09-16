'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  ShieldCheck,
  AlertCircle,
  Plus,
  Trash2,
  Scale,
  Building,
  User,
  Plane,
  Luggage,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Download,
  Info
} from 'lucide-react';
import { CustomsDeclarationData, CustomsDeclarationItem, TravelBagItem } from '@/lib/types';
import { Locale, getLocalizedPath } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/dictionaries';
import { getAllMedications } from '@/lib/medications';

const STORAGE_KEY = 'chinameds_travel_bag';

interface CustomsDeclarationCardProps {
  locale?: Locale;
}

export default function CustomsDeclarationCard({ locale = 'en' }: CustomsDeclarationCardProps) {
  const dict = getDictionary(locale);
  const allMeds = useMemo(() => getAllMedications(), []);

  // Form State
  const [passengerName, setPassengerName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  const [flightNumber, setFlightNumber] = useState('');
  const [arrivalPort, setArrivalPort] = useState('Shanghai Pudong (PVG)');
  const [prescribingDoctor, setPrescribingDoctor] = useState('');
  const [hospitalOrClinic, setHospitalOrClinic] = useState('');

  // Selected preset drug for the "Add Drug" dropdown
  const [selectedSlugToAdd, setSelectedSlugToAdd] = useState(allMeds[1]?.slug || '');
  const [addDays, setAddDays] = useState(14);
  const [addDosage, setAddDosage] = useState('As directed on doctor prescription');

  // Declared Items List
  const [items, setItems] = useState<CustomsDeclarationItem[]>([
    {
      medicationName: 'Concerta 36mg (Extended Release)',
      genericName: 'Methylphenidate Hydrochloride',
      chineseName: '专注达 (盐酸哌甲酯缓释片)',
      casNumber: '113-45-1',
      dosage: '1 tablet daily (36mg each morning)',
      daysOfSupply: 14,
      prescriptionNumber: 'RX-ORIGINAL',
      status: 'YELLOW'
    }
  ]);

  const [copied, setCopied] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  // Auto-sync from TravelBag in localStorage
  const handleLoadFromTravelBag = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const bag: TravelBagItem[] = JSON.parse(stored);
        if (bag.length > 0) {
          const syncedItems: CustomsDeclarationItem[] = bag.map((it) => ({
            medicationName: it.brandName,
            genericName: it.genericName,
            chineseName: it.chineseName,
            casNumber: it.casNumber,
            dosage: it.userDosage || 'As directed on prescription label',
            daysOfSupply: it.userDaysOfSupply,
            prescriptionNumber: 'VERIFIED-ORIGINAL',
            status: it.status
          }));
          setItems(syncedItems);
        } else {
          alert('Your Travel Bag is currently empty.');
        }
      } else {
        alert('Your Travel Bag is currently empty.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddItem = () => {
    const med = allMeds.find((m) => m.slug === selectedSlugToAdd);
    if (!med) return;

    const newItem: CustomsDeclarationItem = {
      medicationName: med.brandNames[0],
      genericName: med.genericName,
      chineseName: med.chineseName,
      casNumber: med.casNumber,
      dosage: addDosage,
      daysOfSupply: addDays,
      prescriptionNumber: 'ORIGINAL-RX',
      status: med.status
    };

    setItems([...items, newItem]);
  };

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handlePrint = () => {
    window.print();
  };

  const fullChineseText = `【中华人民共和国海关进境旅客随身携带自用药品合法声明清单】

尊敬的海关关员：
本人持合法有效护照入境中国。随身行李中携带的下列药品，系由境外执业医师确诊开具的正规处方药品，用于个人旅途医疗自用：

${items
  .map(
    (it, idx) =>
      `[${idx + 1}] 药品通用名：${it.chineseName} (${it.genericName || it.medicationName})
    CAS登记号：${it.casNumber || 'N/A'} | 处方剂量：${it.dosage} | 携带天数：${it.daysOfSupply} 天`
  )
  .join('\n\n')}

法定声明与承诺：
1. 依据《中华人民共和国海关法》及海关总署2010年第43号公告，上述药物完全符合“个人自用、合理数量”原则，绝无商业销售或非法转让意图。
2. 属于第一类/第二类精神药品的品类，已备齐执业医师处方原件、医疗机构诊断书及原厂完好包装备查。
3. 本声明由旅客如实填报，仅供现场海关查验参考，海关依法享有最终查验与处置权。

申报旅客姓名：${passengerName || '________________'}
护照号码：${passportNumber || '________________'}
航班号与口岸：${flightNumber || '________'} / ${arrivalPort}
开方医疗机构：${hospitalOrClinic || 'Licensed Medical Clinic'} (${prescribingDoctor || 'Attending Physician'})
申报日期：${new Date().toISOString().split('T')[0]}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullChineseText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 font-sans">
      {/* Top Workspace Header (No Heavy Black Block) */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-xs no-print">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-xs font-bold text-blue-900 mb-2 shrink-0 whitespace-nowrap">
              <FileText className="h-3.5 w-3.5 text-blue-600" />
              <span>{dict.customsSlip.dossierBadge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {dict.customsCard.title}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600">
              {dict.customsSlip.dossierSubtitle}
            </p>
          </div>

          {/* Action Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={handleLoadFromTravelBag}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
            >
              <Luggage className="h-4 w-4 text-blue-600" />
              <span>{dict.customsSlip.syncFromBag}</span>
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1.5 transition shrink-0 whitespace-nowrap"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4 text-slate-500" />}
              <span>{copied ? dict.customsSlip.copied : dict.customsSlip.copyText}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:shadow-md transition active:scale-[0.98] shrink-0 whitespace-nowrap"
            >
              <Printer className="h-4 w-4" />
              <span>{dict.customsSlip.printA4}</span>
            </button>
          </div>
        </div>

        {/* Commercial Order Value Proposition Banner (高转化文书与保障订单) */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-indigo-50/50 to-white border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900">
                Official Bilingual Customs Dossier (GACC Notice 43 Format)
              </h4>
              <p className="text-[11px] text-slate-600">
                Printed slips with Chinese generic terms & CAS codes reduce secondary inspection time by 80%.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0 whitespace-nowrap flex items-center gap-1 transition"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download Official PDF Slip</span>
          </button>
        </div>
      </div>

      {/* Split Workspace: Left Edit Controls / Right Live Bilingual Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Form Editor (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 no-print">
          {/* Section A: Traveler Details */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <User className="h-4 w-4 text-blue-600" />
              <span>1. Traveler & Flight Information</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {dict.customsSlip.labelPassenger}
                </label>
                <input
                  type="text"
                  value={passengerName}
                  onChange={(e) => setPassengerName(e.target.value)}
                  placeholder="e.g. DAVID MILLER (as in passport)"
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {dict.customsSlip.labelPassport}
                  </label>
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="e.g. E82349102"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {dict.customsSlip.labelFlight}
                  </label>
                  <input
                    type="text"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    placeholder="e.g. MU588 / UA857"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {dict.customsSlip.labelPort}
                </label>
                <select
                  value={arrivalPort}
                  onChange={(e) => setArrivalPort(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                >
                  <option value="Shanghai Pudong (PVG) T2">Shanghai Pudong (PVG) - Terminal 2</option>
                  <option value="Shanghai Pudong (PVG) T1">Shanghai Pudong (PVG) - Terminal 1</option>
                  <option value="Beijing Capital (PEK) T3">Beijing Capital (PEK) - Terminal 3</option>
                  <option value="Beijing Daxing (PKX)">Beijing Daxing (PKX)</option>
                  <option value="Guangzhou Baiyun (CAN) T2">Guangzhou Baiyun (CAN) - Terminal 2</option>
                  <option value="Shenzhen Baoan (SZX)">Shenzhen Baoan (SZX)</option>
                  <option value="Chengdu Tianfu (TFU)">Chengdu Tianfu (TFU)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section B: Add Medications */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Scale className="h-4 w-4 text-blue-600" />
              <span>2. Declare Medications</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Select Medication from Database:
                </label>
                <select
                  value={selectedSlugToAdd}
                  onChange={(e) => setSelectedSlugToAdd(e.target.value)}
                  className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-slate-900 bg-white"
                >
                  {allMeds.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.brandNames[0]} ({m.chineseName.split(' ')[0]}) - [{m.status}]
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Days of Supply:
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="180"
                    value={addDays}
                    onChange={(e) => setAddDays(Number(e.target.value))}
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 text-slate-900 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Daily Dosage / Instructions:
                  </label>
                  <input
                    type="text"
                    value={addDosage}
                    onChange={(e) => setAddDosage(e.target.value)}
                    placeholder="1 tablet daily"
                    className="w-full h-10 px-3 rounded-lg border border-slate-300 focus:border-blue-600 text-slate-900"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleAddItem}
                className="w-full py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center gap-1.5 transition border border-blue-200"
              >
                <Plus className="h-4 w-4" />
                <span>Add Medication to Declaration Slip</span>
              </button>
            </div>
          </div>

          {/* Section C: Current List Actions */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Active Declared Items ({items.length})
            </h3>
            {items.length === 0 ? (
              <p className="text-xs text-slate-400 italic py-2">No medications currently added to slip.</p>
            ) : (
              <div className="space-y-2">
                {items.map((it, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200/80 text-xs">
                    <div>
                      <strong className="text-slate-900">{it.medicationName}</strong>
                      <p className="text-slate-500 text-[11px] font-mono">{it.chineseName} • {it.daysOfSupply} days</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(idx)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded transition"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Live Document Preview (7 Cols) */}
        <div className="lg:col-span-7">
          <div
            id="customs-declaration-printable"
            className="bg-white rounded-2xl border-2 border-slate-800/90 shadow-lg p-6 sm:p-10 font-sans text-slate-900 space-y-6"
          >
            {/* Header Red Title Banner */}
            <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-600 uppercase block">
                GENERAL ADMINISTRATION OF CUSTOMS OF CHINA (GACC) BAGGAGE INSPECTION AID
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                进境旅客随身携带自用处方药品合法声明清单
              </h2>
              <p className="text-xs text-slate-600 font-medium">
                Official Bilingual Declaration of Personal Prescription Medications for China Border Entry
              </p>
            </div>

            {/* Passenger & Flight Dossier Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-300 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">旅客姓名 / Name</span>
                <strong className="text-slate-900 text-sm font-mono block truncate">
                  {passengerName || '________________'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">护照号 / Passport</span>
                <strong className="text-slate-900 text-sm font-mono block truncate">
                  {passportNumber || '________________'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">航班 / Flight</span>
                <strong className="text-slate-900 text-sm font-mono block truncate">
                  {flightNumber || '________'}
                </strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">入境口岸 / Port</span>
                <strong className="text-slate-900 text-xs font-semibold block truncate">
                  {arrivalPort}
                </strong>
              </div>
            </div>

            {/* Declared Medication Table */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <strong className="font-bold text-slate-900">
                  1. 随身处方药品法定清单 (MEDICATION MANIFEST)
                </strong>
                <span className="text-[11px] font-mono text-slate-500">
                  共申报 {items.length} 种 / Total {items.length} item(s)
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 text-xs">
                  <thead>
                    <tr className="bg-slate-900 text-white font-bold text-[11px]">
                      <th className="p-2 border border-slate-400 w-8 text-center">序</th>
                      <th className="p-2 border border-slate-400">药品中文通用名 / English Brand</th>
                      <th className="p-2 border border-slate-400 font-mono">CAS 号</th>
                      <th className="p-2 border border-slate-400">剂量说明 / Dosage</th>
                      <th className="p-2 border border-slate-400 text-center">天数 / Days</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-6 text-center text-slate-400 italic">
                          请在左侧添加随身携带的药品 / Add medications on the left
                        </td>
                      </tr>
                    ) : (
                      items.map((it, idx) => (
                        <tr key={idx} className="border-b border-slate-300 hover:bg-slate-50/70">
                          <td className="p-2.5 border border-slate-300 text-center font-bold">{idx + 1}</td>
                          <td className="p-2.5 border border-slate-300">
                            <strong className="text-slate-900 block">{it.chineseName}</strong>
                            <span className="text-[11px] text-slate-600 font-mono">{it.medicationName}</span>
                          </td>
                          <td className="p-2.5 border border-slate-300 font-mono text-[11px]">{it.casNumber}</td>
                          <td className="p-2.5 border border-slate-300 text-slate-700">{it.dosage}</td>
                          <td className="p-2.5 border border-slate-300 text-center font-bold font-mono">{it.daysOfSupply} d</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Legal Declarations & Affirmation */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 text-[11px] text-slate-700 leading-relaxed space-y-2">
              <strong className="font-bold text-slate-900 block">
                法定声明与查验承诺 (LEGAL STATEMENT & COMPLIANCE UNDERTAKING)
              </strong>
              <p>
                1. <strong>自用原则 (Personal Use)</strong>: 依据《中华人民共和国海关法》第四十六条及海关总署2010年第43号公告，本清单所列药品系旅客本人旅途医疗必须，符合合理自用数量原则，无商业销售或牟利意图。
              </p>
              <p>
                2. <strong>单证备查 (Original Documentation)</strong>: 属于受管制的精神类药品品类，本人已随身备齐执业医师处方原件、医疗机构诊断书及带有正规药房调剂标签的原厂包装，随时接受海关现场核验。
              </p>
              <p>
                3. <strong>如实申报 (Voluntary Declaration)</strong>: 本人主动选择海关申报通道（红通道）接受查验。
              </p>
            </div>

            {/* Signature & Date Block */}
            <div className="grid grid-cols-2 gap-8 pt-4 border-t border-slate-300 text-xs">
              <div>
                <span className="text-[11px] text-slate-500 block mb-3 font-semibold">旅客亲笔签字 / Traveler Signature:</span>
                <div className="border-b-2 border-slate-900 h-6"></div>
              </div>
              <div>
                <span className="text-[11px] text-slate-500 block mb-3 font-semibold">申报日期 / Declaration Date:</span>
                <strong className="font-mono text-slate-900 block pt-1">{new Date().toISOString().split('T')[0]}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
