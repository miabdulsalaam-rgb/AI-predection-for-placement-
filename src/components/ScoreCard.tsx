import React from 'react';
import { EligibilityBadge } from './EligibilityBadge';
import { PROBABILITY_DISCLAIMER } from '../lib/probability';
import { Award, TrendingUp, Info, Sparkles, CheckCircle2 } from 'lucide-react';

interface ScoreCardProps {
  placementScore: number;
  probability: number;
  eligibility: string;
  studentName: string;
}

export const ScoreCard: React.FC<ScoreCardProps> = ({
  placementScore,
  probability,
  eligibility,
  studentName,
}) => {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const scoreOffset = circumference - (placementScore / 100) * circumference;
  const probOffset = circumference - (probability / 100) * circumference;

  const getTierColor = (score: number) => {
    if (score >= 80) return {
      stroke: '#10b981',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      border: 'border-emerald-500/40',
      text: 'text-emerald-400',
    };
    if (score >= 65) return {
      stroke: '#3b82f6',
      gradient: 'from-blue-500/20 via-indigo-500/10 to-transparent',
      border: 'border-blue-500/40',
      text: 'text-blue-400',
    };
    if (score >= 50) return {
      stroke: '#f59e0b',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'border-amber-500/40',
      text: 'text-amber-400',
    };
    return {
      stroke: '#f43f5e',
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      border: 'border-rose-500/40',
      text: 'text-rose-400',
    };
  };

  const tierTheme = getTierColor(placementScore);

  return (
    <div className={`relative bg-gradient-to-br ${tierTheme.gradient} bg-slate-950 border ${tierTheme.border} rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden`}>
      {/* Background ambient lighting */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
        {/* Main Score Left / Center */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full lg:w-auto text-center sm:text-left">
          {/* Radial Circular Gauge */}
          <div className="relative w-40 h-40 shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 136 136">
              <circle
                cx="68"
                cy="68"
                r={radius}
                className="stroke-slate-900"
                strokeWidth="11"
                fill="transparent"
              />
              <circle
                cx="68"
                cy="68"
                r={radius}
                stroke={tierTheme.stroke}
                strokeWidth="11"
                strokeDasharray={circumference}
                strokeDashoffset={scoreOffset}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-3xl sm:text-4xl font-black text-white tracking-tight font-mono">
                {placementScore.toFixed(2)}
              </span>
              <span className="text-[11px] font-bold text-slate-400 tracking-wider">/ 100 PTS</span>
            </div>
          </div>

          {/* Student Dossier & Category */}
          <div className="space-y-3">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <div className="p-1 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                Composite Placement Readiness
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                {studentName}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-md">
                Evaluated through multi-metric algorithmic weighting: academics, cognitive aptitude, and standing arrears.
              </p>
            </div>

            <div className="pt-1">
              <EligibilityBadge eligibility={eligibility} size="lg" showDescription />
            </div>
          </div>
        </div>

        {/* Probability Gauge Right Box */}
        <div className="w-full lg:w-80 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Placement Probability
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-2 py-0.5 rounded">
              EMPIRICAL FIT
            </span>
          </div>

          <div className="py-4 flex items-center justify-between">
            <div>
              <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                {probability}%
              </div>
              <div className="text-xs font-medium text-slate-400 mt-1">
                Estimated Corporate Selection Rate
              </div>
            </div>

            {/* Compact Donut */}
            <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 128 128">
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  className="stroke-slate-800"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="64"
                  cy="64"
                  r="52"
                  stroke="#06b6d4"
                  strokeWidth="12"
                  strokeDasharray={2 * Math.PI * 52}
                  strokeDashoffset={(2 * Math.PI * 52) - (probability / 100) * (2 * Math.PI * 52)}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            </div>
          </div>

          {/* Probability Bar */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
              <div
                className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-sm"
                style={{ width: `${probability}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 flex items-start gap-1.5 leading-relaxed pt-1">
              <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span>{PROBABILITY_DISCLAIMER}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
