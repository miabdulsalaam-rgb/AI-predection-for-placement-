import { CompanyCriteria, CompanyCheckResult } from '../types/company';
import { Student } from '../types/student';

export const INITIAL_COMPANY_CRITERIA: CompanyCriteria[] = [
  {
    id: 'comp-a',
    name: 'Company A',
    tier: 'Dream / Tier 1',
    role: 'Software Development Engineer',
    packageLPA: '10 - 14 LPA',
    tenthMin: 60,
    twelfthMin: 60,
    cgpaMin: 7.0,
    aptitudeMin: 60,
    maxArrears: 0,
    description: 'Requires balanced academics, good problem-solving foundation, and strict zero backlogs policy.',
  },
  {
    id: 'comp-b',
    name: 'Company B',
    tier: 'Super Dream',
    role: 'Full Stack Product Engineer',
    packageLPA: '16 - 22 LPA',
    tenthMin: 65,
    twelfthMin: 65,
    cgpaMin: 7.5,
    aptitudeMin: 70,
    maxArrears: 0,
    description: 'High-growth product company demanding strong analytical dexterity and academic consistency.',
  },
  {
    id: 'comp-c',
    name: 'Company C',
    tier: 'Mass IT Services',
    role: 'Associate Software Consultant',
    packageLPA: '4.5 - 7 LPA',
    tenthMin: 60,
    twelfthMin: 60,
    cgpaMin: 6.5,
    aptitudeMin: 55,
    maxArrears: 1,
    description: 'Enterprise IT services hiring drive with relaxed backlog allowance (up to 1 active arrear permitted).',
  },
  {
    id: 'comp-d',
    name: 'Company D',
    tier: 'Super Dream',
    role: 'AI / Data Platform Specialist',
    packageLPA: '24 - 32 LPA',
    tenthMin: 70,
    twelfthMin: 70,
    cgpaMin: 8.0,
    aptitudeMin: 75,
    maxArrears: 0,
    description: 'Premier tier R&D opportunity requiring top-decile CGPA, deep quantitative rigor, and zero arrears.',
  },
  {
    id: 'comp-core',
    name: 'CoreTech Industries',
    tier: 'Core Engineering',
    role: 'Systems & Embedded Engineer',
    packageLPA: '8 - 12 LPA',
    tenthMin: 65,
    twelfthMin: 65,
    cgpaMin: 7.0,
    aptitudeMin: 60,
    maxArrears: 0,
    description: 'Core engineering solutions requiring clean academic record and practical systems competencies.',
  },
  {
    id: 'comp-fintech',
    name: 'Apex Quant Analytics',
    tier: 'Consulting / Analytics',
    role: 'Business & Quant Analyst',
    packageLPA: '12 - 18 LPA',
    tenthMin: 70,
    twelfthMin: 65,
    cgpaMin: 7.2,
    aptitudeMin: 72,
    maxArrears: 0,
    description: 'Data analytics & consulting consultancy requiring high numerical and verbal aptitude scores.',
  },
];

/**
 * Dynamically compares the student's actual values against each company's benchmark criteria.
 */
export function evaluateCompanyEligibility(
  student: Student,
  companies: CompanyCriteria[] = INITIAL_COMPANY_CRITERIA
): {
  eligibleCompanies: CompanyCheckResult[];
  improvementCompanies: CompanyCheckResult[];
} {
  const eligibleCompanies: CompanyCheckResult[] = [];
  const improvementCompanies: CompanyCheckResult[] = [];

  for (const company of companies) {
    const unmetCriteria: string[] = [];

    if (student.tenth < company.tenthMin) {
      unmetCriteria.push(`10th: ${student.tenth}% (Needs ≥ ${company.tenthMin}%)`);
    }

    if (student.twelfth < company.twelfthMin) {
      unmetCriteria.push(`12th: ${student.twelfth}% (Needs ≥ ${company.twelfthMin}%)`);
    }

    if (student.cgpa < company.cgpaMin) {
      unmetCriteria.push(`CGPA: ${student.cgpa} (Needs ≥ ${company.cgpaMin})`);
    }

    if (student.aptitude < company.aptitudeMin) {
      unmetCriteria.push(`Aptitude: ${student.aptitude} (Needs ≥ ${company.aptitudeMin})`);
    }

    if (student.arrears > company.maxArrears) {
      unmetCriteria.push(
        `Arrears: ${student.arrears} (Max allowed: ${company.maxArrears} ${company.maxArrears === 0 ? '- strictly zero' : ''})`
      );
    }

    const checkResult: CompanyCheckResult = {
      company,
      isEligible: unmetCriteria.length === 0,
      unmetCriteria,
    };

    if (checkResult.isEligible) {
      eligibleCompanies.push(checkResult);
    } else {
      improvementCompanies.push(checkResult);
    }
  }

  return { eligibleCompanies, improvementCompanies };
}
