import { ScoreBreakdownDetail } from '../types/student';

/**
 * Calculates the Arrear Score component according to rules:
 * 0 arrears = 100
 * 1 arrear = 70
 * 2 arrears = 45
 * 3 arrears = 25
 * 4+ arrears = 0
 */
export function calculateArrearsScore(arrears: number): number {
  if (arrears <= 0) return 100;
  if (arrears === 1) return 70;
  if (arrears === 2) return 45;
  if (arrears === 3) return 25;
  return 0;
}

/**
 * Calculates complete placement readiness score and breakdown:
 * 10th percentage = 15%
 * 12th percentage = 15%
 * CGPA = 30% [converted via: (CGPA / 10) * 100]
 * Aptitude = 30%
 * Arrears = 10%
 *
 * Total = (10th * 0.15) + (12th * 0.15) + (CGPA Score * 0.30) + (Aptitude * 0.30) + (Arrear Score * 0.10)
 * Result rounded to 2 decimal places.
 */
export function calculatePlacementBreakdown(
  tenth: number,
  twelfth: number,
  cgpa: number,
  aptitude: number,
  arrears: number
): ScoreBreakdownDetail {
  const tenthContrib = Number((tenth * 0.15).toFixed(2));
  const twelfthContrib = Number((twelfth * 0.15).toFixed(2));

  const cgpaScore = Number(((cgpa / 10) * 100).toFixed(2));
  const cgpaContrib = Number((cgpaScore * 0.30).toFixed(2));

  const aptitudeContrib = Number((aptitude * 0.30).toFixed(2));

  const arrearsScore = calculateArrearsScore(arrears);
  const arrearsContrib = Number((arrearsScore * 0.10).toFixed(2));

  const rawSum = tenthContrib + twelfthContrib + cgpaContrib + aptitudeContrib + arrearsContrib;
  const finalScore = Number(rawSum.toFixed(2));

  return {
    tenthContrib,
    twelfthContrib,
    cgpaContrib,
    aptitudeContrib,
    arrearsContrib,
    cgpaScore,
    arrearsScore,
    finalScore: Math.min(100, Math.max(0, finalScore)),
  };
}

export function calculatePlacementScore(
  tenth: number,
  twelfth: number,
  cgpa: number,
  aptitude: number,
  arrears: number
): number {
  return calculatePlacementBreakdown(tenth, twelfth, cgpa, aptitude, arrears).finalScore;
}
