import { Student } from '../types/student';

export interface RecommendationItem {
  id: string;
  type: 'strength' | 'critical' | 'improvement' | 'guidance';
  title: string;
  message: string;
  actionItem?: string;
}

/**
 * Dynamically generates recommendations tailored strictly to the user's actual inputs.
 * Follows all project guidelines and exact text specifications.
 */
export function generateRecommendations(student: Student): RecommendationItem[] {
  const recommendations: RecommendationItem[] = [];

  // Arrears recommendations
  if (student.arrears > 0) {
    recommendations.push({
      id: 'arrears-warning',
      type: 'critical',
      title: 'Backlog Clearance Priority',
      message: 'Clearing your arrears can significantly improve your placement eligibility.',
      actionItem: 'Register for supplementary/re-evaluation exams immediately. Most Tier-1 recruiters maintain an unbending zero-standing-arrears cutoff.',
    });
  } else {
    recommendations.push({
      id: 'arrears-clean',
      type: 'strength',
      title: 'Pristine Academic Standing',
      message: 'Zero active arrears ensures you pass all preliminary campus recruitment eligibility screenings without administrative flags.',
    });
  }

  // Aptitude recommendations
  if (student.aptitude < 60) {
    recommendations.push({
      id: 'aptitude-low',
      type: 'improvement',
      title: 'Aptitude Enhancement Required',
      message: 'Your aptitude score is currently low. Focus on quantitative aptitude, logical reasoning and verbal reasoning.',
      actionItem: 'Dedicate 45 minutes daily to speed-math, syllogisms, and data interpretation drills on platforms like IndiaBIX or GeeksforGeeks.',
    });
  } else if (student.aptitude >= 80) {
    recommendations.push({
      id: 'aptitude-high',
      type: 'strength',
      title: 'High Aptitude Proficiency',
      message: 'Your aptitude performance is a strong part of your placement profile.',
      actionItem: 'Leverage this strength to clear competitive first-round online assessments (OA) for premium product companies.',
    });
  } else {
    recommendations.push({
      id: 'aptitude-moderate',
      type: 'guidance',
      title: 'Moderate Aptitude Foundation',
      message: 'Your aptitude score is in a solid intermediate bracket (60–79%). Pushing above 80% will unlock Super Dream test rounds.',
    });
  }

  // CGPA recommendations
  if (student.cgpa < 7.0) {
    recommendations.push({
      id: 'cgpa-low',
      type: 'improvement',
      title: 'CGPA Elevation Plan',
      message: 'Improving your CGPA may help you qualify for more placement opportunities.',
      actionItem: 'Focus on upcoming semester coursework and internal assessments to bring your cumulative aggregate across the 7.0 benchmark.',
    });
  } else if (student.cgpa >= 8.0) {
    recommendations.push({
      id: 'cgpa-high',
      type: 'strength',
      title: 'Strong Academic Record',
      message: 'Your CGPA is a strong point in your profile.',
      actionItem: 'Maintain your current study discipline to safeguard your rank through the final semester.',
    });
  } else {
    recommendations.push({
      id: 'cgpa-moderate',
      type: 'guidance',
      title: 'Good CGPA Standing',
      message: 'Your CGPA qualifies for standard recruitment. Aim for 7.5+ to clear elite tier cutoffs with no friction.',
    });
  }

  // 10th marks recommendations
  if (student.tenth < 60) {
    recommendations.push({
      id: 'tenth-low',
      type: 'guidance',
      title: 'Secondary School Aggregate',
      message: 'Some recruiters may have minimum academic requirements for 10th marks.',
      actionItem: 'Target mass-drive recruiters and startups that weigh hands-on technical skills and live projects over secondary school percentages.',
    });
  }

  // 12th marks recommendations
  if (student.twelfth < 60) {
    recommendations.push({
      id: 'twelfth-low',
      type: 'guidance',
      title: 'Higher Secondary Aggregate',
      message: 'Improving your academic profile may increase your eligibility for some recruiters.',
      actionItem: 'Compensate with industry-recognized certifications, GitHub portfolios, and competitive coding ratings.',
    });
  }

  // Overall Placement score synergy
  if (student.placementScore >= 80) {
    recommendations.push({
      id: 'overall-elite',
      type: 'strength',
      title: 'Ready for Super Dream Drives',
      message: 'Your composite score places you in the upper placement readiness tier. Prioritize Data Structures, System Design, and mock interviews.',
    });
  } else if (student.placementScore < 50) {
    recommendations.push({
      id: 'overall-alert',
      type: 'critical',
      title: 'Comprehensive Turnaround Needed',
      message: 'Your overall score indicates a high risk of preliminary screening disqualification. Focus concurrently on clearing backlogs and boosting aptitude.',
    });
  }

  return recommendations;
}
