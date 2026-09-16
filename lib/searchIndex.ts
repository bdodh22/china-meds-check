import MiniSearch from 'minisearch';
import { Medication } from './types';
import medicationsData from '@/data/medications.json';

const allMeds: Medication[] = medicationsData as Medication[];

// Flatten medication documents for optimal search indexing
const documents = allMeds.map((med, index) => ({
  id: index,
  slug: med.slug,
  brandNames: med.brandNames.join(' '),
  genericName: med.genericName,
  chineseName: med.chineseName,
  indications: med.indications.join(' '),
  category: med.category,
  status: med.status,
  channel: med.channel,
  summary: med.summary,
  original: med,
}));

let miniSearchInstance: MiniSearch | null = null;

export function getSearchIndex(): MiniSearch {
  if (miniSearchInstance) {
    return miniSearchInstance;
  }

  miniSearchInstance = new MiniSearch({
    fields: ['brandNames', 'genericName', 'chineseName', 'indications'],
    storeFields: ['id', 'slug', 'original'],
    searchOptions: {
      boost: { brandNames: 3, genericName: 2, chineseName: 2, indications: 1 },
      fuzzy: 0.2, // Handles typos like "Aderall", "Zanax", "Conceta", "Ambian"
      prefix: true, // Matches typing prefixes
    },
  });

  miniSearchInstance.addAll(documents);
  return miniSearchInstance;
}

export function searchMedsWithTypoTolerance(query: string): Medication[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const cleanQuery = query.trim();
  const index = getSearchIndex();

  const results = index.search(cleanQuery, {
    fuzzy: 0.2,
    prefix: true,
  });

  if (results.length > 0) {
    return results.map((res) => res.original as Medication);
  }

  // Fallback: substring matching for exact partial strings
  const lowerQ = cleanQuery.toLowerCase();
  return allMeds.filter((med) => {
    return (
      med.brandNames.some((b) => b.toLowerCase().includes(lowerQ)) ||
      med.genericName.toLowerCase().includes(lowerQ) ||
      med.chineseName.toLowerCase().includes(lowerQ) ||
      med.indications.some((i) => i.toLowerCase().includes(lowerQ))
    );
  });
}
