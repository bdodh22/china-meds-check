export type MedicationCategory = 'BANNED' | 'CONTROLLED' | 'ALLOWED';

export type MedicationStatus = 'RED' | 'YELLOW' | 'GREEN';

export type CustomsChannel = 'RED_CHANNEL' | 'GREEN_CHANNEL' | 'STRICTLY_FORBIDDEN';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface GaccCustomsProfile {
  status: 'PROHIBITED' | 'RESTRICTED' | 'ALLOWED';
  declarationRequired: boolean;
  maxDays: number;
  channel: CustomsChannel;
  legalBasis: string;
  advice: string;
}

export interface CaacAviationProfile {
  carryOn: 'ALLOWED' | 'WITH_CERTIFICATE' | 'CHECKED_ONLY';
  sharpsInvolved: boolean;
  coldChain: boolean;
  securityAdvisory: string;
}

export interface LocalRefillProfile {
  refillableInChina: boolean;
  hospitalTier: string;
  specialistRequired: string;
  maxRefillDays: number;
  requiredDocs: string[];
  warningNotes?: string;
}

export interface ClearanceProfiles {
  gaccCustoms: GaccCustomsProfile;
  caacAviation: CaacAviationProfile;
  localRefill: LocalRefillProfile;
}

export interface Medication {
  slug: string;
  brandNames: string[];
  genericName: string;
  chineseName: string;
  category: MedicationCategory;
  status: MedicationStatus;
  summary: string;
  customsRule: string;
  allowance: string;
  allowanceDaysMax: number;
  channel: CustomsChannel;
  legalBasis: string;
  declarationRequirement: string;
  localAlternative: string;
  affiliateCategory: 'insurance' | 'clinic';
  indications: string[];
  faqItems: FAQItem[];
  // Enhanced Authority & Search metadata
  casNumber?: string;
  incbCategory?: string;
  rxnormCui?: string;
  authorityNotes?: string;
  beforePackingTips?: string[];
  // Dual-jurisdiction & Multi-med bag metadata
  activeIngredients?: string[];
  redLineWarning?: boolean;
  // Bilingual in-China pharmacy show card fields
  pinyin?: string;              // 拼音发音（如 Bù luò fēn）
  pharmacyShowName?: string;    // 给药剂师出示的中文药名（标准汉字）
  chinaOtcBrands?: string[];    // 中国境内OTC常见品牌
  pharmacyInstruction?: string; // 药房出示说明（英文）
  chinesePharmacyNote?: string; // 药房出示的中文说明（简体）
  clearanceProfiles?: ClearanceProfiles;
}

export interface CustomsDeclarationItem {
  medicationName: string;
  genericName?: string;
  chineseName?: string;
  casNumber?: string;
  dosage: string;
  daysOfSupply: number;
  prescriptionNumber?: string;
  status?: MedicationStatus;
}

export interface CustomsDeclarationData {
  passengerName: string;
  passportNumber?: string;
  flightNumber?: string;
  arrivalPort?: string;
  // Legacy single medication fields
  medicationName: string;
  genericName?: string;
  dosage: string;
  condition: string;
  prescribingDoctor: string;
  doctorLicenseNumber?: string;
  hospitalOrClinic: string;
  hospitalAddress?: string;
  daysOfSupply: number;
  // Multi-medication expansion
  items?: CustomsDeclarationItem[];
}

export interface WalkthroughStep {
  stepNumber: number;
  stepTitle: string;
  instruction: string;
  locationNote: string;
  customsOfficerTip: string;
  i18n?: Record<string, {
    stepTitle: string;
    instruction: string;
    locationNote: string;
    customsOfficerTip: string;
  }>;
}

export interface PortWalkthrough {
  id: string;
  airportName: string;
  terminal: string;
  city: string;
  iataCode: string;
  chineseName: string;
  inspectionCharacteristics: string;
  walkthroughSteps: WalkthroughStep[];
  redChannelDesk: {
    physicalLocation: string;
    operatingHours: string;
    staffing: string;
  };
  specialEquipmentRules: {
    coldChainBioSecurity: string;
    luggageScreeningTech: string;
  };
  handlingOfExcessMedication: string;
  i18n?: Record<string, {
    inspectionCharacteristics: string;
    handlingOfExcessMedication: string;
  }>;
}

export interface TravelBagItem {
  slug: string;
  brandName: string;
  genericName: string;
  chineseName: string;
  casNumber?: string;
  status: MedicationStatus;
  channel: CustomsChannel;
  allowanceDaysMax: number;
  userDaysOfSupply: number;
  userDosage: string;
  activeIngredients?: string[];
  redLineWarning?: boolean;
  clearanceProfiles?: ClearanceProfiles;
}
