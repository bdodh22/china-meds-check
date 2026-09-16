import { Medication } from './types';
import medicationsData from '@/data/medications.json';

const allMeds: Medication[] = medicationsData as Medication[];

export interface RxNormResolution {
  query: string;
  conceptName?: string;
  activeIngredients: string[];
  matchedMedication?: Medication;
}

/**
 * Queries the US National Library of Medicine (NLM) RxNorm REST API
 * to resolve obscure or unlisted foreign brand names into active INN chemical ingredients,
 * then matches against China Customs regulated substances.
 */
export async function resolveBrandViaRxNorm(query: string): Promise<RxNormResolution | null> {
  if (!query || query.trim().length < 3) return null;

  try {
    const encoded = encodeURIComponent(query.trim());
    const response = await fetch(
      `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encoded}`,
      { headers: { Accept: 'application/json' } }
    );

    if (!response.ok) return null;

    const data = await response.json();
    const conceptGroup = data?.drugGroup?.conceptGroup;
    if (!conceptGroup || !Array.isArray(conceptGroup)) return null;

    // Collect candidate drug names from SBD (Semantic Branded Drug) or SCD (Semantic Clinical Drug)
    let candidateName = '';
    for (const group of conceptGroup) {
      if (group.conceptProperties && group.conceptProperties.length > 0) {
        candidateName = group.conceptProperties[0].name || '';
        break;
      }
    }

    if (!candidateName) return null;

    // Extract potential active ingredients from candidate string
    // Format typically: "clonazepam 0.5 MG Oral Tablet [Klonopin]" or "amphetamine ... Oral Tablet"
    const lowerCandidate = candidateName.toLowerCase();
    
    // Find matching local medication by generic name or keywords
    const matched = allMeds.find((med) => {
      const genericParts = med.genericName.toLowerCase().split(/[\s,/]+/);
      return genericParts.some((part) => part.length > 3 && lowerCandidate.includes(part));
    });

    return {
      query,
      conceptName: candidateName,
      activeIngredients: matched ? [matched.genericName] : [candidateName.split(' ')[0]],
      matchedMedication: matched,
    };
  } catch (err) {
    // Network or CORS error; gracefully return null
    return null;
  }
}
