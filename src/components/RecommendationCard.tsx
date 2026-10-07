import React from 'react';
import { RecommendationItem } from '../lib/recommendations';
import {
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface RecommendationCardProps {
  recommendations: RecommendationItem[];
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  recommendations,
}) => {
  const getBadgeStyle = (type: RecommendationItem['type']) => {
    switch (type) {
      case 'strength':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
          badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
          border: 'border-emerald-500/30 bg-gradient-to-br from-emerald-950/20 via-slate-950/70 to-slate-950',
          titleColor: 'text-emerald-300',
        };
      case 'critical':
        return {
          icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
          badge: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
          border: 'border-rose-500/30 bg-gradient-to-br from-rose-950/20 via-slate-950/70 to-slate-950',
          titleColor: 'text-rose-300',
        };
      case 'improvement':
        return {
          icon: <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0" />,
          badge: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
          border: 'border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-950/70 to-slate-950',
          titleColor: 'text-amber-300',
        };
      default:
        return {
          icon: <Lightbulb className="w-4 h-4 text-cyan-400 shrink-0" />,
          badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
          border: 'border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-950/70 to-slate-950',
          titleColor: 'text-cyan-300',
        };
    }
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 pb-5 border-b border-slate-800 mb-6">
        <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
            Targeted Action Recommendations
          </h3>
          <p className="text-xs text-slate-400">
            Tactical action items formulated exclusively to elevate your candidate profile
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((item) => {
          const style = getBadgeStyle(item.type);
          return (
            <div
              key={item.id}
              className={`p-5 rounded-2xl border flex flex-col justify-between transition-all hover:scale-[1.01] shadow-md ${style.border}`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wide ${style.badge}`}
                  >
                    {style.icon}
                    <span>{item.type}</span>
                  </span>
                  <span className={`text-xs font-bold ${style.titleColor}`}>
                    {item.title}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                  {item.message}
                </p>
              </div>

              {item.actionItem && (
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-white uppercase text-[10px] tracking-wider bg-slate-800 px-2 py-0.5 rounded">
                    Action Plan
                  </span>
                  <span>{item.actionItem}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
