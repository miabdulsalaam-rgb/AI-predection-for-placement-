import React from 'react';
import { DataStructureExplainer } from '../components/DataStructureExplainer';
import { Code2, Sparkles } from 'lucide-react';

export const DataStructuresPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1">
          <Code2 className="w-3.5 h-3.5" />
          DSA Architecture &amp; Viva Documentation
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          Data Structures &amp; Algorithmic Foundations
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 mt-1">
          Theoretical architecture, asymptotic time and space complexities, interactive sorting simulator, and viva preparation.
        </p>
      </div>

      <DataStructureExplainer />
    </div>
  );
};
