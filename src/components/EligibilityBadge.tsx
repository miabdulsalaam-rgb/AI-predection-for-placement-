import React from 'react';
import { getEligibilityMeta } from '../lib/eligibility';
import { CheckCircle2, AlertTriangle, AlertCircle, XCircle, Sparkles } from 'lucide-react';

interface EligibilityBadgeProps {
  eligibility: string;
  size?: 'sm' | 'md' | 'lg';
  showDescription?: boolean;
}

export const EligibilityBadge: React.FC<EligibilityBadgeProps> = ({
  eligibility,
  size = 'md',
  showDescription = false,
}) => {
  const meta = getEligibilityMeta(eligibility);

  const getIcon = () => {
    switch (eligibility) {
      case 'HIGHLY ELIGIBLE':
        return <Sparkles className="w-4 h-4 shrink-0 text-emerald-400" />;
      case 'ELIGIBLE':
        return <CheckCircle2 className="w-4 h-4 shrink-0 text-blue-400" />;
      case 'PARTIALLY ELIGIBLE':
        return <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />;
      default:
        return <XCircle className="w-4 h-4 shrink-0 text-rose-400" />;
    }
  };

  const sizeClasses = {
    sm: 'px-2.5 py-1 text-xs font-bold gap-1.5',
    md: 'px-3.5 py-1.5 text-xs sm:text-sm font-extrabold gap-2',
    lg: 'px-5 py-2.5 text-sm sm:text-base font-black gap-2.5 shadow-md',
  };

  const getGlowStyle = () => {
    switch (eligibility) {
      case 'HIGHLY ELIGIBLE':
        return 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10';
      case 'ELIGIBLE':
        return 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/40 shadow-blue-500/10';
      case 'PARTIALLY ELIGIBLE':
        return 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10';
      default:
        return 'bg-gradient-to-r from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10';
    }
  };

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <span
        className={`inline-flex items-center rounded-xl border backdrop-blur-md shadow-xs tracking-wider uppercase transition-all ${getGlowStyle()} ${sizeClasses[size]}`}
      >
        {getIcon()}
        <span>{eligibility}</span>
      </span>
      {showDescription && (
        <span className="text-xs text-slate-400 mt-1 max-w-sm font-medium">
          {meta.description}
        </span>
      )}
    </div>
  );
};
