import React, { useEffect } from 'react';
import { Student } from '../types/student';
import { ScoreCard } from '../components/ScoreCard';
import { ScoreBreakdown } from '../components/ScoreBreakdown';
import { RecommendationCard } from '../components/RecommendationCard';
import { CompanyCard } from '../components/CompanyCard';
import { CareerInsightCard } from '../components/CareerInsightCard';
import { generateRecommendations } from '../lib/recommendations';
import { evaluateCompanyEligibility } from '../lib/companyData';
import confetti from 'canvas-confetti';
import {
  User,
  GraduationCap,
  Calendar,
  RotateCcw,
  Users,
  Printer,
  Sparkles,
  Share2,
  Brain,
  ShieldAlert,
  Award,
} from 'lucide-react';

interface ResultPageProps {
  student: Student;
  onAnalyzeAnother: () => void;
  onViewAllRecords: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({
  student,
  onAnalyzeAnother,
  onViewAllRecords,
}) => {
  // Trigger celebratory confetti if Highly Eligible or Eligible with high score
  useEffect(() => {
    if (student.eligibility === 'HIGHLY ELIGIBLE') {
      try {
        confetti({
          particleCount: 90,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#10b981', '#6366f1', '#06b6d4', '#f59e0b', '#ec4899'],
        });
      } catch {
        // Fallback silently if canvas-confetti is unavailable
      }
    }
  }, [student]);

  const recommendations = generateRecommendations(student);
  const { eligibleCompanies, improvementCompanies } = evaluateCompanyEligibility(student);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
      {/* Top Banner Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            Candidate Dossier #{student.id.toString().slice(-6)}
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Placement Readiness Dossier
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Print Report</span>
          </button>

          <button
            onClick={onViewAllRecords}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer"
          >
            <Users className="w-4 h-4 text-indigo-400" />
            <span>View All Registry</span>
          </button>

          <button
            onClick={onAnalyzeAnother}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Evaluate Another Student</span>
          </button>
        </div>
      </div>

      {/* 1. STUDENT IDENTITY METRICS GRID */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-800 mb-5">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Evaluated Candidate Parameters
            </h3>
            <p className="text-xs text-slate-400">
              Verified inputs contributing to the current eligibility tier and readiness score
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-center font-mono">
          {/* Candidate Name */}
          <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/90 flex flex-col justify-between">
            <span className="text-[11px] text-slate-400 font-sans font-semibold block mb-1">
              Candidate Name
            </span>
            <span className="text-sm sm:text-base font-bold text-white truncate block">
              {student.name}
            </span>
          </div>

          {/* 10th */}
          <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
            <span className="text-[11px] text-cyan-400 font-sans font-semibold block mb-1">
              10th Standard
            </span>
            <span className="text-base sm:text-lg font-black text-cyan-300 block">
              {student.tenth}%
            </span>
          </div>

          {/* 12th */}
          <div className="p-4 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between">
            <span className="text-[11px] text-blue-400 font-sans font-semibold block mb-1">
              12th Standard
            </span>
            <span className="text-base sm:text-lg font-black text-blue-300 block">
              {student.twelfth}%
            </span>
          </div>

          {/* CGPA */}
          <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
            <span className="text-[11px] text-emerald-400 font-sans font-semibold block mb-1">
              UG CGPA
            </span>
            <span className="text-base sm:text-lg font-black text-emerald-300 block">
              {student.cgpa} <span className="text-xs text-emerald-400/70">/ 10</span>
            </span>
          </div>

          {/* Aptitude */}
          <div className="p-4 rounded-2xl bg-violet-950/20 border border-violet-500/30 flex flex-col justify-between">
            <span className="text-[11px] text-violet-400 font-sans font-semibold block mb-1">
              Aptitude Score
            </span>
            <span className="text-base sm:text-lg font-black text-violet-300 block">
              {student.aptitude}%
            </span>
          </div>

          {/* Arrears */}
          <div className={`p-4 rounded-2xl flex flex-col justify-between border ${
            student.arrears === 0
              ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              : 'bg-rose-950/20 border-rose-500/30 text-rose-300'
          }`}>
            <span className="text-[11px] font-sans font-semibold block mb-1 text-slate-300">
              Standing Arrears
            </span>
            <span className="text-base sm:text-lg font-black block">
              {student.arrears} {student.arrears === 0 ? 'Clear' : 'Backlog'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PLACEMENT READINESS & PROBABILITY GAUGE */}
      <ScoreCard
        placementScore={student.placementScore}
        probability={student.probability}
        eligibility={student.eligibility}
        studentName={student.name}
      />

      {/* 3. DETAILED SCORE BREAKDOWN */}
      <ScoreBreakdown student={student} />

      {/* 4. AI-ASSISTED CAREER INSIGHT */}
      <CareerInsightCard student={student} />

      {/* 5. DYNAMIC RECOMMENDATIONS */}
      <RecommendationCard recommendations={recommendations} />

      {/* 6. COMPANY ELIGIBILITY MATRIX */}
      <CompanyCard
        eligibleCompanies={eligibleCompanies}
        improvementCompanies={improvementCompanies}
      />

      {/* Bottom Actions */}
      <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
        <p className="text-xs text-slate-400">
          This record is persisted in browser local storage (<code className="text-slate-300">placementStudents</code>).
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={onAnalyzeAnother}
            className="px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
          >
            Evaluate Another Candidate
          </button>
        </div>
      </div>
    </div>
  );
};
