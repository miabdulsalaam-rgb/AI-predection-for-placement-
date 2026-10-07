/**
 * Calculates estimated placement probability dynamically from the student's placement score.
 *
 * Ranges defined:
 * Score >= 85 → 90–95%
 * Score >= 75 → 75–89%
 * Score >= 65 → 60–74%
 * Score >= 50 → 40–59%
 * Score < 50  → 20–39%
 */
export function calculateProbability(score: number): number {
  if (score >= 85) {
    // 85 -> 90%, 100 -> 95%
    const normalized = Math.min(1, Math.max(0, (score - 85) / 15));
    return Math.round(90 + normalized * 5);
  }

  if (score >= 75) {
    // 75 -> 75%, 84.99 -> 89%
    const normalized = Math.min(0.99, Math.max(0, (score - 75) / 10));
    return Math.round(75 + normalized * 14);
  }

  if (score >= 65) {
    // 65 -> 60%, 74.99 -> 74%
    const normalized = Math.min(0.99, Math.max(0, (score - 65) / 10));
    return Math.round(60 + normalized * 14);
  }

  if (score >= 50) {
    // 50 -> 40%, 64.99 -> 59%
    const normalized = Math.min(0.99, Math.max(0, (score - 50) / 15));
    return Math.round(40 + normalized * 19);
  }

  // < 50: 0 -> 20%, 49.99 -> 39%
  const normalized = Math.min(0.99, Math.max(0, score / 50));
  return Math.round(20 + normalized * 19);
}

export const PROBABILITY_DISCLAIMER =
  'This is a project-based prediction estimate and is not a guarantee of placement.';
