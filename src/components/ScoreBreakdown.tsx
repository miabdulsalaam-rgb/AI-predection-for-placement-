import React from 'react';
import { calculatePlacementBreakdown } from '../lib/prediction';
import { Student } from '../types/student';
import { Calculator, CheckCircle2, Info, Percent } from 'lucide-react';

interface ScoreBreakdownProps {
  student: Student;
}

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ student }) => {
  const breakdown = calculatePlacementBreakdown(
    student.tenth,
    student.twelfth,
    student.cgpa,
    student.aptitude,
    student.arrears
  );

  const rows = [
    {
      label: '10th Secondary Schooling',
      valueEntered: `${student.tenth}%`,
      formula: `${student.tenth} × 15%`,
      contrib: breakdown.tenthContrib,
      max: 15,
      percentage: (breakdown.tenthContrib / 15) * 100,
      barGradient: 'bg-gradient-to-r from-cyan-500 to-teal-400',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      textColor: 'text-cyan-400',
    },
    {
      label: '12th Higher Secondary / Pre-U',
      valueEntered: `${student.twelfth}%`,
      formula: `${student.twelfth} × 15%`,
      contrib: breakdown.twelfthContrib,
      max: 15,
      percentage: (breakdown.twelfthContrib / 15) * 100,
      barGradient: 'bg-gradient-to-r from-blue-500 to-indigo-400',
      badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      textColor: 'text-blue-400',
    },
    {
      label: 'Undergraduate CGPA Performance',
      valueEntered: `${student.cgpa} / 10.0 (${breakdown.cgpaScore}%)`,
      formula: `(${student.cgpa} ÷ 10 × 100) × 30%`,
      contrib: breakdown.cgpaContrib,
      max: 30,
      percentage: (breakdown.cgpaContrib / 30) * 100,
      barGradient: 'bg-gradient-to-r from-emerald-500 to-teal-400',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      textColor: 'text-emerald-400',
    },
    {
      label: 'Aptitude & Logical Reasoning',
      valueEntered: `${student.aptitude} / 100`,
      formula: `${student.aptitude} × 30%`,
      contrib: breakdown.aptitudeContrib,
      max: 30,
      percentage: (breakdown.aptitudeContrib / 30) * 100,
      barGradient: 'bg-gradient-to-r from-violet-500 to-fuchsia-400',
      badgeColor: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
      textColor: 'text-violet-400',
    },
    {
      label: 'Academic Backlog Standing',
      valueEntered: `${student.arrears} Arrear${student.arrears === 1 ? '' : 's'} (${breakdown.arrearsScore} pts)`,
      formula: `${breakdown.arrearsScore} pts × 10%`,
      contrib: breakdown.arrearsContrib,
      max: 10,
      percentage: (breakdown.arrearsContrib / 10) * 100,
      barGradient: 'bg-gradient-to-r from-amber-500 to-orange-400',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      textColor: 'text-amber-400',
    },
  ];

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              Deterministic Mathematical Breakdown
            </h3>
            <p className="text-xs text-slate-400">
              Precise point contributions calculated from the 5 evaluation dimensions
            </p>
          </div>
        </div>
        <div className="text-xs font-mono text-cyan-300 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 self-start sm:self-auto">
          Final Score = ∑ (Parameter × Weight)
        </div>
      </div>

      {/* Breakdown Rows */}
      <div className="space-y-4">
        {rows.map((row, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-all space-y-2.5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border ${row.badgeColor}`}>
                  {row.max}% WEIGHT
                </span>
                <span className="text-sm font-bold text-white">
                  {row.label}
                </span>
                <span className="text-xs font-mono text-slate-400 hidden md:inline">
                  [{row.valueEntered}]
                </span>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 font-mono">
                <span className="text-xs text-slate-400 hidden lg:inline">
                  {row.formula} =
                </span>
                <span className={`text-sm font-bold ${row.textColor}`}>
                  {row.contrib.toFixed(2)}{' '}
                  <span className="text-xs font-normal text-slate-400">/ {row.max}.0 pts</span>
                </span>
              </div>
            </div>

            {/* Visual Bar */}
            <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-slate-800">
              <div
                className={`${row.barGradient} h-full rounded-full transition-all duration-700 shadow-sm`}
                style={{ width: `${Math.min(100, Math.max(0, row.percentage))}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Total Score Summary Bar */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/40 border border-indigo-500/30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
              Aggregated Composite Placement Score
            </span>
            <p className="text-xs text-slate-300">
              Exact sum of all five weighted parameters normalized to a 100.0 scale
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-2xl sm:text-4xl font-black text-white font-mono tracking-tight">
            {breakdown.finalScore.toFixed(2)}
          </span>
          <span className="text-xs text-indigo-300 font-bold ml-1.5">/ 100.0</span>
        </div>
      </div>
    </div>
  );
};
