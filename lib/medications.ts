import medicationsData from '@/data/medications.json';
import { Medication, MedicationCategory, MedicationStatus } from './types';

const medications: Medication[] = medicationsData as Medication[];

export function getAllMedications(): Medication[] {
  return medications;
}

export function getMedicationBySlug(slug: string): Medication | undefined {
  return medications.find((med) => med.slug === slug);
}

export function getMedicationsByCategory(category: MedicationCategory): Medication[] {
  return medications.filter((med) => med.category === category);
}

export function getMedicationsByStatus(status: MedicationStatus): Medication[] {
  return medications.filter((med) => med.status === status);
}

export function getFeaturedMedications(): Medication[] {
  const featuredSlugs = [
    'adderall-in-china',
    'ritalin-concerta-in-china',
    'cbd-oil-in-china',
    'ibuprofen-in-china',
    'xanax-in-china',
    'ozempic-wegovy-in-china',
  ];
  return medications.filter((med) => featuredSlugs.includes(med.slug));
}

export function searchMedications(query: string): Medication[] {
  if (!query || query.trim() === '') {
    return [];
  }
  const cleanQuery = query.toLowerCase().trim();

  return medications.filter((med) => {
    const genericMatch = med.genericName.toLowerCase().includes(cleanQuery);
    const chineseMatch = med.chineseName.toLowerCase().includes(cleanQuery);
    const brandMatch = med.brandNames.some((brand) =>
      brand.toLowerCase().includes(cleanQuery)
    );
    const indicationMatch = med.indications.some((ind) =>
      ind.toLowerCase().includes(cleanQuery)
    );

    return genericMatch || chineseMatch || brandMatch || indicationMatch;
  });
}
