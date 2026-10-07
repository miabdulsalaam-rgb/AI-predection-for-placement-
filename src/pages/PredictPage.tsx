import React from 'react';
import { StudentForm } from '../components/StudentForm';
import { Student } from '../types/student';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

interface PredictPageProps {
  onEvaluationComplete: (student: Student) => void;
  onCancel: () => void;
}

export const PredictPage: React.FC<PredictPageProps> = ({
  onEvaluationComplete,
  onCancel,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-2 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-cyan-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-bold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Candidate Evaluation Portal</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Evaluate Candidate Placement Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Input your academic metrics to generate an instant composite readiness score, company eligibility breakdown, and strategic career recommendations.
        </p>
      </div>

      {/* Form Container */}
      <StudentForm
        onSubmitSuccess={onEvaluationComplete}
        onCancel={onCancel}
      />
    </div>
  );
};
