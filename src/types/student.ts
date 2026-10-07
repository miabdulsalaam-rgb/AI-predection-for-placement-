export interface Student {
  id: number;
  name: string;
  tenth: number;
  twelfth: number;
  cgpa: number;
  aptitude: number;
  arrears: number;
  placementScore: number;
  probability: number;
  eligibility: string;
  createdAt: string;
}

export type EligibilityCategory =
  | 'HIGHLY ELIGIBLE'
  | 'ELIGIBLE'
  | 'PARTIALLY ELIGIBLE'
  | 'NOT CURRENTLY ELIGIBLE';

export interface ScoreBreakdownDetail {
  tenthContrib: number; // max 15
  twelfthContrib: number; // max 15
  cgpaContrib: number; // max 30
  aptitudeContrib: number; // max 30
  arrearsContrib: number; // max 10
  cgpaScore: number; // (cgpa / 10) * 100
  arrearsScore: number; // 100, 70, 45, 25, 0
  finalScore: number; // 0 - 100
}

export interface StudentFormData {
  name: string;
  tenth: string;
  twelfth: string;
  cgpa: string;
  aptitude: string;
  arrears: string;
}

export interface FormValidationErrors {
  name?: string;
  tenth?: string;
  twelfth?: string;
  cgpa?: string;
  aptitude?: string;
  arrears?: string;
}
