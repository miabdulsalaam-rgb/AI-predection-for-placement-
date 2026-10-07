import React from 'react';
import { generateCareerInsight } from '../lib/careerInsight';
import { Student } from '../types/student';
import {
  Sparkles,
  Bot,
  Compass,
  CheckCircle2,
  AlertCircle,
  Target,
  Zap,
  Check,
} from 'lucide-react';

interface CareerInsightCardProps {
  student: Student;
}

export const CareerInsightCard: React.FC<CareerInsightCardProps> = ({ student }) => {
  const insight = generateCareerInsight(student);

  return (
    <div className="bg-gradient-to-br from-indigo-950/50 via-slate-900/90 to-purple-950/40 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-fuchsia-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-indigo-900/50 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                AI Career Strategy &amp; Qualitative Analysis
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                SYNTHESIZED INSIGHT
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Personalized qualitative evaluation generated dynamically from student parameters
            </p>
          </div>
        </div>

        <span className="self-start sm:self-auto text-xs font-mono font-bold text-cyan-300 bg-cyan-950/80 border border-cyan-800/60 px-3 py-1.5 rounded-xl shadow-xs">
          {insight.badge}
        </span>
      </div>

      {/* Main Narrative Synthesis */}
      <div className="relative z-10 space-y-6">
        <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-900/40 shadow-inner">
          <p className="text-sm sm:text-base text-slate-100 leading-relaxed font-medium">
            {insight.summary}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Key Strengths */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-emerald-500/30 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2 mb-3.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified Profile Strengths
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              {insight.keyStrengths.map((strength, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    ✓
                  </span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Screening Bottlenecks */}
          <div className="p-5 rounded-2xl bg-slate-950/60 border border-amber-500/30 shadow-md">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-3.5">
              <AlertCircle className="w-4 h-4 text-amber-400" />
              Identified Screening Bottlenecks
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-200">
              {insight.keyBottlenecks.map((bottleneck, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                    !
                  </span>
                  <span>{bottleneck}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Roadmap & Recruiter Target */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-1">
          <div className="md:col-span-8 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/30 via-slate-950/60 to-purple-950/30 border border-indigo-500/30 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-2 text-indigo-300">
                <Compass className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Strategic Placement Roadmap
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-medium">
                {insight.strategicAdvice}
              </p>
            </div>
          </div>

          <div className="md:col-span-4 p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <Target className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Target Corporate Tier
                </span>
              </div>
              <p className="text-base font-black text-white mt-1">
                {insight.targetRecruiterTier}
              </p>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800">
              Optimal corporate hiring segment matching your current parameters
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
