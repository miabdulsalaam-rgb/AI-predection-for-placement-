import React from 'react';
import { Student } from '../types/student';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';
import { BarChart3, Sparkles } from 'lucide-react';

interface DashboardPageProps {
  students: Student[];
  onAddStudent: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  students,
  onAddStudent,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
          <BarChart3 className="w-3.5 h-3.5" />
          Real-Time Cohort Analytics
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Cohort Placement Intelligence
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Aggregated cohort performance metrics, tier distribution, and CGPA vs. Aptitude correlation calculated dynamically.
        </p>
      </div>

      <AnalyticsDashboard
        students={students}
        onAddStudent={onAddStudent}
      />
    </div>
  );
};
