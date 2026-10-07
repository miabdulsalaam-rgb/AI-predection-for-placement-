import { Student } from '../types/student';

/**
 * Generates an executive career insight narrative dynamically derived
 * from the student's actual metrics.
 *
 * Explicitly branded as: AI-Assisted Rule-Based Prediction
 * (Zero fabricated ML training claims)
 */
export function generateCareerInsight(student: Student): {
  badge: string;
  summary: string;
  keyStrengths: string[];
  keyBottlenecks: string[];
  strategicAdvice: string;
  targetRecruiterTier: string;
} {
  const strengths: string[] = [];
  const bottlenecks: string[] = [];

  // Evaluate CGPA
  if (student.cgpa >= 8.5) {
    strengths.push(`Exceptional cumulative academic grade point average (${student.cgpa}/10).`);
  } else if (student.cgpa >= 7.5) {
    strengths.push(`Strong academic consistency with a competitive ${student.cgpa} CGPA.`);
  } else if (student.cgpa < 6.5) {
    bottlenecks.push(`Current CGPA (${student.cgpa}) is below the standard 6.5 eligibility threshold for premier drives.`);
  }

  // Evaluate Aptitude
  if (student.aptitude >= 80) {
    strengths.push(`Advanced aptitude competence (${student.aptitude}%), ensuring high pass rates in preliminary Online Assessments (OAs).`);
  } else if (student.aptitude < 60) {
    bottlenecks.push(`Aptitude proficiency (${student.aptitude}%) requires immediate elevation to clear round-1 screening gates.`);
  }

  // Evaluate Arrears
  if (student.arrears === 0) {
    strengths.push('Clean academic record with zero standing arrears, meeting all institutional placement clearance mandates.');
  } else {
    bottlenecks.push(`${student.arrears} active backlog${student.arrears > 1 ? 's' : ''} currently blocks tier-1 company applications.`);
  }

  // Evaluate 10th & 12th
  if (student.tenth >= 85 && student.twelfth >= 85) {
    strengths.push('Impeccable foundational schooling history (85%+ in both 10th and 12th).');
  } else {
    if (student.tenth < 60) bottlenecks.push(`10th score (${student.tenth}%) is below 60% baseline criteria.`);
    if (student.twelfth < 60) bottlenecks.push(`12th score (${student.twelfth}%) is below 60% baseline criteria.`);
  }

  // Narrative synthesis
  let summary = '';
  if (student.eligibility === 'HIGHLY ELIGIBLE') {
    summary = `Your profile demonstrates outstanding overall balance with a high Placement Readiness Score of ${student.placementScore}/100 and estimated probability of ${student.probability}%. With strong CGPA (${student.cgpa}) and high aptitude (${student.aptitude}%), you are exceptionally well positioned for competitive on-campus drives.`;
  } else if (student.eligibility === 'ELIGIBLE') {
    summary = `Your profile establishes solid readiness with a Placement Readiness Score of ${student.placementScore}/100 and estimated probability of ${student.probability}%. You satisfy prerequisites for mass and select tier-1 hiring partners, though minor optimization in ${student.aptitude < 70 ? 'aptitude drills' : 'academic consistency'} will unlock higher salary bands.`;
  } else if (student.eligibility === 'PARTIALLY ELIGIBLE') {
    summary = `Your profile shows viable potential with a composite score of ${student.placementScore}/100, but is constrained by specific filter barriers (${bottlenecks[0] || 'sub-optimal marks'}). Addressing these bottlenecks will transition your profile into the fully eligible cohort.`;
  } else {
    summary = `Your current Placement Readiness Score of ${student.placementScore}/100 places you below the active campus drive threshold. Immediate remediation is required—principally clearing active backlogs and mastering core aptitude reasoning—to qualify for upcoming recruitment windows.`;
  }

  // Strategic advice
  let strategicAdvice = '';
  if (student.arrears > 0) {
    strategicAdvice = 'Immediate priority: Focus 70% of your current academic bandwidth on clearing standing arrears in the next immediate cycle. Concurrently, maintain daily aptitude practice so you are test-ready the moment backlogs are cleared.';
  } else if (student.aptitude < 65) {
    strategicAdvice = 'Your main growth lever is aptitude acceleration. Spend 1 hour every evening solving quantitative questions (speed math, percentages, time & work) and algorithmic reasoning puzzles.';
  } else if (student.cgpa < 7.5) {
    strategicAdvice = 'Your foundational aptitude is viable. Channel your effort into maximizing upcoming semester GPA while building 2 standout full-stack or core technical projects to bolster your resume.';
  } else {
    strategicAdvice = 'Your profile is prime. Shift focus to advanced Data Structures & Algorithms (DSA), System Design fundamentals, and behavioral interview leadership stories to maximize offer packages.';
  }

  // Target recruiter tier
  let targetRecruiterTier = 'Mass IT Services (4 - 7 LPA)';
  if (student.eligibility === 'HIGHLY ELIGIBLE') {
    targetRecruiterTier = 'Super Dream & Tier 1 Product Tech (14 - 30+ LPA)';
  } else if (student.eligibility === 'ELIGIBLE') {
    targetRecruiterTier = 'Tier 1 Tech & Core Engineering (7 - 14 LPA)';
  } else if (student.eligibility === 'PARTIALLY ELIGIBLE') {
    targetRecruiterTier = 'Startups, Specialized Service Providers & Off-Campus (3.5 - 6 LPA)';
  } else {
    targetRecruiterTier = 'Academic Clearance & Remedial Preparation Required';
  }

  return {
    badge: 'AI-Assisted Rule-Based Prediction',
    summary,
    keyStrengths: strengths.length > 0 ? strengths : ['Consistent willingness to evaluate profile metrics.'],
    keyBottlenecks: bottlenecks.length > 0 ? bottlenecks : ['No critical bottlenecks identified.'],
    strategicAdvice,
    targetRecruiterTier,
  };
}
