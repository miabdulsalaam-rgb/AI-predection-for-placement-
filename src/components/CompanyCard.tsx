import React, { useState } from 'react';
import { CompanyCheckResult } from '../types/company';
import {
  Building2,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  DollarSign,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';

interface CompanyCardProps {
  eligibleCompanies: CompanyCheckResult[];
  improvementCompanies: CompanyCheckResult[];
}

export const CompanyCard: React.FC<CompanyCardProps> = ({
  eligibleCompanies,
  improvementCompanies,
}) => {
  const [filterTab, setFilterTab] = useState<'all' | 'eligible' | 'improvement'>('all');

  const getCompanyColor = (name: string) => {
    switch (name) {
      case 'Company A':
        return { avatar: 'from-blue-600 to-indigo-600', text: 'text-blue-300' };
      case 'Company B':
        return { avatar: 'from-purple-600 to-fuchsia-600', text: 'text-purple-300' };
      case 'Company C':
        return { avatar: 'from-emerald-600 to-teal-600', text: 'text-emerald-300' };
      case 'Company D':
        return { avatar: 'from-amber-500 to-orange-600', text: 'text-amber-300' };
      case 'CoreTech Industries':
        return { avatar: 'from-cyan-600 to-blue-600', text: 'text-cyan-300' };
      default:
        return { avatar: 'from-rose-600 to-pink-600', text: 'text-rose-300' };
    }
  };

  const getTierBadgeStyle = (tier: string) => {
    switch (tier) {
      case 'Super Dream':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/40';
      case 'Dream / Tier 1':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/40';
      case 'Core Engineering':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40';
      case 'Consulting / Analytics':
        return 'bg-rose-500/20 text-rose-300 border-rose-500/40';
      default:
        return 'bg-blue-500/20 text-blue-300 border-blue-500/40';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
            <Building2 className="w-3.5 h-3.5" />
            Corporate Benchmarks
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Company Recruitment Criteria Matrix
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real corporate hiring cut-offs evaluated against your specific academic data
          </p>
        </div>

        {/* Filter Segmented Control */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs self-start sm:self-auto">
          <button
            onClick={() => setFilterTab('all')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTab === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({eligibleCompanies.length + improvementCompanies.length})
          </button>
          <button
            onClick={() => setFilterTab('eligible')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTab === 'eligible'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Eligible ({eligibleCompanies.length})
          </button>
          <button
            onClick={() => setFilterTab('improvement')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
              filterTab === 'improvement'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Requires Bridge ({improvementCompanies.length})
          </button>
        </div>
      </div>

      {/* SECTION 1: Eligible Companies */}
      {(filterTab === 'all' || filterTab === 'eligible') && (
        <div className="bg-slate-900/80 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-950 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Corporate Matches You Satisfy
                </h4>
                <p className="text-xs text-slate-400">
                  Full eligibility verified across 10th, 12th, CGPA, Aptitude, and backlogs
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              {eligibleCompanies.length} Qualified
            </span>
          </div>

          {eligibleCompanies.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2" />
              <h5 className="text-sm font-bold text-slate-200">
                No corporate matches meet 100% of cut-offs currently
              </h5>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Check the opportunities requiring bridge below to see what improvements would unlock eligibility.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eligibleCompanies.map(({ company }) => {
                const colorTheme = getCompanyColor(company.name);
                return (
                  <div
                    key={company.id}
                    className="p-5 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-slate-950/80 to-slate-950 hover:border-emerald-400/60 transition-all shadow-md flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2.5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${colorTheme.avatar} flex items-center justify-center font-bold text-white text-sm shadow-md`}>
                            {company.name.charAt(0)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-base font-bold text-white">
                                {company.name}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTierBadgeStyle(company.tier)}`}>
                                {company.tier}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                              {company.role}
                            </p>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 shrink-0">
                          {company.packageLPA}
                        </span>
                      </div>

                      <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                        {company.description}
                      </p>
                    </div>

                    {/* Verified Criteria */}
                    <div className="mt-4 pt-3 border-t border-emerald-900/40 flex flex-wrap gap-1.5 text-[10px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                        10th ≥ {company.tenthMin}% ✓
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                        12th ≥ {company.twelfthMin}% ✓
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                        CGPA ≥ {company.cgpaMin} ✓
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                        Aptitude ≥ {company.aptitudeMin} ✓
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                        Arrears ≤ {company.maxArrears} ✓
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: Improvement Companies */}
      {(filterTab === 'all' || filterTab === 'improvement') && (
        <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 sm:p-7 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-amber-950 mb-5">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">
                  Companies Requiring Target Improvements
                </h4>
                <p className="text-xs text-slate-400">
                  Aspirational opportunities and the specific metric hurdles you need to bridge
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              {improvementCompanies.length} Requiring Bridge
            </span>
          </div>

          {improvementCompanies.length === 0 ? (
            <div className="text-center py-8 px-4 rounded-2xl border border-dashed border-emerald-800 bg-emerald-950/20">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
              <h5 className="text-sm font-bold text-emerald-300">
                Flawless Candidate Profile!
              </h5>
              <p className="text-xs text-slate-300 mt-1 max-w-md mx-auto">
                You meet or exceed every single corporate benchmark in the recruitment database!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementCompanies.map(({ company, unmetCriteria }) => (
                <div
                  key={company.id}
                  className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-2.5">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-white">
                            {company.name}
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getTierBadgeStyle(company.tier)}`}>
                            {company.tier}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                          <Briefcase className="w-3.5 h-3.5 text-slate-500" />
                          {company.role}
                        </p>
                      </div>

                      <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-900 text-slate-400 border border-slate-800 shrink-0">
                        {company.packageLPA}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
                      {company.description}
                    </p>
                  </div>

                  {/* Unmet Criteria Tags */}
                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <span className="text-[11px] font-bold text-rose-400 block mb-1.5 uppercase">
                      Hurdles to Overcome:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {unmetCriteria.map((unmet, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-rose-950/60 text-rose-300 border border-rose-800/50 flex items-center gap-1.5"
                        >
                          <AlertCircle className="w-3 h-3 text-rose-400 shrink-0" />
                          {unmet}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
