import React, { useState, useMemo } from 'react';
import { Student } from '../types/student';
import { EligibilityBadge } from './EligibilityBadge';
import { linearSearchStudents } from '../lib/searching';
import { manualSelectionSort, manualBubbleSort, SortField, SortMetric } from '../lib/sorting';
import {
  Search,
  ArrowUpDown,
  Filter,
  Trash2,
  Eye,
  Plus,
  Users,
  Code2,
  Download,
  AlertTriangle,
  Zap,
  Sparkles,
} from 'lucide-react';

interface StudentTableProps {
  students: Student[];
  onSelectStudent: (student: Student) => void;
  onDeleteStudent: (id: number) => void;
  onAddStudent: () => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSelectStudent,
  onDeleteStudent,
  onAddStudent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortField>('score_desc');
  const [sortAlgorithm, setSortAlgorithm] = useState<'selection' | 'bubble'>('selection');
  const [filterEligibility, setFilterEligibility] = useState<string>('ALL');
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  // 1. Searching using linearSearchStudents
  const searchResult = useMemo(() => {
    return linearSearchStudents(students, searchQuery);
  }, [students, searchQuery]);

  // 2. Filtering by eligibility
  const filteredStudents = useMemo(() => {
    if (filterEligibility === 'ALL') {
      return searchResult.results;
    }
    return searchResult.results.filter(
      (s) => s.eligibility.toUpperCase() === filterEligibility.toUpperCase()
    );
  }, [searchResult.results, filterEligibility]);

  // 3. Sorting using manual DS sorting algorithms
  const { sorted: displayedStudents, metrics: sortMetrics } = useMemo(() => {
    if (sortAlgorithm === 'selection') {
      return manualSelectionSort(filteredStudents, sortField);
    } else {
      return manualBubbleSort(filteredStudents, sortField);
    }
  }, [filteredStudents, sortField, sortAlgorithm]);

  // Counts for filter pills
  const counts = useMemo(() => {
    return {
      all: students.length,
      highly: students.filter((s) => s.eligibility === 'HIGHLY ELIGIBLE').length,
      eligible: students.filter((s) => s.eligibility === 'ELIGIBLE').length,
      partial: students.filter((s) => s.eligibility === 'PARTIALLY ELIGIBLE').length,
      not: students.filter((s) => s.eligibility === 'NOT CURRENTLY ELIGIBLE').length,
    };
  }, [students]);

