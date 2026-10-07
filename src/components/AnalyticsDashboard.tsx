import React, { useState } from 'react';
import { Student } from '../types/student';
import {
  Users,
  CheckCircle2,
  Award,
  AlertTriangle,
  XCircle,
  TrendingUp,
  BarChart3,
  GraduationCap,
  Plus,
  Sparkles,
  Zap,
  ScatterChart,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  students: Student[];
  onAddStudent: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  students,
  onAddStudent,
}) => {
  const [hoveredStudent, setHoveredStudent] = useState<Student | null>(null);

  if (students.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 sm:p-14 text-center shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-indigo-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          No candidate analytics available yet.
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Cohort analytics and correlation graphs are generated dynamically from recorded student evaluations.
        </p>
        <button
          onClick={onAddStudent}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Evaluate First Candidate</span>
        </button>
      </div>
    );
  }

  const total = students.length;
  const highlyEligible = students.filter((s) => s.eligibility === 'HIGHLY ELIGIBLE').length;
  const eligible = students.filter((s) => s.eligibility === 'ELIGIBLE').length;
  const partiallyEligible = students.filter((s) => s.eligibility === 'PARTIALLY ELIGIBLE').length;
  const notEligible = students.filter((s) => s.eligibility === 'NOT CURRENTLY ELIGIBLE').length;

  const totalScoreSum = students.reduce((acc, s) => acc + s.placementScore, 0);
  const avgPlacementScore = Number((totalScoreSum / total).toFixed(2));

  const totalCgpaSum = students.reduce((acc, s) => acc + s.cgpa, 0);
  const avgCgpa = Number((totalCgpaSum / total).toFixed(2));

  const totalAptitudeSum = students.reduce((acc, s) => acc + s.aptitude, 0);
  const avgAptitude = Number((totalAptitudeSum / total).toFixed(2));

  const totalProbSum = students.reduce((acc, s) => acc + s.probability, 0);
  const avgProbability = Math.round(totalProbSum / total);

  return (
    <div className="space-y-8">
      {/* Top Level Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3.5">
        {/* Total Candidates */}
        <div className="bg-slate-900/80 border border-indigo-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-indigo-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Cohort Total</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {total}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">Candidates Recorded</div>
          </div>
        </div>

        {/* Highly Eligible */}
        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-emerald-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Highly Eligible</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-emerald-300 font-mono">
              {highlyEligible}
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-0.5 font-mono">
              {Math.round((highlyEligible / total) * 100)}% of Cohort
            </div>
          </div>
        </div>

        {/* Eligible */}
        <div className="bg-blue-950/30 border border-blue-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-blue-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Eligible</span>
            <Award className="w-4 h-4 text-blue-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-blue-300 font-mono">
              {eligible}
            </div>
            <div className="text-[11px] text-blue-400/80 mt-0.5 font-mono">
              {Math.round((eligible / total) * 100)}% of Cohort
            </div>
          </div>
        </div>

        {/* Partially Eligible */}
        <div className="bg-amber-950/30 border border-amber-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-amber-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Partially Eligible</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">
              {partiallyEligible}
            </div>
            <div className="text-[11px] text-amber-400/80 mt-0.5 font-mono">
              {Math.round((partiallyEligible / total) * 100)}% of Cohort
            </div>
          </div>
        </div>

        {/* Not Eligible */}
        <div className="bg-rose-950/30 border border-rose-500/40 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-rose-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Not Eligible</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-rose-300 font-mono">
              {notEligible}
            </div>
            <div className="text-[11px] text-rose-400/80 mt-0.5 font-mono">
              {Math.round((notEligible / total) * 100)}% of Cohort
            </div>
          </div>
        </div>

        {/* Avg Score */}
        <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-md">
          <div className="flex items-center justify-between text-cyan-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg Score</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {avgPlacementScore}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Out of 100.0 pts</div>
          </div>
        </div>

        {/* Avg CGPA */}
        <div className="bg-slate-900/80 border border-violet-500/30 rounded-2xl p-4 flex flex-col justify-between shadow-md col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-violet-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Avg CGPA</span>
            <GraduationCap className="w-4 h-4 text-violet-400" />
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono">
              {avgCgpa}
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 font-mono">Out of 10.0 scale</div>
          </div>
        </div>
      </div>

      {/* Cohort Eligibility Distribution Stacked Visualizer */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Cohort Eligibility Composition
            </h3>
            <p className="text-xs text-slate-400">
              Proportional distribution of candidate tiers computed dynamically
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-xl border border-cyan-800/60 self-start sm:self-auto">
            N = {total} CANDIDATES
          </span>
        </div>

        {/* Colorful Stacked Progress Bar */}
        <div className="w-full bg-slate-950 rounded-2xl h-6 p-1 flex overflow-hidden border border-slate-800 gap-1.5 shadow-inner">
          {highlyEligible > 0 && (
            <div
              style={{ width: `${(highlyEligible / total) * 100}%` }}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 rounded-xl transition-all shadow-sm"
              title={`Highly Eligible: ${highlyEligible}`}
            />
          )}
          {eligible > 0 && (
            <div
              style={{ width: `${(eligible / total) * 100}%` }}
              className="bg-gradient-to-r from-blue-500 to-indigo-400 rounded-xl transition-all shadow-sm"
              title={`Eligible: ${eligible}`}
            />
          )}
          {partiallyEligible > 0 && (
            <div
              style={{ width: `${(partiallyEligible / total) * 100}%` }}
              className="bg-gradient-to-r from-amber-500 to-orange-400 rounded-xl transition-all shadow-sm"
              title={`Partially Eligible: ${partiallyEligible}`}
            />
          )}
          {notEligible > 0 && (
            <div
              style={{ width: `${(notEligible / total) * 100}%` }}
              className="bg-gradient-to-r from-rose-500 to-pink-500 rounded-xl transition-all shadow-sm"
              title={`Not Currently Eligible: ${notEligible}`}
            />
          )}
        </div>

        {/* Legend */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Highly Eligible</div>
              <div className="text-[11px] text-emerald-300 font-mono">
                {highlyEligible} ({Math.round((highlyEligible / total) * 100)}%)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Eligible</div>
              <div className="text-[11px] text-blue-300 font-mono">
                {eligible} ({Math.round((eligible / total) * 100)}%)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Partially Eligible</div>
              <div className="text-[11px] text-amber-300 font-mono">
                {partiallyEligible} ({Math.round((partiallyEligible / total) * 100)}%)
              </div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex items-center gap-3">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white">Not Eligible</div>
              <div className="text-[11px] text-rose-300 font-mono">
                {notEligible} ({Math.round((notEligible / total) * 100)}%)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CGPA vs Aptitude Interactive Scatter Visualization (INSPO HIGHLIGHT) */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-violet-400 uppercase tracking-wider mb-1">
              <Zap className="w-3.5 h-3.5" />
              Cohort Correlation Matrix
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">
              Undergraduate CGPA vs. Aptitude Correlation
            </h3>
            <p className="text-xs text-slate-400">
              Hover over candidate points to inspect individual academic profiles
            </p>
          </div>

          {hoveredStudent && (
            <div className="p-2.5 rounded-xl bg-slate-950 border border-indigo-500/40 text-xs text-white flex items-center gap-3 shadow-lg">
              <span className="font-bold text-indigo-300">{hoveredStudent.name}</span>
              <span className="text-slate-400">CGPA: <strong className="text-emerald-400 font-mono">{hoveredStudent.cgpa}</strong></span>
              <span className="text-slate-400">Apt: <strong className="text-violet-400 font-mono">{hoveredStudent.aptitude}%</strong></span>
              <span className="text-slate-400">Score: <strong className="text-cyan-400 font-mono">{hoveredStudent.placementScore.toFixed(1)}</strong></span>
            </div>
          )}
        </div>

        {/* 2D Coordinate Grid */}
        <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-slate-800 p-6 overflow-hidden">
          {/* Grid lines */}
          <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 pointer-events-none opacity-20">
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-r border-b border-slate-600" />
            <div className="border-b border-slate-600" />
            <div className="border-r border-slate-600" />
            <div className="border-r border-slate-600" />
            <div className="border-r border-slate-600" />
            <div className="" />
          </div>

          {/* Threshold marker lines (CGPA=7.5 & Aptitude=70) */}
          <div
            className="absolute left-0 right-0 border-t border-dashed border-emerald-500/30"
            style={{ bottom: `${(70 / 100) * 100}%` }}
            title="Tier 1 Aptitude Cut-off (70%)"
          />
          <div
            className="absolute top-0 bottom-0 border-l border-dashed border-emerald-500/30"
            style={{ left: `${(7.5 / 10) * 100}%` }}
            title="Tier 1 CGPA Cut-off (7.5)"
          />

          {/* Axis Labels */}
          <div className="absolute bottom-2 left-4 text-[10px] font-mono text-slate-500">
            CGPA 0.0 →
          </div>
          <div className="absolute bottom-2 right-4 text-[10px] font-mono text-slate-500">
            → CGPA 10.0
          </div>
          <div className="absolute top-2 left-4 text-[10px] font-mono text-slate-500">
            ↑ Aptitude 100%
          </div>

          {/* Student Coordinate Nodes */}
          {students.map((s) => {
            const xPercent = Math.min(95, Math.max(5, (s.cgpa / 10) * 100));
            const yPercent = Math.min(95, Math.max(5, (s.aptitude / 100) * 100));
            const colorClass =
              s.eligibility === 'HIGHLY ELIGIBLE'
                ? 'bg-emerald-400 ring-emerald-500/50'
                : s.eligibility === 'ELIGIBLE'
                ? 'bg-blue-400 ring-blue-500/50'
                : s.eligibility === 'PARTIALLY ELIGIBLE'
                ? 'bg-amber-400 ring-amber-500/50'
                : 'bg-rose-400 ring-rose-500/50';

            return (
              <button
                key={s.id}
                onMouseEnter={() => setHoveredStudent(s)}
                onMouseLeave={() => setHoveredStudent(null)}
                style={{ left: `${xPercent}%`, bottom: `${yPercent}%` }}
                className={`absolute w-3.5 h-3.5 -ml-1.5 -mb-1.5 rounded-full ${colorClass} ring-4 transition-all duration-200 hover:scale-150 cursor-pointer shadow-lg`}
                title={`${s.name}: CGPA ${s.cgpa}, Aptitude ${s.aptitude}% (${s.eligibility})`}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
