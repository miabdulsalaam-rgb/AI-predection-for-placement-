import { EligibilityCategory } from '../types/student';

/**
 * Determines eligibility tier based on exact project specifications:
 *
 * HIGHLY ELIGIBLE:
 * Placement Score >= 80 && CGPA >= 7.5 && Aptitude >= 70 && Arrears == 0
 *
 * ELIGIBLE:
 * Placement Score >= 65 && CGPA >= 6.5 && Aptitude >= 55 && Arrears <= 1
 *
 * PARTIALLY ELIGIBLE:
 * Placement Score >= 50
 *
 * NOT CURRENTLY ELIGIBLE:
 * Placement Score < 50
 */
export function determineEligibility(
  placementScore: number,
  cgpa: number,
  aptitude: number,
  arrears: number
): EligibilityCategory {
  if (
    placementScore >= 80 &&
    cgpa >= 7.5 &&
    aptitude >= 70 &&
    arrears === 0
  ) {
    return 'HIGHLY ELIGIBLE';
  }

  if (
    placementScore >= 65 &&
    cgpa >= 6.5 &&
    aptitude >= 55 &&
    arrears <= 1
  ) {
    return 'ELIGIBLE';
  }

  if (placementScore >= 50) {
    return 'PARTIALLY ELIGIBLE';
  }

  return 'NOT CURRENTLY ELIGIBLE';
}

export interface EligibilityMeta {
  color: string;
  bg: string;
  border: string;
  badgeBg: string;
  description: string;
}

export function getEligibilityMeta(eligibility: string): EligibilityMeta {
  switch (eligibility) {
    case 'HIGHLY ELIGIBLE':
      return {
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/40',
        border: 'border-emerald-500/30',
        badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        description: 'Meets elite institutional & product company criteria with zero active arrears.',
      };
    case 'ELIGIBLE':
      return {
        color: 'text-blue-400',
        bg: 'bg-blue-950/40',
        border: 'border-blue-500/30',
        badgeBg: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        description: 'Qualifies for standard on-campus recruitment and premier IT/Tech hiring drives.',
      };
    case 'PARTIALLY ELIGIBLE':
      return {
        color: 'text-amber-400',
        bg: 'bg-amber-950/40',
        border: 'border-amber-500/30',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        description: 'Meets foundational criteria but has specific bottlenecks (CGPA, aptitude, or backlogs).',
      };
    default:
      return {
        color: 'text-rose-400',
        bg: 'bg-rose-950/40',
        border: 'border-rose-500/30',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        description: 'Falls below current baseline cut-offs. Requires focused remedial action plan.',
      };
  }
}