  // Export to CSV
  const handleExportCSV = () => {
    if (students.length === 0) return;
    const headers = [
      'ID',
      'Name',
      '10th (%)',
      '12th (%)',
      'CGPA',
      'Aptitude',
      'Arrears',
      'Placement Score',
      'Probability (%)',
      'Eligibility',
      'Created At',
    ];
    const rows = students.map((s) => [
      s.id,
      `"${s.name.replace(/"/g, '""')}"`,
      s.tenth,
      s.twelfth,
      s.cgpa,
      s.aptitude,
      s.arrears,
      s.placementScore,
      s.probability,
      `"${s.eligibility}"`,
      s.createdAt || '',
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `placement_candidates_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Avatar gradient generator
  const getAvatarGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-500 to-teal-600 text-white';
    if (score >= 65) return 'from-blue-500 to-indigo-600 text-white';
    if (score >= 50) return 'from-amber-500 to-orange-600 text-white';
    return 'from-rose-500 to-pink-600 text-white';
  };

  if (students.length === 0) {
    return (
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-10 sm:p-14 text-center shadow-xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-cyan-500/20 border border-indigo-500/30 text-cyan-400 flex items-center justify-center mx-auto mb-4">
          <Users className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">
          No student records registered yet.
        </h3>
        <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
          Add student profiles to initiate linear search benchmarks, selection sorting passes, and corporate matrix matching.
        </p>
        <button
          onClick={onAddStudent}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Evaluate First Student</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
      {/* Top Filter Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-800">
        <button
          onClick={() => setFilterEligibility('ALL')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterEligibility === 'ALL'
              ? 'bg-indigo-600 text-white shadow-xs'
              : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          <span>All Candidates</span>
          <span className="px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">{counts.all}</span>
        </button>

        <button
          onClick={() => setFilterEligibility('HIGHLY ELIGIBLE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterEligibility === 'HIGHLY ELIGIBLE'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-emerald-950/40 text-emerald-300 hover:text-white border border-emerald-800/40'
          }`}
        >
          <span>Highly Eligible</span>
          <span className="px-1.5 py-0.2 rounded-full bg-emerald-900/50 text-[10px]">{counts.highly}</span>
        </button>

        <button
          onClick={() => setFilterEligibility('ELIGIBLE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterEligibility === 'ELIGIBLE'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'bg-blue-950/40 text-blue-300 hover:text-white border border-blue-800/40'
          }`}
        >
          <span>Eligible</span>
          <span className="px-1.5 py-0.2 rounded-full bg-blue-900/50 text-[10px]">{counts.eligible}</span>
        </button>

        <button
          onClick={() => setFilterEligibility('PARTIALLY ELIGIBLE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterEligibility === 'PARTIALLY ELIGIBLE'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-950/40 text-amber-300 hover:text-white border border-amber-800/40'
          }`}
        >
          <span>Partially Eligible</span>
          <span className="px-1.5 py-0.2 rounded-full bg-amber-900/50 text-[10px]">{counts.partial}</span>
        </button>

        <button
          onClick={() => setFilterEligibility('NOT CURRENTLY ELIGIBLE')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            filterEligibility === 'NOT CURRENTLY ELIGIBLE'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-rose-950/40 text-rose-300 hover:text-white border border-rose-800/40'
          }`}
        >
          <span>Not Eligible</span>
          <span className="px-1.5 py-0.2 rounded-full bg-rose-900/50 text-[10px]">{counts.not}</span>
        </button>
      </div>

      {/* Controls Bar: Search, Sort & Algorithms */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by candidate name or ID..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Sort & Algorithm Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sort Criteria */}
          <div className="flex items-center gap-1.5 bg-slate-950/90 border border-slate-800 rounded-xl px-3 py-2 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-cyan-400" />
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value as SortField)}
              className="bg-transparent text-slate-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              <option value="score_desc" className="bg-slate-900 text-white">Highest Score</option>
              <option value="score_asc" className="bg-slate-900 text-white">Lowest Score</option>
              <option value="cgpa_desc" className="bg-slate-900 text-white">Highest CGPA</option>
              <option value="aptitude_desc" className="bg-slate-900 text-white">Highest Aptitude</option>
              <option value="probability_desc" className="bg-slate-900 text-white">Highest Probability</option>
            </select>
          </div>

          {/* Algorithm Toggle */}
          <div className="flex items-center bg-slate-950/90 border border-slate-800 rounded-xl p-0.5 text-xs">
            <button
              onClick={() => setSortAlgorithm('selection')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sortAlgorithm === 'selection'
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Selection Sort
            </button>
            <button
              onClick={() => setSortAlgorithm('bubble')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sortAlgorithm === 'bubble'
                  ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Bubble Sort
            </button>
          </div>

          {/* Export Action */}
          <button
            onClick={handleExportCSV}
            title="Export Records as CSV"
            className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Add Student CTA */}
          <button
            onClick={onAddStudent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white text-xs font-bold transition-all shadow-md shadow-indigo-600/20 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Evaluation</span>
          </button>
        </div>
      </div>

      {/* Live DSA Complexity & Metrics HUD */}
      <div className="px-4 py-3 rounded-2xl bg-gradient-to-r from-slate-950 via-indigo-950/20 to-slate-950 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-slate-400">
          <div className="p-1 rounded-md bg-cyan-500/20 text-cyan-400">
            <Code2 className="w-3.5 h-3.5" />
          </div>
          <span>Active Sort:</span>
          <span className="font-mono text-cyan-300 font-bold">
            {sortMetrics.algorithmUsed}
          </span>
          <span className="text-slate-700">|</span>
          <span>Time Complexity:</span>
          <span className="font-mono text-indigo-300 font-bold">{sortMetrics.timeComplexity}</span>
        </div>

        <div className="flex items-center gap-4 text-slate-400 font-mono text-[11px]">
          <span>
            Comparisons: <strong className="text-white">{sortMetrics.comparisons}</strong>
          </span>
          <span>
            Swaps: <strong className="text-white">{sortMetrics.swaps}</strong>
          </span>
          {searchQuery && (
            <span>
              Linear Search Passes: <strong className="text-cyan-300">{searchResult.comparisons}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Student Records Table */}
      {displayedStudents.length === 0 ? (
        <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-slate-800 bg-slate-950/40">
          <p className="text-sm font-semibold text-slate-300">
            No matching candidates found.
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Try adjusting your search query or eligibility tier filter.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-800/80">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/90 text-slate-400 font-bold border-b border-slate-800 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Candidate</th>
                <th className="py-3.5 px-3 text-center">10th</th>
                <th className="py-3.5 px-3 text-center">12th</th>
                <th className="py-3.5 px-3 text-center">CGPA</th>
                <th className="py-3.5 px-3 text-center">Aptitude</th>
                <th className="py-3.5 px-3 text-center">Arrears</th>
                <th className="py-3.5 px-3 text-center">Readiness Score</th>
                <th className="py-3.5 px-3 text-center">Probability</th>
                <th className="py-3.5 px-4">Eligibility Tier</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/30">
              {displayedStudents.map((student) => (
                <tr
                  key={student.id}
                  className="hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Candidate Identity */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl bg-gradient-to-tr ${getAvatarGradient(student.placementScore)} flex items-center justify-center font-bold text-xs shadow-xs`}>
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-indigo-300 transition-colors">
                          {student.name}
                        </div>
                        <div className="text-[10px] font-mono text-slate-500">
                          #{student.id.toString().slice(-6)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* 10th */}
                  <td className="py-3.5 px-3 text-center font-mono text-cyan-300">
                    {student.tenth}%
                  </td>

                  {/* 12th */}
                  <td className="py-3.5 px-3 text-center font-mono text-blue-300">
                    {student.twelfth}%
                  </td>

                  {/* CGPA */}
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-emerald-300">
                    {student.cgpa}
                  </td>

                  {/* Aptitude */}
                  <td className="py-3.5 px-3 text-center font-mono text-violet-300">
                    {student.aptitude}%
                  </td>

                  {/* Arrears */}
                  <td className="py-3.5 px-3 text-center font-mono">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                        student.arrears === 0
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {student.arrears}
                    </span>
                  </td>

                  {/* Placement Score */}
                  <td className="py-3.5 px-3 text-center font-mono font-extrabold text-white">
                    <span className="text-indigo-300 bg-indigo-950/40 px-2 py-1 rounded-md border border-indigo-800/40">
                      {student.placementScore.toFixed(2)}
                    </span>
                  </td>

                  {/* Probability */}
                  <td className="py-3.5 px-3 text-center font-mono font-bold text-cyan-300">
                    {student.probability}%
                  </td>

                  {/* Eligibility */}
                  <td className="py-3.5 px-4">
                    <EligibilityBadge eligibility={student.eligibility} size="sm" />
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectStudent(student)}
                        title="View Full Profile Report"
                        className="p-1.5 rounded-xl bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 border border-indigo-500/30 transition-all cursor-pointer"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {deleteConfirmId === student.id ? (
                        <div className="flex items-center gap-1 bg-slate-950 border border-rose-500/50 p-1 rounded-xl">
                          <button
                            onClick={() => {
                              onDeleteStudent(student.id);
                              setDeleteConfirmId(null);
                            }}
                            className="px-2 py-0.5 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-bold rounded cursor-pointer"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(null)}
                            className="px-1.5 py-0.5 text-[11px] text-slate-400 hover:text-white cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirmId(student.id)}
                          title="Delete Candidate Record"
                          className="p-1.5 rounded-xl bg-slate-900 text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 border border-slate-800 transition-all cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
