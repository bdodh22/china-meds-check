import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Database, Luggage, FileText, ArrowRight, ShieldAlert } from 'lucide-react';
import DrugFilterConsole from '@/components/tools/DrugFilterConsole';
import { getAllMedications } from '@/lib/medications';
import { getHreflangAlternates } from '@/lib/i18n/config';

export const metadata: Metadata = {
  title: 'China Customs Medication Catalog: Allowed and Banned Drugs',
  description:
    'Browse full index of foreign medications and legality under China Customs. Filter by banned narcotics, controlled psychotropics and permitted OTC drugs.',
  alternates: getHreflangAlternates('/drugs'),
  openGraph: {
    title: 'China Customs Medication Catalog: Allowed and Banned Drugs',
    description:
      'Browse full index of foreign medications and legality under China Customs. Filter by banned narcotics, controlled psychotropics and permitted OTC drugs.',
    url: 'https://chinamedscheck.com/drugs',
    siteName: 'ChinaMedsCheck',
    locale: 'en_US',
    type: 'website',
  },
};

export default function DrugsDirectoryPage() {
  const allMeds = getAllMedications();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'China Customs Medication Directory',
    description:
      'Comprehensive directory of prescription and OTC medications evaluated under PRC drug administration and customs regulations.',
    numberOfItems: allMeds.length,
    itemListElement: allMeds.map((med, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: `${med.brandNames[0]} (${med.genericName})`,
      url: `https://chinamedscheck.com/drugs/${med.slug}`,
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 md:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Database className="h-3.5 w-3.5 text-blue-600" />
            <span>Port Control Console & Drug Database</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            China Customs Medication Directory
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            High-density reference database for international travelers. Filter by therapeutic indication, customs channel, and statutory allowance quota with zero latency.
          </p>
        </div>

        {/* Quick Travel Bag / Declaration Callout */}
        <div className="bg-gradient-to-r from-blue-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm text-xs">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
              <Luggage className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-sm block">Carrying multiple medications on your journey?</span>
              <span className="text-slate-300">
                Audit your whole travel kit for compound chemical stacking and flight security rules.
              </span>
            </div>
          </div>
          <Link
            href="/manifest"
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shrink-0 flex items-center gap-1.5 transition"
          >
            <span>Open Travel Bag Auditor</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* The Core High-Density Interactive Filter Console */}
        <DrugFilterConsole initialMedications={allMeds} />

        {/* Noscript Semantic Fallback for Crawlers & Pure HTML */}
        <noscript>
          <div className="mt-8 bg-white p-6 rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold mb-4">Complete Static Medication Index (31 Items)</h2>
            <ul className="divide-y divide-slate-200 text-sm">
              {allMeds.map((med) => (
                <li key={med.slug} className="py-3 flex items-center justify-between">
                  <div>
                    <Link href={`/drugs/${med.slug}`} className="font-bold text-blue-600 hover:underline">
                      {med.brandNames.join(' / ')} ({med.genericName})
                    </Link>
                    <div className="text-xs text-slate-500">{med.chineseName} • CAS: {med.casNumber || 'N/A'}</div>
                  </div>
                  <div className="text-right text-xs">
                    <span className="font-bold">{med.allowance}</span>
                    <span className="block text-slate-500">{med.channel}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </noscript>
      </div>
    </div>
  );
}
