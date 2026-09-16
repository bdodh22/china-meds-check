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
