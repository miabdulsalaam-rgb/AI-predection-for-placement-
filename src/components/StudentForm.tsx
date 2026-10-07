import React, { useState, useMemo } from 'react';
import {
  StudentFormData,
  FormValidationErrors,
  Student,
} from '../types/student';
import { calculatePlacementScore } from '../lib/prediction';
import { determineEligibility } from '../lib/eligibility';
import { calculateProbability } from '../lib/probability';
import {
  User,
  GraduationCap,
  Award,
  Brain,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  HelpCircle,
  RotateCcw,
  Zap,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

interface StudentFormProps {
  onSubmitSuccess: (student: Student) => void;
  onCancel?: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  onSubmitSuccess,
  onCancel,
}) => {
  // CRITICAL REQUIREMENT: The form initially starts with blank fields.
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    tenth: '',
    twelfth: '',
    cgpa: '',
    aptitude: '',
    arrears: '',
  });

  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Live dynamic calculation for real-time preview sidecar
  const livePreview = useMemo(() => {
    const t = parseFloat(formData.tenth) || 0;
    const tw = parseFloat(formData.twelfth) || 0;
    const c = parseFloat(formData.cgpa) || 0;
    const a = parseFloat(formData.aptitude) || 0;
    const arr = parseInt(formData.arrears) || 0;

    const hasAnyInput = formData.tenth !== '' || formData.twelfth !== '' || formData.cgpa !== '' || formData.aptitude !== '';
    if (!hasAnyInput) return null;

    const score = calculatePlacementScore(
      Math.min(100, Math.max(0, t)),
      Math.min(100, Math.max(0, tw)),
      Math.min(10, Math.max(0, c)),
      Math.min(100, Math.max(0, a)),
      Math.max(0, arr)
    );
    const tier = determineEligibility(score, c, a, arr);
    const prob = calculateProbability(score);

    return { score, tier, prob, t, tw, c, a, arr };
  }, [formData]);

  const validateField = (name: keyof StudentFormData, value: string): string | undefined => {
    const trimmed = value.trim();

    if (name === 'name') {
      if (!trimmed) return 'Student name is required.';
      if (trimmed.length < 2) return 'Student name must be at least 2 characters.';
      return undefined;
    }

    if (name === 'tenth') {
      if (trimmed === '') return '10th percentage is required.';
      const num = Number(trimmed);
      if (isNaN(num)) return '10th percentage must be a valid number.';
      if (num < 0 || num > 100) return '10th percentage must be between 0 and 100.';
      return undefined;
    }

    if (name === 'twelfth') {
      if (trimmed === '') return '12th percentage is required.';
      const num = Number(trimmed);
      if (isNaN(num)) return '12th percentage must be a valid number.';
      if (num < 0 || num > 100) return '12th percentage must be between 0 and 100.';
      return undefined;
    }

    if (name === 'cgpa') {
      if (trimmed === '') return 'CGPA is required.';
      const num = Number(trimmed);
      if (isNaN(num)) return 'CGPA must be a valid number.';
      if (num < 0 || num > 10) return 'CGPA must be between 0 and 10.';
      return undefined;
    }

    if (name === 'aptitude') {
      if (trimmed === '') return 'Aptitude score is required.';
      const num = Number(trimmed);
      if (isNaN(num)) return 'Aptitude score must be a valid number.';
      if (num < 0 || num > 100) return 'Aptitude score must be between 0 and 100.';
      return undefined;
    }

    if (name === 'arrears') {
      if (trimmed === '') return 'Number of arrears is required.';
      const num = Number(trimmed);
      if (isNaN(num)) return 'Number of arrears must be a valid number.';
      if (!Number.isInteger(num)) return 'Number of arrears must be an integer.';
      if (num < 0) return 'Number of arrears must be 0 or greater.';
      return undefined;
    }

    return undefined;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name as keyof StudentFormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof StudentFormData, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: FormValidationErrors = {};
    let isValid = true;

    (Object.keys(formData) as Array<keyof StudentFormData>).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      tenth: true,
      twelfth: true,
      cgpa: true,
      aptitude: true,
      arrears: true,
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateAll()) return;

    setIsSubmitting(true);

    const tenth = Number(formData.tenth);
    const twelfth = Number(formData.twelfth);
    const cgpa = Number(formData.cgpa);
    const aptitude = Number(formData.aptitude);
    const arrears = Math.floor(Number(formData.arrears));

    const placementScore = calculatePlacementScore(tenth, twelfth, cgpa, aptitude, arrears);
    const eligibility = determineEligibility(placementScore, cgpa, aptitude, arrears);
    const probability = calculateProbability(placementScore);

    const newStudent: Student = {
      id: Date.now(),
      name: formData.name.trim(),
      tenth,
      twelfth,
      cgpa,
      aptitude,
      arrears,
      placementScore,
      probability,
      eligibility,
      createdAt: new Date().toISOString(),
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitSuccess(newStudent);
    }, 250);
  };

  const loadPreset = (preset: 'scholar' | 'balanced' | 'remedial') => {
    if (preset === 'scholar') {
      setFormData({
        name: 'Aravind Swaminathan',
        tenth: '91.5',
        twelfth: '89.0',
        cgpa: '8.85',
        aptitude: '85',
        arrears: '0',
      });
    } else if (preset === 'balanced') {
      setFormData({
        name: 'Priya Narayanan',
        tenth: '78.0',
        twelfth: '74.5',
        cgpa: '7.20',
        aptitude: '68',
        arrears: '1',
      });
    } else {
      setFormData({
        name: 'Karthik Raja',
        tenth: '64.0',
        twelfth: '61.0',
        cgpa: '5.90',
        aptitude: '48',
        arrears: '3',
      });
    }
    setErrors({});
    setTouched({});
  };

  const clearForm = () => {
    setFormData({
      name: '',
      tenth: '',
      twelfth: '',
      cgpa: '',
      aptitude: '',
      arrears: '',
    });
    setErrors({});
    setTouched({});
  };

  return (
    <div className="space-y-6">
      {/* Quick Scenario Fill Helper */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300">
          <Zap className="w-4 h-4 text-cyan-400" />
          <span className="font-semibold">Quick Test Profiles:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset('scholar')}
            className="px-3 py-1.5 rounded-lg font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-900/50 transition-colors cursor-pointer"
          >
            Tier 1 Scholar
          </button>
          <button
            type="button"
            onClick={() => loadPreset('balanced')}
            className="px-3 py-1.5 rounded-lg font-semibold bg-blue-950/60 text-blue-300 border border-blue-500/30 hover:bg-blue-900/50 transition-colors cursor-pointer"
          >
            Tier 2 Balanced
          </button>
          <button
            type="button"
            onClick={() => loadPreset('remedial')}
            className="px-3 py-1.5 rounded-lg font-semibold bg-rose-950/60 text-rose-300 border border-rose-500/30 hover:bg-rose-900/50 transition-colors cursor-pointer"
          >
            Tier 4 Remedial
          </button>
          <button
            type="button"
            onClick={clearForm}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Fields Column (7 cols) */}
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-7 space-y-6">
          {/* SECTION 1: Personal Details */}
          <div className="bg-slate-900/80 border border-indigo-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Candidate Dossier Identity
                </h3>
                <p className="text-xs text-slate-400">
                  Full name for personalized evaluation certification
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="student-name"
                className="block text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2"
              >
                Candidate Full Name <span className="text-rose-400">*</span>
              </label>
              <input
                id="student-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="e.g., Jane Doe"
                className={`w-full px-4 py-3 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                  errors.name
                    ? 'border-rose-500/80 focus:border-rose-400 focus:ring-2 focus:ring-rose-500/20'
                    : 'border-slate-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
                }`}
              />
              {errors.name && (
                <p className="mt-1.5 text-xs text-rose-400 flex items-center gap-1 font-medium">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {errors.name}
                </p>
              )}
            </div>
          </div>

          {/* SECTION 2: Academic Benchmarks */}
          <div className="bg-slate-900/80 border border-blue-500/20 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-3 pb-4 mb-5 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-wide">
                  Academic Benchmarks
                </h3>
                <p className="text-xs text-slate-400">
                  Secondary, higher secondary, and current undergraduate scores
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* 10th Percentage */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="tenth" className="text-xs font-bold text-cyan-300 uppercase">
                    10th Standard <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-cyan-400 font-mono font-bold">15% WT</span>
                </div>
                <input
                  id="tenth"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  name="tenth"
                  value={formData.tenth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 85.5"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.tenth
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-slate-800 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                  }`}
                />
                {errors.tenth && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.tenth}</p>
                )}
                <span className="text-[11px] text-slate-500 mt-1 block">Range: 0–100%</span>
              </div>

              {/* 12th Percentage */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="twelfth" className="text-xs font-bold text-blue-300 uppercase">
                    12th Standard <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-blue-400 font-mono font-bold">15% WT</span>
                </div>
                <input
                  id="twelfth"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  name="twelfth"
                  value={formData.twelfth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 82.0"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.twelfth
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                  }`}
                />
                {errors.twelfth && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.twelfth}</p>
                )}
                <span className="text-[11px] text-slate-500 mt-1 block">Range: 0–100%</span>
              </div>

              {/* CGPA */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="cgpa" className="text-xs font-bold text-emerald-300 uppercase">
                    UG CGPA <span className="text-rose-400">*</span>
                  </label>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">30% WT</span>
                </div>
                <input
                  id="cgpa"
                  type="number"
                  step="any"
                  min="0"
                  max="10"
                  name="cgpa"
                  value={formData.cgpa}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 8.4"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.cgpa
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-slate-800 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'
                  }`}
                />
                {errors.cgpa && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.cgpa}</p>
                )}
                <span className="text-[11px] text-slate-500 mt-1 block">Scale: 0–10.0</span>
              </div>
            </div>
          </div>

          {/* SECTION 3 & 4: Aptitude & Arrears */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aptitude */}
            <div className="bg-slate-900/80 border border-violet-500/20 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-violet-500/20 text-violet-400">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Aptitude Score</h4>
                  <span className="text-[10px] text-violet-400 font-mono font-bold">Weight: 30%</span>
                </div>
              </div>

              <div>
                <input
                  id="aptitude"
                  type="number"
                  step="any"
                  min="0"
                  max="100"
                  name="aptitude"
                  value={formData.aptitude}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 75"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.aptitude
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-slate-800 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20'
                  }`}
                />
                {errors.aptitude && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.aptitude}</p>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Analytical &amp; problem-solving assessment (0–100)
                </p>
              </div>
            </div>

            {/* Backlogs */}
            <div className="bg-slate-900/80 border border-amber-500/20 rounded-2xl p-5 shadow-xl">
              <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-slate-800">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Standing Arrears</h4>
                  <span className="text-[10px] text-amber-400 font-mono font-bold">Weight: 10%</span>
                </div>
              </div>

              <div>
                <input
                  id="arrears"
                  type="number"
                  min="0"
                  step="1"
                  name="arrears"
                  value={formData.arrears}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. 0"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-slate-950/90 border text-slate-100 placeholder:text-slate-600 focus:outline-none transition-all ${
                    errors.arrears
                      ? 'border-rose-500/80 focus:border-rose-400'
                      : 'border-slate-800 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20'
                  }`}
                />
                {errors.arrears && (
                  <p className="mt-1 text-[11px] text-rose-400">{errors.arrears}</p>
                )}
                <p className="text-[11px] text-slate-500 mt-1.5">
                  0 arrears = 100 pts · 1 arrear = 70 pts · 2 = 45 pts
                </p>
              </div>
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-3">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 active:scale-95 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  <span>Computing Multi-Metric Report...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  <span>Generate Full Placement Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Live Preview Sidecar Column (5 cols) */}
        <div className="lg:col-span-5 sticky top-24 space-y-4">
          <div className="bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Live Readiness Gauge
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/50">
                REAL-TIME
              </span>
            </div>

            {livePreview ? (
              <div className="py-6 text-center space-y-4">
                {/* Circular Gauge */}
                <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      className="stroke-slate-900"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="60"
                      cy="60"
                      r="48"
                      stroke={
                        livePreview.score >= 80 ? '#10b981' :
                        livePreview.score >= 65 ? '#3b82f6' :
                        livePreview.score >= 50 ? '#f59e0b' : '#f43f5e'
                      }
                      strokeWidth="10"
                      strokeDasharray={2 * Math.PI * 48}
                      strokeDashoffset={(2 * Math.PI * 48) - (livePreview.score / 100) * (2 * Math.PI * 48)}
                      strokeLinecap="round"
                      fill="transparent"
                      className="transition-all duration-300 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-3xl font-black text-white font-mono tracking-tight">
                      {livePreview.score.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold">/ 100 SCORE</span>
                  </div>
                </div>

                {/* Eligibility Tier Pill */}
                <div>
                  <span
                    className={`inline-block px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wide border shadow-sm ${
                      livePreview.tier === 'HIGHLY ELIGIBLE'
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : livePreview.tier === 'ELIGIBLE'
                        ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                        : livePreview.tier === 'PARTIALLY ELIGIBLE'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                    }`}
                  >
                    {livePreview.tier}
                  </span>
                  <div className="text-xs text-slate-400 mt-2 font-medium">
                    Estimated Placement Probability: <strong className="text-white font-mono">{livePreview.prob}%</strong>
                  </div>
                </div>

                {/* Proportional Contribution Bars */}
                <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] text-left">
                  <div className="flex justify-between items-center text-slate-400 font-mono">
                    <span className="text-cyan-400">10th Std (15%)</span>
                    <span>{(livePreview.t * 0.15).toFixed(1)} / 15</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-cyan-400 h-1.5 rounded-full" style={{ width: `${(livePreview.t / 100) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-slate-400 font-mono">
                    <span className="text-blue-400">12th Std (15%)</span>
                    <span>{(livePreview.tw * 0.15).toFixed(1)} / 15</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-blue-400 h-1.5 rounded-full" style={{ width: `${(livePreview.tw / 100) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-slate-400 font-mono">
                    <span className="text-emerald-400">UG CGPA (30%)</span>
                    <span>{((livePreview.c / 10) * 100 * 0.3).toFixed(1)} / 30</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: `${(livePreview.c / 10) * 100}%` }} />
                  </div>

                  <div className="flex justify-between items-center text-slate-400 font-mono">
                    <span className="text-violet-400">Aptitude (30%)</span>
                    <span>{(livePreview.a * 0.3).toFixed(1)} / 30</span>
                  </div>
                  <div className="w-full bg-slate-900 rounded-full h-1.5">
                    <div className="bg-violet-400 h-1.5 rounded-full" style={{ width: `${livePreview.a}%` }} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mx-auto">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-200">
                  Awaiting Credentials
                </h4>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  As you enter your academic parameters, this gauge computes your weighted composite score and tier projection live.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
