import React from 'react';
import {
  GraduationCap,
  Sparkles,
  Users,
  BarChart3,
  Code2,
  PlusCircle,
  Zap,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  studentCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  studentCount,
}) => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07090e]/85 border-b border-slate-800/80 shadow-lg shadow-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Brand Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-xl p-1 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 group-hover:scale-105 transition-all duration-300">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#07090e] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-indigo-100 to-cyan-200 bg-clip-text text-transparent">
                  PlacementIQ
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 text-indigo-300 border border-indigo-500/30 shadow-xs">
                  <Zap className="w-2.5 h-2.5 text-cyan-400" />
                  DS ARCHITECTURE
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-400 font-medium line-clamp-1">
                Dynamic Eligibility &amp; Readiness Engine
              </p>
            </div>
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => onNavigate('home')}
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'home'
                  ? 'bg-slate-800/90 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => onNavigate('predict')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'predict'
                  ? 'bg-gradient-to-r from-indigo-500/25 to-fuchsia-500/25 text-indigo-200 border border-indigo-500/40 shadow-sm shadow-indigo-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-400" />
              Check Eligibility
            </button>

            <button
              onClick={() => onNavigate('students')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'students'
                  ? 'bg-slate-800/90 text-white shadow-sm border border-slate-700/60'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-4 h-4 text-slate-400" />
              Student Registry
              {studentCount > 0 && (
                <span className="ml-0.5 px-2 py-0.5 rounded-full text-xs font-bold bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-xs">
                  {studentCount}
                </span>
              )}
            </button>

            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-cyan-200 border border-cyan-500/30 shadow-sm shadow-cyan-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-cyan-400" />
              Cohort Analytics
            </button>

            <button
              onClick={() => onNavigate('ds-demo')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                currentTab === 'ds-demo'
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-200 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code2 className="w-4 h-4 text-emerald-400" />
              DSA Viva Lab
            </button>
          </nav>

          {/* Action CTA Button */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => onNavigate('predict')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-400 shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Evaluate Candidate</span>
              <span className="sm:hidden">Evaluate</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="md:hidden flex items-center justify-between overflow-x-auto py-2.5 border-t border-slate-900 gap-2 scrollbar-none text-xs">
          <button
            onClick={() => onNavigate('home')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold ${
              currentTab === 'home' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => onNavigate('predict')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              currentTab === 'predict' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/30' : 'text-slate-400'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Check Eligibility
          </button>
          <button
            onClick={() => onNavigate('students')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              currentTab === 'students' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Records ({studentCount})
          </button>
          <button
            onClick={() => onNavigate('dashboard')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              currentTab === 'dashboard' ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/30' : 'text-slate-400'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Analytics
          </button>
          <button
            onClick={() => onNavigate('ds-demo')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1.5 ${
              currentTab === 'ds-demo' ? 'bg-emerald-500/30 text-emerald-300 border border-emerald-500/30' : 'text-slate-400'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            DSA Lab
          </button>
        </div>
      </div>
    </header>
  );
};

