export interface CompanyCriteria {
  id: string;
  name: string;
  tier: 'Dream / Tier 1' | 'Super Dream' | 'Core Engineering' | 'Mass IT Services' | 'Consulting / Analytics';
  role: string;
  packageLPA: string;
  tenthMin: number;
  twelfthMin: number;
  cgpaMin: number;
  aptitudeMin: number;
  maxArrears: number;
  description: string;
}

export interface CompanyCheckResult {
  company: CompanyCriteria;
  isEligible: boolean;
  unmetCriteria: string[];
}
