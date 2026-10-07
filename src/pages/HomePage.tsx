import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Brain,
  Layers,
  Award,
  Building2,
  Users,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Zap,
  Target,
  BarChart,
  BookOpen,
  Compass,
} from 'lucide-react';
import { calculatePlacementScore } from '../lib/prediction';
import { determineEligibility } from '../lib/eligibility';
import { calculateProbability } from '../lib/probability';

interface HomePageProps {
  onCheckEligibility: () => void;
  onViewRecords: () => void;
  studentCount: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  onCheckEligibility,
  onViewRecords,
  studentCount,
}) => {
  // Interactive mini-simulator on the hero section for instant INSPO engagement!
  const [demoCgpa, setDemoCgpa] = useState<number>(8.4);
  const [demoAptitude, setDemoAptitude] = useState<number>(78);
  const [demoArrears, setDemoArrears] = useState<number>(0);

  // Demo calculation based on standard 10th=85%, 12th=82%
  const demoScore = calculatePlacementScore(85, 82, demoCgpa, demoAptitude, demoArrears);
  const demoTier = determineEligibility(demoScore, demoCgpa, demoAptitude, demoArrears);
  const demoProb = calculateProbability(demoScore);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'HIGHLY ELIGIBLE':
        return {
          text: 'text-emerald-400',
          bg: 'from-emerald-500/20 to-teal-500/10',
          border: 'border-emerald-500/40',
          stroke: '#10b981',
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        };
      case 'ELIGIBLE':
        return {
          text: 'text-blue-400',
          bg: 'from-blue-500/20 to-indigo-500/10',
          border: 'border-blue-500/40',
          stroke: '#3b82f6',
          badge: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
        };
      case 'PARTIALLY ELIGIBLE':
        return {
          text: 'text-amber-400',
          bg: 'from-amber-500/20 to-orange-500/10',
          border: 'border-amber-500/40',
          stroke: '#f59e0b',
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
        };
      default:
        return {
          text: 'text-rose-400',
          bg: 'from-rose-500/20 to-pink-500/10',
          border: 'border-rose-500/40',
          stroke: '#f43f5e',
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
        };
    }
  };

  const currentTierMeta = getTierColor(demoTier);

  return (
    <div className="space-y-20 py-6 sm:py-12 overflow-hidden">
      {/* HERO SECTION */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ambient atmospheric glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute -top-10 right-10 w-80 h-80 bg-fuchsia-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="text-center max-w-4xl mx-auto">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/15 to-cyan-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold mb-6 shadow-sm shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Next-Gen Placement Eligibility Intelligence &amp; Data Structures System</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
            Know Your Campus Placement{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-fuchsia-400 bg-clip-text text-transparent drop-shadow-sm">
              Readiness &amp; Eligibility
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-xl text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Multi-metric rule-based evaluation, real-world corporate cut-off benchmarking, and transparent Data Structure algorithms for academic viva &amp; career clarity.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCheckEligibility}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer"
            >
              <span>Evaluate Candidate Profile</span>
              <ArrowRight className="w-5 h-5 text-cyan-200" />
            </button>

            {studentCount > 0 && (
              <button
                onClick={onViewRecords}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-base font-semibold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 shadow-lg transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Access Student Registry ({studentCount})</span>
              </button>
            )}
          </div>
        </div>

        {/* HERO INTERACTIVE SHOWCASE CARD (INSPO ELEMENT) */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="relative rounded-3xl p-1 bg-gradient-to-r from-cyan-500/30 via-indigo-500/40 to-fuchsia-500/30 shadow-2xl shadow-indigo-950/40">
            <div className="bg-[#0b0f19] rounded-[22px] p-6 sm:p-8 backdrop-blur-xl border border-white/5">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Live Algorithmic Playground
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                    Try the Real-Time Eligibility Evaluator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Interact with sliders to test how CGPA, aptitude scores, and backlogs dynamically affect placement readiness
                  </p>
                </div>

                {/* Preset quick test buttons */}
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => { setDemoCgpa(9.2); setDemoAptitude(88); setDemoArrears(0); }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-950/50 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/50 transition-colors cursor-pointer"
                  >
                    Scholar
                  </button>
                  <button
                    onClick={() => { setDemoCgpa(7.2); setDemoAptitude(62); setDemoArrears(1); }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-blue-950/50 text-blue-300 border border-blue-800/50 hover:bg-blue-900/50 transition-colors cursor-pointer"
                  >
                    Average
                  </button>
                  <button
                    onClick={() => { setDemoCgpa(5.8); setDemoAptitude(45); setDemoArrears(3); }}
                    className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-950/50 text-rose-300 border border-rose-800/50 hover:bg-rose-900/50 transition-colors cursor-pointer"
                  >
                    At Risk
                  </button>
                </div>
              </div>

              {/* Slider Controls + Gauge Output */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-6 items-center">
                {/* Sliders (7 cols) */}
                <div className="md:col-span-7 space-y-5">
                  {/* CGPA Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-semibold">
                      <span className="text-slate-300">Undergraduate CGPA (Weight 30%)</span>
                      <span className="text-emerald-400 font-mono text-sm font-bold">{demoCgpa.toFixed(1)} / 10.0</span>
                    </div>
                    <input
                      type="range"
                      min="4.0"
                      max="10.0"
                      step="0.1"
                      value={demoCgpa}
                      onChange={(e) => setDemoCgpa(parseFloat(e.target.value))}
                      className="w-full accent-emerald-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Aptitude Slider */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-semibold">
                      <span className="text-slate-300">Aptitude &amp; Reasoning (Weight 30%)</span>
                      <span className="text-violet-400 font-mono text-sm font-bold">{demoAptitude}%</span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="100"
                      step="1"
                      value={demoAptitude}
                      onChange={(e) => setDemoAptitude(parseInt(e.target.value))}
                      className="w-full accent-violet-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Backlogs Control */}
                  <div>
                    <div className="flex justify-between items-center text-xs mb-1.5 font-semibold">
                      <span className="text-slate-300">Active Arrears / Backlogs (Weight 10%)</span>
                      <span className={`font-mono text-sm font-bold ${demoArrears === 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {demoArrears} Arrear{demoArrears === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div className="grid grid-cols-5 gap-2 text-xs font-mono">
                      {[0, 1, 2, 3, 4].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setDemoArrears(num)}
                          className={`py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                            demoArrears === num
                              ? num === 0
                                ? 'bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/20'
                                : 'bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/20'
                              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                          }`}
                        >
                          {num === 4 ? '4+' : num}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dynamic Gauge Output (5 cols) */}
                <div className={`md:col-span-5 rounded-2xl p-5 border ${currentTierMeta.border} bg-gradient-to-br ${currentTierMeta.bg} text-center flex flex-col items-center justify-between shadow-xl transition-all duration-300`}>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Simulated Output
                  </span>

                  {/* Circular Dial Visualizer */}
                  <div className="my-3 relative w-32 h-32 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        className="stroke-slate-900/80"
                        strokeWidth="10"
                        fill="transparent"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r="48"
                        stroke={currentTierMeta.stroke}
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 48}
                        strokeDashoffset={(2 * Math.PI * 48) - (demoScore / 100) * (2 * Math.PI * 48)}
                        strokeLinecap="round"
                        fill="transparent"
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-2xl font-black text-white font-mono">
                        {demoScore.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold">/ 100 PTS</span>
                    </div>
                  </div>

                  {/* Tier status chip */}
                  <div className="space-y-1">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${currentTierMeta.badge}`}>
                      {demoTier}
                    </span>
                    <p className="text-xs text-slate-300 font-medium">
                      Est. Placement Prob: <strong className="text-white font-mono">{demoProb}%</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Grid */}
        <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-5xl mx-auto text-xs">
          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-emerald-500/20 text-slate-300 flex items-center gap-3 shadow-md">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Pure User-Driven</div>
              <div className="text-[11px] text-slate-400">Zero mock seed records</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-violet-500/20 text-slate-300 flex items-center gap-3 shadow-md">
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
              <Brain className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">5-Metric Model</div>
              <div className="text-[11px] text-slate-400">Calibrated weight formula</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-blue-500/20 text-slate-300 flex items-center gap-3 shadow-md">
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Company Matrix</div>
              <div className="text-[11px] text-slate-400">Tier 1 &amp; Super Dream criteria</div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-cyan-500/20 text-slate-300 flex items-center gap-3 shadow-md">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">DS Algorithms</div>
              <div className="text-[11px] text-slate-400">Selection &amp; Bubble Sort lab</div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 ELIGIBILITY TIERS - COLORFUL BENTO GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-bold border border-cyan-500/30 mb-2">
            <Target className="w-3.5 h-3.5 text-cyan-400" />
            <span>Standardized Classification</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Campus Recruitment Eligibility Tiers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mt-2">
            Each student is evaluated against concurrent thresholds covering composite score, academic grade points, aptitude cut-offs, and backlog clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Tier 1: Highly Eligible */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-emerald-950/40 via-slate-900/80 to-slate-950 border border-emerald-500/40 shadow-xl flex flex-col justify-between group hover:border-emerald-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                  TIER 1
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  TOP 15%
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
                HIGHLY ELIGIBLE
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Qualifies for Tier-1 Product Companies and Super Dream hiring drives (14 LPA - 35 LPA).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-emerald-900/40 space-y-2 text-xs font-mono text-emerald-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Score ≥ 80.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>CGPA ≥ 7.5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Aptitude ≥ 70</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Active Arrears = 0</span>
              </div>
            </div>
          </div>

          {/* Tier 2: Eligible */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-blue-950/40 via-slate-900/80 to-slate-950 border border-blue-500/40 shadow-xl flex flex-col justify-between group hover:border-blue-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-blue-400 tracking-wider">
                  TIER 2
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  STANDARD
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-blue-300 transition-colors">
                ELIGIBLE
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Eligible for mainstream IT consulting, technology services, and core engineering drives (6.5 LPA - 12 LPA).
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-blue-900/40 space-y-2 text-xs font-mono text-blue-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Score ≥ 65.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>CGPA ≥ 6.5</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Aptitude ≥ 55</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Arrears ≤ 1</span>
              </div>
            </div>
          </div>

          {/* Tier 3: Partially Eligible */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-amber-950/40 via-slate-900/80 to-slate-950 border border-amber-500/40 shadow-xl flex flex-col justify-between group hover:border-amber-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                  TIER 3
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  BRIDGING
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                PARTIALLY ELIGIBLE
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Eligible for select mass recruiters or startup drives; specific bottlenecks in CGPA, backlogs, or aptitude need bridging.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-amber-900/40 space-y-2 text-xs font-mono text-amber-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Score ≥ 50.0</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400/80">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Sub-optimal CGPA / Backlogs</span>
              </div>
              <div className="flex items-center gap-1.5 text-amber-400/80">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Targeted training advised</span>
              </div>
            </div>
          </div>

          {/* Tier 4: Not Currently Eligible */}
          <div className="relative rounded-2xl p-6 bg-gradient-to-b from-rose-950/40 via-slate-900/80 to-slate-950 border border-rose-500/40 shadow-xl flex flex-col justify-between group hover:border-rose-400 transition-all duration-300">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-rose-400 tracking-wider">
                  TIER 4
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  REMEDIAL
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-rose-300 transition-colors">
                NOT ELIGIBLE
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Falls below minimum corporate cut-offs. Immediate backlog clearance and quantitative aptitude remediation plan required.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rose-900/40 space-y-2 text-xs font-mono text-rose-300">
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Score &lt; 50.0</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Multiple standing arrears</span>
              </div>
              <div className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                <span>Remediation required</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* COLORFUL FORMULA DECONSTRUCTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Deterministic Mathematical Model
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Placement Readiness Scoring Formula
            </h2>
            <div className="mt-3 p-3 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 inline-block">
              Final Score = (10th × 15%) + (12th × 15%) + (CGPA Score × 30%) + (Aptitude × 30%) + (Arrears Score × 10%)
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* 10th Standard (Cyan) */}
            <div className="p-5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-cyan-400 font-mono block mb-1">
                  WEIGHT: 15%
                </span>
                <h3 className="text-base font-bold text-white">10th Standard</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Secondary schooling benchmark establishing foundational arithmetic and language skills.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-cyan-800/40 text-[11px] font-mono text-cyan-300">
                10th % × 0.15
              </div>
            </div>

            {/* 12th Standard (Blue) */}
            <div className="p-5 rounded-2xl bg-blue-950/20 border border-blue-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-blue-400 font-mono block mb-1">
                  WEIGHT: 15%
                </span>
                <h3 className="text-base font-bold text-white">12th Standard</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Higher secondary pre-university academic aggregate evaluating core STEM proficiency.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-800/40 text-[11px] font-mono text-blue-300">
                12th % × 0.15
              </div>
            </div>

            {/* CGPA (Emerald) */}
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 font-mono block mb-1">
                  WEIGHT: 30%
                </span>
                <h3 className="text-base font-bold text-white">Undergraduate CGPA</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Converted into a 100-point normalized scale: (CGPA ÷ 10) × 100.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-emerald-800/40 text-[11px] font-mono text-emerald-300">
                Normalized CGPA × 0.30
              </div>
            </div>

            {/* Aptitude (Violet) */}
            <div className="p-5 rounded-2xl bg-violet-950/20 border border-violet-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-violet-400 font-mono block mb-1">
                  WEIGHT: 30%
                </span>
                <h3 className="text-base font-bold text-white">Aptitude Score</h3>
                <p className="text-xs text-slate-300 mt-1">
                  Quantitative reasoning, critical logic, pattern detection, and verbal aptitude test score.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-violet-800/40 text-[11px] font-mono text-violet-300">
                Aptitude % × 0.30
              </div>
            </div>

            {/* Arrears (Amber) */}
            <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-400 font-mono block mb-1">
                  WEIGHT: 10%
                </span>
                <h3 className="text-base font-bold text-white">Arrear Clearance</h3>
                <p className="text-xs text-slate-300 mt-1">
                  0 arrears = 100 pts, 1 = 70 pts, 2 = 45 pts, 3 = 25 pts, 4+ = 0 pts.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-800/40 text-[11px] font-mono text-amber-300">
                Arrear Points × 0.10
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
